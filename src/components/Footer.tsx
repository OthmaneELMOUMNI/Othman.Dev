/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Github, Linkedin, Twitter, Heart, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useApp } from "../AppContext";

const githubProfile = "https://github.com/OthmaneELMOUMNI";

export default function Footer() {
  const { t } = useApp();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <footer className="py-12 px-6 border-t border-slate-200 dark:border-white/5 relative bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
           <a href="#home" className="text-xl font-bold tracking-tighter text-gradient">
            OTHMANE<span className="text-slate-400 dark:text-white/40 font-light">.</span>DEV
          </a>
          <p className="text-slate-500 dark:text-slate-100 text-[10px] uppercase tracking-widest mt-3">
             © {new Date().getFullYear()} OTHMANE. {t.footer.builtWith}
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-6">
          <div className="flex gap-6">
            <a href={githubProfile} target="_blank" rel="noreferrer" aria-label="Follow Othmane on Github" className="text-slate-400 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors">
              <Github size={24} aria-hidden="true" />
            </a>
            <a href="#" aria-label="Connect with Othmane on LinkedIn" className="text-slate-400 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Linkedin size={24} aria-hidden="true" />
            </a>
            <a href="#" aria-label="Follow Othmane on Twitter" className="text-slate-400 dark:text-slate-200 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
              <Twitter size={24} aria-hidden="true" />
            </a>
          </div>
          <div className="text-slate-500 dark:text-slate-100 text-xs flex items-center gap-1.5 uppercase tracking-widest font-bold">
            {t.footer.rights} <Heart size={14} aria-hidden="true" className="text-rose-500 fill-rose-500" /> by Othmane
          </div>
        </div>
      </div>
      
      {/* Scroll to Top - Animated Visibility */}
      <AnimatePresence>
        {isVisible && (
          <motion.button 
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            aria-label="Scroll back to top"
            whileHover={{ 
              scale: 1.15,
              backgroundColor: "#2563eb",
              boxShadow: "0 0 25px rgba(37, 99, 235, 0.4)"
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hidden md:flex fixed bottom-10 right-10 w-12 h-12 bg-blue-600 rounded-full items-center justify-center text-white shadow-2xl z-40 cursor-pointer border border-white/20 dark:border-white/20"
          >
            <ChevronUp size={24} aria-hidden="true" />
            {/* Subtle Pulsing Outer Ring */}
            <motion.div 
               animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute inset-0 rounded-full bg-blue-500 -z-10"
            />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
