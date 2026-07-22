import React, { useState, useEffect, useRef } from "react";
import { User, Calendar, Menu, X } from "lucide-react";

export default function Navbar() {
  // Mobile menu sidebar drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobileMenuRef = useRef(null);

  // Close mobile drawer automatically if a user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest(".mobile-toggle-btn")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    /* Floating rounded glass navbar — same shape/layout as the Stream Side reference:
       - Sits with top margin (not edge-to-edge), inside a max-w-7xl wrapper
       - Rounded-2xl pill container, dark glass bg, subtle border + shadow
       - Centered nav links with an active underline on the current page
       - Circular user icon button + lime pill action button on the right
    */
    <header className="fixed top-4 left-0 right-0 z-50 px-2 md:px-8 max-w-7xl mx-auto">
      <nav className="relative flex items-center justify-between px-4 py-3 md:py-0 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300">
        {/* Left Side: Logo */}
        <a
          href="/"
          className="flex items-center  z-10 hover:opacity-90 transition-opacity"
        >
          <img
            src="/hillside/Hillsite-Favicon.webp"
            alt="Hillsite Logo"
            className="w-14 h-14 md:w-16 md:h-16 object-contain"
          />

          <div className="leading-none">
            <h1 className="font-['Lugrasimo'] text-white text-[22px] md:text-[28px] tracking-wide">
              Hillsite
            </h1>
          </div>
        </a>

        <div className="flex items-center">
          {/* Center: Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = item.name === "Home";
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative block px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:text-white ${
                    isActive ? "text-white font-semibold" : "text-slate-300"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-lime-400 rounded-full" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Side Action Items */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* User / Account icon */}
            {/* <a
            href="/account"
            className="p-2.5 rounded-full border border-white/10 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all"
            aria-label="User Account"
          >
            <User className="w-6 h-6 md:w-4 md:h-4" />
          </a> */}

            {/* Login pill button */}
            <a
              href="/login"
              className="relative hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-black bg-lime-400 hover:bg-lime-300 transition-all duration-300 shadow-[0_0_20px_rgba(163,230,53,0.3)] hover:shadow-[0_0_25px_rgba(163,230,53,0.55)] active:scale-95 overflow-hidden"
            >
              <Calendar className="w-4 h-4 stroke-[2.5]" />
              <span>Login</span>
            </a>

            {/* Mobile Menu Open Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="mobile-toggle-btn md:hidden p-2.5 rounded-full border border-white/10 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6 md:w-4 md:h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 md:hidden"
        />
      )}

      {/* Mobile Drawer Panel */}
      <div
        ref={mobileMenuRef}
        className={`fixed right-0 top-0 bottom-0 w-full max-w-[320px] bg-black/95 backdrop-blur-xl border-l border-white/10 p-6 z-50 md:hidden flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <span className="text-sm font-bold tracking-wider text-white">
              MENU
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 rounded-full border border-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="mt-8 flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = item.name === "Home";
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-black bg-lime-400 font-bold"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </div>
        </div>

        {/* Drawer Footer action */}
        <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
          <a
            href="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-black bg-lime-400 hover:bg-lime-300 transition-colors shadow-[0_0_15px_rgba(163,230,53,0.3)]"
          >
            <Calendar className="w-4 h-4 stroke-[2.5]" />
            <span>Login</span>
          </a>
        </div>
      </div>
    </header>
  );
}
