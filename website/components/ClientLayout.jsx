"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import EnquiryModal from "./EnquiryModal";
import CartDrawer from "./CartDrawer";
import { EnquiryProvider } from "../context/EnquiryContext";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-[#f7f3ec] text-[#1f241f] flex flex-col font-sans">
        {children}
      </div>
    );
  }

  return (
    <AuthProvider>
      <CartProvider>
        <EnquiryProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <EnquiryModal />
          <CartDrawer />
        </EnquiryProvider>
      </CartProvider>
    </AuthProvider>
  );
}
