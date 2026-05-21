import product from "@/model/product";

export async function generateMetadata({ params }) {
  const products = product.find((p) => p.slug === params.slug);

  return {
    title: products.name,
    description: products.description,
  };
}

const page = ({ params }) => {
  const prod = product.find((p) => p.slug === params.slug);
  return (
    <>
      <div>
        <h1>{prod.name}</h1>
        <p>{prod.description}</p>
        <p>₹{prod.price}</p>

        {/* 🔥 Structured Data */}
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
    </>
  );
};

export default page;
