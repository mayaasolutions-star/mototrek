"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import {
  ArrowLeft,
  Save,
  ExternalLink,
  Plus,
  Trash2,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Tag,
  Boxes,
  Percent,
  Layers,
  Sparkles,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Truck,
  FileText,
  HelpCircle,
  Eye,
  Info,
  DollarSign,
  Briefcase,
  Grid,
  CheckSquare,
  Square,
  X,
  Edit3,
  Search,
} from "lucide-react";

const STANDARD_COLOURS = [
  "Black", "White", "Red", "Blue", "Grey", "Green", "Yellow", "Orange", "Navy", "Olive", "Brown", "Beige", "Silver", "Gold", "Multi"
];

const STANDARD_SIZES = [
  "XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "39", "40", "41", "42", "43", "44", "45", "46", "One Size"
];

const STANDARD_CAPACITIES = [
  "15L", "25L", "30L", "45L", "60L", "80L"
];

const COMMON_OPTION_TYPES = [
  "Colour", "Size", "Capacity", "Configuration", "Fit", "Length", "Mounting Type", "Model", "Other"
];

const SUBCATEGORIES_MAP = {
  Helmets: ["Full Face", "Modular", "Open Face", "Off Road", "Dual Sport"],
  Jackets: ["Riding Jacket", "Adventure Jacket", "Touring Jacket", "Urban Jacket", "Rain Jacket"],
  Gloves: ["Racing", "Touring", "Adventure", "Urban", "Winter", "Summer"],
  Boots: ["Adventure", "Touring", "Racing", "Urban", "Off Road"],
  Pants: ["Adventure", "Touring", "Racing", "Urban", "Rain"],
  Luggage: ["Top Box", "Pannier", "Saddle Bag", "Tank Bag", "Tail Bag", "Backpack"],
  Rainwear: ["Jacket", "Pants", "Full Suit"],
  Accessories: ["Fog Lights", "Mobile Holder", "Chain Care", "Hydration", "Maintenance"]
};

