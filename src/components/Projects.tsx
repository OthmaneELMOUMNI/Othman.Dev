/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ExternalLink, Github, FolderCode } from "lucide-react";
import { useApp } from "../AppContext";

const githubProfile = "https://github.com/OthmaneELMOUMNI";

const projects = [
  {
    title: "NoosTech",
    category: "Business Website",
    domain: "noostech.web4jobs.ma",
    image: "/project-screenshots/noostech.png",
    description: "A professional business website built to present services clearly, guide visitors through the offer, and convert traffic into qualified contact requests.",
    link: "https://noostech.web4jobs.ma/",
    github: githubProfile,
    tags: ["Laravel", "PHP", "Responsive", "Production"]
  },
  {
    title: "Special Star SARL",
    category: "Company Website",
    domain: "specialstarsarl.com",
    image: "/project-screenshots/special-star.png",
    description: "A cultural music group website designed to present the team, celebrate Sahrawi Hassani heritage, and make festival or event booking easy for organizers.",
    link: "https://specialstarsarl.com/",
    github: githubProfile,
    tags: ["Corporate", "Web Design", "SEO", "Performance"]
  },
  {
    title: "W4J Education",
    category: "Education Platform",
    domain: "w4j.yool.education",
    image: "/project-screenshots/w4j-education.png",
    description: "An education-oriented platform experience designed for clear navigation, structured content, and smooth access to learning resources.",
    link: "https://w4j.yool.education/",
    github: githubProfile,
    tags: ["Education", "Platform", "Laravel", "UI/UX"]
  },
  {
    title: "Oussama Pchiw",
    category: "Fitness Coaching Website",
    domain: "pchiw.netlify.app",
    image: "/project-screenshots/pchiw.png",
    description: "A bold personal trainer website built to present coaching disciplines, pricing, results, and direct contact paths for new clients.",
    link: "https://pchiw.netlify.app/",
    github: githubProfile,
    tags: ["React", "Vite", "Fitness", "Responsive"]
  }
];

export default function Projects() {
  const { t } = useApp();

  return (
    <section id="projects" className="py-24 px-6 relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-bold mb-4 uppercase tracking-[0.2em]"
            >
              <FolderCode size={16} />
              {t.projects.subtitle}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white"
            >
              {t.projects.title1} <span className="text-gradient">{t.projects.title2}</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-600 dark:text-slate-50 max-w-md md:text-right"
          >
            {t.projects.desc}
          </motion.p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {projects.map((project, i) => (
            <motion.li
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.01 }}
              viewport={{ once: true }}
              transition={{ 
                delay: i * 0.1, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="group relative overflow-hidden rounded-3xl glass-card transition-all duration-500 cursor-pointer"
            >
              {/* Preview Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} website preview`}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
                <div className="absolute inset-x-4 top-4 flex min-w-0 items-center gap-3 rounded-full border border-white/20 bg-slate-950/45 px-4 py-3 text-white shadow-2xl backdrop-blur-md">
                  <div className="flex shrink-0 items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-200" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  </div>
                  <div className="min-w-0 truncate text-xs font-bold tracking-wide text-white/80">{project.domain}</div>
                </div>
                <div className="absolute inset-x-5 bottom-5 text-white">
                  <div className="font-display text-2xl font-black tracking-tight drop-shadow-lg">{project.title}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/75">{project.category}</div>
                </div>
                
                {/* Hover Actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View source code for ${project.title} on Github`}
                      className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all text-white shadow-xl"
                    >
                      <Github size={20} aria-hidden="true" />
                    </a>
                  )}
                  <a 
                    href={project.link} 
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit live website for ${project.title}`}
                    className="p-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-all text-white shadow-xl"
                  >
                    <ExternalLink size={20} aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-tighter">{project.category}</div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 tracking-tight group-hover:text-blue-600 dark:group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-100">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-50 dark:bg-white/10 rounded-full text-[10px] font-bold text-slate-500 dark:text-slate-50 uppercase tracking-widest border border-slate-200 dark:border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <a href={githubProfile} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl font-semibold transition-all shadow-sm dark:shadow-none backdrop-blur-sm">
            {t.projects.viewMore}
            <Github size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
