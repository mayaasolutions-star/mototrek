"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mototrek_cart");
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Cart loading error:", e);
    }
  }, []);

  // Save cart to localStorage on update
  useEffect(() => {
    try {
      localStorage.setItem("mototrek_cart", JSON.stringify(cartItems));
    } catch (e) {
      console.error("Cart saving error:", e);
    }
  }, [cartItems]);

  // Add to cart with variant checking
  const addToCart = (product, selectedVariant, quantity = 1) => {
    setCartItems((prev) => {
      const colour = selectedVariant?.colour || product.selectedColour || "Default";
      const size = selectedVariant?.size || product.selectedSize || "One Size";
      const sku = selectedVariant?.sku || product.sku || `${product.id}-${colour}-${size}`;
      const stock = selectedVariant?.stock !== undefined ? selectedVariant.stock : 99;

      const itemKey = `${product.id}_${colour}_${size}`;
      const existingIdx = prev.findIndex((item) => item.cartKey === itemKey);

      if (existingIdx > -1) {
        const updated = [...prev];
        const newQty = Math.min(stock, updated[existingIdx].quantity + quantity);
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: newQty,
        };
        return updated;
      } else {
        const numPrice = typeof product.price === "number" ? product.price : Number(String(product.price).replace(/[^0-9.]/g, "")) || 0;
        const numMrp = typeof product.mrp === "number" ? product.mrp : Number(String(product.mrp).replace(/[^0-9.]/g, "")) || numPrice;
        const image = Array.isArray(product.images) ? product.images[0] : (product.image || "/images/helmet.webp");

        const newItem = {
          cartKey: itemKey,
          productId: product.id,
          name: product.name,
          slug: product.slug || product.name?.toLowerCase().replace(/\s+/g, "-"),
          brand: product.brand || "Mototrek",
          category: product.category || "Gear",
          colour,
          size,
          sku,
          price: numPrice,
          mrp: numMrp,
          image,
          quantity: Math.min(stock, quantity),
          stock,
        };
        return [...prev, newItem];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartKey) => {
    setCartItems((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const updateQuantity = (cartKey, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartKey === cartKey) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return { ...item, quantity: Math.min(item.stock, newQty) };
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Calculations
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalMrp = cartItems.reduce((sum, item) => sum + item.mrp * item.quantity, 0);
  const totalDiscount = Math.max(0, totalMrp - subtotal);
  const shippingFee = subtotal >= 3000 || subtotal === 0 ? 0 : 150;
  const grandTotal = subtotal + shippingFee;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        cartCount,
        subtotal,
        totalMrp,
        totalDiscount,
        shippingFee,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
