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
  Zap,
  Fence,
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
  // Land Amenities
  "Water Source": Droplets,
  Fencing: Fence,
  "EB Connectivity": Zap,
};

// ── Seeded Fallbacks if Database Project is Not Found ──────────────────────────
const FALLBACK_PROJECTS = [
  {
    id: 7,
    type: "small_plot",
    title: "test",
    author: "",
    location: "Near nilavoor closed quary",
    routeSubpath: "/test",
    priceToken: "",
    status: "Ready to Move",
    possessionDate: "",
    totalApts: "",
    launchTimeline: "",
    reraId: "",
    amenities: "[]",
    description: "",
    mainImage:
      "https://res.cloudinary.com/da4bopyz9/image/upload/v1784953340/real-estate-projects/yjki4d4xepku36lsxaaj.jpg",
    ownerName: "test",
    area: "test",
    waterSource: "test",
    fencingType: "test",
    landSketch: "test",
    fmv: "test",
    nearestRoad: "test",
    distanceToMainRoad: "test",
    connectionRoadWidth: "test",
    roadType: "test",
    ebConnectivity: "Available",
    legalVerification: "Pending",
    view360: "test",
    galleryImages:
      '["https://res.cloudinary.com/da4bopyz9/image/upload/v1784953345/real-estate-projects/gd8rlhc6s8urnbivesel.jpg","https://res.cloudinary.com/da4bopyz9/image/upload/v1784953346/real-estate-projects/j7udrfdm05scxaazn5za.jpg","https://res.cloudinary.com/da4bopyz9/image/upload/v1784953349/real-estate-projects/l7dkwrdyzcuit0repod1.jpg","https://res.cloudinary.com/da4bopyz9/image/upload/v1784953350/real-estate-projects/zihq5eqyovudl9qpgdkj.jpg"]',
    videos: [
      "/videos/1784953183118-a2b7287db150a523.mp4",
      "/videos/1784953188135-1e194b3a2186a8f7.mp4",
    ],
  },
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
  { label: "Highlights", id: "highlights" },
  { label: "Amenities", id: "amenities" },
  { label: "Gallery", id: "gallery" },
  // { label: "Home Loan", id: "homeloan" },
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

const extractYoutubeVideoId = (url) => {
  if (!url) return null;

  // Embed URL
  if (url.includes("/embed/")) {
    return url.split("/embed/")[1]?.split("?")[0];
  }

  // Watch URL
  if (url.includes("watch?v=")) {
    return url.split("watch?v=")[1]?.split("&")[0];
  }

  // youtu.be URL
  if (url.includes("youtu.be/")) {
    return url.split("youtu.be/")[1]?.split("?")[0];
  }

  return null;
};

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

  const currentMedia = images[current];

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
        className="max-w-5xl max-h-[80vh] w-full mx-4 sm:mx-10 lg:mx-16 flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {currentMedia?.type === "video" ? (
          <video
            src={currentMedia.src}
            className="w-full max-h-[75vh] object-contain rounded"
            controls
            autoPlay
            playsInline
          />
        ) : currentMedia?.type === "youtube" ? (
          <iframe
            src={currentMedia.src}
            className="w-full aspect-video max-h-[75vh] object-contain rounded border-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={currentMedia.alt}
          />
        ) : (
          <img
            src={currentMedia?.src}
            alt={currentMedia?.alt || "Gallery Media"}
            className="w-full max-h-[75vh] object-contain rounded"
          />
        )}
        <p className="text-center text-white/50 text-sm mt-3">
          {currentMedia?.alt}
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

