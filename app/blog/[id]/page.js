"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

// 60% = white/gray-50  → page bg, cards, surfaces
// 30% = slate-800/900  → titles, body text, buttons, avatars
// 10% = yellow-400     → badges, icons, button text, quote border, hover accents

const blogs = [
  {
    id: 1,
    title: "reprehenderit non esse anim laboris reprehenderit officia",
    image: "/blogimg1.jpg",
    desc: "irure laborum qui deserunt excepteur id ad sit quis laboris duis ut cillum eiusmod non sint exercitation nulla tempor nostrud eiusmod commodo mollit magna sint laboris excepteur elit cupidatat id",
    comments: 6,
  },
  {
    id: 2,
    title: "aliquip duis nostrud ex cillum laborum adipisicing",
    image: "/blogimg2.jpg",
    desc: "adipisicing dolor esse voluptate occaecat laborum fugiat adipisicing laboris id cupidatat deserunt exercitation et velit consectetur eiusmod pariatur ullamco enim ut nulla qui minim sunt minim amet non culpa aliqua",
    comments: 8,
  },
  {
    id: 3,
    title: "consequat qui non irure mollit laboris id",
    image: "/blogimg3.jpg",
    desc: "incididunt nisi minim elit occaecat nostrud do non commodo commodo magna est et ex consequat amet fugiat aute magna reprehenderit consequat ut quis qui reprehenderit officia nostrud ex amet excepteur",
    comments: 14,
  },
  {
    id: 4,
    title: "esse est in mollit nostrud adipisicing duis",
    image: "/blogimg4.jpg",
    desc: "veniam mollit cillum aliquip quis proident cupidatat aute do cupidatat magna non ea laborum pariatur dolor sit anim et duis duis ut cupidatat cillum consectetur pariatur tempor eiusmod ea eiusmod",
    comments: 2,
  },
  {
    id: 5,
    title: "eiusmod elit deserunt eiusmod ea velit quis",
    image: "/blogimg5.jpg",
    desc: "nisi anim culpa nisi ullamco est laborum reprehenderit proident ex anim quis adipisicing tempor officia nulla deserunt ex duis consequat laboris esse mollit ea excepteur ullamco deserunt elit cupidatat cillum",
    comments: 20,
  },
  {
    id: 6,
    title: "Lorem culpa qui proident est mollit officia",
    image: "/blogimg6.jpg",
    desc: "ut sit velit esse laborum ad dolor voluptate nostrud dolore labore ipsum voluptate labore mollit exercitation veniam pariatur ipsum eiusmod irure Lorem ad culpa commodo deserunt laborum eu voluptate sint",
    comments: 10,
  },
];

const recentPosts = blogs.slice(0, 4);
const categories = [
  { name: "Design", count: 12 },
  { name: "Development", count: 8 },
  { name: "eCommerce", count: 15 },
  { name: "Tutorials", count: 6 },
];
const tags = [
  "Next.js",
  "Tailwind",
  "React",
  "MongoDB",
  "UI/UX",
  "Design",
  "Node.js",
  "API",
];

const sampleComments = [
  {
    id: 1,
    name: "John Doe",
    initials: "JD",
    date: "January 16, 2025",
    text: "adipisicing dolor esse voluptate occaecat laborum fugiat adipisicing laboris id cupidatat deserunt exercitation et velit consectetur eiusmod pariatur ullamco enim.",
  },
  {
    id: 2,
    name: "Sara Miller",
    initials: "SM",
    date: "January 18, 2025",
    text: "incididunt nisi minim elit occaecat nostrud do non commodo commodo magna est et ex consequat amet fugiat aute magna reprehenderit consequat.",
  },
];

