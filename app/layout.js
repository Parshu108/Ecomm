import "./globals.css";
import Navbar from "./component/navbar/page";
import Footer from "./component/footer/page";
import { ProductProvider } from "./context/productcontext";
import Providers from "./providers";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: {
    default: "Shop0 - Buy Best Products Online",
    template: " Shop0",
  },
  description: "Best eCommerce store for electronics, fashion & more",
  keywords: ["ecommerce", "buy online", "electronics", "fashion"],
  metadataBase: new URL("https://localhost:3000"),

  openGraph: {
    title: "Shop0",
    description: "Shop best products online",
    url: "https://localhost:3000",
    siteName: "Shop0",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    author: "Parshuram",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Shop0",
    description: "Best eCommerce platform",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <Providers>
          <ProductProvider>
            <Navbar />
            {children}
            <Footer />
          </ProductProvider>
        </Providers>
        <SpeedInsights/>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
