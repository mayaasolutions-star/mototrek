"use client";

import React from "react";
import Link from "next/link";
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    closeCart,
    cartCount,
    subtotal,
    totalDiscount,
    shippingFee,
    grandTotal,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex justify-end transition-opacity">
      <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl overflow-hidden font-sans border-l border-gray-200">
        {/* DRAWER HEADER */}
        <div className="p-5 bg-[#18382a] text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-[#f0b04d]" />
            <div>
              <h2 className="font-bold text-base">Shopping Cart</h2>
              <p className="text-xs text-white/70">{cartCount} Item{cartCount !== 1 ? "s" : ""} selected</p>
            </div>
          </div>

          <button
            onClick={closeCart}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CART ITEMS LIST */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#f7f3ec] flex items-center justify-center text-[#18382a]">
                <ShoppingBag className="w-8 h-8 opacity-40" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#18382a]">Your Cart is Empty</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-xs">
                  Explore our range of motorcycle helmets, jackets, gloves and accessories.
                </p>
              </div>
              <button
                onClick={closeCart}
                className="px-6 py-2.5 bg-[#18382a] text-white text-xs font-bold rounded-xl hover:bg-[#c45d2a] transition"
              >
                Browse Shop
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.cartKey}
                className="p-4 rounded-2xl bg-[#f7f3ec]/40 border border-gray-200 flex gap-4 relative group"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover border border-gray-200 bg-white shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[11px] uppercase font-bold tracking-wider text-[#c45d2a]">
                          {item.brand}
                        </p>
                        <h4 className="font-bold text-sm text-[#18382a] leading-snug line-clamp-1">
                          {item.name}
                        </h4>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartKey)}
                        className="text-gray-400 hover:text-red-600 transition p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      {item.colour && <span className="bg-gray-100 px-2 py-0.5 rounded border">Colour: {item.colour}</span>}
                      {item.size && <span className="bg-gray-100 px-2 py-0.5 rounded border">Size: {item.size}</span>}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-extrabold text-sm text-[#18382a]">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>

                    {/* QUANTITY SELECTOR */}
                    <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden text-xs">
                      <button
                        onClick={() => updateQuantity(item.cartKey, -1)}
                        className="px-2 py-1 hover:bg-gray-100 font-bold"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-1 font-bold text-gray-800">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartKey, 1)}
                        className="px-2 py-1 hover:bg-gray-100 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* DRAWER FOOTER / SUMMARY */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-white border-t border-gray-200 space-y-4 shadow-lg">
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold text-gray-900">₹{subtotal.toLocaleString()}</span>
              </div>

              {totalDiscount > 0 && (
                <div className="flex justify-between text-green-700 font-semibold">
                  <span>Total Discount / Savings:</span>
                  <span>- ₹{totalDiscount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Delivery Fee:</span>
                <span className="font-bold text-gray-900">
                  {shippingFee === 0 ? <span className="text-green-700 font-extrabold">FREE SHIPPING</span> : `₹${shippingFee}`}
                </span>
              </div>

              <div className="flex justify-between text-base font-extrabold text-[#18382a] border-t pt-2 mt-2">
                <span>Grand Total:</span>
                <span className="text-[#c45d2a]">₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full py-3.5 bg-[#18382a] text-white rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#c45d2a] transition shadow-lg"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={closeCart}
                className="w-full py-2.5 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                Continue Shopping
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 text-[11px] text-gray-400 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                <span>100% Genuine Gear</span>
              </span>
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#c45d2a]" />
                <span>Safe Express Shipping</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
