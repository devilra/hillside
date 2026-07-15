import { useState, useEffect, useRef } from "react";
import {
  Check,
  Dumbbell,
  Waves,
  Trophy,
  Gamepad2,
  Baby,
  Building2,
  Coffee,
  Droplets,
  Phone,
  ShieldCheck,
  BedDouble,
  Bath,
  LayoutDashboard,
  Flag,
} from "lucide-react";
import ContactForm from "../forms/Contactform";


// ── Nav tabs ────────────────────────────────────────────────────────────────
const NAV_TABS = [
  { label: "Overview", id: "overview" },
  { label: "Floor Plan", id: "floorplan" },
  { label: "Amenities", id: "amenities" },
  { label: "Gallery", id: "gallery" },
];

// ── Floor plan data ─────────────────────────────────────────────────────────
const FLOOR_PLANS = {
  "1 BHK": [
    { label: "453 sq ft (1BHK+1T)", price: "₹ 45.5 L", bed: 1, bath: 1, hall: 1 },
    { label: "460 sq ft (1BHK+1T)", price: "₹ 46.2 L", bed: 1, bath: 1, hall: 1 },
  ],
  "2 BHK": [
    { label: "620 sq ft (2BHK+2T)", price: "₹ 60.0 L", bed: 2, bath: 2, hall: 1 },
    { label: "650 sq ft (2BHK+2T)", price: "₹ 63.5 L", bed: 2, bath: 2, hall: 1 },
  ],
  "3 BHK": [
    { label: "884 sq ft (3BHK+3T)", price: "₹ 77.99 L", bed: 3, bath: 3, hall: 1 },
  ],
};

// ── Amenity data ────────────────────────────────────────────────────────────
const AMENITIES = [
  { icon: Dumbbell, label: "Gymnasium" },
  { icon: Waves, label: "Swimming Pool" },
  { icon: Trophy, label: "Sports Facility" },
  { icon: Gamepad2, label: "Indoor Games" },
  { icon: Baby, label: "Children's Play Area" },
  { icon: Building2, label: "Club House" },
  { icon: Coffee, label: "Cafeteria" },
  { icon: Droplets, label: "Rain Water Harvesting" },
  { icon: Phone, label: "Intercom" },
  { icon: ShieldCheck, label: "24 X 7 Security" },
];

// ── Gallery tabs ────────────────────────────────────────────────────────────
const GALLERY_TABS = ["Elevation", "Amenities", "Floor Plans", "Neighbourhood", "Others"];
const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80",
];

// ── Smooth scroll helper ─────────────────────────────────────────────────────
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const navH = 56;
  const y = el.getBoundingClientRect().top + window.scrollY - navH - 8;
  window.scrollTo({ top: y, behavior: "smooth" });
}

