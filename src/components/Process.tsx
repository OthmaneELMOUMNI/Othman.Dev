/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Search, Layers, Fingerprint, CheckCircle2 } from "lucide-react";
import { useApp } from "../AppContext";

export default function Process() {
  const { t } = useApp();
  
  const icons = [
    <Search size={24} className="text-blue-600 dark:text-blue-400" />,
    <Layers size={24} className="text-indigo-600 dark:text-indigo-400" />,
    <Fingerprint size={24} className="text-slate-700 dark:text-slate-50" />,
    <CheckCircle2 size={24} className="text-blue-500 dark:text-blue-400" />,
  ];

  return (
    <section id="process" className="py-24 px-6 overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-bold mb-4 uppercase tracking-[0.2em]"
          >
            {t.process.subtitle}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white"
          >
            {t.process.title1} <span className="text-gradient">{t.process.title2}</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Timeline Line (Desktop) */}
          <div className="hidden lg:block absolute top-[40px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-800 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {t.process.steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                <div className={`w-20 h-20 rounded-full glass-card mb-8 flex items-center justify-center relative shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                  {icons[i]}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                    {i + 1}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-50 text-sm leading-relaxed max-w-[250px]">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
