"use client";

import React from "react";
import dynamic from "next/dynamic";
import type ShoeCanvasComponent from "./ShoeCanvas";

const ShoeCanvasDynamic = dynamic(() => import("./ShoeCanvas"), {
  ssr: false,
  loading: () => (
    <div className="h-[450px] sm:h-[550px] w-full flex flex-col items-center justify-center bg-[#F1EFEA]/60 rounded-3xl border border-[#DCE8DE] animate-pulse">
      <div className="w-10 h-10 rounded-full border-2 border-[#174C3C] border-t-transparent animate-spin mb-3" />
      <span className="text-xs uppercase tracking-widest font-semibold text-[#174C3C]">
        Initializing 3D Canvas
      </span>
      <span className="text-[11px] text-[#74866A] mt-1">KINETIX ATELIER • WebGL Studio</span>
    </div>
  ),
});

export default function DynamicShoeCanvas(props: React.ComponentProps<typeof ShoeCanvasComponent>) {
  return <ShoeCanvasDynamic {...props} />;
}
