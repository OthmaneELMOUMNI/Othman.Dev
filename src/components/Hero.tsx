/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Database, Terminal } from "lucide-react";
import { useApp } from "../AppContext";

export default function Hero() {
  const { t } = useApp();
  const containerRef = useRef<HTMLElement>(null);
  
  // Mouse movement parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms based on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mouse transformations
  const moveX = useTransform(smoothMouseX, [-0.5, 0.5], ["-15px", "15px"]);
  const moveY = useTransform(smoothMouseY, [-0.5, 0.5], ["-15px", "15px"]);
  
  const cellMoveX = useTransform(smoothMouseX, [-0.5, 0.5], ["-40px", "40px"]);
  const cellMoveY = useTransform(smoothMouseY, [-0.5, 0.5], ["-40px", "40px"]);
  const cellTiltX = useTransform(smoothMouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const cellTiltY = useTransform(smoothMouseX, [-0.5, 0.5], ["-10deg", "10deg"]);
  const orbitTransition = { duration: 30, repeat: Infinity, ease: "linear" as const };
  const techCardClass = "flex h-16 w-16 md:h-20 md:w-20 items-center justify-center drop-shadow-[0_18px_32px_rgba(2,6,23,0.45)] [backface-visibility:hidden]";
  const techNodes = [
    {
      key: "php",
      label: "PHP",
      className: "border-indigo-500/30",
      x: [0, 120, 170, 80, -75, -155, -95, 40, 0],
      y: [-190, -155, -35, 115, 160, 45, -115, -180, -190],
      scale: [1.04, 1.12, 1.02, 0.98, 0.94, 0.98, 1.06, 1.1, 1.04],
      delay: 0,
      icon: (
        <div className="grid h-12 w-12 place-items-center text-2xl font-black text-indigo-400 drop-shadow-[0_0_18px_rgba(129,140,248,0.42)]">
          PHP
        </div>
      )
    },
    {
      key: "react",
      label: "React",
      className: "border-cyan-400/30",
      x: [145, 175, 70, -90, -165, -130, 15, 135, 145],
      y: [-105, 50, 160, 130, -10, -145, -180, -150, -105],
      scale: [1.08, 1.1, 1, 0.95, 0.98, 1.06, 1.12, 1.1, 1.08],
      delay: -5,
      icon: (
        <div className="grid h-12 w-12 place-items-center text-[#61DAFB] drop-shadow-[0_0_18px_rgba(97,218,251,0.35)]">
          <svg viewBox="-24 -24 48 48" aria-hidden="true" className="h-12 w-12">
            <circle r="3.4" fill="currentColor" />
            <ellipse rx="22" ry="8.5" fill="none" stroke="currentColor" strokeWidth="2" />
            <ellipse rx="22" ry="8.5" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(60)" />
            <ellipse rx="22" ry="8.5" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(120)" />
          </svg>
        </div>
      )
    },
    {
      key: "javascript",
      label: "JavaScript",
      className: "border-yellow-400/30",
      x: [175, 95, -55, -175, -150, -20, 135, 180, 175],
      y: [-35, 135, 170, 55, -100, -180, -120, 20, -35],
      scale: [1.08, 1.02, 0.96, 0.94, 1, 1.1, 1.08, 1.04, 1.08],
      delay: -7,
      icon: (
        <div className="grid h-12 w-12 place-items-center rounded-sm bg-[#F7DF1E] text-xl font-black text-slate-950 shadow-[0_0_22px_rgba(247,223,30,0.34)]">
          JS
        </div>
      )
    },
    {
      key: "node",
      label: "Node.js",
      className: "border-green-500/30",
      x: [-120, -178, -125, 35, 160, 155, 45, -95, -120],
      y: [-135, -15, 120, 170, 60, -80, -170, -175, -135],
      scale: [1.03, 0.98, 0.94, 1.02, 1.12, 1.08, 1.04, 1.1, 1.03],
      delay: -9,
      icon: (
        <div className="grid h-12 w-12 place-items-center text-[#68A063] drop-shadow-[0_0_18px_rgba(104,160,99,0.35)]">
          <svg viewBox="0 0 48 48" aria-hidden="true" className="h-12 w-12">
            <path fill="currentColor" d="M24 3.6 41.2 13.5v20.9L24 44.4 6.8 34.4V13.5L24 3.6Zm0 7.1-11.1 6.4V31L24 37.5 35.1 31V17.1L24 10.7Z" />
            <path fill="currentColor" d="M18.2 28.6c1.7 1 3.7 1.6 5.8 1.6 2.5 0 4.1-.8 4.1-2.2 0-1.2-.9-1.8-4.7-2.2-4.1-.5-6.6-1.7-6.6-5 0-3.1 2.7-5.3 7-5.3 2.5 0 4.7.6 6.5 1.8l-1.9 3.1c-1.4-.8-3-1.3-4.6-1.3-2 0-3.1.7-3.1 1.8 0 1.2 1 1.6 4.5 2 4.4.5 6.8 1.9 6.8 5.2 0 3.5-2.9 5.6-7.9 5.6-2.9 0-5.6-.8-7.6-2.1l1.7-3Z" />
          </svg>
        </div>
      )
    },
    {
      key: "vue",
      label: "Vue",
      className: "border-emerald-400/30",
      x: [70, 175, 140, 0, -145, -170, -45, 105, 70],
      y: [-170, -70, 95, 175, 105, -35, -165, -155, -170],
      scale: [1.02, 1.1, 1.04, 0.98, 0.94, 1, 1.08, 1.06, 1.02],
      delay: -11,
      icon: (
        <div className="grid h-12 w-12 place-items-center drop-shadow-[0_0_18px_rgba(66,184,131,0.38)]">
          <svg viewBox="0 0 48 42" aria-hidden="true" className="h-12 w-12">
            <path fill="#42B883" d="M0 0h10l14 24L38 0h10L24 42 0 0Z" />
            <path fill="#35495E" d="M10 0h9l5 8.6L29 0h9L24 24 10 0Z" />
          </svg>
        </div>
      )
    },
    {
      key: "api",
      label: "REST API",
      className: "border-emerald-500/30",
      x: [-170, -135, 20, 150, 180, 80, -70, -170, -170],
      y: [20, -130, -175, -100, 45, 150, 145, 45, 20],
      scale: [0.98, 1.08, 1.1, 1.04, 1, 0.94, 0.96, 1.02, 0.98],
      delay: -13,
      icon: (
        <div className="grid h-12 w-12 place-items-center text-emerald-400">
          <Terminal size={40} strokeWidth={1.5} />
        </div>
      )
    },
    {
      key: "redis",
      label: "Redis",
      className: "border-red-500/30",
      x: [115, 25, -135, -175, -55, 120, 175, 120, 115],
      y: [150, 178, 85, -70, -175, -135, 10, 125, 150],
      scale: [0.96, 1, 1.08, 1.06, 1.02, 0.96, 0.94, 0.96, 0.96],
      delay: -15,
      icon: (
        <div className="grid h-12 w-12 place-items-center text-[#DC382D] drop-shadow-[0_0_18px_rgba(220,56,45,0.4)]">
          <svg viewBox="0 0 48 48" aria-hidden="true" className="h-12 w-12">
            <path fill="currentColor" d="M41.8 31.2 24.6 41 6.2 30.5 23.4 21l18.4 10.2Z" />
            <path fill="currentColor" d="M41.8 23.9 24.6 33.7 6.2 23.2 23.4 13.7l18.4 10.2Z" opacity=".78" />
            <path fill="currentColor" d="M41.8 16.6 24.6 26.4 6.2 15.9 23.4 6.4l18.4 10.2Z" opacity=".58" />
            <path fill="#fff" d="M24.2 12.2 20 13.6l4.1 1.5 4.2-1.5-4.1-1.4Zm-8 3 7.9 2.8 8.2-2.8 3 1.7-11.1 4-11-4 3-1.7Z" opacity=".9" />
          </svg>
        </div>
      )
    },
    {
      key: "database",
      label: "SQL",
      className: "border-blue-500/30",
      x: [-65, 70, 170, 135, 0, -145, -170, -110, -65],
      y: [170, 150, 45, -110, -180, -120, 30, 140, 170],
      scale: [0.96, 0.98, 1.08, 1.12, 1.04, 0.98, 0.94, 0.98, 0.96],
      delay: -17,
      icon: (
        <div className="grid h-12 w-12 place-items-center text-blue-500">
          <Database size={42} strokeWidth={1.5} />
        </div>
      )
    },
    {
      key: "composer",
      label: "Composer",
      className: "border-amber-700/30",
      x: [-155, -175, -60, 105, 180, 100, -50, -150, -155],
      y: [-70, 70, 165, 135, -10, -145, -170, -120, -70],
      scale: [1.06, 1.02, 0.96, 0.94, 0.98, 1.08, 1.1, 1.08, 1.06],
      delay: -19,
      icon: (
        <div className="grid h-12 w-12 place-items-center text-[#885630] drop-shadow-[0_0_18px_rgba(136,86,48,0.42)]">
          <svg viewBox="0 0 48 48" aria-hidden="true" className="h-12 w-12">
            <circle cx="24" cy="24" r="17" fill="none" stroke="currentColor" strokeWidth="4" />
            <circle cx="24" cy="24" r="7" fill="none" stroke="currentColor" strokeWidth="4" />
            <path fill="currentColor" d="M22 4h4v10h-4V4Zm0 30h4v10h-4V34ZM4 22h10v4H4v-4Zm30 0h10v4H34v-4ZM8.9 11.7l2.8-2.8 7.1 7.1-2.8 2.8-7.1-7.1Zm20.3 20.3 2.8-2.8 7.1 7.1-2.8 2.8-7.1-7.1Zm7.1-23.1 2.8 2.8-7.1 7.1-2.8-2.8 7.1-7.1ZM16 29.2l2.8 2.8-7.1 7.1-2.8-2.8 7.1-7.1Z" />
          </svg>
        </div>
      )
    },
    {
      key: "ts",
      label: "TypeScript",
      className: "border-blue-400/20",
      x: [165, 105, -35, -160, -150, -20, 130, 175, 165],
      y: [100, 175, 155, 65, -80, -170, -140, -10, 100],
      scale: [0.94, 0.96, 1, 1.06, 1.1, 1.04, 0.98, 0.94, 0.94],
      delay: -21,
      icon: (
        <div className="grid h-12 w-12 place-items-center text-xl font-black text-blue-400 drop-shadow-[0_0_18px_rgba(96,165,250,0.38)]">
          TS
        </div>
      )
    },
    {
      key: "docker",
      label: "Docker",
      className: "border-sky-500/30",
      x: [35, 165, 170, 35, -125, -170, -90, 75, 35],
      y: [178, 100, -55, -170, -135, 25, 150, 165, 178],
      scale: [0.94, 0.98, 1.08, 1.1, 1.04, 0.98, 0.94, 0.94, 0.94],
      delay: -25,
      icon: (
        <div className="grid h-12 w-12 place-items-center text-[#2496ED] drop-shadow-[0_0_18px_rgba(36,150,237,0.4)]">
          <svg viewBox="0 0 48 36" aria-hidden="true" className="h-12 w-12">
            <path fill="currentColor" d="M18 0h6v6h-6V0Zm-7 7h6v6h-6V7Zm7 0h6v6h-6V7Zm7 0h6v6h-6V7ZM4 14h6v6H4v-6Zm7 0h6v6h-6v-6Zm7 0h6v6h-6v-6Zm7 0h6v6h-6v-6Zm7 0h6v6h-6v-6Zm16 4.4c-1.6 1.1-3.4 1.7-5.6 1.7H1.5C2.6 29.2 9 36 19.2 36c7.5 0 13-3.5 16-9.8 4.3.2 7.5-1.2 9.8-4.1.9-1.1 1.8-2.7 3-3.7Z" />
          </svg>
        </div>
      )
    }
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Normalize coordinates to -0.5 to 0.5
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  return (
    <section 
      id="home" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[120vh] flex items-start pt-32 md:pt-48 px-6 overflow-hidden pb-24 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <motion.div
          style={{ opacity, x: moveX, y: moveY }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/10 border border-blue-500/20 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-6 uppercase tracking-wider"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            {t.hero.available}
          </motion.div>
          
          <h1 className="hero-headline text-5xl md:text-7xl font-display font-black leading-tight mb-6 text-slate-950 dark:text-white">
            {t.hero.hi} <span className="text-gradient hero-name-gradient">Othmane</span>
            <br />
            <span className="text-blue-700 dark:text-blue-200 font-mono text-xl md:text-2xl mt-4 block">{t.hero.title}</span>
          </h1>
          
          <p className="text-slate-600 dark:text-slate-50 text-sm md:text-base max-w-lg mb-10 leading-relaxed font-medium">
            {t.hero.desc}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href="#projects"
              aria-label="View Othmane's portfolio projects"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_10px_30px_rgba(37,99,235,0.2)]"
            >
              {t.hero.viewWork}
              <ArrowRight size={20} aria-hidden="true" />
            </motion.a>
            <motion.a
              href="#contact"
              aria-label="Get in touch with Othmane"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white dark:bg-slate-800/90 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 rounded-xl font-bold flex items-center justify-center gap-2 transition-all backdrop-blur-sm shadow-[0_4px_10px_rgba(0,0,0,0.02)]"
            >
              {t.hero.talk}
            </motion.a>
          </div>
          
          <div className="mt-12 flex gap-8">
            <div>
              <div className="text-3xl font-display font-bold text-slate-900 dark:text-white">50+</div>
              <div className="text-sm text-slate-500 dark:text-slate-50 uppercase tracking-widest font-bold">{t.hero.projects}</div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-slate-900 dark:text-white">4+</div>
              <div className="text-sm text-slate-500 dark:text-slate-50 uppercase tracking-widest font-bold">{t.hero.experience}</div>
            </div>
          </div>
        </motion.div>
        
        {/* Tech Cells Orbit */}
        <motion.div 
          style={{ x: cellMoveX, y: cellMoveY, rotateX: cellTiltX, rotateY: cellTiltY, transformStyle: "preserve-3d" }}
          className="relative h-[520px] lg:h-[620px] flex items-center justify-center [perspective:1200px]"
        >
          {/* Background Pulsing Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/20 dark:bg-blue-400/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl dark:bg-blue-500/10 md:h-[540px] md:w-[540px]" />

          {/* Floating Tech Logos */}
          <div className="absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 scale-[0.82] sm:scale-90 md:h-[520px] md:w-[520px] md:scale-100 [transform-style:preserve-3d]">
            <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/50 shadow-[0_0_24px_rgba(147,197,253,0.8)]" />
            {techNodes.map((node) => (
              <motion.div
                key={node.key}
                animate={{ x: node.x, y: node.y, scale: node.scale, opacity: [0.92, 1, 0.96, 1, 0.92] }}
                transition={{ ...orbitTransition, delay: node.delay }}
                className="absolute left-1/2 top-1/2 z-20 [transform-style:preserve-3d] will-change-transform"
              >
                <motion.div
                  animate={{ rotateX: [8, -8, 8], rotateY: [-10, 10, -10], y: [0, -8, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: Math.abs(node.delay) / 8 }}
                  className={`${techCardClass} ${node.className} -translate-x-1/2 -translate-y-1/2`}
                >
                  {node.icon}
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          {/* Main Laravel Cell (Center/Foreground) */}
          <div className="absolute left-1/2 top-1/2 z-30 [transform-style:preserve-3d]" style={{ transform: "translate3d(-50%, -50%, 120px)" }}>
            <motion.div
              animate={{ 
                rotateX: [0, 5, 0],
                rotateY: [0, 5, 0],
                scale: [1, 1.02, 1],
                y: [0, -8, 0]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-48 h-48 md:w-64 md:h-64 flex flex-col items-center justify-center p-8"
            >
              <div className="w-16 h-16 md:w-24 md:h-24 mb-4 text-[#FF2D20] drop-shadow-[0_12px_24px_rgba(255,45,32,0.28)]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full" aria-hidden="true">
                  <path d="M21.7 6.53c.01.02.01.05.01.08v4.29c0 .1-.06.22-.15.27l-3.61 2.08v4.11c0 .11-.05.21-.15.27l-7.52 4.33c-.02.01-.04.04-.06.04h-.02c-.05 0-.11 0-.16-.04h-.04l-7.56-4.33c-.09-.05-.15-.16-.15-.27V4.5c0-.05 0-.08.01-.1 0-.01.01-.02.01-.03.01-.02.02-.03.03-.05.01-.01.02-.02.03-.03l.03-.03c.01-.01.02-.02.03-.03l3.76-2.17c.1-.06.22-.06.3 0l3.78 2.17h.01l.03.02.03.03.03.03c.01.01.02.03.02.04.01.02.02.03.02.05.01.03.01.05.01.1v8l3.14-1.78V6.61c0-.03 0-.06.01-.08l.01-.03c0-.01.01-.03.02-.05.01-.01.02-.02.03-.03l.03-.03.03-.03 3.78-2.17c.08-.06.2-.06.3 0l3.76 2.17.03.02.03.03.03.03c.01.01.01.02.02.03.01.02.01.05.02.05l.01.03Zm-.61 4.19V7.15l-3.14 1.8v3.55l3.14-1.78Zm-3.76 6.46V13.6l-6.9 3.94v3.61l6.9-3.97ZM2.91 5v12.18l6.9 3.97v-3.61l-3.6-2.04h-.01c-.01 0-.02 0-.03-.03-.01 0-.02-.01-.03-.02v-.01l-.03-.03c-.01-.01-.01-.02-.02-.03v-.01c-.01-.02-.01-.03-.02-.04 0-.02-.01-.03-.01-.04-.01-.01-.01-.03-.01-.04V6.82L2.91 5Zm3.45-2.32L3.23 4.5l3.13 1.78L9.5 4.5 6.36 2.68Zm3.45 10.2V5L6.67 6.82v7.87l3.14-1.81Zm7.83-8.08L14.5 6.61l3.14 1.8 3.13-1.8-3.13-1.81Zm-.31 4.15-3.14-1.8v3.57l3.14 1.78V8.95ZM10.12 17 17 13.06l-3.12-1.8L7 15.23 10.12 17Z" />
                </svg>
              </div>
              <div className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tighter">LARAVEL</div>
              <div className="text-xs uppercase tracking-[0.4em] text-red-500 font-bold mt-1">Core Architecture</div>
            </motion.div>
          </div>

          {/* Floating Particles/Dots */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, Math.random() * -50, 0],
                x: [0, Math.random() * 30, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ 
                duration: 4 + Math.random() * 4, 
                repeat: Infinity,
                delay: i * 0.5
              }}
              className="absolute w-2 h-2 bg-blue-500 rounded-full blur-[2px]"
              style={{ 
                top: `${20 + Math.random() * 60}%`, 
                left: `${20 + Math.random() * 60}%` 
              }}
            />
          ))}
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-slate-500 dark:text-slate-50 uppercase tracking-[0.3em] font-bold">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-blue-500 to-transparent" />
      </motion.div>
    </section>
  );
}
