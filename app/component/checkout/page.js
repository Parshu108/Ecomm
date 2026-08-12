"use client";

import { useContext, useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import productcontext from "../../../context/productcontext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "react-toastify";
import Image from "next/image";
import axios from "axios";
import { ShieldCheck, Truck, CreditCard } from "lucide-react";

const CheckoutContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const couponCode = searchParams.get("coupon") || "";
  const discountAmount = Number(searchParams.get("discount")) || 0;

  const { cart, getCartdata, clearCart } = useContext(productcontext);

  const [paymentMethod, setPaymentMethod] = useState("razorpay"); // 'razorpay' or 'cod'

  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [sameAsBilling, setSameAsBilling] = useState(true);

  useEffect(() => {
    getCartdata();
  }, [getCartdata]);

  const handleBillingChange = (e) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  const handleShippingChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSameAsBilling = () => {
    setSameAsBilling(!sameAsBilling);
    if (!sameAsBilling) {
      setShippingInfo({
        firstName: billingInfo.firstName,
        lastName: billingInfo.lastName,
        address: billingInfo.address,
        city: billingInfo.city,
        state: billingInfo.state,
        zipCode: billingInfo.zipCode,
      });
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * (item.qty || 1),
      0,
    );
  };

  const calculateTotal = () => {
    return Math.max(0, calculateSubtotal() - discountAmount);
  };

  const handlePlaceOrder = async () => {
    if (!billingInfo.firstName || !billingInfo.email || !billingInfo.address) {
      toast.error("Please fill in all required billing details.");
      return;
    }

    const finalTotal = calculateTotal();
    const targetShipping = sameAsBilling ? billingInfo : shippingInfo;

    if (paymentMethod === "cod") {
      // Handle Cash on Delivery
      try {
        const orderData = {
          paymentMethod: "cod",
          items: cart,
          billingInfo,
          shippingInfo: targetShipping,
          subtotal: calculateSubtotal(),
          discountAmount,
          couponCode,
          total: finalTotal,
          status: "pending",
          createdAt: new Date().toISOString(),
        };

        const res = await axios.post("/api/admin/orders", {
          orderId: "NEW_COD",
          ...orderData,
        });

        localStorage.setItem("lastOrder", JSON.stringify(orderData));
        toast.success("Order Placed via Cash on Delivery! 🚚");
        clearCart();
        router.push("/admin/orders");
      } catch (err) {
        console.error("COD Error:", err);
        toast.error("Failed to place COD order. Please try again.");
      }
      return;
    }

    // Handle Online Razorpay Payment
    try {
      const response = await axios.post("/api/order", {
        amount: finalTotal,
      });

      const data = response.data;

      if (!window.Razorpay) {
        throw new Error("Razorpay checkout script is not loaded.");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "NextEcom",
        description: "Payment for your order",
        order_id: data.id,
        prefill: {
          name: `${billingInfo.firstName} ${billingInfo.lastName}`,
          email: billingInfo.email,
        },
        handler: async function (response) {
          try {
            const verifyRes = await axios.post("/api/verify-order", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              items: cart,
              billingInfo,
              shippingInfo: targetShipping,
              total: finalTotal,
            });

            if (verifyRes.data.success) {
              const orderDetails = {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                paymentMethod: "razorpay",
                items: cart,
                billingInfo,
                shippingInfo: targetShipping,
                total: finalTotal,
                status: "paid",
                createdAt: new Date().toISOString(),
              };
              localStorage.setItem("lastOrder", JSON.stringify(orderDetails));
              toast.success("Payment verified and successful!");
              clearCart();
              router.push("/admin/order");
            } else {
              toast.error("Payment verification failed!");
            }
          } catch (err) {
            console.error(err);
            toast.error("Verification error. Contact support.");
          }
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black py-8 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#95D7DE] mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-8">
            {/* Billing Information */}
            <Card className="p-6 border border-[#95D7DE]/30 bg-[#001B38]">
              <h2 className="text-xl font-semibold text-[#95D7DE] mb-4">
                Billing Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#A0A0A0] mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={billingInfo.firstName}
                    onChange={handleBillingChange}
                    className="w-full px-3 py-2 bg-black border border-[#95D7DE]/20 rounded-md text-white focus:ring-2 focus:ring-[#95D7DE]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#A0A0A0] mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={billingInfo.lastName}
                    onChange={handleBillingChange}
                    className="w-full px-3 py-2 bg-black border border-[#95D7DE]/20 rounded-md text-white focus:ring-2 focus:ring-[#95D7DE]"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#A0A0A0] mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={billingInfo.email}
                    onChange={handleBillingChange}
                    className="w-full px-3 py-2 bg-black border border-[#95D7DE]/20 rounded-md text-white focus:ring-2 focus:ring-[#95D7DE]"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#A0A0A0] mb-1">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={billingInfo.address}
                    onChange={handleBillingChange}
                    className="w-full px-3 py-2 bg-black border border-[#95D7DE]/20 rounded-md text-white focus:ring-2 focus:ring-[#95D7DE]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#A0A0A0] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={billingInfo.city}
                    onChange={handleBillingChange}
                    className="w-full px-3 py-2 bg-black border border-[#95D7DE]/20 rounded-md text-white focus:ring-2 focus:ring-[#95D7DE]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#A0A0A0] mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={billingInfo.state}
                    onChange={handleBillingChange}
                    className="w-full px-3 py-2 bg-black border border-[#95D7DE]/20 rounded-md text-white focus:ring-2 focus:ring-[#95D7DE]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#A0A0A0] mb-1">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={billingInfo.zipCode}
                    onChange={handleBillingChange}
                    className="w-full px-3 py-2 bg-black border border-[#95D7DE]/20 rounded-md text-white focus:ring-2 focus:ring-[#95D7DE]"
                    required
                  />
                </div>
              </div>
            </Card>

            {/* Payment Method Selector */}
            <Card className="p-6 border border-[#95D7DE]/30 bg-[#001B38] space-y-4">
              <h2 className="text-xl font-semibold text-white">
                Payment Method
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("razorpay")}
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 text-sm font-bold transition ${
                    paymentMethod === "razorpay"
                      ? "border-[#95D7DE] bg-[#95D7DE]/20 text-[#95D7DE]"
                      : "border-slate-800 bg-black/50 text-slate-400 hover:text-white"
                  }`}
                >
                  <CreditCard className="w-6 h-6" />
                  <span>Razorpay / UPI / Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 text-sm font-bold transition ${
                    paymentMethod === "cod"
                      ? "border-[#95D7DE] bg-[#95D7DE]/20 text-[#95D7DE]"
                      : "border-slate-800 bg-black/50 text-slate-400 hover:text-white"
                  }`}
                >
                  <Truck className="w-6 h-6" />
                  <span>Cash on Delivery (COD)</span>
                </button>
              </div>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <Card className="p-6 sticky top-4 border border-[#95D7DE]/30 bg-[#001B38] space-y-5">
              <h2 className="text-xl font-semibold text-white">
                Order Summary
              </h2>

              {cart.length === 0 ? (
                <p className="text-[#A0A0A0]">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {cart.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <Image
                          src={item.image || "/fallback.png"}
                          alt={item.name || item.title || "Product"}
                          width={60}
                          height={60}
                          className="w-12 h-12 object-cover rounded-md border border-[#95D7DE]/10"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-white text-sm">
                            {item.name || item.title}
                          </h3>
                          <p className="text-[#A0A0A0] text-xs">
                            {item.qty || 1} x ₹{item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[#95D7DE]/10 pt-4 space-y-2 text-sm">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal:</span>
                      <span>₹{calculateSubtotal()}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-400 font-bold">
                        <span>Discount ({couponCode}):</span>
                        <span>-₹{discountAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-slate-800">
                      <span>Total Amount:</span>
                      <span className="text-[#95D7DE]">
                        ₹{calculateTotal()}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handlePlaceOrder}
                    className="w-full mt-4 p-5 bg-[#95D7DE] hover:bg-[#7FC5CD] text-black font-extrabold text-base rounded-xl transition shadow-lg shadow-[#95D7DE]/20"
                  >
                    {paymentMethod === "cod"
                      ? "Confirm Order (COD)"
                      : "Pay Now with Razorpay"}
                  </Button>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutFallback = () => (
  <div className="min-h-screen bg-black flex items-center justify-center text-slate-100">
    <div className="flex flex-col items-center gap-3">
      <div className="h-8 w-8 rounded-full border-2 border-[#95D7DE] border-t-transparent animate-spin" />
      <p className="text-[#A0A0A0] text-sm">Loading checkout...</p>
    </div>
  </div>
);

const CheckoutPage = () => {
  return (
    <Suspense fallback={<CheckoutFallback />}>
      <CheckoutContent />
    </Suspense>
  );
};

export default CheckoutPage;
