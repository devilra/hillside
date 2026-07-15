import React, { useEffect, useState } from "react";
import Container from "../components/Container";

// Reusable Count-Up Animation Component using standard browser requestAnimationFrame
const AnimatedCounter = ({ endValue, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Smooth ease-out tracking calculation
      const easeOutQuad = progress * (2 - progress);
      setCount(Math.floor(easeOutQuad * endValue));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [endValue, duration]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export default function About() {
  return (
    <section className="w-full bg-gradient-to-b from-[#08120c] to-[#0b1710] py-12 md:py-20 font-sans text-slate-300 antialiased">
      <Container className="space-y-16">
        {/* --- SECTION 1: HERO COMPANY INTRODUCTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="space-y-5">
            <div className="inline-block px-3 py-1 bg-lime-400/10 border border-lime-400/20 rounded-full text-xs font-bold text-lime-400 uppercase tracking-wider">
              Our Mountain Legacy
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              About <span className="text-lime-400 font-black">Hillsite</span>{" "}
              Real Estate
            </h1>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed font-normal">
              At Hillsite, we are dedicated to connecting nature lovers and
              eco-conscious investors with premium plots in the tranquil beauty
              of Yelagiri Hills. Our platform bridges the gap between scenic
              mountain lifestyles and transparent, stress-free property
              ownership.
            </p>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed font-normal">
              We serve as your strategic partner—handling complete landscape
              validation, certified survey numbers, clear documentation, and
              legal deed transfers. We don't just sell land; we help you create
              a sanctuary and build a lasting legacy.
            </p>
          </div>

          {/* Right Column: Premium Geometric Images Layout */}
          <div className="grid grid-cols-12 gap-3 items-center">
            <div className="col-span-7 overflow-hidden rounded-tl-[36px] rounded-br-[36px] shadow-lg bg-[#0d1a12] border border-white/10 p-1.5">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                alt="Scenic Hills of Yelagiri"
                className="w-full h-56 object-cover rounded-tl-[30px] rounded-br-[30px] hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="col-span-5 overflow-hidden rounded-tr-[30px] rounded-bl-[30px] shadow-lg bg-[#0d1a12] border border-white/10 p-1.5 mt-8">
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80"
                alt="Beautiful Mountain Valley View"
                className="w-full h-44 object-cover rounded-tr-[24px] rounded-bl-[24px] hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* --- SECTION 2: EXPANDED ANIMATED COUNTER STATISTICS TRACK --- */}
        <div className="bg-[#0d1a12] rounded-3xl border border-white/10 p-8 shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {/* Stat Item 1 */}
            <div className="pt-2 lg:pt-0">
              <p className="text-2xl md:text-3xl font-black text-lime-400 mb-1">
                <AnimatedCounter endValue={12} suffix="+" />
              </p>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Exquisite Sectors
              </p>
            </div>

            {/* Stat Item 2 */}
            <div className="pt-4 lg:pt-0 lg:pl-2">
              <p className="text-2xl md:text-3xl font-black text-white mb-1">
                <AnimatedCounter endValue={150} suffix="+" />
              </p>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Plots Handed Over
              </p>
            </div>

            {/* Stat Item 3 */}
            <div className="pt-4 lg:pt-0 lg:pl-2">
              <p className="text-2xl md:text-3xl font-black text-lime-300 mb-1">
                <AnimatedCounter endValue={45} suffix="Cr+" />
              </p>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Value Secured
              </p>
            </div>

            {/* Stat Item 4 */}
            <div className="pt-4 lg:pt-0 lg:pl-2">
              <p className="text-2xl md:text-3xl font-black text-purple-400 mb-1">
                <AnimatedCounter endValue={35} suffix="+" />
              </p>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Eco Builders
              </p>
            </div>

            {/* Stat Item 5 */}
            <div className="pt-4 lg:pt-0 lg:pl-2">
              <p className="text-2xl md:text-3xl font-black text-amber-400 mb-1">
                <AnimatedCounter endValue={4} suffix="+" />
              </p>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Premium Projects
              </p>
            </div>

            {/* Stat Item 6 */}
            <div className="pt-4 lg:pt-0 lg:pl-2">
              <p className="text-2xl md:text-3xl font-black text-rose-400 mb-1">
                <AnimatedCounter endValue={99} suffix="%" />
              </p>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Happy Retreat Owners
              </p>
            </div>
          </div>
        </div>

        {/* --- SECTION 3: MISSION & VISION --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Block */}
          <div className="bg-[#0d1a12] p-8 rounded-2xl border border-white/10 shadow-sm space-y-4 hover:border-lime-400/30 transition-colors duration-300">
            <div className="w-12 h-12 rounded-xl bg-lime-400/10 flex items-center justify-center text-lime-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="6"></circle>
                <circle cx="12" cy="12" r="2"></circle>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">Our Mission</h3>
            <p className="text-slate-400 leading-relaxed text-sm font-normal">
              To simplify and secure nature land acquisition. We aim to provide
              clear-title plots in scenic highlands, backed by verified
              documentation, environmental feasibility, and absolute legal
              validation, ensuring a stress-free experience for retreat seekers.
            </p>
          </div>

          {/* Vision Block */}
          <div className="bg-[#0d1a12] p-8 rounded-2xl border border-white/10 shadow-sm space-y-4 hover:border-purple-400/30 transition-colors duration-300">
            <div className="w-12 h-12 rounded-xl bg-purple-400/10 flex items-center justify-center text-purple-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">Our Vision</h3>
            <p className="text-slate-400 leading-relaxed text-sm font-normal">
              To be the premier ecosystem for premium hill properties in
              Southern India. We envision a world where planning a mountain
              cottage, purchasing fully-surveyed eco-lands, and securing custom
              villa architects takes just a single verified step.
            </p>
          </div>
        </div>

        {/* --- SECTION 4: CORE VALUES --- */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Values Driving Hillsite
            </h2>
            <p className="text-slate-400 text-sm font-normal">
              We commit to principles that guarantee a seamless, transparent,
              and eco-friendly plot acquisition.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[#0d1a12]/60 p-6 rounded-2xl border border-white/10 text-center space-y-3 shadow-sm">
              <span className="text-2xl">🌲</span>
              <h4 className="text-base font-bold text-white">
                Eco-Conscious Integration
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed font-normal">
                We respect the terrain, offering plots that harmonize with local
                forestry, biodiversity, and conservation standards.
              </p>
            </div>
            <div className="bg-[#0d1a12]/60 p-6 rounded-2xl border border-white/10 text-center space-y-3 shadow-sm">
              <span className="text-2xl">⚖️</span>
              <h4 className="text-base font-bold text-white">
                Absolute Legal Security
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed font-normal">
                Every single plot features clear titles, registered survey
                credentials, and validated local government approvals.
              </p>
            </div>
            <div className="bg-[#0d1a12]/60 p-6 rounded-2xl border border-white/10 text-center space-y-3 shadow-sm">
              <span className="text-2xl">🏔️</span>
              <h4 className="text-base font-bold text-white">
                Premium Scenic Valleys
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed font-normal">
                We selectively source plots offering premium panoramic views of
                Yelagiri Hills, securing both visual and asset appreciation.
              </p>
            </div>
          </div>
        </div>

        {/* --- SECTION 5: OUR JOURNEY TIMELINE --- */}
        <div className="bg-[#0d1a12]/40 border border-white/10 p-8 rounded-3xl space-y-8 shadow-sm">
          <h2 className="text-2xl font-bold text-white text-center">
            Our Journey
          </h2>
          <div className="relative border-l border-white/10 ml-4 md:ml-32 space-y-8">
            {/* Timeline Item 1 */}
            <div className="relative pl-8">
              <div className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 bg-lime-400 rounded-full border border-[#0d1a12]"></div>
              <span className="text-xs font-extrabold text-lime-400 block">
                2022
              </span>
              <h4 className="text-sm font-bold text-white">
                The Yelagiri Initiative
              </h4>
              <p className="text-slate-400 text-xs font-normal max-w-xl mt-1">
                Acquired and surveyed our first premium sectors in Yelagiri
                Hills, dedicating them to vacation home plot listings.
              </p>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative pl-8">
              <div className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 bg-purple-400 rounded-full border border-[#0d1a12]"></div>
              <span className="text-xs font-extrabold text-purple-400 block">
                2024
              </span>
              <h4 className="text-sm font-bold text-white">
                Eco-Infrastructure Setup
              </h4>
              <p className="text-slate-400 text-xs font-normal max-w-xl mt-1">
                Crossed 100+ deed handovers and established partnerships with
                villa construction agencies.
              </p>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative pl-8">
              <div className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 bg-lime-400 rounded-full border border-[#0d1a12]"></div>
              <span className="text-xs font-extrabold text-lime-400 block">
                Present Day
              </span>
              <h4 className="text-sm font-bold text-white">
                Unified Hillsite Portal
              </h4>
              <p className="text-slate-400 text-xs font-normal max-w-xl mt-1">
                Launched our dynamic content portals to manage plots and connect
                refined buyers to exclusive hillside land parcels.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
