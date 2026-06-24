import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Outer ring spring (smooth, slight lag for elegance)
  const ringX = useSpring(mouseX, { stiffness: 1500, damping: 40, mass: 0.1 });
  const ringY = useSpring(mouseY, { stiffness: 1500, damping: 40, mass: 0.1 });

  // Inner dot spring (very snappy)
  const dotX = useSpring(mouseX, { stiffness: 3000, damping: 40, mass: 0.05 });
  const dotY = useSpring(mouseY, { stiffness: 3000, damping: 40, mass: 0.05 });

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setHidden(false);
    };

    const down = () => setClicked(true);
    const up = () => setClicked(false);
    const leave = () => setHidden(true);
    const enter = () => setHidden(false);

    const addHover = () => {
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
        const text = el.getAttribute("data-cursor-text") || (el.tagName.toLowerCase() === 'a' ? "Open" : "Click");
        
        const onEnter = () => {
          setHovered(true);
          setCursorText(text);
        };
        const onLeave = () => {
          setHovered(false);
          setCursorText("");
        };
        
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);

    addHover();
    const observer = new MutationObserver(addHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
      observer.disconnect();
    };
  }, [mouseX, mouseY]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const ringSize = clicked ? 24 : hovered ? 80 : 36;
  const dotSize = clicked ? 0 : hovered ? 0 : 4;

  return (
    <>
      {/* Stylish Outer Ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center overflow-hidden rounded-full transition-shadow duration-300"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: hidden ? 0 : 1,
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          backgroundColor: hovered ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0)",
          backdropFilter: hovered ? "blur(4px) brightness(1.05)" : "blur(1.5px) brightness(1.05)",
          WebkitBackdropFilter: hovered ? "blur(4px) brightness(1.05)" : "blur(1.5px) brightness(1.05)",
          borderColor: hovered ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.25)",
          borderWidth: 1,
          boxShadow: hovered ? "0 4px 20px rgba(255,255,255,0.05)" : "0 0 10px rgba(255,255,255,0.02)"
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.5 }}
          className="text-[10px] text-white font-mono font-bold tracking-widest uppercase absolute drop-shadow-md"
        >
          {cursorText}
        </motion.span>
      </motion.div>

      {/* Snappy Inner Dot */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] bg-white rounded-full mix-blend-exclusion"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: hidden || hovered ? 0 : 1,
        }}
        animate={{
          width: dotSize,
          height: dotSize,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 30 }}
      />
    </>
  );
}
