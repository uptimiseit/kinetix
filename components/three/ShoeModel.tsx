"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Html } from "@react-three/drei";
import gsap from "gsap";
import { useStore } from "@/app/context/StoreContext";

// Preload the Draco GLB shoe model
useGLTF.preload("/models/shoe-draco.glb", "/draco/");

interface ShoeModelProps {
  interactive?: boolean;
  scale?: number;
  showAnnotations?: boolean;
  scrollProgress?: number;
  mode?: "hero" | "customizer" | "anatomy" | "standalone";
}

export default function ShoeModel({
  interactive = true,
  scale = 1.35,
  showAnnotations = false,
  scrollProgress = 0,
  mode = "standalone",
}: ShoeModelProps) {
  const { activeColorway, isCustomizerExploded } = useStore();

  // Load the authentic sculpted chunky sneaker model
  const { nodes, materials } = useGLTF("/models/shoe-draco.glb", "/draco/") as any;

  const mainGroupRef = useRef<THREE.Group>(null);
  const shoeGroupRef = useRef<THREE.Group>(null);

  // Group references for Exploded Anatomy animation
  const soleGroupRef = useRef<THREE.Group>(null);
  const carbonPlateRef = useRef<THREE.Group>(null);
  const upperGroupRef = useRef<THREE.Group>(null);
  const lacesGroupRef = useRef<THREE.Group>(null);

  // Clone materials on mount so multiple instances don't clash
  const clonedMaterials = React.useMemo(() => {
    return {
      laces: materials.laces ? materials.laces.clone() : new THREE.MeshStandardMaterial(),
      mesh: materials.mesh ? materials.mesh.clone() : new THREE.MeshStandardMaterial(),
      caps: materials.caps ? materials.caps.clone() : new THREE.MeshStandardMaterial(),
      inner: materials.inner ? materials.inner.clone() : new THREE.MeshStandardMaterial(),
      sole: materials.sole ? materials.sole.clone() : new THREE.MeshStandardMaterial(),
      stripes: materials.stripes ? materials.stripes.clone() : new THREE.MeshStandardMaterial(),
      band: materials.band ? materials.band.clone() : new THREE.MeshStandardMaterial(),
      patch: materials.patch ? materials.patch.clone() : new THREE.MeshStandardMaterial(),
    };
  }, [materials]);

  // 1. Smooth GSAP Color Interpolation across individual meshes
  useEffect(() => {
    const targetUpper = new THREE.Color(activeColorway.upperColor);
    const targetSole = new THREE.Color(activeColorway.soleColor);
    const targetAccent = new THREE.Color(activeColorway.accentColor);
    const targetLace = new THREE.Color(activeColorway.laceColor);

    const duration = 0.65;
    const ease = "power2.out";

    // Upper body mesh
    if (clonedMaterials.mesh) {
      gsap.to(clonedMaterials.mesh.color, {
        r: targetUpper.r,
        g: targetUpper.g,
        b: targetUpper.b,
        duration,
        ease,
      });
    }

    // Sculpted Chunky Sole
    if (clonedMaterials.sole) {
      gsap.to(clonedMaterials.sole.color, {
        r: targetSole.r,
        g: targetSole.g,
        b: targetSole.b,
        duration,
        ease,
      });
    }

    // Dynamic Swoosh / Flank Stripes
    if (clonedMaterials.stripes) {
      gsap.to(clonedMaterials.stripes.color, {
        r: targetAccent.r,
        g: targetAccent.g,
        b: targetAccent.b,
        duration,
        ease,
      });
    }

    // Laces
    if (clonedMaterials.laces) {
      gsap.to(clonedMaterials.laces.color, {
        r: targetLace.r,
        g: targetLace.g,
        b: targetLace.b,
        duration,
        ease,
      });
    }

    // Toe Caps & Heel Counter Overlays
    if (clonedMaterials.caps) {
      const capColor = targetUpper.clone().offsetHSL(0, 0, -0.06);
      gsap.to(clonedMaterials.caps.color, {
        r: capColor.r,
        g: capColor.g,
        b: capColor.b,
        duration,
        ease,
      });
    }

    // Midfoot Wave Band
    if (clonedMaterials.band) {
      const bandColor = targetAccent.clone().offsetHSL(0, -0.1, 0.05);
      gsap.to(clonedMaterials.band.color, {
        r: bandColor.r,
        g: bandColor.g,
        b: bandColor.b,
        duration,
        ease,
      });
    }

    // Inner Collar
    if (clonedMaterials.inner) {
      const innerColor = new THREE.Color("#181818");
      gsap.to(clonedMaterials.inner.color, {
        r: innerColor.r,
        g: innerColor.g,
        b: innerColor.b,
        duration,
        ease,
      });
    }

    // Tongue & Heel Patch
    if (clonedMaterials.patch) {
      const patchColor = targetAccent.clone();
      gsap.to(clonedMaterials.patch.color, {
        r: patchColor.r,
        g: patchColor.g,
        b: patchColor.b,
        duration,
        ease,
      });
    }

    // Subtle 360 spin on preset change
    if (shoeGroupRef.current) {
      gsap.to(shoeGroupRef.current.rotation, {
        y: "+=6.28318",
        duration: 1.1,
        ease: "power2.inOut",
      });
    }
  }, [activeColorway, clonedMaterials]);

  // 2. Exploded View Animation
  useEffect(() => {
    const duration = 0.8;
    const ease = "power3.out";

    if (soleGroupRef.current) {
      gsap.to(soleGroupRef.current.position, {
        y: isCustomizerExploded ? -0.7 : 0,
        duration,
        ease,
      });
    }

    if (carbonPlateRef.current) {
      gsap.to(carbonPlateRef.current.position, {
        y: isCustomizerExploded ? -0.25 : 0,
        duration,
        ease,
      });
    }

    if (upperGroupRef.current) {
      gsap.to(upperGroupRef.current.position, {
        y: isCustomizerExploded ? 0.35 : 0,
        duration,
        ease,
      });
    }

    if (lacesGroupRef.current) {
      gsap.to(lacesGroupRef.current.position, {
        y: isCustomizerExploded ? 0.75 : 0,
        duration,
        ease,
      });
    }
  }, [isCustomizerExploded]);

  // 3. Scroll-linked kinematic motion: smoothly lerp position X and rotation
  useFrame((state, delta) => {
    if (mode === "hero" && mainGroupRef.current) {
      // Calculate scroll factor from window scroll if available
      const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
      const progress = Math.min(1, Math.max(0, scrollY / 700));

      // As user scrolls, shoe moves from right (x: 0.9) to left (x: -1.4)
      const targetX = THREE.MathUtils.lerp(0.85, -1.35, progress);
      const targetY = THREE.MathUtils.lerp(0, -0.1, progress);
      const targetRotY = THREE.MathUtils.lerp(-0.7, 1.8, progress);
      const targetRotZ = THREE.MathUtils.lerp(-0.15, 0.25, progress);

      mainGroupRef.current.position.x = THREE.MathUtils.damp(
        mainGroupRef.current.position.x,
        targetX,
        4,
        delta
      );
      mainGroupRef.current.position.y = THREE.MathUtils.damp(
        mainGroupRef.current.position.y,
        targetY,
        4,
        delta
      );
      mainGroupRef.current.rotation.y = THREE.MathUtils.damp(
        mainGroupRef.current.rotation.y,
        targetRotY,
        4,
        delta
      );
      mainGroupRef.current.rotation.z = THREE.MathUtils.damp(
        mainGroupRef.current.rotation.z,
        targetRotZ,
        4,
        delta
      );
    }
  });

  return (
    <group ref={mainGroupRef} scale={scale}>
      <group ref={shoeGroupRef} position={[0, -0.15, 0]}>
        
        {/* ========================================================= */}
        {/* 1. SOLE GROUP (Chunky Sculpted Midsole + Outsole Treads)  */}
        {/* ========================================================= */}
        <group ref={soleGroupRef}>
          {nodes.shoe_4 && (
            <mesh
              geometry={nodes.shoe_4.geometry}
              material={clonedMaterials.sole}
              castShadow
              receiveShadow
            />
          )}

          {/* Annotation for Midsole in Exploded view */}
          {(showAnnotations || isCustomizerExploded) && (
            <Html position={[-1.4, -0.3, 0.6]} center distanceFactor={7}>
              <div className="pointer-events-none px-3 py-1.5 rounded-xl bg-[#174C3C] text-white text-xs font-semibold shadow-xl border border-[#DCE8DE]/40 whitespace-nowrap backdrop-blur-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-ping" />
                <span>Nitrogen-Infused Sole • 88% Rebound</span>
              </div>
            </Html>
          )}
        </group>

        {/* ========================================================= */}
        {/* 2. CARBON-FIBER SHANK PLATE (Between Sole & Upper)       */}
        {/* ========================================================= */}
        <group ref={carbonPlateRef}>
          {isCustomizerExploded && (
            <mesh position={[0, -0.05, 0]} castShadow>
              <boxGeometry args={[1.6, 0.03, 0.8]} />
              <meshStandardMaterial
                color="#111111"
                metalness={0.9}
                roughness={0.2}
                wireframe={false}
              />
            </mesh>
          )}

          {(showAnnotations || isCustomizerExploded) && (
            <Html position={[0, 0, 0.8]} center distanceFactor={7}>
              <div className="pointer-events-none px-3 py-1.5 rounded-xl bg-[#181818] text-[#F8F7F2] text-xs font-semibold shadow-xl border border-[#74866A]/50 whitespace-nowrap backdrop-blur-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#174C3C] animate-pulse" />
                <span>Carbon-Fiber Plate • High-Tensile Chassis</span>
              </div>
            </Html>
          )}
        </group>

        {/* ========================================================= */}
        {/* 3. UPPER BODY, SWOOSH, MUDGUARD & OVERLAYS               */}
        {/* ========================================================= */}
        <group ref={upperGroupRef}>
          {/* Main Breathable Engineered Mesh */}
          {nodes.shoe_1 && (
            <mesh
              geometry={nodes.shoe_1.geometry}
              material={clonedMaterials.mesh}
              castShadow
              receiveShadow
            />
          )}

          {/* Toe Caps & Heel Counter */}
          {nodes.shoe_2 && (
            <mesh
              geometry={nodes.shoe_2.geometry}
              material={clonedMaterials.caps}
              castShadow
            />
          )}

          {/* Dynamic Aerodynamic Swoosh Stripes */}
          {nodes.shoe_5 && (
            <mesh
              geometry={nodes.shoe_5.geometry}
              material={clonedMaterials.stripes}
              castShadow
            />
          )}

          {/* Midfoot Contoured Wavy Band */}
          {nodes.shoe_6 && (
            <mesh
              geometry={nodes.shoe_6.geometry}
              material={clonedMaterials.band}
              castShadow
            />
          )}

          {/* Inner Collar Lining */}
          {nodes.shoe_3 && (
            <mesh
              geometry={nodes.shoe_3.geometry}
              material={clonedMaterials.inner}
            />
          )}

          {/* Tongue & Collar Patch */}
          {nodes.shoe_7 && (
            <mesh
              geometry={nodes.shoe_7.geometry}
              material={clonedMaterials.patch}
            />
          )}

          {/* Annotation for Upper */}
          {(showAnnotations || isCustomizerExploded) && (
            <Html position={[0.7, 0.65, -0.6]} center distanceFactor={7}>
              <div className="pointer-events-none px-3 py-1.5 rounded-xl bg-[#ECF3EE] text-[#181818] text-xs font-semibold shadow-xl border border-[#74866A]/40 whitespace-nowrap backdrop-blur-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#74866A] animate-pulse" />
                <span>Engineered Knit & Italian Calfskin</span>
              </div>
            </Html>
          )}
        </group>

        {/* ========================================================= */}
        {/* 4. WOVEN LACES                                            */}
        {/* ========================================================= */}
        <group ref={lacesGroupRef}>
          {nodes.shoe && (
            <mesh
              geometry={nodes.shoe.geometry}
              material={clonedMaterials.laces}
              castShadow
            />
          )}
        </group>

      </group>
    </group>
  );
}
