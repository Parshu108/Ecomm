"use client";

import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { motion } from "motion/react";
import { useProductcontext } from "@/app/context/productcontext";

const Navbar = () => {
  const { products, cart } = useProductcontext();
  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.qty || 1),
    0,
  );
  return (
    <>
      <nav className="w-full bg-[#ffffff] shadow-sm border-b border-[#9a8c6a] text-[#755e00]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex items-center"
            >
              <Image src="/logo.svg" alt="" width={130} height={130} />
            </motion.div>

            <div className="hidden md:flex md:items-center md:space-x-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Link
                  href="/"
                  className="text-[17px] font-medium text-[#000000] hover:text-[#facc15] hover:underline underline-offset-4 decoration-2 transition-colors"
                >
                  Home
                </Link>
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Link
                  href="/shop"
                  className="text-[17px] font-medium text-[#000000] hover:text-[#facc15] hover:underline underline-offset-4 decoration-2 transition-colors"
                >
                  Shop
                </Link>
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Link
                  href="/about"
                  className="text-[17px] font-medium text-[#000000] hover:text-[#facc15] hover:underline underline-offset-4 decoration-2 transition-colors"
                >
                  About
                </Link>
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Link
                  href="/blog"
                  className="text-[17px] font-medium text-[#000000] hover:text-[#facc15] hover:underline underline-offset-4 decoration-2 transition-colors"
                >
                  Blog
                </Link>
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Link
                  href="/contact"
                  className="text-[17px] font-medium text-[#000000] hover:text-[#facc15] hover:underline underline-offset-4 decoration-2 transition-colors"
                >
                  Contact
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex items-center space-x-2"
            >
              <Link
                href="/cart"
                className="rounded-[50px]  px-3 py-1.5 text-[18px] font-medium text-[#000000] hover:bg-[#facc15] hover:text-white transition"
              >
                <FaShoppingCart />
                {cart.length > 0 && (
                  <span className="absolute top-2 bg-[#facc15] text-[#000000] text-[10px] px-2 py-0.5 rounded-full">
                    {cart.length}
                  </span>
                )}
              </Link>
              <Link
                href="/router/login"
                className="rounded-full  px-3 py-1.5 text-[18px] hover:bg-[#facc15] hover:text-white font-medium text-[#000000]  transition"
              >
                <FaUser />
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
