import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import API_URL from "../app";
import {
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  CheckCircle2,
  Heart,
  Share2,
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
  Check,
} from "lucide-react";
import ContactForm from "../forms/Contactform";

// ── Icon Mapping for Amenities ────────────────────────────────────────────────
const AMENITY_ICONS = {
  Gymnasium: Dumbbell,
  "Swimming Pool": Waves,
  "Sports Facility": Trophy,
  "Indoor Games": Gamepad2,
  "Children's Play Area": Baby,
  "Club House": Building2,
  Cafeteria: Coffee,
  "Rain Water Harvesting": Droplets,
  Intercom: Phone,
  "24 X 7 Security": ShieldCheck,
};

// ── Seeded Fallbacks if Database Project is Not Found ──────────────────────────
const FALLBACK_PROJECTS = [
  {
    routeSubpath: "/scenic-valley-plots",
    title: "Scenic Valley Plots",
    author: "Hillsite Developers",
    location: "Yelagiri Hills",
    priceToken: "₹ 25 L Onwards",
    status: "Ready to Move",
    possessionDate: "Immediate",
    totalApts: "50 Plots",
    launchTimeline: "Jan 2026",
    reraId: "TN/RERA/001/2026",
    amenities: [
      "Cafeteria",
      "Children's Play Area",
      "Club House",
      "24 X 7 Security",
    ],
    description:
      "Premium land parcels located amidst breathtaking natural surroundings. From panoramic hill views to lush green landscapes, every plot is carefully chosen to offer both aesthetic appeal and long-term investment value.",
    mainImage: "/hillside/Scenic-View.webp",
    galleryImages: "[]",
  },
  {
    routeSubpath: "/eco-villa-retreats",
    title: "Eco Villa Retreats",
    author: "Hillsite Developers",
    location: "Yelagiri Hills",
    priceToken: "₹ 1.5 Cr Onwards",
    status: "Under Construction",
    possessionDate: "Dec 2027",
    totalApts: "12 Villas",
    launchTimeline: "Feb 2026",
    reraId: "TN/RERA/002/2026",
    amenities: ["Swimming Pool", "Gymnasium", "Sports Facility", "Club House"],
    description:
      "Every property listed with Hillsite undergoes thorough verification to ensure clear ownership, authentic documentation, and complete legal compliance. This gives buyers confidence and eliminates the risk of future disputes.",
    mainImage: "/hillside/Legal-Registration-Support.webp",
    galleryImages: "[]",
  },
  {
    routeSubpath: "/athanavur-heights",
    title: "Athanavur Heights",
    author: "L And T Realty",
    location: "Yelagiri",
    priceToken: "₹ 1.18 Cr Onward",
    status: "New Launch",
    possessionDate: "Dec 2028",
    totalApts: "80 Units",
    launchTimeline: "Feb 2026",
    reraId: "TN/RERA/003/2026",
    amenities: ["Gymnasium", "Swimming Pool", "Club House"],
    description:
      "Athanavur hill-facing premium residential land development. Safe gated community layout.",
    mainImage: "/hillside/img-2.jpeg",
    galleryImages: "[]",
  },
  {
    routeSubpath: "/mangalam-premium-retreats",
    title: "Mangalam Premium Retreats",
    author: "Rustomjee Builders",
    location: "Yelagiri",
    priceToken: "₹ 9.61 Cr Onwards",
    status: "New Launch",
    possessionDate: "Immediate",
    totalApts: "24 Units",
    launchTimeline: "Jan 2026",
    reraId: "TN/RERA/004/2026",
    amenities: ["Indoor Games", "Cafeteria", "Swimming Pool"],
    description:
      "Mangalam panoramic valley residential land. Luxury villa township with premium amenities.",
    mainImage: "/hillside/img-3.jpeg",
    galleryImages: "[]",
  },
  {
    routeSubpath: "/today-citadel-juinagar",
    title: "Today Citadel Juinagar",
    author: "Hillsite Developers",
    location: "Yelagiri Hills",
    priceToken: "₹ 1.80 Cr Onwards",
    status: "Ready to Move",
    possessionDate: "Immediate",
    totalApts: "10 plots",
    launchTimeline: "Feb 2025",
    reraId: "TN/RERA/005/2026",
    amenities: ["Gymnasium", "24 X 7 Security", "Club House"],
    description:
      "Exclusive properties located at Yelagiri West. Scenic landscape layout.",
    mainImage: "/images/Centre-Park.jpg",
    galleryImages: "[]",
  },
  // Legacy paths fallbacks for compatibility
  {
    routeSubpath: "/hubtown-seasons-ecuador",
    title: "Scenic Valley Plots",
    author: "Hillsite Developers",
    location: "Yelagiri Hills",
    priceToken: "₹ 25 L Onwards",
    status: "Ready to Move",
    possessionDate: "Immediate",
    totalApts: "50 Plots",
    launchTimeline: "Jan 2026",
    reraId: "TN/RERA/001/2026",
    amenities: [
      "Cafeteria",
      "Children's Play Area",
      "Club House",
      "24 X 7 Security",
    ],
    description:
      "Premium land parcels located amidst breathtaking natural surroundings.",
    mainImage: "/hillside/Scenic-View.webp",
    galleryImages: "[]",
  },
  {
    routeSubpath: "/purva-panorama",
    title: "Today Citadel Juinagar",
    author: "Hillsite Developers",
    location: "Yelagiri Hills",
    priceToken: "₹ 1.80 Cr Onwards",
    status: "Ready to Move",
    possessionDate: "Immediate",
    totalApts: "10 plots",
    launchTimeline: "Feb 2025",
    reraId: "TN/RERA/005/2026",
    amenities: ["Gymnasium", "24 X 7 Security", "Club House"],
    description:
      "Exclusive properties located at Yelagiri West. Scenic landscape layout.",
    mainImage: "/images/Centre-Park.jpg",
    galleryImages: "[]",
  },
  {
    routeSubpath: "/centre-park",
    title: "Lodha Centre Park",
    author: "Lodha Group",
    location: "Dombivali, Mumbai",
    priceToken: "₹ 45.49 L - ₹ 77.99 L",
    status: "Completed",
    possessionDate: "Nov'19",
    totalApts: "2500",
    launchTimeline: "1, 2, 3 BHK",
    reraId:
      "P51700000506, P51700000596, P51700000696, P51700000577, P51700000419",
    amenities: [
      "Gymnasium",
      "Swimming Pool",
      "Sports Facility",
      "Indoor Games",
      "Children's Play Area",
      "Club House",
      "Cafeteria",
      "Rain Water Harvesting",
      "Intercom",
      "24 X 7 Security",
    ],
    description:
      "Lodha Centre Park in Dombivali is a premium residential development with world-class facilities and design. Seamless connectivity and modern construction standards.",
    mainImage: "/images/Centre-Park.jpg",
    galleryImages: "[]",
  },
];

