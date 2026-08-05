import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart,
  MapPin,
  CalendarDays,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  Mountain,
} from "lucide-react";
import BorderGlow from "../components/BorderGlow";
import API_URL from "../app";

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

// ─── Calculated Details (same logic as SmallMovingProjects) ─────────────────
function getCalculatedDetails(project) {
  // 1. Rate per Cent
  let ratePerCent = 0;
  let rateStr = "";

  const fieldsToCheckRate = [
    project.price,
    project.status,
    project.fmv,
    project.priceToken,
  ];
  for (const f of fieldsToCheckRate) {
    if (f && typeof f === "string" && f.toLowerCase().includes("per cent")) {
      rateStr = f;
      const match = f.match(/([0-9.]+)/);
      if (match) {
        ratePerCent = parseFloat(match[1]);
        break;
      }
    }
  }

  // 2. Area
  let areaValue = 0;
  let areaUnit = "cent";
  let areaStr = "";

  if (
    project.area &&
    typeof project.area === "string" &&
    project.area.trim() !== "" &&
    project.area.toLowerCase() !== "test" &&
    project.area.toLowerCase() !== "nil"
  ) {
    areaStr = project.area;
  } else if (
    project.price &&
    typeof project.price === "string" &&
    (project.price.toLowerCase().includes("cent") ||
      project.price.toLowerCase().includes("acre")) &&
    !project.price.toLowerCase().includes("per cent")
  ) {
    areaStr = project.price;
  } else if (
    project.totalApts &&
    typeof project.totalApts === "string" &&
    project.totalApts.trim() !== ""
  ) {
    areaStr = project.totalApts;
  } else if (
    project.config &&
    typeof project.config === "string" &&
    project.config.trim() !== ""
  ) {
    areaStr = project.config;
  }

  if (areaStr) {
    const numMatch = areaStr.match(/([0-9.]+)/);
    if (numMatch) {
      areaValue = parseFloat(numMatch[1]);
      if (areaStr.toLowerCase().includes("acre")) {
        areaUnit = "acre";
      } else {
        areaUnit = "cent";
      }
    }
  }

  // Convert area to cents
  let cents = 0;
  if (areaUnit === "acre") {
    cents = areaValue * 100;
  } else {
    cents = areaValue;
  }

  // Calculate Total Price
  const totalPriceLakhs = cents * ratePerCent;

  let formattedTotalPrice = "Price on Request";
  if (totalPriceLakhs > 0) {
    if (totalPriceLakhs >= 100) {
      formattedTotalPrice = `₹ ${(totalPriceLakhs / 100).toFixed(2)} Cr`;
    } else {
      formattedTotalPrice = `₹ ${totalPriceLakhs.toFixed(2)} Lakhs`;
    }
  } else if (
    project.price &&
    typeof project.price === "string" &&
    !project.price.toLowerCase().includes("cent")
  ) {
    formattedTotalPrice = project.price;
  }

  // Calculate Infrastructure progress
  let amenitiesArray = [];
  try {
    amenitiesArray =
      typeof project.amenities === "string"
        ? JSON.parse(project.amenities || "[]")
        : project.amenities || [];
  } catch (e) {
    amenitiesArray = [];
  }

  const checkAmenities = ["EB Connectivity", "Water Source", "Fencing"];
  let presentCount = 0;
  checkAmenities.forEach((am) => {
    const hasAmenity =
      amenitiesArray.some((val) =>
        val.toLowerCase().includes(am.toLowerCase()),
      ) ||
      (project.ebConnectivity &&
        project.ebConnectivity.toLowerCase() === "available" &&
        am === "EB Connectivity") ||
      (project.waterSource &&
        project.waterSource.toLowerCase() === "available" &&
        am === "Water Source") ||
      (project.fencingType &&
        project.fencingType.toLowerCase() === "available" &&
        am === "Fencing");
    if (hasAmenity) {
      presentCount++;
    }
  });

  const infrastructurePercent = Math.round(
    (presentCount / checkAmenities.length) * 100,
  );

  return {
    ratePerCent: rateStr || (ratePerCent ? `${ratePerCent}L per cent` : "N/A"),
    totalArea:
      areaStr ||
      (areaValue
        ? `${areaValue} ${areaUnit === "acre" ? "Acres" : "Cents"}`
        : "N/A"),
    totalPrice: formattedTotalPrice,
    percent: infrastructurePercent,
  };
}

