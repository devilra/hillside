import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Refined realistic leaf SVGs with inner veins and gradient fills
const LEAF_TYPES = [
  // Leaf Type 1: Classic slender leaf (Willow/Eucalyptus style)
  (size, gradId, strokeColor) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C12 2 5 8 5 14a7 7 0 0 0 14 0c0-6-7-12-7-12z" fill={`url(#${gradId})`} />
      {/* Main central vein */}
      <path d="M12 5.5v12.5" stroke={strokeColor} opacity="0.6" strokeWidth="1" />
      {/* Delicate lateral veins */}
      <path d="M12 8.5c1.2 0.6 2.4 0.4 3.5-0.4" stroke={strokeColor} opacity="0.4" strokeWidth="0.8" />
      <path d="M12 11c-1.2 0.6-2.4 0.4-3.5-0.4" stroke={strokeColor} opacity="0.4" strokeWidth="0.8" />
      <path d="M12 13c1.5 0.8 2.8 0.5 4-0.3" stroke={strokeColor} opacity="0.4" strokeWidth="0.8" />
      <path d="M12 15.5c-1.5 0.8-2.8 0.5-4-0.3" stroke={strokeColor} opacity="0.4" strokeWidth="0.8" />
    </svg>
  ),
  // Leaf Type 2: Broad lobed leaf (Oak/Maple style)
  (size, gradId, strokeColor) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c0 0-2.5 2.5-2 5c-1.5-0.5-3 1-2.5 3c-1.5 0-2 2-1 3.5c1 1.5 3 1.5 5.5 2.5c0.5 2.5 1.5 3 2.5 3.5c1-0.5 2-1 2.5-3.5c2.5-1 4.5-1 5.5-2.5c1-1.5 0.5-3.5-1-3.5c0.5-2-1-3.5-2.5-3c0.5-2.5-2-5-2-5z" fill={`url(#${gradId})`} />
      {/* Main central vein */}
      <path d="M12 4.5v13.5" stroke={strokeColor} opacity="0.6" strokeWidth="1" />
      {/* Delicate lateral veins */}
      <path d="M12 7.5c1.5 0.8 2.5 0.2 3.5-0.5" stroke={strokeColor} opacity="0.4" strokeWidth="0.8" />
      <path d="M12 9.5c-1.5 0.8-2.5 0.2-3.5-0.5" stroke={strokeColor} opacity="0.4" strokeWidth="0.8" />
      <path d="M12 12c1.8 1 2.8 0.4 3.8-0.4" stroke={strokeColor} opacity="0.4" strokeWidth="0.8" />
      <path d="M12 14c-1.8 1-2.8 0.4-3.8-0.4" stroke={strokeColor} opacity="0.4" strokeWidth="0.8" />
    </svg>
  ),
  // Leaf Type 3: Heart-shaped leaf (Birch/Linden style)
  (size, gradId, strokeColor) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c-4.5 3.5-6.5 8-3.5 13c2.2 3.5 5.5 3.5 7 0c3-5 1-9.5-3.5-13z" fill={`url(#${gradId})`} />
      {/* Main central vein */}
      <path d="M12 5v12.5" stroke={strokeColor} opacity="0.6" strokeWidth="1" />
      {/* Delicate lateral veins */}
      <path d="M12 8c1.5 0.7 2.8 0.3 3.8-0.5" stroke={strokeColor} opacity="0.4" strokeWidth="0.8" />
      <path d="M12 10.5c-1.5 0.7-2.8 0.3-3.8-0.5" stroke={strokeColor} opacity="0.4" strokeWidth="0.8" />
      <path d="M12 13c1.5 0.7 2.8 0.3 3.8-0.5" stroke={strokeColor} opacity="0.4" strokeWidth="0.8" />
      <path d="M12 15c-1.5 0.7-2.8 0.3-3.8-0.5" stroke={strokeColor} opacity="0.4" strokeWidth="0.8" />
    </svg>
  )
];

const LEAF_STROKES = [
  '#0d5a36', // dark forest green
  '#065f46', // emerald-800
  '#15803d', // green-700
  '#0f766e'  // teal-700
];

