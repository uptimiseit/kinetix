"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls, ContactShadows, Float, Environment } from "@react-three/drei";
import ShoeModel from "./ShoeModel";

interface ShoeCanvasProps {
  interactive?: boolean;
  scale?: number;
  enablePresentation?: boolean;
  showAnnotations?: boolean;
  heightClass?: string;
  initialRotation?: [number, number, number];
  mode?: "hero" | "customizer" | "anatomy" | "standalone";
}

export default function ShoeCanvas({
  interactive = true,
  scale = 1.35,
  enablePresentation = true,
  showAnnotations = false,
  heightClass = "h-[450px] sm:h-[550px] w-full",
  initialRotation = [0.25, -Math.PI / 4, 0],
  mode = "standalone",
}: ShoeCanvasProps) {
  return (
    <div className={`relative ${heightClass} flex items-center justify-center cursor-grab active:cursor-grabbing`}>
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 45 }}
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.9} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.8}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />
        {/* Soft Studio Rim Lighting for Leather, Mesh & Rubber Specularity */}
        <directionalLight position={[-5, 4, -5]} intensity={1.4} color="#DCE8DE" />
        <pointLight position={[0, -2, 2]} intensity={0.6} color="#74866A" />

        <Suspense fallback={null}>
          <Environment preset="city" />

          {enablePresentation ? (
            <PresentationControls
              global={false}
              cursor={true}
              snap={true}
              speed={1.5}
              zoom={1}
              rotation={initialRotation}
              polar={[-Math.PI / 4, Math.PI / 4]}
              azimuth={[-Math.PI, Math.PI]}
            >
              <Float speed={interactive ? 1.8 : 0} rotationIntensity={0.2} floatIntensity={0.3}>
                <ShoeModel
                  interactive={interactive}
                  scale={scale}
                  showAnnotations={showAnnotations}
                  mode={mode}
                />
              </Float>
            </PresentationControls>
          ) : (
            <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.4}>
              <group rotation={initialRotation}>
                <ShoeModel
                  interactive={interactive}
                  scale={scale}
                  showAnnotations={showAnnotations}
                  mode={mode}
                />
              </group>
            </Float>
          )}

          {/* Ground Contact Shadow */}
          <ContactShadows
            position={[0, -1.05, 0]}
            opacity={0.65}
            scale={5.5}
            blur={1.8}
            far={3.5}
            color="#181818"
          />
        </Suspense>
      </Canvas>

      {/* Floating 360 Drag Badge */}
      {enablePresentation && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none select-none px-3.5 py-1.5 rounded-full bg-[#181818]/85 text-[#F8F7F2] text-[11px] font-semibold tracking-wider uppercase border border-[#DCE8DE]/30 backdrop-blur-md flex items-center gap-2 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-[#174C3C] animate-ping" />
          <span>Drag to Inspect 360°</span>
        </div>
      )}
    </div>
  );
}
