/**
 * Mototrek Product Data Model & Store Persistence Isolation
 * Full E-Commerce Product Architecture supporting:
 * - Basic Info, Brand, Category, Subcategory, Tags
 * - Identifiers: HSN, GST Rate, Barcode, Internal SKU
 * - Media: Images gallery & primary image
 * - Descriptions: Short, Full (Rich text), Key Features (Repeatable bullets)
 * - Category-Specific Specifications (Helmets, Jackets, Gloves, Boots, Pants, Luggage, Rainwear, Accessories)
 * - Variants: Matrix combinations (Colour + Size), unique SKUs, Price, Stock, Location, Status
 * - Pricing: MRP, Selling Price, Cost Price (Internal), Profit Margin, GST
 * - Inventory: Initial stock, Low Stock threshold, Reorder level, Location, Supplier
 * - Shipping: Weight, Dimensions (L x W x H), Shipping Class, Free Shipping
 * - Warranty & Returns: Warranty duration/info, Return eligibility/window
 * - What's Included & Care Instructions
 * - SEO: Slug, SEO Title, SEO Description, Search Keywords
 * - Publishing: Status (Draft, Active, Archived), Visibility (Visible, Hidden), Featured (Yes/No)
 * - Internal: Cost Price, Supplier, Purchase Cost, Internal Notes (Filtered out from public API)
 */

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

let categories = [
  "Helmets",
  "Jackets",
  "Gloves",
  "Pants",
  "Boots",
  "Luggage",
  "Rainwear",
  "Accessories"
];

let subcategories = {
  Helmets: ["Full Face", "Modular", "Open Face", "Off Road", "Dual Sport"],
  Jackets: ["Riding Jacket", "Adventure Jacket", "Touring Jacket", "Urban Jacket", "Rain Jacket"],
  Gloves: ["Racing", "Touring", "Adventure", "Urban", "Winter", "Summer"],
  Boots: ["Adventure", "Touring", "Racing", "Urban", "Off Road"],
  Pants: ["Adventure", "Touring", "Racing", "Urban", "Rain"],
  Luggage: ["Top Box", "Pannier", "Saddle Bag", "Tank Bag", "Tail Bag", "Backpack"],
  Rainwear: ["Jacket", "Pants", "Full Suit"],
  Accessories: ["Fog Lights", "Mobile Holder", "Chain Care", "Hydration", "Maintenance"]
};

let brands = [
  "Rynox",
  "Viaterra",
  "Axor",
  "SMK",
  "Motul",
  "Motorex",
  "Motorradical",
  "Steelbird",
  "Studds",
  "Scala",
  "Raida",
  "Mototrek"
];

