"use client";

import { useRouter } from "next/navigation";
import { useProductcontext } from "../../context/productcontext";

export default function ProductActions({ id, name, image, price }) {
  const router = useRouter();
  const { addTocart, getCartdata } = useProductcontext();

  const handleAddToCart = () => {
    addTocart(name, image, price);
    getCartdata();
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart"); // or "/component/checkout" to skip straight to checkout
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={handleAddToCart}
        className="flex-1 bg-[#95D7DE] hover:opacity-90 text-[#000000] font-semibold py-3.5 rounded-xl transition"
      >
        Add to Cart
      </button>
      <button
        onClick={handleBuyNow}
        className="flex-1 bg-[#001B38] hover:bg-[#001B38]/70 text-[#FFFFFF] font-semibold py-3.5 rounded-xl transition"
      >
        Buy Now
      </button>
    </div>
  );
}
