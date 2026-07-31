"use client";

import Image from "next/image";
import Link from "next/link";
import { useProductcontext } from "../../context/productcontext";
import { FaTrashAlt, FaLock, FaArrowLeft, FaShoppingBag, FaTag } from "react-icons/fa";

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
    0
  );

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-[#07090e] px-4">
        <div className="glass-panel p-10 rounded-3xl max-w-md w-full space-y-5 border border-slate-800">
          <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-cyan-400 text-3xl shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            <FaShoppingBag />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Your Cart is Empty</h1>
          <p className="text-slate-400 text-sm">
            Looks like you haven't added any products to your shopping cart yet.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-cyan-500 text-black text-sm font-extrabold hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          >
            <FaArrowLeft className="text-xs" /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#07090e] min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-slate-100">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Shopping Cart</h1>
          <p className="text-sm text-slate-400 mt-1">
            Review your selected tech gear before checkout.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* CART ITEMS LIST */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="glass-panel rounded-2xl p-5 border border-slate-800/80 flex flex-col sm:flex-row gap-5 items-center justify-between hover:border-cyan-500/40 transition-all"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-20 h-20 bg-slate-950 rounded-xl flex-shrink-0 p-2 border border-slate-800 flex items-center justify-center">
                    <Image
                      src={item.image || "/fallback.png"}
                      alt={item.name || item.title || "Product"}
                      fill
                      className="object-contain p-1"
                      unoptimized
                    />
                  </div>

                  <div className="space-y-1 min-w-0">
                    <h3 className="text-base font-bold text-white truncate">
                      {item.name || item.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      ₹{item.price} per item
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  {/* QUANTITY ADJUSTER */}
                  <div className="flex items-center border border-slate-800 rounded-xl bg-slate-900 overflow-hidden">
                    <button
                      onClick={() => decreaseQty?.(item._id)}
                      className="w-8 h-8 text-cyan-400 hover:bg-slate-800 transition-colors font-bold flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-xs font-bold font-mono text-white">
                      {item.qty || 1}
                    </span>
                    <button
                      onClick={() => increaseQty?.(item._id)}
                      className="w-8 h-8 text-cyan-400 hover:bg-slate-800 transition-colors font-bold flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>

                  {/* PRICE & REMOVE */}
                  <div className="text-right">
                    <span className="text-base font-extrabold text-cyan-400 font-mono block">
                      ₹{item.price * (item.qty || 1)}
                    </span>
                    <button
                      onClick={() => removeFromCart?.(item._id)}
                      className="text-xs text-slate-500 hover:text-red-400 transition-colors inline-flex items-center gap-1 mt-1"
                    >
                      <FaTrashAlt /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={clearCart}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all"
              >
                Clear Entire Cart
              </button>

              <Link
                href="/shop"
                className="text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6 h-fit sticky top-24">
            <h2 className="text-lg font-bold text-white">Order Summary</h2>

            <div className="space-y-3 text-sm font-medium">
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
                  placeholder="Promo code (e.g. SHOP2026)"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-16 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
                <button className="absolute right-1 px-3 py-1.5 rounded-lg bg-slate-800 text-cyan-400 text-[11px] font-bold hover:bg-slate-700">
                  Apply
                </button>
              </div>
            </div>

            <div className="border-t border-slate-800/80 pt-4 flex justify-between items-center">
              <span className="text-base font-bold text-white">Total Amount</span>
              <span className="text-2xl font-extrabold text-cyan-400 font-mono">
                ₹{total}
              </span>
            </div>

            <Link
              href="/component/checkout"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-cyan-500 text-black text-sm font-extrabold hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            >
              <FaLock className="text-xs" /> Proceed to Checkout
            </Link>

            <p className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5">
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
