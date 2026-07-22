import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Container from "../components/Container";
import HomeFrom from "../forms/HomeFrom";
import {
  Leaf,
  ShieldCheck,
  Milestone,
  Droplet,
  Phone,
  Globe,
  Home,
  Users,
  MapPin,
} from "lucide-react";
import Typewriter from "typewriter-effect";

export default function Hero() {
  const [isPreloaderFinished, setIsPreloaderFinished] = useState(
    // If the preloader was already shown this session, trigger immediately
    sessionStorage.getItem("preloaderShown") === "true",
  );

  useEffect(() => {
    const handleFinished = () => {
      setIsPreloaderFinished(true);
      sessionStorage.setItem("preloaderShown", "true");
    };

    window.addEventListener("preloader-finished", handleFinished);

    // Fallback: in case of any event race conditions, show after 2s max
    const fallback = setTimeout(() => {
      setIsPreloaderFinished(true);
    }, 2000);

    return () => {
      window.removeEventListener("preloader-finished", handleFinished);
      clearTimeout(fallback);
    };
  }, []);

  const topFeatures = [
    { label: "Lush Green\nEnvironment", icon: Leaf },
    { label: "Verified\nProperties", icon: ShieldCheck },
    { label: "Road \nConnectivity", icon: Milestone },
    { label: "Pure Air\n& Water", icon: Droplet },
  ];

  const bottomFeatures = [
    {
      label: "Eco-Friendly Living",
      desc: "Sustainable today, better tomorrow",
      icon: Leaf,
    },
    {
      label: "Perfect for Your Family",
      desc: "Safe, friendly & ideal for family living",
      icon: Users,
    },
    {
      label: "Ideal for Resorts & Retreats",
      desc: "Best place to stay with nature and provide a place others to experiences",
      icon: Home,
    },

    {
      label: "Investment",
      desc: "A great choice for investment and as an inheritance for the next generation.",
      icon: MapPin,
    },
  ];

  return (
    <section
      // Added '-mt-[104px]' to pull the hero section up under the navbar
      // Changed padding-top to 'pt-[130px]' to push the content down below the floating navbar
      className="
    relative
    w-full
    bg-[url('/hillside/hillsite-logo1.png')]
    bg-cover
    bg-center
    flex
    items-center
    pt-40
    lg:pt-32
    pb-10
    md:pb-14
    lg:pb-20
  "
    >
      {/* Subtle overlay to guarantee clean text contrast across varying viewport sizes */}
      <div className="absolute inset-0 bg-black/15 pointer-events-none" />

      {/* Bottom fade — blends the hero image seamlessly into the page's bg-slate-950
          so the image's bottom edge never shows a hard cut */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-linear-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />

      <Container className="relative z-10 w-full">
        {/* Left Content Column with reveal animation */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={
            isPreloaderFinished ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }
          }
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 max-w-3xl  sm:mx-0 text-center sm:text-left text-white flex flex-col items-center sm:items-start"
        >
          {/* Mobile Eyebrow Badge — only on mobile */}
          {/* <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={
              isPreloaderFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }
            }
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex sm:hidden items-center gap-2 bg-black/30 backdrop-blur-sm border border-lime-400/30 rounded-full px-4 py-1.5"
          >
            <Leaf
              className="w-3.5 h-3.5 text-lime-400 shrink-0"
              strokeWidth={2.5}
            />
            <span className="text-[10px] font-bold tracking-[0.15em] text-lime-400 uppercase whitespace-nowrap">
              Welcome to Hillsite
            </span>
          </motion.div> */}

          {/* Logo Mark — only on desktop/tablet */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={
              isPreloaderFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }
            }
            transition={{ delay: 0.1, duration: 0.6 }}
            className="hidden sm:flex items-center gap-3"
          >
            <div className="w-11 h-11 rounded-xl bg-lime-400/10 border border-lime-400/30 flex items-center justify-center shrink-0">
              <Home className="w-6 h-6 text-lime-400" strokeWidth={2.2} />
            </div>
            <div>
              <div className="text-2xl font-['Lugrasimo'] font-black tracking-tight leading-none">
                Hillsite
              </div>
              <div className="text-[10px] font-['Lugrasimo'] font-bold tracking-[0.2em] text-lime-400 mt-1">
                LIVE CLOSE TO NATURE
              </div>
            </div>
          </motion.div>

          {/* Core Brand & Typography Stack */}
          {/* Core Brand & Typography Stack */}
          <div className="space-y-6 max-w-3xl text-left text-white flex flex-col items-start">
            {/* <motion.h1
    initial={{ opacity: 0, y: 15 }}
    animate={
      isPreloaderFinished
        ? { opacity: 1, y: 0 }
        : { opacity: 0, y: 15 }
    }
    transition={{ delay: 0.25, duration: 0.6 }}
    className="text-3xl sm:text-5xl  lg:text-6xl font-['Lugrasimo'] leading-[1.15] tracking-widest sm:leading-[1.05] font-bold drop-shadow-md"
  >
    Live Green
    <br />
    Live Serene
    <br />
    <span className="font-display  text-lime-400 drop-shadow-[0_2px_12px_rgba(163,230,53,0.45)] underline decoration-lime-400/60 underline-offset-4 sm:underline-offset-8">
      Live Hillsite
    </span>
  </motion.h1> */}

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={
                isPreloaderFinished
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 15 }
              }
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl font-['Lugrasimo'] md:text-3xl font-bold text-gray-100 max-w-[380px] sm:max-w-xl leading-relaxed px-2 sm:px-0"
            >
              A Land Close to Nature in a Peaceful, Green, and Eco-Friendly
              Environment.
            </motion.p>

            {/* NEW: Dynamic typewriter paragraph in lime color */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={
                isPreloaderFinished
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 15 }
              }
              transition={{ delay: 0.55, duration: 0.6 }}
              className="text-xl md:text-2xl font-['Lugrasimo'] font-bold text-lime-400 max-w-95 sm:max-w-xl leading-relaxed px-2 sm:px-0"
            >
              <Typewriter
                options={{
                  strings: ["Live Green", "Live Serene", "Live Hillsite"],
                  autoStart: true,
                  loop: true,
                  delay: 60,
                  deleteSpeed: 40,
                }}
              />
            </motion.div>
          </div>

          {/* Feature Icon Row */}
          {/* Feature Icon Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              isPreloaderFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ delay: 0.55, duration: 0.6 }}
            className="flex flex-nowrap items-start justify-between sm:justify-start gap-2 sm:gap-8 pt-2 pb-2 md:pb-20 w-full sm:w-auto"
          >
            {topFeatures.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center w-16 sm:w-20 shrink"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-lime-400/50 flex items-center justify-center mb-1.5 sm:mb-2 shrink-0">
                  <Icon
                    className="w-4 h-4 sm:w-5 sm:h-5 text-lime-400"
                    strokeWidth={2}
                  />
                </div>
                <span className="text-[8.5px] sm:text-[11px] font-medium text-gray-200 leading-[1.15] sm:leading-tight whitespace-pre-line">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA Row — Mobile version: full-width dark bar */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              isPreloaderFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex sm:hidden w-full items-center justify-between gap-3 pt-2 bg-black/35 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3"
          >
            <a href="tel:+910000000000" className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-lime-400 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-slate-950" strokeWidth={2.5} />
              </span>
              <span className="text-left">
                <span className="block text-sm font-bold text-white leading-tight">
                  Book Your Plot Today!
                </span>
                <span className="block text-[11px] text-gray-300 leading-tight">
                  Call us or visit our website
                </span>
              </span>
            </a>
          </motion.div> */}

          {/* CTA Row — Desktop/tablet version: original pill button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              isPreloaderFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ delay: 0.7, duration: 0.6 }}
            className="hidden sm:flex flex-wrap items-center gap-4 pt-2"
          ></motion.div>

          {/* Bottom Info Cards — Mobile version: white card 2x2 grid, inline in flow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              isPreloaderFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ delay: 0.85, duration: 0.6 }}
            className="flex sm:hidden w-full bg-white rounded-2xl p-4 mt-2"
          >
            <div className="grid grid-cols-2 gap-x-4 gap-y-5 w-full">
              {bottomFeatures.map(({ label, desc, icon: Icon }) => (
                <div key={label} className="flex items-start gap-2.5 text-left">
                  <span className="w-9 h-9 rounded-lg bg-lime-50 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-lime-600" strokeWidth={2} />
                  </span>
                  <span>
                    <span className="block text-xs font-bold text-slate-900 leading-snug">
                      {label}
                    </span>
                    <span className="block text-[10px] text-slate-500 leading-snug mt-0.5">
                      {desc}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Bottom Info Bar — Desktop/tablet version: original thin bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={
          isPreloaderFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
        }
        transition={{ delay: 0.85, duration: 0.6 }}
        className="hidden sm:block absolute bottom-0   left-0 right-0 z-10 border-t border-white/10 bg-black/40 backdrop-blur-md"
      >
        <Container className="py-4">
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-x-8 gap-y-3">
            {bottomFeatures.map(({ label, icon: Icon }, idx) => (
              <div
                key={label}
                className={`flex items-center gap-2 text-white ${
                  idx !== 0 ? "sm:border-l sm:border-white/15 sm:pl-8" : ""
                }`}
              >
                <Icon className="w-4 h-4 text-lime-400 shrink-0" />
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
