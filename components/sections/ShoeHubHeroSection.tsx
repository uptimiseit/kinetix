"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

// 4 Character Figurine Items with Brand Forest Green on top (index 0)
const IMAGES = [
  { src: "/hero/green.png", bg: "#174C3C", panel: "#216b54", name: "Forest Green" },
  { src: "/hero/orange.png", bg: "#C56B48", panel: "#D87E5B", name: "Terracotta" },
  { src: "/hero/pink.png", bg: "#A65B79", panel: "#B96D8B", name: "Dusty Rose" },
  { src: "/hero/blue.png", bg: "#3D6682", panel: "#4E7793", name: "Slate Blue" },
];

export default function ShoeHubHeroSection() {
  const [activeIndex, setActiveIndex] = useState(0); // green is on top
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Preload all 4 images on mount
  useEffect(() => {
    IMAGES.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-advance hero slider every 2.8 seconds (2-3 second cycle)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4);
    }, 2800);

    return () => clearInterval(timer);
  }, [activeIndex]);

  // Navigation handler with 650ms lock
  const navigate = (direction: "next" | "prev") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (direction === "next" ? (prev + 1) % 4 : (prev + 3) % 4));
    setTimeout(() => {
      setIsAnimating(false);
    }, 650);
  };

  // Roles derived from activeIndex
  const getRole = (index: number) => {
    if (index === activeIndex) return "center";
    if (index === (activeIndex + 3) % 4) return "left";
    if (index === (activeIndex + 1) % 4) return "right";
    return "back";
  };

  // Per-role dynamic styles - Centered in viewport
  const getItemStyle = (role: "center" | "left" | "right" | "back") => {
    const baseTransition =
      "transform 650ms cubic-bezier(0.4, 0, 0.2, 1), filter 650ms cubic-bezier(0.4, 0, 0.2, 1), opacity 650ms cubic-bezier(0.4, 0, 0.2, 1), left 650ms cubic-bezier(0.4, 0, 0.2, 1), top 650ms cubic-bezier(0.4, 0, 0.2, 1)";

    switch (role) {
      case "center":
        return {
          position: "absolute" as const,
          aspectRatio: "0.6 / 1",
          transform: `translate(-50%, -50%) scale(${isMobile ? 1.05 : 1.25})`,
          filter: "none",
          opacity: 1,
          zIndex: 20,
          left: "50%",
          top: "48%",
          height: isMobile ? "50%" : "62%",
          transition: baseTransition,
          willChange: "transform, filter, opacity",
        };
      case "left":
        return {
          position: "absolute" as const,
          aspectRatio: "0.6 / 1",
          transform: "translate(-50%, -50%) scale(0.9)",
          filter: "blur(2px)",
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? "18%" : "28%",
          top: "53%",
          height: isMobile ? "22%" : "34%",
          transition: baseTransition,
          willChange: "transform, filter, opacity",
        };
      case "right":
        return {
          position: "absolute" as const,
          aspectRatio: "0.6 / 1",
          transform: "translate(-50%, -50%) scale(0.9)",
          filter: "blur(2px)",
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? "82%" : "72%",
          top: "53%",
          height: isMobile ? "22%" : "34%",
          transition: baseTransition,
          willChange: "transform, filter, opacity",
        };
      case "back":
        return {
          position: "absolute" as const,
          aspectRatio: "0.6 / 1",
          transform: "translate(-50%, -50%) scale(0.7)",
          filter: "blur(4px)",
          opacity: 0.75,
          zIndex: 5,
          left: "50%",
          top: "43%",
          height: isMobile ? "16%" : "26%",
          transition: baseTransition,
          willChange: "transform, filter, opacity",
        };
    }
  };

  // Fractal noise grain SVG data URI
  const grainSvgUri = `data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)" opacity="0.08"/></svg>`;

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: IMAGES[activeIndex].bg,
        transition: "background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="relative w-full" style={{ height: "100vh", overflow: "hidden" }}>
        
        {/* 1. Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 50,
            opacity: 0.35,
            backgroundImage: `url('${grainSvgUri}')`,
            backgroundSize: "200px 200px",
            backgroundRepeat: "repeat",
          }}
        />


        {/* 3. Carousel (Shoes Centered) */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {IMAGES.map((item, idx) => {
            const role = getRole(idx);
            const style = getItemStyle(role);

            return (
              <div key={item.src} style={style}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={`ShoeHub Character ${idx + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "center center",
                  }}
                  draggable={false}
                />
              </div>
            );
          })}
        </div>

        {/* 4. Bottom-left text + nav buttons (Moved up) */}
        <div
          className="absolute bottom-16 left-6 sm:bottom-36 sm:left-20"
          style={{ zIndex: 60, maxWidth: "340px" }}
        >
          <p
            className="font-bold uppercase tracking-widest mb-2 sm:mb-3 text-base sm:text-[22px] text-white"
            style={{ opacity: 0.95, letterSpacing: "0.02em" }}
          >
            KINETIX FIGURINES
          </p>

          <p
            className="hidden sm:block text-xs sm:text-sm text-white/90 mb-4 sm:mb-5 leading-relaxed"
            style={{ lineHeight: 1.6 }}
          >
            The artwork is stunning, shipped fully prepared. The finish is a vision, the 3D craft is
            flawless. Many thanks! Wishing you the win. Order now.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("prev")}
              disabled={isAnimating}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white border-2 border-white transition-all cursor-pointer hover:scale-108 hover:bg-white/15 active:scale-95 disabled:opacity-50 shadow-md"
              style={{
                backgroundColor: "transparent",
                transition: "transform 150ms, background-color 150ms",
              }}
              aria-label="Previous Figurine"
            >
              <ArrowLeft className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.25} />
            </button>

            <button
              onClick={() => navigate("next")}
              disabled={isAnimating}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white border-2 border-white transition-all cursor-pointer hover:scale-108 hover:bg-white/15 active:scale-95 disabled:opacity-50 shadow-md"
              style={{
                backgroundColor: "transparent",
                transition: "transform 150ms, background-color 150ms",
              }}
              aria-label="Next Figurine"
            >
              <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.25} />
            </button>
          </div>
        </div>

        {/* 5. Bottom-right link "DISCOVER IT" */}
        <div
          className="absolute bottom-16 right-6 sm:bottom-36 sm:right-16"
          style={{ zIndex: 60 }}
        >
          <a
            href="#customizer"
            className="group flex items-center gap-2 text-white uppercase no-underline transition-opacity duration-200"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(20px, 4vw, 56px)",
              fontWeight: 400,
              opacity: 0.95,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            <span className="group-hover:opacity-100 transition-opacity">DISCOVER IT</span>
            <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8 group-hover:translate-x-1.5 transition-transform" strokeWidth={2.25} />
          </a>
        </div>

      </div>
    </section>
  );
}
