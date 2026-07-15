import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Smooth, organic progress bar increments
    let current = 0;
    const interval = setInterval(() => {
      // Vary the step slightly for an organic feel
      const step = Math.floor(Math.random() * 8) + 4;
      current = Math.min(current + step, 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        // Wait briefly at 100% before triggering exit
        setTimeout(() => {
          setLoading(false);
          // Dispatch page transition coordination event
          window.dispatchEvent(new Event('preloader-finished'));
        }, 350);
      }
    }, 45); // Takes about 1-1.2s to load

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!loading) {
      // Unmount after wipe-up animation completes (e.g. 800ms)
      const t = setTimeout(() => setShouldRender(false), 950);
      return () => clearTimeout(t);
    }
  }, [loading]);

  if (!shouldRender) return null;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={loading ? { y: 0 } : { y: '-100%' }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }} // Custom premium cubic bezier wipe-up
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#05110d]"
    >
      <div className="flex flex-col items-center max-w-xs w-full px-6 space-y-6">
        
        {/* Favicon Icon Box with pulse/scale transition */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.96, 1.04, 0.96], opacity: 1 }}
          transition={{
            scale: { repeat: Infinity, duration: 2.8, ease: "easeInOut" },
            opacity: { duration: 0.8 }
          }}
          className="w-24 h-24 bg-[#0a2018]/45 border border-[#143e30]/40 rounded-3xl p-5 shadow-2xl flex items-center justify-center relative overflow-hidden backdrop-blur-sm"
        >
          {/* Subtle green glow background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(127,255,0,0.1)_0%,transparent_70%)] pointer-events-none" />
          <img 
            src="/hillside/Hillsite-Favicon.webp" 
            alt="Hillsite Logo" 
            className="w-full h-full object-contain relative z-10 filter drop-shadow-md"
          />
        </motion.div>

        {/* Brand Text Stack */}
        <div className="space-y-1.5 text-center">
          <motion.h1 
            initial={{ letterSpacing: "0.15em", opacity: 0 }}
            animate={{ letterSpacing: "0.28em", opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-white text-lg sm:text-xl font-black uppercase tracking-[0.28em]"
          >
            Hillsite
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.65 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-[10px] text-emerald-450 font-bold uppercase tracking-[0.2em] font-sans"
          >
            Invest in Nature
          </motion.p>
        </div>

        {/* Dynamic Progress Indicator Container */}
        <div className="w-full space-y-3 pt-4">
          {/* Percentage */}
          <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
            <span className="uppercase tracking-wider opacity-60">Status: Loading</span>
            <span className="text-[#7fff00] font-bold">{progress}%</span>
          </div>

          {/* Sleek Line Progress Bar */}
          <div className="w-full h-[2px] bg-[#0d221b] rounded-full overflow-hidden relative">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#22c55e] to-[#7fff00] rounded-full transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

      </div>
    </motion.div>
  );
}