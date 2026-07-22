import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-lime-400/20 text-slate-300">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {/* Company */}
          <div>
            <div className="flex items-center  mb-3">
              <img
                src="/hillside/Hillsite-Favicon.webp"
                alt="Hill Site"
                className="h-10 w-auto"
              />

              <div>
                <h1 className="font-['Lugrasimo'] text-white text-[22px] md:text-[20px] tracking-wide">
                  Hillsite
                </h1>

                {/* <p className="text-xs text-lime-400">Premium Land Investment</p> */}
              </div>
            </div>

            <p className="text-sm leading-6 text-slate-400">
              Discover premium plots in the heart of Yelagiri Hills. Every
              property is carefully selected for scenic mountain views, peaceful
              surroundings, clean air and long-term investment value.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 mt-3">
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-lime-400/15 bg-[#0d1a12] flex items-center justify-center hover:bg-lime-400 hover:text-black transition"
              >
                {/* Facebook */}
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.19 2.23.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
                </svg>
              </a>

              <a
                href="#"
                className="w-8 h-8 rounded-full border border-lime-400/15 bg-[#0d1a12] flex items-center justify-center hover:bg-lime-400 hover:text-black transition"
              >
                {/* Instagram */}
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.95 1.35a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z" />
                </svg>
              </a>

              <a
                href="#"
                className="w-8 h-8 rounded-full border border-lime-400/15 bg-[#0d1a12] flex items-center justify-center hover:bg-lime-400 hover:text-black transition"
              >
                {/* LinkedIn */}
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.98 3.5A2.48 2.48 0 1 1 5 8.46a2.48 2.48 0 0 1-.02-4.96ZM3 9h4v12H3V9Zm7 0h3.83v1.71h.05c.53-1.01 1.84-2.08 3.79-2.08 4.05 0 4.8 2.67 4.8 6.13V21h-4v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.95V21h-4V9Z" />
                </svg>
              </a>

              <a
                href="#"
                className="w-8 h-8 rounded-full border border-lime-400/15 bg-[#0d1a12] flex items-center justify-center hover:bg-lime-400 hover:text-black transition"
              >
                {/* X */}
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.9 2H22l-6.77 7.73L23 22h-6.14l-4.8-6.29L6.56 22H3.45l7.24-8.26L1 2h6.29l4.34 5.71L18.9 2Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}

          {/* <div>
            <h3 className="text-white text-base font-semibold mb-3">
              Quick Links
            </h3>

            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-lime-400 transition">
                  Home
                </a>
              </li>

              <li>
                <a href="/about" className="hover:text-lime-400 transition">
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="/properties"
                  className="hover:text-lime-400 transition"
                >
                  Properties
                </a>
              </li>

              <li>
                <a href="/gallery" className="hover:text-lime-400 transition">
                  Gallery
                </a>
              </li>

              <li>
                <a href="/contact" className="hover:text-lime-400 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div> */}

          {/* Contact */}
          <div>
            <h3 className="text-white text-base font-semibold mb-3">
              Contact Us
            </h3>

            <div className="space-y-3">
              {/* Address */}
              <div className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-full bg-[#0d1a12] border border-lime-400/15 flex items-center justify-center text-lime-400 shrink-0">
                  <MapPinIcon size={16} />
                </span>

                <div>
                  <h4 className="text-white text-sm font-medium">
                    Office Address
                  </h4>

                  <p className="text-xs text-slate-400 leading-5">
                    Mangalam, Yelagiri Hills, Tamil Nadu - 635853
                  </p>
                </div>
              </div>

              {/* Phone */}

              <a
                href="tel:+919551284478"
                className="flex items-start gap-3 group"
              >
                <span className="w-9 h-9 rounded-full bg-[#0d1a12] border border-lime-400/15 flex items-center justify-center text-lime-400 group-hover:bg-lime-400 group-hover:text-black transition shrink-0">
                  <PhoneIcon size={16} />
                </span>

                <div>
                  <h4 className="text-white text-sm font-medium">
                    Phone Number
                  </h4>

                  <p className="text-xs text-slate-400 group-hover:text-lime-400 transition">
                    +91 95512 84478
                  </p>
                </div>
              </a>

              {/* Email */}

              <a
                href="mailto:thiruyh@gmail.com"
                className="flex items-start gap-3 group"
              >
                <span className="w-9 h-9 rounded-full bg-[#0d1a12] border border-lime-400/15 flex items-center justify-center text-lime-400 group-hover:bg-lime-400 group-hover:text-black transition shrink-0">
                  <MailIcon size={16} />
                </span>

                <div>
                  <h4 className="text-white text-sm font-medium">
                    Email Address
                  </h4>

                  <p className="text-xs text-lime-400 underline underline-offset-2">
                    thiruyh@gmail.com
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}

        <div className="border-t border-lime-400/10 mt-6 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-center">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Hill Site. All Rights Reserved.
            </p>

            <p className="text-xs text-slate-500">
              Designed & Developed by{" "}
              <a
                href="https://amigowebster.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lime-400 hover:text-lime-300 font-semibold transition"
              >
                amigowebster.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
