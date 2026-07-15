import { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  CheckCircle2,
  Heart,
  Share2,
} from "lucide-react";
import PurvaPanoramaContent from "./PurvaPanoramaContent";

// ── Sample image data ──────────────────────────────────────────────────────────
const CAROUSEL_IMAGES = [
  {
    id: 1,
    src: "./images/centrepark/centre-park-images-for-elevation-of-lodha-centre-park.jpeg",
    alt: "Clubhouse games room",
  },
  {
    id: 2,
    src: "./images/centrepark/centre-park-images-for-elevation-of-lodha.jpeg",
    alt: "Lobby lounge",
  },
  {
    id: 3,
    src: "./images/centrepark/centre-park-images-for-elevation-of-lodha-centre.jpeg",
    alt: "Living room",
  },
  {
    id: 4,
    src: "./images/centrepark/centre-park-swimming-pool.jpeg",
    alt: "Bedroom",
  },
  {
    id: 5,
    src: "./images/centrepark/centre-park-indoor-games.jpeg",
    alt: "Kitchen",
  },
   {
    id: 6,
    src: "./images/centrepark/centre-park-images-for-location-plan-of-lodha-centre-park-.jpeg",
    alt: "Kitchen",
  },
  {
    id: 7,
    src: "./images/centrepark/centre-park-amphitheater.jpeg",
    alt: "Kitchen",
  },
  {
    id: 8,
    src: "./images/centrepark/centre-park-images-for-cluster-plan-of-lodha-centre-park.jpeg",
    alt: "Kitchen",
  },
  {
    id: 9,
    src: "./images/centrepark/centre-park-images-for-cluster-plan-of-lodha-centre-park-1.jpeg",
    alt: "Kitchen",
  },
   {
    id: 10,
    src: "./images/centrepark/centre-park-images-for-cluster-plan-of-lodha-centre-park-2.jpeg",
    alt: "Kitchen",
  },
  {
    id: 11,
    src: "./images/centrepark/centre-park-gymnasium.jpeg",
    alt: "Kitchen",
  },
];

const AERIAL_IMAGE = {
  src: "./images/centrepark/centre-park-images-for-elevation-of-lodha-centre-park.jpeg",
  alt: "Aerial view of Lodha Centre Park",
};

const SIDE_BOTTOM_IMAGES = [
  {
    id: 1,
    src: "./images/centrepark/centre-park-images-for-elevation-of-lodha-centre.jpeg",
    alt: "Clubhouse games room",
  },
  {
    id: 2,
    src: "./images/centrepark/centre-park-images-for-elevation-of-lodha-centre-park.jpeg",
    alt: "Lobby lounge",
  },
  {
    id: 3,
    src: "./images/centrepark/centre-park-images-for-elevation-of-lodha.jpeg",
    alt: "Living room",
  },
  {
    id: 4,
    src: "./images/centrepark/centre-park-swimming-pool.jpeg",
    alt: "Bedroom",
  },
  {
    id: 5,
    src: "./images/centrepark/centre-park-indoor-games.jpeg",
    alt: "Kitchen",
  },
   {
    id: 6,
    src: "./images/centrepark/centre-park-images-for-location-plan-of-lodha-centre-park-.jpeg",
    alt: "Kitchen",
  },
  {
    id: 7,
    src: "./images/centrepark/centre-park-amphitheater.jpeg",
    alt: "Kitchen",
  },
  {
    id: 8,
    src: "./images/centrepark/centre-park-images-for-cluster-plan-of-lodha-centre-park.jpeg",
    alt: "Kitchen",
  },
  {
    id: 9,
    src: "./images/centrepark/centre-park-images-for-cluster-plan-of-lodha-centre-park-1.jpeg",
    alt: "Kitchen",
  },
   {
    id: 10,
    src: "./images/centrepark/centre-park-images-for-cluster-plan-of-lodha-centre-park-2.jpeg",
    alt: "Kitchen",
  },
  {
    id: 11,
    src: "./images/centrepark/centre-park-gymnasium.jpeg",
    alt: "Kitchen",
  },
];

