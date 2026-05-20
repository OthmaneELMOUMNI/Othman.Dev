/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Github, Linkedin, Sun, Moon, Globe } from "lucide-react";
import { useApp } from "../AppContext";

const githubProfile = "https://github.com/OthmaneELMOUMNI";

export default function Navbar() {
  const { language, setLanguage, theme, toggleTheme, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.skills, href: "#skills" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.services, href: "#services" },
    { name: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      aria-label="Main Navigation"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-white/5 py-3 shadow-[0_2px_20px_rgba(0,0,0,0.02)]" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.a 
          href="#home"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter text-gradient"
        >
          OTHMANE<span className="text-slate-400 dark:text-white/40 font-light">.</span>DEV
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium text-slate-600 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative py-1 px-px group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
            </motion.a>
          ))}
          
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-slate-200 dark:border-white/10">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === "en" ? "fr" : "en")}
              aria-label={`Switch language to ${language === "en" ? "French" : "English"}`}
              className="p-2 rounded-xl glass-card text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2"
            >
              <Globe size={14} aria-hidden="true" />
              {language}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="p-2 rounded-xl glass-card text-slate-600 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {theme === "dark" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
            </button>

            <a href={githubProfile} target="_blank" rel="noreferrer" aria-label="Github Profile" className="text-slate-400 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors">
              <Github size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
           <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="p-2 rounded-xl glass-card text-slate-600 dark:text-slate-200"
            >
              {theme === "dark" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
            </button>
            <button 
              className="p-2 rounded-xl glass-card text-slate-600 dark:text-white"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/5 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-slate-600 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative w-fit group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10">
                <button
                  onClick={() => {
                    setLanguage(language === "en" ? "fr" : "en");
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <Globe size={18} />
                  <span className="uppercase font-bold">{language === "en" ? "Français" : "English"}</span>
                </button>
                <div className="flex gap-4">
                  <a href={githubProfile} target="_blank" rel="noreferrer" aria-label="Github Profile" className="text-slate-400 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors">
                    <Github size={24} aria-hidden="true" />
                  </a>
                  <Linkedin size={24} className="text-slate-400 dark:text-slate-200" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
