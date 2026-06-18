import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, MonitorSmartphone, Cpu } from "lucide-react";
import SectionHeader from "./SectionHeader";

const STATS = [
  { value: 2, suffix: "", label: "Projects" },
  { value: 1000, suffix: "+", label: "Followers" },
  { value: 1, suffix: "", label: "Internship" },
];

function AnimatedCounter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const steps = 40;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-heading font-bold text-3xl sm:text-4xl text-white tabular-nums tracking-tight">
      {count}{suffix}
    </span>
  );
}

const itemVariant = {
  hidden: (direction) => {
    let x = 0;
    let y = 0;
    if (direction === "left") x = -150;
    if (direction === "right") x = 150;
    if (direction === "bottom-left") { x = -150; y = 150; }
    if (direction === "bottom") y = 150;
    if (direction === "bottom-right") { x = 150; y = 150; }
    
    return { 
      opacity: 0, 
      x, 
      y, 
      scale: 0.85, 
      filter: "blur(15px)" 
    };
  },
  visible: { 
    opacity: 1, 
    x: 0, 
    y: 0, 
    scale: 1, 
    filter: "blur(0px)", 
    transition: { type: "spring", stiffness: 120, damping: 15, mass: 1 } 
  }
};

export default function About() {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionHeader label="Who I Am" title="About Me" />

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } }
          }}
          style={{ perspective: 1200 }}
          className="max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {/* Main Bio Card */}
          <motion.div custom="left" variants={itemVariant} className="md:col-span-2 glass-panel rounded-3xl p-8 border border-white/[0.06] hover:border-white/[0.12] transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <GraduationCap size={120} strokeWidth={1} />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-center">
              <h3 className="text-xl text-white font-medium mb-4">Background</h3>
              <p className="text-white/60 text-base leading-[1.8] max-w-lg">
                I'm a 4th-year Computer Science &amp; Engineering (Data Science) student
                at Lovely Professional University. I focus on building applications that solve real
                problems people face every day.
              </p>
            </div>
          </motion.div>

          {/* KPI Stats Vertical */}
          <motion.div custom="right" variants={itemVariant} className="md:col-span-1 grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-6">
            {STATS.slice(0, 2).map((stat) => (
              <div key={stat.label} className="glass-panel rounded-3xl p-6 border border-white/[0.06] hover:border-white/[0.12] transition-colors flex flex-col justify-center items-center text-center">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="font-mono text-[10px] text-white/30 tracking-[0.15em] uppercase mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Secondary Cards */}
          <motion.div custom="bottom-left" variants={itemVariant} className="md:col-span-1 glass-panel rounded-3xl p-8 border border-white/[0.06] hover:border-white/[0.12] transition-colors flex flex-col justify-between">
            <MonitorSmartphone size={32} className="text-white/40 mb-6" strokeWidth={1.5} />
            <div>
              <h3 className="text-lg text-white font-medium mb-2">Design & Engineering</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                From native desktop apps to interactive learning platforms, I bridge great UX with robust backend systems.
              </p>
            </div>
          </motion.div>

          <motion.div custom="bottom" variants={itemVariant} className="md:col-span-1 glass-panel rounded-3xl p-8 border border-white/[0.06] hover:border-white/[0.12] transition-colors flex flex-col justify-between">
            <Cpu size={32} className="text-white/40 mb-6" strokeWidth={1.5} />
            <div>
              <h3 className="text-lg text-white font-medium mb-2">Beyond Coding</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                I actively explore AI workflows and dive deep into emerging technologies that push boundaries.
              </p>
            </div>
          </motion.div>

          {/* Last Stat */}
          <motion.div custom="bottom-right" variants={itemVariant} className="md:col-span-1 glass-panel rounded-3xl p-6 border border-white/[0.06] hover:border-white/[0.12] transition-colors flex flex-col justify-center items-center text-center">
            <AnimatedCounter target={STATS[2].value} suffix={STATS[2].suffix} />
            <p className="font-mono text-[10px] text-white/30 tracking-[0.15em] uppercase mt-2">
              {STATS[2].label}
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
