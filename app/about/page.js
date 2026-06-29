"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────
const stats = [
  { value: "12,400+", label: "Orders shipped" },
  { value: "98%", label: "Satisfaction rate" },
  { value: "6", label: "Years in market" },
  { value: "24/7", label: "Customer support" },
];

const values = [
  {
    icon: "✦",
    title: "Tested before it ships",
    desc: "Every product is hands-on evaluated by our in-house tech team. No listings built from spec sheets alone.",
    topColor: "border-t-[#FF9B51]",
  },
  {
    icon: "◎",
    title: "Honest delivery dates",
    desc: "We don't promise next-day and deliver in a week. Dates are real estimates — and we notify you when anything changes.",
    topColor: "border-t-[#25343F]",
  },
  {
    icon: "↺",
    title: "Hassle-free returns",
    desc: "Faulty unit or a change of mind — no fine print. Most issues are fully resolved within 48 hours.",
    topColor: "border-t-[#BFC9D1]",
  },
];

const team = [
  {
    name: "Aryan Mehta",
    role: "Founder & CEO",
    bio: "Ex-hardware engineer at Bosch. Built ShopNest so buying genuine electronics online stops being a gamble.",
    img: "/team1.jpg",
    initials: "AM",
  },
  {
    name: "Priya Sharma",
    role: "Head of Product",
    bio: "Curates every listing and negotiates directly with brands. If it's on the site, she approved it.",
    img: "/team2.jpg",
    initials: "PS",
  },
  {
    name: "Rahul Desai",
    role: "Lead Engineer",
    bio: "Obsessed with page speed and clean error messages. Keeps the platform fast, secure, and honest.",
    img: "/team3.png",
    initials: "RD",
  },
];

