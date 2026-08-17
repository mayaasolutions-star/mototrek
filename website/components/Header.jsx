"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Phone, ShoppingBag, User, HelpCircle } from "lucide-react";
import { useEnquiry } from "../context/EnquiryContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { enquiryBucket, openEnquiryModal } = useEnquiry();
  const { cartCount, openCart } = useCart();
  const { user, isLoggedIn } = useAuth();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Events", href: "/events" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f7f3ec]/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-16 lg:h-20 max-w-[1440px] items-center justify-between px-4 lg:px-10">
        {/* Logo */}
        <Link href="/" aria-label="Mototrek Home" className="focus-ring flex items-center">
          <img
            src="/images/mototrek-logo.webp"
            alt="Mototrek | Premium Riding Gear Store in Pune"
            width="180"
            height="48"
            loading="eager"
            className="h-10 lg:h-12 w-auto"
          />
        </Link>

        {/* Navigation Links */}
        <nav>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 text-[15px] font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={
                  isActive(link.href)
                    ? "py-3 border-b-2 border-[#c45d2a] text-[#c45d2a] font-semibold"
                    : "transition duration-300 hover:text-[#c45d2a]"
                }
              >
                {link.name}
              </Link>
            ))}

            <a
              href="https://maps.app.goo.gl/ZTWPXaEB6hmSL4uy7"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 inline-flex items-center rounded-md bg-[#18382a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#c45d2a]"
            >
              Visit Store
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            className="lg:hidden flex flex-col gap-1.5 p-2"
          >
            <span className="w-6 h-0.5 bg-current"></span>
            <span className="w-6 h-0.5 bg-current"></span>
            <span className="w-6 h-0.5 bg-current"></span>
          </button>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div
              className="fixed inset-0 z-[9999] bg-[#10281E]/85 backdrop-blur-md flex justify-end"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div
                className="h-full w-[280px] sm:w-[320px] bg-[#18382A] border-l border-white/10 text-white shadow-2xl overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-white/20 px-6 py-5 bg-[#10281E]">
                  <img
                    src="/images/mototrek-logo.webp"
                    alt="Mototrek Logo"
                    className="h-9 w-auto"
                  />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close navigation menu"
                    className="text-3xl leading-none text-white/80 hover:text-white"
                  >
                    ×
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  {/* Account Status in Mobile Drawer */}
                  <div className="p-4 bg-white/10 rounded-xl flex items-center justify-between">
                    {isLoggedIn ? (
                      <div>
                        <p className="text-xs text-white/60">Logged in as</p>
                        <p className="font-bold text-sm text-[#f0b04d]">{user.name}</p>
                      </div>
                    ) : (
                      <Link
                        href="/account/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-xs font-bold text-[#f0b04d] hover:underline"
                      >
                        Login / Sign Up
                      </Link>
                    )}
                  </div>

                  <div className="flex flex-col text-base font-medium text-white divide-y divide-white/10">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-3 hover:text-[#f0b04d] transition"
                      >
                        {link.name}
                      </Link>
                    ))}
                    <Link
                      href="/account"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-3 text-[#f0b04d] font-semibold"
                    >
                      My Account & Orders
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* HEADER ACTIONS: CART, ENQUIRY BUCKET, ACCOUNT */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* SHOPPING CART BUTTON */}
          <button
            onClick={openCart}
            aria-label="Shopping Cart"
            className="relative p-2.5 rounded-xl bg-[#18382a] text-white hover:bg-[#c45d2a] transition flex items-center gap-2 shadow-sm"
            title="Shopping Cart (Purchase)"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="hidden sm:inline text-xs font-bold">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#c45d2a] text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#f7f3ec] shadow">
                {cartCount}
              </span>
            )}
          </button>

          {/* SECONDARY: EXISTING ENQUIRY BUCKET BUTTON */}
          <button
            onClick={openEnquiryModal}
            aria-label="Enquiry Bucket"
            className="relative p-2.5 rounded-xl border border-[#18382a] text-[#18382a] hover:bg-[#18382a] hover:text-white transition flex items-center gap-1.5"
            title="Enquiry Bucket (Assisted Sales)"
          >
            <HelpCircle className="w-5 h-5" />
            <span className="hidden md:inline text-xs font-semibold">Enquiry</span>
            {enquiryBucket.length > 0 && (
              <span className="bg-[#c45d2a] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {enquiryBucket.length}
              </span>
            )}
          </button>

          {/* CUSTOMER ACCOUNT / LOGIN */}
          <Link
            href={isLoggedIn ? "/account" : "/account/login"}
            className="p-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition flex items-center gap-2"
            title={isLoggedIn ? `Account: ${user.name}` : "Login / Account"}
          >
            <User className="w-5 h-5 text-[#18382a]" />
            <span className="hidden xl:inline text-xs font-semibold">
              {isLoggedIn ? user.name.split(" ")[0] : "Account"}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