function getCalculatedDetails(project) {
  if (!project) {
    return {
      ratePerCent: null,
      totalArea: "N/A",
      totalCent: 0,
      totalAcre: 0,
      totalPrice: "Price on Request",
      pricePerAcre: "N/A",
      infrastructure: 0,
    };
  }

  const extractNumber = (value) => {
    if (!value) return 0;
    const match = String(value).match(/[\d.]+/);
    return match ? Number(match[0]) : 0;
  };

  // ---------------- Rate ----------------

  const rateSource = [project.priceToken, project.status, project.fmv].find(
    (v) => typeof v === "string" && v.toLowerCase().includes("per cent"),
  );

  const rate = extractNumber(rateSource);

  // ---------------- Area ----------------

  const areaSource =
    project.area || project.totalApts || project.launchTimeline || "";

  const area = extractNumber(areaSource);

  const isAcre = areaSource.toLowerCase().includes("acre");

  const totalCent = isAcre ? area * 100 : area;

  const totalAcre = totalCent / 100;

  // ---------------- Price ----------------

  const totalLakhs = totalCent * rate;

  let totalPrice = "Price on Request";

  if (totalLakhs > 0) {
    totalPrice =
      totalLakhs >= 100
        ? `₹ ${(totalLakhs / 100).toFixed(2)} Cr`
        : `₹ ${totalLakhs.toFixed(2)} Lakhs`;
  }

  const pricePerAcre = rate > 0 ? `₹ ${(rate * 100).toFixed(2)} Lakhs` : "N/A";

  // ---------------- Infrastructure ----------------

  const amenities = Array.isArray(project.amenities)
    ? project.amenities
    : (() => {
        try {
          return JSON.parse(project.amenities || "[]");
        } catch {
          return [];
        }
      })();

  const checks = [
    project.ebConnectivity === "Available",
    project.waterSource === "Available",
    project.fencingType === "Available",
  ];

  const infrastructure = Math.round(
    (checks.filter(Boolean).length / checks.length) * 100,
  );

  return {
    ratePerCent: rate > 0 ? `₹${rate.toFixed(2)}L per cent` : "N/A",

    totalArea:
      totalCent > 0
        ? isAcre
          ? `${totalAcre.toFixed(2)} Acres`
          : `${totalCent} Cents`
        : "N/A",

    totalCent,

    totalAcre: totalAcre.toFixed(2),

    totalPrice,

    pricePerAcre,

    infrastructure,
  };
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function PropertyDetailPage() {
  const { slug } = useParams();
  const location = useLocation();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const details = getCalculatedDetails(project);

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

  // Parse details
  let amenitiesList = [];
  try {
    amenitiesList =
      typeof project?.amenities === "string"
        ? JSON.parse(project.amenities)
        : project?.amenities || [];
  } catch (e) {
    amenitiesList = [];
  }

  let galleryImagesParsed = [];
  try {
    galleryImagesParsed =
      typeof project?.galleryImages === "string"
        ? JSON.parse(project.galleryImages)
        : project?.galleryImages || [];
  } catch (e) {
    galleryImagesParsed = [];
  }

  let videosParsed = [];

  try {
    videosParsed =
      typeof project?.videos === "string"
        ? JSON.parse(project.videos)
        : project?.videos || [];
  } catch (e) {
    videosParsed = [];
  }

  const getVideoUrl = (videoPath) => {
    if (!videoPath) return "";

    if (videoPath.startsWith("http://") || videoPath.startsWith("https://")) {
      return videoPath;
    }

    if (videoPath.startsWith("/videos/")) {
      const baseUrl = API_URL.replace(/\/$/, "");
      return `${baseUrl}${videoPath}`;
    }

    return videoPath;
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    if (imagePath.startsWith("/images/")) {
      const baseUrl = API_URL.replace(/\/$/, "");
      return `${baseUrl}${imagePath}`;
    }

    return imagePath;
  };

  const getFilename = (urlOrPath) => {
    if (!urlOrPath) return "";
    return urlOrPath.split("/").pop().toLowerCase();
  };

  const mainImageFilename = getFilename(project?.mainImage);

  // Setup Gallery Images (excluding the main image if it's already there)
  const imageMedia = galleryImagesParsed
    .filter((src) => getFilename(src) !== mainImageFilename)
    .map((src, idx) => ({
      id: `image-${idx}`,
      type: "image",
      src: getImageUrl(src),
      alt: `Property Image ${idx + 1}`,
    }));

  const videoMedia = videosParsed.map((src, idx) => ({
    id: `video-${idx}`,
    type: "video",
    src: getVideoUrl(src),
    alt: `Property Video ${idx + 1}`,
  }));

  const mainImageMedia = project?.mainImage
    ? [
        {
          id: "main-image",
          type: "image",
          src: getImageUrl(project.mainImage),
          alt: `${project.title || "Property"} Main Image`,
        },
      ]
    : [];
  let youtubeEmbedsParsed = [];
  try {
    youtubeEmbedsParsed =
      typeof project?.youtubeEmbeds === "string"
        ? JSON.parse(project.youtubeEmbeds)
        : project?.youtubeEmbeds || [];
  } catch (e) {
    youtubeEmbedsParsed = [];
  }

  const youtubeMedia = youtubeEmbedsParsed
    .map((url, idx) => {
      const videoId = extractYoutubeVideoId(url);
      if (!videoId) return null;
      return {
        id: `youtube-${idx}`,
        type: "youtube",
        videoId,
        src: `https://www.youtube.com/embed/${videoId}`,
        watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        fallbackThumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        alt: `${project?.title || "Property"} YouTube Video ${idx + 1}`,
      };
    })
    .filter(Boolean);

  // Main image + gallery images + videos
  const galleryMedia = [
    ...mainImageMedia,
    ...imageMedia,
    ...videoMedia,
    ...youtubeMedia,
  ];

  const carouselMedia =
    galleryMedia.length > 0
      ? galleryMedia
      : [
          {
            id: "fallback",
            type: "image",
            src: "/hillside/Scenic-View.webp",
            alt: "Property",
          },
        ];

  const carouselImages = carouselMedia.filter(
    (media) => media.type === "image",
  );

  const aerialMedia = carouselMedia[0];

  const sideBottomMedia =
    carouselMedia.slice(1).length > 0 ? carouselMedia.slice(1) : carouselMedia;

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
      price: project?.priceToken || "",
      label: "Floor Plan Info",
      bed: 2,
      bath: 2,
      hall: 1,
    };

  const navTabs = [
    { label: "Overview", id: "overview" },
    project?.ownerName ||
    project?.waterSource ||
    project?.fencingType ||
    project?.nearestRoad ||
    project?.ebConnectivity ||
    project?.legalVerification
      ? { label: "Highlights", id: "highlights" }
      : null,
    amenitiesList.length > 0 ? { label: "Amenities", id: "amenities" } : null,
    carouselMedia.length > 0 ? { label: "Gallery", id: "gallery" } : null,
  ].filter(Boolean);

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

  // Reset carousel index when the loaded property changes
  useEffect(() => {
    setCarouselIndex(0);
  }, [slug, location.pathname]);

  // Auto-advance carousel
  useEffect(() => {
    if (!project) return;

    const timer = setInterval(() => {
      setCarouselIndex((i) => (i + 1) % carouselMedia.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [project, carouselMedia.length]);

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

  return (
    <>
      <div className="bg-slate-950 pb-10 font-sans">
        {/* ── Gallery Section ─────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-4 pt-6 pt-16 md:pt-24">
          <div className="relative w-full h-[250px] sm:h-[380px] lg:h-[450px] rounded-lg overflow-hidden cursor-pointer group">
            {carouselMedia.map((media, idx) => (
              <div
                key={media.id}
                onClick={() => {
                  if (media.type === "video" || media.type === "youtube") {
                    setActiveVideo(media);
                  } else {
                    setLightbox({
                      images: carouselMedia,
                      startIndex: idx,
                    });
                  }
                }}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  idx === carouselIndex
                    ? "opacity-100 z-[1]"
                    : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                {media.type === "video" ? (
                  <div className="w-full h-full relative">
                    <video
                      src={media.src}
                      className="w-full h-full object-cover"
                      playsInline
                      muted
                      preload="metadata"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-14 h-14 bg-lime-400 text-[#0b1710] rounded-full flex items-center justify-center shadow-lg hover:bg-lime-500 hover:scale-105 transition-all">
                        <svg
                          className="w-7 h-7 fill-current ml-1"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : media.type === "youtube" ? (
                  <div className="w-full h-full relative">
                    <img
                      src={media.thumbnail}
                      alt={media.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = media.fallbackThumbnail;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                      <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-lg hover:bg-red-750 hover:scale-105 transition-all">
                        <svg
                          className="w-7 h-7 fill-current text-white ml-1.5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={media.src}
                    alt={media.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/800x450/e2e8f0/94a3b8?text=Property";
                    }}
                  />
                )}

                {(media.type === "video" || media.type === "youtube") && (
                  <div
                    className={`absolute top-3 left-3 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full pointer-events-none ${media.type === "youtube" ? "bg-red-650" : "bg-black/70"}`}
                  >
                    {media.type === "youtube" ? "YOUTUBE" : "VIDEO"}
                  </div>
                )}
              </div>
            ))}

            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 z-10 transition-all opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                setCarouselIndex(
                  (i) => (i - 1 + carouselMedia.length) % carouselMedia.length,
                );
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 z-10 transition-all opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                setCarouselIndex((i) => (i + 1) % carouselMedia.length);
              }}
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {carouselMedia.map((_, idx) => (
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
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1.5 rounded-md z-10 pointer-events-none">
              {carouselMedia.length} Media
            </div>
          </div>

          {/* ── Property Details ─────────────────────────────────── */}
          <div className="mt-5 flex flex-col lg:flex-row items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-lime-400 text-[#0b1710] text-xs font-semibold px-3 py-1 rounded">
                  {project.type === "exclusive" ? "Exclusive" : "Verified"}
                </span>
                {project.possessionDate && (
                  <span className="flex items-center gap-1 text-lime-400 text-xs font-medium">
                    <CheckCircle2 size={14} className="text-lime-400" />
                    Possession : {project.possessionDate}
                  </span>
                )}
                {project.reraId && (
                  <span className="flex items-center gap-1 text-lime-400 text-xs font-medium">
                    <CheckCircle2 size={14} className="text-lime-400" />
                    Rera
                  </span>
                )}
              </div>

              {/* <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold text-white">
                  {project.title}
                </h1>
                <button className="text-slate-400 hover:text-lime-400 transition-colors">
                  <Heart size={20} />
                </button>
                <button className="text-slate-400 hover:text-lime-400 transition-colors">
                  <Share2 size={20} />
                </button>
              </div> */}

              {project.author && (
                <p className="text-sm text-slate-400 mt-0.5">
                  by{" "}
                  <span className="text-lime-400 font-medium">
                    {project.author}
                  </span>
                </p>
              )}

              <div className="flex items-center gap-1 mt-1 text-sm text-slate-400">
                <MapPin size={14} className="text-lime-400" />
                <span>{project.location}, Yelagiri</span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5 border-t border-white/10 pt-4">
                {((project.type !== "small_plot" &&
                  project.type !== "large_plot" &&
                  project.launchTimeline) ||
                  ((project.type === "small_plot" ||
                    project.type === "large_plot") &&
                    (project.area ||
                      project.totalApts ||
                      details.totalArea !== "N/A"))) && (
                  <div>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <span>⊞</span>{" "}
                      {project.type !== "small_plot" &&
                      project.type !== "large_plot"
                        ? "Configuration"
                        : "Plot Area"}
                    </p>
                    <p className="text-sm font-semibold text-white mt-1">
                      {project.type !== "small_plot" &&
                      project.type !== "large_plot"
                        ? project.launchTimeline
                        : details.totalArea !== "N/A"
                          ? details.totalArea
                          : project.area || project.totalApts}
                    </p>
                  </div>
                )}
                {project.possessionDate && (
                  <div>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <span>▣</span> Possession Status
                    </p>
                    <p className="text-sm font-semibold text-white mt-1">
                      {project.possessionDate}
                    </p>
                  </div>
                )}
                {project.status && (
                  <div>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <span>▤</span> Status
                    </p>
                    <p className="text-sm font-semibold text-white mt-1">
                      {project.status &&
                      project.status.toLowerCase().includes("per cent")
                        ? "Ready to Buy"
                        : project.status}
                    </p>
                  </div>
                )}
                {/* {project.fmv ? (
                  <div>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <span>▤</span> Market Value (FMV)
                    </p>
                    <p className="text-sm font-semibold text-white mt-1">
                      {project.fmv}
                    </p>
                  </div>
                ) : project.priceToken ? (
                  <div>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <span>▤</span> Avg. Price
                    </p>
                    <p className="text-sm font-semibold text-white mt-1">
                      ₹ 8,822 sq.ft
                    </p>
                  </div>
                ) : null} */}
              </div>
            </div>

            <div className="text-left lg:text-right">
              <p className="text-3xl font-bold text-lime-400">
                {details.totalPrice}
              </p>

              <p className="text-sm text-slate-400 mt-1">
                {details.ratePerCent}
              </p>

              <div className="mt-4 ">
                <div>
                  <p className="text-xs text-slate-500">Total Area</p>
                  <p className="text-white font-semibold">
                    {details.totalArea}
                  </p>
                </div>

                {/* <div>
                  <p className="text-xs text-slate-500">Total Cent</p>
                  <p className="text-white font-semibold">
                    {details.totalCent}
                  </p>
                </div> */}

                {/* <div>
                  <p className="text-xs text-slate-500">Total Acre</p>
                  <p className="text-white font-semibold">
                    {details.totalAcre}
                  </p>
                </div> */}

                {/* <div>
                  <p className="text-xs text-slate-500">Price / Acre</p>
                  <p className="text-lime-400 font-semibold">
                    {details.pricePerAcre}
                  </p>
                </div> */}
              </div>
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
              {navTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
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
              {activeTab === "overview" && (
                <section
                  id="overview"
                  className="bg-[#0d1a12] border border-white/10 rounded-xl p-6 scroll-mt-24"
                >
                  {/* <h2 className="text-xl font-bold text-white mb-5">
                    Overview
                  </h2> */}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-4 mb-5">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">
                        Posted Date
                      </p>
                      <p className="text-sm font-semibold text-white mt-1">
                        {project.possessionDate || "Immediate"}
                      </p>
                    </div>
                    {/* <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">
                        Status
                      </p>
                      <p className="text-sm font-semibold text-lime-400 mt-1">
                        {project.status || "Ready to Move"}
                      </p>
                    </div> */}
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">
                        Total Area / Plots
                      </p>
                      <p className="text-sm font-semibold text-white mt-1">
                        {details.totalArea !== "N/A"
                          ? details.totalArea
                          : project.area ||
                            project.totalApts ||
                            "Area on request"}
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
                        {project.author
                          ? `Direct from ${project.author}`
                          : "Direct from Developer"}
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
                  {/* <div className="mb-5">
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
                  </div> */}

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      More about {project.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">
                      {project.description ||
                        "No description provided for this  listing."}
                    </p>
                  </div>
                </section>
              )}

              {/* Highlights Section */}
              {activeTab === "highlights" &&
                (project.ownerName ||
                  project.waterSource ||
                  project.fencingType ||
                  project.nearestRoad ||
                  project.ebConnectivity ||
                  project.legalVerification) && (
                  <section
                    id="highlights"
                    className="bg-[#0d1a12] border border-white/10 rounded-xl p-6 scroll-mt-24"
                  >
                    {/* <h2 className="text-xl font-bold text-white mb-5">
                      Property Highlights
                    </h2> */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                      {project.ownerName && (
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className="text-slate-400 text-sm">
                            Owner Name
                          </span>
                          <span className="text-white text-sm font-semibold">
                            {project.ownerName}
                          </span>
                        </div>
                      )}
                      {(project.area ||
                        project.totalApts ||
                        details.totalArea !== "N/A") && (
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className="text-slate-400 text-sm">
                            Total Area
                          </span>
                          <span className="text-white text-sm font-semibold">
                            {details.totalArea !== "N/A"
                              ? details.totalArea
                              : project.area || project.totalApts}
                          </span>
                        </div>
                      )}
                      {/* {project.waterSource && (
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className="text-slate-400 text-sm">
                            Water Source
                          </span>
                          <span className="text-white text-sm font-semibold">
                            {project.waterSource}
                          </span>
                        </div>
                      )} */}
                      {/* {project.fencingType && (
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className="text-slate-400 text-sm">
                            Fencing Type
                          </span>
                          <span className="text-white text-sm font-semibold">
                            {project.fencingType}
                          </span>
                        </div>
                      )} */}
                      {project.landSketch && (
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className="text-slate-400 text-sm">
                            Land Sketch / Survey Info
                          </span>
                          <span className="text-white text-sm font-semibold">
                            {project.landSketch}
                          </span>
                        </div>
                      )}
                      {project.fmv && (
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className="text-slate-400 text-sm">
                            Fair Market Value (FMV)
                          </span>
                          <span className="text-white text-sm font-semibold">
                            {project.fmv}
                          </span>
                        </div>
                      )}
                      {project.nearestRoad && (
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className="text-slate-400 text-sm">
                            Nearest Road
                          </span>
                          <span className="text-white text-sm font-semibold">
                            {project.nearestRoad}
                          </span>
                        </div>
                      )}
                      {project.distanceToMainRoad && (
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className="text-slate-400 text-sm">
                            Distance to Main Road
                          </span>
                          <span className="text-white text-sm font-semibold">
                            {project.distanceToMainRoad}
                          </span>
                        </div>
                      )}
                      {project.connectionRoadWidth && (
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className="text-slate-400 text-sm">
                            Connection Road Width
                          </span>
                          <span className="text-white text-sm font-semibold">
                            {project.connectionRoadWidth}
                          </span>
                        </div>
                      )}
                      {project.roadType && (
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className="text-slate-400 text-sm">
                            Road Type
                          </span>
                          <span className="text-white text-sm font-semibold">
                            {project.roadType}
                          </span>
                        </div>
                      )}
                      {/* {project.ebConnectivity && (
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className="text-slate-400 text-sm">
                            EB Connectivity
                          </span>
                          <span className="text-white text-sm font-semibold">
                            {project.ebConnectivity}
                          </span>
                        </div>
                      )} */}
                      {project.legalVerification && (
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className="text-slate-400 text-sm">
                            Legal Verification
                          </span>
                          <span
                            className={`text-sm font-semibold ${
                              project.legalVerification.toLowerCase() ===
                                "verified" ||
                              project.legalVerification.toLowerCase() ===
                                "completed"
                                ? "text-emerald-400"
                                : project.legalVerification.toLowerCase() ===
                                    "pending"
                                  ? "text-amber-400"
                                  : "text-white"
                            }`}
                          >
                            {project.legalVerification}
                          </span>
                        </div>
                      )}
                    </div>

                    {project.view360 && (
                      <div className="mt-6 border-t border-white/10 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h4 className="text-sm font-semibold text-white">
                            360° Virtual Tour
                          </h4>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Explore the property in an immersive 360-degree
                            environment.
                          </p>
                        </div>
                        <a
                          href={
                            project.view360.startsWith("http")
                              ? project.view360
                              : `https://${project.view360}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center bg-lime-400 text-[#0b1710] font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-lime-300 transition-all duration-200"
                        >
                          Launch 360° Tour
                        </a>
                      </div>
                    )}
                  </section>
                )}

              {/* Floor Plan Section */}
              {activeTab === "overview" &&
                project.type !== "small_plot" &&
                project.type !== "large_plot" && (
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
                        {currentPlan.bed} Bedroom
                        {currentPlan.bed > 1 ? "s" : ""}
                      </div>
                      <div className="flex items-center gap-1.5 border border-white/10 rounded-md px-3 py-1.5 text-sm text-slate-300">
                        <Bath size={15} className="text-slate-500" />
                        {currentPlan.bath} Bathroom
                        {currentPlan.bath > 1 ? "s" : ""}
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
                )}

              {/* Amenities Section */}
              {activeTab === "amenities" && amenitiesList.length > 0 && (
                <section
                  id="amenities"
                  className="bg-[#0d1a12] border border-white/10 rounded-xl p-6 scroll-mt-24"
                >
                  <h2 className="text-xl font-bold text-white mb-5">
                    {project.title} Amenities
                  </h2>

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
                </section>
              )}

              {/* Gallery Grid Section */}
              {activeTab === "gallery" && (
                <section
                  id="gallery"
                  className="bg-[#0d1a12] border border-white/10 rounded-xl p-6 scroll-mt-24"
                >
                  <h2 className="text-xl font-bold text-white mb-4">
                    {project.title} Gallery
                  </h2>

                  {/* <div className="flex gap-0 border-b border-white/10 mb-5 overflow-x-auto">
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
                  </div> */}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {carouselMedia.map((media, i) => (
                      <div
                        key={i}
                        className="aspect-[4/3] rounded-lg overflow-hidden relative group cursor-pointer"
                        onClick={() => {
                          if (
                            media.type === "video" ||
                            media.type === "youtube"
                          ) {
                            setActiveVideo(media);
                          } else {
                            setLightbox({
                              images: carouselMedia,
                              startIndex: i,
                            });
                          }
                        }}
                      >
                        {media.type === "video" ? (
                          <div className="w-full h-full relative">
                            <video
                              src={media.src}
                              className="w-full h-full object-cover"
                              preload="metadata"
                            />
                            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-1 group-hover:bg-black/55 transition-colors duration-300">
                              <span className="text-white text-[10px] bg-lime-400 text-[#0b1710] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                Play Video
                              </span>
                            </div>
                          </div>
                        ) : media.type === "youtube" ? (
                          <div className="w-full h-full relative">
                            <img
                              src={media.thumbnail}
                              alt={`Gallery ${i + 1}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                              onError={(e) => {
                                e.currentTarget.src = media.fallbackThumbnail;
                              }}
                            />
                            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-1 group-hover:bg-black/55 transition-colors duration-300">
                              <span className="text-white text-[10px] bg-red-650 text-white font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                Play YouTube
                              </span>
                            </div>
                          </div>
                        ) : (
                          <img
                            src={media.src}
                            alt={`Gallery ${i + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.target.src = `https://placehold.co/400x300/0b1710/a3e635?text=Gallery+${i + 1}`;
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Home Loan Calculator */}
              {/* <section
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
              </section> */}
            </div>

            {/* Right Column Sticky Contact Form */}
            {/* <div className="hidden lg:block w-[300px] shrink-0 sticky top-40 self-start">
              <ContactForm
                city={project.title}
                subtitle={project.author || "Hillsite Developers"}
              />
            </div> */}
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

      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm cursor-pointer"
          onClick={() => setActiveVideo(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            onClick={() => setActiveVideo(null)}
          >
            <X size={32} />
          </button>
          <div
            className="w-full max-w-4xl aspect-video mx-4 sm:mx-10 rounded-lg overflow-hidden bg-black shadow-2xl relative cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {activeVideo.type === "youtube" ? (
              <iframe
                src={`${activeVideo.src}?autoplay=1`}
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={activeVideo.src}
                className="w-full h-full object-contain"
                controls
                autoPlay
                playsInline
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
