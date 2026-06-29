"use client";

import Image from "next/image";
import Link from "next/link";
import { useProductcontext } from "../context/productcontext";

const CartPages = () => {
  const {
    cart = [],
    clearCart,
    increaseQty,
    decreaseQty,
  } = useProductcontext();

  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.qty || 1),
    0,
  );

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50 px-4">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Your cart is empty
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Looks like you haven,t added anything yet.
        </p>
        <Link
          href="../shop"
          className="bg-gray-900 text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-8">
        {/* LEFT — CART ITEMS */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              Shopping cart
            </h1>
            <span className="text-xs text-gray-500 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-full">
              {cart.length} {cart.length === 1 ? "item" : "items"}
            </span>
          </div>

          {cart.map((product) => (
            <div
              key={product._id}
              className="bg-white border w-180 border-gray-200 rounded-2xl p-10 flex gap-4 items-start hover:bg-gray-200 hover:border-gray-200 transition-colors"
            >
              {/* IMAGE */}
              <div className="w-20 h-20 min-w-[100px] bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                <Image
                  src={product.image || "/fallback.png"}
                  alt={product.name}
                  width={72}
                  height={72}
                  className="object-contain"
                  unoptimized
                />
              </div>

              {/* DETAILS */}
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-medium text-gray-900 truncate">
                  {product.title}
                </h2>
                <p className="text-xs text-gray-600 mt-0.5 mb-3">
                  ₹{product.price} per item
                </p>

                {/* QUANTITY */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty?.(product._id)}
                    className="w-7 h-7 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center justify-center text-base leading-none transition-colors"
                  >
                    −
                  </button>
                  <span className="text-sm font-medium text-gray-800 w-5 text-center">
                    {product.qty || 1}
                  </span>
                  <button
                    onClick={() => increaseQty?.(product._id)}
                    className="w-7 h-7 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center justify-center text-base leading-none transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* PRICE + REMOVE */}
              <div className="flex flex-col items-end gap-2">
                <button
                  className="text-gray-300 hover:text-red-400 transition-colors"
                  aria-label="Remove item"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <span className="text-sm font-semibold text-gray-900">
                  ₹{product.price * (product.qty || 1)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT — ORDER SUMMARY */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 h-fit sticky top-20 space-y-4">
          <h2 className="text-base font-semibold text-gray-900">
            Order summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Items</span>
              <span className="text-gray-800">{cart.length}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span className="text-gray-800">₹{total}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Delivery</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-900">Total</span>
            <span className="text-lg font-semibold text-gray-900">
              ₹{total}
            </span>
          </div>

          <Link
            href="../checkout"
            className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-sm font-medium transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Proceed to checkout
          </Link>

          <button
            onClick={clearCart}
            className="w-full border border-red-200 text-red-500 hover:bg-red-50 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            Clear cart
          </button>

          <Link
            href="../shop"
            className="flex items-center justify-center gap-1.5 w-full border border-gray-200 text-gray-500 hover:bg-gray-50 py-2.5 rounded-xl text-sm transition-colors"
          >
            ← Continue shopping
          </Link>

          <p className="text-xs text-green-600 text-center flex items-center justify-center gap-1.5">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            Secure checkout · Free delivery on all orders
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartPages;
