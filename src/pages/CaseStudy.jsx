import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import ReactMarkdown from "react-markdown";
import mermaid from "mermaid";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import CustomCursor from "@/components/portfolio/CustomCursor";
import { caseStudies } from "@/data/caseStudies";

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  fontFamily: 'JetBrains Mono, monospace',
});

const MermaidChart = ({ chart }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      mermaid.render(`mermaid-svg-${Math.random().toString(36).substring(2)}`, chart)
        .then((result) => {
          if (chartRef.current) chartRef.current.innerHTML = result.svg;
        })
        .catch((e) => {
          console.error("Mermaid render error:", e);
          if (chartRef.current) chartRef.current.innerHTML = `<pre class="bg-white/5 p-4 rounded-xl text-sm overflow-x-auto">${chart}</pre>`;
        });
    }
  }, [chart]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex justify-center my-16 p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 shadow-[0_16px_64px_rgba(0,0,0,0.6)] overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
      <div className="absolute -inset-1/2 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-red-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
      <div ref={chartRef} className="relative z-10 w-full flex justify-center overflow-x-auto" />
    </motion.div>
  );
};

const AnimatedBlock = ({ children, as: Component = "div", className, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: 'transform, opacity' }}
    >
      <Component className={className} {...props}>{children}</Component>
    </motion.div>
  );
};

const StoryNode = ({ content }) => {
  const nodeRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: nodeRef,
    offset: ["start center", "end center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1.3, 1.3, 0.8]);
  const glow = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 20px rgba(255,255,255,0.8)", "0px 0px 20px rgba(255,255,255,0.8)", "0px 0px 0px rgba(255,255,255,0)"]);

  return (
    <div ref={nodeRef} className="relative pl-8 md:pl-24 mb-24 md:mb-32">
      {/* Timeline Dot */}
      <div className="absolute left-[-5px] md:left-[27px] top-12 z-20">
        <motion.div 
          style={{ opacity, scale, boxShadow: glow }}
          className="w-3 h-3 bg-white rounded-full transition-colors"
        />
      </div>
      
      {/* Content Reveal */}
      <div className="prose prose-invert prose-lg max-w-none 
        prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight
        prose-h2:text-4xl prose-h2:md:text-5xl prose-h2:mb-8 prose-h2:text-white
        prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6 prose-h3:text-white/90
        prose-p:text-white/60 prose-p:leading-relaxed prose-p:mb-8
        prose-ul:text-white/60 prose-ul:mb-8 prose-li:mb-4
        prose-strong:text-white prose-strong:font-semibold
        prose-a:text-white prose-a:underline-offset-4 hover:prose-a:text-white/80
        prose-hr:border-white/10 prose-hr:my-16"
      >
        <ReactMarkdown
          components={{
            h2: ({node, ...props}) => <AnimatedBlock as="h2" {...props} />,
            h3: ({node, ...props}) => <AnimatedBlock as="h3" {...props} />,
            p: ({node, ...props}) => <AnimatedBlock as="p" {...props} />,
            ul: ({node, ...props}) => <AnimatedBlock as="ul" {...props} />,
            img: ({node, ...props}) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="my-12 relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.5)] group"
              >
                <img {...props} className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105" />
              </motion.div>
            ),
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '')
              if (!inline && match && match[1] === 'mermaid') {
                return <MermaidChart chart={String(children).replace(/\n$/, '')} />
              }
              return <code className={className} {...props}>{children}</code>
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default function CaseStudy() {
  const { id } = useParams();
  const study = caseStudies[id?.toLowerCase()];
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const bannerY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const bannerOpacity = useTransform(heroScroll, [0, 1], [1, 0.3]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, [id]);

  if (!study) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#F2F2F2] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Case Study Not Found</h1>
          <Link to="/" className="text-white/50 hover:text-white underline underline-offset-4">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  // Parse markdown content by "## " to create timeline sections
  const sections = study.content.split(/(?=## )/).filter(Boolean);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F2F2F2] relative selection:bg-white/10">
      <CustomCursor />
      
      {/* Background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-white/5 blur-[60px] md:blur-[80px] will-change-[transform,opacity]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-[60px] md:blur-[80px] will-change-[transform,opacity]" />
      </div>

      {/* Hero Section */}
      <div ref={heroRef} className="relative z-10 w-full min-h-[60vh] flex flex-col items-center justify-center pt-32 pb-16 px-6 overflow-hidden">
        
        {/* Parallax Banner Background */}
        {study.banner && (
          <motion.div 
            style={{ y: bannerY, opacity: bannerOpacity }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/80 to-[#050505] z-10" />
            <img 
              src={study.banner} 
              alt={`${study.title} Banner`} 
              className="w-full h-full object-cover blur-[2px] scale-105"
            />
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 text-center max-w-4xl mx-auto"
        >
          <Link 
            to="/" 
            data-cursor-hover
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-sm uppercase tracking-wider">Back to Projects</span>
          </Link>

          <h1 className="text-6xl md:text-8xl font-heading font-bold tracking-tight text-white mb-8">
            {study.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-mono tracking-tight leading-relaxed max-w-3xl mx-auto">
            {study.tagline}
          </p>
          
          <div className="flex justify-center gap-4 pt-12">
            {study.github && (
              <a 
                href={study.github} 
                target="_blank" 
                rel="noopener noreferrer"
                data-cursor-hover
                className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium transition-colors"
              >
                <Github size={18} />
                <span>View Source</span>
              </a>
            )}
            {study.live && (
              <a 
                href={study.live} 
                target="_blank" 
                rel="noopener noreferrer"
                data-cursor-hover
                className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-white/90 hover:scale-105 transition-all"
              >
                <ExternalLink size={18} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>

      {/* Story Timeline Section */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        {/* The Track Line */}
        <div className="absolute left-6 md:left-[59px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        
        {sections.map((sec, idx) => (
          <StoryNode key={idx} content={sec} />
        ))}
        
        <div className="mt-32 pt-12 border-t border-white/10 text-center relative z-20">
          <p className="text-white/40 font-mono text-sm mb-6">Enjoyed this write-up?</p>
          <a 
            href="mailto:krrish.raj.chauhan@gmail.com" 
            data-cursor-hover
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 hover:scale-105 transition-all duration-300"
          >
            Let's build something together
          </a>
        </div>
      </div>
    </div>
  );
}
