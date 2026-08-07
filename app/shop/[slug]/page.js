import Image from "next/image";
import Link from "next/link";
import product from "@/model/product";

export async function generateMetadata({ params }) {
  const prod = await product.findOne({ slug: params.slug }).lean();

  return {
    title: prod?.name,
    description: prod?.description,
  };
}

const page = async ({ params }) => {
  const prod = await product.findOne({ slug: params.slug }).lean();

  if (!prod) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center">
        <p className="text-[#A0A0A0] text-sm uppercase tracking-widest">
          Product not found
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000] px-6 py-10">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto mb-8">
        <nav className="text-xs uppercase tracking-widest text-[#A0A0A0] flex items-center gap-2">
          <Link href="/" className="hover:text-[#95D7DE] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/products"
            className="hover:text-[#95D7DE] transition-colors"
          >
            Products
          </Link>
          <span>/</span>
          <span className="text-[#FFFFFF] normal-case tracking-normal">
            {prod.name}
          </span>
        </nav>
      </div>

      {/* Product Panel */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* IMAGE */}
        <div className="bg-[#001B38] rounded-2xl p-8 flex items-center justify-center h-[420px]">
          <div className="relative w-full h-full">
            <Image
              src={prod.image || "/fallback.png"}
              alt={prod.name}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>

        {/* DETAILS */}
        <div className="flex flex-col">
          {prod.category && (
            <span className="text-xs uppercase tracking-widest text-[#95D7DE] mb-3">
              {prod.category}
            </span>
          )}

          <h1 className="text-3xl sm:text-4xl font-bold text-[#FFFFFF] leading-tight">
            {prod.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center mt-3 text-sm">
            <span className="text-[#95D7DE]">⭐⭐⭐⭐☆</span>
            <span className="text-[#A0A0A0] ml-2">(120 reviews)</span>
          </div>

          {/* Price */}
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-4xl font-bold text-[#95D7DE]">
              ₹{prod.price}
            </span>
            <span className="text-lg text-[#A0A0A0] line-through">
              ₹{(prod.price * 1.2).toFixed(0)}
            </span>
            <span className="text-sm text-[#95D7DE] border border-[#95D7DE] rounded-full px-3 py-1">
              Save 20%
            </span>
          </div>

          {/* Description */}
          <p className="mt-6 text-[#A0A0A0] leading-relaxed">
            {prod.description}
          </p>

          <div className="h-px bg-[#001B38] my-8" />

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 bg-[#95D7DE] hover:opacity-90 text-[#000000] font-semibold py-3.5 rounded-xl transition">
              Add to Cart
            </button>
            <button className="flex-1 bg-[#001B38] hover:bg-[#001B38]/70 text-[#FFFFFF] font-semibold py-3.5 rounded-xl transition">
              Buy Now
            </button>
          </div>

          {/* Meta */}
          <div className="mt-8 grid grid-cols-2 gap-4 text-xs text-[#A0A0A0]">
            <div className="flex items-center gap-2">
              <span className="text-[#95D7DE]">●</span> In stock
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#95D7DE]">●</span> Free delivery
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: prod.name,
            description: prod.description,
            offers: {
              "@type": "Offer",
              price: prod.price,
              priceCurrency: "INR",
            },
          }),
        }}
      />
    </div>
  );
};

export default page;