// ── Nav tabs ────────────────────────────────────────────────────────────────
const NAV_TABS = [
  { label: "Overview", id: "overview" },
  { label: "Floor Plan", id: "floorplan" },
  { label: "Amenities", id: "amenities" },
  { label: "Gallery", id: "gallery" },
  { label: "Home Loan", id: "homeloan" },
];

// ── Floor plan data ─────────────────────────────────────────────────────────
const FLOOR_PLANS = {
  "1 BHK": [
    {
      label: "453 sq ft (1BHK+1T)",
      price: "₹ 45.5 L",
      bed: 1,
      bath: 1,
      hall: 1,
    },
    {
      label: "460 sq ft (1BHK+1T)",
      price: "₹ 46.2 L",
      bed: 1,
      bath: 1,
      hall: 1,
    },
  ],
  "2 BHK": [
    {
      label: "620 sq ft (2BHK+2T)",
      price: "₹ 60.0 L",
      bed: 2,
      bath: 2,
      hall: 1,
    },
    {
      label: "650 sq ft (2BHK+2T)",
      price: "₹ 63.5 L",
      bed: 2,
      bath: 2,
      hall: 1,
    },
  ],
  "3 BHK": [
    {
      label: "884 sq ft (3BHK+3T)",
      price: "₹ 77.99 L",
      bed: 3,
      bath: 3,
      hall: 1,
    },
  ],
};

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const navH = 56;
  const y = el.getBoundingClientRect().top + window.scrollY - navH - 8;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function FloorPlanIllustration() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-blue-300">
      <svg
        width="160"
        height="130"
        viewBox="0 0 160 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="10"
          y="10"
          width="140"
          height="110"
          rx="4"
          stroke="#93C5FD"
          strokeWidth="2"
          strokeDasharray="6 3"
        />
        <rect
          x="25"
          y="25"
          width="50"
          height="40"
          rx="2"
          stroke="#93C5FD"
          strokeWidth="1.5"
        />
        <rect
          x="85"
          y="25"
          width="50"
          height="40"
          rx="2"
          stroke="#93C5FD"
          strokeWidth="1.5"
        />
        <rect
          x="25"
          y="75"
          width="110"
          height="30"
          rx="2"
          stroke="#93C5FD"
          strokeWidth="1.5"
        />
        <line
          x1="75"
          y1="25"
          x2="75"
          y2="65"
          stroke="#93C5FD"
          strokeWidth="1"
          strokeDasharray="3 2"
        />
        <circle
          cx="15"
          cy="10"
          r="6"
          fill="#DBEAFE"
          stroke="#93C5FD"
          strokeWidth="1.5"
        />
      </svg>
      <p className="text-sm text-gray-400 mt-3">
        No Floor plans available for this property
      </p>
    </div>
  );
}

