/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Code, Smartphone, Zap, Search, Shield, Palette } from "lucide-react";
import { useApp } from "../AppContext";

export default function Services() {
  const { t } = useApp();

  const icons = [
    {
      icon: <Code />,
      className: "bg-purple-500/10 text-purple-600 group-hover:bg-purple-600 group-hover:text-white dark:bg-purple-400/10 dark:text-purple-300",
    },
    {
      icon: <Zap />,
      className: "bg-amber-500/10 text-amber-600 group-hover:bg-amber-500 group-hover:text-slate-950 dark:bg-amber-400/10 dark:text-amber-300",
    },
    {
      icon: <Smartphone />,
      className: "bg-sky-500/10 text-sky-600 group-hover:bg-sky-600 group-hover:text-white dark:bg-sky-400/10 dark:text-sky-300",
    },
    {
      icon: <Shield />,
      className: "bg-red-500/10 text-red-600 group-hover:bg-red-600 group-hover:text-white dark:bg-red-400/10 dark:text-red-300",
    },
    {
      icon: <Search />,
      className: "bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-400/10 dark:text-emerald-300",
    },
    {
      icon: <Palette />,
      className: "bg-rose-500/10 text-rose-600 group-hover:bg-rose-600 group-hover:text-white dark:bg-rose-400/10 dark:text-rose-300",
    },
  ];

  return (
    <section id="services" className="py-24 px-6 relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-bold mb-4 uppercase tracking-[0.2em]"
            >
              {t.services.subtitle}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-display font-black text-slate-900 dark:text-white mb-6"
            >
              {t.services.title1} <br /> {t.services.title2}
            </motion.h2>
            <p className="text-slate-600 dark:text-slate-50 leading-relaxed max-w-sm">
              {t.services.desc}
            </p>
          </div>

          <ul className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.services.list.map((service, i) => (
              <motion.li
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl glass-card group cursor-pointer transition-shadow"
              >
                <div className={`p-4 rounded-2xl w-fit mb-6 transition-all duration-300 ${icons[i].className}`}>
                  {icons[i].icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-50 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
