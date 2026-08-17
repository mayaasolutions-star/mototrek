"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  MessageCircle,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ShoppingBag,
  Zap,
  HelpCircle,
} from "lucide-react";
import { useEnquiry } from "../../../context/EnquiryContext";
import { useCart } from "../../../context/CartContext";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;

  const { toggleEnquiry, isInEnquiry } = useEnquiry();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColour, setSelectedColour] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/products/detail/${slug}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setProduct(json.data);
          if (json.data.variants?.length) {
            setSelectedColour(json.data.variants[0].colour);
            setSelectedSize(json.data.variants[0].size);
          }
        }
      })
      .catch(() => {
        const fallbackProduct = {
          id: "prod-demo",
          name: slug ? slug.replace(/-/g, " ").toUpperCase() : "Rynox Air GT Jacket",
          brand: "Rynox",
          category: "Jacket",
          mrp: 6999,
          price: 5999,
          discountPercent: 14,
          tax: "18% GST Included",
          shortDescription: "Premium all-weather mesh riding jacket with Safe-Tech CE Level 2 armor.",
          description: "Built for long distance touring and daily commuting. Features heavy-duty 600D mesh, CE Level 2 protectors on shoulders, elbows, and back, thermal liner, and high-visibility reflective striping.",
          images: ["/images/jacket.webp", "/images/jackets.webp"],
          status: "Active",
          visibility: "Visible",
          createdAt: new Date().toISOString(),
          variants: [
            { id: "v1", colour: "Black", size: "M", sku: "RAG-BLK-M", stock: 5 },
            { id: "v2", colour: "Black", size: "L", sku: "RAG-BLK-L", stock: 0 },
            { id: "v3", colour: "Black", size: "XL", sku: "RAG-BLK-XL", stock: 3 },
            { id: "v4", colour: "Red", size: "M", sku: "RAG-RED-M", stock: 2 },
            { id: "v5", colour: "Red", size: "L", sku: "RAG-RED-L", stock: 0 },
          ],
        };
        setProduct(fallbackProduct);
        setSelectedColour(fallbackProduct.variants[0].colour);
        setSelectedSize(fallbackProduct.variants[0].size);
      });
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f7f3ec] flex items-center justify-center p-6">
        <p className="text-gray-500 font-medium animate-pulse">Loading Product Details...</p>
      </div>
    );
  }

  const availableColours = Array.from(new Set(product.variants.map((v) => v.colour)));
  const availableSizes = Array.from(new Set(product.variants.map((v) => v.size)));

  const currentVariant = product.variants.find(
    (v) => v.colour === selectedColour && v.size === selectedSize
  ) || product.variants[0];

  const isCurrentVariantInStock = currentVariant && currentVariant.stock > 0;
  const isEntireProductSoldOut = product.variants.every((v) => v.stock === 0);
  const isAddedToEnquiry = isInEnquiry(product.id);

  const handleAddToCart = () => {
    addToCart(product, currentVariant, 1);
  };

  const handleBuyNow = () => {
    addToCart(product, currentVariant, 1);
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-[#f7f3ec] text-[#1f241f] p-4 sm:p-6 lg:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* BREADCRUMB / BACK */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 font-semibold text-[#18382a] hover:text-[#c45d2a] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Shop</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="uppercase tracking-wider font-bold text-gray-400">{product.category}</span>
            <span>/</span>
            <span className="font-semibold text-gray-700">{product.brand}</span>
          </div>
        </div>

        {/* MAIN PRODUCT GRID */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 bg-white p-6 sm:p-10 rounded-3xl border border-gray-200 shadow-sm">
          {/* LEFT: GALLERY */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discountPercent > 0 && (
                <span className="absolute top-4 left-4 bg-[#c45d2a] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  {product.discountPercent}% OFF
                </span>
              )}
            </div>

            {/* THUMBNAILS */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                      selectedImage === idx ? "border-[#18382a]" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: DETAILS & VARIANTS */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase font-extrabold tracking-widest text-[#c45d2a]">
                  {product.brand}
                </p>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#18382a] mt-1">
                  {product.name}
                </h1>
                {currentVariant && (
                  <p className="text-xs font-mono text-gray-400 mt-1">
                    SKU: {currentVariant.sku}
                  </p>
                )}
              </div>

              {/* PRICING */}
              <div className="flex items-baseline gap-3 pt-2 border-t border-b py-4">
                <span className="text-3xl font-extrabold text-[#18382a]">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.mrp > product.price && (
                  <span className="text-lg text-gray-400 line-through font-medium">
                    ₹{product.mrp.toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-gray-500 font-medium ml-auto">
                  {product.tax || "Taxes Included"}
                </span>
              </div>

              {/* SHORT DESCRIPTION */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.shortDescription || product.description}
              </p>

              {/* COLOUR SELECTOR */}
              {availableColours.length > 0 && (
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                    Colour: <strong className="text-gray-900">{selectedColour}</strong>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableColours.map((col) => (
                      <button
                        key={col}
                        onClick={() => {
                          setSelectedColour(col);
                          const varsForCol = product.variants.filter((v) => v.colour === col);
                          const validVar = varsForCol.find((v) => v.stock > 0) || varsForCol[0];
                          if (validVar) setSelectedSize(validVar.size);
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                          selectedColour === col
                            ? "bg-[#18382a] text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* SIZE SELECTOR WITH OUT OF STOCK HANDLING */}
              {availableSizes.length > 0 && (
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                    Size: <strong className="text-gray-900">{selectedSize}</strong>
                  </label>

                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map((sz) => {
                      const matchedVar = product.variants.find(
                        (v) => v.colour === selectedColour && v.size === sz
                      );
                      const isOutOfStock = !matchedVar || matchedVar.stock === 0;

                      return (
                        <button
                          key={sz}
                          disabled={isOutOfStock}
                          onClick={() => setSelectedSize(sz)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                            selectedSize === sz
                              ? "bg-[#18382a] text-white shadow-md"
                              : isOutOfStock
                              ? "bg-gray-100 text-gray-400 border border-dashed border-gray-300 line-through cursor-not-allowed"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                          }`}
                        >
                          <span>{sz}</span>
                          {isOutOfStock && <span className="text-[10px] uppercase text-red-500 font-extrabold ml-1">(SOLD OUT)</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STOCK STATUS BADGE */}
              <div className="pt-2">
                {isEntireProductSoldOut ? (
                  <div className="px-3 py-2 bg-red-100 border border-red-200 text-red-700 rounded-xl text-xs font-bold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>SOLD OUT — All sizes and colours are currently out of stock.</span>
                  </div>
                ) : isCurrentVariantInStock ? (
                  <div className="px-3 py-2 bg-green-100 border border-green-200 text-green-800 rounded-xl text-xs font-bold flex items-center gap-2 inline-flex">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    <span>In Stock — ({currentVariant.stock} units available)</span>
                  </div>
                ) : (
                  <div className="px-3 py-2 bg-amber-100 border border-amber-200 text-amber-800 rounded-xl text-xs font-bold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Selected size ({selectedSize}) in {selectedColour} is SOLD OUT. Please select another variant.</span>
                  </div>
                )}
              </div>
            </div>

            {/* ACTION BUTTONS: ADD TO CART (PRIMARY), BUY NOW (SECONDARY), ENQUIRY & WHATSAPP */}
            <div className="pt-6 space-y-3 border-t">
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  disabled={!isCurrentVariantInStock || isEntireProductSoldOut}
                  onClick={handleAddToCart}
                  className={`w-full py-4 rounded-2xl text-sm font-extrabold transition shadow-lg flex items-center justify-center gap-2 ${
                    !isCurrentVariantInStock || isEntireProductSoldOut
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#18382a] text-white hover:bg-[#c45d2a]"
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  disabled={!isCurrentVariantInStock || isEntireProductSoldOut}
                  onClick={handleBuyNow}
                  className={`w-full py-4 rounded-2xl text-sm font-extrabold transition shadow-lg flex items-center justify-center gap-2 ${
                    !isCurrentVariantInStock || isEntireProductSoldOut
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-[#c45d2a] text-white hover:bg-[#18382a]"
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span>Buy Now</span>
                </button>
              </div>

              {/* TERTIARY / PRESERVED ENQUIRY & WHATSAPP */}
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => toggleEnquiry(product)}
                  className={`w-full py-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                    isAddedToEnquiry ? "bg-[#18382a] text-white" : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <HelpCircle className="w-4 h-4 text-[#c45d2a]" />
                  <span>{isAddedToEnquiry ? "✓ Added to Enquiry" : "Add to Product Enquiry"}</span>
                </button>

                <a
                  href={`https://wa.me/919511901753?text=${encodeURIComponent(
                    `Hi Mototrek, I am interested in ${product.name} (${selectedColour} / ${selectedSize}). Is it available?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl border-2 border-[#25D366] text-[#10281e] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#25D366] hover:text-white transition"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:text-white" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
