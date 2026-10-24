"use client";

import React, { useState } from "react";
import { useStore } from "@/app/context/StoreContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Tag, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";
import OrderConfirmationModal from "@/components/modals/OrderConfirmationModal";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    formatPrice,
  } = useStore();

  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState("");
  const [confirmedTotal, setConfirmedTotal] = useState("");

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = Math.max(0, subtotal - discountAmount);
  const freeShippingThreshold = 4999;
  const hasFreeShipping = subtotal >= freeShippingThreshold || cart.length === 0;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "KINETIX10") {
      setDiscountPercent(10);
      setPromoSuccess("Code KINETIX10 Applied! 10% Off");
      setPromoError("");
    } else if (promoCode.trim().toUpperCase() === "ATELIER15") {
      setDiscountPercent(15);
      setPromoSuccess("VIP Atelier Pass! 15% Off");
      setPromoError("");
    } else {
      setPromoError("Invalid code. Try KINETIX10");
      setPromoSuccess("");
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    // Trigger celebratory confetti fireworks!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#174C3C", "#74866A", "#DCE8DE", "#A3E635"],
      });
    } catch (e) {
      // ignore in environments without canvas
    }

    const orderNum = `#KTX-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrderId(orderNum);
    setConfirmedTotal(formatPrice(finalTotal));
    setIsOrderConfirmed(true);
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-[#181818]/60 backdrop-blur-xs transition-opacity"
            />

            {/* Slide-Over Drawer Container */}
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 280 }}
                className="w-screen max-w-md bg-[#F8F7F2] border-l border-[#DCE8DE] shadow-2xl flex flex-col justify-between"
              >
                {/* Header */}
                <div className="p-5 sm:p-6 border-b border-[#DCE8DE] flex items-center justify-between bg-white">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#174C3C] text-white flex items-center justify-center">
                      <ShoppingBag className="w-4 h-4 text-[#DCE8DE]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#181818]">Your Shopping Bag</h3>
                      <span className="text-xs text-[#74866A]">
                        {cart.length} unique item{cart.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 rounded-full hover:bg-[#F8F7F2] text-[#181818]/60 hover:text-[#181818] transition-colors cursor-pointer"
                    aria-label="Close Bag"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Free Shipping Progress Alert */}
                <div className="px-5 py-3 bg-[#DCE8DE]/40 border-b border-[#DCE8DE] flex items-center justify-between text-xs">
                  <span className="font-medium text-[#181818] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#174C3C]" />
                    {hasFreeShipping ? "Free Express Delivery Unlocked!" : `Add ${formatPrice(freeShippingThreshold - subtotal)} for Free Shipping`}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-[#174C3C] px-2 py-0.5 rounded-full bg-white border border-[#DCE8DE]">
                    Pan India
                  </span>
                </div>

                {/* Cart Items List */}
                <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="py-20 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-[#DCE8DE]/50 text-[#74866A] flex items-center justify-center mx-auto">
                        <ShoppingBag className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-[#181818]">Your bag is empty</h4>
                        <p className="text-xs text-[#74866A] max-w-xs mx-auto">
                          Explore our 3D customizer or virtual lookbook to craft your bespoke pair.
                        </p>
                      </div>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="px-6 py-2.5 rounded-xl bg-[#174C3C] text-white text-xs font-bold hover:bg-[#0f3328] transition-colors cursor-pointer"
                      >
                        Start Customizing
                      </button>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={`${item.id}-${item.size}`}
                        className="p-4 rounded-2xl bg-white border border-[#DCE8DE] shadow-xs flex gap-4 transition-all hover:border-[#74866A]"
                      >
                        {/* Thumbnail */}
                        <div className="w-20 h-20 rounded-xl bg-[#F8F7F2] border border-[#DCE8DE] overflow-hidden shrink-0 relative p-1 flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* Info & Quantity */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-1">
                              <h4 className="text-xs font-bold text-[#181818] truncate">
                                {item.name}
                              </h4>
                              <button
                                onClick={() => removeFromCart(item.id, item.size)}
                                className="text-[#74866A] hover:text-[#DC2626] transition-colors p-0.5 cursor-pointer"
                                title="Remove Item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#F8F7F2] border border-[#DCE8DE] text-[#181818]">
                                {item.size}
                              </span>
                              <span className="text-[11px] text-[#74866A] truncate">
                                {item.colorwayName}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 mt-1 border-t border-[#DCE8DE]/60">
                            {/* Quantity Adjustment Buttons */}
                            <div className="flex items-center border border-[#DCE8DE] rounded-lg bg-[#F8F7F2]">
                              <button
                                onClick={() => updateQuantity(item.id, item.size, -1)}
                                className="p-1 hover:bg-white text-[#181818] rounded-l-lg cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-bold text-[#181818]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.size, 1)}
                                className="p-1 hover:bg-white text-[#181818] rounded-r-lg cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="text-xs font-bold text-[#181818]">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer & Checkout Summary */}
                {cart.length > 0 && (
                  <div className="p-5 sm:p-6 bg-white border-t border-[#DCE8DE] space-y-4">
                    {/* Promo Code Input */}
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 text-[#74866A] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Promo (e.g. KINETIX10)"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#F8F7F2] border border-[#DCE8DE] text-[#181818] placeholder:text-[#74866A] focus:outline-none focus:border-[#174C3C]"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-[#F8F7F2] hover:bg-[#DCE8DE] border border-[#DCE8DE] text-xs font-bold text-[#181818] transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>

                    {promoSuccess && (
                      <p className="text-[11px] font-semibold text-[#174C3C]">{promoSuccess}</p>
                    )}
                    {promoError && (
                      <p className="text-[11px] font-semibold text-[#DC2626]">{promoError}</p>
                    )}

                    {/* Breakdown */}
                    <div className="space-y-1.5 text-xs text-[#181818]">
                      <div className="flex justify-between">
                        <span className="text-[#74866A]">Subtotal</span>
                        <span className="font-semibold">{formatPrice(subtotal)}</span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-[#174C3C] font-semibold">
                          <span>VIP Discount ({discountPercent}%)</span>
                          <span>-{formatPrice(discountAmount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-[#74866A]">Express Shipping (India)</span>
                        <span className="font-semibold text-[#174C3C]">FREE</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-[#DCE8DE] text-sm font-extrabold text-[#181818]">
                        <span>Total Due</span>
                        <span>{formatPrice(finalTotal)}</span>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <button
                      onClick={handleCheckout}
                      className="w-full py-4 rounded-2xl bg-[#174C3C] hover:bg-[#0f3328] text-[#F8F7F2] text-sm font-bold tracking-wide transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <span>Proceed to Instant Checkout</span>
                      <ArrowRight className="w-4 h-4 text-[#DCE8DE]" />
                    </button>

                    <p className="text-[10px] text-center text-[#74866A] flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#174C3C]" />
                      End-to-end encrypted checkout • Instant receipt via SMS & WhatsApp
                    </p>
                  </div>
                )}

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <OrderConfirmationModal
        isOpen={isOrderConfirmed}
        onClose={() => setIsOrderConfirmed(false)}
        orderNumber={confirmedOrderId}
        totalAmount={confirmedTotal}
      />
    </>
  );
}