export default function BlogDetailPage() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-slate-400 text-sm mb-4">Blog post not found.</p>
          <Link
            href="/blog"
            className="text-xs bg-slate-800 text-yellow-400 px-4 py-2 rounded-lg"
          >
            ← Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* BREADCRUMB */}
        <nav className="text-xs text-slate-400 mb-8 flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-slate-700 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-slate-700 transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-slate-700 truncate max-w-[240px]">
            {blog.title}
          </span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-6">
            {/* ARTICLE CARD */}
            <article className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
              {/* Hero image */}
              <div className="relative w-full h-64 overflow-hidden bg-slate-50">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {/* 10% yellow badge */}
                <span className="absolute top-4 left-4 bg-yellow-400 text-slate-900 text-xs font-semibold px-3 py-1 rounded-full">
                  Blog
                </span>
              </div>

              <div className="p-6 md:p-8">
                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    {/* 30% dark avatar */}
                    <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-yellow-400 text-xs font-semibold">
                      A
                    </div>
                    <span className="text-xs text-slate-500">By Admin</span>
                  </div>
                  {[
                    { icon: "📅", text: "Jan 15, 2025" },
                    { icon: "💬", text: `${blog.comments} Comments` },
                    { icon: "⏱️", text: "5 min read" },
                  ].map(({ icon, text }) => (
                    <span
                      key={text}
                      className="flex items-center gap-1.5 text-xs text-slate-400"
                    >
                      {icon} {text}
                    </span>
                  ))}
                </div>

                {/* Title — 30% dark */}
                <h1 className="text-2xl font-semibold text-slate-900 leading-snug mb-4">
                  {blog.title}
                </h1>
                <hr className="border-slate-50 mb-5" />

                {/* Body */}
                <div className="space-y-4 text-sm text-slate-500 leading-relaxed">
                  <p>{blog.desc}</p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>

                  {/* 10% yellow pull quote */}
                  <blockquote className="border-l-4 border-yellow-400 bg-yellow-50 px-5 py-3 rounded-r-xl my-5">
                    <p className="text-sm text-yellow-800 italic leading-relaxed">
                      {blog.desc.slice(0, 120)}...
                    </p>
                  </blockquote>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris.
                  </p>
                  <p>
                    veniam mollit cillum aliquip quis proident cupidatat aute do
                    cupidatat magna non ea laborum pariatur dolor sit anim et
                    duis duis ut cupidatat cillum consectetur pariatur tempor
                    eiusmod ea eiusmod.
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {[
                    "Design",
                    "Development",
                    "Next.js",
                    "Tailwind",
                    "eCommerce",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="bg-slate-50 border border-slate-200 text-slate-500 text-xs px-3 py-1.5 rounded-full hover:bg-slate-800 hover:text-yellow-400 hover:border-slate-800 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Share row */}
                <div className="flex items-center gap-2 mt-5 pt-5 border-t border-slate-50">
                  <span className="text-xs text-slate-400 mr-1">Share:</span>
                  {["Facebook", "Twitter", "LinkedIn", "Link"].map((s) => (
                    <button
                      key={s}
                      aria-label={`Share on ${s}`}
                      className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-yellow-400 text-yellow-400 hover:text-slate-900 text-xs flex items-center justify-center transition-colors border-none cursor-pointer"
                    >
                      {s === "Facebook"
                        ? "f"
                        : s === "Twitter"
                          ? "𝕏"
                          : s === "LinkedIn"
                            ? "in"
                            : "🔗"}
                    </button>
                  ))}
                </div>
              </div>
            </article>

            {/* COMMENTS */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-sm font-semibold text-slate-800 whitespace-nowrap">
                  Comments
                  <span className="ml-2 bg-slate-800 text-yellow-400 text-xs px-2 py-0.5 rounded-full">
                    {blog.comments}
                  </span>
                </h2>
                <div className="flex-1 h-px bg-slate-50" />
              </div>

              <div className="space-y-5">
                {sampleComments.map((c) => (
                  <div
                    key={c.id}
                    className="flex gap-3 pb-5 border-b border-slate-50"
                  >
                    <div className="w-9 h-9 min-w-[36px] rounded-full bg-slate-800 flex items-center justify-center text-yellow-400 text-xs font-semibold">
                      {c.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {c.name}
                      </p>
                      <p className="text-xs text-slate-400 mb-2">{c.date}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {c.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment form */}
              <div className="mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-sm font-semibold text-slate-800 whitespace-nowrap">
                    Leave a comment
                  </h3>
                  <div className="flex-1 h-px bg-slate-50" />
                </div>
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    className="border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 bg-gray-50 focus:outline-none focus:border-yellow-400 placeholder:text-slate-400"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    className="border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 bg-gray-50 focus:outline-none focus:border-yellow-400 placeholder:text-slate-400"
                  />
                </div>
                <textarea
                  rows={4}
                  placeholder="Write your comment..."
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 bg-gray-50 resize-none focus:outline-none focus:border-yellow-400 placeholder:text-slate-400 mb-3"
                />
                <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-yellow-400 px-5 py-2.5 rounded-xl text-xs font-medium transition-colors">
                  Post comment →
                </button>
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-5">
            {/* Search */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-yellow-400">⌕</span> Search
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs bg-gray-50 text-slate-800 focus:outline-none focus:border-yellow-400 placeholder:text-slate-400"
                />
                <button className="bg-slate-800 hover:bg-slate-900 text-yellow-400 px-4 py-2 rounded-xl text-xs transition-colors">
                  Go
                </button>
              </div>
            </div>

            {/* Recent posts */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-yellow-400">🕐</span> Recent posts
              </h3>
              <div className="space-y-3">
                {recentPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="flex gap-3 items-start group pb-3 border-b border-slate-50 last:border-0 last:pb-0"
                  >
                    <div className="w-12 h-12 min-w-[48px] rounded-xl bg-slate-50 border border-slate-100 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                        unoptimized
                      />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-700 group-hover:text-yellow-600 transition-colors line-clamp-2 leading-snug mb-1">
                        {post.title}
                      </p>
                      <p className="text-xs text-slate-400">Jan 2025</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-yellow-400">📁</span> Categories
              </h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <div
                    key={cat.name}
                    className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0 cursor-pointer group"
                  >
                    <span className="text-xs text-slate-500 group-hover:text-slate-800 transition-colors flex items-center gap-1.5">
                      › {cat.name}
                    </span>
                    <span className="text-xs bg-slate-800 text-yellow-400 px-2 py-0.5 rounded-full">
                      {cat.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-yellow-400">🏷️</span> Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-slate-50 border border-slate-200 text-slate-500 text-xs px-3 py-1.5 rounded-full hover:bg-slate-800 hover:text-yellow-400 hover:border-slate-800 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
