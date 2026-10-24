"use client";

import React from "react";
import { useStore } from "@/app/context/StoreContext";
import DynamicShoeCanvas from "@/components/three/DynamicShoeCanvas";
import { ArrowUpRight, Sparkles, Sliders, ShieldCheck, Leaf, Zap, Check } from "lucide-react";

const SIZES = ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"];

export default function HeroSection() {
  const {
    activeColorway,
    selectedSize,
    setSelectedSize,
    addToCart,
    formatPrice,
  } = useStore();

  const handleQuickAdd = () => {
    addToCart({
      id: `hero-${activeColorway.id}`,
      name: `Kinetix Pro 3D - ${activeColorway.name}`,
      category: "Sneakers",
      size: selectedSize,
      colorwayName: activeColorway.name,
      upperColor: activeColorway.upperColor,
      soleColor: activeColorway.soleColor,
      accentColor: activeColorway.accentColor,
      laceColor: activeColorway.laceColor,
      image: "/images/shoe-casual-green.jpg",
      price: activeColorway.price,
    });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center overflow-hidden bg-[#F8F7F2]"
    >
      {/* Subtle Background Radial Gradient in Forest & Sage */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#DCE8DE]/40 via-[#74866A]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          
          {/* LEFT COLUMN: Kinetic Editorial Storytelling & Quick Selectors (Cols 6) */}
          <div className="lg:col-span-6 space-y-6 z-10">
            
            {/* Top Atelier Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE8DE] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#174C3C] animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#174C3C]">
                KINETIX ATELIER • AUTUMN/WINTER 2026
              </span>
            </div>

            {/* Kinetic Typography */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-[#181818] tracking-tight leading-[1.08] uppercase">
                STEP INTO <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#174C3C] via-[#216b54] to-[#74866A]">
                  THE UNSEEN.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#181818]/75 font-normal max-w-xl leading-relaxed pt-1">
                Precision-engineered sustainable luxury footwear. Sculpted in 3D WebGL with recycled nitrogen soles, 
                ballistic carbon propulsion, and full-grain regenerative Italian nubuck.
              </p>
            </div>

            {/* Live Pricing & Specification Pills */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="px-5 py-2.5 rounded-2xl bg-white border border-[#DCE8DE] shadow-xs">
                <span className="text-[11px] text-[#74866A] uppercase tracking-wider font-semibold block">
                  Signature Edition
                </span>
                <span className="text-2xl font-bold text-[#181818]">
                  {formatPrice(activeColorway.price)}
                </span>
              </div>

              <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#DCE8DE]/40 border border-[#DCE8DE]">
                <div className="w-8 h-8 rounded-xl bg-[#174C3C] flex items-center justify-center text-[#F8F7F2]">
                  <Leaf className="w-4 h-4 text-[#DCE8DE]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#174C3C] block">100% Circular</span>
                  <span className="text-[11px] text-[#74866A]">Algae & Nitrogen Soles</span>
                </div>
              </div>
            </div>

            {/* Size Quick-Selector */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between text-xs font-semibold text-[#181818]">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#174C3C]" /> Select UK Size:
                </span>
                <span className="text-[#74866A]">True to size fit</span>
              </div>
              <div className="grid grid-cols-6 gap-2 max-w-md">
                {SIZES.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-xs font-bold rounded-xl transition-all border cursor-pointer ${
                        isSelected
                          ? "bg-[#174C3C] text-[#F8F7F2] border-[#174C3C] shadow-sm scale-102"
                          : "bg-white text-[#181818] border-[#DCE8DE] hover:border-[#74866A] hover:bg-[#F8F7F2]"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#customizer"
                className="px-8 py-4 rounded-2xl bg-[#174C3C] hover:bg-[#0f3328] text-[#F8F7F2] text-sm font-bold tracking-wide transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Sliders className="w-4 h-4 text-[#DCE8DE]" />
                Customize in 3D
              </a>

              <button
                onClick={handleQuickAdd}
                className="px-7 py-4 rounded-2xl bg-white hover:bg-[#F1EFEA] text-[#181818] border border-[#DCE8DE] text-sm font-bold tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Instant Order ({selectedSize})</span>
                <ArrowUpRight className="w-4 h-4 text-[#74866A]" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-3 flex flex-wrap items-center gap-5 text-xs text-[#74866A] border-t border-[#DCE8DE]/80">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#174C3C]" /> Handcrafted in Milan
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#174C3C]" /> 48h Express Shipping
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#174C3C]" /> 30-Day Risk-Free Trial
              </span>
            </div>

          </div>

          {/* RIGHT COLUMN: 3D Scroll-Reactive Viewport (Cols 6) */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
            
            {/* Ambient Back Glow Disk */}
            <div className="absolute w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] rounded-full bg-gradient-to-br from-[#DCE8DE] via-white to-[#74866A]/20 shadow-2xl -z-10 border border-white/60" />

            {/* 3D Canvas Container */}
            <div className="w-full relative z-10">
              <DynamicShoeCanvas
                scale={1.35}
                enablePresentation={true}
                mode="hero"
                heightClass="h-[450px] sm:h-[550px] w-full"
                initialRotation={[0.2, -Math.PI / 4, 0]}
              />
            </div>

            {/* Live Floating Colorway Card */}
            <div className="absolute bottom-2 sm:bottom-4 left-4 sm:left-8 px-4 py-3 rounded-2xl bg-white/90 backdrop-blur-md border border-[#DCE8DE] shadow-xl z-20 flex items-center gap-3">
              <div className="w-4 h-4 rounded-full border border-white shadow-xs" style={{ backgroundColor: activeColorway.upperColor }} />
              <div>
                <span className="text-[10px] text-[#74866A] font-bold uppercase tracking-wider block">
                  Active 3D Preset
                </span>
                <span className="text-xs font-bold text-[#181818] block">
                  {activeColorway.name}
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
