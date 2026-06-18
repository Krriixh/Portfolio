import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { GraduationCap, Award } from "lucide-react";

const EDUCATION = [
  {
    institution: "Lovely Professional University",
    degree: "B.Tech CSE (Data Science)",
    period: "2023 – 2027",
  },
  {
    institution: "Kendriya Vidyalaya",
    degree: "12th — 75.4%",
    period: "2022",
  },
  {
    institution: "Kendriya Vidyalaya",
    degree: "10th — 85.6%",
    period: "2020",
  },
];

const CERTIFICATIONS = [
  "Introduction to ChatGPT-4 Prompt Engineering — Coursera",
  "Build Generative AI Apps — Coursera",
  "Computational Theory — Coursera",
  "Think Design Prototype (Figma) — LPU",
  "Responsive Web Design — freeCodeCamp",
];

export default function Education() {
  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionHeader label="Background" title="Education & Certifications" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap size={18} className="text-white/30" />
              <h3 className="font-heading font-semibold text-lg text-white/70">Education</h3>
            </div>

            <div className="space-y-6">
              {EDUCATION.map((edu, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-white/20 mt-2 shrink-0" />
                    {i < EDUCATION.length - 1 && <div className="w-px flex-1 bg-white/[0.06] mt-1" />}
                  </div>
                  <div className="pb-2">
                    <p className="font-heading font-semibold text-white text-sm">{edu.institution}</p>
                    <p className="text-white/45 text-sm">{edu.degree}</p>
                    <p className="font-mono text-[10px] text-white/25 tracking-widest mt-1">{edu.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Award size={18} className="text-white/30" />
              <h3 className="font-heading font-semibold text-lg text-white/70">Certifications</h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {CERTIFICATIONS.map((cert) => (
                <span
                  key={cert}
                  className="px-4 py-2 text-xs font-body text-white/40 bg-white/[0.03] rounded-full border border-white/[0.06] hover:border-white/15 hover:text-white/55 transition-all duration-300"
                >
                  {cert}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}