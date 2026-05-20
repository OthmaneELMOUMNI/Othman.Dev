/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { User, Cpu, Rocket, Coffee } from "lucide-react";
import { useApp } from "../AppContext";

export default function About() {
  const { t } = useApp();
  
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-bold mb-4 uppercase tracking-[0.2em]"
          >
            <User size={16} />
            {t.about.subtitle}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white mb-6"
          >
            {t.about.title1} <br /> into <span className="text-gradient">{t.about.title2}</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="h-1 bg-blue-600 rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-slate-600 dark:text-slate-50 text-lg leading-relaxed"
          >
            <p>
              {t.about.desc1}
            </p>
            <p>
              {t.about.desc2}
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="p-4 glass-card rounded-2xl text-center">
                <div className="text-indigo-600 dark:text-indigo-400 mb-2 flex justify-center"><Cpu size={32} /></div>
                <div className="text-slate-900 dark:text-white font-bold text-xl tracking-tight">{t.about.fullstack}</div>
                <div className="text-xs text-slate-500 dark:text-slate-100">End-to-end Solutions</div>
              </div>
              <div className="p-4 glass-card rounded-2xl text-center">
                <div className="text-blue-600 dark:text-blue-400 mb-2 flex justify-center"><Rocket size={32} /></div>
                <div className="text-slate-900 dark:text-white font-bold text-xl tracking-tight">{t.about.scalability}</div>
                <div className="text-xs text-slate-500 dark:text-slate-100">Built for Growth</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="p-8 rounded-3xl glass-card relative z-10">
              <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                <Coffee className="text-amber-500 dark:text-amber-400" /> {t.about.philosophy}
              </h3>
              <ul className="space-y-4">
                {t.about.points.map((item, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-50 font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            {/* Decoration */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-600/30 blur-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-600/20 blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