// ── FloorPlanIllustration placeholder ───────────────────────────────────────
function FloorPlanIllustration() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-blue-300">
      <svg width="160" height="130" viewBox="0 0 160 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="140" height="110" rx="4" stroke="#93C5FD" strokeWidth="2" strokeDasharray="6 3"/>
        <rect x="25" y="25" width="50" height="40" rx="2" stroke="#93C5FD" strokeWidth="1.5"/>
        <rect x="85" y="25" width="50" height="40" rx="2" stroke="#93C5FD" strokeWidth="1.5"/>
        <rect x="25" y="75" width="110" height="30" rx="2" stroke="#93C5FD" strokeWidth="1.5"/>
        <line x1="75" y1="25" x2="75" y2="65" stroke="#93C5FD" strokeWidth="1" strokeDasharray="3 2"/>
        <circle cx="15" cy="10" r="6" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1.5"/>
      </svg>
      <p className="text-sm text-gray-400 mt-3">No Floor plans available for this property</p>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function CentreParkContent() {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeBHK, setActiveBHK] = useState("1 BHK");
  const [activePlanIdx, setActivePlanIdx] = useState(0);
  const [activeGalleryTab, setActiveGalleryTab] = useState("Elevation");
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const navRef = useRef(null);

  // Highlight nav on scroll
  useEffect(() => {
    const handleScroll = () => {
      const navH = 56;
      for (let i = NAV_TABS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_TABS[i].id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= navH + 20) {
          setActiveTab(NAV_TABS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const visibleAmenities = showAllAmenities ? AMENITIES : AMENITIES.slice(0, 10);
  const currentPlan = FLOOR_PLANS[activeBHK][activePlanIdx] || FLOOR_PLANS[activeBHK][0];

  return (
    <div className="bg-white">
      {/* ── Sticky Nav ──────────────────────────────────────────────────────── */}
      <div
        ref={navRef}
        className="sticky top-0 lg:top-25 z-30 bg-white border-b border-gray-200 shadow-sm"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-0 overflow-x-auto scrollbar-none">
            {NAV_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  scrollToSection(tab.id);
                }}
                className={`relative shrink-0 px-5 py-3.5 text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-t" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Two-column layout ───────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 py-6 pb-32 lg:pb-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* ── Left: Content ─────────────────────────────────────────────── */}
          <div className="w-full flex-1 min-w-0 space-y-6">

            {/* ── Overview ──────────────────────────────────────────────── */}
            <section id="overview" className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Overview</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-4 mb-5">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Possession Start Date</p>
                  <p className="text-sm font-semibold text-gray-800 mt-1">Nov'19</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Status</p>
                  <p className="text-sm font-semibold text-green-600 mt-1">Completed</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Total Launched Apartments</p>
                  <p className="text-sm font-semibold text-gray-800 mt-1">2500</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Launch Date</p>
                  <p className="text-sm font-semibold text-gray-800 mt-1">Feb'17</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Availability</p>
                  <p className="text-sm font-semibold text-blue-600 mt-1">New and Resale</p>
                </div>
              </div>

              <div className="mb-5">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">RERA ID</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  P51700000506, P51700000596, P51700000696, P51700000577, P51700000419
                </p>
              </div>

              {/* Salient Features */}
              <div className="mb-5">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Salient Features</h3>
                <ul className="space-y-2">
                  {[
                    "10 Min Driving Distance From Railway Station.",
                    "Bus stop & High School Road ( 3 mints)",
                    "Upcoming 450 acre MMRDA growth centre in the Palava region.",
                    "Less than 20 minutes from the upcoming Navi Mumbai International Airport.",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check size={15} className="text-gray-600 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* More about */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">More about Godrej Varanya</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Godrej Varanya project is registered in RERA under new projects as follows—
                  Palava Eviva K To T, Urbano A, C And F, Urbano I To T P51800006843, Palava Clara J-M
                  P51700000420, Palava Fontana C - H P51700000596, Palava Urbano D And E P51700000577,
                  Palava Clara E - I P51700000540, Palava - Aurelia - D To G P51700000511, Fontana A, B,
                  I And J P51700000506, Palava Clara A To D, D1 P51700000448, Palava Urbano G And H
                  P51700000696. Central Park is the latest residential project offered by Lodha Group.{" "}
                  <a href="#" className="text-blue-500 hover:underline">View more</a>
                </p>
              </div>
            </section>

            {/* ── Floor Plan ────────────────────────────────────────────── */}
            <section id="floorplan" className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Godrej Varanya Floor Plans</h2>

              {/* BHK toggle */}
              <div className="flex gap-2 mb-5 overflow-x-auto scrollbar-none pb-1">
                {Object.keys(FLOOR_PLANS).map((bhk) => (
                  <button
                    key={bhk}
                    onClick={() => { setActiveBHK(bhk); setActivePlanIdx(0); }}
                    className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                      activeBHK === bhk
                        ? "bg-blue-900 text-white border-blue-900"
                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                    }`}
                  >
                    {bhk}
                  </button>
                ))}
              </div>

              {/* Sub-tabs */}
              <div className="flex gap-0 border-b border-gray-200 mb-5 overflow-x-auto">
                {FLOOR_PLANS[activeBHK].map((plan, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePlanIdx(idx)}
                    className={`relative shrink-0 px-4 py-2.5 text-sm transition-colors duration-200 ${
                      activePlanIdx === idx
                        ? "text-gray-900 font-medium"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {plan.label}
                    {activePlanIdx === idx && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-t" />
                    )}
                  </button>
                ))}
              </div>

              {/* Price */}
              <p className="text-2xl font-bold text-gray-900 mb-2">{currentPlan.price}</p>

              {/* Floor plan illustration */}
              <FloorPlanIllustration />

              {/* Room chips */}
              <div className="flex items-center gap-3 mt-4 flex-wrap">
                <div className="flex items-center gap-1.5 border border-gray-200 rounded-md px-3 py-1.5 text-sm text-gray-600">
                  <BedDouble size={15} className="text-gray-400" />
                  {currentPlan.bed} Bedroom{currentPlan.bed > 1 ? "s" : ""}
                </div>
                <div className="flex items-center gap-1.5 border border-gray-200 rounded-md px-3 py-1.5 text-sm text-gray-600">
                  <Bath size={15} className="text-gray-400" />
                  {currentPlan.bath} Bathroom{currentPlan.bath > 1 ? "s" : ""}
                </div>
                <div className="flex items-center gap-1.5 border border-gray-200 rounded-md px-3 py-1.5 text-sm text-gray-600">
                  <LayoutDashboard size={15} className="text-gray-400" />
                  {currentPlan.hall} Hall
                </div>
                <button className="w-full sm:w-auto sm:ml-auto text-xs text-blue-500 hover:underline flex items-center gap-1 justify-center sm:justify-start">
                  <Flag size={12} /> Report Error
                </button>
              </div>
            </section>

            {/* ── Amenities ─────────────────────────────────────────────── */}
            <section id="amenities" className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Godrej Varanya Amenities</h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {visibleAmenities.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center justify-center border border-gray-200 rounded-lg p-3 gap-2 hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 cursor-default"
                  >
                    <Icon size={26} className="text-blue-900" strokeWidth={1.5} />
                    <span className="text-xs text-gray-600 text-center leading-tight">{label}</span>
                  </div>
                ))}
              </div>

              {AMENITIES.length > 10 && (
                <button
                  onClick={() => setShowAllAmenities(!showAllAmenities)}
                  className="mt-4 w-full text-sm text-blue-500 hover:text-blue-700 font-medium"
                >
                  {showAllAmenities ? "Show Less" : "See All Amenities"}
                </button>
              )}
            </section>

            {/* ── Gallery ───────────────────────────────────────────────── */}
            <section id="gallery" className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Godrej Varanya Gallery</h2>

              {/* Gallery sub-tabs */}
              <div className="flex gap-0 border-b border-gray-200 mb-5 overflow-x-auto">
                {GALLERY_TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveGalleryTab(tab)}
                    className={`relative shrink-0 px-4 py-2.5 text-sm transition-colors duration-200 ${
                      activeGalleryTab === tab
                        ? "text-gray-900 font-medium"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                    {activeGalleryTab === tab && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-t" />
                    )}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {GALLERY_IMAGES.map((src, i) => (
                  <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden">
                    <img
                      src={src}
                      alt={`Gallery ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* ── Right: Sticky Contact Form ─────────────────────────────── */}
          <div className="hidden lg:block w-[300px] shrink-0 sticky top-40 self-start">
            <ContactForm city="Kharghar" subtitle="Godrej Group Varanya" />
          </div>
        </div>
      </div>
    </div>
  );
}