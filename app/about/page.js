"use client";

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaRegStar } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
  {
    id: 1,
    name: "Ridoy Rock",
    location: "London, UK",
    image: "/user1.jpg",
    review:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    id: 2,
    name: "John Smith",
    location: "New York, USA",
    image: "/user2.jpg",
    review:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    id: 3,
    name: "Sarah Lee",
    location: "Canada",
    image: "/user3.jpg",
    review:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    id: 4,
    name: "Michael",
    location: "Australia",
    image: "/user4.jpg",
    review:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
];


export default function AboutPage() {
  return (
    <section className="bg-white text-gray-800">
      {/* 🔥 HERO SECTION */}
      <div className=" text-black py-6">
        <div className="max-w-7xl mx-auto px-3 text-center">
          <h1 className="text-4xl text-yellow-600 md:text-5xl font-bold">
            About Our Company
          </h1>
        </div>
      </div>

      {/* 🔥 ABOUT SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <div className="relative w-full h-80 group">
          <Image
            src="/about.png"
            alt="Team working on web development"
            fill
            className="object-cover rounded-xl group-hover:scale-105 transition duration-500"
            priority
          />
        </div>

        {/* Text */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Who We Are</h2>

          <p className="text-gray-600 leading-relaxed">
            We are passionate developers focused on building modern web
            applications with clean UI and high performance. Our mission is to
            deliver scalable solutions for real-world problems.
          </p>

          <p className="text-gray-600 mt-4">
            Using technologies like React, Next.js, and Tailwind CSS, we ensure
            fast loading, SEO optimization, and seamless user experience.
          </p>

          {/* Highlight */}
          <div className="mt-6 flex gap-4">
            <div className="bg-yellow-100 px-4 py-2 rounded-lg text-sm">
              ⚡ Fast Performance
            </div>
            <div className="bg-green-100 px-4 py-2 rounded-lg text-sm">
              📱 Responsive Design
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 STATS SECTION */}
      <div className="bg-slate-500 text-white py-14">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="text-3xl text-yellow-500 font-bold">100+</h3>
            <p className="text-black">Projects</p>
          </div>

          <div>
            <h3 className="text-3xl text-yellow-500 font-bold">50+</h3>
            <p className="text-black">Clients</p>
          </div>

          <div>
            <h3 className="text-3xl text-yellow-500 font-bold">3+</h3>
            <p className="text-black">Years Experience</p>
          </div>

          <div>
            <h3 className="text-3xl text-yellow-500 font-bold">24/7</h3>
            <p className="text-black">Support</p>
          </div>
        </div>
      </div>

      <section className="bg-[#f6f6f6] py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#111]">
              Customers Feedback
            </h2>
          </div>

          {/* Slider */}
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            modules={[Navigation, Autoplay]}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
            className="pb-20"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="bg-white p-10 h-full transition-all duration-500 hover:shadow-2xl group">
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <FaRegStar
                        key={i}
                        size={20}
                        className="fill-[#ffb400] text-[#ffb400]"
                      />
                    ))}

                    <span className="text-[#555] ml-2">(5.0)</span>
                  </div>

                  {/* Review */}
                  <p className="text-[#777] text-lg leading-9 mb-12">
                    {item.review}
                  </p>

                  {/* User */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <h4 className="text-2xl font-semibold text-[#111]">
                        {item.name}
                      </h4>

                      <p className="text-[#777] text-lg">{item.location}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-5 mt-10">
            <button className="custom-prev w-14 h-14 rounded-full border border-[#ffb400] text-[#ffb400] hover:bg-[#ffb400] hover:text-white transition duration-300 flex items-center justify-center text-2xl">
              ←
            </button>

            <button className="custom-next w-14 h-14 rounded-full bg-[#ffb400] text-white hover:scale-110 transition duration-300 flex items-center justify-center text-2xl">
              →
            </button>
          </div>
        </div>
      </section>

      {/* 🔥 VALUES SECTION */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Our Values</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: "Quality Code",
                desc: "Clean, scalable and maintainable code structure.",
              },
              {
                title: "User Experience",
                desc: "Smooth and intuitive UI design for users.",
              },
              {
                title: "Performance",
                desc: "Fast loading optimized applications.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-xl shadow hover:shadow-xl hover:-translate-y-2 transition duration-300"
              >
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-500 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔥 TEAM SECTION */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10">Meet Our Team</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {["team1.jpg", "team2.jpg", "team3.png"].map((img, i) => (
              <div key={i} className="bg-white rounded-xl shadow p-5">
                <div className="relative w-full h-48">
                  <Image
                    src={`/${img}`}
                    alt="Team member"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="mt-4 font-semibold">Team Member</h3>
                <p className="text-gray-500 text-sm">Frontend Developer</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
