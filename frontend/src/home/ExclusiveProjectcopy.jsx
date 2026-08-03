import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Building2,
  CalendarDays,
  LayoutGrid,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

// ─── Single Project Card (design UNTOUCHED) ─────────────────────────────────
function ProjectCard({ project }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="group relative rounded-3xl border border-lime-400/15 bg-[#0d1a12] shadow-[0_0_0_1px_rgba(163,230,53,0.04),0_20px_50px_-20px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col md:flex-row text-left transition-all duration-500 hover:border-lime-400/40 hover:shadow-[0_0_0_1px_rgba(163,230,53,0.15),0_25px_60px_-15px_rgba(163,230,53,0.15)]">
      {/* ── Image Panel ── */}
      <div className="relative md:w-[52%] flex-shrink-0 min-h-[260px] md:min-h-[380px] overflow-hidden bg-[#0b1710]">
        <img
          src={
            getImageUrl(project.images[0]) ||
            "https://placehold.co/800x480/0b1710/a3e635?text=Property"
          }
          alt={`${project.name} view`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ minHeight: "260px" }}
          onError={(e) => {
            e.target.src = `https://placehold.co/800x480/0b1710/a3e635?text=${encodeURIComponent(project.name)}`;
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1710]/40 md:from-[#0b1710]/10 to-transparent pointer-events-none" />

        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-lime-400/30">
          <Sparkles size={13} className="text-lime-400" />
          <span className="text-[11px] font-semibold text-lime-300 uppercase tracking-wide">
            Exclusive
          </span>
        </div>

        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={() => setLiked(!liked)}
            className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-gray-200 hover:text-lime-400 hover:border-lime-400/40 transition-colors"
          >
            <Heart
              size={17}
              fill={liked ? "#a3e635" : "none"}
              stroke={liked ? "#a3e635" : "currentColor"}
              strokeWidth={1.8}
            />
          </button>
          <button className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-gray-200 hover:text-lime-400 hover:border-lime-400/40 transition-colors">
            <Share2 size={16} strokeWidth={1.8} />
          </button>
        </div>

        <div className="hidden md:block absolute bottom-4 left-4 px-4 py-2.5 rounded-2xl bg-black/40 backdrop-blur-md border border-lime-400/25">
          <p className="text-[10px] text-gray-300 uppercase tracking-wide mb-0.5">
            Starting price
          </p>
          <p className="text-lime-400 font-bold text-[18px] leading-none">
            {project.price}
          </p>
        </div>
      </div>

      {/* ── Right: Info Panel ── */}
      <div className="relative flex flex-col justify-between p-6 md:p-8 flex-1 bg-[#0b1710]">
        <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-lime-400/5 blur-2xl" />

        <div className="relative">
          <h3 className="text-[20px] md:text-[23px] font-bold text-white leading-snug mb-1.5">
            {project.name}
          </h3>
          <p className="flex items-center gap-1.5 text-gray-400 text-[14px] mb-5">
            <MapPin size={14} className="text-lime-400 shrink-0" />
            {project.location}
          </p>

          <p className="md:hidden text-lime-400 font-bold text-[20px] mb-5 tracking-tight">
            {project.price}
          </p>

          <div className="flex flex-wrap gap-2.5 mb-6">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-lime-400/[0.06] border border-lime-400/15">
              <CalendarDays size={15} className="text-lime-400 shrink-0" />
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-wide leading-none mb-0.5">
                  Timeline
                </p>
                <p className="text-white text-[13px] font-semibold leading-none">
                  {project.configuration}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-lime-400/[0.06] border border-lime-400/15">
              <LayoutGrid size={15} className="text-lime-400 shrink-0" />
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-wide leading-none mb-0.5">
                  Area
                </p>
                <p className="text-white text-[13px] font-semibold leading-none">
                  {project.builtupArea}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex items-center gap-3">
          <button className="text-gray-300 font-semibold text-[14px] hover:text-lime-400 transition-colors px-1">
            Contact Us
          </button>
          <button
            onClick={() => {
              navigate(project.route);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group/btn flex items-center gap-1.5 bg-lime-400 hover:bg-lime-300 text-[#0b1710] font-semibold text-[14px] pl-6 pr-5 py-3 rounded-full cursor-pointer transition-all duration-200 shadow-[0_0_20px_-4px_rgba(163,230,53,0.6)] ml-auto"
          >
            Explore now
            <ArrowUpRight
              size={16}
              strokeWidth={2.5}
              className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Slide animation variants ────────────────────────────────────────────────
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ExclusiveProjects() {
  const [projects, setProjects] = useState([]);
  const [[index, direction], setIndexState] = useState([0, 0]);
  const [isHovering, setIsHovering] = useState(false);
  const autoplayRef = useRef(null);

  useEffect(() => {
    const fetchProjectsList = async () => {
      try {
        const res = await fetch(`${API_URL}/api/projects`);
        if (res.ok) {
          const data = await res.json();
          const filtered = data
            .filter((p) => p.type === "exclusive")
            .map((p) => ({
              id: p.id,
              name: p.title,
              route: p.routeSubpath,
              location: p.location,
              price: p.priceToken || "Price on request",
              configuration: p.launchTimeline || "Immediate",
              builtupArea: p.totalApts || "Area on request",
              images: [p.mainImage],
            }));
          setProjects(filtered);
        } else {
          setProjects([]);
        }
      } catch (error) {
        console.error("Error fetching exclusive projects:", error);
        setProjects([]);
      }
    };
    fetchProjectsList();
  }, []);

  const paginate = useCallback(
    (newDirection) => {
      setIndexState(([prevIndex]) => {
        const len = projects.length;
        if (len === 0) return [0, 0];
        const nextIndex = (prevIndex + newDirection + len) % len;
        return [nextIndex, newDirection];
      });
    },
    [projects.length],
  );

  const goTo = (targetIndex) => {
    setIndexState(([prevIndex]) => {
      if (targetIndex === prevIndex) return [prevIndex, 0];
      const dir = targetIndex > prevIndex ? 1 : -1;
      return [targetIndex, dir];
    });
  };

  // ── Autoplay every 6s, paused on hover ──
  useEffect(() => {
    if (projects.length <= 1) return;
    if (isHovering) return;

    autoplayRef.current = setInterval(() => {
      paginate(1);
    }, 6000);

    return () => clearInterval(autoplayRef.current);
  }, [isHovering, paginate, projects.length]);

  const currentProject = projects[index];

  // ── Swipe handling ──
  const handleDragEnd = (event, info) => {
    const threshold = 80;
    if (info.offset.x < -threshold) {
      paginate(1);
    } else if (info.offset.x > threshold) {
      paginate(-1);
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.25,
          },
        },
      }}
      className="w-full pt-5 relative overflow-hidden"
    >
      <div className="px-4 sm:px-6 md:px-10 lg:px-9 flex flex-col gap-6 relative">
        {/* Header */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-lime-400/10 border border-lime-400/20">
              <Building2 className="w-5 h-5 md:w-6 md:h-6 text-lime-400 shrink-0" />
            </div>

            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-bold text-lime-400 uppercase tracking-tight">
              Exclusive Projects
            </h2>

            <span className="hidden sm:block w-14 md:w-16 h-px bg-white/20" />
          </div>
        </motion.div>

        {/* Carousel Frame / Empty State */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {projects.length > 0 ? (
            <>
              {/* Slide area */}
              <div className="relative overflow-hidden w-full">
                <AnimatePresence
                  mode="popLayout"
                  custom={direction}
                  initial={false}
                >
                  <motion.div
                    key={currentProject.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0.35, 1] }}
                    drag={projects.length > 1 ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                    className="w-full select-none"
                  >
                    <ProjectCard project={currentProject} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Prev / Next arrows */}
              {projects.length > 1 && (
                <>
                  <button
                    onClick={() => paginate(-1)}
                    aria-label="Previous project"
                    className="absolute top-1/2 -translate-y-1/2 left-2 sm:-left-4 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-lime-400/25 flex items-center justify-center text-gray-300 hover:border-lime-400 hover:text-lime-400 transition-colors bg-[#0d1a12]/90 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                  >
                    <ChevronLeft size={18} strokeWidth={2.5} />
                  </button>
                  <button
                    onClick={() => paginate(1)}
                    aria-label="Next project"
                    className="absolute top-1/2 -translate-y-1/2 right-2 sm:-right-4 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-lime-400/25 flex items-center justify-center text-gray-300 hover:border-lime-400 hover:text-lime-400 transition-colors bg-[#0d1a12]/90 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                  >
                    <ChevronRight size={18} strokeWidth={2.5} />
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="w-full min-h-[340px] rounded-3xl border border-dashed border-lime-400/20 bg-[#0d1a12] flex flex-col items-center justify-center text-center px-6">
              <Building2 className="w-16 h-16 text-lime-400/40 mb-5" />

              <h3 className="text-3xl font-bold text-white">
                No Exclusive Projects
              </h3>

              <p className="mt-3 max-w-lg text-gray-400 leading-relaxed">
                There are currently no exclusive projects available in this
                category. Please check back later for upcoming premium launches.
              </p>
            </div>
          )}
        </motion.div>

        {/* Pagination dots */}
        {projects.length > 1 && (
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center justify-center gap-2"
          >
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to project ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === i
                    ? "w-6 bg-lime-400"
                    : "w-2 bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