let products = [
  {
    id: "prod-101",
    name: "Rynox Air GT Jacket",
    slug: "rynox-air-gt-jacket",
    type: "Multiple Variants",
    brand: "Rynox",
    category: "Jackets",
    subcategory: "Riding Jacket",
    tags: ["Touring", "Summer", "Protective", "Best Seller"],
    
    // Identifiers & Tax
    hsnCode: "6211",
    gstRate: "18%",
    internalSku: "RYN-AIRGT-2026",

    // Media
    images: ["/images/jacket.webp", "/images/jackets.webp"],

    // Content
    shortDescription: "Premium all-weather mesh riding jacket with Safe-Tech CE Level 2 armor.",
    description: "Built for long distance touring and daily commuting. Features heavy-duty 600D mesh, CE Level 2 protectors on shoulders, elbows, and back, thermal liner, and high-visibility reflective striping.",
    features: [
      "CE Level 2 armor on shoulders, elbows & back",
      "Heavy duty 600D polyester mesh outer shell",
      "Detachable thermal liner and rain cover included",
      "360-degree high visibility reflective trim",
      "Multiple arm and waist adjustment straps"
    ],

    // Category Specific Specifications (Jacket)
    specifications: {
      jacketType: "Touring",
      protection: ["Shoulder", "Elbow", "Back"],
      protectionCert: "CE Level 2",
      outerMaterial: "Textile / Mesh",
      waterproof: "Water Resistant",
      thermalLiner: "Removable"
    },

    // Sizing
    sizeType: "Apparel",
    sizes: ["M", "L", "XL"],
    fitType: "Regular",

    // Colours
    colours: ["Black", "Red"],

    // Variants Matrix
    variants: [
      { id: "v101-1", colour: "Black", size: "M", sku: "RAG-BLK-M", price: 5999, costPrice: 4200, stock: 8, lowStockThreshold: 3, location: "Main Store", status: "In Stock" },
      { id: "v101-2", colour: "Black", size: "L", sku: "RAG-BLK-L", price: 5999, costPrice: 4200, stock: 2, lowStockThreshold: 3, location: "Main Store", status: "Low Stock" },
      { id: "v101-3", colour: "Black", size: "XL", sku: "RAG-BLK-XL", price: 5999, costPrice: 4200, stock: 0, lowStockThreshold: 3, location: "Main Store", status: "Sold Out" },
      { id: "v101-4", colour: "Red", size: "M", sku: "RAG-RED-M", price: 5999, costPrice: 4200, stock: 5, lowStockThreshold: 3, location: "Warehouse", status: "In Stock" },
      { id: "v101-5", colour: "Red", size: "L", sku: "RAG-RED-L", price: 5999, costPrice: 4200, stock: 0, lowStockThreshold: 3, location: "Warehouse", status: "Sold Out" }
    ],

    // Pricing
    mrp: 6999,
    price: 5999,
    discountPercent: 14,
    costPrice: 4200, // Internal
    marginPercent: 30, // Internal

    // Inventory Defaults
    totalStock: 15,
    lowStockThreshold: 3,
    reorderLevel: 5,
    warehouseLocation: "Main Store",
    supplier: "Rynox India",
    supplierSku: "RYN-GT-BLK",

    // Shipping
    physicalProduct: true,
    weight: "1.65 kg",
    dimensions: { length: "45", width: "35", height: "15" },
    shippingClass: "Standard",
    freeShipping: true,

    // Customer Info & Warranty
    warrantyType: "Manufacturer Warranty",
    warrantyDuration: "1 Year",
    warrantyInfo: "1 Year official manufacturer warranty covering zippers and seam defects.",
    whatsIncluded: ["1 × Rynox Air GT Jacket", "1 × CE Level 2 Back Protector", "1 × Detachable Thermal Liner"],
    careInstructions: "Hand wash with mild detergent. Remove armors before washing.",
    returnEligibility: "Eligible",
    returnWindow: "10 Days",

    // SEO
    seoTitle: "Buy Rynox Air GT Riding Jacket Online | Mototrek Pune",
    seoDescription: "Shop genuine Rynox Air GT Mesh Riding Jacket with CE Level 2 armor. Fast shipping and expert fit guidance at Mototrek Pune.",
    searchKeywords: "rynox, air gt, riding jacket, mesh jacket, ce level 2",

    // Publishing
    status: "Active",
    visibility: "Visible",
    featured: "Yes",
    createdAt: new Date("2026-08-14T00:00:00.000Z").toISOString(),
    publishedAt: new Date("2026-08-14T00:00:00.000Z").toISOString(),

    // Internal Notes (Filtered)
    internalNotes: "Popular summer riding jacket. High reorder frequency."
  },
  {
    id: "prod-102",
    name: "Axor Apex Superfly Helmet",
    slug: "axor-apex-superfly-helmet",
    type: "Multiple Variants",
    brand: "Axor",
    category: "Helmets",
    subcategory: "Full Face",
    tags: ["Full Face", "DOT", "ECE", "Best Seller"],
    hsnCode: "6506",
    gstRate: "18%",
    internalSku: "AX-APX-SF-2026",
    images: ["/images/axor-apex-superfly.webp"],
    shortDescription: "DOT and ECE certified full face motorcycle helmet with aerodynamic spoiler.",
    description: "Features high impact ABS shell, dual visor system with drop-down sun visor, anti-fog pinlock ready clear visor, and washable anti-bacterial liner.",
    features: [
      "ECE 22.05 & DOT certified safety shell",
      "Integrated inner sun visor and pinlock ready main shield",
      "Aerodynamic tail spoiler for high speed stability",
      "Fully removable and washable comfort liner",
      "Micrometric quick-release buckle strap"
    ],
    specifications: {
      helmetType: "Full Face",
      certification: ["DOT", "ECE 22.05", "ISI"],
      shellMaterial: "Polycarbonate / ABS",
      weight: "1.45 kg",
      visor: "Dual Visor (Clear + Sun Shield)",
      closure: "Micrometric"
    },
    sizeType: "Helmet",
    sizes: ["S", "M", "L", "XL"],
    colours: ["Black/Red"],
    variants: [
      { id: "v102-1", colour: "Black/Red", size: "M", sku: "AX-APX-BLK-M", price: 4994, costPrice: 3500, stock: 12, lowStockThreshold: 3, location: "Main Store", status: "In Stock" },
      { id: "v102-2", colour: "Black/Red", size: "L", sku: "AX-APX-BLK-L", price: 4994, costPrice: 3500, stock: 2, lowStockThreshold: 3, location: "Main Store", status: "Low Stock" },
      { id: "v102-3", colour: "Black/Red", size: "XL", sku: "AX-APX-BLK-XL", price: 4994, costPrice: 3500, stock: 0, lowStockThreshold: 3, location: "Main Store", status: "Sold Out" }
    ],
    mrp: 5499,
    price: 4994,
    discountPercent: 9,
    costPrice: 3500,
    marginPercent: 29,
    totalStock: 14,
    lowStockThreshold: 3,
    physicalProduct: true,
    weight: "1.45 kg",
    dimensions: { length: "38", width: "28", height: "28" },
    shippingClass: "Standard",
    freeShipping: true,
    warrantyType: "Manufacturer Warranty",
    warrantyDuration: "1 Year",
    whatsIncluded: ["1 × Axor Apex Superfly Helmet", "1 × Helmet Bag", "1 × User Manual"],
    returnEligibility: "Eligible",
    returnWindow: "7 Days",
    status: "Active",
    visibility: "Visible",
    featured: "Yes",
    createdAt: new Date("2026-08-13T12:00:00.000Z").toISOString(),
    publishedAt: new Date("2026-08-13T12:00:00.000Z").toISOString()
  }
];