export default function FloatingLeaves() {
  const leafData = useMemo(() => {
    // Reduced from 38 to 15 for a cleaner, more premium and realistic look
    return Array.from({ length: 15 }).map((_, idx) => {
      const size = Math.floor(Math.random() * 20) + 18; // 18px to 38px (more uniform size)
      const left = Math.random() * 100;
      const delay = Math.random() * -25; // Negative delay so leaves are fully distributed on load
      const duration = Math.random() * 10 + 20; // 20s to 30s fall duration (slower and more realistic)
      
      const rotateStart = Math.floor(Math.random() * 360);
      const rotateEnd = rotateStart + (Math.random() > 0.5 ? 360 : -360); // Realistic full rotations
      
      const leafIndex = idx % LEAF_TYPES.length;
      const strokeColor = LEAF_STROKES[idx % LEAF_STROKES.length];
      const swayWidth = Math.floor(Math.random() * 45) + 35; // 35px to 80px sway
      const swayDuration = Math.random() * 4 + 6; // 6s to 10s sway duration (gentle wind effect)
      
      // Depth of field config to support visual depth and realism
      let filter = '';
      let opacityMax = 0.65;
      let zIndex = 10;
      
      if (size > 30) {
        filter = 'blur(0.8px) drop-shadow(4px 10px 6px rgba(0,0,0,0.04))'; // Near camera
        opacityMax = 0.75;
        zIndex = 20;
      } else if (size < 23) {
        filter = 'blur(1.5px) drop-shadow(1px 2px 2px rgba(0,0,0,0.02))'; // Far background
        opacityMax = 0.35;
        zIndex = 5;
      } else {
        filter = 'drop-shadow(2px 6px 4px rgba(0,0,0,0.03))'; // Midground
        opacityMax = 0.6;
        zIndex = 15;
      }

      return {
        id: idx,
        size,
        left,
        delay,
        duration,
        rotateStart,
        rotateEnd,
        leafIndex,
        gradId: `leaf-grad-${idx % 4}`,
        strokeColor,
        swayWidth,
        swayDuration,
        filter,
        opacityMax,
        zIndex
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-[15]">
      {/* SVG definitions for beautiful semi-transparent green gradients */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          {/* Gradient 1: Soft Forest Green */}
          <linearGradient id="leaf-grad-0" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#15803d" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#86efac" stopOpacity="0.25" />
          </linearGradient>
          {/* Gradient 2: Emerald Green */}
          <linearGradient id="leaf-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#047857" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a7f3d0" stopOpacity="0.3" />
          </linearGradient>
          {/* Gradient 3: Sage/Lime Green */}
          <linearGradient id="leaf-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#65a30d" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#d9f99d" stopOpacity="0.2" />
          </linearGradient>
          {/* Gradient 4: Mint/Teal Green */}
          <linearGradient id="leaf-grad-3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d9488" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#99f6e4" stopOpacity="0.25" />
          </linearGradient>
        </defs>
      </svg>

      {leafData.map((leaf) => {
        const renderLeafSvg = LEAF_TYPES[leaf.leafIndex];

        return (
          <motion.div
            key={leaf.id}
            className="absolute"
            style={{
              top: '-5%',
              left: `${leaf.left}%`,
              width: leaf.size,
              height: leaf.size,
              filter: leaf.filter,
              zIndex: leaf.zIndex,
            }}
            initial={{ 
              y: '-10vh', 
              rotate: leaf.rotateStart, 
              rotateX: 0, 
              rotateY: 0, 
              opacity: 0 
            }}
            animate={{
              y: '110vh',
              x: [0, leaf.swayWidth, -leaf.swayWidth, 0],
              rotate: leaf.rotateEnd,
              rotateX: [0, 45, -45, 0],
              rotateY: [0, 180, 360],
              opacity: [0, leaf.opacityMax, leaf.opacityMax, 0],
            }}
            transition={{
              // Global vertical fall tracking
              y: {
                duration: leaf.duration,
                repeat: Infinity,
                delay: leaf.delay,
                ease: 'linear',
              },
              // Fluid, organic multi-axis sway and tumble dynamics
              x: {
                duration: leaf.swayDuration,
                repeat: Infinity,
                delay: leaf.delay,
                ease: 'easeInOut',
              },
              rotate: {
                duration: leaf.duration,
                repeat: Infinity,
                delay: leaf.delay,
                ease: 'linear',
              },
              rotateX: {
                duration: leaf.swayDuration * 1.5,
                repeat: Infinity,
                delay: leaf.delay,
                ease: 'easeInOut',
              },
              rotateY: {
                duration: leaf.swayDuration * 2,
                repeat: Infinity,
                delay: leaf.delay,
                ease: 'linear',
              },
              // Smooth fading boundaries
              opacity: {
                duration: leaf.duration,
                repeat: Infinity,
                delay: leaf.delay,
                ease: 'linear',
                times: [0, 0.15, 0.85, 1] // Stays visible for the majority of the fall
              }
            }}
          >
            {renderLeafSvg(leaf.size, leaf.gradId, leaf.strokeColor)}
          </motion.div>
        );
      })}
    </div>
  );
}