"use client";

import React, { useState } from "react";
import { useStore, PRESET_COLORWAYS, MeshPartType } from "@/app/context/StoreContext";
import DynamicShoeCanvas from "@/components/three/DynamicShoeCanvas";
import { Sliders, Check, ShoppingBag, Sparkles, RefreshCw, Palette, Layers } from "lucide-react";

const SWATCH_PALETTE = [
  { name: "Forest Green", hex: "#174C3C", badge: "Primary" },
  { name: "Off-White", hex: "#F8F7F2", badge: "Background" },
  { name: "Charcoal Black", hex: "#181818", badge: "Stealth" },
  { name: "Sage Green", hex: "#DCE8DE", badge: "Secondary" },
  { name: "Olive Earth", hex: "#74866A", badge: "Accent" },
  { name: "Pure White", hex: "#FFFFFF", badge: "Clean" },
  { name: "Cyber Volt", hex: "#A3E635", badge: "Neon" },
  { name: "Royal Mocha", hex: "#4A3728", badge: "Leather" },
  { name: "Crimson Apex", hex: "#DC2626", badge: "Racing" },
  { name: "Cobalt Blue", hex: "#1E3A8A", badge: "Electric" },
];

const MESH_TABS: { id: MeshPartType; label: string; desc: string }[] = [
  { id: "upper", label: "1. Upper Body", desc: "Regenerative Italian Nubuck & Mesh" },
  { id: "sole", label: "2. Cushion Sole", desc: "Nitrogen Foam & Algae Rubber" },
  { id: "accent", label: "3. Flank Accent", desc: "Aerodynamic Swoosh & Stabilizer" },
  { id: "laces", label: "4. Woven Laces", desc: "High-Tensile Organic Recycled Cord" },
];

const SIZES = ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"];

