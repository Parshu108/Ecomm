// app/robots.js

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${process.env.NEXT_PUBLIC_DOMAIN || "https://localhost:3000"}/sitemap.xml`,
  };
}