let stockAdjustmentLogs = [];

class ProductModel {
  static getAllProducts({ category, brand, search, status, visibility, sort = 'newest' }) {
    let result = [...products];

    if (status) {
      result = result.filter(p => p.status === status);
    }
    if (visibility) {
      result = result.filter(p => p.visibility === visibility);
    }
    if (category && category !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (brand && brand !== 'All') {
      result = result.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.internalSku && p.internalSku.toLowerCase().includes(q)) ||
        (p.variants && p.variants.some(v => v.sku.toLowerCase().includes(q)))
      );
    }

    // Default Sorting: Newest First
    if (sort === 'newest') {
      result.sort((a, b) => new Date(b.publishedAt || b.createdAt) - new Date(a.publishedAt || a.createdAt));
    } else if (sort === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }

  static getPublicProductBySlug(slug) {
    const raw = products.find(p => p.slug === slug || p.id === slug);
    if (!raw) return null;

    // Filter out internal fields from public response
    const { costPrice, marginPercent, supplier, supplierSku, purchaseCost, internalNotes, ...publicData } = raw;
    return publicData;
  }

  static getProductById(id) {
    return products.find(p => p.id === id);
  }

  static createProduct(data) {
    const baseSlug = slugify(data.name || "Product");
    let uniqueSlug = data.slug ? slugify(data.slug) : baseSlug;
    let count = 1;
    while (products.some(p => p.slug === uniqueSlug)) {
      uniqueSlug = `${baseSlug}-${count++}`;
    }

    const mrp = Number(data.mrp) || 0;
    const price = Number(data.price) || 0;
    const costPrice = Number(data.costPrice) || 0;

    let discountPercent = 0;
    if (mrp > price && mrp > 0) {
      discountPercent = Math.round(((mrp - price) / mrp) * 100);
    }

    let marginPercent = 0;
    if (price > costPrice && price > 0) {
      marginPercent = Math.round(((price - costPrice) / price) * 100);
    }

    const now = new Date().toISOString();

    const newProduct = {
      id: `prod-${Date.now()}`,
      name: data.name,
      slug: uniqueSlug,
      type: data.type || "Multiple Variants",
      brand: data.brand || "Mototrek",
      category: data.category || "General",
      subcategory: data.subcategory || "",
      tags: Array.isArray(data.tags) ? data.tags : [],

      hsnCode: data.hsnCode || "",
      gstRate: data.gstRate || "18%",
      internalSku: data.internalSku || `SKU-${Date.now()}`,
      barcode: data.barcode || "",

      images: Array.isArray(data.images) && data.images.length ? data.images : ["/images/helmet.webp"],

      shortDescription: data.shortDescription || "",
      description: data.description || "",
      features: Array.isArray(data.features) ? data.features : [],

      specifications: data.specifications || {},

      sizeType: data.sizeType || "Apparel",
      sizes: Array.isArray(data.sizes) ? data.sizes : [],
      colours: Array.isArray(data.colours) ? data.colours : [],
      fitType: data.fitType || "Regular",

      variants: (data.variants || []).map((v, idx) => ({
        id: `var-${Date.now()}-${idx}`,
        colour: v.colour || "Standard",
        size: v.size || "One Size",
        sku: v.sku || `SKU-${Date.now()}-${idx}`,
        price: Number(v.price) || price,
        costPrice: Number(v.costPrice) || costPrice,
        stock: Number(v.stock) || 0,
        lowStockThreshold: Number(v.lowStockThreshold) || Number(data.lowStockThreshold) || 3,
        location: v.location || data.warehouseLocation || "Main Store",
        status: (Number(v.stock) || 0) === 0 ? "Sold Out" : (Number(v.stock) || 0) <= 3 ? "Low Stock" : "In Stock"
      })),

      mrp,
      price,
      discountPercent,
      costPrice,
      marginPercent,

      totalStock: (data.variants || []).reduce((acc, v) => acc + (Number(v.stock) || 0), 0),
      lowStockThreshold: Number(data.lowStockThreshold) || 3,
      reorderLevel: Number(data.reorderLevel) || 5,
      warehouseLocation: data.warehouseLocation || "Main Store",
      supplier: data.supplier || "",
      supplierSku: data.supplierSku || "",

      physicalProduct: data.physicalProduct !== false,
      weight: data.weight || "1.0 kg",
      dimensions: data.dimensions || { length: "", width: "", height: "" },
      shippingClass: data.shippingClass || "Standard",
      freeShipping: Boolean(data.freeShipping),

      warrantyType: data.warrantyType || "No Warranty",
      warrantyDuration: data.warrantyDuration || "",
      warrantyInfo: data.warrantyInfo || "",
      whatsIncluded: Array.isArray(data.whatsIncluded) ? data.whatsIncluded : [],
      careInstructions: data.careInstructions || "",
      returnEligibility: data.returnEligibility || "Eligible",
      returnWindow: data.returnWindow || "10 Days",

      seoTitle: data.seoTitle || data.name,
      seoDescription: data.seoDescription || data.shortDescription || "",
      searchKeywords: data.searchKeywords || "",

      status: data.status || "Draft",
      visibility: data.visibility || "Visible",
      featured: data.featured || "No",
      createdAt: now,
      publishedAt: data.status === "Active" ? now : null,

      internalNotes: data.internalNotes || ""
    };

    products.unshift(newProduct);
    return newProduct;
  }