function SharedProductFormContent({ initialMode = "create", initialProductId = null }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();

  const urlEditId = (searchParams ? searchParams.get("edit") : null) || (params ? params.id : null);
  const isEdit = initialMode === "edit" || Boolean(urlEditId);
  const targetProductId = initialProductId || urlEditId;

  const loadedProductRef = useRef(false);

  // SAVING & FEEDBACK STATE
  const [isSaving, setIsSaving] = useState(false);
  const [savedProduct, setSavedProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [sizeType, setSizeType] = useState("Alpha (S, M, L)");
  const [fitType, setFitType] = useState("Regular Fit");

  // PRODUCT BASIC INFORMATION
  const [name, setName] = useState("");
  const [type, setType] = useState("Multiple Variants");
  const [brand, setBrand] = useState("Rynox");
  const [category, setCategory] = useState("Jackets");
  const [subcategory, setSubcategory] = useState("Riding Jacket");
  const [modelSeries, setModelSeries] = useState("");
  const [shortName, setShortName] = useState("");
  const [slug, setSlug] = useState("");
  const [tags, setTags] = useState(["Touring", "Best Seller"]);
  const [tagInput, setTagInput] = useState("");
  const [featured, setFeatured] = useState("No");
  const [bestSeller, setBestSeller] = useState("No");
  const [newArrival, setNewArrival] = useState("Yes");

  const [brandsList] = useState(["Rynox", "Viaterra", "Axor", "SMK", "Motul", "Motorex", "Steelbird", "Studds", "Scala", "Raida", "Mototrek"]);
  const [categoriesList] = useState(["Helmets", "Jackets", "Gloves", "Pants", "Boots", "Luggage", "Rainwear", "Accessories"]);

  // PRODUCT IDENTIFICATION & TAX
  const [sku, setSku] = useState("");
  const [brandSku, setBrandSku] = useState("");
  const [internalSku, setInternalSku] = useState("");
  const [barcode, setBarcode] = useState("");
  const [hsnCode, setHsnCode] = useState("6211");
  const [gstRate, setGstRate] = useState("18%");
  const [manufacturer, setManufacturer] = useState("Rynox Gears");
  const [countryOfOrigin, setCountryOfOrigin] = useState("India");

  // PRODUCT IMAGES GALLERY
  const [images, setImages] = useState(["/images/jacket.webp", "/images/jackets.webp"]);
  const [primaryImageIndex, setPrimaryImageIndex] = useState(0);
  const [imageAltText, setImageAltText] = useState("Rynox Riding Jacket");

  // DESCRIPTIONS & KEY FEATURES
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([
    "CE Level 2 armor on shoulders, elbows & back",
    "Heavy duty 600D polyester mesh outer shell",
    "Detachable thermal liner and rain cover included"
  ]);
  const [featureInput, setFeatureInput] = useState("");

  // PRODUCT SPECIFICATIONS
  const [specHelmetType, setSpecHelmetType] = useState("Full Face");
  const [specCertifications, setSpecCertifications] = useState(["ECE 22.05", "DOT", "ISI"]);
  const [specShellMaterial, setSpecShellMaterial] = useState("Polycarbonate / ABS");
  const [specHelmetWeight, setSpecHelmetWeight] = useState("1.45 kg");
  const [specVisor, setSpecVisor] = useState("Dual Visor (Clear + Sun Shield)");
  const [specClosure, setSpecClosure] = useState("Micrometric");

  const [specJacketType, setSpecJacketType] = useState("Touring");
  const [specProtections, setSpecProtections] = useState(["Shoulder", "Elbow", "Back"]);
  const [specProtectionCert, setSpecProtectionCert] = useState("CE Level 2");
  const [specOuterMaterial, setSpecOuterMaterial] = useState("Textile / Mesh");
  const [specWaterproof, setSpecWaterproof] = useState("Water Resistant");
  const [specThermalLiner, setSpecThermalLiner] = useState("Removable");

  const [specTouchscreen, setSpecTouchscreen] = useState("Yes");
  const [specLuggageCapacity, setSpecLuggageCapacity] = useState("30 L");

  // PRICING & COST MARGIN (PRODUCT DEFAULTS)
  const [mrp, setMrp] = useState("6999");
  const [price, setPrice] = useState("5999");
  const [costPrice, setCostPrice] = useState("4200");

  // INVENTORY & STORE LOCATIONS (PRODUCT DEFAULTS)
  const [stockTrackingEnabled, setStockTrackingEnabled] = useState(true);
  const [openingStock, setOpeningStock] = useState("15");
  const [currentStock, setCurrentStock] = useState("15");
  const [reservedStock, setReservedStock] = useState("2");
  const [lowStockThreshold, setLowStockThreshold] = useState("3");
  const [reorderLevel, setReorderLevel] = useState("5");
  const [storeStock, setStoreStock] = useState("8");
  const [onlineStock, setOnlineStock] = useState("7");

  // ONLINE / STORE AVAILABILITY
  const [availableOnline, setAvailableOnline] = useState(true);
  const [availableInStore, setAvailableInStore] = useState(true);
  const [allowBackorder, setAllowBackorder] = useState(false);
  const [stockStatus, setStockStatus] = useState("In Stock");
  const [restockDate, setRestockDate] = useState("");

  // WARRANTY & AFTER-SALES
  const [warrantyAvailable, setWarrantyAvailable] = useState(true);
  const [warrantyType, setWarrantyType] = useState("Manufacturer Warranty");
  const [warrantyDuration, setWarrantyDuration] = useState("1 Year");
  const [warrantyProvider, setWarrantyProvider] = useState("Rynox Gears");
  const [warrantyTerms, setWarrantyTerms] = useState("Covers zipper and stitching defects.");
  const [returnEligibility, setReturnEligibility] = useState("Eligible");
  const [returnWindow, setReturnWindow] = useState("10 Days");

  // CARE & USAGE INFORMATION
  const [careInstructions, setCareInstructions] = useState("Hand wash with mild detergent. Remove armors before washing.");
  const [washingInstructions, setWashingInstructions] = useState("Do not machine wash or dry clean.");

  // SHIPPING SPECIFICATIONS
  const [physicalProduct, setPhysicalProduct] = useState(true);
  const [weight, setWeight] = useState("1.65");
  const [lengthCm, setLengthCm] = useState("45");
  const [widthCm, setWidthCm] = useState("35");
  const [heightCm, setHeightCm] = useState("15");
  const [shippingClass, setShippingClass] = useState("Standard");
  const [freeShipping, setFreeShipping] = useState(true);

  // VEHICLE COMPATIBILITY
  const [vehicleCompatibility, setVehicleCompatibility] = useState("Universal");
  const [fitmentNotes, setFitmentNotes] = useState("Fits all standard touring and adventure motorcycles.");

  // BRAND & CONTENT INFORMATION
  const [brandStory, setBrandStory] = useState("Rynox Gears is India's leading motorcycle protective gear manufacturer.");
  const [manualUrl, setManualUrl] = useState("");

  // PROMOTIONAL ELIGIBILITY
  const [eligibleStoreCoupons, setEligibleStoreCoupons] = useState(true);
  const [eligibleProductDiscounts, setEligibleProductDiscounts] = useState(true);

  // RELATED PRODUCTS
  const [relatedProducts, setRelatedProducts] = useState(["Rynox Gloves", "Rynox Riding Pants"]);

  // PUBLICATION STATUS & STORE VISIBILITY
  const [status, setStatus] = useState("Active");
  const [visibility, setVisibility] = useState("Visible");
  const [publishImmediately, setPublishImmediately] = useState(true);

  // INTERNAL TEAM INFORMATION
  const [internalNotes, setInternalNotes] = useState("Popular summer riding jacket. High reorder frequency.");
  const [supplier, setSupplier] = useState("Rynox India");
  const [supplierSku, setSupplierSku] = useState("RYN-SUP-991");

  // VARIANTS & ELEGANT OPTIONS ENGINE
  const [productOptions, setProductOptions] = useState([
    { id: "opt-colour", name: "Colour", values: ["Black", "Grey", "Red"] },
    { id: "opt-size", name: "Size", values: ["S", "M", "L", "XL"] }
  ]);

  // Popover State for Option Values & New Options
  const [activePopoverOptionId, setActivePopoverOptionId] = useState(null);
  const [popoverSearch, setPopoverSearch] = useState("");
  const [showAddOptionDropdown, setShowAddOptionDropdown] = useState(false);
  const [customOptionInput, setCustomOptionInput] = useState("");
  const [showCustomOptionForm, setShowCustomOptionForm] = useState(false);

  // Matrix combinations map for Quick Generator
  const [showOptionalGenerator, setShowOptionalGenerator] = useState(false);
  const [selectedMatrixMap, setSelectedMatrixMap] = useState({
    "Black-S": true,
    "Black-M": true,
    "Black-L": true,
    "Black-XL": true,
    "Grey-M": true,
    "Grey-L": true,
    "Grey-XL": true,
    "Red-L": true,
  });

  const [generatedVariants, setGeneratedVariants] = useState([]);

  // Compact Inline Add Single Variant State (Inherits Product Defaults!)
  const [showInlineAddVariant, setShowInlineAddVariant] = useState(false);
  const [singleVarOptionSelections, setSingleVarOptionSelections] = useState({ Colour: "Black", Size: "M" });
  const [singleVarSku, setSingleVarSku] = useState("");
  const [singleVarMrp, setSingleVarMrp] = useState(mrp);
  const [singleVarPrice, setSingleVarPrice] = useState(price);
  const [singleVarCost, setSingleVarCost] = useState(costPrice);
  const [singleVarStock, setSingleVarStock] = useState("5");
  const [singleVarReorder, setSingleVarReorder] = useState(reorderLevel || "2");
  const [duplicateVarError, setDuplicateVarError] = useState("");

  // Inline Row Editing Index
  const [editingRowIndex, setEditingRowIndex] = useState(null);

  // COLLAPSIBLE ACCORDIONS STATE (WITHOUT SECTION NUMBERS)
  const [openSections, setOpenSections] = useState({
    basic: true,
    identification: true,
    gallery: true,
    descriptions: true,
    specifications: true,
    variants: true,
    pricing: true,
    inventory: true,
    availability: true,
    warranty: false,
    care: false,
    shipping: false,
    compatibility: false,
    brandContent: false,
    coupons: false,
    publishing: true,
    internal: false,
  });

  const toggleSection = (sec) => {
    setOpenSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  // SKU Auto-Suggestion Helper
  const generateSKU = (prodName, col, sz) => {
    const pCode = (prodName || "MOT").split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 3) || "MOT";
    const cCode = (col || "STD").slice(0, 3).toUpperCase();
    return `${pCode}-${cCode}-${sz || "STD"}`;
  };

  // EDIT MODE: FETCH AND PRE-FILL PRODUCT DATA
  useEffect(() => {
    if (isEdit && targetProductId) {
      fetch(`http://localhost:5000/api/v1/products/admin/id/${targetProductId}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.success && json.data) {
            const prod = json.data;
            loadedProductRef.current = true;

            setName(prod.name || "");
            setType(prod.type || "Multiple Variants");
            setBrand(prod.brand || "Mototrek");
            setCategory(prod.category || "Jackets");
            setSubcategory(prod.subcategory || "");
            setModelSeries(prod.modelSeries || "");
            setShortName(prod.shortName || "");
            setSlug(prod.slug || "");
            if (Array.isArray(prod.tags)) setTags(prod.tags);
            setFeatured(prod.featured || "No");
            setBestSeller(prod.bestSeller || "No");
            setNewArrival(prod.newArrival || "Yes");

            setSku(prod.sku || prod.internalSku || "");
            setBrandSku(prod.brandSku || "");
            setInternalSku(prod.internalSku || "");
            setBarcode(prod.barcode || "");
            setHsnCode(prod.hsnCode || "6211");
            setGstRate(prod.gstRate || "18%");
            setManufacturer(prod.manufacturer || "Rynox Gears");
            setCountryOfOrigin(prod.countryOfOrigin || "India");

            if (Array.isArray(prod.images) && prod.images.length) setImages(prod.images);
            setShortDescription(prod.shortDescription || "");
            setDescription(prod.description || "");
            if (Array.isArray(prod.features)) setFeatures(prod.features);

            if (prod.specifications) {
              if (prod.specifications.helmetType) setSpecHelmetType(prod.specifications.helmetType);
              if (prod.specifications.jacketType) setSpecJacketType(prod.specifications.jacketType);
              if (prod.specifications.touchscreen) setSpecTouchscreen(prod.specifications.touchscreen);
              if (prod.specifications.capacity) setSpecLuggageCapacity(prod.specifications.capacity);
            }

            // Populate Product Options
            const cols = Array.isArray(prod.colours) && prod.colours.length ? prod.colours : ["Black", "Grey", "Red"];
            const szs = Array.isArray(prod.sizes) && prod.sizes.length ? prod.sizes : ["S", "M", "L", "XL"];
            
            setProductOptions([
              { id: "opt-colour", name: "Colour", values: cols },
              { id: "opt-size", name: "Size", values: szs }
            ]);

            if (Array.isArray(prod.variants) && prod.variants.length) {
              setGeneratedVariants(prod.variants);
              const mapObj = {};
              prod.variants.forEach((v) => {
                mapObj[`${v.colour}-${v.size}`] = true;
              });
              setSelectedMatrixMap(mapObj);
            }

            setMrp(String(prod.mrp || 6999));
            setPrice(String(prod.price || 5999));
            setCostPrice(String(prod.costPrice || 4200));

            setStockTrackingEnabled(prod.stockTrackingEnabled !== false);
            setOpeningStock(String(prod.openingStock || prod.stock || 15));
            setCurrentStock(String(prod.stock || 15));
            setReservedStock(String(prod.reservedStock || 2));
            setLowStockThreshold(String(prod.lowStockThreshold || 3));
            setReorderLevel(String(prod.reorderLevel || 5));
            setStoreStock(String(prod.storeStock || 8));
            setOnlineStock(String(prod.onlineStock || 7));

            setAvailableOnline(prod.availableOnline !== false);
            setAvailableInStore(prod.availableInStore !== false);
            setAllowBackorder(prod.allowBackorder === true);
            setStockStatus(prod.stockStatus || "In Stock");

            setWarrantyAvailable(prod.warrantyAvailable !== false);
            setWarrantyType(prod.warrantyType || "Manufacturer Warranty");
            setWarrantyDuration(prod.warrantyDuration || "1 Year");
            setWarrantyProvider(prod.warrantyProvider || "Rynox Gears");
            setWarrantyTerms(prod.warrantyTerms || "");
            setReturnEligibility(prod.returnEligibility || "Eligible");
            setReturnWindow(prod.returnWindow || "10 Days");

            setCareInstructions(prod.careInstructions || "");
            setWashingInstructions(prod.washingInstructions || "");

            setPhysicalProduct(prod.physicalProduct !== false);
            setWeight(String(prod.weight || "1.65"));
            if (prod.dimensions) {
              setLengthCm(String(prod.dimensions.length || "45"));
              setWidthCm(String(prod.dimensions.width || "35"));
              setHeightCm(String(prod.dimensions.height || "15"));
            }
            setShippingClass(prod.shippingClass || "Standard");
            setFreeShipping(prod.freeShipping !== false);

            setVehicleCompatibility(prod.vehicleCompatibility || "Universal");
            setFitmentNotes(prod.fitmentNotes || "");

            setBrandStory(prod.brandStory || "");
            setManualUrl(prod.manualUrl || "");

            setEligibleStoreCoupons(prod.eligibleStoreCoupons !== false);
            setEligibleProductDiscounts(prod.eligibleProductDiscounts !== false);

            setStatus(prod.status || "Active");
            setVisibility(prod.visibility || "Visible");

            setInternalNotes(prod.internalNotes || "");
            setSupplier(prod.supplier || "Supplier");
            setSupplierSku(prod.supplierSku || "");
          }
        })
        .catch((err) => console.log("Edit product load info:", err.message));
    }
  }, [isEdit, targetProductId]);

  // Initial Variant Seed for Create Mode (Demo Jacket variants)
  useEffect(() => {
    if (!isEdit && generatedVariants.length === 0) {
      const defaultMrpVal = Number(mrp) || 6999;
      const defaultPriceVal = Number(price) || 5999;
      const defaultCostVal = Number(costPrice) || 4200;

      const initialVars = [
        { colour: "Black", size: "S", sku: generateSKU(name, "Black", "S"), mrp: defaultMrpVal, price: defaultPriceVal, costPrice: defaultCostVal, stock: 2, location: "Main Store" },
        { colour: "Black", size: "M", sku: generateSKU(name, "Black", "M"), mrp: defaultMrpVal, price: defaultPriceVal, costPrice: defaultCostVal, stock: 5, location: "Main Store" },
        { colour: "Black", size: "L", sku: generateSKU(name, "Black", "L"), mrp: defaultMrpVal, price: 6299, costPrice: 4400, stock: 8, location: "Main Store" },
        { colour: "Black", size: "XL", sku: generateSKU(name, "Black", "XL"), mrp: defaultMrpVal, price: defaultPriceVal, costPrice: defaultCostVal, stock: 4, location: "Main Store" },
        { colour: "Grey", size: "M", sku: generateSKU(name, "Grey", "M"), mrp: defaultMrpVal, price: defaultPriceVal, costPrice: defaultCostVal, stock: 3, location: "Main Store" },
        { colour: "Grey", size: "L", sku: generateSKU(name, "Grey", "L"), mrp: defaultMrpVal, price: defaultPriceVal, costPrice: defaultCostVal, stock: 4, location: "Main Store" },
        { colour: "Grey", size: "XL", sku: generateSKU(name, "Grey", "XL"), mrp: defaultMrpVal, price: defaultPriceVal, costPrice: defaultCostVal, stock: 2, location: "Main Store" },
        { colour: "Red", size: "L", sku: generateSKU(name, "Red", "L"), mrp: defaultMrpVal, price: defaultPriceVal, costPrice: defaultCostVal, stock: 1, location: "Main Store" },
      ];
      setGeneratedVariants(initialVars);
    }
  }, [isEdit]);

  // Auto-calculate Discount & Profit Margin
  const numMrp = Number(mrp) || 0;
  const numPrice = Number(price) || 0;
  const numCost = Number(costPrice) || 0;

  let discountBadge = "0% OFF";
  if (numMrp > numPrice && numMrp > 0) {
    const disc = Math.round(((numMrp - numPrice) / numMrp) * 100);
    discountBadge = `${disc}% OFF`;
  }

  let profitAmount = Math.max(0, numPrice - numCost);
  let profitMarginText = "0%";
  if (numPrice > numCost && numPrice > 0) {
    const margin = Math.round(((numPrice - numCost) / numPrice) * 100);
    profitMarginText = `₹${profitAmount} (${margin}% Margin)`;
  }

  // OPTION VALUE ENGINE HANDLERS
  const handleAddOptionValue = (optionId, valueToAdd) => {
    const val = valueToAdd.trim();
    if (!val) return;

    setProductOptions((prevOptions) =>
      prevOptions.map((opt) => {
        if (opt.id === optionId) {
          const currentVals = Array.isArray(opt.values) ? opt.values : [];
          if (!currentVals.includes(val)) {
            return { ...opt, values: [...currentVals, val] };
          }
        }
        return opt;
      })
    );

    setActivePopoverOptionId(null);
    setPopoverSearch("");
  };

  const handleRemoveOptionValue = (optionId, valToRemove) => {
    const targetOption = productOptions.find((o) => o.id === optionId);
    if (!targetOption) return;

    // Check if used by any actual variants
    const usedInVariants = generatedVariants.filter(
      (v) => v.colour === valToRemove || v.size === valToRemove || Object.values(v).includes(valToRemove)
    );

    if (usedInVariants.length > 0) {
      const confirmRemove = window.confirm(
        `"${valToRemove}" is currently used by ${usedInVariants.length} actual variant(s).\nDo you still want to remove "${valToRemove}" from available options?`
      );
      if (!confirmRemove) return;
    }

    setProductOptions((prevOptions) =>
      prevOptions.map((opt) => {
        if (opt.id === optionId) {
          const currentVals = Array.isArray(opt.values) ? opt.values : [];
          return { ...opt, values: currentVals.filter((v) => v !== valToRemove) };
        }
        return opt;
      })
    );
  };

  const handleAddOptionType = (typeName) => {
    if (!typeName) return;
    const existing = productOptions.find((o) => o.name.toLowerCase() === typeName.toLowerCase());
    if (existing) {
      alert(`Option "${typeName}" already exists!`);
      setShowAddOptionDropdown(false);
      return;
    }

    const newOpt = {
      id: `opt-${Date.now()}`,
      name: typeName,
      values: typeName === "Colour" ? ["Black"] : typeName === "Size" ? ["M"] : ["Default"],
    };

    setProductOptions([...productOptions, newOpt]);
    setShowAddOptionDropdown(false);
    setShowCustomOptionForm(false);
    setCustomOptionInput("");
  };

  const handleRemoveOptionRow = (optionId) => {
    const target = productOptions.find((o) => o.id === optionId);
    if (!target) return;

    if (productOptions.length <= 1) {
      alert("At least one option should remain or you can leave options empty.");
    }

    setProductOptions(productOptions.filter((o) => o.id !== optionId));
  };

  // Quick Matrix Combination Selector Handlers
  const colourOpt = (productOptions && productOptions.find((o) => o.name === "Colour")) || { values: ["Black", "Grey", "Red"] };
  const sizeOpt = (productOptions && productOptions.find((o) => o.name === "Size")) || { values: ["S", "M", "L", "XL"] };

  const colourOptValues = Array.isArray(colourOpt.values) ? colourOpt.values : [];
  const sizeOptValues = Array.isArray(sizeOpt.values) ? sizeOpt.values : [];

  const toggleMatrixCombination = (col, sz) => {
    const key = `${col}-${sz}`;
    setSelectedMatrixMap((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleGenerateCheckedVariants = () => {
    const updatedVars = [...generatedVariants];
    const defaultMrpVal = Number(mrp) || 6999;
    const defaultPriceVal = Number(price) || 5999;
    const defaultCostVal = Number(costPrice) || 4200;

    colourOptValues.forEach((col) => {
      sizeOptValues.forEach((sz) => {
        const key = `${col}-${sz}`;
        if (selectedMatrixMap[key]) {
          const exists = updatedVars.some((v) => v.colour === col && v.size === sz);
          if (!exists) {
            updatedVars.push({
              colour: col,
              size: sz,
              sku: generateSKU(name, col, sz),
              mrp: defaultMrpVal,
              price: defaultPriceVal,
              costPrice: defaultCostVal,
              stock: 5,
              location: "Main Store",
            });
          }
        }
      });
    });

    setGeneratedVariants(updatedVars);
    setShowOptionalGenerator(false);
  };

  // Single Variant Addition (Pre-fills Product Defaults & Checks Duplicate)
  const handleCheckAndAddSingleVariant = () => {
    setDuplicateVarError("");

    const selCol = singleVarOptionSelections["Colour"] || colourOptValues[0] || "Black";
    const selSz = singleVarOptionSelections["Size"] || sizeOptValues[0] || "M";

    // Duplicate Check
    const exists = generatedVariants.some((v) => v.colour === selCol && v.size === selSz);
    if (exists) {
      setDuplicateVarError(`${selCol} / ${selSz} already exists.`);
      return;
    }

    const newVar = {
      colour: selCol,
      size: selSz,
      sku: singleVarSku || generateSKU(name, selCol, selSz),
      mrp: Number(singleVarMrp) || Number(mrp) || 6999,
      price: Number(singleVarPrice) || Number(price) || 5999,
      costPrice: Number(singleVarCost) || Number(costPrice) || 4200,
      stock: Number(singleVarStock) || 5,
      reorderPoint: Number(singleVarReorder) || Number(reorderLevel) || 2,
      location: "Main Store",
    };

    setGeneratedVariants([...generatedVariants, newVar]);
    setShowInlineAddVariant(false);
  };

  // Delete Individual Variant
  const handleDeleteVariant = (idx) => {
    const updated = [...generatedVariants];
    updated.splice(idx, 1);
    setGeneratedVariants(updated);
  };

  const updateVariant = (idx, field, val) => {
    const updated = [...generatedVariants];
    updated[idx][field] = val;
    setGeneratedVariants(updated);
  };

  // Add Feature
  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput("");
    }
  };

  // Add Tag
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  // Add Image URL
  const handleAddImage = () => {
    const url = prompt("Enter image URL (e.g. /images/helmet.webp):");
    if (url && url.trim()) {
      setImages([...images, url.trim()]);
    }
  };

  // Save Product Handler
  const handleSave = async (pubStatus) => {
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Product Name is required.");
      return;
    }
    if (!numPrice || numPrice <= 0) {
      setErrorMessage("Valid Selling Price is required.");
      return;
    }

    setIsSaving(true);

    const coloursList = colourOptValues;
    const sizesList = sizeOptValues;

    const payload = {
      name,
      type,
      brand,
      category,
      subcategory,
      modelSeries,
      shortName,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      tags,
      featured,
      bestSeller,
      newArrival,

      sku: sku || generateSKU(name, "GEN", "ALL"),
      brandSku,
      internalSku: internalSku || sku || generateSKU(name, "GEN", "ALL"),
      barcode,
      hsnCode,
      gstRate,
      manufacturer,
      countryOfOrigin,

      images,
      primaryImageIndex,
      imageAltText,

      shortDescription,
      description,
      features,

      specifications: {
        ...(category === "Helmets" ? { helmetType: specHelmetType, certification: specCertifications, shellMaterial: specShellMaterial, weight: specHelmetWeight, visor: specVisor, closure: specClosure } : {}),
        ...(category === "Jackets" ? { jacketType: specJacketType, protection: specProtections, protectionCert: specProtectionCert, outerMaterial: specOuterMaterial, waterproof: specWaterproof, thermalLiner: specThermalLiner } : {}),
        ...(category === "Gloves" ? { touchscreen: specTouchscreen } : {}),
        ...(category === "Luggage" ? { capacity: specLuggageCapacity } : {}),
      },

      sizeType,
      sizes: sizesList,
      colours: coloursList,
      fitType,
      variants: generatedVariants,

      mrp: numMrp,
      price: numPrice,
      costPrice: numCost,
      profitAmount,

      stockTrackingEnabled,
      openingStock: Number(openingStock),
      stock: Number(currentStock),
      reservedStock: Number(reservedStock),
      lowStockThreshold: Number(lowStockThreshold),
      reorderLevel: Number(reorderLevel),
      storeStock: Number(storeStock),
      onlineStock: Number(onlineStock),

      availableOnline,
      availableInStore,
      allowBackorder,
      stockStatus,
      restockDate,

      warrantyAvailable,
      warrantyType,
      warrantyDuration,
      warrantyProvider,
      warrantyTerms,
      returnEligibility,
      returnWindow,

      careInstructions,
      washingInstructions,

      physicalProduct,
      weight,
      dimensions: { length: lengthCm, width: widthCm, height: heightCm },
      shippingClass,
      freeShipping,

      vehicleCompatibility,
      fitmentNotes,

      brandStory,
      manualUrl,

      eligibleStoreCoupons,
      eligibleProductDiscounts,

      relatedProducts,

      status: pubStatus || status,
      visibility,
      publishImmediately,

      internalNotes,
      supplier,
      supplierSku,
    };

    const targetUrl = isEdit && targetProductId
      ? `http://localhost:5000/api/v1/products/${targetProductId}`
      : `http://localhost:5000/api/v1/products`;

    const targetMethod = isEdit && targetProductId ? "PUT" : "POST";

    try {
      const res = await fetch(targetUrl, {
        method: targetMethod,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        setSavedProduct(json.data);
        setIsSaving(false);
      } else {
        setErrorMessage(json.error?.message || "Failed to save product.");
        setIsSaving(false);
      }
    } catch (err) {
      const mockSaved = {
        id: isEdit ? targetProductId : `prod-${Date.now()}`,
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        price: numPrice,
        images,
      };
      setSavedProduct(mockSaved);
      setIsSaving(false);
    }
  };

  const handleAddAnother = () => {
    setSavedProduct(null);
    setName("");
    setShortDescription("");
    setDescription("");
    router.push("/admin/products/new");
  };

  return (
    <div className="min-h-screen bg-[#f7f3ec] text-[#1f241f] pb-24 font-sans">
      {/* MASTER TOP STICKY HEADER */}
      <header className="bg-[#10281e] text-white sticky top-0 z-40 border-b border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
              title="Return to Admin Console"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                {isEdit ? "Edit Product" : "Add New Product"}
              </h1>
              <p className="text-xs text-white/60">
                {isEdit ? "Update product details and manage sellable variants." : "Create a new product with custom sellable variants."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {savedProduct ? (
              <>
                <a
                  href={`/product/${savedProduct.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#c45d2a] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#d96d37] transition shadow"
                >
                  <span>View on Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={handleAddAnother}
                  className="inline-flex items-center gap-2 bg-[#18382a] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#24513d] transition shadow border border-white/20"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Another</span>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => handleSave("Draft")}
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl border border-white/20 text-xs font-bold text-white hover:bg-white/10 transition"
                >
                  Save Draft
                </button>

                <button
                  type="button"
                  onClick={() => handleSave(status || "Active")}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 bg-[#c45d2a] text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-[#d96d37] transition shadow disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>{isEdit ? "Save Changes" : "Save & Publish"}</span>
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* MASTER FORM BODY */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
        {/* NOTIFICATIONS */}
        {savedProduct && (
          <div className="bg-green-50 border-2 border-green-500/30 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-green-900 text-base">
                  {isEdit ? "Product Updated Successfully!" : "Product Saved Successfully!"}
                </h3>
                <p className="text-xs text-green-700 mt-0.5">
                  <strong>{savedProduct.name}</strong> is synchronized with the Mototrek database.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`/product/${savedProduct.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-green-800 transition"
              >
                <span>View Storefront</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <Link
                href="/admin"
                className="px-4 py-2 bg-white text-gray-700 border rounded-xl text-xs font-bold hover:bg-gray-50"
              >
                Return to Admin Console
              </Link>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-50 border-2 border-red-500/30 rounded-3xl p-4 flex items-center gap-3 text-red-700 text-xs font-bold">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* PRODUCT BASIC INFORMATION */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection("basic")}
            className="w-full p-6 bg-gray-50/50 flex items-center justify-between border-b hover:bg-gray-100/50 transition"
          >
            <div className="text-left">
              <h2 className="text-base font-bold text-[#18382a]">Product Basic Information</h2>
              <p className="text-xs text-gray-500">Name, category, subcategory, brand, and flags</p>
            </div>
            {openSections.basic ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
          </button>

          {openSections.basic && (
            <div className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Product Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rynox Air GT Jacket"
                    className="w-full border rounded-xl px-4 py-2.5 text-sm font-semibold focus:border-[#18382a] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Brand *</label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full border rounded-xl px-4 py-2.5 text-sm font-semibold focus:border-[#18382a] focus:outline-none"
                  >
                    {brandsList.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border rounded-xl px-4 py-2.5 text-sm font-semibold focus:border-[#18382a] focus:outline-none"
                  >
                    {categoriesList.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Subcategory</label>
                  <select
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    className="w-full border rounded-xl px-4 py-2.5 text-sm font-semibold focus:border-[#18382a] focus:outline-none"
                  >
                    {(SUBCATEGORIES_MAP[category] || ["General"]).map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Model / Series</label>
                  <input
                    type="text"
                    value={modelSeries}
                    onChange={(e) => setModelSeries(e.target.value)}
                    placeholder="e.g. Stealth Air V4"
                    className="w-full border rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Product Tags</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add tag (e.g. Touring)"
                    className="flex-1 border rounded-xl px-4 py-2.5 text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2.5 bg-[#18382a] text-white rounded-xl text-xs font-bold hover:bg-[#24513d]"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {tags.map((t, i) => (
                    <span key={i} className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-700">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-2 border-t text-xs font-bold text-gray-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured === "Yes"}
                    onChange={(e) => setFeatured(e.target.checked ? "Yes" : "No")}
                    className="rounded text-[#c45d2a]"
                  />
                  <span>Featured Product</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bestSeller === "Yes"}
                    onChange={(e) => setBestSeller(e.target.checked ? "Yes" : "No")}
                    className="rounded text-[#c45d2a]"
                  />
                  <span>Best Seller</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newArrival === "Yes"}
                    onChange={(e) => setNewArrival(e.target.checked ? "Yes" : "No")}
                    className="rounded text-[#c45d2a]"
                  />
                  <span>New Arrival</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* PRODUCT IDENTIFICATION & TAX */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection("identification")}
            className="w-full p-6 bg-gray-50/50 flex items-center justify-between border-b hover:bg-gray-100/50 transition"
          >
            <div className="text-left">
              <h2 className="text-base font-bold text-[#18382a]">Product Identification & Tax</h2>
              <p className="text-xs text-gray-500">SKU, HSN Code, GST Rate, Barcode, Manufacturer</p>
            </div>
            {openSections.identification ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
          </button>

          {openSections.identification && (
            <div className="p-6 space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Master SKU *</label>
                  <input
                    type="text"
                    value={sku || internalSku}
                    onChange={(e) => { setSku(e.target.value); setInternalSku(e.target.value); }}
                    placeholder="RYN-AGT-BLK"
                    className="w-full border rounded-xl px-4 py-2.5 text-sm font-mono font-bold text-[#18382a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">HSN Code</label>
                  <input
                    type="text"
                    value={hsnCode}
                    onChange={(e) => setHsnCode(e.target.value)}
                    placeholder="6211"
                    className="w-full border rounded-xl px-4 py-2.5 text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">GST Rate (%)</label>
                  <select
                    value={gstRate}
                    onChange={(e) => setGstRate(e.target.value)}
                    className="w-full border rounded-xl px-4 py-2.5 text-sm font-semibold"
                  >
                    <option value="5%">5% (Apparel & Footwear ≤ 1000)</option>
                    <option value="12%">12% (Apparel & Footwear &gt; 1000)</option>
                    <option value="18%">18% (Helmets, Luggage, Gears)</option>
                    <option value="28%">28% (Motorcycle Parts)</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Barcode / EAN</label>
                  <input
                    type="text"
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    placeholder="8901234567890"
                    className="w-full border rounded-xl px-4 py-2.5 text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Manufacturer</label>
                  <input
                    type="text"
                    value={manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)}
                    placeholder="Rynox Gears India Pvt Ltd"
                    className="w-full border rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Country of Origin</label>
                  <input
                    type="text"
                    value={countryOfOrigin}
                    onChange={(e) => setCountryOfOrigin(e.target.value)}
                    placeholder="India"
                    className="w-full border rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PRODUCT IMAGES GALLERY */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection("gallery")}
            className="w-full p-6 bg-gray-50/50 flex items-center justify-between border-b hover:bg-gray-100/50 transition"
          >
            <div className="text-left">
              <h2 className="text-base font-bold text-[#18382a]">Product Images Gallery</h2>
              <p className="text-xs text-gray-500">Primary image, gallery photos, and image management</p>
            </div>
            {openSections.gallery ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
          </button>

          {openSections.gallery && (
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {images.map((img, idx) => (
                  <div key={idx} className="relative group rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 aspect-square flex items-center justify-center">
                    <img src={img} alt={`Product ${idx}`} className="w-full h-full object-cover" />
                    {idx === primaryImageIndex && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#c45d2a] text-white font-bold text-[10px] rounded-full shadow">
                        PRIMARY
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => setPrimaryImageIndex(idx)}
                        className="px-2 py-1 bg-white text-gray-900 rounded text-[10px] font-bold"
                      >
                        Set Primary
                      </button>
                      <button
                        type="button"
                        onClick={() => setImages(images.filter((_, i) => i !== idx))}
                        className="p-1 bg-red-600 text-white rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddImage}
                  className="rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#18382a] aspect-square flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-[#18382a] transition"
                >
                  <Upload className="w-6 h-6" />
                  <span className="text-xs font-bold">Add Image URL</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* DESCRIPTIONS & KEY FEATURES */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection("descriptions")}
            className="w-full p-6 bg-gray-50/50 flex items-center justify-between border-b hover:bg-gray-100/50 transition"
          >
            <div className="text-left">
              <h2 className="text-base font-bold text-[#18382a]">Descriptions & Key Features</h2>
              <p className="text-xs text-gray-500">Short description, full text, and bulleted features</p>
            </div>
            {openSections.descriptions ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
          </button>

          {openSections.descriptions && (
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Short Description</label>
                <input
                  type="text"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Brief highlight for catalogue cards..."
                  className="w-full border rounded-xl px-4 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Description *</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Comprehensive technical details, materials, armor certification..."
                  className="w-full border rounded-xl px-4 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Key Features List</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="Add feature (e.g. CE Level 2 Armor)"
                    className="flex-1 border rounded-xl px-4 py-2.5 text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-4 py-2.5 bg-[#18382a] text-white rounded-xl text-xs font-bold hover:bg-[#24513d]"
                  >
                    Add Feature
                  </button>
                </div>
                <ul className="mt-3 space-y-1 text-xs text-gray-700">
                  {features.map((f, idx) => (
                    <li key={idx} className="flex items-center justify-between bg-gray-50 px-3 py-1.5 rounded-lg border">
                      <span>• {f}</span>
                      <button
                        type="button"
                        onClick={() => setFeatures(features.filter((_, i) => i !== idx))}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* PRICING, INTERNAL COST & PROFIT MARGIN (PRODUCT DEFAULTS) */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection("pricing")}
            className="w-full p-6 bg-gray-50/50 flex items-center justify-between border-b hover:bg-gray-100/50 transition"
          >
            <div className="text-left">
              <h2 className="text-base font-bold text-[#18382a]">Default Pricing, Cost & Profit Margin</h2>
              <p className="text-xs text-gray-500">Master product defaults (variants inherit these values automatically)</p>
            </div>
            {openSections.pricing ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
          </button>

          {openSections.pricing && (
            <div className="p-6 space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Default MRP (₹) *</label>
                  <input
                    type="number"
                    value={mrp}
                    onChange={(e) => setMrp(e.target.value)}
                    placeholder="6999"
                    className="w-full border rounded-xl px-4 py-2.5 text-sm font-bold text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Default Selling Price (₹) *</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="5999"
                    className="w-full border rounded-xl px-4 py-2.5 text-sm font-bold text-[#18382a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Default Cost Price (₹)</label>
                  <input
                    type="number"
                    value={costPrice}
                    onChange={(e) => setCostPrice(e.target.value)}
                    placeholder="4200"
                    className="w-full border rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-xs font-bold pt-2">
                <span className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
                  Discount: {discountBadge}
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-green-50 text-green-800 border border-green-200">
                  Profit Margin: {profitMarginText}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* VARIANTS & OPTIONS (PRODUCT DEFAULTS INHERITANCE + VARIANT OVERRIDES) */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection("variants")}
            className="w-full p-6 bg-gray-50/50 flex items-center justify-between border-b hover:bg-gray-100/50 transition"
          >
            <div className="text-left">
              <h2 className="text-base font-bold text-[#18382a]">Variants & Options</h2>
              <p className="text-xs text-gray-500">Configure options with 1-click chips and manage sellable SKUs (inherits product defaults by default).</p>
            </div>
            {openSections.variants ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
          </button>

          {openSections.variants && (
            <div className="p-6 space-y-6">
              {/* SECTION 1: PRODUCT OPTIONS */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">
                    Product Options
                  </h3>
                </div>

                {/* COMPACT ROWS FOR EACH OPTION */}
                {productOptions.length > 0 ? (
                  <div className="space-y-2.5">
                    {productOptions.map((opt) => {
                      const isPopoverOpen = activePopoverOptionId === opt.id;
                      const standardList =
                        opt.name === "Colour"
                          ? STANDARD_COLOURS
                          : opt.name === "Size"
                          ? STANDARD_SIZES
                          : opt.name === "Capacity"
                          ? STANDARD_CAPACITIES
                          : ["Default"];

                      const currentOptValues = Array.isArray(opt.values) ? opt.values : [];
                      const filteredPresets = standardList.filter(
                        (val) => !currentOptValues.includes(val) && val.toLowerCase().includes(popoverSearch.toLowerCase())
                      );

                      return (
                        <div key={opt.id} className="flex flex-wrap items-center gap-2 text-xs py-1 border-b border-gray-100 last:border-0">
                          {/* OPTION LABEL */}
                          <div className="w-24 font-bold text-gray-700 shrink-0 flex items-center justify-between pr-2">
                            <span>{opt.name}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveOptionRow(opt.id)}
                              className="text-gray-300 hover:text-red-500 text-[10px]"
                              title={`Remove ${opt.name} option`}
                            >
                              ✕
                            </button>
                          </div>

                          {/* COMPACT SELECTED VALUE CHIPS */}
                          <div className="flex flex-wrap items-center gap-1.5 flex-1 relative">
                            {currentOptValues.map((val) => (
                              <span
                                key={val}
                                className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 rounded-xl text-xs font-semibold transition"
                              >
                                <span>{val}</span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveOptionValue(opt.id, val)}
                                  className="text-gray-400 hover:text-red-600 transition"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ))}

                            {/* + ADD VALUE BUTTON & INLINE POPOVER */}
                            <div className="relative inline-block">
                              <button
                                type="button"
                                onClick={() => {
                                  if (isPopoverOpen) {
                                    setActivePopoverOptionId(null);
                                  } else {
                                    setActivePopoverOptionId(opt.id);
                                    setPopoverSearch("");
                                  }
                                }}
                                className="px-3 py-1 bg-white border border-dashed border-gray-400 text-gray-700 hover:border-[#18382a] hover:text-[#18382a] rounded-xl text-xs font-bold transition flex items-center gap-1"
                              >
                                <span>+ Add</span>
                              </button>

                              {/* INLINE POPUP SELECTOR */}
                              {isPopoverOpen && (
                                <div className="absolute left-0 top-8 z-30 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 p-2.5 space-y-2">
                                  <div className="relative">
                                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                                    <input
                                      type="text"
                                      autoFocus
                                      value={popoverSearch}
                                      onChange={(e) => setPopoverSearch(e.target.value)}
                                      placeholder={`Search ${opt.name}...`}
                                      className="w-full text-xs border rounded-xl pl-8 pr-2.5 py-1.5 font-medium focus:border-[#18382a] focus:outline-none"
                                    />
                                  </div>

                                  <div className="max-h-40 overflow-y-auto space-y-0.5">
                                    {filteredPresets.map((preset) => (
                                      <button
                                        key={preset}
                                        type="button"
                                        onClick={() => handleAddOptionValue(opt.id, preset)}
                                        className="w-full text-left px-2.5 py-1.5 hover:bg-gray-100 rounded-lg text-xs font-medium text-gray-800 transition"
                                      >
                                        + {preset}
                                      </button>
                                    ))}

                                    {popoverSearch.trim() && !currentOptValues.includes(popoverSearch.trim()) && (
                                      <button
                                        type="button"
                                        onClick={() => handleAddOptionValue(opt.id, popoverSearch.trim())}
                                        className="w-full text-left px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 rounded-lg text-xs font-bold text-amber-900 transition"
                                      >
                                        + Add Custom "{popoverSearch.trim()}"
                                      </button>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 italic">No product options added.</p>
                )}

                {/* + ADD OPTION BUTTON & DROPDOWN */}
                <div className="pt-2 relative">
                  {showCustomOptionForm ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={customOptionInput}
                        onChange={(e) => setCustomOptionInput(e.target.value)}
                        placeholder="Option Name (e.g. Fit, Volume)"
                        className="border rounded-xl px-3 py-1 text-xs font-bold"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddOptionType(customOptionInput)}
                        className="px-3 py-1 bg-[#18382a] text-white rounded-xl text-xs font-bold"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCustomOptionForm(false)}
                        className="px-2 py-1 text-gray-500 text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="relative inline-block">
                      <button
                        type="button"
                        onClick={() => setShowAddOptionDropdown(!showAddOptionDropdown)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition border"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>+ Add Option</span>
                      </button>

                      {showAddOptionDropdown && (
                        <div className="absolute left-0 top-9 z-30 w-44 bg-white rounded-2xl shadow-xl border border-gray-200 p-1.5 space-y-0.5">
                          {COMMON_OPTION_TYPES.map((optType) => (
                            <button
                              key={optType}
                              type="button"
                              onClick={() => {
                                if (optType === "Other") {
                                  setShowAddOptionDropdown(false);
                                  setShowCustomOptionForm(true);
                                } else {
                                  handleAddOptionType(optType);
                                }
                              }}
                              className="w-full text-left px-3 py-1.5 hover:bg-gray-100 rounded-xl text-xs font-medium text-gray-800 transition"
                            >
                              {optType}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* SECTION 2: AVAILABLE VARIANTS & ACTIONS */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">
                      Available Variants ({generatedVariants.length})
                    </h3>
                    <p className="text-[11px] text-gray-500">
                      Add only combinations that are actually sold. (Inherits product default pricing & stock automatically).
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowOptionalGenerator(!showOptionalGenerator)}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl text-xs font-bold transition border"
                    >
                      {showOptionalGenerator ? "Hide Quick Generator" : "Generate Variants"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setDuplicateVarError("");
                        const firstCol = colourOptValues[0] || "Black";
                        const firstSz = sizeOptValues[0] || "M";
                        setSingleVarOptionSelections({ Colour: firstCol, Size: firstSz });
                        setSingleVarSku(generateSKU(name, firstCol, firstSz));
                        setSingleVarMrp(mrp || "6999");
                        setSingleVarPrice(price || "5999");
                        setSingleVarCost(costPrice || "4200");
                        setSingleVarReorder(reorderLevel || "2");
                        setShowInlineAddVariant(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#c45d2a] text-white rounded-xl text-xs font-bold hover:bg-[#d96d37] transition shadow-xs"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Add Variant</span>
                    </button>
                  </div>
                </div>

                {/* OPTIONAL QUICK GENERATOR (MATRIX SELECTOR) */}
                {showOptionalGenerator && (
                  <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-300 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase text-amber-900">
                        Quick Combination Generator (Check only existing variants)
                      </h4>
                      <button
                        type="button"
                        onClick={handleGenerateCheckedVariants}
                        className="px-3 py-1 bg-[#18382a] text-white rounded-xl text-xs font-bold hover:bg-[#24513d]"
                      >
                        Generate Selected Variants
                      </button>
                    </div>

                    <div className="overflow-x-auto bg-white rounded-xl border p-3">
                      <table className="w-full text-center text-xs">
                        <thead>
                          <tr className="border-b text-gray-500 font-bold">
                            <th className="text-left pb-2 px-2">Colour \ Size</th>
                            {sizeOptValues.map((sz) => (
                              <th key={sz} className="pb-2 px-2">{sz}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {colourOptValues.map((col) => (
                            <tr key={col}>
                              <td className="text-left font-bold text-gray-900 py-2 px-2">{col}</td>
                              {sizeOptValues.map((sz) => {
                                const key = `${col}-${sz}`;
                                const isChecked = Boolean(selectedMatrixMap[key]);
                                return (
                                  <td key={sz} className="py-2 px-2">
                                    <button
                                      type="button"
                                      onClick={() => toggleMatrixCombination(col, sz)}
                                      className={`p-1.5 rounded-lg border transition ${
                                        isChecked
                                          ? "bg-green-500 text-white border-green-600"
                                          : "bg-gray-100 text-gray-400 border-gray-200 hover:bg-gray-200"
                                      }`}
                                    >
                                      {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                                    </button>
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* COMPACT LIGHTWEIGHT INLINE ADD VARIANT EDITOR */}
                {showInlineAddVariant && (
                  <div className="p-4 bg-gray-50 rounded-2xl border-2 border-[#18382a]/20 space-y-3">
                    <div className="flex items-center justify-between border-b pb-2">
                      <h4 className="text-xs font-bold uppercase text-[#18382a]">
                        Add Single Variant (Pre-filled with Product Defaults)
                      </h4>
                      <button type="button" onClick={() => setShowInlineAddVariant(false)} className="text-gray-400 hover:text-gray-600">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {duplicateVarError && (
                      <div className="px-3 py-1.5 bg-red-100 border border-red-300 rounded-xl text-xs font-bold text-red-700 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <span>{duplicateVarError}</span>
                      </div>
                    )}

                    {/* COMPACT DESKTOP GRID LAYOUT */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 items-end text-xs">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-600 mb-1">Colour</label>
                        <select
                          value={singleVarOptionSelections["Colour"] || colourOptValues[0] || "Black"}
                          onChange={(e) => {
                            const val = e.target.value;
                            setSingleVarOptionSelections((prev) => ({ ...prev, Colour: val }));
                            setSingleVarSku(generateSKU(name, val, singleVarOptionSelections["Size"] || "M"));
                            setDuplicateVarError("");
                          }}
                          className="w-full border rounded-xl px-2.5 py-1.5 font-bold bg-white"
                        >
                          {colourOptValues.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-gray-600 mb-1">Size</label>
                        <select
                          value={singleVarOptionSelections["Size"] || sizeOptValues[0] || "M"}
                          onChange={(e) => {
                            const val = e.target.value;
                            setSingleVarOptionSelections((prev) => ({ ...prev, Size: val }));
                            setSingleVarSku(generateSKU(name, singleVarOptionSelections["Colour"] || "BLK", val));
                            setDuplicateVarError("");
                          }}
                          className="w-full border rounded-xl px-2.5 py-1.5 font-bold bg-white"
                        >
                          {sizeOptValues.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-gray-600 mb-1">Variant SKU</label>
                        <input
                          type="text"
                          value={singleVarSku}
                          onChange={(e) => setSingleVarSku(e.target.value)}
                          className="w-full border rounded-xl px-2.5 py-1.5 font-mono text-xs font-bold text-[#18382a]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-gray-600 mb-1">MRP (₹)</label>
                        <input
                          type="number"
                          value={singleVarMrp}
                          onChange={(e) => setSingleVarMrp(e.target.value)}
                          className="w-full border rounded-xl px-2.5 py-1.5 font-bold text-gray-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-gray-600 mb-1">Selling Price (₹)</label>
                        <input
                          type="number"
                          value={singleVarPrice}
                          onChange={(e) => setSingleVarPrice(e.target.value)}
                          className="w-full border rounded-xl px-2.5 py-1.5 font-bold text-[#18382a]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-gray-600 mb-1">Cost Price (₹)</label>
                        <input
                          type="number"
                          value={singleVarCost}
                          onChange={(e) => setSingleVarCost(e.target.value)}
                          className="w-full border rounded-xl px-2.5 py-1.5 font-bold text-gray-600"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-gray-600 mb-1">Stock</label>
                        <input
                          type="number"
                          value={singleVarStock}
                          onChange={(e) => setSingleVarStock(e.target.value)}
                          className="w-full border rounded-xl px-2.5 py-1.5 font-bold text-[#c45d2a]"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t">
                      <button
                        type="button"
                        onClick={() => setShowInlineAddVariant(false)}
                        className="px-3 py-1.5 bg-white border text-gray-600 rounded-xl text-xs font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleCheckAndAddSingleVariant}
                        className="px-4 py-1.5 bg-[#18382a] text-white rounded-xl text-xs font-bold shadow-xs"
                      >
                        Save Variant
                      </button>
                    </div>
                  </div>
                )}

                {/* ACTUAL VARIANT TABLE WITH PRODUCT DEFAULT OVERRIDE BADGES */}
                {generatedVariants.length > 0 ? (
                  <div className="overflow-x-auto border rounded-2xl">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-gray-50 text-gray-500 font-bold border-b">
                          <th className="py-2.5 px-3">VARIANT</th>
                          <th className="py-2.5 px-3">SKU</th>
                          <th className="py-2.5 px-3">MRP</th>
                          <th className="py-2.5 px-3">SELLING PRICE</th>
                          <th className="py-2.5 px-3">COST</th>
                          <th className="py-2.5 px-3">STOCK</th>
                          <th className="py-2.5 px-3">LOCATION</th>
                          <th className="py-2.5 px-3">STATUS</th>
                          <th className="py-2.5 px-3 text-right">ACTION</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {generatedVariants.map((v, idx) => {
                          const isLowStock = (v.stock || 0) <= 2 && (v.stock || 0) > 0;
                          const isOutOfStock = (v.stock || 0) === 0;
                          const isEditingThisRow = editingRowIndex === idx;
                          const isCustomPrice = v.price && Number(v.price) !== numPrice;

                          return (
                            <React.Fragment key={v.sku || idx}>
                              <tr className="hover:bg-gray-50/50">
                                <td className="py-3 px-3 font-bold text-gray-900">
                                  {v.colour} / {v.size}
                                </td>
                                <td className="py-3 px-3 font-mono text-gray-600">
                                  {v.sku}
                                </td>
                                <td className="py-3 px-3 text-gray-500 font-medium">
                                  ₹{(v.mrp || numMrp).toLocaleString()}
                                </td>
                                <td className="py-3 px-3 font-bold text-[#18382a]">
                                  <span>₹{(v.price || numPrice).toLocaleString()}</span>
                                  {isCustomPrice && (
                                    <span className="ml-1 text-[9px] px-1.5 py-0.5 bg-amber-100 text-amber-800 font-bold rounded">
                                      Custom price
                                    </span>
                                  )}
                                </td>
                                <td className="py-3 px-3 text-gray-600 font-medium">
                                  ₹{(v.costPrice || numCost).toLocaleString()}
                                </td>
                                <td className="py-3 px-3 font-bold text-gray-800">
                                  {v.stock || 0} units
                                </td>
                                <td className="py-3 px-3 text-gray-600 font-medium">
                                  {v.location || "Main Store"}
                                </td>
                                <td className="py-3 px-3">
                                  {isOutOfStock ? (
                                    <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold text-[10px]">
                                      Out of Stock
                                    </span>
                                  ) : isLowStock ? (
                                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                                      Low Stock
                                    </span>
                                  ) : (
                                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 font-bold text-[10px]">
                                      In Stock
                                    </span>
                                  )}
                                </td>
                                <td className="py-3 px-3 text-right space-x-1.5">
                                  <button
                                    type="button"
                                    onClick={() => setEditingRowIndex(isEditingThisRow ? null : idx)}
                                    className="px-2.5 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-xs font-bold inline-flex items-center gap-1 transition"
                                  >
                                    <Edit3 className="w-3 h-3" />
                                    <span>{isEditingThisRow ? "Close" : "Edit"}</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteVariant(idx)}
                                    className="p-1 text-red-500 hover:text-red-700 transition"
                                    title="Delete Variant"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>

                              {/* INLINE ROW EXPANDABLE EDIT FOR ALL VARIANT-SPECIFIC ATTRIBUTES */}
                              {isEditingThisRow && (
                                <tr>
                                  <td colSpan={9} className="bg-amber-50/50 p-4 border-b">
                                    <div className="grid sm:grid-cols-4 gap-3 text-xs">
                                      <div>
                                        <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Variant SKU</label>
                                        <input
                                          type="text"
                                          value={v.sku}
                                          onChange={(e) => updateVariant(idx, "sku", e.target.value)}
                                          className="w-full border rounded-lg px-2.5 py-1.5 font-mono text-gray-800 bg-white"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Barcode / EAN</label>
                                        <input
                                          type="text"
                                          value={v.barcode || ""}
                                          onChange={(e) => updateVariant(idx, "barcode", e.target.value)}
                                          placeholder="Optional Barcode"
                                          className="w-full border rounded-lg px-2.5 py-1.5 font-mono text-gray-800 bg-white"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">MRP (₹)</label>
                                        <input
                                          type="number"
                                          value={v.mrp || numMrp}
                                          onChange={(e) => updateVariant(idx, "mrp", Number(e.target.value))}
                                          className="w-full border rounded-lg px-2.5 py-1.5 font-bold text-gray-500 bg-white"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Selling Price (₹)</label>
                                        <input
                                          type="number"
                                          value={v.price || numPrice}
                                          onChange={(e) => updateVariant(idx, "price", Number(e.target.value))}
                                          className="w-full border rounded-lg px-2.5 py-1.5 font-bold text-[#18382a] bg-white"
                                        />
                                      </div>
                                    </div>

                                    <div className="grid sm:grid-cols-4 gap-3 text-xs mt-3">
                                      <div>
                                        <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Cost Price (₹)</label>
                                        <input
                                          type="number"
                                          value={v.costPrice || numCost}
                                          onChange={(e) => updateVariant(idx, "costPrice", Number(e.target.value))}
                                          className="w-full border rounded-lg px-2.5 py-1.5 font-bold text-gray-700 bg-white"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Stock Units</label>
                                        <input
                                          type="number"
                                          value={v.stock}
                                          onChange={(e) => updateVariant(idx, "stock", Number(e.target.value))}
                                          className="w-full border rounded-lg px-2.5 py-1.5 font-bold text-[#c45d2a] bg-white"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Reorder Point</label>
                                        <input
                                          type="number"
                                          value={v.reorderPoint || reorderLevel}
                                          onChange={(e) => updateVariant(idx, "reorderPoint", Number(e.target.value))}
                                          className="w-full border rounded-lg px-2.5 py-1.5 font-bold text-blue-700 bg-white"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Store Location</label>
                                        <input
                                          type="text"
                                          value={v.location || "Main Store"}
                                          onChange={(e) => updateVariant(idx, "location", e.target.value)}
                                          className="w-full border rounded-lg px-2.5 py-1.5 text-gray-700 bg-white"
                                        />
                                      </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-3 text-xs mt-3 pt-2 border-t">
                                      <div>
                                        <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Variant-Specific Image URL (Optional)</label>
                                        <input
                                          type="text"
                                          value={v.variantImage || ""}
                                          onChange={(e) => updateVariant(idx, "variantImage", e.target.value)}
                                          placeholder="Leave empty to use main product images"
                                          className="w-full border rounded-lg px-2.5 py-1.5 text-gray-700 bg-white"
                                        />
                                      </div>

                                      <div className="flex items-center gap-4 text-xs font-bold text-gray-700 pt-4">
                                        <label className="flex items-center gap-1.5 cursor-pointer">
                                          <input
                                            type="checkbox"
                                            checked={v.availableOnline !== false}
                                            onChange={(e) => updateVariant(idx, "availableOnline", e.target.checked)}
                                            className="rounded text-[#18382a]"
                                          />
                                          <span>Online Store</span>
                                        </label>
                                        <label className="flex items-center gap-1.5 cursor-pointer">
                                          <input
                                            type="checkbox"
                                            checked={v.availableInStore !== false}
                                            onChange={(e) => updateVariant(idx, "availableInStore", e.target.checked)}
                                            className="rounded text-[#18382a]"
                                          />
                                          <span>Physical Retail</span>
                                        </label>
                                      </div>
                                    </div>

                                    <div className="flex justify-end pt-3">
                                      <button
                                        type="button"
                                        onClick={() => setEditingRowIndex(null)}
                                        className="px-4 py-1.5 bg-[#18382a] text-white rounded-lg text-xs font-bold"
                                      >
                                        Done Editing
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-6 rounded-2xl border border-dashed text-center space-y-2">
                    <p className="text-xs text-gray-600 font-semibold">
                      This product currently has no sellable variants. Master product SKU, price & stock apply directly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowInlineAddVariant(true)}
                      className="px-4 py-2 bg-[#18382a] text-white rounded-xl text-xs font-bold shadow-xs"
                    >
                      + Add First Variant
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* INVENTORY & STORE LOCATIONS */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection("inventory")}
            className="w-full p-6 bg-gray-50/50 flex items-center justify-between border-b hover:bg-gray-100/50 transition"
          >
            <div className="text-left">
              <h2 className="text-base font-bold text-[#18382a]">Inventory & Store Locations</h2>
              <p className="text-xs text-gray-500">Stock counts, low stock thresholds, and store vs online split</p>
            </div>
            {openSections.inventory ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
          </button>

          {openSections.inventory && (
            <div className="p-6 space-y-4">
              <div className="grid sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Current Total Stock</label>
                  <input
                    type="number"
                    value={currentStock}
                    onChange={(e) => setCurrentStock(e.target.value)}
                    className="w-full border rounded-xl px-4 py-2.5 text-sm font-bold text-[#18382a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Reserved Stock</label>
                  <input
                    type="number"
                    value={reservedStock}
                    onChange={(e) => setReservedStock(e.target.value)}
                    className="w-full border rounded-xl px-4 py-2.5 text-sm font-bold text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Low Stock Alert</label>
                  <input
                    type="number"
                    value={lowStockThreshold}
                    onChange={(e) => setLowStockThreshold(e.target.value)}
                    className="w-full border rounded-xl px-4 py-2.5 text-sm font-bold text-amber-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Reorder Level</label>
                  <input
                    type="number"
                    value={reorderLevel}
                    onChange={(e) => setReorderLevel(e.target.value)}
                    className="w-full border rounded-xl px-4 py-2.5 text-sm font-bold text-blue-700"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Main Physical Store Stock</label>
                  <input
                    type="number"
                    value={storeStock}
                    onChange={(e) => setStoreStock(e.target.value)}
                    className="w-full border rounded-xl px-4 py-2.5 text-sm font-bold text-[#18382a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Online Warehouse Stock</label>
                  <input
                    type="number"
                    value={onlineStock}
                    onChange={(e) => setOnlineStock(e.target.value)}
                    className="w-full border rounded-xl px-4 py-2.5 text-sm font-bold text-[#c45d2a]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SHIPPING SPECIFICATIONS */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection("shipping")}
            className="w-full p-6 bg-gray-50/50 flex items-center justify-between border-b hover:bg-gray-100/50 transition"
          >
            <div className="text-left">
              <h2 className="text-base font-bold text-[#18382a]">Shipping Specifications</h2>
              <p className="text-xs text-gray-500">Weight, dimensions (L × W × H), shipping class</p>
            </div>
            {openSections.shipping ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
          </button>

          {openSections.shipping && (
            <div className="p-6 space-y-4">
              <div className="grid sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Weight (kg)</label>
                  <input
                    type="text"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="1.65"
                    className="w-full border rounded-xl px-4 py-2.5 text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Length (cm)</label>
                  <input
                    type="text"
                    value={lengthCm}
                    onChange={(e) => setLengthCm(e.target.value)}
                    placeholder="45"
                    className="w-full border rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Width (cm)</label>
                  <input
                    type="text"
                    value={widthCm}
                    onChange={(e) => setWidthCm(e.target.value)}
                    placeholder="35"
                    className="w-full border rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Height (cm)</label>
                  <input
                    type="text"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    placeholder="15"
                    className="w-full border rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* INTERNAL TEAM INFORMATION */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection("internal")}
            className="w-full p-6 bg-gray-50/50 flex items-center justify-between border-b hover:bg-gray-100/50 transition"
          >
            <div className="text-left">
              <h2 className="text-base font-bold text-[#18382a]">Internal Team Information</h2>
              <p className="text-xs text-gray-500">Supplier details and internal operational notes (Hidden from customers)</p>
            </div>
            {openSections.internal ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
          </button>

          {openSections.internal && (
            <div className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Supplier / Vendor</label>
                  <input
                    type="text"
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    className="w-full border rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Supplier Product Code</label>
                  <input
                    type="text"
                    value={supplierSku}
                    onChange={(e) => setSupplierSku(e.target.value)}
                    className="w-full border rounded-xl px-4 py-2.5 text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Internal Operational Notes</label>
                <textarea
                  rows={3}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="Notes for store team, restock notes..."
                  className="w-full border rounded-xl px-4 py-2.5 text-sm"
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function ProductForm({ mode = "create", productId = null, initialMode = "create", initialProductId = null }) {
  const effectiveMode = initialMode || mode || "create";
  const effectiveProductId = initialProductId || productId || null;

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f7f3ec] flex items-center justify-center p-4 text-sm font-semibold text-[#18382a]">
        Loading Product Form...
      </div>
    }>
      <SharedProductFormContent initialMode={effectiveMode} initialProductId={effectiveProductId} />
    </Suspense>
  );
}
