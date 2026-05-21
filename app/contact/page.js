"use client";

import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";

export default function ContactPage() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // Reset form
    setFormData({
      firstName: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Contact</h1>
          <p className="text-gray-500 mt-2">
            Fill the form below or write us. We will help you as soon as
            possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 space-y-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Contact Information
            </h2>

            {/* Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Phone */}
              <div
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl 
          hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="text-2xl text-yellow-500 group-hover:scale-110 transition">
                  <FaPhoneAlt />
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Phone</p>
                  <p className="text-gray-500 text-sm">+(323) 9847 3847 383</p>
                  <p className="text-gray-500 text-sm">+(434) 5466 5467 443</p>
                </div>
              </div>

              {/* Email */}
              <div
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl 
          hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="text-2xl text-yellow-500 group-hover:scale-110 transition">
                  <MdMailOutline />
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Email</p>
                  <p className="text-gray-500 text-sm">demoemail@gmail.com</p>
                  <p className="text-gray-500 text-sm">
                    rafiqulislamsuvobd@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div
              className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl 
        hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="text-2xl text-yellow-500 group-hover:scale-110 transition">
                <IoLocationOutline />
              </div>
              <div>
                <p className="font-semibold text-gray-700">Address</p>
                <p className="text-gray-500 text-sm">
                  4517 Washington Ave. Manchester Road 2342, Kentucky 39495
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="w-full h-64 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
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
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 space-y-5"
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              Get In Touch
            </h2>

            <input
              type="text"
              name="firstName"
              placeholder="First Name*"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 
          focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 
          outline-none transition"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address*"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 
          focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 
          outline-none transition"
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject*"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 
          focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 
          outline-none transition"
              required
            />

            <textarea
              name="message"
              rows="4"
              placeholder="Type your message here"
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 
          focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 
          outline-none transition"
              required
            />

            <button
              type="submit"
              className="w-full bg-yellow-500 text-black py-3 rounded-lg font-semibold 
          hover:bg-yellow-400 transition duration-300 shadow-sm hover:shadow-md"
            >
              Send Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
