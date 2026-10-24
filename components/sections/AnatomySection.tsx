"use client";

import React from "react";
import { useStore } from "@/app/context/StoreContext";
import DynamicShoeCanvas from "@/components/three/DynamicShoeCanvas";
import { Layers, Activity, Zap, Shield, Sparkles, Sliders } from "lucide-react";

export default function AnatomySection() {
  const { isCustomizerExploded, setIsCustomizerExploded } = useStore();

  return (
    <section
      id="anatomy"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#181818] text-[#F8F7F2] relative overflow-hidden"
    >
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#174C3C]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-[#74866A]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#174C3C]/40 border border-[#74866A]/50 text-xs font-semibold text-[#DCE8DE] uppercase tracking-widest shadow-2xs backdrop-blur-md">
            <Layers className="w-3.5 h-3.5 text-[#DCE8DE]" />
            <span>Proprietary Biomechanical Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F8F7F2] tracking-tight">
            Exploded 3D Anatomy & Tech
          </h2>
          <p className="text-sm sm:text-base text-[#DCE8DE]/70 max-w-2xl mx-auto leading-relaxed">
            Every layer of Kinetix footwear is articulated for peak energy return and orthopedic alignment. 
            Toggle the exploded view to inspect our nitrogen cushion matrix and carbon chassis.
          </p>
        </div>

        {/* View Mode Toggle Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsCustomizerExploded((prev) => !prev)}
            className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all shadow-xl flex items-center gap-2.5 cursor-pointer border ${
              isCustomizerExploded
                ? "bg-[#174C3C] text-white border-[#DCE8DE] ring-4 ring-[#174C3C]/30 scale-102"
                : "bg-white/10 hover:bg-white/20 text-[#DCE8DE] border-white/20"
            }`}
          >
            <Sliders className="w-4 h-4 text-[#DCE8DE]" />
            <span>
              {isCustomizerExploded ? "Exploded State Active (Click to Assemble)" : "Click to Explode 3D Anatomy"}
            </span>
            <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-ping" />
          </button>
        </div>

        {/* 3D Exploded Viewport */}
        <div className="relative rounded-3xl bg-[#1f1f1f]/80 border border-white/10 p-6 sm:p-8 backdrop-blur-md shadow-2xl mb-12">
          
          <DynamicShoeCanvas
            scale={1.4}
            enablePresentation={true}
            showAnnotations={true}
            mode="anatomy"
            heightClass="h-[480px] sm:h-[580px] w-full"
            initialRotation={[0.15, -Math.PI / 4, 0]}
          />

          {/* Floating Technology Highlights on sides */}
          <div className="absolute top-6 left-6 hidden md:block max-w-xs space-y-1 p-4 rounded-2xl bg-[#181818]/90 border border-white/10 backdrop-blur-md">
            <span className="text-[10px] text-[#A3E635] font-bold uppercase tracking-wider block">
              Zone 01 • Dynamic Midfoot
            </span>
            <h4 className="text-sm font-bold text-white">Carbon-Fiber Propulsion Plate</h4>
            <p className="text-xs text-[#DCE8DE]/70 leading-relaxed">
              Curved high-modulus composite shank prevents arch torsional twist and snaps forward with every stride.
            </p>
          </div>

          <div className="absolute bottom-6 right-6 hidden md:block max-w-xs space-y-1 p-4 rounded-2xl bg-[#181818]/90 border border-white/10 backdrop-blur-md text-right">
            <span className="text-[10px] text-[#74866A] font-bold uppercase tracking-wider block">
              Zone 02 • Underfoot Matrix
            </span>
            <h4 className="text-sm font-bold text-white">Nitrogen-Infused Dual Sole</h4>
            <p className="text-xs text-[#DCE8DE]/70 leading-relaxed">
              Closed-cell supercritical foam infused with recycled algae rubber absorbs 65% more impact.
            </p>
          </div>
        </div>

        {/* Technical Engineering Benchmark Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="p-6 rounded-3xl bg-[#1f1f1f]/80 border border-white/10 backdrop-blur-md space-y-2 hover:border-[#174C3C] transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-[#174C3C] flex items-center justify-center text-[#DCE8DE] mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-3xl font-extrabold text-white font-mono block">88.4%</span>
            <h4 className="text-sm font-bold text-[#DCE8DE]">Kinetic Energy Rebound</h4>
            <p className="text-xs text-[#DCE8DE]/60 leading-relaxed">
              Laboratory tested rebound velocity, reducing muscle fatigue over long walking and running distances.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#1f1f1f]/80 border border-white/10 backdrop-blur-md space-y-2 hover:border-[#174C3C] transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-[#174C3C] flex items-center justify-center text-[#DCE8DE] mb-3">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-3xl font-extrabold text-white font-mono block">248 g</span>
            <h4 className="text-sm font-bold text-[#DCE8DE]">Ultralight Chassis</h4>
            <p className="text-xs text-[#DCE8DE]/60 leading-relaxed">
              Optimal weight-to-support ratio engineered through algorithmic variable-density mesh.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#1f1f1f]/80 border border-white/10 backdrop-blur-md space-y-2 hover:border-[#174C3C] transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-[#174C3C] flex items-center justify-center text-[#DCE8DE] mb-3">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-3xl font-extrabold text-white font-mono block">1,200+ km</span>
            <h4 className="text-sm font-bold text-[#DCE8DE]">Zero Foam Degradation</h4>
            <p className="text-xs text-[#DCE8DE]/60 leading-relaxed">
              Proprietary nitrogen cross-linking maintains structural height and cushioning over 3 years of daily wear.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#1f1f1f]/80 border border-white/10 backdrop-blur-md space-y-2 hover:border-[#174C3C] transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-[#174C3C] flex items-center justify-center text-[#DCE8DE] mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-3xl font-extrabold text-white font-mono block">-42%</span>
            <h4 className="text-sm font-bold text-[#DCE8DE]">Net-Zero Carbon Index</h4>
            <p className="text-xs text-[#DCE8DE]/60 leading-relaxed">
              Harvested algae foam, certified Italian organic leather, and water-based solvent-free assembly.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
