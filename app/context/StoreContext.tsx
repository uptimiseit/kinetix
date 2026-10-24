"use client";

import React, { createContext, useContext, useState } from "react";

export interface Colorway {
  id: string;
  name: string;
  upperColor: string;
  soleColor: string;
  accentColor: string;
  laceColor: string;
  price: number;
  description: string;
}

export type OccasionType = "casual" | "formal" | "sport";
export type MeshPartType = "upper" | "sole" | "accent" | "laces" | "caps";

export interface CartItem {
  id: string;
  name: string;
  category: string;
  size: string;
  colorwayName: string;
  upperColor: string;
  soleColor: string;
  accentColor: string;
  laceColor: string;
  image: string;
  price: number;
  quantity: number;
}

export const PRESET_COLORWAYS: Colorway[] = [
  {
    id: "forest-evergreen",
    name: "Forest Evergreen (Signature)",
    upperColor: "#174C3C",
    soleColor: "#F8F7F2",
    accentColor: "#74866A",
    laceColor: "#DCE8DE",
    price: 14999,
    description: "Atelier flagship: deep British racing forest green with organic off-white sole and sage laces.",
  },
  {
    id: "cyber-volt",
    name: "Volt Kinetic Neon",
    upperColor: "#FFFFFF",
    soleColor: "#FFFFFF",
    accentColor: "#84CC16",
    laceColor: "#181818",
    price: 15499,
    description: "Electrified neon lime swoosh with white breathable knit and dual air cushion pods.",
  },
  {
    id: "ocean-cyan",
    name: "Royal Cyan Aero",
    upperColor: "#FFFFFF",
    soleColor: "#FFFFFF",
    accentColor: "#0EA5E9",
    laceColor: "#181818",
    price: 15499,
    description: "Sky cyan swoosh and overlays with dark navy wave mudguard and nitrogen sole.",
  },
  {
    id: "crimson-apex",
    name: "Crimson Apex Red",
    upperColor: "#FFFFFF",
    soleColor: "#FFFFFF",
    accentColor: "#DC2626",
    laceColor: "#181818",
    price: 15999,
    description: "High-contrast racing crimson swoosh and air unit capsules with crisp white upper.",
  },
  {
    id: "triple-stealth",
    name: "Triple Stealth Black",
    upperColor: "#181818",
    soleColor: "#1f1f1f",
    accentColor: "#4B5563",
    laceColor: "#181818",
    price: 15999,
    description: "Monochromatic pitch-black silhouette with carbon accents and reflective eyelets.",
  },
  {
    id: "sand-gold",
    name: "Desert Sand Gold",
    upperColor: "#FAF7F2",
    soleColor: "#FAF7F2",
    accentColor: "#CA8A04",
    laceColor: "#74866A",
    price: 16499,
    description: "Warm desert sand and brushed gold overlays with organic off-white midsole.",
  },
  {
    id: "royal-purple",
    name: "Ultra Violet Royal",
    upperColor: "#FFFFFF",
    soleColor: "#FFFFFF",
    accentColor: "#7C3AED",
    laceColor: "#181818",
    price: 15999,
    description: "Hyper-saturated royal purple swoosh and heel unit with pure white knit.",
  },
];

interface StoreContextType {
  activeColorway: Colorway;
  setActiveColorway: (colorway: Colorway) => void;
  updateMeshPartColor: (part: MeshPartType, color: string) => void;
  setPresetColorway: (presetId: string) => void;
  activeOccasion: OccasionType;
  setActiveOccasion: (occ: OccasionType) => void;
  activeMeshPart: MeshPartType;
  setActiveMeshPart: (part: MeshPartType) => void;
  isCustomizerExploded: boolean;
  setIsCustomizerExploded: (exploded: boolean | ((prev: boolean) => boolean)) => void;
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, delta: number) => void;
  clearCart: () => void;
  formatPrice: (val: number) => string;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [activeColorway, setActiveColorway] = useState<Colorway>(PRESET_COLORWAYS[0]);
  const [activeOccasion, setActiveOccasion] = useState<OccasionType>("casual");
  const [activeMeshPart, setActiveMeshPart] = useState<MeshPartType>("upper");
  const [isCustomizerExploded, setIsCustomizerExploded] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<string>("UK 8");
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: "kinetix-air-forest",
      name: "Kinetix Chunky Runner - Forest Edition",
      category: "Sneakers",
      size: "UK 8",
      colorwayName: "Forest Evergreen",
      upperColor: "#174C3C",
      soleColor: "#F8F7F2",
      accentColor: "#74866A",
      laceColor: "#DCE8DE",
      image: "/images/shoe-casual-green.jpg",
      price: 14999,
      quantity: 1,
    },
  ]);

  const setPresetColorway = (presetId: string) => {
    const found = PRESET_COLORWAYS.find((c) => c.id === presetId);
    if (found) {
      setActiveColorway(found);
    }
  };

  const updateMeshPartColor = (part: MeshPartType, color: string) => {
    setActiveColorway((prev) => ({
      ...prev,
      name: "Custom Bespoke Studio",
      [part === "upper"
        ? "upperColor"
        : part === "sole"
        ? "soleColor"
        : part === "accent"
        ? "accentColor"
        : "laceColor"]: color,
    }));
  };

  const addToCart = (newItem: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === newItem.id && item.size === newItem.size && item.colorwayName === newItem.colorwayName
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        return next;
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <StoreContext.Provider
      value={{
        activeColorway,
        setActiveColorway,
        updateMeshPartColor,
        setPresetColorway,
        activeOccasion,
        setActiveOccasion,
        activeMeshPart,
        setActiveMeshPart,
        isCustomizerExploded,
        setIsCustomizerExploded,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        formatPrice,
        selectedSize,
        setSelectedSize,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