  static updateProduct(id, data) {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    const existing = products[index];
    const mrp = Number(data.mrp) || existing.mrp;
    const price = Number(data.price) || existing.price;
    const costPrice = Number(data.costPrice) || existing.costPrice;

    let discountPercent = 0;
    if (mrp > price && mrp > 0) {
      discountPercent = Math.round(((mrp - price) / mrp) * 100);
    }

    let marginPercent = 0;
    if (price > costPrice && price > 0) {
      marginPercent = Math.round(((price - costPrice) / price) * 100);
    }

    const updated = {
      ...existing,
      ...data,
      mrp,
      price,
      costPrice,
      discountPercent,
      marginPercent,
      updatedAt: new Date().toISOString(),
      publishedAt: data.status === "Active" && !existing.publishedAt ? new Date().toISOString() : existing.publishedAt
    };

    products[index] = updated;
    return updated;
  }

  static duplicateProduct(id) {
    const original = this.getProductById(id);
    if (!original) return null;

    const duplicated = {
      ...original,
      id: `prod-${Date.now()}`,
      name: `${original.name} (Copy)`,
      slug: `${original.slug}-copy-${Date.now()}`,
      status: "Draft",
      publishedAt: null,
      createdAt: new Date().toISOString(),
      variants: (original.variants || []).map((v, idx) => ({
        ...v,
        id: `var-${Date.now()}-${idx}`,
        sku: `${v.sku}-COPY`,
        stock: 0,
        status: "Sold Out"
      })),
      totalStock: 0
    };

    products.unshift(duplicated);
    return duplicated;
  }

