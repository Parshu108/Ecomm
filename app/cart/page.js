"use client";

import Image from "next/image";
import Link from "next/link";
import { useProductcontext } from "../../context/productcontext";
import {
  FaTrashAlt,
  FaLock,
  FaArrowLeft,
  FaShoppingBag,
  FaTag,
} from "react-icons/fa";

const CartPages = () => {
  const {
    cart = [],
    clearCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useProductcontext();

  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.qty || 1),
    0,
  );

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-[#07090e] px-4">
        <div className="glass-panel p-6 sm:p-10 rounded-3xl max-w-md w-full space-y-5 border border-slate-800">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-cyan-400 text-2xl sm:text-3xl shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            <FaShoppingBag />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">
            Your Cart is Empty
          </h1>
          <p className="text-slate-400 text-sm">
            Looks like you haven't added any products to your shopping cart yet.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-xl bg-cyan-500 text-black text-sm font-extrabold hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          >
            <FaArrowLeft className="text-xs" /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#07090e] min-h-screen py-6 sm:py-10 lg:py-12 px-3 sm:px-6 lg:px-8 text-slate-100">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review your selected tech gear before checkout.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* CART ITEMS LIST */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4 order-2 lg:order-1">
            {cart.map((item) => (
              <div
                key={item._id}
                className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-800/80 flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-center justify-between hover:border-cyan-500/40 transition-all"
              >
                <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto min-w-0">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-slate-950 rounded-xl flex-shrink-0 p-2 border border-slate-800 flex items-center justify-center">
                    <Image
                      src={item.image || "/fallback.png"}
                      alt={item.name || item.title || "Product"}
                      fill
                      className="object-contain p-1"
                      unoptimized
                    />
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base font-bold text-white truncate">
                      {item.name || item.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      ₹{item.price} per item
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 sm:gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  {/* QUANTITY ADJUSTER */}
                  <div className="flex items-center border border-slate-800 rounded-xl bg-slate-900 overflow-hidden flex-shrink-0">
                    <button
                      onClick={() => decreaseQty?.(item._id)}
                      className="w-8 h-8 text-cyan-400 hover:bg-slate-800 active:bg-slate-700 transition-colors font-bold flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="w-7 sm:w-8 text-center text-xs font-bold font-mono text-white">
                      {item.qty || 1}
                    </span>
                    <button
                      onClick={() => increaseQty?.(item._id)}
                      className="w-8 h-8 text-cyan-400 hover:bg-slate-800 active:bg-slate-700 transition-colors font-bold flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>

                  {/* PRICE & REMOVE */}
                  <div className="text-right flex-shrink-0">
                    <span className="text-sm sm:text-base font-extrabold text-cyan-400 font-mono block">
                      ₹{item.price * (item.qty || 1)}
                    </span>
                    <button
                      onClick={() => removeFromCart?.(item._id)}
                      className="text-xs text-slate-500 hover:text-red-400 transition-colors inline-flex items-center gap-1 mt-1"
                    >
                      <FaTrashAlt />{" "}
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0 pt-2">
              <button
                onClick={clearCart}
                className="px-4 py-2.5 sm:py-2 rounded-xl text-xs font-bold border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all text-center"
              >
                Clear Entire Cart
              </button>

              <Link
                href="/shop"
                className="text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors flex items-center justify-center sm:justify-start gap-1.5"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-5 sm:space-y-6 h-fit order-1 lg:order-2 lg:sticky lg:top-24">
            <h2 className="text-base sm:text-lg font-bold text-white">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs sm:text-sm font-medium">
              <div className="flex justify-between text-slate-400">
                <span>Selected Items</span>
                <span className="text-white font-mono">{cart.length}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-white font-mono">₹{total}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Shipping Fee</span>
                <span className="text-cyan-400 font-mono font-bold">FREE</span>
              </div>
            </div>

            {/* PROMO CODE */}
            <div className="pt-2">
              <div className="relative flex items-center">
                <FaTag className="absolute left-3 text-slate-500 text-xs" />
                <input
                  type="text"
                  placeholder="Promo code"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-16 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
                <button className="absolute right-1 px-3 py-1.5 rounded-lg bg-slate-800 text-cyan-400 text-[11px] font-bold hover:bg-slate-700">
                  Apply
                </button>
              </div>
            </div>

            <div className="border-t border-slate-800/80 pt-4 flex justify-between items-center">
              <span className="text-sm sm:text-base font-bold text-white">
                Total Amount
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-cyan-400 font-mono">
                ₹{total}
              </span>
            </div>

            <Link
              href="/component/checkout"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-cyan-500 text-black text-sm font-extrabold hover:bg-cyan-400 active:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            >
              <FaLock className="text-xs" /> Proceed to Checkout
            </Link>

            <p className="text-[10px] sm:text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5">
              <FaLock className="text-cyan-400" />
              256-Bit SSL Encrypted Razorpay Checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPages;