const testimonials = [
  {
    name: "Neha Gupta",
    location: "Mumbai, India",
    product: "TWS Earbuds Pro",
    img: "/user1.jpg",
    initials: "NG",
    text: "Ordered a pair of wireless earbuds and received them in two days, well-packaged with all accessories included. The product page was honest about compatibility — that alone saved me from a bad purchase.",
  },
  {
    name: "James O'Brien",
    location: "Dublin, Ireland",
    product: "USB-C Braided Cable",
    img: "/user2.jpg",
    initials: "JO",
    text: "Had a cable develop a fault after three weeks. Raised a return on Sunday evening and had a replacement dispatched by Monday morning. That kind of support is genuinely rare.",
  },
  {
    name: "Lin Wei",
    location: "Singapore",
    product: "TKL Mechanical Keyboard",
    img: "/user3.jpg",
    initials: "LW",
    text: "ShopNest's descriptions are accurate — no inflated claims. The keyboard I bought looks and feels exactly as described. No surprises at all.",
  },
  {
    name: "Sandra Oliveira",
    location: "São Paulo, Brazil",
    product: "Smart Home Hub",
    img: "/user4.jpg",
    initials: "SO",
    text: "Compared prices across four stores before ordering here. The warranty clarity and return policy made it the obvious choice — and I wasn't disappointed.",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function useCountUp(target, duration = 1600, start = false) {
  const [val, setVal] = useState("");
  useEffect(() => {
    if (!start) return;
    const numeric = parseFloat(String(target).replace(/[^0-9.]/g, ""));
    if (isNaN(numeric)) {
      setVal(target);
      return;
    }
    const suffix = String(target).replace(/[0-9.]/g, "");
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(e * numeric) + suffix);
      if (p < 1) requestAnimationFrame(step);
      else setVal(target);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return val || target;
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ src, initials, size = 44 }) {
  const [err, setErr] = useState(false);

  const sizeClass =
    size <= 28
      ? "w-7 h-7 text-[9px]"
      : size <= 44
        ? "w-11 h-11 text-sm"
        : "w-12 h-12 text-base";

  if (!err) {
    return (
      <div
        className={`${sizeClass} rounded-full overflow-hidden shrink-0 border-2 border-[#BFC9D1]`}
      >
        <Image
          src={src}
          alt=""
          width={size}
          height={size}
          className="w-full h-full object-cover"
          onError={() => setErr(true)}
        />
      </div>
    );
  }
  return (
    <div
      className={`${sizeClass} rounded-full shrink-0 bg-[#25343F] flex items-center justify-center text-white font-bold`}
    >
      {initials}
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ value, label, animate }) {
  const displayed = useCountUp(value, 1600, animate);
  return (
    <div className="text-center">
      <div className="text-[clamp(32px,4vw,52px)] font-extrabold tracking-tighter text-white tabular-nums">
        {displayed}
      </div>
      <div className="text-[11px] text-[#BFC9D1] tracking-widest uppercase mt-1.5">
        {label}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const [activeT, setActiveT] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStatsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <main className="bg-[#EAEFEF] text-[#25343F] overflow-x-hidden">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-white relative overflow-hidden py-24 px-6 text-center">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "linear-gradient(#BFC9D128 1px, transparent 1px), linear-gradient(90deg, #BFC9D128 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Accent glow */}
        <div
          className="absolute -top-28 left-1/2 -translate-x-1/2 w-[640px] h-80 rounded-full z-0"
          style={{
            background:
              "radial-gradient(ellipse, #FF9B5118 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Tag pill */}
          <div className="inline-flex items-center gap-2 mb-7 border border-[#BFC9D1] rounded-full px-[18px] py-1.5 bg-[#EAEFEF]">
            <span className="w-[7px] h-[7px] rounded-full bg-[#FF9B51] inline-block" />
            <span className="text-[11px] text-gray-500 tracking-widest font-semibold uppercase">
              About ShopNest
            </span>
          </div>

          <h1 className="text-[clamp(36px,6vw,72px)] font-extrabold leading-[1.06] tracking-tighter text-[#25343F] mb-6">
            Electronics you can{" "}
            <span className="relative inline-block text-[#FF9B51]">
              actually trust
              {/* Squiggle underline */}
              <svg
                viewBox="0 0 220 12"
                className="absolute -bottom-1.5 left-0 w-full h-3 overflow-visible"
              >
                <path
                  d="M2 8 Q30 2 55 8 Q80 14 110 8 Q140 2 165 8 Q190 14 218 8"
                  fill="none"
                  stroke="#FF9B51"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              </svg>
            </span>
          </h1>

          <p className="text-lg text-gray-500 max-w-lg mx-auto mb-10 leading-[1.75]">
            ShopNest exists because buying genuine tech online shouldn't require
            a leap of faith. Every product we list, we've evaluated. Every claim
            we make, we stand behind.
          </p>

          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/shop"
              className="bg-[#25343F] text-white px-8 py-3.5 rounded-lg font-semibold text-sm hover:bg-[#1a262f] transition-colors"
            >
              Shop now
            </Link>
            <Link
              href="/contact"
              className="bg-transparent text-[#25343F] border border-[#BFC9D1] px-8 py-3.5 rounded-lg font-medium text-sm hover:border-[#25343F] transition-colors"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      {/* ── Hero Image ────────────────────────────────────────────────────── */}
      <section className="px-6 pt-8 max-w-[1100px] mx-auto">
        <div className="rounded-2xl overflow-hidden border border-[#BFC9D155] aspect-[16/6] relative bg-[#BFC9D1] shadow-[0_4px_40px_rgba(37,52,63,0.08)]">
          <Image
            src="/bigger.jpeg"
            alt="ShopNest team"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#25343F22] via-transparent to-[#25343F22]" />
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section ref={statsRef} className="bg-[#25343F] py-16 px-6 mt-12">
        <div className="max-w-[880px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <StatCard
              key={s.label}
              value={s.value}
              label={s.label}
              animate={statsVisible}
            />
          ))}
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────────────────── */}
      <section className="max-w-[1000px] mx-auto py-20 px-6">
        <p className="text-[11px] font-bold text-[#FF9B51] tracking-[0.12em] uppercase mb-3">
          How we operate
        </p>
        <h2 className="text-[clamp(26px,4vw,42px)] font-extrabold tracking-tight text-[#25343F] max-w-sm mb-12">
          Three things we never compromise on
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {values.map((v) => (
            <div
              key={v.title}
              className={`bg-white rounded-2xl border border-[#BFC9D155] border-t-[3px] ${v.topColor} p-8 shadow-[0_2px_16px_rgba(37,52,63,0.05)]`}
            >
              <div className="text-[22px] text-[#FF9B51] mb-4 leading-none">
                {v.icon}
              </div>
              <div className="text-[15px] font-bold text-[#25343F] mb-2.5">
                {v.title}
              </div>
              <div className="text-[13px] text-gray-500 leading-[1.8]">
                {v.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-[#BFC9D144] py-20 px-6">
        <div className="max-w-[880px] mx-auto">
          <p className="text-[11px] font-bold text-[#FF9B51] tracking-[0.12em] uppercase mb-3">
            Customer reviews
          </p>
          <h2 className="text-[clamp(26px,4vw,42px)] font-extrabold tracking-tight text-[#25343F] mb-11">
            What buyers actually say
          </h2>

          {/* Quote card */}
          <div className="bg-[#EAEFEF] rounded-2xl border border-[#BFC9D155] px-10 pt-10 pb-9 mb-4 relative overflow-hidden shadow-[0_2px_24px_rgba(37,52,63,0.06)]">
            {/* Large decorative quote mark */}
            <div className="absolute -top-2 left-7 text-[140px] text-[#BFC9D1] opacity-25 font-serif leading-none select-none z-0">
              "
            </div>

            <div className="relative z-10">
              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="#FF9B51"
                  >
                    <path d="M8 1l1.763 3.572 3.937.572-2.85 2.778.673 3.921L8 9.897l-3.523 1.946.673-3.921L2.3 5.144l3.937-.572z" />
                  </svg>
                ))}
              </div>

              <p className="text-[clamp(15px,2vw,19px)] leading-[1.8] text-[#25343F] mb-7 italic">
                "{testimonials[activeT].text}"
              </p>

              <div className="flex items-center gap-3.5 flex-wrap">
                <Avatar
                  src={testimonials[activeT].img}
                  initials={testimonials[activeT].initials}
                  size={48}
                />
                <div>
                  <div className="font-bold text-sm text-[#25343F]">
                    {testimonials[activeT].name}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {testimonials[activeT].location}
                  </div>
                </div>
                <div className="ml-auto">
                  <span className="text-[11px] text-white bg-[#FF9B51] rounded-full px-3.5 py-1 font-semibold tracking-wide">
                    {testimonials[activeT].product}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Reviewer selector */}
          <div className="flex gap-2 flex-wrap">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setActiveT(i)}
                className={`flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full cursor-pointer text-sm font-medium transition-all
                  ${
                    i === activeT
                      ? "border border-[#FF9B51] bg-[#FF9B5112] text-[#25343F]"
                      : "border border-[#BFC9D1] bg-white text-gray-500 hover:border-[#25343F]"
                  }`}
              >
                <Avatar src={t.img} initials={t.initials} size={26} />
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ──────────────────────────────────────────────────────────── */}
      <section className="max-w-[1000px] mx-auto py-20 px-6">
        <p className="text-[11px] font-bold text-[#FF9B51] tracking-[0.12em] uppercase mb-3">
          The team
        </p>
        <h2 className="text-[clamp(26px,4vw,42px)] font-extrabold tracking-tight text-[#25343F] mb-12">
          People behind ShopNest
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          {team.map((m) => (
            <div
              key={m.name}
              className="rounded-2xl overflow-hidden border border-[#BFC9D155] bg-white shadow-[0_2px_16px_rgba(37,52,63,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(37,52,63,0.12)]"
            >
              {/* Photo */}
              <div className="relative aspect-[4/3] bg-[#EAEFEF] overflow-hidden">
                {/* Initials fallback */}
                <div
                  className="absolute inset-0 z-0 flex items-center justify-center text-[56px] font-extrabold text-[#25343F] opacity-30"
                  style={{
                    background:
                      "linear-gradient(135deg, #BFC9D155 0%, #EAEFEF 100%)",
                  }}
                >
                  {m.initials}
                </div>
                <Image
                  src={m.img}
                  alt={m.name}
                  fill
                  className="object-cover z-10"
                  onError={() => {}}
                />
                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-[45%] z-20 bg-gradient-to-t from-white/90 to-transparent" />
                {/* Role pill */}
                <div className="absolute bottom-3.5 left-3.5 z-30 text-[10px] font-bold text-white bg-[#25343F] rounded-full px-3 py-1 uppercase tracking-widest">
                  {m.role}
                </div>
              </div>

              {/* Bio */}
              <div className="px-5 pt-5 pb-6">
                <div className="font-bold text-[17px] text-[#25343F] mb-2">
                  {m.name}
                </div>
                <div className="text-[13px] text-gray-500 leading-[1.75]">
                  {m.bio}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="px-6 pb-20">
        <div className="max-w-[1000px] mx-auto rounded-2xl text-center bg-[#25343F] py-16 px-8 relative overflow-hidden shadow-[0_20px_60px_rgba(37,52,63,0.33)]">
          {/* Accent glow top-right */}
          <div
            className="absolute -top-16 -right-16 w-72 h-72 rounded-full z-0"
            style={{
              background: "radial-gradient(circle, #FF9B5125, transparent 70%)",
            }}
          />
          {/* Secondary glow bottom-left */}
          <div
            className="absolute -bottom-12 -left-12 w-52 h-52 rounded-full z-0"
            style={{
              background: "radial-gradient(circle, #BFC9D115, transparent 70%)",
            }}
          />
          {/* Dot grid */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, #BFC9D120 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 mb-5 border border-[#BFC9D130] rounded-full px-[18px] py-1.5 bg-white/10">
              <span className="w-[7px] h-[7px] rounded-full bg-[#FF9B51] inline-block" />
              <span className="text-[11px] text-[#BFC9D1] tracking-widest font-semibold uppercase">
                Get started
              </span>
            </div>

            <h2 className="text-[clamp(22px,3.5vw,40px)] font-extrabold tracking-tight text-white mb-3">
              Ready to shop smarter?
            </h2>
            <p className="text-[#BFC9D1] text-[15px] mb-8">
              Explore our full range of tested, genuine electronics.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-[#FF9B51] text-white px-10 py-3.5 rounded-lg font-bold text-[15px] hover:bg-[#f08840] transition-colors shadow-[0_4px_20px_rgba(255,155,81,0.45)]"
            >
              Browse the store →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
