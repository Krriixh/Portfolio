import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ExternalLink, Github, ChevronLeft, ChevronRight, Zap, FileText } from "lucide-react";

export default function ProjectCard({ project, featured, tall }) {
  const [activeShot, setActiveShot] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const screenshots = project.screenshots || [project.image];

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);
  
  // Glare moves opposite to the mouse direction for realism
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Premium auto-play workflow presentation
  useEffect(() => {
    if (screenshots.length <= 1 || isHovered) return;
    const timer = setInterval(() => {
      setActiveShot((i) => (i + 1) % screenshots.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [screenshots.length, isHovered]);

  const prev = (e) => {
    e.stopPropagation();
    setActiveShot((i) => (i - 1 + screenshots.length) % screenshots.length);
  };
  const next = (e) => {
    e.stopPropagation();
    setActiveShot((i) => (i + 1) % screenshots.length);
  };

  return (
    <div className={`perspective-[1000px] ${featured ? "lg:col-span-2" : ""} ${tall ? "flex flex-col h-full" : ""}`}>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative glass-panel group rounded-2xl overflow-hidden transition-all duration-500
          border border-white/[0.07] hover:border-white/[0.14]
          hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_40px_rgba(255,255,255,0.04),inset_0_0_0_1px_rgba(255,255,255,0.07)]
          ${tall ? "flex flex-col h-full" : "h-full"}`}
      >
        {/* Dynamic Glare effect */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.3) 0%, transparent 50%)`
            ),
          }}
        />

        {/* Screenshot area */}
        <div 
          className="relative overflow-hidden bg-[#080808]" 
          style={{ aspectRatio: featured ? "16/7" : "16/9", transform: "translateZ(20px)" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
        <AnimatePresence mode="wait">
          <motion.img
            key={activeShot}
            src={screenshots[activeShot]}
            alt={project.title}
            loading="lazy"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover opacity-75 group-hover:opacity-95 transition-opacity duration-500"
          />
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/10 to-transparent" />

        {project.logo && (
          <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center overflow-hidden">
            <img src={project.logo} alt={`${project.title} logo`} loading="lazy" className="w-7 h-7 object-contain" />
          </div>
        )}

        {/* Screenshot nav dots */}
        {screenshots.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous screenshot"
              data-cursor-hover
              data-cursor-text="Prev"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
            >
              <ChevronLeft size={13} className="text-white/70" />
            </button>
            <button
              onClick={next}
              aria-label="Next screenshot"
              data-cursor-hover
              data-cursor-text="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
            >
              <ChevronRight size={13} className="text-white/70" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {screenshots.map((_, i) => (
                <button
                  key={i}
                  aria-label={`View screenshot ${i + 1}`}
                  onClick={(e) => { e.stopPropagation(); setActiveShot(i); }}
                  className={`w-1 h-1 rounded-full transition-all duration-300 ${i === activeShot ? "bg-white w-4" : "bg-white/30"}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Links top-right */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository" data-cursor-hover data-cursor-text="Code"
              className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Github size={13} className="text-white/70" />
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live Demo" data-cursor-hover data-cursor-text="Visit"
              className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
              <ExternalLink size={13} className="text-white/70" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-heading font-bold text-xl text-white tracking-tight">{project.title}</h3>
            {project.kpis && (
              <div className="flex gap-3 shrink-0">
                {project.kpis.map((kpi) => (
                  <div key={kpi.label} className="text-right">
                    <p className="font-mono text-xs text-white/60 font-semibold">{kpi.value}</p>
                    <p className="font-mono text-[9px] text-white/25 tracking-wider uppercase">{kpi.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <p className="font-mono text-[11px] text-white/30 tracking-wide mt-1">{project.tagline}</p>
        </div>

        <p className="text-white/45 text-sm leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        {/* Feature pills */}
        {project.features && project.features.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {project.features.slice(0, featured ? 4 : 3).map((f, i) => (
              <span key={i} className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono text-white/35 bg-white/[0.03] rounded-md border border-white/[0.05]">
                <Zap size={8} className="text-white/20" />
                {f.split("—")[0].trim()}
              </span>
            ))}
          </div>
        )}

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {(project.tech || []).map((tag) => (
            <span key={tag}
              className="px-2.5 py-0.5 text-[10px] font-mono text-white/30 bg-white/[0.03] rounded-full border border-white/[0.05] hover:border-white/15 hover:text-white/50 transition-all duration-200">
              {tag}
            </span>
          ))}
        </div>

        {/* Case Study Link */}
        {["Axiom", "Blackwood"].includes(project.title) && (
          <div className="mt-auto pt-4 border-t border-white/[0.05]">
            <Link 
              to={`/case-study/${project.title.toLowerCase()}`}
              data-cursor-hover
              className="inline-flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white transition-colors group"
            >
              <FileText size={14} className="text-white/20 group-hover:text-white/60 transition-colors" />
              <span className="uppercase tracking-wider">Read Case Study</span>
              <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          </div>
        )}
      </div>
      </motion.div>
    </div>
  );
}