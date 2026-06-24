import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const greetings = [
  "Hello",        // English
  "Hola",         // Spanish
  "Bonjour",      // French
  "Ciao",         // Italian
  "Namaste",      // Hindi
  "こんにちは",     // Japanese
  "안녕하세요",      // Korean
  "你好",          // Chinese
  "Привет",       // Russian
  "مرحبا"          // Arabic
];

export default function Preloader({ onComplete }) {
  const [index, setIndex] = useState(0);

  // Auto-advance logic (slower baseline)
  useEffect(() => {
    if (index >= greetings.length) {
      const timeout = setTimeout(() => {
        if (onComplete) onComplete();
      }, 400);
      return () => clearTimeout(timeout);
    }

    let duration = 800; // Much slower baseline transition
    if (index === 0) duration = 1200;
    if (index === greetings.length - 1) duration = 1000;

    const timeout = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, duration);

    return () => clearTimeout(timeout);
  }, [index, onComplete]);

  // Scroll-dependent speedup logic
  useEffect(() => {
    let scrollAccumulator = 0;
    const threshold = 60; // Pixels to scroll to force advance the word

    const handleWheel = (e) => {
      scrollAccumulator += Math.abs(e.deltaY);
      if (scrollAccumulator > threshold) {
        scrollAccumulator = 0;
        setIndex((prev) => Math.min(prev + 1, greetings.length));
      }
    };

    let lastTouchY = 0;
    const handleTouchStart = (e) => {
      lastTouchY = e.touches[0].clientY;
    };
    const handleTouchMove = (e) => {
      const currentY = e.touches[0].clientY;
      scrollAccumulator += Math.abs(currentY - lastTouchY);
      lastTouchY = currentY;
      if (scrollAccumulator > threshold) {
        scrollAccumulator = 0;
        setIndex((prev) => Math.min(prev + 1, greetings.length));
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ 
        y: "-100vh", 
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } 
      }}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-transparent text-foreground data-trace-bg"
    >
      <AnimatePresence mode="wait">
        {index < greetings.length && (
          <motion.div
            key={greetings[index]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex items-center gap-4 text-4xl md:text-5xl lg:text-7xl font-heading font-bold tracking-tight"
          >
            {/* An optional decorative dot matching the primary theme */}
            <span className="w-3 h-3 md:w-4 md:h-4 bg-white rounded-full inline-block shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
            {greetings[index]}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