// ── Lightbox ───────────────────────────────────────────────────────────────────
function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(
    (e) => {
      e?.stopPropagation();
      setCurrent((c) => (c - 1 + images.length) % images.length);
    },
    [images.length]
  );

  const next = useCallback(
    (e) => {
      e?.stopPropagation();
      setCurrent((c) => (c + 1) % images.length);
    },
    [images.length]
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
      {/* Counter */}
      <span className="absolute top-5 left-5 text-white/70 text-sm font-medium tracking-wide">
        {current + 1} / {images.length}
      </span>

      {/* Close */}
      <button
        className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
        onClick={onClose}
      >
        <X size={28} />
      </button>

      {/* Prev */}
      <button
        className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
        onClick={prev}
      >
        <ChevronLeft size={28} />
      </button>

      {/* Image */}
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

      {/* Next */}
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
export default function PurvaPanorama() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [lightbox, setLightbox] = useState(null); // { images, startIndex }

  // Auto-advance carousel every 3 s
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((i) => (i + 1) % CAROUSEL_IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const openLightbox = (images, startIndex = 0) =>
    setLightbox({ images, startIndex });
  const closeLightbox = () => setLightbox(null);

  const allImages = [
    ...CAROUSEL_IMAGES,
    AERIAL_IMAGE,
    ...SIDE_BOTTOM_IMAGES,
  ];

  return (
    <>
    <div className="bg-white pb-10 font-sans">
      {/* ── Gallery Section ─────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <div className="flex flex-col lg:flex-row gap-2 h-auto lg:h-[360px]">
          {/* ── Left: Carousel ──────────────────────────────────── */}
          <div className="relative w-full lg:flex-[1.55] h-[250px] sm:h-[320px] lg:h-auto rounded-lg overflow-hidden cursor-pointer group">
            {/* Slides */}
            {CAROUSEL_IMAGES.map((img, idx) => (
              <img
                key={img.id}
                src={img.src}
                alt={img.alt}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  idx === carouselIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {/* Click overlay */}
            <div
              className="absolute inset-0"
              onClick={() => openLightbox(CAROUSEL_IMAGES, carouselIndex)}
            />

            {/* Prev / Next */}
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 z-10 transition-all opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                setCarouselIndex(
                  (i) => (i - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length
                );
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 z-10 transition-all opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                setCarouselIndex((i) => (i + 1) % CAROUSEL_IMAGES.length);
              }}
            >
              <ChevronRight size={20} />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {CAROUSEL_IMAGES.map((_, idx) => (
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

            {/* Image count badge */}
            <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded z-10 pointer-events-none">
              {CAROUSEL_IMAGES.length} Images
            </div>
          </div>

          {/* ── Right: Two stacked panels ───────────────────────── */}
          <div className="flex flex-row lg:flex-col gap-2 flex-1">
            {/* Top — Aerial static */}
            <div
              className="relative flex-1 h-[140px] sm:h-[180px] lg:h-auto rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => openLightbox([AERIAL_IMAGE], 0)}
            >
              <img
                src={AERIAL_IMAGE.src}
                alt={AERIAL_IMAGE.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>

            {/* Bottom — "+N More" collage */}
            <div
              className="relative flex-1 h-[140px] sm:h-[180px] lg:h-auto rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(SIDE_BOTTOM_IMAGES, 0)}
            >
              <img
                src={SIDE_BOTTOM_IMAGES[0].src}
                alt={SIDE_BOTTOM_IMAGES[0].alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Dark overlay + count */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white text-2xl font-semibold tracking-wide">
                  +{SIDE_BOTTOM_IMAGES.length - 1} More
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Property Details ─────────────────────────────────── */}
        <div className="mt-5 flex flex-col lg:flex-row items-start justify-between gap-6">
          {/* Left info */}
          <div className="flex-1">
            {/* Badges */}
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded">
                Exclusive
              </span>
              <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                <CheckCircle2 size={14} className="text-green-500" />
                Possession : Feb'28
              </span>
              <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                <CheckCircle2 size={14} className="text-green-500" />
                Rera
              </span>
            </div>

            {/* Title */}
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">
                Today - Citadel Juinagar
              </h1>
              <button className="text-gray-400 hover:text-red-500 transition-colors">
                <Heart size={20} />
              </button>
              <button className="text-gray-400 hover:text-blue-500 transition-colors">
                <Share2 size={20} />
              </button>
            </div>

            {/* Builder */}
            <p className="text-sm text-gray-500 mt-0.5">
              by{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline font-medium"
              >
                Puravankara Limited
              </a>
            </p>

            {/* Location */}
            <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
              <MapPin size={14} className="text-gray-400" />
              <span>Thane West, Mumbai</span>
              <a href="#" className="text-blue-500 hover:underline ml-1 text-xs">
                (show on map)
              </a>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5 border-t pt-4">
              <div>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <span className="text-gray-300">⊞</span> Configuration
                </p>
                <p className="text-sm font-semibold text-gray-800 mt-1">
                  2, 3 BHK
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <span className="text-gray-300">▣</span> Carpet Area{" "}
                  <span className="text-blue-400 cursor-pointer">ⓘ</span>
                </p>
                <p className="text-sm font-semibold text-gray-800 mt-1">
                  716 – 1060 sq ft
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <span className="text-gray-300">▤</span> Possession Status
                </p>
                <p className="text-sm font-semibold text-gray-800 mt-1">
                  Under Construction
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <span className="text-gray-300">▤</span> Avg. Price
                </p>
                <p className="text-sm font-semibold text-gray-800 mt-1">
                  ₹ 25,139 sq.ft
                </p>
              </div>
            </div>
          </div>

          {/* Right price block */}
          <div className="w-full lg:w-auto text-left lg:text-right shrink-0">
            <p className="text-xl font-bold text-orange-500">
              ₹ 1.80 Cr - ₹ 2.66 Cr
            </p>
            <div className="flex items-center justify-end gap-2 mt-1">
              <span className="text-xs text-gray-500">Builder Price</span>
              <a href="#" className="text-xs text-blue-600 hover:underline">
                See inclusions
              </a>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Home Loan EMI starts at ₹ 2.07 L
            </p>
          </div>
        </div>
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────── */}
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIndex={lightbox.startIndex}
          onClose={closeLightbox}
        />
      )}
      
    </div>

    <PurvaPanoramaContent/>

    </>
  );
}