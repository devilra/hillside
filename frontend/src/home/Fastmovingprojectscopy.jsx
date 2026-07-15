import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BorderGlow from "../components/BorderGlow";
import API_URL from "../app";

// ─── Seeded Fallback Feature Data ────────────────────────────────────────────
const DEFAULT_PROJECTS = [
  {
    id: 1,
    image: "/hillside/Scenic-View.webp",
    route: "/hubtown-seasons-ecuador",
    status: "Verified",
    title: "Handpicked Scenic Plots",
    location: "Yelagiri Hills",
    price: "₹ 25 L Onwards",
    config: "Jan 2026",
    area: "50 Plots",
    builder: "Hillsite Developers",
  },
  {
    id: 2,
    image: "/hillside/Ownership-Documents.webp",
    route: "/hubtown-seasons-ecuador",
    status: "Verified",
    title: "Verified Ownership Documents",
    location: "Yelagiri Hills",
    price: "Price on request",
    config: "Feb 2026",
    area: "10 Plots",
    builder: "Hillsite Developers",
  },
  {
    id: 3,
    image: "/hillside/Direct-Accees-to-Owners.webp",
    route: "/hubtown-seasons-ecuador",
    status: "Direct Access",
    title: "Direct Access to Verified Landowners",
    location: "Yelagiri Hills",
    price: "Price on request",
    config: "Mar 2026",
    area: "15 Plots",
    builder: "Hillsite Developers",
  },
];

// ─── Property Card ────────────────────────────────────────────────────────────
function PropertyCard({ project }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] hover:-translate-y-1.5 transition-transform duration-300 ease-out">
      <BorderGlow
        edgeSensitivity={25}
        backgroundColor="#ffffff"
        borderRadius={16}
        coneSpread={30}
        animated={false}
        colors={["#10b981", "#34d399", "#059669"]}
        className="w-full shadow-sm overflow-hidden"
      >
        <div
          onClick={() => {
            navigate(project.route);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="cursor-pointer group flex flex-col h-full bg-transparent text-left"
        >
          {/* Top Status Bar Container (Now positioned safely above the image layout) */}
          <div className="px-4 pt-4 pb-2">
            <span className="inline-block text-[10px] tracking-wider uppercase font-bold text-gray-500 border border-gray-200 bg-gray-50/80 px-2.5 py-1 rounded-md">
              📌 {project.status || "New Launch"}
            </span>
          </div>

          {/* Media Window Container */}
          <div className="relative mx-3 overflow-hidden rounded-xl bg-gray-200 aspect-[16/10]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              onError={(e) => {
                e.target.src = `https://placehold.co/320x200/e2e8f0/94a3b8?text=${encodeURIComponent(project.title)}`;
              }}
            />

            {/* Overlay Actions */}
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLiked(!liked);
                }}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill={liked ? "#ef4444" : "none"}
                  stroke={liked ? "#ef4444" : "#374151"}
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Info Layout */}
          <div className="p-4 flex flex-col flex-grow space-y-2">
            <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-1 group-hover:text-emerald-600 transition-colors">
              {project.title}
            </h3>

            <div className="flex items-center text-xs text-gray-400">
              <span className="text-red-500 mr-1">📍</span> {project.location}
            </div>

            <div className="text-sm font-bold text-emerald-600">
              {project.price}
            </div>

            <div className="flex items-center gap-4 pt-1 text-xs text-gray-400">
              <span>{project.config}</span>
              <span>{project.area}</span>
            </div>

            <div className="pt-2 text-[11px] text-gray-400 border-t border-gray-50">
              <span>
                By{" "}
                <span className="text-gray-500 font-medium">
                  {project.builder}
                </span>
              </span>
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
            ? "border-gray-100 text-gray-200 cursor-not-allowed bg-white"
            : "border-gray-200 text-gray-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 bg-white shadow-sm"
        }`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        {direction === "left" ? (
          <path d="m15 18-6-6 6-6" />
        ) : (
          <path d="m9 18 6-6-6-6" />
        )}
      </svg>
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
              area: p.totalApts,
              builder: p.author || "Admin",
              route: p.routeSubpath,
            }));
          setProjects(filtered.length > 0 ? filtered : DEFAULT_PROJECTS);
        } else {
          setProjects(DEFAULT_PROJECTS);
        }
      } catch (error) {
        console.error("Error fetching fast moving projects:", error);
        setProjects(DEFAULT_PROJECTS);
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
      className="w-full bg-[#f2faf5] py-10 md:py-14"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 flex flex-col gap-4">
        {/* Header Row */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-between"
        >
          <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-bold text-gray-900 leading-tight">
            Premium 1-Acre Estates
          </h2>

          {/* <div className="flex items-center gap-3">
            <a
              href="#"
              className="hidden sm:flex items-center gap-1 text-emerald-700 text-sm font-medium hover:underline"
            >
              View all
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
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

        {/* Carousel Track */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pt-4 pb-4 px-2 -mx-2 hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
          {projects.map((project) => (
            <PropertyCard key={project.id} project={project} />
          ))}
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
            className="flex items-center gap-1 text-emerald-700 text-sm font-medium border border-gray-200 rounded-full px-5 py-2 hover:bg-gray-50 transition-colors"
          >
            View all project
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </a>
        </motion.div> */}
      </div>
    </motion.section>
  );
}
