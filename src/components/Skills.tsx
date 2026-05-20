/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Server, Layout, Database, Globe, Zap, Braces, Cloud, ShieldCheck } from "lucide-react";
import { useApp } from "../AppContext";

const skillGroups = [
  {
    title: "Core Backend",
    icon: <Server className="text-red-500" />,
    color: "rgba(239, 68, 68, 0.1)",
    skills: ["Laravel", "PHP 8.x", "Node.js", "Express"]
  },
  {
    title: "Frontend Mastery",
    icon: <Layout className="text-blue-500" />,
    color: "rgba(59, 130, 246, 0.1)",
    skills: ["Vue.js", "React", "Next.js", "Tailwind CSS"]
  },
  {
    title: "Data & DevOps",
    icon: <Database className="text-green-500" />,
    color: "rgba(34, 197, 94, 0.1)",
    skills: ["MySQL", "PostgreSQL", "Redis", "Docker"]
  },
  {
    title: "Architecture",
    icon: <Globe className="text-purple-500" />,
    color: "rgba(168, 85, 247, 0.1)",
    skills: ["REST APIs", "Microservices", "TDD", "Git"]
  }
];

const techStack = [
  {
    label: "Laravel",
    color: "#FF2D20",
    logo: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8">
        <path fill="currentColor" d="M21.7 6.53c.01.02.01.05.01.08v4.29c0 .1-.06.22-.15.27l-3.61 2.08v4.11c0 .11-.05.21-.15.27l-7.52 4.33c-.02.01-.04.04-.06.04h-.02c-.05 0-.11 0-.16-.04h-.04l-7.56-4.33c-.09-.05-.15-.16-.15-.27V4.5c0-.05 0-.08.01-.1 0-.01.01-.02.01-.03.01-.02.02-.03.03-.05.01-.01.02-.02.03-.03l.03-.03c.01-.01.02-.02.03-.03l3.76-2.17c.1-.06.22-.06.3 0l3.78 2.17h.01l.03.02.03.03.03.03c.01.01.02.03.02.04.01.02.02.03.02.05.01.03.01.05.01.1v8l3.14-1.78V6.61c0-.03 0-.06.01-.08l.01-.03c0-.01.01-.03.02-.05.01-.01.02-.02.03-.03l.03-.03.03-.03 3.78-2.17c.08-.06.2-.06.3 0l3.76 2.17.03.02.03.03.03.03c.01.01.01.02.02.03.01.02.01.05.02.05l.01.03Zm-.61 4.19V7.15l-3.14 1.8v3.55l3.14-1.78Zm-3.76 6.46V13.6l-6.9 3.94v3.61l6.9-3.97ZM2.91 5v12.18l6.9 3.97v-3.61l-3.6-2.04h-.01c-.01 0-.02 0-.03-.03-.01 0-.02-.01-.03-.02v-.01l-.03-.03c-.01-.01-.01-.02-.02-.03v-.01c-.01-.02-.01-.03-.02-.04 0-.02-.01-.03-.01-.04-.01-.01-.01-.03-.01-.04V6.82L2.91 5Zm3.45-2.32L3.23 4.5l3.13 1.78L9.5 4.5 6.36 2.68Zm3.45 10.2V5L6.67 6.82v7.87l3.14-1.81Zm7.83-8.08L14.5 6.61l3.14 1.8 3.13-1.8-3.13-1.81Zm-.31 4.15-3.14-1.8v3.57l3.14 1.78V8.95ZM10.12 17 17 13.06l-3.12-1.8L7 15.23 10.12 17Z" />
      </svg>
    )
  },
  {
    label: "PHP",
    color: "#777BB4",
    logo: <span className="font-display text-lg font-black tracking-tight">php</span>
  },
  {
    label: "MySQL",
    color: "#00758F",
    logo: <Database size={30} strokeWidth={2.1} aria-hidden="true" />
  },
  {
    label: "JavaScript",
    color: "#F7DF1E",
    logo: <span className="rounded-md bg-[#F7DF1E] px-1.5 py-1 text-sm font-black text-slate-950">JS</span>
  },
  {
    label: "React",
    color: "#61DAFB",
    logo: (
      <svg viewBox="-24 -24 48 48" aria-hidden="true" className="h-8 w-8">
        <circle r="3.4" fill="currentColor" />
        <ellipse rx="22" ry="8.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <ellipse rx="22" ry="8.5" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(60)" />
        <ellipse rx="22" ry="8.5" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(120)" />
      </svg>
    )
  },
  {
    label: "Vue",
    color: "#42B883",
    logo: (
      <svg viewBox="0 0 48 42" aria-hidden="true" className="h-8 w-8">
        <path fill="#42B883" d="M0 0h10l14 24L38 0h10L24 42 0 0Z" />
        <path fill="#35495E" d="M10 0h9l5 8.6L29 0h9L24 24 10 0Z" />
      </svg>
    )
  },
  {
    label: "Next.js",
    color: "#FFFFFF",
    logo: <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-base font-black text-slate-950">N</span>
  },
  {
    label: "Tailwind",
    color: "#06B6D4",
    logo: (
      <svg viewBox="0 0 48 29" aria-hidden="true" className="h-8 w-8">
        <path fill="currentColor" d="M24 0C17.6 0 13.6 3.2 12 9.6c2.4-3.2 5.2-4.4 8.4-3.6 1.8.5 3.1 1.8 4.6 3.3 2.4 2.4 5.1 5.1 11 5.1 6.4 0 10.4-3.2 12-9.6-2.4 3.2-5.2 4.4-8.4 3.6-1.8-.5-3.1-1.8-4.6-3.3C32.6 2.7 29.9 0 24 0ZM12 14.4C5.6 14.4 1.6 17.6 0 24c2.4-3.2 5.2-4.4 8.4-3.6 1.8.5 3.1 1.8 4.6 3.3 2.4 2.4 5.1 5.1 11 5.1 6.4 0 10.4-3.2 12-9.6-2.4 3.2-5.2 4.4-8.4 3.6-1.8-.5-3.1-1.8-4.6-3.3-2.4-2.4-5.1-5.1-11-5.1Z" />
      </svg>
    )
  },
  {
    label: "REST APIs",
    color: "#22C55E",
    logo: <Braces size={30} strokeWidth={2.2} aria-hidden="true" />
  },
  {
    label: "Git",
    color: "#F05032",
    logo: <span className="font-display text-xl font-black">git</span>
  },
  {
    label: "Docker",
    color: "#2496ED",
    logo: (
      <svg viewBox="0 0 48 36" aria-hidden="true" className="h-8 w-8">
        <path fill="currentColor" d="M18 0h6v6h-6V0Zm-7 7h6v6h-6V7Zm7 0h6v6h-6V7Zm7 0h6v6h-6V7ZM4 14h6v6H4v-6Zm7 0h6v6h-6v-6Zm7 0h6v6h-6v-6Zm7 0h6v6h-6v-6Zm7 0h6v6h-6v-6Zm16 4.4c-1.6 1.1-3.4 1.7-5.6 1.7H1.5C2.6 29.2 9 36 19.2 36c7.5 0 13-3.5 16-9.8 4.3.2 7.5-1.2 9.8-4.1.9-1.1 1.8-2.7 3-3.7Z" />
      </svg>
    )
  },
  {
    label: "Redis",
    color: "#DC382D",
    logo: <span className="font-display text-lg font-black tracking-tight">redis</span>
  },
  {
    label: "Cloud",
    color: "#38BDF8",
    logo: <Cloud size={31} strokeWidth={2.1} aria-hidden="true" />
  },
  {
    label: "Security",
    color: "#10B981",
    logo: <ShieldCheck size={31} strokeWidth={2.1} aria-hidden="true" />
  }
];

