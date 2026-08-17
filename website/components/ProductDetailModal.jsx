"use client";

import React from "react";
import { useEnquiry } from "../context/EnquiryContext";

export default function ProductDetailModal({ product, onClose }) {
  const { toggleEnquiry, isInEnquiry } = useEnquiry();

  if (!product) return null;

  const added = isInEnquiry(product.id);

  const handleToggle = () => {
    toggleEnquiry(product);
    onClose();
  };

  return (
    <div
      id="productModal"
      style={{ display: "flex" }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="closeProductModal"
          onClick={onClose}
          className="absolute top-4 right-5 text-3xl leading-none"
        >
          &times;
        </button>

        <h2 id="productTitle" className="text-2xl font-bold text-[#18382a] mb-5">
          {product.name}
        </h2>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-xs text-gray-500 uppercase">Price</div>
            <div id="productPrice" className="font-semibold text-[#c45d2a]">
              {product.price || "-"}
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-xs text-gray-500 uppercase">Brand</div>
            <div id="productBrand" className="font-semibold">
              {product.brand || "MotoTrek"}
            </div>
          </div>
        </div>

        <div id="productBadges" className="flex flex-wrap gap-2 mb-5">
          {product.badges &&
            product.badges.map((badge, idx) => (
              <span
                key={idx}
                className="bg-[#edf7ef] text-[#18382a] px-3 py-1 rounded-full text-sm font-medium"
              >
                {badge}
              </span>
            ))}
        </div>

        <p id="productDescription" className="text-gray-600 leading-7 mb-6">
          {product.description || ""}
        </p>

        <button
          id="productWhatsapp"
          type="button"
          onClick={handleToggle}
          className="w-full bg-[#18382a] text-white py-3 rounded-xl font-semibold hover:bg-[#c45d2a] transition"
        >
          {added ? "✓ Remove from Enquiry" : "Add to My Enquiry"}
        </button>
      </div>
    </div>
  );
}
