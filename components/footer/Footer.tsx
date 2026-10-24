"use client";

import React, { useState } from "react";
import { Footprints, ArrowRight, Check, Heart, Shield, Sparkles, Globe, Mail } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#174C3C] text-[#F8F7F2] pt-20 pb-12 border-t border-[#74866A]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Atelier Brand Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#74866A]/40 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#DCE8DE] flex items-center justify-center text-[#174C3C] shadow-md">
                <Footprints className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-widest uppercase">
                KINETIX <span className="text-[#DCE8DE] font-normal">ATELIER</span>
              </span>
            </div>
            <p className="text-sm text-[#DCE8DE]/80 max-w-md leading-relaxed">
              Biomechanical 3D footwear sculpted with regenerative circular chemistry. 
              Designed in Kyoto & Milan. Handcrafted for the modern visionary.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#DCE8DE]/70 pt-1">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#DCE8DE]" /> Global Concierge
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#DCE8DE]" /> 100% Recycled Soles
              </span>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#DCE8DE] block">
              Join the Atelier Syndicate
            </span>
            <p className="text-xs text-[#DCE8DE]/70">
              Receive confidential private drops, bespoke 3D colorway invitations, and invitations to physical atelier previews.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-[#74866A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 text-xs rounded-xl bg-[#0f3328] border border-[#74866A]/50 text-[#F8F7F2] placeholder:text-[#DCE8DE]/50 focus:outline-none focus:border-[#DCE8DE]"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-[#DCE8DE] hover:bg-white text-[#174C3C] text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <span>{subscribed ? "Subscribed!" : "Subscribe"}</span>
                {subscribed ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </form>
          </div>

        </div>

        {/* Mid Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-[#74866A]/40 text-xs">
          
          <div className="space-y-3">
            <h5 className="font-bold text-sm text-[#F8F7F2] uppercase tracking-wider">
              3D Architecture
            </h5>
            <ul className="space-y-2 text-[#DCE8DE]/75">
              <li><a href="#customizer" className="hover:text-white transition-colors">3D Material Lab</a></li>
              <li><a href="#lookbook" className="hover:text-white transition-colors">Style & Occasion Matcher</a></li>
              <li><a href="#anatomy" className="hover:text-white transition-colors">Exploded Anatomy View</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Engineered Motion Canvas</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-sm text-[#F8F7F2] uppercase tracking-wider">
              Footwear Categories
            </h5>
            <ul className="space-y-2 text-[#DCE8DE]/75">
              <li><a href="#collection" className="hover:text-white transition-colors">Kinetix Air Low Sneaker</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Aurelia Handcrafted Oxford</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Velocity Carbon Runner</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Atelier Cloud Minimalist</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-sm text-[#F8F7F2] uppercase tracking-wider">
              Sustainability & Tech
            </h5>
            <ul className="space-y-2 text-[#DCE8DE]/75">
              <li><span className="text-[#DCE8DE]/90">Algae-Blended Foam Soles</span></li>
              <li><span className="text-[#DCE8DE]/90">Zero Solvent Stitching</span></li>
              <li><span className="text-[#DCE8DE]/90">Italian Regenerative Nubuck</span></li>
              <li><span className="text-[#DCE8DE]/90">Closed-Loop Recycling Matrix</span></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-sm text-[#F8F7F2] uppercase tracking-wider">
              Client Concierge
            </h5>
            <ul className="space-y-2 text-[#DCE8DE]/75">
              <li><span className="hover:text-white transition-colors cursor-pointer">Bespoke Size Consultation</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Track Your 3D Order</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">30-Day Risk-Free Trial</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Atelier Care & Repair</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#DCE8DE]/60">
          <p>© 2026 KINETIX ATELIER INC. All rights reserved. Precision 3D Footwear Architecture.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Charter</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-white transition-colors cursor-pointer">Environmental Report</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
