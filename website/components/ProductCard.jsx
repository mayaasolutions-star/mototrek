"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, HelpCircle } from "lucide-react";
import { useEnquiry } from "../context/EnquiryContext";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product, onViewDetails }) {
  const { toggleEnquiry, isInEnquiry } = useEnquiry();
  const { addToCart } = useCart();

  const addedToEnquiry = isInEnquiry(product.id);
  const productSlug = product.slug || (product.name ? product.name.toLowerCase().replace(/\s+/g, "-") : product.id);
  const formattedPrice = typeof product.price === "number" ? `₹${product.price.toLocaleString()}` : product.price;
  const imageSrc = Array.isArray(product.images) ? product.images[0] : (product.image || "/images/helmet.webp");

  return (
    <div className="product-card h-full flex flex-col rounded-3xl overflow-hidden bg-white shadow-lg border border-gray-200 group hover:shadow-xl transition duration-300">
      <div className="relative overflow-hidden bg-gray-100">
        <Link href={`/product/${productSlug}`}>
          <img
            src={imageSrc}
            alt={product.name}
            className="w-full aspect-square object-cover group-hover:scale-105 transition duration-500"
            loading="lazy"
          />
        </Link>

        {product.discountPercent > 0 && (
          <span className="absolute top-3 left-3 bg-[#c45d2a] text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow">
            {product.discountPercent}% OFF
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs uppercase tracking-wide font-bold text-gray-400">
          {product.brand || "Mototrek"}
        </p>

        <Link href={`/product/${productSlug}`}>
          <h3 className="font-bold text-base text-[#18382a] mt-1 group-hover:text-[#c45d2a] transition line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-[#c45d2a] text-xl font-extrabold mt-2">
          {formattedPrice}
        </p>

        {/* CTAS: ADD TO CART (PRIMARY) + ADD TO ENQUIRY (SECONDARY) */}
        <div className="grid grid-cols-2 gap-2 mt-auto pt-5">
          <button
            onClick={() => addToCart(product)}
            className="rounded-xl bg-[#18382a] text-white py-2.5 text-xs font-bold hover:bg-[#c45d2a] transition flex items-center justify-center gap-1.5 shadow"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>

          <button
            onClick={() => toggleEnquiry(product)}
            className="rounded-xl border border-gray-300 text-gray-700 py-2.5 text-xs font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-1"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#c45d2a]" />
            <span>{addedToEnquiry ? "✓ Added" : "Enquiry"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