export default function CustomizerSection() {
  const {
    activeColorway,
    setPresetColorway,
    updateMeshPartColor,
    activeMeshPart,
    setActiveMeshPart,
    selectedSize,
    setSelectedSize,
    addToCart,
    formatPrice,
  } = useStore();

  const [activeTabMode, setActiveTabMode] = useState<"presets" | "parts">("presets");
  const [justAdded, setJustAdded] = useState(false);

  const handleAddCustomToBag = () => {
    addToCart({
      id: `custom-${Date.now()}`,
      name: `Kinetix 3D Bespoke (${activeColorway.name})`,
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
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const currentPartColor =
    activeMeshPart === "upper"
      ? activeColorway.upperColor
      : activeMeshPart === "sole"
      ? activeColorway.soleColor
      : activeMeshPart === "accent"
      ? activeColorway.accentColor
      : activeColorway.laceColor;

  return (
    <section
      id="customizer"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#DCE8DE]/30 border-y border-[#DCE8DE] relative"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DCE8DE] text-xs font-semibold text-[#174C3C] uppercase tracking-widest shadow-2xs">
            <Sliders className="w-3.5 h-3.5 text-[#74866A]" />
            <span>Interactive 3D Material Lab</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#181818] tracking-tight">
            Multi-Zone 3D Shoe Customizer
          </h2>
          <p className="text-sm sm:text-base text-[#181818]/70 max-w-2xl mx-auto leading-relaxed">
            Click color swatches to dynamically tween individual 3D mesh zones (Sole, Upper, Accent, Laces) in real time. 
            Drag the canvas to orbit 360° and inspect every seam.
          </p>
        </div>

        {/* Studio Grid: 3D Canvas (Left) + Customizer Panel (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: 3D Interactive Inspection Canvas (Cols 7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#DCE8DE] shadow-xl relative overflow-hidden flex flex-col justify-between">
            {/* Top Canvas Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#DCE8DE]/70 z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#174C3C] animate-pulse" />
                <span className="text-xs font-bold text-[#181818] uppercase tracking-wider">
                  Live 3D Viewport
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#74866A]">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>360° Orbit Controls Active</span>
              </div>
            </div>

            {/* 3D Canvas */}
            <div className="relative py-4">
              <DynamicShoeCanvas
                scale={1.35}
                enablePresentation={true}
                mode="customizer"
                heightClass="h-[460px] sm:h-[520px] w-full"
                initialRotation={[0.2, -Math.PI / 3, 0]}
              />
            </div>

            {/* Bottom 4-Zone Live Color Readout */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#DCE8DE]/70 z-10">
              <div className="p-3 rounded-2xl bg-[#F8F7F2] border border-[#DCE8DE]">
                <span className="text-[10px] text-[#74866A] uppercase font-bold block">Upper Zone</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs" style={{ backgroundColor: activeColorway.upperColor }} />
                  <span className="text-xs font-bold text-[#181818] font-mono">{activeColorway.upperColor}</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#F8F7F2] border border-[#DCE8DE]">
                <span className="text-[10px] text-[#74866A] uppercase font-bold block">Sole Zone</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs" style={{ backgroundColor: activeColorway.soleColor }} />
                  <span className="text-xs font-bold text-[#181818] font-mono">{activeColorway.soleColor}</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#F8F7F2] border border-[#DCE8DE]">
                <span className="text-[10px] text-[#74866A] uppercase font-bold block">Accent Stripe</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs" style={{ backgroundColor: activeColorway.accentColor }} />
                  <span className="text-xs font-bold text-[#181818] font-mono">{activeColorway.accentColor}</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#F8F7F2] border border-[#DCE8DE]">
                <span className="text-[10px] text-[#74866A] uppercase font-bold block">Woven Laces</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs" style={{ backgroundColor: activeColorway.laceColor }} />
                  <span className="text-xs font-bold text-[#181818] font-mono">{activeColorway.laceColor}</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Customizer Controls Panel (Cols 5) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE8DE] shadow-xl space-y-6">
            
            {/* Mode Switcher: Presets vs Part-by-Part */}
            <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#F8F7F2] border border-[#DCE8DE]">
              <button
                onClick={() => setActiveTabMode("presets")}
                className={`py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTabMode === "presets"
                    ? "bg-[#174C3C] text-[#F8F7F2] shadow-sm"
                    : "text-[#181818] hover:text-[#174C3C]"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Curated Presets
              </button>

              <button
                onClick={() => setActiveTabMode("parts")}
                className={`py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTabMode === "parts"
                    ? "bg-[#174C3C] text-[#F8F7F2] shadow-sm"
                    : "text-[#181818] hover:text-[#174C3C]"
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                Part-by-Part
              </button>
            </div>

            {/* MODE 1: Curated Multi-Colorway Presets */}
            {activeTabMode === "presets" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#74866A]">
                    Select Signature Preset
                  </span>
                  <span className="text-xs text-[#181818]/60 font-medium">7 Signature Editions</span>
                </div>

                <div className="space-y-2.5">
                  {PRESET_COLORWAYS.map((preset) => {
                    const isSelected = activeColorway.id === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => setPresetColorway(preset.id)}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? "bg-[#DCE8DE]/40 border-[#174C3C] shadow-sm scale-101"
                            : "bg-[#F8F7F2] border-[#DCE8DE] hover:border-[#74866A] hover:bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* 4-Color Swatch Preview Circle */}
                          <div className="w-9 h-9 rounded-full overflow-hidden border border-black/15 shadow-2xs flex flex-wrap shrink-0">
                            <span className="w-1/2 h-1/2" style={{ backgroundColor: preset.upperColor }} />
                            <span className="w-1/2 h-1/2" style={{ backgroundColor: preset.accentColor }} />
                            <span className="w-1/2 h-1/2" style={{ backgroundColor: preset.soleColor }} />
                            <span className="w-1/2 h-1/2" style={{ backgroundColor: preset.laceColor }} />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-[#181818] block">
                              {preset.name}
                            </span>
                            <span className="text-[11px] text-[#74866A] block line-clamp-1">
                              {preset.description}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0 pl-2">
                          <span className="text-xs font-bold text-[#181818] block">
                            {formatPrice(preset.price)}
                          </span>
                          {isSelected && (
                            <span className="text-[10px] text-[#174C3C] font-semibold flex items-center gap-1 justify-end">
                              <Check className="w-3 h-3" /> Active
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* MODE 2: Part-by-Part Customizer Tabs */}
            {activeTabMode === "parts" && (
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#74866A] block">
                  Select Mesh Zone to Color
                </span>

                {/* 4 Part Pills */}
                <div className="grid grid-cols-2 gap-2">
                  {MESH_TABS.map((part) => {
                    const isSelected = activeMeshPart === part.id;
                    return (
                      <button
                        key={part.id}
                        onClick={() => setActiveMeshPart(part.id)}
                        className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#174C3C] text-[#F8F7F2] border-[#174C3C] shadow-xs"
                            : "bg-[#F8F7F2] text-[#181818] border-[#DCE8DE] hover:border-[#74866A]"
                        }`}
                      >
                        <span className="text-xs font-bold block">{part.label}</span>
                        <span
                          className={`text-[10px] block truncate ${
                            isSelected ? "text-[#DCE8DE]" : "text-[#74866A]"
                          }`}
                        >
                          {part.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Swatch Palette Grid */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#181818]">
                      Apply Color to <span className="text-[#174C3C] uppercase">{activeMeshPart}</span>
                    </span>
                    <span className="text-xs font-mono font-bold text-[#74866A]">{currentPartColor}</span>
                  </div>

                  <div className="grid grid-cols-5 gap-2.5 pt-1">
                    {SWATCH_PALETTE.map((swatch) => {
                      const isActive =
                        currentPartColor.toLowerCase() === swatch.hex.toLowerCase();
                      return (
                        <button
                          key={swatch.hex}
                          onClick={() => updateMeshPartColor(activeMeshPart, swatch.hex)}
                          className={`group flex flex-col items-center p-2 rounded-xl border transition-all cursor-pointer ${
                            isActive
                              ? "border-[#174C3C] bg-[#DCE8DE]/40 ring-2 ring-[#174C3C]/30 scale-105"
                              : "border-[#DCE8DE] hover:border-[#74866A] bg-white"
                          }`}
                          title={`${swatch.name} (${swatch.hex})`}
                        >
                          <span
                            className="w-7 h-7 rounded-full border border-black/15 shadow-xs flex items-center justify-center transition-transform group-hover:scale-110"
                            style={{ backgroundColor: swatch.hex }}
                          >
                            {isActive && (
                              <Check
                                className={`w-3.5 h-3.5 ${
                                  ["#F8F7F2", "#FFFFFF", "#DCE8DE"].includes(swatch.hex)
                                    ? "text-[#181818]"
                                    : "text-white"
                                }`}
                              />
                            )}
                          </span>
                          <span className="text-[10px] font-medium text-[#181818] truncate w-full text-center mt-1">
                            {swatch.name.split(" ")[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div className="space-y-2 pt-2 border-t border-[#DCE8DE]">
              <div className="flex items-center justify-between text-xs font-semibold text-[#181818]">
                <span>Choose Size (UK)</span>
                <span className="text-[#74866A]">Standard Width (D)</span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 text-xs font-bold rounded-xl transition-all border cursor-pointer ${
                      selectedSize === size
                        ? "bg-[#174C3C] text-[#F8F7F2] border-[#174C3C] shadow-xs"
                        : "bg-[#F8F7F2] text-[#181818] border-[#DCE8DE] hover:border-[#74866A]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary & Add to Bag CTA */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8F7F2] border border-[#DCE8DE]">
                <div>
                  <span className="text-[11px] text-[#74866A] font-bold uppercase tracking-wider block">
                    Bespoke Atelier Total
                  </span>
                  <span className="text-xl font-bold text-[#181818]">
                    {formatPrice(activeColorway.price)}
                  </span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#174C3C]/10 text-[#174C3C] font-semibold">
                  Free Express Shipping
                </span>
              </div>

              <button
                onClick={handleAddCustomToBag}
                className="w-full py-4 rounded-2xl bg-[#174C3C] hover:bg-[#0f3328] text-[#F8F7F2] text-sm font-bold tracking-wide transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <ShoppingBag className="w-4 h-4 text-[#DCE8DE]" />
                <span>{justAdded ? "Added to Shopping Bag!" : "Add Custom Colorway to Bag"}</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
