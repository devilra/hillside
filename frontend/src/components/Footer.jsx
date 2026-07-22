import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 font-sans border-t border-lime-400/20 antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        {/* Main Flex Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 lg:gap-16 mb-8">
          {/* Left: Contact Info */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#0d1a12] border border-lime-400/15 flex items-center justify-center text-lime-400 shrink-0">
                <MapPinIcon size={17} />
              </span>
              <span className="text-sm text-white font-semibold leading-snug">
                Mangalam, Yelagiri, Mangalam R.F.,
                <br />
                Tamil Nadu 635853
              </span>
            </div>

            <a
              href="tel:+9551284478"
              className="flex items-center gap-3 group w-fit"
            >
              <span className="w-10 h-10 rounded-full bg-[#0d1a12] border border-lime-400/15 flex items-center justify-center text-lime-400 shrink-0 group-hover:bg-lime-400 group-hover:text-[#0b1710] group-hover:border-lime-400 transition-all duration-200">
                <PhoneIcon size={17} />
              </span>
              <span className="text-sm text-white font-semibold group-hover:text-lime-400 transition-colors duration-200">
                +91 95512 84478
              </span>
            </a>

            <a
              href="mailto:thiruyh@gmail.com"
              className="flex items-center gap-3 group w-fit"
            >
              <span className="w-10 h-10 rounded-full bg-[#0d1a12] border border-lime-400/15 flex items-center justify-center text-lime-400 shrink-0 group-hover:bg-lime-400 group-hover:text-[#0b1710] group-hover:border-lime-400 transition-all duration-200">
                <MailIcon size={17} />
              </span>
              <span className="text-sm text-lime-400 font-semibold underline underline-offset-2 decoration-lime-400/40 group-hover:decoration-lime-400 transition-colors duration-200">
                thiruyh@gmail.com
              </span>
            </a>
          </div>

          {/* Right: About the company */}
          <div className="flex flex-col gap-3 max-w-md">
            <div className="flex items-center gap-2 mb-1">
              <img
                src="/hillside/Hillsite-Favicon.webp"
                alt="Connect You Real Estate Logo"
                className="h-8 w-auto brightness-110"
              />
              <h4 className="text-sm font-semibold text-white">
                About the company
              </h4>
            </div>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-normal">
              At Hillsite, we offer exclusive land in the tranquil beauty of
              Yelagiri Hills, handpicked for their scenic views, privacy, and
              connection to nature.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-1">
              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[#0d1a12] border border-lime-400/15 flex items-center justify-center hover:bg-lime-400 hover:text-[#0b1710] hover:border-lime-400 text-slate-400 transition-all duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.19 2.23.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#0d1a12] border border-lime-400/15 flex items-center justify-center hover:bg-lime-400 hover:text-[#0b1710] hover:border-lime-400 text-slate-400 transition-all duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.95 1.35a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-[#0d1a12] border border-lime-400/15 flex items-center justify-center hover:bg-lime-400 hover:text-[#0b1710] hover:border-lime-400 text-slate-400 transition-all duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.98 3.5A2.48 2.48 0 1 1 5 8.46a2.48 2.48 0 0 1-.02-4.96ZM3 9h4v12H3V9Zm7 0h3.83v1.71h.05c.53-1.01 1.84-2.08 3.79-2.08 4.05 0 4.8 2.67 4.8 6.13V21h-4v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.95V21h-4V9Z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-[#0d1a12] border border-lime-400/15 flex items-center justify-center hover:bg-lime-400 hover:text-[#0b1710] hover:border-lime-400 text-slate-400 transition-all duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.9 2H22l-6.77 7.73L23 22h-6.14l-4.8-6.29L6.56 22H3.45l7.24-8.26L1 2h6.29l4.34 5.71L18.9 2Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider Split */}
        <div className="border-t border-lime-400/10 my-4"></div>

        {/* Bottom Section: Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left text-xs text-slate-500 font-normal">
            © {new Date().getFullYear()} Hill Site. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
