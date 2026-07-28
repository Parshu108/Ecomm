"use client";

import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";

export default function ContactPage() {
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleSubmit = async (e) => {
   e.preventDefault();
   setStatus({ loading: true, success: false, error: "" });

   try {
     const res = await fetch("/api/contact", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(formData),
     });

     const data = await res.json();

     if (!res.ok) throw new Error(data.error || "Something went wrong");

     setStatus({ loading: false, success: true, error: "" });
     setFormData({ firstName: "", email: "", subject: "", message: "" });
   } catch (err) {
     setStatus({ loading: false, success: false, error: err.message });
   }
 };

  return (
    <section className="bg-[#000000] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#FFFFFF]">Contact</h1>
          <p className="text-[#A0A0A0] mt-2">
            Fill the form below or write us. We will help you as soon as
            possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="bg-[#001B38] p-8 rounded-2xl border border-[#A0A0A0]/10 hover:border-[#95D7DE]/30 transition duration-300 space-y-8">
            <h2 className="text-2xl font-bold text-[#FFFFFF]">
              Contact Information
            </h2>

            {/* Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Phone */}
              <div
                className="flex items-start gap-4 p-4 bg-[#000000] rounded-xl 
          hover:-translate-y-1 hover:shadow-[0_8px_24px_-4px_rgba(149,215,222,0.15)] transition-all duration-300 group"
              >
                <div className="text-2xl text-[#95D7DE] group-hover:scale-110 transition">
                  <FaPhoneAlt />
                </div>
                <div>
                  <p className="font-semibold text-[#FFFFFF]">Phone</p>
                  <p className="text-[#A0A0A0] text-sm">+(323) 9847 3847 383</p>
                  <p className="text-[#A0A0A0] text-sm">+(434) 5466 5467 443</p>
                </div>
              </div>

              {/* Email */}
              <div
                className="flex items-start gap-4 p-4 bg-[#000000] rounded-xl 
          hover:-translate-y-1 hover:shadow-[0_8px_24px_-4px_rgba(149,215,222,0.15)] transition-all duration-300 group"
              >
                <div className="text-2xl text-[#95D7DE] group-hover:scale-110 transition">
                  <MdMailOutline />
                </div>
                <div>
                  <p className="font-semibold text-[#FFFFFF]">Email</p>
                  <p className="text-[#A0A0A0] text-sm">demoemail@gmail.com</p>
                  <p className="text-[#A0A0A0] text-sm">
                    rafiqulislamsuvobd@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div
              className="flex items-start gap-4 p-4 bg-[#000000] rounded-xl 
        hover:-translate-y-1 hover:shadow-[0_8px_24px_-4px_rgba(149,215,222,0.15)] transition-all duration-300 group"
            >
              <div className="text-2xl text-[#95D7DE] group-hover:scale-110 transition">
                <IoLocationOutline />
              </div>
              <div>
                <p className="font-semibold text-[#FFFFFF]">Address</p>
                <p className="text-[#A0A0A0] text-sm">
                  4517 Washington Ave. Manchester Road 2342, Kentucky 39495
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="w-full h-64 rounded-xl overflow-hidden border border-[#A0A0A0]/10 grayscale-[0.3] contrast-125 hover:grayscale-0 transition duration-300">
              <iframe
                src="https://www.google.com/maps?q=Kentucky%2039495&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#001B38] p-8 rounded-2xl border border-[#A0A0A0]/10 hover:border-[#95D7DE]/30 transition duration-300 space-y-5"
          >
            <h2 className="text-2xl font-semibold text-[#FFFFFF]">
              Get In Touch
            </h2>

            <input
              type="text"
              name="firstName"
              placeholder="First Name*"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-[#A0A0A0]/20 bg-[#000000] text-[#FFFFFF] placeholder:text-[#A0A0A0] rounded-lg px-4 py-3 
          focus:ring-2 focus:ring-[#95D7DE]/40 focus:border-[#95D7DE] 
          outline-none transition"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address*"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-[#A0A0A0]/20 bg-[#000000] text-[#FFFFFF] placeholder:text-[#A0A0A0] rounded-lg px-4 py-3 
          focus:ring-2 focus:ring-[#95D7DE]/40 focus:border-[#95D7DE] 
          outline-none transition"
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject*"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-[#A0A0A0]/20 bg-[#000000] text-[#FFFFFF] placeholder:text-[#A0A0A0] rounded-lg px-4 py-3 
          focus:ring-2 focus:ring-[#95D7DE]/40 focus:border-[#95D7DE] 
          outline-none transition"
              required
            />

            <textarea
              name="message"
              rows="4"
              placeholder="Type your message here"
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-[#A0A0A0]/20 bg-[#000000] text-[#FFFFFF] placeholder:text-[#A0A0A0] rounded-lg px-4 py-3 
          focus:ring-2 focus:ring-[#95D7DE]/40 focus:border-[#95D7DE] 
          outline-none transition"
              required
            />
            {status.success && (
              <p className="text-[#95D7DE] text-sm">
                Message sent! Well get back to you soon.
              </p>
            )}
            {status.error && (
              <p className="text-red-400 text-sm">{status.error}</p>
            )}
            <button
              type="submit"
              disabled={status.loading}
              className="w-full bg-[#95D7DE] text-[#000000] py-3 rounded-lg font-semibold 
          hover:bg-[#FFFFFF] transition duration-300"
            >
              {status.loading ? "Sending..." : "Send Now"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