// ─── Property Card (wide, short — landscape layout, same as SmallMovingProjects) ──
function PropertyCard({ project }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const details = getCalculatedDetails(project);

  return (
    <div className="shrink-0 w-[240px]  md:w-[320px] lg:w-[420px] hover:-translate-y-1.5 transition-transform duration-300 ease-out">
      <BorderGlow
        edgeSensitivity={25}
        backgroundColor="#0d1a12"
        borderRadius={16}
        coneSpread={30}
        animated={false}
        colors={["#a3e635", "#65a30d", "#4d7c0f"]}
        className="w-full shadow-sm overflow-hidden group"
      >
        <div
          onClick={() => {
            navigate(project.route);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="cursor-pointer flex flex-col h-full bg-transparent text-left"
        >
          {/* Media Window */}
          <div className="relative overflow-hidden aspect-[13/9]  lg:aspect-[23/9] bg-[#0b1710]">
            <img
              src={getImageUrl(project.image)}
              alt={project.title}
              className="w-full h-full object-cover  transition-transform duration-700 ease-out"
              onError={(e) => {
                e.target.src = `https://placehold.co/400x225/0b1710/a3e635?text=${encodeURIComponent(project.title)}`;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent pointer-events-none" />

            {/* Status badge */}
            <span className="absolute top-3 left-3 inline-flex items-center gap-1 text-[10px] font-bold text-white border border-lime-400/30 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full">
              {details.totalArea}
            </span>

            {/* Like button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLiked(!liked);
              }}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:border-lime-400/40 transition-colors"
            >
              <Heart
                size={14}
                fill={liked ? "#a3e635" : "none"}
                stroke={liked ? "#a3e635" : "#e5e7eb"}
                strokeWidth={2}
              />
            </button>
          </div>

          {/* Compact Info */}
          <div className="p-3.5 flex flex-col gap-1.5">
            <h3 className="font-bold text-white text-[15px] leading-snug line-clamp-1 group-hover:text-lime-400 transition-colors">
              {project.title}
            </h3>

            <div className="flex items-center justify-between gap-2 text-[12px]">
              <span className="flex items-center gap-1 text-gray-400 min-w-0">
                <MapPin size={11} className="text-lime-400 shrink-0" />
                <span className="truncate">{project.location}, Yelagiri</span>
              </span>
              <span className="font-bold text-lime-400 shrink-0">
                {details.ratePerCent !== "N/A"
                  ? details.ratePerCent
                  : project.price}
              </span>
            </div>

            {/* Additional Details */}
            <div className="flex flex-col gap-1.5 mt-2 pt-2 border-t border-white/5 text-[11px]">
              <div className="flex justify-between items-center text-slate-450">
                <span className="text-gray-400">Total Area:</span>
                <span className="text-white">{details.totalArea}</span>
              </div>
              <div className="flex justify-between items-center text-slate-450">
                <span className="text-gray-400">Rate per Cent:</span>
                <span className="text-[#a3e635] font-semibold">
                  {details.ratePerCent}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-450">
                <span className="text-gray-400">Total Value:</span>
                <span className="text-[#a3e635] font-extrabold">
                  {details.totalPrice}
                </span>
              </div>
            </div>
          </div>
        </div>
      </BorderGlow>
    </div>
  );
}

// ─── Arrow Button ─────────────────────────────────────────────────────────────
function ArrowButton({ direction, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200
        ${
          disabled
            ? "border-white/5 text-gray-700 cursor-not-allowed bg-[#0d1a12]"
            : "border-lime-400/25 text-gray-300 hover:border-lime-400 hover:text-lime-400 bg-[#0d1a12] shadow-sm"
        }`}
    >
      {direction === "left" ? (
        <ChevronLeft size={16} strokeWidth={2.5} />
      ) : (
        <ChevronRight size={16} strokeWidth={2.5} />
      )}
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FastMovingProjects() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjectsList = async () => {
      try {
        const res = await fetch(`${API_URL}/api/projects`);
        if (res.ok) {
          const data = await res.json();
          const filtered = data
            .filter((p) => p.type === "fast_moving")
            .map((p) => ({
              id: p.id,
              image: p.mainImage,
              title: p.title,
              location: p.location,
              price: p.priceToken || "Price on request",
              status: p.status,
              config: p.launchTimeline,
              area: p.area || p.totalApts,
              builder: p.author || "Admin",
              route: p.routeSubpath,
              ownerName: p.ownerName,
              waterSource: p.waterSource,
              fencingType: p.fencingType,
              landSketch: p.landSketch,
              fmv: p.fmv,
              nearestRoad: p.nearestRoad,
              distanceToMainRoad: p.distanceToMainRoad,
              connectionRoadWidth: p.connectionRoadWidth,
              roadType: p.roadType,
              ebConnectivity: p.ebConnectivity,
              legalVerification: p.legalVerification,
              amenities: p.amenities,
            }));
          setProjects(filtered);
        } else {
          setProjects([]);
        }
      } catch (error) {
        console.error("Error fetching fast moving projects:", error);
        setProjects([]);
      }
    };
    fetchProjectsList();
  }, []);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [projects]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth =
      el.querySelector('[class*="flex-shrink-0"]')?.offsetWidth || 300;
    el.scrollBy({
      left: dir === "left" ? -(cardWidth + 16) : cardWidth + 16,
      behavior: "smooth",
    });
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.25 } },
      }}
      className="w-full pt-7 bg-slate-950"
    >
      <div className="px-4 sm:px-6 md:px-10 lg:px-9 flex flex-col gap-4">
        {/* Header Row */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-between"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-xl bg-lime-400/10 border border-lime-400/20">
              <Mountain className="w-5 h-5 md:w-6 md:h-6 text-lime-400 shrink-0" />
            </div>
            <h2 className="uppercase leading-none">
              <span className="block text-[18px] sm:text-[20px] md:text-[22px] font-extrabold tracking-wider text-lime-400">
                PREMIUM LANDS
              </span>

              <span className="block mt-1 text-[18px]  md:text-[17px] font-black tracking-tight text-white">
                25 CENTS to 1 ACRES
              </span>
            </h2>
            {/* <span className="hidden sm:block w-14 md:w-16 h-px bg-white/20" /> */}
          </div>

          {/* <div className="flex items-center gap-3">
            <a
              href="#"
              className="hidden sm:flex items-center gap-1 text-lime-400 text-sm font-medium hover:text-lime-300 hover:underline"
            >
              View all
              <ChevronRight size={16} strokeWidth={2.5} />
            </a>

            <div className="flex gap-2">
              <ArrowButton
                direction="left"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
              />
              <ArrowButton
                direction="right"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
              />
            </div>
          </div> */}
        </motion.div>

        {/* Carousel Track — free horizontal scroll, arrows nudge it */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full"
        >
          {/* Fade Overlays — same pattern as UpcomingEvents */}
          <div
            className={`absolute -left-4 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10 transition-opacity duration-300 ${
              canScrollLeft ? "opacity-100" : "opacity-0"
            }`}
          />
          <div
            className={`absolute -right-4 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-950 via-slate-950/70 to-transparent pointer-events-none z-20 transition-opacity duration-300 ${
              canScrollRight ? "opacity-100" : "opacity-0"
            }`}
          />

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pt-4 pb-4 px-2 -mx-2 hide-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
            {projects.length > 0 ? (
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scroll-smooth pt-4 pb-4 px-2 -mx-2 hide-scrollbar"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <style>{`
      .hide-scrollbar::-webkit-scrollbar{
        display:none;
      }
    `}</style>

                {projects.map((project) => (
                  <PropertyCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="w-full min-h-[320px] rounded-3xl border border-dashed border-lime-400/20 bg-[#0d1a12] flex flex-col items-center justify-center text-center px-6">
                <Mountain className="w-14 h-14 text-lime-400/40 mb-5" />

                <h3 className="text-2xl font-bold text-white">
                  No Premium Plot Projects
                </h3>

                <p className="mt-3 max-w-md text-gray-400 leading-relaxed">
                  There are currently no projects available in this category.
                  Please check back later for upcoming launches.
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* View All — mobile only */}
        {/* <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex sm:hidden justify-center mt-2"
        >
          <a
            href="#"
            className="flex items-center gap-1 text-lime-400 text-sm font-medium border border-lime-400/25 rounded-full px-5 py-2 hover:bg-lime-400/5 transition-colors"
          >
            View all project
            <ChevronRight size={15} strokeWidth={2.5} />
          </a>
        </motion.div> */}
      </div>
    </motion.section>
  );
}
