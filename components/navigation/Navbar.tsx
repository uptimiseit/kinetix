"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "@/app/context/StoreContext";
import { ShoppingBag, Sparkles, Compass, Sliders, Eye, Footprints, Layers } from "lucide-react";

export default function Navbar() {
  const { cart, setIsCartOpen, activeColorway } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#F8F7F2]/90 backdrop-blur-md border-b border-[#DCE8DE]/70 shadow-xs py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#174C3C] flex items-center justify-center text-[#F8F7F2] shadow-md group-hover:scale-105 transition-transform duration-200">
            <Footprints className="w-5 h-5 text-[#DCE8DE]" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-widest text-[#181818] text-base uppercase font-sans">
              KINETIX <span className="text-[#174C3C] font-normal">ATELIER</span>
            </span>
            <span className="text-[10px] tracking-widest uppercase text-[#74866A] font-medium">
              Precision 3D Footwear
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/80 border border-[#DCE8DE]/70 shadow-2xs backdrop-blur-md">
          <a
            href="#hero"
            className="px-4 py-1.5 text-xs font-medium text-[#181818] hover:text-[#174C3C] hover:bg-[#DCE8DE]/30 rounded-full transition-colors flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-[#74866A]" />
            Motion
          </a>
          <a
            href="#customizer"
            className="px-4 py-1.5 text-xs font-medium text-[#181818] hover:text-[#174C3C] hover:bg-[#DCE8DE]/30 rounded-full transition-colors flex items-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5 text-[#74866A]" />
            3D Studio
          </a>
          <a
            href="#lookbook"
            className="px-4 py-1.5 text-xs font-medium text-[#181818] hover:text-[#174C3C] hover:bg-[#DCE8DE]/30 rounded-full transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-[#74866A]" />
            Style Matcher
          </a>
          <a
            href="#anatomy"
            className="px-4 py-1.5 text-xs font-medium text-[#181818] hover:text-[#174C3C] hover:bg-[#DCE8DE]/30 rounded-full transition-colors flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-[#74866A]" />
            3D Anatomy
          </a>
          <a
            href="#collection"
            className="px-4 py-1.5 text-xs font-medium text-[#181818] hover:text-[#174C3C] hover:bg-[#DCE8DE]/30 rounded-full transition-colors"
          >
            Collection
          </a>
        </nav>

        {/* Right Action Bar (Color Pill + Bag Button) */}
        <div className="flex items-center gap-3">
          {/* Active Colorway Pill Indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-[#DCE8DE] shadow-2xs">
            <div className="flex -space-x-1 items-center">
              <span
                className="w-3.5 h-3.5 rounded-full border border-white shadow-xs"
                style={{ backgroundColor: activeColorway.upperColor }}
                title="Upper"
              />
              <span
                className="w-3.5 h-3.5 rounded-full border border-white shadow-xs"
                style={{ backgroundColor: activeColorway.accentColor }}
                title="Accent"
              />
              <span
                className="w-3.5 h-3.5 rounded-full border border-white shadow-xs"
                style={{ backgroundColor: activeColorway.soleColor }}
                title="Sole"
              />
            </div>
            <span className="text-[11px] font-semibold text-[#181818] max-w-[110px] truncate">
              {activeColorway.name.split(" ")[0]}
            </span>
          </div>

          {/* Cart Trigger Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative px-4 py-2 rounded-full bg-[#174C3C] hover:bg-[#0f3328] text-[#F8F7F2] text-xs font-semibold tracking-wide transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
            aria-label="Open Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4 text-[#DCE8DE]" />
            <span className="hidden sm:inline">Bag</span>
            <span className="w-5 h-5 rounded-full bg-[#DCE8DE] text-[#174C3C] text-[11px] font-bold flex items-center justify-center">
              {totalCartCount}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}
