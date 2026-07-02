"use client";

import Image from "next/image";
import Link from "next/link";

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

export default function BlogPage() {
  return (
    <section className="bg-[#000000] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADING */}
        <div className="text-center mb-14">
          {/* accent pill */}
          <span className="inline-block bg-[#001B38] text-[#95D7DE] text-xs font-medium px-4 py-1.5 rounded-full tracking-widest uppercase mb-4">
            Latest posts
          </span>
          {/* main heading */}
          <h1 className="text-4xl md:text-5xl font-semibold text-[#FFFFFF] mb-3">
            Our Blogs
          </h1>
          {/* muted subtext */}
          <p className="text-[#A0A0A0] text-sm">
            Latest insights, tutorials &amp; industry updates
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <article
              key={blog.id}
              className="bg-[#001B38] border border-[#A0A0A0]/10 rounded-2xl overflow-hidden group hover:border-[#95D7DE] transition-all duration-300"
            >
              {/* IMAGE */}
              <div className="relative w-full h-52 overflow-hidden bg-[#000000]">
                <Image
                  src={blog.image}
                  alt={blog.title || "Blog image"}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition duration-500"
                  priority={index === 0}
                />
                {/* accent badge */}
                <span className="absolute top-3 left-3 bg-[#95D7DE] text-[#000000] text-[11px] font-semibold px-3 py-1 rounded-full">
                  Blog
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                {/* title, accent on hover */}
                <h2 className="text-sm font-semibold text-[#FFFFFF] line-clamp-2 leading-snug mb-3 group-hover:text-[#95D7DE] transition-colors">
                  {blog.title}
                </h2>

                <p className="text-xs text-[#A0A0A0] line-clamp-3 leading-relaxed mb-4">
                  {blog.desc}
                </p>

                {/* META */}
                <div className="flex justify-between items-center py-3 border-y border-[#A0A0A0]/10 mb-4">
                  <div className="flex items-center gap-2">
                    {/* avatar circle */}
                    <div className="w-6 h-6 rounded-full bg-[#000000] flex items-center justify-center text-[#95D7DE] text-[10px] font-semibold">
                      A
                    </div>
                    <span className="text-xs text-[#A0A0A0]">By Admin</span>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-[#A0A0A0]">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    {blog.comments} Comments
                  </span>
                </div>

                {/* button */}
                <Link
                  href={`/blog/${blog.id}`}
                  className="flex items-center justify-center gap-1.5 w-full bg-[#000000] hover:bg-[#000000]/70 text-[#95D7DE] py-2.5 rounded-xl text-xs font-medium transition-colors"
                >
                  Read more
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
