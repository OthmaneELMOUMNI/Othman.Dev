/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useApp } from "../AppContext";

export default function Contact() {
  const { t } = useApp();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const whatsappDisplay = "0706822429";
  const whatsappUrl = "https://wa.me/212706822429";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      projectType: String(formData.get("projectType") || ""),
      message: String(formData.get("message") || ""),
      company: String(formData.get("company") || ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Message could not be sent");
      }

      event.currentTarget.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-24 px-6 relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Info Side */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-bold mb-4 uppercase tracking-[0.2em]"
            >
              {t.contact.subtitle}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white mb-8"
            >
              {t.contact.title1} <br /> <span className="text-gradient">{t.contact.title2}</span>
            </motion.h2>
            <p className="text-slate-600 dark:text-slate-50 text-lg leading-relaxed mb-12 max-w-lg">
              {t.contact.desc}
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all font-bold shadow-sm">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-100 uppercase tracking-widest font-bold">{t.contact.email}</div>
                  <div className="text-lg text-slate-900 dark:text-white font-medium">othmanemoumni5@gmail.com</div>
                </div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-6 group"
                aria-label={`Contact Othmane on WhatsApp at ${whatsappDisplay}`}
              >
                <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-emerald-600 dark:text-emerald-300 group-hover:bg-emerald-600 group-hover:text-white transition-all font-bold shadow-sm">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-100 uppercase tracking-widest font-bold">{t.contact.whatsapp}</div>
                  <div className="text-lg text-slate-900 dark:text-white font-medium">{whatsappDisplay}</div>
                </div>
              </a>
              
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-indigo-600 dark:text-blue-400 group-hover:bg-indigo-600 group-hover:text-white transition-all font-bold shadow-sm">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-100 uppercase tracking-widest font-bold">{t.contact.location}</div>
                  <div className="text-lg text-slate-900 dark:text-white font-medium">Remote / World-wide</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 glass-card rounded-[2rem] shadow-2xl"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="form-name" className="text-xs font-bold text-slate-500 dark:text-slate-100 uppercase tracking-widest pl-1">{t.contact.name}</label>
                  <input 
                    id="form-name"
                    name="name"
                    type="text" 
                    placeholder="John Doe" 
                    autoComplete="name"
                    required
                    className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-400 text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="form-email" className="text-xs font-bold text-slate-500 dark:text-slate-100 uppercase tracking-widest pl-1">{t.contact.emailLabel}</label>
                  <input 
                    id="form-email"
                    name="email"
                    type="email" 
                    placeholder="john@example.com" 
                    autoComplete="email"
                    required
                    className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-400 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="form-project" className="text-xs font-bold text-slate-500 dark:text-slate-100 uppercase tracking-widest pl-1">{t.contact.projectType}</label>
                <select id="form-project" name="projectType" className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all text-slate-700 dark:text-white">
                  {t.contact.types.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="form-message" className="text-xs font-bold text-slate-500 dark:text-slate-100 uppercase tracking-widest pl-1">{t.contact.message}</label>
                <textarea 
                  id="form-message"
                  name="message"
                  rows={4} 
                  placeholder="..." 
                  required
                  className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-400 text-slate-900 dark:text-white resize-none"
                />
              </div>

              <div className="hidden" aria-hidden="true">
                <label htmlFor="form-company">Company</label>
                <input
                  id="form-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Send contact message"
                disabled={status === "sending"}
                className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-600 dark:to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-500 dark:hover:to-indigo-500 text-white font-bold rounded-xl shadow-[0_10px_30px_rgba(37,99,235,0.2)] transition-all flex items-center justify-center gap-3 lg:text-lg disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "sending" ? t.contact.sending : t.contact.send}
                <Send size={20} aria-hidden="true" />
              </motion.button>
              {status === "success" && (
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-300">{t.contact.success}</p>
              )}
              {status === "error" && (
                <p className="text-sm font-semibold text-red-600 dark:text-red-300">{t.contact.error}</p>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
