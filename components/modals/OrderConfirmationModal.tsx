"use client";

import React from "react";
import { CheckCircle2, PackageCheck, Truck, ArrowRight, ShieldCheck } from "lucide-react";

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
  totalAmount: string;
}

export default function OrderConfirmationModal({
  isOpen,
  onClose,
  orderNumber,
  totalAmount,
}: OrderConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#181818]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-3xl bg-[#F8F7F2] border border-[#DCE8DE] shadow-2xl overflow-hidden z-10 p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-[#174C3C] text-[#DCE8DE] flex items-center justify-center mx-auto mb-5 shadow-lg">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="text-center space-y-2 mb-6">
          <span className="text-xs uppercase tracking-widest font-bold text-[#174C3C]">
            Order Confirmed & Atelier Dispatched
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#181818] tracking-tight">
            Thank You For Your Order!
          </h3>
          <p className="text-xs sm:text-sm text-[#181818]/70 max-w-sm mx-auto leading-relaxed">
            Your 3D precision-engineered footwear has been sent to our atelier craftsman queue.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="p-4 rounded-2xl bg-white border border-[#DCE8DE] space-y-3 mb-6">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-[#DCE8DE]/70">
            <span className="text-[#74866A] font-semibold">Order ID</span>
            <span className="font-mono font-bold text-[#181818]">{orderNumber}</span>
          </div>

          <div className="flex items-center justify-between text-xs pb-2 border-b border-[#DCE8DE]/70">
            <span className="text-[#74866A] font-semibold">Payment Status</span>
            <span className="px-2 py-0.5 rounded-full bg-[#DCE8DE] text-[#174C3C] font-bold text-[11px]">
              Paid • Verified
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pb-2 border-b border-[#DCE8DE]/70">
            <span className="text-[#74866A] font-semibold">Total Charged</span>
            <span className="font-bold text-[#181818] text-sm">{totalAmount}</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-[#74866A] font-semibold">Estimated Delivery</span>
            <span className="font-bold text-[#174C3C] flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" /> 2 - 4 Business Days
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-4 rounded-2xl bg-[#174C3C] hover:bg-[#0f3328] text-[#F8F7F2] text-sm font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Continue Exploring Atelier</span>
          <ArrowRight className="w-4 h-4 text-[#DCE8DE]" />
        </button>

        <p className="text-[11px] text-center text-[#74866A] mt-4 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#174C3C]" />
          30-day trial & complimentary size exchange included.
        </p>

      </div>
    </div>
  );
}