export default function Skills() {
  const { t } = useApp();

  return (
    <section id="skills" className="py-24 px-6 relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-bold mb-4 uppercase tracking-[0.2em]"
          >
            <Zap size={16} />
            {t.skills.subtitle}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white"
          >
             {t.skills.title1} <span className="text-gradient">{t.skills.title2}</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 glass-card rounded-3xl relative overflow-hidden group"
            >
              {/* Subtle Pulsing Glow */}
              <motion.div
                animate={{ 
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
                className="absolute -inset-10 blur-[60px] opacity-10 -z-10 rounded-full"
                style={{ backgroundColor: group.color }}
              />

              <div className="p-3 bg-blue-500/5 dark:bg-white/5 rounded-2xl w-fit mb-6 relative z-10 transition-transform group-hover:scale-110">
                {group.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight relative z-10">{group.title}</h3>
              <ul className="space-y-3 relative z-10">
                {group.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 text-slate-600 dark:text-slate-50 text-sm group">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-blue-300/70 transition-colors group-hover:bg-blue-500 text-blue-600" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Marquee Style Tech Line */}
        <div className="relative overflow-hidden py-8 border-y border-slate-200 dark:border-white/5 bg-slate-100/50 dark:bg-slate-950/50 backdrop-blur-sm [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
           <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
            className="flex w-max gap-4 pr-4"
           >
             {[...techStack, ...techStack].map((tech, i) => (
               <div
                 key={`${tech.label}-${i}`}
                 aria-hidden={i >= techStack.length}
                 className="group flex h-20 min-w-[165px] shrink-0 items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/80 px-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/60 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/5 dark:shadow-none dark:hover:border-white/20 dark:hover:bg-white/10"
               >
                 <div
                   className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-current/20 bg-current/10"
                   style={{ color: tech.color }}
                 >
                   {tech.logo}
                 </div>
                 <span className="font-display text-base font-bold tracking-tight text-slate-800 dark:text-slate-50">
                   {tech.label}
                 </span>
               </div>
             ))}
           </motion.div>
        </div>
      </div>
    </section>
  );
}
