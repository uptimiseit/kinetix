"use client";

import React, { useState } from "react";
import { useStore, OccasionType } from "@/app/context/StoreContext";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, ShoppingBag, Sparkles, Check, ArrowRight, Shield, Layers, Tag } from "lucide-react";

interface OccasionData {
  id: OccasionType;
  title: string;
  tagline: string;
  modelImage: string;
  shoeName: string;
  shoePrice: number;
  shoeCategory: string;
  shoeThumb: string;
  outfitBreakdown: {
    top: { name: string; fabric: string; price: number; pinPos: { top: string; left: string } };
    bottom: { name: string; fabric: string; price: number; pinPos: { top: string; left: string } };
    footwear: { name: string; spec: string; price: number; pinPos: { top: string; left: string } };
  };
  variations: {
    id: string;
    name: string;
    hexPrimary: string;
    hexSecondary: string;
    tag: string;
    shoeImg: string;
  }[];
}

const OCCASIONS: OccasionData[] = [
  {
    id: "casual",
    title: "Casual Streetwear",
    tagline: "Relaxed Metropolitan Silhouette",
    modelImage: "/images/lookbook-casual.jpg",
    shoeName: "Kinetix Air Low - Forest Edition",
    shoePrice: 14999,
    shoeCategory: "Sneakers",
    shoeThumb: "/images/shoe-casual-green.jpg",
    outfitBreakdown: {
      top: {
        name: "Heavyweight French Terry Off-White Hoodie",
        fabric: "500 GSM Organic Combed Cotton",
        price: 7499,
        pinPos: { top: "32%", left: "48%" },
      },
      bottom: {
        name: "Dual-Tone Sage Utility Cargo Trousers",
        fabric: "Ripstop Cotton & Olive Cordura Accents",
        price: 8999,
        pinPos: { top: "62%", left: "54%" },
      },
      footwear: {
        name: "Kinetix Air Low - Forest Signature",
        spec: "Off-White Nubuck, Forest Swoosh & Recycled Cupsole",
        price: 14999,
        pinPos: { top: "91%", left: "68%" },
      },
    },
    variations: [
      {
        id: "var-c1",
        name: "Forest Evergreen (Signature)",
        hexPrimary: "#174C3C",
        hexSecondary: "#F8F7F2",
        tag: "Brand Signature",
        shoeImg: "/images/shoe-casual-green.jpg",
      },
      {
        id: "var-c2",
        name: "Sage Minimalist",
        hexPrimary: "#DCE8DE",
        hexSecondary: "#74866A",
        tag: "Tonal Earth",
        shoeImg: "/images/shoe-minimalist-sage.jpg",
      },
      {
        id: "var-c3",
        name: "Obsidian Stealth",
        hexPrimary: "#181818",
        hexSecondary: "#74866A",
        tag: "Street Stealth",
        shoeImg: "/images/shoe-runner-carbon.jpg",
      },
    ],
  },
  {
    id: "formal",
    title: "Executive Formal",
    tagline: "Bespoke Sartorial Tailoring",
    modelImage: "/images/lookbook-formal.jpg",
    shoeName: "Aurelia Handcrafted Oxford Loafer",
    shoePrice: 18499,
    shoeCategory: "Formal Loafers",
    shoeThumb: "/images/shoe-formal-oxford.jpg",
    outfitBreakdown: {
      top: {
        name: "Super 150s Wool Charcoal Bespoke Blazer",
        fabric: "100% Biella Italian Merino Wool with Olive Silk Tie",
        price: 24999,
        pinPos: { top: "34%", left: "42%" },
      },
      bottom: {
        name: "Single-Pleat Tapered Charcoal Suit Trousers",
        fabric: "Breathable Natural Stretch Worsted Wool",
        price: 11999,
        pinPos: { top: "64%", left: "46%" },
      },
      footwear: {
        name: "Aurelia Handcrafted Oxford Brogues",
        spec: "Burnished Espresso Calfskin & Hand-Carved Oak Sole",
        price: 18499,
        pinPos: { top: "90%", left: "48%" },
      },
    },
    variations: [
      {
        id: "var-f1",
        name: "Burnished Espresso Calfskin",
        hexPrimary: "#3b261b",
        hexSecondary: "#74866A",
        tag: "Atelier Classic",
        shoeImg: "/images/shoe-formal-oxford.jpg",
      },
      {
        id: "var-f2",
        name: "Jet Obsidian Polished Leather",
        hexPrimary: "#181818",
        hexSecondary: "#2c2c2c",
        tag: "Formal Black Tie",
        shoeImg: "/images/shoe-runner-carbon.jpg",
      },
      {
        id: "var-f3",
        name: "Cordovan Forest Patina",
        hexPrimary: "#174C3C",
        hexSecondary: "#3b261b",
        tag: "Collector Edition",
        shoeImg: "/images/shoe-casual-green.jpg",
      },
    ],
  },
  {
    id: "sport",
    title: "Pro Athleisure",
    tagline: "Kinetic Technical Aerodynamics",
    modelImage: "/images/lookbook-athleisure.jpg",
    shoeName: "Velocity Carbon Runner",
    shoePrice: 16999,
    shoeCategory: "Running",
    shoeThumb: "/images/shoe-runner-carbon.jpg",
    outfitBreakdown: {
      top: {
        name: "Matte Obsidian AeroTech Compression Quarter-Zip",
        fabric: "Moisture-Wicking Seamless Thermal Weave",
        price: 6499,
        pinPos: { top: "28%", left: "48%" },
      },
      bottom: {
        name: "Technical Olive & Charcoal Articulated Joggers",
        fabric: "4-Way Kinetic Stretch Nylon with Zippered Vents",
        price: 7999,
        pinPos: { top: "58%", left: "58%" },
      },
      footwear: {
        name: "Velocity Carbon Runner - Vortex Sole",
        spec: "Full-Length Carbon Shank & Nitrogen Cushion Foam",
        price: 16999,
        pinPos: { top: "86%", left: "72%" },
      },
    },
    variations: [
      {
        id: "var-s1",
        name: "Obsidian & Forest Shank",
        hexPrimary: "#181818",
        hexSecondary: "#174C3C",
        tag: "Race Day Ready",
        shoeImg: "/images/shoe-runner-carbon.jpg",
      },
      {
        id: "var-s2",
        name: "Cyber Volt Energy",
        hexPrimary: "#181818",
        hexSecondary: "#A3E635",
        tag: "Night Visibility",
        shoeImg: "/images/shoe-casual-green.jpg",
      },
      {
        id: "var-s3",
        name: "Pure Cloud White",
        hexPrimary: "#FFFFFF",
        hexSecondary: "#DCE8DE",
        tag: "Aerodynamic Clean",
        shoeImg: "/images/shoe-minimalist-sage.jpg",
      },
    ],
  },
];

