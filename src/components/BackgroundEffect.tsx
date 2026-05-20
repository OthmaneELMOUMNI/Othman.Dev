/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";

export default function BackgroundEffect() {
  const { scrollYProgress } = useScroll();
  
  const glow1Y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const glow2Y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Primary Glows based on theme */}
      <motion.div 
        style={{ y: glow1Y }}
        className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-600/10 rounded-full blur-[120px]" 
      />
      <motion.div 
        style={{ y: glow2Y }}
        className="absolute bottom-[-50px] right-[-50px] w-[400px] h-[400px] bg-indigo-600/10 dark:bg-indigo-600/10 rounded-full blur-[100px]" 
      />
      
      {/* Subtle Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/5 dark:bg-slate-900/5 rounded-full blur-[150px]" />
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-slate-300/10 dark:bg-slate-500/10"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]" 
        style={{ 
          backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }} 
      />
    </div>
  );
}
