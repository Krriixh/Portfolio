import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Github, Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];


function MagneticIcon({ children, href, label }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 40) {
      setPos({ x: dx * 0.35, y: dy * 0.35 });
    } else {
      setPos({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover
      data-cursor-text={label}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)`, transition: "transform 0.15s ease-out" }}
      className="text-white/40 hover:text-white transition-colors p-2 inline-block"
    >
      {children}
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? scrollY / totalHeight : 0);

      // ScrollSpy logic: Track only sections present in the navbar
      const navIds = NAV_ITEMS.map(item => item.href.slice(1));
      const sections = Array.from(document.querySelectorAll("section[id]")).filter(sec => navIds.includes(sec.getAttribute("id")));
      
      let currentActive = "";
      const viewportCenter = scrollY + window.innerHeight / 3;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        // Keep the section active until the next tracked section is reached
        if (viewportCenter >= sectionTop - 50) {
          currentActive = section.getAttribute("id");
        }
      });

      // Special case for the bottom of the page
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 50) {
        currentActive = "contact";
      }

      // Top of page edge case
      if (scrollY < 100) {
        currentActive = ""; // Show nothing in hero section
      }

      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-white/10 via-white/40 to-white/80 origin-left"
          style={{ transform: `scaleX(${scrollProgress})`, transition: "transform 0.1s linear" }}
        />
      </div>

      {/* Floating Glass Pill Navbar */}
      <nav 
        className={`fixed left-0 right-0 z-50 transition-all duration-[800ms] px-4 flex justify-center pointer-events-none ${
          scrolled ? "top-[calc(100%-5rem)]" : "top-6"
        }`}
      >
        <div className={`
          flex items-center justify-center gap-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto
          ${scrolled 
            ? "px-6 py-3 w-max bg-white/[0.05] backdrop-blur-2xl border border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-full" 
            : "px-6 py-4 w-max bg-transparent border-transparent rounded-full"
          }
        `}>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  data-cursor-hover
                  data-cursor-text="Go"
                  className={`px-4 py-2 text-[13px] font-body font-medium tracking-wide rounded-full transition-all duration-300 relative ${
                    isActive ? "text-white" : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-white/10 border border-white/[0.15] shadow-[0_4px_12px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.2)] rounded-full backdrop-blur-md"
                      transition={{ type: "spring", stiffness: 1200, damping: 45 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              )
            })}

            {/* Magnetic social icons */}
            <div className="flex items-center gap-1 ml-2 pl-4 border-l border-white/[0.1]">
              <MagneticIcon href="https://github.com/Krriixh" label="GitHub">
                <Github size={18} />
              </MagneticIcon>
              <MagneticIcon href="https://linkedin.com/in/krriishhx" label="LinkedIn">
                <Linkedin size={18} />
              </MagneticIcon>
            </div>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            data-cursor-hover
            data-cursor-text="Menu"
            className="md:hidden w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors pointer-events-auto"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: scrolled ? 20 : -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: scrolled ? 20 : -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed ${scrolled ? "bottom-[5.5rem]" : "top-24"} left-4 right-4 z-40 md:hidden overflow-hidden rounded-2xl bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 shadow-2xl p-4`}
          >
            <div className="space-y-2">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    className={`block w-full text-left px-4 py-3 rounded-xl text-sm transition-colors ${
                      isActive ? "bg-white text-black font-medium" : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </button>
                )
              })}
              
              <div className="flex items-center gap-4 pt-4 mt-2 border-t border-white/10 px-4">
                <a href="https://github.com/Krriixh" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white">
                  <Github size={20} />
                </a>
                <a href="https://linkedin.com/in/krriishhx" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}