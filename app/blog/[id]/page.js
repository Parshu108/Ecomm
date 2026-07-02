"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

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
      <div className="min-h-screen flex items-center justify-center bg-[#000000]">
        <div className="text-center">
          <p className="text-[#A0A0A0] text-sm mb-4">Blog post not found.</p>
          <Link
            href="/blog"
            className="text-xs bg-[#001B38] text-[#95D7DE] px-4 py-2 rounded-lg"
          >
            ← Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#000000] min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* BREADCRUMB */}
        <nav className="text-xs text-[#A0A0A0] mb-8 flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-[#95D7DE] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#95D7DE] transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-[#FFFFFF] truncate max-w-[240px]">
            {blog.title}
          </span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-6">
            {/* ARTICLE CARD */}
            <article className="bg-[#001B38] border border-[#A0A0A0]/10 rounded-2xl overflow-hidden">
              {/* Hero image */}
              <div className="relative w-full h-64 overflow-hidden bg-[#000000]">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {/* accent badge */}
                <span className="absolute top-4 left-4 bg-[#95D7DE] text-[#000000] text-xs font-semibold px-3 py-1 rounded-full">
                  Blog
                </span>
              </div>

              <div className="p-6 md:p-8">
                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    {/* avatar */}
                    <div className="w-7 h-7 rounded-full bg-[#000000] flex items-center justify-center text-[#95D7DE] text-xs font-semibold">
                      A
                    </div>
                    <span className="text-xs text-[#A0A0A0]">By Admin</span>
                  </div>
                  {[
                    { icon: "📅", text: "Jan 15, 2025" },
                    { icon: "💬", text: `${blog.comments} Comments` },
                    { icon: "⏱️", text: "5 min read" },
                  ].map(({ icon, text }) => (
                    <span
                      key={text}
                      className="flex items-center gap-1.5 text-xs text-[#A0A0A0]"
                    >
                      {icon} {text}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h1 className="text-2xl font-semibold text-[#FFFFFF] leading-snug mb-4">
                  {blog.title}
                </h1>
                <hr className="border-[#A0A0A0]/10 mb-5" />

                {/* Body */}
                <div className="space-y-4 text-sm text-[#A0A0A0] leading-relaxed">
                  <p>{blog.desc}</p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>

                  {/* accent pull quote */}
                  <blockquote className="border-l-4 border-[#95D7DE] bg-[#000000] px-5 py-3 rounded-r-xl my-5">
                    <p className="text-sm text-[#95D7DE] italic leading-relaxed">
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
                      className="bg-[#000000] border border-[#A0A0A0]/20 text-[#A0A0A0] text-xs px-3 py-1.5 rounded-full hover:bg-[#95D7DE] hover:text-[#000000] hover:border-[#95D7DE] transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Share row */}
                <div className="flex items-center gap-2 mt-5 pt-5 border-t border-[#A0A0A0]/10">
                  <span className="text-xs text-[#A0A0A0] mr-1">Share:</span>
                  {["Facebook", "Twitter", "LinkedIn", "Link"].map((s) => (
                    <button
                      key={s}
                      aria-label={`Share on ${s}`}
                      className="w-8 h-8 rounded-lg bg-[#000000] hover:bg-[#95D7DE] text-[#95D7DE] hover:text-[#000000] text-xs flex items-center justify-center transition-colors border-none cursor-pointer"
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
            <div className="bg-[#001B38] border border-[#A0A0A0]/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-sm font-semibold text-[#FFFFFF] whitespace-nowrap">
                  Comments
                  <span className="ml-2 bg-[#000000] text-[#95D7DE] text-xs px-2 py-0.5 rounded-full">
                    {blog.comments}
                  </span>
                </h2>
                <div className="flex-1 h-px bg-[#A0A0A0]/10" />
              </div>

              <div className="space-y-5">
                {sampleComments.map((c) => (
                  <div
                    key={c.id}
                    className="flex gap-3 pb-5 border-b border-[#A0A0A0]/10"
                  >
                    <div className="w-9 h-9 min-w-[36px] rounded-full bg-[#000000] flex items-center justify-center text-[#95D7DE] text-xs font-semibold">
                      {c.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#FFFFFF]">
                        {c.name}
                      </p>
                      <p className="text-xs text-[#A0A0A0] mb-2">{c.date}</p>
                      <p className="text-xs text-[#A0A0A0] leading-relaxed">
                        {c.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment form */}
              <div className="mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-sm font-semibold text-[#FFFFFF] whitespace-nowrap">
                    Leave a comment
                  </h3>
                  <div className="flex-1 h-px bg-[#A0A0A0]/10" />
                </div>
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    className="border border-[#A0A0A0]/20 rounded-xl px-4 py-2.5 text-xs text-[#FFFFFF] bg-[#000000] focus:outline-none focus:border-[#95D7DE] placeholder:text-[#A0A0A0]"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    className="border border-[#A0A0A0]/20 rounded-xl px-4 py-2.5 text-xs text-[#FFFFFF] bg-[#000000] focus:outline-none focus:border-[#95D7DE] placeholder:text-[#A0A0A0]"
                  />
                </div>
                <textarea
                  rows={4}
                  placeholder="Write your comment..."
                  className="w-full border border-[#A0A0A0]/20 rounded-xl px-4 py-2.5 text-xs text-[#FFFFFF] bg-[#000000] resize-none focus:outline-none focus:border-[#95D7DE] placeholder:text-[#A0A0A0] mb-3"
                />
                <button className="flex items-center gap-2 bg-[#000000] hover:bg-[#000000]/70 text-[#95D7DE] px-5 py-2.5 rounded-xl text-xs font-medium transition-colors">
                  Post comment →
                </button>
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-5">
            {/* Search */}
            <div className="bg-[#001B38] border border-[#A0A0A0]/10 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-[#FFFFFF] mb-3 flex items-center gap-2">
                <span className="text-[#95D7DE]">⌕</span> Search
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="flex-1 border border-[#A0A0A0]/20 rounded-xl px-3 py-2 text-xs bg-[#000000] text-[#FFFFFF] focus:outline-none focus:border-[#95D7DE] placeholder:text-[#A0A0A0]"
                />
                <button className="bg-[#000000] hover:bg-[#000000]/70 text-[#95D7DE] px-4 py-2 rounded-xl text-xs transition-colors">
                  Go
                </button>
              </div>
            </div>

            {/* Recent posts */}
            <div className="bg-[#001B38] border border-[#A0A0A0]/10 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-[#FFFFFF] mb-4 flex items-center gap-2">
                <span className="text-[#95D7DE]">🕐</span> Recent posts
              </h3>
              <div className="space-y-3">
                {recentPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="flex gap-3 items-start group pb-3 border-b border-[#A0A0A0]/10 last:border-0 last:pb-0"
                  >
                    <div className="w-12 h-12 min-w-[48px] rounded-xl bg-[#000000] border border-[#A0A0A0]/10 overflow-hidden">
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
                      <p className="text-xs font-medium text-[#FFFFFF] group-hover:text-[#95D7DE] transition-colors line-clamp-2 leading-snug mb-1">
                        {post.title}
                      </p>
                      <p className="text-xs text-[#A0A0A0]">Jan 2025</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-[#001B38] border border-[#A0A0A0]/10 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-[#FFFFFF] mb-4 flex items-center gap-2">
                <span className="text-[#95D7DE]">📁</span> Categories
              </h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <div
                    key={cat.name}
                    className="flex justify-between items-center py-2 border-b border-[#A0A0A0]/10 last:border-0 cursor-pointer group"
                  >
                    <span className="text-xs text-[#A0A0A0] group-hover:text-[#FFFFFF] transition-colors flex items-center gap-1.5">
                      › {cat.name}
                    </span>
                    <span className="text-xs bg-[#000000] text-[#95D7DE] px-2 py-0.5 rounded-full">
                      {cat.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-[#001B38] border border-[#A0A0A0]/10 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-[#FFFFFF] mb-4 flex items-center gap-2">
                <span className="text-[#95D7DE]">🏷️</span> Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#000000] border border-[#A0A0A0]/20 text-[#A0A0A0] text-xs px-3 py-1.5 rounded-full hover:bg-[#95D7DE] hover:text-[#000000] hover:border-[#95D7DE] transition-colors cursor-pointer"
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
