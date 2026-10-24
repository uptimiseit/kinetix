"use client";

import React, { useState } from "react";
import { useStore } from "@/app/context/StoreContext";
import { ShoppingBag, Star, ArrowUpRight, Check, Sparkles, Filter } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: "Sneakers" | "Formal Loafers" | "Running";
  price: number;
  badge: string;
  description: string;
  rating: number;
  swatches: {
    colorName: string;
    hex: string;
    image: string;
  }[];
}

const PRODUCTS: Product[] = [
  {
    id: "prod-kinetix-air-forest",
    name: "Kinetix Air Low - Forest Edition",
    category: "Sneakers",
    price: 14999,
    badge: "Brand Signature",
    description: "Off-white sustainable canvas, forest-green signature swoosh, recycled algae cupsole.",
    rating: 4.9,
    swatches: [
      { colorName: "Forest Evergreen", hex: "#174C3C", image: "/images/shoe-casual-green.jpg" },
      { colorName: "Sage Minimalist", hex: "#DCE8DE", image: "/images/shoe-minimalist-sage.jpg" },
      { colorName: "Obsidian Stealth", hex: "#181818", image: "/images/shoe-runner-carbon.jpg" },
    ],
  },
  {
    id: "prod-aurelia-oxford",
    name: "Aurelia Handcrafted Oxford Loafer",
    category: "Formal Loafers",
    price: 18499,
    badge: "Handcrafted in Milan",
    description: "Burnished Italian calfskin leather, hand-stitched welt, stacked oak heel.",
    rating: 5.0,
    swatches: [
      { colorName: "Espresso Brown", hex: "#3b261b", image: "/images/shoe-formal-oxford.jpg" },
      { colorName: "Forest Patina", hex: "#174C3C", image: "/images/shoe-casual-green.jpg" },
    ],
  },
  {
    id: "prod-velocity-carbon",
    name: "Velocity Carbon Runner",
    category: "Running",
    price: 16999,
    badge: "Carbon Shank Elite",
    description: "Aerodynamic engineered knit, full-length carbon plate, nitrogen-cushioned vortex sole.",
    rating: 4.85,
    swatches: [
      { colorName: "Obsidian & Forest", hex: "#181818", image: "/images/shoe-runner-carbon.jpg" },
      { colorName: "Forest Evergreen", hex: "#174C3C", image: "/images/shoe-casual-green.jpg" },
      { colorName: "Sage Runner", hex: "#DCE8DE", image: "/images/shoe-minimalist-sage.jpg" },
    ],
  },
  {
    id: "prod-atelier-cloud",
    name: "Atelier Cloud Minimalist Sneaker",
    category: "Sneakers",
    price: 13999,
    badge: "Sage Sustainable",
    description: "Soft mist sage nubuck, glove-leather lining, ultra-cushioned anatomical walking footbed.",
    rating: 4.92,
    swatches: [
      { colorName: "Sage Mist", hex: "#DCE8DE", image: "/images/shoe-minimalist-sage.jpg" },
      { colorName: "Forest Stripe", hex: "#174C3C", image: "/images/shoe-casual-green.jpg" },
    ],
  },
];

const CATEGORIES = ["All", "Sneakers", "Formal Loafers", "Running"] as const;
const SIZES = ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"];

