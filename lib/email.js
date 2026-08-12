import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
  port: parseInt(process.env.SMTP_PORT || "2525"),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendOrderEmail = async ({ to, subject, order }) => {
  if (!to) return;
  
  const itemsHtml = (order.items || [])
    .map(
      (item) => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name || item.title || "Product"}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.qty || item.quantity || 1}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price}</td>
      </tr>
    `
    )
    .join("");

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; rounded: 8px;">
      <h2 style="color: #4F46E5; text-align: center;">NextEcom Order Notification</h2>
      <p>Hello,</p>
      <p>Your order status has been updated: <strong>${(order.status || "Processing").toUpperCase()}</strong></p>
      <div style="background: #f9fafb; padding: 15px; border-radius: 6px; margin: 20px 0;">
        <p><strong>Order ID:</strong> ${order._id || order.razorpay_order_id || "N/A"}</p>
        <p><strong>Payment Method:</strong> ${(order.paymentMethod || "Razorpay").toUpperCase()}</p>
        <p><strong>Total Amount:</strong> ₹${order.total}</p>
      </div>

      <h3>Order Items</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background: #f3f4f6;">
            <th style="padding: 8px; text-align: left;">Item</th>
            <th style="padding: 8px; text-align: center;">Qty</th>
            <th style="padding: 8px; text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <p style="color: #6b7280; font-size: 13px; text-align: center;">Thank you for shopping with NextEcom!</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"NextEcom Orders" <no-reply@nextecom.com>`,
      to,
      subject,
      html,
    });
    console.log(`✉️ Email sent successfully to ${to}`);
  } catch (err) {
    console.error("❌ Email sending failed:", err.message);
  }
};
