"use client";

import { useEffect, useState } from "react";

export function InteractiveSideGlow() {
  const [scrollY, setScrollY] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    // We only execute this code on the client side
    const handleScroll = () => {
        setScrollY(window.scrollY);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
        // Calculate vertical mouse position relative to center of screen (-1 to 1)
        const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;
        setMouseY(normalizedY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Left Glow */}
      <div 
        className="absolute left-[-250px] top-[10%] w-[500px] h-[800px] bg-[#FF0000]/15 rounded-full blur-[150px] transition-transform duration-[1500ms] ease-out will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.15 + mouseY * 60}px)` }}
      />
      
      {/* Right Glow */}
      <div 
        className="absolute right-[-250px] top-[40%] w-[500px] h-[800px] bg-[#FF0000]/15 rounded-full blur-[150px] transition-transform duration-[2000ms] ease-out will-change-transform"
        style={{ transform: `translateY(${scrollY * -0.1 + mouseY * -100}px)` }}
      />
    </div>
  );
}
