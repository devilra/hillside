import React, { useState } from "react";
import { motion } from "framer-motion";

// ─── Land Insights Data ───────────────────────────────────────────────────────
const insights = [
  {
    id: 1,
    title: "Water Access",
    subtitle:
      "Source availability (borewell, stream, or rainwater potential) with feasibility insights.",
    priceLabel: "Borewell & Stream",
    configLabel: "Water Source",
    configValue: "High Feasibility",
    areaLabel: "Rainwater Potential",
    areaValue: "Excellent Capacity",
    image: "/images/banner-1.jpg",
    icon: (
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 mx-auto"
      >
        <rect x="28" y="10" width="24" height="6" rx="2" fill="#b45309" />
        <rect x="36" y="6" width="8" height="6" rx="1" fill="#92400e" />
        <line
          x1="40"
          y1="6"
          x2="40"
          y2="2"
          stroke="#92400e"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect x="22" y="16" width="36" height="28" rx="3" fill="#d97706" />
        <rect x="26" y="20" width="28" height="20" rx="2" fill="#fbbf24" />
        <rect x="30" y="44" width="20" height="8" rx="2" fill="#92400e" />
        <ellipse cx="40" cy="56" rx="18" ry="6" fill="#bfdbfe" />
        <ellipse cx="40" cy="56" rx="12" ry="4" fill="#60a5fa" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Road Connectivity",
    subtitle:
      "Verified access from public roads, internal paths, and terrain conditions.",
    priceLabel: "Verified Access",
    configLabel: "Road Type",
    configValue: "Public & Internal Paths",
    areaLabel: "Terrain Condition",
    areaValue: "Smooth/Accessible",
    image: "/images/Centre-Park.jpg",
    icon: (
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 mx-auto"
      >
        <rect x="10" y="48" width="60" height="14" rx="3" fill="#1e3a8a" />
        <line
          x1="20"
          y1="55"
          x2="28"
          y2="55"
          stroke="white"
          strokeWidth="3"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />
        <line
          x1="36"
          y1="55"
          x2="44"
          y2="55"
          stroke="white"
          strokeWidth="3"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />
        <line
          x1="52"
          y1="55"
          x2="60"
          y2="55"
          stroke="white"
          strokeWidth="3"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />
        <ellipse cx="40" cy="28" rx="10" ry="12" fill="#1e3a8a" />
        <ellipse cx="40" cy="26" rx="7" ry="9" fill="#3b82f6" />
        <circle cx="40" cy="26" r="3" fill="white" />
        <circle cx="40" cy="26" r="1.5" fill="#ef4444" />
        <path
          d="M40 35 L40 42"
          stroke="#1e3a8a"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Topography & Soil",
    subtitle:
      "Slope details, drainage, and soil type – ideal for construction, farming, or eco-stays.",
    priceLabel: "Ideal Conditions",
    configLabel: "Suitability",
    configValue: "Farming & Eco-Stays",
    areaLabel: "Land Feature",
    areaValue: "Slope & Clear Drainage",
    image:
      "/images/centrepark/centre-park-images-for-elevation-of-lodha-centre.jpeg",
    icon: (
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 mx-auto"
      >
        <ellipse cx="40" cy="54" rx="26" ry="12" fill="#92400e" />
        <ellipse cx="40" cy="50" rx="20" ry="10" fill="#b45309" />
        <ellipse cx="40" cy="46" rx="14" ry="8" fill="#d97706" />
        <rect x="37" y="20" width="6" height="26" rx="3" fill="#16a34a" />
        <ellipse cx="40" cy="18" rx="9" ry="10" fill="#22c55e" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Legal Verification",
    subtitle: "We ensure clear title, EC, patta/chitta, and zoning compliance.",
    priceLabel: "Clear Title Guaranteed",
    configLabel: "Documents Verified",
    configValue: "EC, Patta / Chitta",
    areaLabel: "Compliance",
    areaValue: "Zoning Cleared",
    image: "/images/centrepark/centre-park-images-for-elevation-of-lodha.jpeg",
    icon: (
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 mx-auto"
      >
        <rect x="14" y="30" width="36" height="42" rx="4" fill="#fbbf24" />
        <rect
          x="20"
          y="36"
          width="24"
          height="4"
          rx="2"
          fill="white"
          opacity="0.8"
        />
        <rect
          x="20"
          y="44"
          width="18"
          height="4"
          rx="2"
          fill="white"
          opacity="0.8"
        />
        <rect
          x="20"
          y="52"
          width="20"
          height="4"
          rx="2"
          fill="white"
          opacity="0.8"
        />
        <rect x="36" y="18" width="28" height="36" rx="4" fill="#3b82f6" />
        <rect
          x="42"
          y="24"
          width="16"
          height="3"
          rx="1.5"
          fill="white"
          opacity="0.9"
        />
        <rect
          x="42"
          y="30"
          width="12"
          height="3"
          rx="1.5"
          fill="white"
          opacity="0.9"
        />
        <rect
          x="42"
          y="36"
          width="14"
          height="3"
          rx="1.5"
          fill="white"
          opacity="0.9"
        />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Zoning & Approvals",
    subtitle:
      "Classification (agricultural, residential, commercial), and regulatory checks.",
    priceLabel: "Fully Classed Land",
    configLabel: "Classification",
    configValue: "Agri, Residential, Comm",
    areaLabel: "Regulations",
    areaValue: "Complete Checks Done",
    image:
      "/images/centrepark/centre-park-images-for-elevation-of-lodha-centre-park.jpeg",
    icon: (
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 mx-auto"
      >
        <rect x="28" y="46" width="24" height="22" rx="2" fill="#16a34a" />
        <polygon points="40,14 14,46 66,46" fill="#22c55e" />
        <rect x="36" y="56" width="8" height="12" rx="1" fill="#bbf7d0" />
        <circle cx="58" cy="32" r="10" fill="#fbbf24" />
        <path
          d="M53 32 L57 36 L63 28"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Utilities & Power",
    subtitle:
      "Electricity availability, solar potential, and infrastructure readiness.",
    priceLabel: "Infrastructure Ready",
    configLabel: "Grid Connection",
    configValue: "Electricity Available",
    areaLabel: "Alternative Power",
    areaValue: "High Solar Potential",
    image: "/images/west-county-dosti-oak-elevation-20523610.jpeg",
    icon: (
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 mx-auto"
      >
        <line
          x1="40"
          y1="10"
          x2="30"
          y2="70"
          stroke="#374151"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="40"
          y1="10"
          x2="50"
          y2="70"
          stroke="#374151"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="40"
          y1="10"
          x2="40"
          y2="70"
          stroke="#374151"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="24"
          y1="28"
          x2="56"
          y2="28"
          stroke="#374151"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="26"
          y1="42"
          x2="54"
          y2="42"
          stroke="#374151"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="22"
          y1="28"
          x2="26"
          y2="36"
          stroke="#6b7280"
          strokeWidth="1.5"
        />
        <line
          x1="58"
          y1="28"
          x2="54"
          y2="36"
          stroke="#6b7280"
          strokeWidth="1.5"
        />
        <line
          x1="24"
          y1="42"
          x2="28"
          y2="50"
          stroke="#6b7280"
          strokeWidth="1.5"
        />
        <line
          x1="56"
          y1="42"
          x2="52"
          y2="50"
          stroke="#6b7280"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    id: 7,
    title: "Nearby Landmarks",
    subtitle:
      "Scenic viewpoints, forest edges, stream trails, and tourist-friendly zones.",
    priceLabel: "Tourist Friendly",
    configLabel: "Scenic Views",
    configValue: "Forest Edges & Trails",
    areaLabel: "Surroundings",
    areaValue: "Prime Viewpoints Nearby",
    image: "/images/insights/nearby-landmarks.png",
    icon: (
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 mx-auto"
      >
        <polygon points="20,58 38,30 56,58" fill="#16a34a" />
        <polygon points="32,58 46,36 60,58" fill="#22c55e" />
        <circle cx="20" cy="22" r="7" fill="#fbbf24" />
        <circle cx="60" cy="22" r="7" fill="#fbbf24" />
        <path
          d="M10 18 Q14 10 20 14 Q22 6 28 10"
          stroke="#fbbf24"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M52 18 Q56 10 62 14 Q64 6 70 10"
          stroke="#fbbf24"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 8,
    title: "Local Expertise & Guidance",
    subtitle:
      "We offer on-ground support, connecting you with trusted surveyors and local authorities.",
    priceLabel: "On-Ground Support",
    configLabel: "Network Access",
    configValue: "Trusted Surveyors",
    areaLabel: "Liaison Support",
    areaValue: "Local Authorities Info",
    image: "/images/insights/local-expertise.png",
    icon: (
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 mx-auto"
      >
        <circle cx="40" cy="24" r="12" fill="#fbbf24" />
        <rect x="20" y="42" width="40" height="24" rx="6" fill="#d97706" />
        <path
          d="M50 34 L62 22 M62 22 L56 22 M62 22 L62 28"
          stroke="#16a34a"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M55 28 L65 18"
          stroke="#22c55e"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M60 22 L70 12"
          stroke="#16a34a"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

// ─── Animation Presets ─────────────────────────────────────────────────────────
const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: i * 0.05 },
  }),
};

export default function ExclusiveProjects() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? insights.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === insights.length - 1 ? 0 : prev + 1));
  };

  const currentInsight = insights[activeIndex];

  return (
    <section className="w-full  py-14 px-4 sm:px-6 md:px-12 lg:px-24 font-sans antialiased">
      <div className="max-w-6xl mx-auto">
        {/* ── Heading Block ── */}
        <div className="flex justify-between items-baseline mb-6">
          <h2 className="text-[#0e1726] font-bold text-2xl md:text-[28px] tracking-tight">
            Complete Land Insights - Beyond Just the View
          </h2>
          <a
            href="#view-all"
            className="text-emerald-750 text-xs font-semibold flex items-center gap-1 hover:underline"
          >
            View all
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>

        {/* ── Main Split View Container ── */}
        <motion.div
          key={activeIndex}
          initial="hidden"
          animate="visible"
          custom={activeIndex}
          variants={cardVariants}
          className=" rounded-3xl border border-[#ededed] shadow-[0_4px_25px_rgba(0,0,0,0.03)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[420px]"
        >
          {/* Left Metadata Form Column */}
          <div className="p-8 md:p-10 lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Header Line */}
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-[#1a202c] font-bold text-xl md:text-[22px]">
                  {currentInsight.title}
                </h3>

                {/* Action Controls */}
                <div className="flex items-center gap-3 text-[#718096]">
                  <button className="hover:text-red-500 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                  <button className="hover:text-emerald-600 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Description Context Line */}
              <p className="text-[#a0aec0] text-xs font-medium mb-6">
                {currentInsight.subtitle}
              </p>

              {/* Bold Pricing Highlight Metric Line */}
              <div className="text-[#f97316] font-extrabold text-xl md:text-2xl mb-8">
                {currentInsight.priceLabel}
              </div>

              {/* Dual Specification Rows */}
              <div className="flex gap-12 mb-8">
                <div>
                  <span className="block text-[#a0aec0] text-[11px] font-medium uppercase tracking-wider mb-1">
                    {currentInsight.configLabel}
                  </span>
                  <span className="block text-[#1a202c] font-bold text-sm md:text-base">
                    {currentInsight.configValue}
                  </span>
                </div>
                <div>
                  <span className="block text-[#a0aec0] text-[11px] font-medium uppercase tracking-wider mb-1">
                    {currentInsight.areaLabel}
                  </span>
                  <span className="block text-[#1a202c] font-bold text-sm md:text-base">
                    {currentInsight.areaValue}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Footer Actions */}
            <div className="flex items-center gap-6 pt-4">
              <a
                href="#contact"
                className="text-[#1a202c] text-sm font-bold tracking-wide hover:opacity-80 transition-opacity"
              >
                Contact Us
              </a>
              <button className="bg-[#111827] text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-black transition-colors shadow-sm">
                Explore now
              </button>
            </div>
          </div>

          {/* Right Graphical View Column */}
          <div className="relative lg:col-span-7 bg-emerald-50/30 min-h-[260px] lg:min-h-full flex items-center justify-center overflow-hidden">
            {/* FIX: Replaced the static Unsplash string with dynamic local data mapping */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-300 transform scale-105 filter saturate-[1.1]"
              style={{ backgroundImage: `url('${currentInsight.image}')` }}
            >
              {/* Overlay Content Block */}
              {/* <div className="absolute top-6 left-6 right-6">
                <span className="inline-block text-white font-extrabold text-base md:text-xl lg:text-2xl tracking-wide leading-tight drop-shadow-md uppercase">
                  India's Fastest Growing City.
                </span>
              </div> */}
            </div>

            {/* Invisible Fallback Vector Architecture */}
            <div className="hidden absolute inset-0 bg-white/90 flex-col items-center justify-center p-8">
              {currentInsight.icon}
              <p className="text-xs text-gray-400 mt-2">
                {currentInsight.title} Graphic asset mapping fallback link
                active
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Pagination Carousel Buttons Block ── */}
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            onClick={handlePrev}
            className="w-8 h-8 rounded-full border border-[#cbd5e0] flex items-center justify-center text-[#4a5568] hover:bg-gray-50 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Inline Slider Indicators */}
          <div className="flex gap-2">
            {insights.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-1.5 transition-all duration-300 rounded-full ${activeIndex === index ? "w-6 bg-emerald-600" : "w-1.5 bg-[#cbd5e0]"}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-8 h-8 rounded-full border border-[#cbd5e0] flex items-center justify-center text-[#4a5568] hover:bg-gray-50 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