// ── Lightbox ───────────────────────────────────────────────────────────────────
function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(
    (e) => {
      e?.stopPropagation();
      setCurrent((c) => (c - 1 + images.length) % images.length);
    },
    [images.length],
  );

  const next = useCallback(
    (e) => {
      e?.stopPropagation();
      setCurrent((c) => (c + 1) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      <span className="absolute top-5 left-5 text-white/70 text-sm font-medium tracking-wide">
        {current + 1} / {images.length}
      </span>
      <button
        className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
        onClick={onClose}
      >
        <X size={28} />
      </button>
      <button
        className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
        onClick={prev}
      >
        <ChevronLeft size={28} />
      </button>
      <div
        className="max-w-5xl max-h-[80vh] w-full mx-4 sm:mx-10 lg:mx-16"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[current].src}
          alt={images[current].alt}
          className="w-full max-h-[75vh] object-contain rounded"
        />
        <p className="text-center text-white/50 text-sm mt-3">
          {images[current].alt}
        </p>
      </div>
      <button
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
        onClick={next}
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function PropertyDetailPage() {
  const { slug } = useParams();
  const location = useLocation();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  // Tab selections
  const [activeTab, setActiveTab] = useState("overview");
  const [activeBHK, setActiveBHK] = useState("2 BHK");
  const [activePlanIdx, setActivePlanIdx] = useState(0);
  const [activeGalleryTab, setActiveGalleryTab] = useState("Elevation");
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const navRef = useRef(null);

  // Loan calculator state
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [tenure, setTenure] = useState(15);
  const [interestRate, setInterestRate] = useState(8.5);

  // Fetch project list from backend
  useEffect(() => {
    const getProjectDetail = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/projects`);
        if (res.ok) {
          const data = await res.json();
          // Find project where routeSubpath matches the current pathname
          const matched = data.find(
            (p) =>
              p.routeSubpath &&
              (p.routeSubpath.toLowerCase() ===
                location.pathname.toLowerCase() ||
                p.routeSubpath.toLowerCase() === `/${slug}`.toLowerCase()),
          );
          if (matched) {
            setProject(matched);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error("Error fetching projects from backend:", err);
      }

      // If no match found in DB, use seeded fallbacks
      const matchedFallback = FALLBACK_PROJECTS.find(
        (p) =>
          p.routeSubpath.toLowerCase() === location.pathname.toLowerCase() ||
          p.routeSubpath.toLowerCase() === `/${slug}`.toLowerCase(),
      );
      setProject(matchedFallback || FALLBACK_PROJECTS[0]);
      setLoading(false);
    };

    getProjectDetail();
  }, [slug, location.pathname]);

  // Auto-advance carousel
  useEffect(() => {
    if (!project) return;
    const timer = setInterval(() => {
      setCarouselIndex((i) => (i + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [project]);

  // Highlight active nav tab on scroll
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-gray-500">Property details not found.</p>
      </div>
    );
  }

  // Parse details
  let amenitiesList = [];
  try {
    amenitiesList =
      typeof project.amenities === "string"
        ? JSON.parse(project.amenities)
        : project.amenities || [];
  } catch (e) {
    amenitiesList = [];
  }

  let galleryImagesParsed = [];
  try {
    galleryImagesParsed =
      typeof project.galleryImages === "string"
        ? JSON.parse(project.galleryImages)
        : project.galleryImages || [];
  } catch (e) {
    galleryImagesParsed = [];
  }

  // Setup Gallery Images
  const carouselImages =
    galleryImagesParsed.length > 0
      ? galleryImagesParsed.map((src, idx) => ({
          id: idx + 1,
          src,
          alt: `Gallery Image ${idx + 1}`,
        }))
      : [
          {
            id: 1,
            src: project.mainImage || "/hillside/Scenic-View.webp",
            alt: "Main Elevation",
          },
          { id: 2, src: "/hillside/Scenic-View.webp", alt: "Scenic View" },
          {
            id: 3,
            src: "/hillside/Ownership-Documents.webp",
            alt: "Ownership Documents",
          },
          {
            id: 4,
            src: "/hillside/Direct-Accees-to-Owners.webp",
            alt: "Direct Access",
          },
        ];

  const aerialImage = carouselImages[0];
  const sideBottomImages =
    carouselImages.slice(1).length > 0
      ? carouselImages.slice(1)
      : carouselImages;

  // Loan calculator maths
  const monthlyRate = interestRate / 12 / 100;
  const months = tenure * 12;
  const emi =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  const totalPayable = emi * months;
  const totalInterest = totalPayable - loanAmount;
  const principalPercent = (loanAmount / totalPayable) * 100;

  const visibleAmenities = showAllAmenities
    ? amenitiesList
    : amenitiesList.slice(0, 10);
  const currentPlan = FLOOR_PLANS[activeBHK]?.[activePlanIdx] ||
    FLOOR_PLANS[activeBHK]?.[0] || {
      price: project.priceToken,
      label: "Floor Plan Info",
      bed: 2,
      bath: 2,
      hall: 1,
    };

  return (
    <>
      <div className="bg-slate-950 pb-10 font-sans">
        {/* ── Gallery Section ─────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-4 pt-6 pt-16 md:pt-24">
          <div className="flex flex-col lg:flex-row gap-2 h-auto lg:h-[360px]">
            {/* Left: Carousel */}
            <div className="relative w-full lg:flex-[1.55] h-[250px] sm:h-[320px] lg:h-auto rounded-lg overflow-hidden cursor-pointer group">
              {carouselImages.map((img, idx) => (
                <img
                  key={img.id}
                  src={img.src}
                  alt={img.alt}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    idx === carouselIndex ? "opacity-100" : "opacity-0"
                  }`}
                  onError={(e) => {
                    e.target.src = `https://placehold.co/800x450/e2e8f0/94a3b8?text=Property+Image`;
                  }}
                />
              ))}

              <div
                className="absolute inset-0"
                onClick={() =>
                  setLightbox({
                    images: carouselImages,
                    startIndex: carouselIndex,
                  })
                }
              />

              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 z-10 transition-all opacity-0 group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  setCarouselIndex(
                    (i) =>
                      (i - 1 + carouselImages.length) % carouselImages.length,
                  );
                }}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 z-10 transition-all opacity-0 group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  setCarouselIndex((i) => (i + 1) % carouselImages.length);
                }}
              >
                <ChevronRight size={20} />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {carouselImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCarouselIndex(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === carouselIndex
                        ? "bg-white scale-125"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>

              <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded z-10 pointer-events-none">
                {carouselImages.length} Images
              </div>
            </div>

            {/* Right: Two stacked panels */}
            <div className="flex flex-row lg:flex-col gap-2 flex-1">
              <div
                className="relative flex-1 h-[140px] sm:h-[180px] lg:h-auto rounded-lg overflow-hidden cursor-pointer group"
                onClick={() =>
                  setLightbox({ images: [aerialImage], startIndex: 0 })
                }
              >
                <img
                  src={aerialImage.src}
                  alt={aerialImage.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = `https://placehold.co/400x250/e2e8f0/94a3b8?text=Property`;
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>

              <div
                className="relative flex-1 h-[140px] sm:h-[180px] lg:h-auto rounded-lg overflow-hidden cursor-pointer group"
                onClick={() =>
                  setLightbox({ images: sideBottomImages, startIndex: 0 })
                }
              >
                <img
                  src={sideBottomImages[0]?.src || aerialImage.src}
                  alt={sideBottomImages[0]?.alt || "Gallery image"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = `https://placehold.co/400x250/e2e8f0/94a3b8?text=Property`;
                  }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white text-2xl font-semibold tracking-wide">
                    +{sideBottomImages.length} More
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Property Details ─────────────────────────────────── */}
          <div className="mt-5 flex flex-col lg:flex-row items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-lime-400 text-[#0b1710] text-xs font-semibold px-3 py-1 rounded">
                  {project.type === "exclusive" ? "Exclusive" : "Verified"}
                </span>
                <span className="flex items-center gap-1 text-lime-400 text-xs font-medium">
                  <CheckCircle2 size={14} className="text-lime-400" />
                  Possession : {project.possessionDate || "Immediate"}
                </span>
                {project.reraId && (
                  <span className="flex items-center gap-1 text-lime-400 text-xs font-medium">
                    <CheckCircle2 size={14} className="text-lime-400" />
                    Rera
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold text-white">
                  {project.title}
                </h1>
                <button className="text-slate-400 hover:text-lime-400 transition-colors">
                  <Heart size={20} />
                </button>
                <button className="text-slate-400 hover:text-lime-400 transition-colors">
                  <Share2 size={20} />
                </button>
              </div>

              <p className="text-sm text-slate-400 mt-0.5">
                by{" "}
                <span className="text-lime-400 font-medium">
                  {project.author || "Hillsite Developers"}
                </span>
              </p>

              <div className="flex items-center gap-1 mt-1 text-sm text-slate-400">
                <MapPin size={14} className="text-lime-400" />
                <span>{project.location}</span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5 border-t border-white/10 pt-4">
                <div>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <span>⊞</span> Configuration
                  </p>
                  <p className="text-sm font-semibold text-white mt-1">
                    {project.launchTimeline || "1, 2, 3 BHK"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <span>▣</span> Carpet Area
                  </p>
                  <p className="text-sm font-semibold text-white mt-1">
                    {project.totalApts || "Area on request"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <span>▤</span> Possession Status
                  </p>
                  <p className="text-sm font-semibold text-white mt-1">
                    {project.status || "Ready to Move"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <span>▤</span> Avg. Price
                  </p>
                  <p className="text-sm font-semibold text-white mt-1">
                    ₹ 8,822 sq.ft
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-auto text-left lg:text-right shrink-0">
              <p className="text-xl font-bold text-lime-400">
                {project.priceToken || "Price on Request"}
              </p>
              <div className="flex items-center justify-end gap-2 mt-1">
                <span className="text-xs text-slate-400">Builder Price</span>
                <span className="text-xs text-lime-400 hover:underline cursor-pointer">
                  See inclusions
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Home Loan EMI starts at ₹ 45,000
              </p>
            </div>
          </div>
        </div>

        {/* ── Sticky Nav — same glass style as the main Navbar ──────────────────── */}
        <div
          ref={navRef}
          className="sticky top-24 md:top-20 lg:top-20 z-30 mt-8"
        >
          <div className="max-w-6xl lg:max-w-7xl mx-auto px-2 md:px-8 lg:px-8">
            <div className="flex gap-0 overflow-x-auto scrollbar-none rounded-md border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] px-4">
              {NAV_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    scrollToSection(tab.id);
                  }}
                  className={`relative shrink-0 px-5 py-3.5 text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "text-white font-semibold"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-lime-400 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Two-column layout ───────────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-4 py-6 pb-32 lg:pb-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Left Column Content */}
            <div className="w-full flex-1 min-w-0 space-y-6">
              {/* Overview Section */}
              <section
                id="overview"
                className="bg-[#0d1a12] border border-white/10 rounded-xl p-6 scroll-mt-24"
              >
                <h2 className="text-xl font-bold text-white mb-5">Overview</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-4 mb-5">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">
                      Possession Start Date
                    </p>
                    <p className="text-sm font-semibold text-white mt-1">
                      {project.possessionDate || "Immediate"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">
                      Status
                    </p>
                    <p className="text-sm font-semibold text-lime-400 mt-1">
                      {project.status || "Ready to Move"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">
                      Total Area / Plots
                    </p>
                    <p className="text-sm font-semibold text-white mt-1">
                      {project.totalApts || "Area on request"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">
                      Launch Timeline
                    </p>
                    <p className="text-sm font-semibold text-white mt-1">
                      {project.launchTimeline || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">
                      Availability
                    </p>
                    <p className="text-sm font-semibold text-lime-400 mt-1">
                      Direct from Developer
                    </p>
                  </div>
                </div>

                {project.reraId && (
                  <div className="mb-5">
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                      RERA ID
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed font-mono">
                      {project.reraId}
                    </p>
                  </div>
                )}

                {/* Salient Features */}
                <div className="mb-5">
                  <h3 className="text-lg font-bold text-white mb-3">
                    Salient Features
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Thoroughly verified clear title deeds and clean ownership history.",
                      "Surrounded by spectacular scenic landscape views.",
                      "Equipped with comprehensive developer legal registry backing.",
                      "Highly premium layout spacing ensuring top-tier infrastructure and privacy.",
                    ].map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-slate-300"
                      >
                        <Check
                          size={15}
                          className="text-lime-400 shrink-0 mt-0.5"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    More about {project.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">
                    {project.description ||
                      "No description provided for this dynamic listing."}
                  </p>
                </div>
              </section>

              {/* Floor Plan Section */}
              <section
                id="floorplan"
                className="bg-[#0d1a12] border border-white/10 rounded-xl p-6 scroll-mt-24"
              >
                <h2 className="text-xl font-bold text-white mb-5">
                  {project.title} Layout Plans
                </h2>

                <div className="flex gap-2 mb-5 overflow-x-auto scrollbar-none pb-1">
                  {Object.keys(FLOOR_PLANS).map((bhk) => (
                    <button
                      key={bhk}
                      onClick={() => {
                        setActiveBHK(bhk);
                        setActivePlanIdx(0);
                      }}
                      className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                        activeBHK === bhk
                          ? "bg-lime-400 text-[#0b1710] border-lime-400"
                          : "bg-[#0b1710] text-slate-300 border-white/10 hover:border-lime-400/50"
                      }`}
                    >
                      {bhk}
                    </button>
                  ))}
                </div>

                <div className="flex gap-0 border-b border-white/10 mb-5 overflow-x-auto">
                  {(FLOOR_PLANS[activeBHK] || []).map((plan, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePlanIdx(idx)}
                      className={`relative shrink-0 px-4 py-2.5 text-sm transition-colors duration-200 ${
                        activePlanIdx === idx
                          ? "text-white font-medium"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {plan.label}
                      {activePlanIdx === idx && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime-400 rounded-t" />
                      )}
                    </button>
                  ))}
                </div>

                <p className="text-2xl font-bold text-white mb-2">
                  {currentPlan.price}
                </p>
                <FloorPlanIllustration />

                <div className="flex items-center gap-3 mt-4 flex-wrap">
                  <div className="flex items-center gap-1.5 border border-white/10 rounded-md px-3 py-1.5 text-sm text-slate-300">
                    <BedDouble size={15} className="text-slate-500" />
                    {currentPlan.bed} Bedroom{currentPlan.bed > 1 ? "s" : ""}
                  </div>
                  <div className="flex items-center gap-1.5 border border-white/10 rounded-md px-3 py-1.5 text-sm text-slate-300">
                    <Bath size={15} className="text-slate-500" />
                    {currentPlan.bath} Bathroom{currentPlan.bath > 1 ? "s" : ""}
                  </div>
                  <div className="flex items-center gap-1.5 border border-white/10 rounded-md px-3 py-1.5 text-sm text-slate-300">
                    <LayoutDashboard size={15} className="text-slate-500" />
                    {currentPlan.hall} Hall
                  </div>
                  <button className="w-full sm:w-auto sm:ml-auto text-xs text-lime-400 hover:underline flex items-center gap-1 justify-center sm:justify-start">
                    <Flag size={12} /> Report Error
                  </button>
                </div>
              </section>

              {/* Amenities Section */}
              <section
                id="amenities"
                className="bg-[#0d1a12] border border-white/10 rounded-xl p-6 scroll-mt-24"
              >
                <h2 className="text-xl font-bold text-white mb-5">
                  {project.title} Amenities
                </h2>

                {amenitiesList.length === 0 ? (
                  <p className="text-sm text-slate-500">
                    No specific amenities configured for this property.
                  </p>
                ) : (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {visibleAmenities.map((label) => {
                        const Icon = AMENITY_ICONS[label] || CheckCircle2;
                        return (
                          <div
                            key={label}
                            className="flex flex-col items-center justify-center border border-white/10 rounded-lg p-3 gap-2 hover:border-lime-400/40 hover:bg-lime-400/5 transition-colors duration-200 cursor-default"
                          >
                            <Icon
                              size={26}
                              className="text-lime-400"
                              strokeWidth={1.5}
                            />
                            <span className="text-xs text-slate-300 text-center leading-tight">
                              {label}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {amenitiesList.length > 10 && (
                      <button
                        onClick={() => setShowAllAmenities(!showAllAmenities)}
                        className="mt-4 w-full text-sm text-lime-400 hover:text-lime-300 font-medium"
                      >
                        {showAllAmenities ? "Show Less" : "See All Amenities"}
                      </button>
                    )}
                  </>
                )}
              </section>

              {/* Gallery Grid Section */}
              <section
                id="gallery"
                className="bg-[#0d1a12] border border-white/10 rounded-xl p-6 scroll-mt-24"
              >
                <h2 className="text-xl font-bold text-white mb-4">
                  {project.title} Gallery
                </h2>

                <div className="flex gap-0 border-b border-white/10 mb-5 overflow-x-auto">
                  {[
                    "Elevation",
                    "Amenities",
                    "Floor Plans",
                    "Neighbourhood",
                    "Others",
                  ].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveGalleryTab(tab)}
                      className={`relative shrink-0 px-4 py-2.5 text-sm transition-colors duration-200 ${
                        activeGalleryTab === tab
                          ? "text-white font-medium"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {tab}
                      {activeGalleryTab === tab && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime-400 rounded-t" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {carouselImages.map((img, i) => (
                    <div
                      key={i}
                      className="aspect-[4/3] rounded-lg overflow-hidden relative group cursor-pointer"
                      onClick={() =>
                        setLightbox({ images: carouselImages, startIndex: i })
                      }
                    >
                      <img
                        src={img.src}
                        alt={`Gallery ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = `https://placehold.co/400x300/0b1710/a3e635?text=Gallery+${i + 1}`;
                        }}
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Home Loan Calculator */}
              <section
                id="homeloan"
                className="bg-[#0d1a12] border border-white/10 rounded-xl p-4 sm:p-6 scroll-mt-24"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
                  Home Loan Calculator
                </h2>

                <div className="grid lg:grid-cols-[1fr_340px] gap-6">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        Select a unit
                      </label>
                      <select className="w-full border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white bg-[#0b1710] focus:outline-none focus:border-lime-400/50">
                        <option>
                          Standard Plot Unit (Premium Config) -{" "}
                          {project.priceToken || "Price on request"}
                        </option>
                        <option>Premium Villa Option (Custom build)</option>
                      </select>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium text-slate-400">
                          Loan Amount
                        </h3>
                        <div className="border border-white/10 rounded-xl px-3 py-1.5 text-base font-semibold text-white bg-[#0b1710]">
                          ₹ {loanAmount.toLocaleString()}
                        </div>
                      </div>
                      <input
                        type="range"
                        min="1000000"
                        max="10000000"
                        step="100000"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="w-full accent-lime-400 cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>₹ 10 L</span>
                        <span>₹ 1 Cr</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium text-slate-400">
                          Loan Tenure{" "}
                          <span className="text-slate-500 font-normal">
                            (in years)
                          </span>
                        </h3>
                        <div className="border border-white/10 rounded-xl px-3 py-1.5 text-base font-semibold text-white bg-[#0b1710]">
                          {tenure} Y
                        </div>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="30"
                        value={tenure}
                        onChange={(e) => setTenure(Number(e.target.value))}
                        className="w-full accent-lime-400 cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>5 Y</span>
                        <span>30 Y</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium text-slate-400">
                          Interest Rate{" "}
                          <span className="text-slate-500 font-normal">
                            (% P.A.)
                          </span>
                        </h3>
                        <div className="border border-white/10 rounded-xl px-3 py-1.5 text-base font-semibold text-white bg-[#0b1710]">
                          {interestRate} %
                        </div>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="15"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) =>
                          setInterestRate(Number(e.target.value))
                        }
                        className="w-full accent-lime-400 cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>5 %</span>
                        <span>15 %</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0b1710] rounded-2xl p-4 sm:p-5 border border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-center mb-4">
                        <div
                          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center transition-all"
                          style={{
                            background: `conic-gradient(
                              #a3e635 0% ${principalPercent}%,
                              #ef4444 ${principalPercent}% 100%
                            )`,
                          }}
                        >
                          <div className="w-20 h-20 sm:w-22 sm:h-22 bg-[#0b1710] rounded-full" />
                        </div>
                      </div>

                      <div className="text-center mb-5">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white">
                          ₹{" "}
                          {(emi || 0).toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                        </h3>
                        <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                          EMI per month
                        </p>
                      </div>

                      <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2 font-medium">
                            <span className="w-2.5 h-2.5 bg-lime-400 rounded-full shrink-0" />
                            Principal Amount
                          </div>
                          <span className="font-semibold text-white">
                            ₹ {loanAmount.toLocaleString()}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2 font-medium">
                            <span className="w-2.5 h-2.5 bg-red-500 rounded-full shrink-0" />
                            Interest Amount
                          </div>
                          <span className="font-semibold text-white">
                            ₹{" "}
                            {Math.max(0, totalInterest).toLocaleString(
                              undefined,
                              { maximumFractionDigits: 0 },
                            )}
                          </span>
                        </div>

                        <div className="flex justify-between items-center font-semibold text-white border-t border-white/10 pt-2.5 mt-2">
                          <span>Total payable</span>
                          <span>
                            ₹{" "}
                            {Math.max(0, totalPayable).toLocaleString(
                              undefined,
                              { maximumFractionDigits: 0 },
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button className="w-full border border-lime-400 text-lime-400 py-2.5 rounded-xl text-sm font-semibold hover:bg-lime-400 hover:text-[#0b1710] transition-all duration-200 active:scale-[0.99]">
                        Apply Home Loan
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column Sticky Contact Form */}
            <div className="hidden lg:block w-[300px] shrink-0 sticky top-40 self-start">
              <ContactForm
                city={project.title}
                subtitle={project.author || "Hillsite Developers"}
              />
            </div>
          </div>
        </div>
      </div>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIndex={lightbox.startIndex}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
