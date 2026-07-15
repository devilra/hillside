import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 font-sans border-t border-lime-400/20 antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 mb-8">
          {/* Column 1: Brand & Contact Info (4 Units wide) */}
          <div className="lg:col-span-4 space-y-3">
            <div>
              <img
                src="/hillside/Hillsite-Favicon.webp"
                alt="Connect You Real Estate Logo"
                className="h-15 w-auto brightness-110"
              />
            </div>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-normal">
              At Hillsite, we offer exclusive land in the tranquil beauty of
              Yelagiri Hills, handpicked for their scenic views, privacy, and
              connection to nature.
            </p>
            <div className="space-y-1 text-xs text-slate-400 font-normal">
              <p className="flex items-center gap-2">
                <span>📍</span> Vashi , Navi Mumbai - 400703.
              </p>
              <p className="flex items-center gap-2">
                <span>✉️</span> thiruyh@gmail.com
              </p>
            </div>
          </div>

          {/* Column 2: Quick Navigation Links (2 Units wide) */}
          <div className="lg:col-span-2 space-y-2">
            <h4 className="text-xs font-semibold text-lime-400 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-1.5 text-xs md:text-sm font-normal">
              <li>
                <a
                  href="/"
                  className="hover:text-lime-400 transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-lime-400 transition-colors duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-lime-400 transition-colors duration-200"
                >
                  Contact Portal
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="hover:text-lime-400 transition-colors duration-200"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  className="text-slate-500 hover:text-lime-400 transition-colors duration-200"
                >
                  Admin Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Property Categories Links (2 Units wide) */}
          <div className="lg:col-span-2 space-y-2">
            <h4 className="text-xs font-semibold text-lime-400 uppercase tracking-wider">
              Our Solutions
            </h4>
            <ul className="space-y-1.5 text-xs md:text-sm font-normal">
              <li>
                <a
                  href="/properties"
                  className="hover:text-lime-400 transition-colors duration-200"
                >
                  Premium Projects
                </a>
              </li>
              <li>
                <a
                  href="/loans"
                  className="hover:text-lime-400 transition-colors duration-200"
                >
                  Home Loan Tracking
                </a>
              </li>
              <li>
                <a
                  href="/legal"
                  className="hover:text-lime-400 transition-colors duration-200"
                >
                  Legal Verification
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="hover:text-lime-400 transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription (4 Units wide) */}
          <div className="lg:col-span-4 space-y-2">
            <h4 className="text-xs font-semibold text-lime-400 uppercase tracking-wider">
              Stay Updated
            </h4>
            <p className="text-xs text-slate-400 font-normal">
              Subscribe to get premium deal alerts, legal guidelines updates,
              and local market reports.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center w-full max-w-sm mt-2"
            >
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full bg-[#0d1a12] text-xs text-white px-3 py-2 rounded-l border border-lime-400/15 focus:outline-none focus:border-lime-400/50 placeholder-slate-500"
                required
              />
              <button
                type="submit"
                className="bg-lime-400 text-[#0b1710] text-xs font-semibold px-4 py-2 rounded-r hover:bg-lime-300 transition-colors duration-200 shrink-0"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Divider Split */}
        <div className="border-t border-lime-400/10 my-4"></div>

        {/* Bottom Section: Copyright & Social Networks */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Copyright Tag */}
          <div className="text-center sm:text-left text-xs text-slate-500 font-normal order-2 sm:order-1">
            © {new Date().getFullYear()} Hill Site. All Rights Reserved.
          </div>

          {/* Cleaned Social Icon Trays */}
          <div className="flex items-center gap-3 order-1 sm:order-2">
            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-[#0d1a12] border border-lime-400/15 flex items-center justify-center hover:bg-lime-400 hover:text-[#0b1710] hover:border-lime-400 text-slate-400 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.19 2.23.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-[#0d1a12] border border-lime-400/15 flex items-center justify-center hover:bg-lime-400 hover:text-[#0b1710] hover:border-lime-400 text-slate-400 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.95 1.35a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-full bg-[#0d1a12] border border-lime-400/15 flex items-center justify-center hover:bg-lime-400 hover:text-[#0b1710] hover:border-lime-400 text-slate-400 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5A2.48 2.48 0 1 1 5 8.46a2.48 2.48 0 0 1-.02-4.96ZM3 9h4v12H3V9Zm7 0h3.83v1.71h.05c.53-1.01 1.84-2.08 3.79-2.08 4.05 0 4.8 2.67 4.8 6.13V21h-4v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.95V21h-4V9Z" />
              </svg>
            </a>

            {/* Twitter / X */}
            <a
              href="#"
              aria-label="Twitter"
              className="w-8 h-8 rounded-full bg-[#0d1a12] border border-lime-400/15 flex items-center justify-center hover:bg-lime-400 hover:text-[#0b1710] hover:border-lime-400 text-slate-400 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.9 2H22l-6.77 7.73L23 22h-6.14l-4.8-6.29L6.56 22H3.45l7.24-8.26L1 2h6.29l4.34 5.71L18.9 2Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