  static adjustStock(variantId, adjustment, reason, adminName = "Admin") {
    for (const p of products) {
      const v = (p.variants || []).find(varItem => varItem.id === variantId || varItem.sku === variantId);
      if (v) {
        const oldStock = v.stock;
        v.stock = Math.max(0, v.stock + Number(adjustment));
        v.status = v.stock === 0 ? "Sold Out" : v.stock <= (v.lowStockThreshold || 3) ? "Low Stock" : "In Stock";
        
        p.totalStock = p.variants.reduce((sum, item) => sum + item.stock, 0);

        const logEntry = {
          id: `log-${Date.now()}`,
          productId: p.id,
          productName: p.name,
          variantSku: v.sku,
          colour: v.colour,
          size: v.size,
          oldStock,
          newStock: v.stock,
          adjustment: Number(adjustment),
          reason: reason || "Manual Correction",
          adminName,
          timestamp: new Date().toISOString()
        };

        stockAdjustmentLogs.unshift(logEntry);
        return { success: true, variant: v, product: p };
      } else if (p.id === variantId || p.sku === variantId) {
        const oldStock = p.stock || 0;
        p.stock = Math.max(0, oldStock + Number(adjustment));
        p.totalStock = p.stock;

        const logEntry = {
          id: `log-${Date.now()}`,
          productId: p.id,
          productName: p.name,
          variantSku: p.sku || p.id,
          colour: "Default",
          size: "Standard",
          oldStock,
          newStock: p.stock,
          adjustment: Number(adjustment),
          reason: reason || "Manual Correction",
          adminName,
          timestamp: new Date().toISOString()
        };

        stockAdjustmentLogs.unshift(logEntry);
        return { success: true, product: p };
      }
    }
    return { success: false };
  }

  static getCategories() { return categories; }
  static getSubcategories() { return subcategories; }
  static getBrands() { return brands; }
  static getStockLogs() { return stockAdjustmentLogs; }
  static seedProducts(dataList) {
    products = [...dataList];
    return products;
  }
}

module.exports = ProductModel;
