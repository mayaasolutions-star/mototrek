"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import productsData from "../../data/products";
import ProductCard from "../../components/ProductCard";
import ProductDetailModal from "../../components/ProductDetailModal";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [apiProducts, setApiProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const productsPerPage = 12;

  // Fetch live products from backend REST API
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/products?status=Active&visibility=Visible&sort=newest")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setApiProducts(json.data);
        }
      })
      .catch((err) => {
        console.log("Using local catalogue fallback.");
      });
  }, []);

  // Combine live API products (newest first) + static catalog items
  const combinedProducts = useMemo(() => {
    if (!apiProducts.length) return productsData;

    // Filter out duplicates by slug/name
    const existingSlugs = new Set(apiProducts.map((p) => p.slug));
    const uniqueStatic = productsData.filter(
      (p) => !existingSlugs.has(p.slug || p.id)
    );

    // API Products come FIRST (newest first)
    return [...apiProducts, ...uniqueStatic];
  }, [apiProducts]);

  // Sync category URL param
  useEffect(() => {
    if (initialCategory) {
      const cat = initialCategory.toLowerCase();
      if (cat.includes("helmet")) setActiveFilter("helmet");
      else if (cat.includes("jacket") || cat.includes("gear") || cat.includes("riding-gear")) setActiveFilter("jacket");
      else if (cat.includes("glove")) setActiveFilter("gloves");
      else if (cat.includes("boot")) setActiveFilter("boots");
      else if (cat.includes("lugg") || cat.includes("bag")) setActiveFilter("luggage");
      else if (cat.includes("access")) setActiveFilter("accessories");
      else setActiveFilter("all");
    }
  }, [initialCategory]);

  // Search & Filter
  const filteredProducts = useMemo(() => {
    let list = combinedProducts.filter((product) => {
      const categoryMatch =
        activeFilter === "all" ||
        (product.category && product.category.toLowerCase().includes(activeFilter));

      const query = searchQuery.trim().toLowerCase();

      const searchTerms = Array.isArray(product.search)
        ? product.search.join(" ")
        : product.search || "";

      const searchText = `
        ${product.name || ""}
        ${product.brand || ""}
        ${product.category || ""}
        ${product.description || ""}
        ${searchTerms}
      `.toLowerCase();

      const searchMatch = query === "" || searchText.includes(query);

      return categoryMatch && searchMatch;
    });

    // Apply Sorting algorithm
    if (sortOption === "price-low") {
      return [...list].sort(
        (a, b) =>
          Number(String(a.price).replace(/[₹,]/g, "").replace(/[^0-9.]/g, "") || 0) -
          Number(String(b.price).replace(/[₹,]/g, "").replace(/[^0-9.]/g, "") || 0)
      );
    }

    if (sortOption === "price-high") {
      return [...list].sort(
        (a, b) =>
          Number(String(b.price).replace(/[₹,]/g, "").replace(/[^0-9.]/g, "") || 0) -
          Number(String(a.price).replace(/[₹,]/g, "").replace(/[^0-9.]/g, "") || 0)
      );
    }

    if (sortOption === "name" || sortOption === "a-z") {
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    // Default: Newest First
    return list;
  }, [combinedProducts, activeFilter, searchQuery, sortOption]);

  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, currentPage * productsPerPage);
  }, [filteredProducts, currentPage]);

  const hasMore = currentPage * productsPerPage < filteredProducts.length;

  const categories = [
    { label: "All Products", filter: "all" },
    { label: "Helmets", filter: "helmet" },
    { label: "Jackets", filter: "jacket" },
    { label: "Gloves", filter: "gloves" },
    { label: "Boots", filter: "boots" },
    { label: "Bags", filter: "luggage" },
    { label: "Accessories", filter: "accessories" },
  ];

  const popularSearches = [
    "SMK",
    "Axor",
    "Fog Lights",
    "Mobile Holder",
    "Saddle Bags",
    "Hydration",
    "Chain Cleaner",
    "Rain Gear",
  ];

  return (
    <main id="top">
      {/* HERO */}
      <section className="hero flex items-center relative overflow-hidden">
        <img
          src="/images/shop-page-hero-img.webp"
          alt="Premium motorcycle riding gear, helmets and accessories at Mototrek Pune"
          className="canva-image"
          data-template-id="shop-hero-image"
          loading="eager"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20"></div>

        <div className="hero-content relative z-10 max-w-[1440px] mx-auto w-full px-5 lg:px-10">
          <div className="max-w-1xl text-white fade-up">
            <h1 className="serif leading-tight font-bold text-4xl md:text-6xl mb-6">
              Premium Riding Gear<br />
              for Every Ride.
            </h1>

            <p className="text-base sm:text-lg md:text-xl leading-7 sm:leading-8 text-white/90 max-w-xl mb-8">
              Explore helmets, riding jackets, gloves, boots, bags and motorcycle accessories from trusted brands. Choose the right gear with honest advice from riders who understand the road.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="max-w-[1600px] mx-auto px-5 lg:px-10 py-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-7 mb-10">
          <div>
            <p className="uppercase tracking-[0.30em] text-xs mb-3 text-[#6c756b] font-semibold">
              SHOP BY CATEGORY
            </p>

            <h2 className="serif text-[#18382a] font-bold text-3xl lg:text-4xl">
              Explore Premium Riding Gear
            </h2>

            <p className="mt-3 text-[#657064] max-w-2xl leading-7">
              Browse genuine motorcycle helmets, riding gear, bags, accessories and touring essentials from trusted brands. Use the filters to quickly find products that match your motorcycle, riding style and budget.
            </p>
          </div>

          <div className="text-right">
            <p id="productCount" className="text-sm text-[#657064] font-medium">
              {filteredProducts.length} Product{filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="rounded-2xl border border-black/10 bg-white shadow-sm p-6 mb-10">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat.filter}
                data-filter={cat.filter}
                onClick={() => {
                  setActiveFilter(cat.filter);
                  setCurrentPage(1);
                }}
                className={`filter-chip px-4 py-2 rounded-full border text-sm ${
                  activeFilter === cat.filter ? "active font-medium" : ""
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search + Sort */}
          <div className="grid lg:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative lg:col-span-2">
              <input
                id="searchInput"
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-xl border border-black/15 bg-white py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-[#c45d2a]"
                placeholder="Search by product, brand, bike model or keyword..."
              />

              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                <path d="m21 21-4.3-4.3" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            {/* Sort */}
            <select
              id="sortSelect"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="rounded-xl border border-black/15 bg-white px-4 py-3 text-sm font-medium"
            >
              <option value="newest">Newest First (Default)</option>
              <option value="price-low">Price : Low to High</option>
              <option value="price-high">Price : High to Low</option>
              <option value="name">Product Name (A-Z)</option>
            </select>
          </div>

          {/* Quick Search */}
          <div className="mt-6">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">
              Popular Searches
            </p>

            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    setCurrentPage(1);
                  }}
                  className="quick-search px-3 py-1.5 rounded-full bg-[#f4f4f4] text-sm"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div
          id="productGrid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id || product.slug}
              product={product}
              onViewDetails={(prod) => setSelectedProduct(prod)}
            />
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="text-center mt-10">
            <button
              id="loadMoreBtn"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-8 py-3 rounded-xl bg-[#18382a] text-white font-semibold hover:bg-[#10281e] transition"
            >
              Load More Products
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <p
            id="emptyState"
            className="max-w-xl mx-auto text-center py-14 text-[#6c756b] leading-8"
          >
            We couldn't find any products matching your search or selected filters. Try a different keyword, browse another category or clear the filters to explore our full collection.
          </p>
        )}
      </section>

      {/* Quick View Product Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-[#18382a]">Loading Shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
