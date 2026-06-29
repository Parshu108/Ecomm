export const runtime = "nodejs";

const getRazorpay = async () => {
  const imported = await import("razorpay");
  return imported.default ?? imported;
};

const getInstance = async () => {
  const Razorpay = await getRazorpay();
  const keyId =
    process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error(
      "Missing Razorpay environment variables. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.",
    );
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
};

export async function POST(request) {
  try {
    const { amount } = await request.json();

    if (typeof amount !== "number" || amount <= 0) {
      return new Response(JSON.stringify({ error: "Invalid amount" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const instance = await getInstance();
    // ✅ app/api/order/route.js — multiply here
    const options = {
      amount: Math.round(amount * 100), // ₹231918 × 100 = 23191800 paise ✅
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await instance.orders.create(options);

    return new Response(JSON.stringify(order), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);
    console.error("Razorpay order creation failed:", error);

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