export default function LookbookSection() {
  const { activeOccasion, setActiveOccasion, addToCart, formatPrice, selectedSize } = useStore();
  const [activeVarIdx, setActiveVarIdx] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<"top" | "bottom" | "footwear" | null>("footwear");

  const currentData = OCCASIONS.find((o) => o.id === activeOccasion) || OCCASIONS[0];
  const activeVar = currentData.variations[activeVarIdx] || currentData.variations[0];

  const handleOccasionChange = (occ: OccasionType) => {
    setActiveOccasion(occ);
    setActiveVarIdx(0);
    setActiveHotspot("footwear");
  };

  const handleAddEquippedShoe = () => {
    addToCart({
      id: `lookbook-${currentData.id}-${activeVar.id}`,
      name: `${currentData.shoeName} (${activeVar.name})`,
      category: currentData.shoeCategory,
      size: selectedSize,
      colorwayName: activeVar.name,
      upperColor: activeVar.hexPrimary,
      soleColor: "#F8F7F2",
      accentColor: activeVar.hexSecondary,
      laceColor: "#181818",
      image: activeVar.shoeImg,
      price: currentData.shoePrice,
    });
  };

  const totalOutfitPrice =
    currentData.outfitBreakdown.top.price +
    currentData.outfitBreakdown.bottom.price +
    currentData.outfitBreakdown.footwear.price;

  return (
    <section id="lookbook" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F8F7F2]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DCE8DE] text-xs font-semibold text-[#174C3C] uppercase tracking-widest shadow-2xs">
            <Eye className="w-3.5 h-3.5 text-[#74866A]" />
            <span>Virtual Model Lookbook</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#181818] tracking-tight">
            Style & Occasion Matcher
          </h2>
          <p className="text-sm sm:text-base text-[#181818]/70 max-w-2xl mx-auto leading-relaxed">
            Switch between lifestyle aesthetics to see the model’s entire outfit transition dynamically. 
            Tap the glowing interactive pins to inspect individual garments and acquire the fit instantly.
          </p>
        </div>

        {/* 3 Occasion Toggle Pills */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-[#DCE8DE] shadow-sm max-w-2xl w-full">
            {OCCASIONS.map((occ) => {
              const isSelected = activeOccasion === occ.id;
              return (
                <button
                  key={occ.id}
                  onClick={() => handleOccasionChange(occ.id)}
                  className={`flex-1 py-3 px-3 sm:px-5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    isSelected
                      ? "bg-[#174C3C] text-[#F8F7F2] shadow-md"
                      : "text-[#181818] hover:text-[#174C3C] hover:bg-[#DCE8DE]/20"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-[#DCE8DE]" : "bg-[#74866A]"}`} />
                  <span>{occ.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Split Screen Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT COLUMN: Occasion Controls & Shoe Selector (Cols 6) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE8DE] shadow-xl flex flex-col justify-between space-y-6">
            
            <div className="space-y-6">
              {/* Active Aesthetic Tag */}
              <div>
                <span className="text-[11px] font-bold text-[#74866A] uppercase tracking-wider block">
                  Current Vibe
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#181818] tracking-tight mt-0.5">
                  {currentData.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#181818]/65 font-medium mt-1">
                  {currentData.tagline}
                </p>
              </div>

              {/* Equipped Footwear Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#DCE8DE]/30 border border-[#DCE8DE] flex gap-4 items-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border border-[#DCE8DE] overflow-hidden shrink-0 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeVar.shoeImg}
                    alt={currentData.shoeName}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-[#174C3C] uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border border-[#DCE8DE] inline-block mb-1">
                    Equipped Footwear
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-[#181818] truncate">
                    {currentData.shoeName}
                  </h4>
                  <p className="text-xs text-[#74866A] line-clamp-1 mt-0.5">
                    {activeVar.name}
                  </p>
                  <span className="text-base font-bold text-[#181818] block mt-1">
                    {formatPrice(currentData.shoePrice)}
                  </span>
                </div>
              </div>

              {/* Color Sub-Swatches within this occasion */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#74866A] block">
                  Shoe Colorway Variation:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {currentData.variations.map((v, i) => {
                    const isSelected = activeVarIdx === i;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setActiveVarIdx(i)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#DCE8DE]/50 border-[#174C3C] ring-2 ring-[#174C3C]/20 shadow-xs"
                            : "bg-[#F8F7F2] border-[#DCE8DE] hover:border-[#74866A]"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs"
                            style={{ backgroundColor: v.hexPrimary }}
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs"
                            style={{ backgroundColor: v.hexSecondary }}
                          />
                        </div>
                        <span className="text-xs font-bold text-[#181818] block truncate">
                          {v.name.split(" ")[0]}
                        </span>
                        <span className="text-[10px] text-[#74866A] block truncate">
                          {v.tag}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Outfit Breakdown Details */}
              <div className="space-y-2.5 pt-2 border-t border-[#DCE8DE]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#74866A] block">
                  Complete Fit Ensemble
                </span>

                <div className="space-y-2">
                  <div
                    onClick={() => setActiveHotspot("top")}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      activeHotspot === "top"
                        ? "bg-[#DCE8DE]/40 border-[#174C3C]"
                        : "bg-[#F8F7F2] border-[#DCE8DE] hover:bg-white"
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold text-[#181818] block">
                        {currentData.outfitBreakdown.top.name}
                      </span>
                      <span className="text-[11px] text-[#74866A] block">
                        {currentData.outfitBreakdown.top.fabric}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#181818]">
                      {formatPrice(currentData.outfitBreakdown.top.price)}
                    </span>
                  </div>

                  <div
                    onClick={() => setActiveHotspot("bottom")}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      activeHotspot === "bottom"
                        ? "bg-[#DCE8DE]/40 border-[#174C3C]"
                        : "bg-[#F8F7F2] border-[#DCE8DE] hover:bg-white"
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold text-[#181818] block">
                        {currentData.outfitBreakdown.bottom.name}
                      </span>
                      <span className="text-[11px] text-[#74866A] block">
                        {currentData.outfitBreakdown.bottom.fabric}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#181818]">
                      {formatPrice(currentData.outfitBreakdown.bottom.price)}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* CTAs */}
            <div className="pt-4 space-y-3">
              <button
                onClick={handleAddEquippedShoe}
                className="w-full py-4 rounded-2xl bg-[#174C3C] hover:bg-[#0f3328] text-[#F8F7F2] text-sm font-bold tracking-wide transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <ShoppingBag className="w-4 h-4 text-[#DCE8DE]" />
                <span>Add Equipped Shoes to Bag ({formatPrice(currentData.shoePrice)})</span>
              </button>

              <div className="flex items-center justify-between px-2 text-xs text-[#74866A]">
                <span>Full Ensemble Total: <strong>{formatPrice(totalOutfitPrice)}</strong></span>
                <span className="text-[#174C3C] font-semibold">Available in atelier</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Full-Body Virtual Model Viewport with Framer Motion (Cols 6) */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-[#DCE8DE] bg-white shadow-xl min-h-[560px] sm:min-h-[640px] flex items-center justify-center">
            
            {/* AnimatePresence for smooth cross-fading model portrait */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentData.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.55, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentData.modelImage}
                  alt={`${currentData.title} Model Look`}
                  className="w-full h-full object-cover object-top"
                />

                {/* Gentle Studio Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818]/60 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </AnimatePresence>

            {/* Top Studio Label */}
            <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#DCE8DE] text-xs font-bold text-[#181818] shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#174C3C] animate-pulse" />
              <span>Virtual Studio 0{OCCASIONS.findIndex((o) => o.id === activeOccasion) + 1}</span>
            </div>

            {/* INTERACTIVE HOTSPOT PIN 1: TOP (Blazer/Hoodie) */}
            <div
              className="absolute z-20"
              style={{
                top: currentData.outfitBreakdown.top.pinPos.top,
                left: currentData.outfitBreakdown.top.pinPos.left,
              }}
            >
              <button
                onClick={() => setActiveHotspot(activeHotspot === "top" ? null : "top")}
                className="relative group p-2 rounded-full cursor-pointer focus:outline-none"
                aria-label="Inspect Top Garment"
              >
                <span className="absolute -inset-1 rounded-full bg-[#174C3C] opacity-40 animate-ping" />
                <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#174C3C] text-white border-2 border-white shadow-lg text-xs font-bold group-hover:scale-115 transition-transform">
                  1
                </span>
              </button>

              {activeHotspot === "top" && (
                <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-30 w-64 p-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#DCE8DE] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                  <span className="text-[10px] uppercase font-bold text-[#74866A] block">Garment 01</span>
                  <p className="text-xs font-bold text-[#181818] leading-snug">
                    {currentData.outfitBreakdown.top.name}
                  </p>
                  <p className="text-[11px] text-[#74866A] mt-0.5">
                    {currentData.outfitBreakdown.top.fabric}
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-[#DCE8DE]">
                    <span className="text-xs font-bold text-[#181818]">
                      {formatPrice(currentData.outfitBreakdown.top.price)}
                    </span>
                    <span className="text-[10px] text-[#174C3C] font-semibold">Matched Fit</span>
                  </div>
                </div>
              )}
            </div>

            {/* INTERACTIVE HOTSPOT PIN 2: BOTTOM (Trousers/Cargos) */}
            <div
              className="absolute z-20"
              style={{
                top: currentData.outfitBreakdown.bottom.pinPos.top,
                left: currentData.outfitBreakdown.bottom.pinPos.left,
              }}
            >
              <button
                onClick={() => setActiveHotspot(activeHotspot === "bottom" ? null : "bottom")}
                className="relative group p-2 rounded-full cursor-pointer focus:outline-none"
                aria-label="Inspect Trousers"
              >
                <span className="absolute -inset-1 rounded-full bg-[#74866A] opacity-40 animate-ping" />
                <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#74866A] text-white border-2 border-white shadow-lg text-xs font-bold group-hover:scale-115 transition-transform">
                  2
                </span>
              </button>

              {activeHotspot === "bottom" && (
                <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-30 w-64 p-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#DCE8DE] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                  <span className="text-[10px] uppercase font-bold text-[#74866A] block">Garment 02</span>
                  <p className="text-xs font-bold text-[#181818] leading-snug">
                    {currentData.outfitBreakdown.bottom.name}
                  </p>
                  <p className="text-[11px] text-[#74866A] mt-0.5">
                    {currentData.outfitBreakdown.bottom.fabric}
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-[#DCE8DE]">
                    <span className="text-xs font-bold text-[#181818]">
                      {formatPrice(currentData.outfitBreakdown.bottom.price)}
                    </span>
                    <span className="text-[10px] text-[#174C3C] font-semibold">Matched Fit</span>
                  </div>
                </div>
              )}
            </div>

            {/* INTERACTIVE HOTSPOT PIN 3: FOOTWEAR */}
            <div
              className="absolute z-20"
              style={{
                top: currentData.outfitBreakdown.footwear.pinPos.top,
                left: currentData.outfitBreakdown.footwear.pinPos.left,
              }}
            >
              <button
                onClick={() => setActiveHotspot(activeHotspot === "footwear" ? null : "footwear")}
                className="relative group p-2 rounded-full cursor-pointer focus:outline-none"
                aria-label="Inspect Footwear"
              >
                <span className="absolute -inset-1 rounded-full bg-[#174C3C] opacity-60 animate-ping" />
                <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#174C3C] text-[#DCE8DE] border-2 border-white shadow-xl text-xs font-bold group-hover:scale-115 transition-transform">
                  ★
                </span>
              </button>

              {activeHotspot === "footwear" && (
                <div className="absolute bottom-11 left-1/2 -translate-x-1/2 z-30 w-72 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#DCE8DE] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#F8F7F2] border border-[#DCE8DE] overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={activeVar.shoeImg} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-bold text-[#174C3C] block">
                        Equipped Shoes
                      </span>
                      <h5 className="text-xs font-bold text-[#181818] truncate">
                        {currentData.shoeName}
                      </h5>
                      <span className="text-xs font-bold text-[#181818] block">
                        {formatPrice(currentData.shoePrice)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleAddEquippedShoe}
                    className="w-full mt-3 py-2 rounded-xl bg-[#174C3C] hover:bg-[#0f3328] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#DCE8DE]" />
                    <span>Quick Add to Bag</span>
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Caption Pill */}
            <div className="absolute bottom-4 left-4 right-4 z-20 p-3 rounded-2xl bg-white/90 backdrop-blur-md border border-[#DCE8DE] shadow-lg flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#74866A] font-bold uppercase tracking-wider block">
                  Interactive Lookbook
                </span>
                <span className="text-xs font-bold text-[#181818]">
                  Tap Pins 1, 2, or ★ to inspect garments
                </span>
              </div>
              <button
                onClick={handleAddEquippedShoe}
                className="px-3.5 py-1.5 rounded-xl bg-[#174C3C] text-white text-xs font-semibold flex items-center gap-1 hover:bg-[#0f3328] transition-colors cursor-pointer"
              >
                <span>Buy Shoes</span>
                <ArrowRight className="w-3 h-3 text-[#DCE8DE]" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