export default function CollectionSection() {
  const { addToCart, formatPrice } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeSwatches, setActiveSwatches] = useState<{ [productId: string]: number }>({
    "prod-kinetix-air-forest": 0,
    "prod-aurelia-oxford": 0,
    "prod-velocity-carbon": 0,
    "prod-atelier-cloud": 0,
  });
  const [productSizes, setProductSizes] = useState<{ [productId: string]: string }>({
    "prod-kinetix-air-forest": "UK 8",
    "prod-aurelia-oxford": "UK 8",
    "prod-velocity-carbon": "UK 9",
    "prod-atelier-cloud": "UK 8",
  });
  const [sizePickerOpen, setSizePickerOpen] = useState<{ [productId: string]: boolean }>({});

  const filteredProducts =
    selectedCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleSwatchSelect = (productId: string, swatchIndex: number) => {
    setActiveSwatches((prev) => ({ ...prev, [productId]: swatchIndex }));
  };

  const handleSizeSelect = (productId: string, size: string) => {
    setProductSizes((prev) => ({ ...prev, [productId]: size }));
    setSizePickerOpen((prev) => ({ ...prev, [productId]: false }));
  };

  const handleAddProduct = (product: Product) => {
    const swatchIdx = activeSwatches[product.id] || 0;
    const swatch = product.swatches[swatchIdx];
    const size = productSizes[product.id] || "UK 8";

    addToCart({
      id: `${product.id}-${swatch.colorName}-${size}`,
      name: product.name,
      category: product.category,
      size: size,
      colorwayName: swatch.colorName,
      upperColor: swatch.hex,
      soleColor: "#F8F7F2",
      accentColor: "#74866A",
      laceColor: "#181818",
      image: swatch.image,
      price: product.price,
    });
  };

  return (
    <section id="collection" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F8F7F2]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE8DE] text-xs font-semibold text-[#174C3C] uppercase tracking-widest shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#74866A]" />
              <span>Curated Atelier Footwear</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#181818] tracking-tight">
              Trending Atelier Catalog
            </h2>
            <p className="text-sm text-[#181818]/70 max-w-xl">
              From runway casual silhouettes to carbon-shank track runners and handcrafted Italian formal oxfords.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-[#DCE8DE] shadow-2xs overflow-x-auto">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? "bg-[#174C3C] text-[#F8F7F2] shadow-xs"
                      : "text-[#181818] hover:text-[#174C3C] hover:bg-[#DCE8DE]/30"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Interactive Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {filteredProducts.map((product) => {
            const swatchIdx = activeSwatches[product.id] || 0;
            const currentSwatch = product.swatches[swatchIdx];
            const currentSize = productSizes[product.id] || "UK 8";
            const isPickerOpen = sizePickerOpen[product.id] || false;

            return (
              <div
                key={product.id}
                className="group rounded-3xl bg-white border border-[#DCE8DE] shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between relative overflow-hidden"
              >
                <div>
                  {/* Top Badges & Rating */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#DCE8DE]/70 text-[#174C3C] border border-[#DCE8DE]">
                      {product.badge}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-[#181818]">
                      <Star className="w-3.5 h-3.5 fill-[#74866A] text-[#74866A]" />
                      {product.rating}
                    </span>
                  </div>

                  {/* High-Resolution Footwear Thumbnail Viewport */}
                  <div className="relative aspect-square w-full rounded-2xl bg-[#F8F7F2] border border-[#DCE8DE]/60 overflow-hidden mb-4 p-4 flex items-center justify-center group-hover:bg-[#ECF3EE] transition-colors">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={currentSwatch.image}
                      alt={product.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-108"
                    />

                    {/* Quick Size Selector Popover */}
                    {isPickerOpen && (
                      <div className="absolute inset-0 bg-white/95 backdrop-blur-md p-4 rounded-2xl z-20 flex flex-col justify-between animate-in fade-in duration-150">
                        <div className="flex items-center justify-between pb-2 border-b border-[#DCE8DE]">
                          <span className="text-xs font-bold text-[#181818]">Choose Size</span>
                          <button
                            onClick={() => setSizePickerOpen((prev) => ({ ...prev, [product.id]: false }))}
                            className="text-xs text-[#74866A] hover:text-[#181818] font-bold cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2 py-2">
                          {SIZES.map((sz) => (
                            <button
                              key={sz}
                              onClick={() => handleSizeSelect(product.id, sz)}
                              className={`py-2 text-xs font-bold rounded-xl border cursor-pointer transition-all ${
                                currentSize === sz
                                  ? "bg-[#174C3C] text-white border-[#174C3C]"
                                  : "bg-[#F8F7F2] text-[#181818] border-[#DCE8DE] hover:border-[#74866A]"
                              }`}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                        <span className="text-[10px] text-center text-[#74866A]">
                          Free size exchanges within 30 days
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Inline Color-Swatch Dots */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[11px] font-medium text-[#74866A]">Colors:</span>
                    <div className="flex items-center gap-1.5">
                      {product.swatches.map((swatch, idx) => {
                        const isSelected = swatchIdx === idx;
                        return (
                          <button
                            key={swatch.colorName}
                            onClick={() => handleSwatchSelect(product.id, idx)}
                            className={`w-5 h-5 rounded-full border transition-all cursor-pointer ${
                              isSelected
                                ? "ring-2 ring-[#174C3C] scale-115 border-white"
                                : "border-black/20 hover:scale-105"
                            }`}
                            style={{ backgroundColor: swatch.hex }}
                            title={swatch.colorName}
                          />
                        );
                      })}
                    </div>
                    <span className="text-[11px] font-semibold text-[#181818] truncate ml-auto">
                      {currentSwatch.colorName}
                    </span>
                  </div>

                  {/* Product Title & Spec Description */}
                  <h3 className="text-base font-bold text-[#181818] group-hover:text-[#174C3C] transition-colors leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#181818]/65 mt-1 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Bottom Bar: Size Badge, Price, Add to Bag */}
                <div className="pt-4 mt-4 border-t border-[#DCE8DE] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#74866A] font-bold uppercase block">Price (INR)</span>
                      <span className="text-lg font-extrabold text-[#181818]">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    <button
                      onClick={() => setSizePickerOpen((prev) => ({ ...prev, [product.id]: !isPickerOpen }))}
                      className="px-2.5 py-1 rounded-lg bg-[#F8F7F2] hover:bg-[#DCE8DE]/40 border border-[#DCE8DE] text-xs font-semibold text-[#181818] transition-colors cursor-pointer"
                    >
                      Size: <strong>{currentSize}</strong> ▾
                    </button>
                  </div>

                  <button
                    onClick={() => handleAddProduct(product)}
                    className="w-full py-3 rounded-2xl bg-[#174C3C] hover:bg-[#0f3328] text-[#F8F7F2] text-xs font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#DCE8DE]" />
                    <span>Add to Bag ({currentSize})</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
