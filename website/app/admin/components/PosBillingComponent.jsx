"use client";

import API_BASE from "../../../utils/api";
import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  Receipt,
  Search,
  ShoppingCart,
  Trash2,
  Barcode,
  PauseCircle,
  PlayCircle,
  Send,
  UserPlus,
  History,
  Users,
  Printer,
  CheckCircle2,
  ArrowLeft,
  AlertTriangle,
  FileText,
  Clock,
  Check,
} from "lucide-react";

export default function PosBillingComponent({
  productsList = [],
  customersList = [],
  posBillsList = [],
  fetchAllAdminData,
  fetchDashboardMetrics,
  dateRange,
}) {
  // SUB-TAB VIEW: "terminal" | "history"
  const [posSubTab, setPosSubTab] = useState("terminal");

  // POS BILLING ACTIVE CART STATE
  const [posCart, setPosCart] = useState([]);
  const [posSearch, setPosSearch] = useState("");
  const [posCustomerType, setPosCustomerType] = useState("walk-in");
  const [posCustomerId, setPosCustomerId] = useState("");
  const [posCustomerName, setPosCustomerName] = useState("");
  const [posCustomerPhone, setPosCustomerPhone] = useState("");
  const [posPaymentMethod, setPosPaymentMethod] = useState("Cash");
  const [posDiscount, setPosDiscount] = useState(0);
  const [posDiscountType, setPosDiscountType] = useState("amount"); // "amount" | "percent"
  const [posMessage, setPosMessage] = useState("");
  const [selectedPosVariantMap, setSelectedPosVariantMap] = useState({});

  // BILL LIFECYCLE PERSISTENT SAVE STATE
  const [isSavingPosBill, setIsSavingPosBill] = useState(false);
  const [currentSavedBill, setCurrentSavedBill] = useState(null);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);

  // EXTENSION MODALS STATE
  const [posVariantModalProd, setPosVariantModalProd] = useState(null);
  const [posHeldBills, setPosHeldBills] = useState([]);
  const [showQuickCustModal, setShowQuickCustModal] = useState(false);
  const [quickCustName, setQuickCustName] = useState("");
  const [quickCustPhone, setQuickCustPhone] = useState("");
  const [quickCustEmail, setQuickCustEmail] = useState("");
  const [showPrintBillModal, setShowPrintBillModal] = useState(null);
  const [viewingSavedBill, setViewingSavedBill] = useState(null);

  // BILL HISTORY FILTER & SEARCH STATE
  const [historySearch, setHistorySearch] = useState("");
  const [historyDateFilter, setHistoryDateFilter] = useState("all"); // all | today | week | month
  const [historyPaymentFilter, setHistoryPaymentFilter] = useState("all");

  const posSearchInputRef = useRef(null);

  // Auto-focus search bar on mount & sub-tab switch
  useEffect(() => {
    if (posSubTab === "terminal" && posSearchInputRef.current) {
      posSearchInputRef.current.focus();
    }
  }, [posSubTab]);

  // SEARCH AUTOCOMPLETE MATCHES
  const posSearchMatches = useMemo(() => {
    const q = (posSearch || "").trim().toLowerCase();
    if (!q) return [];
    return (productsList || [])
      .filter((p) => {
        const nameMatch = p.name ? p.name.toLowerCase().includes(q) : false;
        const skuMatch = p.sku ? p.sku.toLowerCase().includes(q) : false;
        const brandMatch = p.brand ? p.brand.toLowerCase().includes(q) : false;
        const variantSkuMatch =
          Array.isArray(p.variants) &&
          p.variants.some((v) => (v.sku ? v.sku.toLowerCase().includes(q) : false));
        const barcodeMatch = p.barcode ? p.barcode.toLowerCase().includes(q) : false;
        return nameMatch || skuMatch || brandMatch || variantSkuMatch || barcodeMatch;
      })
      .slice(0, 8);
  }, [productsList, posSearch]);

  // ADD ITEM TO ACTIVE CART
  const handlePosAddToCart = (product, specificVariant = null) => {
    setPosMessage("");
    if (currentSavedBill) {
      // Clear previous completed bill status if cashier starts adding new items
      setCurrentSavedBill(null);
    }
    if (!product) return;

    const img =
      Array.isArray(product.images) && product.images.length > 0
        ? product.images[0]
        : product.image || "/images/helmet.webp";

    let variants =
      Array.isArray(product.variants) && product.variants.length > 0
        ? product.variants
        : [];

    if (variants.length === 0) {
      const defaultCol = (Array.isArray(product.colours) && product.colours[0]) || "";
      const defaultSz = (Array.isArray(product.sizes) && product.sizes[0]) || "";
      variants = [
        {
          id: `var-${product.id}-std`,
          colour: defaultCol,
          size: defaultSz,
          sku: product.sku || product.internalSku || product.id,
          price: product.price,
          stock:
            product.stock !== undefined && product.stock !== null ? product.stock : 10,
        },
      ];
    }

    let variantObj = specificVariant;
    if (!variantObj) {
      const selectedKey =
        selectedPosVariantMap[product.id] || variants[0].id || variants[0].sku;
      variantObj =
        variants.find(
          (v) =>
            (v.id && v.id === selectedKey) || (v.sku && v.sku === selectedKey)
        ) || variants[0];
    }

    const unitPrice =
      Number(
        variantObj.price !== undefined && variantObj.price !== null
          ? variantObj.price
          : product.price || 0
      ) || 0;
    const availableStock =
      Number(
        variantObj.stock !== undefined && variantObj.stock !== null
          ? variantObj.stock
          : product.stock || 0
      ) || 0;

    if (availableStock <= 0) {
      setPosMessage(
        `Out of Stock: ${product.name} (${variantObj.colour || ""} ${
          variantObj.size || ""
        }).`
      );
      return;
    }

    const uniqueItemKey =
      variantObj.id ||
      variantObj.sku ||
      `${product.id}-${variantObj.colour || "std"}-${variantObj.size || "std"}`;
    const variantLabel =
      [variantObj.colour, variantObj.size].filter(Boolean).join(" / ") ||
      "Standard";

    const existingIndex = posCart.findIndex(
      (item) => item.productId === product.id && item.variantId === uniqueItemKey
    );

    if (existingIndex > -1) {
      const updated = [...posCart];
      const currentQty = updated[existingIndex].quantity || 1;
      if (currentQty + 1 > availableStock) {
        setPosMessage(
          `Only ${availableStock} units available for ${product.name} (${variantLabel}).`
        );
        return;
      }
      updated[existingIndex].quantity = currentQty + 1;
      updated[existingIndex].unitPrice = unitPrice;
      updated[existingIndex].total = updated[existingIndex].quantity * unitPrice;
      updated[existingIndex].availableStock = availableStock;
      setPosCart(updated);
    } else {
      setPosCart([
        ...posCart,
        {
          productId: product.id,
          variantId: uniqueItemKey,
          name: product.name || "Unnamed Product",
          variant: variantLabel,
          sku: variantObj.sku || product.sku || product.internalSku || product.id,
          image: img,
          unitPrice: unitPrice,
          quantity: 1,
          total: unitPrice,
          availableStock: availableStock,
        },
      ]);
    }

    setPosSearch("");
    if (posSearchInputRef.current) posSearchInputRef.current.focus();
  };

  const updatePosQty = (idx, delta) => {
    setPosMessage("");
    if (idx < 0 || idx >= posCart.length) return;

    const updated = [...posCart];
    const item = updated[idx];
    const newQty = (item.quantity || 1) + delta;

    if (newQty <= 0) {
      updated.splice(idx, 1);
    } else {
      const maxStock = item.availableStock || 99;
      if (newQty > maxStock) {
        setPosMessage(`Only ${maxStock} units available in stock.`);
        return;
      }
      updated[idx].quantity = newQty;
      updated[idx].total = newQty * (updated[idx].unitPrice || 0);
    }
    setPosCart(updated);
  };

  const removePosItem = (idx) => {
    setPosMessage("");
    if (idx >= 0 && idx < posCart.length) {
      const updated = [...posCart];
      updated.splice(idx, 1);
      setPosCart(updated);
    }
  };

  // HOLD BILL HANDLERS
  const handleHoldBill = () => {
    if (posCart.length === 0) return;
    const newHeldBill = {
      id: `HOLD-${Date.now().toString().slice(-4)}`,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      cart: [...posCart],
      discount: posDiscount,
      discountType: posDiscountType,
      customerType: posCustomerType,
      customerId: posCustomerId,
      customerName: posCustomerName,
      customerPhone: posCustomerPhone,
    };
    setPosHeldBills([...posHeldBills, newHeldBill]);
    setPosCart([]);
    setPosDiscount(0);
    setCurrentSavedBill(null);
    setPosMessage(`Bill held as #${newHeldBill.id}`);
    if (posSearchInputRef.current) posSearchInputRef.current.focus();
  };

  const handleResumeHeldBill = (heldId) => {
    const held = posHeldBills.find((h) => h.id === heldId);
    if (!held) return;
    setPosCart(held.cart);
    setPosDiscount(held.discount);
    setPosDiscountType(held.discountType);
    setPosCustomerType(held.customerType);
    setPosCustomerId(held.customerId);
    setPosCustomerName(held.customerName);
    setPosCustomerPhone(held.customerPhone);
    setPosHeldBills(posHeldBills.filter((h) => h.id !== heldId));
    setCurrentSavedBill(null);
    setPosMessage(`Resumed Bill #${held.id}`);
  };

  // QUICK ADD CUSTOMER SUBMIT
  const handleQuickAddCustomerSubmit = () => {
    if (!quickCustName || !quickCustPhone) {
      alert("Please enter Rider Name and Mobile Number");
      return;
    }
    const payload = {
      name: quickCustName,
      mobile: quickCustPhone,
      email: quickCustEmail || `${quickCustPhone}@mototrek.in`,
      address: "Walk-in Store Rider",
    };

    fetch("${API_BASE}/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          if (fetchAllAdminData) fetchAllAdminData();
          setPosCustomerType("registered");
          setPosCustomerId(json.data.id || json.data._id);
          setShowQuickCustModal(false);
          setQuickCustName("");
          setQuickCustPhone("");
          setQuickCustEmail("");
          setPosMessage(`Customer ${payload.name} created and selected!`);
        }
      })
      .catch((err) => console.log("Quick create customer error:", err.message));
  };

  // WHATSAPP BILL SEND
  const handleWhatsAppBill = (billObj) => {
    if (!billObj) {
      setPosMessage("Please save the bill before sending it on WhatsApp.");
      return;
    }
    const phone = billObj.mobile || posCustomerPhone;
    if (!phone) {
      alert("Customer mobile number is required to send this bill on WhatsApp.");
      return;
    }
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const itemsText = (billObj.items || [])
      .map(
        (i) =>
          `• ${i.name} (${i.variant}) x${i.quantity} - ₹${(
            i.total || 0
          ).toLocaleString()}`
      )
      .join("\n");
    const text = `*MOTOTREK RIDING GEAR & ACCESSORIES*\n*Bill No:* ${
      billObj.billNo || billObj.id
    }\n*Date:* ${billObj.createdAt || new Date().toLocaleDateString()}\n\n*Items Purchased:*\n${itemsText}\n\n*Subtotal:* ₹${(
      billObj.subtotal || 0
    ).toLocaleString()}\n*Discount:* ₹${(
      billObj.discount || 0
    ).toLocaleString()}\n*Grand Total:* ₹${(
      billObj.grandTotal || 0
    ).toLocaleString()}\n*Payment Mode:* ${
      billObj.paymentMethod
    }\n\nThank you for shopping with Mototrek Pune! Ride Safe 🏍️`;

    window.open(
      `https://api.whatsapp.com/send?phone=${
        cleanPhone.length === 10 ? "91" + cleanPhone : cleanPhone
      }&text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  // BILL TOTAL CALCULATIONS
  const posSubtotal = (Array.isArray(posCart) ? posCart : []).reduce(
    (sum, item) => sum + (Number(item.total) || 0),
    0
  );
  const rawDiscount = Number(posDiscount) || 0;
  const computedDiscount =
    posDiscountType === "percent"
      ? (posSubtotal * Math.min(100, Math.max(0, rawDiscount))) / 100
      : rawDiscount;
  const posDiscountVal = Math.min(Math.max(0, computedDiscount), posSubtotal);
  const posGrandTotal = Math.max(0, posSubtotal - posDiscountVal);
  const posTax = Math.round(posGrandTotal * (18 / 118));

  // STEP 1: SAVE BILL PRIMARY ACTION (PERSISTENT BACKEND API + INVENTORY DEDUCTION)
  const handleSavePosBill = () => {
    if (isSavingPosBill) return;
    if (currentSavedBill) {
      setPosMessage(`Bill #${currentSavedBill.id} is already saved!`);
      return;
    }
    if (posCart.length === 0) {
      setPosMessage("Cannot save empty bill. Please add products first.");
      return;
    }

    // Verify stock limits before saving
    for (const item of posCart) {
      if (item.quantity > (item.availableStock || 99)) {
        setPosMessage(`Stock limit exceeded: Only ${item.availableStock} available for ${item.name}.`);
        return;
      }
    }

    setIsSavingPosBill(true);
    setPosMessage("");

    let custName = "Walk-in Customer";
    let custEmail = "";
    let custMobile = "";

    if (posCustomerType === "registered" && posCustomerId) {
      const foundCust = (customersList || []).find((c) => c.id === posCustomerId);
      if (foundCust) {
        custName = foundCust.name;
        custEmail = foundCust.email;
        custMobile = foundCust.mobile;
      }
    } else if (posCustomerName) {
      custName = posCustomerName;
      custMobile = posCustomerPhone;
    }

    const payload = {
      customerId: posCustomerId || "walk-in",
      customerName: custName,
      email: custEmail,
      mobile: custMobile,
      items: posCart.map((i) => ({
        productId: i.productId,
        variantId: i.variantId,
        name: i.name,
        sku: i.sku,
        variant: i.variant,
        quantity: i.quantity,
        price: i.unitPrice,
        total: i.total,
      })),
      subtotal: posSubtotal,
      discount: posDiscountVal,
      tax: posTax,
      grandTotal: posGrandTotal,
      paymentMethod: posPaymentMethod,
      paymentStatus: "Paid",
      salesChannel: "Physical Store / POS",
      staffName: "Pratik M. (Store Manager)",
    };

    fetch("${API_BASE}/pos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((json) => {
        setIsSavingPosBill(false);
        if (json.success) {
          const savedData = json.data;
          setCurrentSavedBill(savedData);
          setPosMessage(`Bill #${savedData.id} successfully saved!`);
          if (fetchAllAdminData) fetchAllAdminData();
          if (fetchDashboardMetrics && dateRange) fetchDashboardMetrics(dateRange);
        } else {
          setPosMessage(json.error?.message || "Could not save bill. Please try again.");
        }
      })
      .catch((err) => {
        setIsSavingPosBill(false);
        setPosMessage(`Save bill error: ${err.message}`);
      });
  };

  // STEP 2: START NEW BILL
  const handleStartNewBill = (force = false) => {
    if (!force && posCart.length > 0 && !currentSavedBill) {
      setShowUnsavedModal(true);
      return;
    }
    setPosCart([]);
    setPosDiscount(0);
    setPosCustomerName("");
    setPosCustomerPhone("");
    setPosCustomerId("");
    setPosCustomerType("walk-in");
    setCurrentSavedBill(null);
    setShowUnsavedModal(false);
    setPosMessage("");
    if (posSearchInputRef.current) posSearchInputRef.current.focus();
  };

  // FILTERED BILL HISTORY SCENARIOS
  const filteredBillHistory = useMemo(() => {
    return (posBillsList || []).filter((b) => {
      const q = (historySearch || "").toLowerCase();
      const matchQuery =
        !q ||
        (b.id && b.id.toLowerCase().includes(q)) ||
        (b.customerName && b.customerName.toLowerCase().includes(q)) ||
        (b.mobile && b.mobile.toLowerCase().includes(q));

      const matchPayment =
        historyPaymentFilter === "all" ||
        (b.paymentMethod && b.paymentMethod.toLowerCase() === historyPaymentFilter.toLowerCase());

      let matchDate = true;
      if (historyDateFilter !== "all" && b.createdAt) {
        const billDate = new Date(b.createdAt);
        const now = new Date();
        if (historyDateFilter === "today") {
          matchDate = billDate.toDateString() === now.toDateString();
        } else if (historyDateFilter === "week") {
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchDate = billDate >= weekAgo;
        } else if (historyDateFilter === "month") {
          matchDate = billDate.getMonth() === now.getMonth() && billDate.getFullYear() === now.getFullYear();
        }
      }

      return matchQuery && matchPayment && matchDate;
    });
  }, [posBillsList, historySearch, historyPaymentFilter, historyDateFilter]);

  return (
    <div className="space-y-4">
      {/* POS HEADER & SUB-TAB NAVIGATION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#18382a] flex items-center gap-2">
            <Receipt className="w-6 h-6 text-[#c45d2a]" />
            <span>Physical Store Billing Terminal</span>
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            Counter checkout • Instant inventory deduction • Persistent bill lifecycle
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold shrink-0">
          {posSubTab === "history" ? (
            <button
              type="button"
              onClick={() => setPosSubTab("terminal")}
              className="px-3.5 py-2 rounded-xl bg-[#18382a] text-white hover:bg-[#234e3b] transition flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4 text-white" />
              <span>Back to Counter Terminal</span>
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleHoldBill}
                disabled={posCart.length === 0 || !!currentSavedBill}
                className="px-3 py-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition flex items-center gap-1.5 disabled:opacity-40"
              >
                <PauseCircle className="w-4 h-4 text-amber-600" />
                <span>Hold Bill ({posHeldBills.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setPosSubTab("history")}
                className="px-3 py-2 rounded-xl bg-gray-100 text-gray-800 hover:bg-gray-200 transition flex items-center gap-1.5 border"
              >
                <History className="w-4 h-4 text-gray-600" />
                <span>📜 Saved Bills History ({(posBillsList || []).length})</span>
              </button>

              <button
                type="button"
                onClick={() => setShowQuickCustModal(true)}
                className="px-3 py-2 rounded-xl bg-[#18382a] text-white hover:bg-[#234e3b] transition flex items-center gap-1.5"
              >
                <UserPlus className="w-4 h-4 text-white/80" />
                <span>+ New Customer</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* VIEW SUB-TAB 1: BILLING TERMINAL */}
      {posSubTab === "terminal" && (
        <div className="space-y-4">
          {/* HELD BILLS RESUME BAR */}
          {posHeldBills.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-center gap-3 overflow-x-auto text-xs">
              <span className="font-bold text-amber-900 shrink-0 flex items-center gap-1">
                <PauseCircle className="w-4 h-4 text-amber-600" />
                Held Bills:
              </span>
              {posHeldBills.map((h) => (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => handleResumeHeldBill(h.id)}
                  className="bg-white border border-amber-300 px-3 py-1 rounded-xl font-bold text-amber-900 hover:bg-amber-100 transition shrink-0 flex items-center gap-1.5 shadow-2xs"
                >
                  <span>#{h.id} ({h.cart.length} items)</span>
                  <PlayCircle className="w-3.5 h-3.5 text-green-600" />
                </button>
              ))}
            </div>
          )}

          {/* STORE ALERT BARS */}
          {posMessage && (
            <div className="bg-amber-100 border border-amber-300 rounded-xl p-3 text-xs font-bold text-amber-900 flex items-center justify-between shadow-2xs">
              <span>{posMessage}</span>
              <button
                type="button"
                onClick={() => setPosMessage("")}
                className="text-amber-700 hover:text-amber-950 font-bold text-sm"
              >
                ✕
              </button>
            </div>
          )}

          {/* POS WORKSPACE: 8 COLS BILL TABLE + 4 COLS SUMMARY */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* LEFT WORKSPACE: SEARCH + ITEM TABLE (8 COLS) */}
            <div className="lg:col-span-8 space-y-4">
              {/* PROMINENT SEARCH & AUTO-ADD BAR */}
              <div className="relative bg-white rounded-2xl p-3 border border-gray-200 shadow-sm space-y-2 z-20">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    ref={posSearchInputRef}
                    type="text"
                    placeholder="Search product, SKU or scan barcode... (Press Enter to add)"
                    value={posSearch}
                    onChange={(e) => setPosSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && posSearch.trim()) {
                        e.preventDefault();
                        const q = posSearch.trim().toLowerCase();
                        const exactMatch = (productsList || []).find((p) => {
                          if (p.sku && p.sku.toLowerCase() === q) return true;
                          if (p.barcode && p.barcode.toLowerCase() === q) return true;
                          return (
                            Array.isArray(p.variants) &&
                            p.variants.some((v) => v.sku && v.sku.toLowerCase() === q)
                          );
                        });

                        if (exactMatch) {
                          const matchingVar = Array.isArray(exactMatch.variants)
                            ? exactMatch.variants.find(
                                (v) => v.sku && v.sku.toLowerCase() === q
                              )
                            : null;
                          handlePosAddToCart(exactMatch, matchingVar);
                        } else if (posSearchMatches.length === 1) {
                          const prod = posSearchMatches[0];
                          if (!prod.variants || prod.variants.length <= 1) {
                            handlePosAddToCart(prod);
                          } else {
                            setPosVariantModalProd(prod);
                          }
                        }
                      }
                    }}
                    className="w-full border-2 border-gray-200 focus:border-[#18382a] rounded-xl pl-11 pr-24 py-3 text-xs sm:text-sm font-semibold focus:outline-none transition shadow-2xs"
                    autoFocus
                  />

                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[11px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">
                    <Barcode className="w-3.5 h-3.5 text-gray-500" />
                    <span>Barcode Ready</span>
                  </div>
                </div>

                {/* COMPACT AUTOCOMPLETE DROPDOWN */}
                {posSearch.trim().length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-2xl border border-gray-200 shadow-xl max-h-72 overflow-y-auto divide-y divide-gray-100 z-50">
                    {posSearchMatches.length === 0 ? (
                      <div className="p-4 text-center text-xs font-semibold text-gray-400">
                        No product or SKU matching "{posSearch}".
                      </div>
                    ) : (
                      posSearchMatches.map((prod) => {
                        const vars =
                          Array.isArray(prod.variants) && prod.variants.length > 0
                            ? prod.variants
                            : [];
                        const defaultPrice = vars[0]?.price ?? prod.price ?? 0;
                        const defaultStock = vars[0]?.stock ?? prod.stock ?? 10;
                        const varCount = vars.length;

                        return (
                          <button
                            key={prod.id}
                            type="button"
                            onClick={() => {
                              if (varCount <= 1) {
                                handlePosAddToCart(prod);
                              } else {
                                setPosVariantModalProd(prod);
                              }
                            }}
                            className="w-full p-3 text-left hover:bg-gray-50 flex items-center justify-between gap-3 transition"
                          >
                            <div className="min-w-0">
                              <p className="font-bold text-xs text-gray-900 truncate">
                                {prod.name}
                              </p>
                              <p className="text-[11px] text-gray-500 font-medium truncate">
                                {varCount > 1
                                  ? `${varCount} Variants available`
                                  : `${vars[0]?.colour || ""} ${vars[0]?.size || ""}`}{" "}
                                • SKU: {vars[0]?.sku || prod.sku || prod.id}
                              </p>
                            </div>

                            <div className="text-right shrink-0">
                              <p className="font-bold text-xs text-[#18382a]">
                                ₹{defaultPrice.toLocaleString()}
                              </p>
                              <p
                                className={`text-[10px] font-bold ${
                                  defaultStock === 0 ? "text-red-600" : "text-green-600"
                                }`}
                              >
                                {defaultStock === 0
                                  ? "Out of Stock"
                                  : `Stock: ${defaultStock}`}
                              </p>
                            </div>
                          </button>
                        );
                      })
                    )}
                  </div>
                )}
              </div>

              {/* CURRENT BILL TABLE */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden min-h-[380px] flex flex-col justify-between">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="uppercase font-bold text-[11px] text-gray-400 bg-gray-50 border-b">
                        <th className="p-3.5">Item Description</th>
                        <th className="p-3.5 text-center">Quantity</th>
                        <th className="p-3.5 text-right">Unit Price</th>
                        <th className="p-3.5 text-right">Total</th>
                        <th className="p-3.5 text-center">Remove</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {posCart.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-16 text-center text-xs text-gray-400">
                            <div className="space-y-2 max-w-xs mx-auto">
                              <ShoppingCart className="w-8 h-8 text-gray-300 mx-auto" />
                              <p className="font-bold text-gray-600">Current bill is empty</p>
                              <p className="text-[11px] text-gray-400">
                                Type product name, SKU or scan barcode in the search bar above to add items instantly.
                              </p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        posCart.map((item, idx) => (
                          <tr
                            key={`${item.productId}-${item.variantId}-${idx}`}
                            className="hover:bg-gray-50/80 transition"
                          >
                            <td className="p-3.5">
                              <p className="font-bold text-xs text-gray-900 leading-snug">
                                {item.name}
                              </p>
                              <p className="text-[11px] text-gray-500 font-medium">
                                {item.variant} {item.sku ? `• SKU: ${item.sku}` : ""}
                              </p>
                            </td>
                            <td className="p-3.5 text-center">
                              <div className="inline-flex items-center border rounded-lg bg-white overflow-hidden shadow-2xs">
                                <button
                                  type="button"
                                  onClick={() => updatePosQty(idx, -1)}
                                  disabled={item.quantity <= 1 || !!currentSavedBill}
                                  className="px-2 py-1 font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-30"
                                >
                                  -
                                </button>
                                <span className="px-2.5 font-bold text-gray-900">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updatePosQty(idx, 1)}
                                  disabled={item.quantity >= (item.availableStock || 99) || !!currentSavedBill}
                                  className="px-2.5 py-1 font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-30"
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="p-3.5 text-right font-semibold text-gray-700">
                              ₹{(item.unitPrice || 0).toLocaleString()}
                            </td>
                            <td className="p-3.5 text-right font-bold text-[#18382a]">
                              ₹{(item.total || 0).toLocaleString()}
                            </td>
                            <td className="p-3.5 text-center">
                              <button
                                type="button"
                                onClick={() => removePosItem(idx)}
                                disabled={!!currentSavedBill}
                                className="text-gray-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition disabled:opacity-20"
                                title="Remove Item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="p-3 bg-gray-50 border-t flex items-center justify-between text-xs text-gray-500 font-medium">
                  <span>
                    Total Items:{" "}
                    <strong className="text-gray-900 font-bold">
                      {posCart.length}
                    </strong>
                  </span>
                  <span>
                    Total Units:{" "}
                    <strong className="text-gray-900 font-bold">
                      {posCart.reduce((acc, i) => acc + i.quantity, 0)}
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT WORKSPACE: CUSTOMER & SUMMARY PANEL (4 COLS) */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-gray-200 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                {/* SAVED BILL SUCCESS HEADER */}
                {currentSavedBill && (
                  <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3.5 text-xs text-emerald-900 space-y-1 shadow-2xs">
                    <div className="flex items-center justify-between font-bold">
                      <span className="flex items-center gap-1.5 text-emerald-700 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        Bill Saved Successfully
                      </span>
                      <span className="font-mono bg-emerald-200/80 px-2 py-0.5 rounded text-emerald-900">
                        {currentSavedBill.id}
                      </span>
                    </div>
                    <p className="text-[11px] font-medium text-emerald-800">
                      Amount: <strong>₹{(currentSavedBill.grandTotal || 0).toLocaleString()}</strong> • Status: <strong className="uppercase">{currentSavedBill.paymentStatus || 'Paid'}</strong> ({currentSavedBill.paymentMethod})
                    </p>
                  </div>
                )}

                {/* CUSTOMER SELECTION CARD */}
                <div className="space-y-2.5 bg-gray-50/80 p-3.5 rounded-xl border text-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-gray-200">
                    <span className="font-bold text-gray-900 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#c45d2a]" />
                      Customer / Rider
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowQuickCustModal(true)}
                      className="text-[11px] text-[#18382a] font-bold hover:underline"
                    >
                      + New Rider
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1 font-bold cursor-pointer">
                      <input
                        type="radio"
                        name="posCustType"
                        disabled={!!currentSavedBill}
                        checked={posCustomerType === "walk-in"}
                        onChange={() => setPosCustomerType("walk-in")}
                      />
                      <span>Walk-in</span>
                    </label>
                    <label className="flex items-center gap-1 font-bold cursor-pointer">
                      <input
                        type="radio"
                        name="posCustType"
                        disabled={!!currentSavedBill}
                        checked={posCustomerType === "registered"}
                        onChange={() => setPosCustomerType("registered")}
                      />
                      <span>Registered Rider</span>
                    </label>
                  </div>

                  {posCustomerType === "registered" ? (
                    <select
                      value={posCustomerId}
                      disabled={!!currentSavedBill}
                      onChange={(e) => setPosCustomerId(e.target.value)}
                      className="w-full border rounded-lg px-2.5 py-1.5 font-semibold text-gray-800 bg-white"
                    >
                      <option value="">-- Select Rider Account --</option>
                      {(customersList || []).map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.mobile || c.email})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 pt-0.5">
                      <input
                        type="text"
                        placeholder="Rider Name (Opt)"
                        disabled={!!currentSavedBill}
                        value={posCustomerName}
                        onChange={(e) => setPosCustomerName(e.target.value)}
                        className="border rounded-lg px-2.5 py-1 bg-white font-medium"
                      />
                      <input
                        type="text"
                        placeholder="Mobile No. (Opt)"
                        disabled={!!currentSavedBill}
                        value={posCustomerPhone}
                        onChange={(e) => setPosCustomerPhone(e.target.value)}
                        className="border rounded-lg px-2.5 py-1 bg-white font-medium"
                      />
                    </div>
                  )}
                </div>

                {/* BILL SUMMARY BOX */}
                <div className="space-y-2 text-xs font-semibold text-gray-600 bg-gray-50/50 p-3.5 rounded-xl border">
                  <div className="flex justify-between items-center">
                    <span>Subtotal:</span>
                    <span className="text-gray-900 font-bold text-sm">
                      ₹{posSubtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center gap-2">
                    <span>Discount:</span>
                    <div className="flex items-center gap-1">
                      <div className="flex border rounded-lg bg-white overflow-hidden text-[11px] font-bold">
                        <button
                          type="button"
                          disabled={!!currentSavedBill}
                          onClick={() => setPosDiscountType("amount")}
                          className={`px-1.5 py-0.5 ${
                            posDiscountType === "amount"
                              ? "bg-[#18382a] text-white"
                              : "text-gray-600"
                          }`}
                        >
                          ₹
                        </button>
                        <button
                          type="button"
                          disabled={!!currentSavedBill}
                          onClick={() => setPosDiscountType("percent")}
                          className={`px-1.5 py-0.5 ${
                            posDiscountType === "percent"
                              ? "bg-[#18382a] text-white"
                              : "text-gray-600"
                          }`}
                        >
                          %
                        </button>
                      </div>
                      <input
                        type="number"
                        disabled={!!currentSavedBill}
                        value={posDiscount}
                        onChange={(e) => setPosDiscount(e.target.value)}
                        placeholder="0"
                        className="w-16 border rounded-lg px-2 py-0.5 text-right font-bold text-red-600 bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-gray-500">
                    <span>GST Included (18%):</span>
                    <span>₹{posTax.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center text-base font-bold text-[#18382a] pt-2 border-t border-gray-200">
                    <span>Grand Total:</span>
                    <span className="text-lg text-[#18382a]">
                      ₹{posGrandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* PAYMENT METHOD SELECTOR */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 text-xs font-bold">
                    {["Cash", "UPI", "Card"].map((pm) => (
                      <button
                        key={pm}
                        type="button"
                        disabled={!!currentSavedBill}
                        onClick={() => setPosPaymentMethod(pm)}
                        className={`py-2 rounded-xl border text-center transition ${
                          posPaymentMethod === pm
                            ? "bg-[#18382a] text-white border-[#18382a]"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {pm}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* CHECKOUT ACTION BUTTONS */}
              <div className="space-y-2 pt-2 border-t">
                {/* PRIMARY ACTION: SAVE BILL */}
                {!currentSavedBill ? (
                  <button
                    type="button"
                    onClick={handleSavePosBill}
                    disabled={posCart.length === 0 || isSavingPosBill}
                    className="w-full bg-[#18382a] text-white py-3 rounded-xl text-xs font-bold hover:bg-[#244f3c] transition shadow disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4 text-white" />
                    <span>{isSavingPosBill ? "Saving Bill..." : "Save Bill"}</span>
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setShowPrintBillModal(currentSavedBill)}
                      className="bg-gray-900 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-black transition flex items-center justify-center gap-1.5"
                    >
                      <Printer className="w-4 h-4 text-white/80" />
                      <span>Print Bill</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleWhatsAppBill(currentSavedBill)}
                      className="bg-emerald-600 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-700 transition flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                )}

                {/* SECONDARY ACTION: NEW BILL */}
                <button
                  type="button"
                  onClick={() => handleStartNewBill(false)}
                  className="w-full border-2 border-gray-300 text-gray-800 py-2.5 rounded-xl text-xs font-bold hover:bg-gray-100 transition flex items-center justify-center gap-1.5"
                >
                  <span>+ Start New Bill</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW SUB-TAB 2: SAVED BILLS HISTORY */}
      {posSubTab === "history" && (
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
            <div>
              <h3 className="font-bold text-lg text-[#18382a] flex items-center gap-2">
                <History className="w-5 h-5 text-[#c45d2a]" />
                Saved POS Bills Directory
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Complete record of all physical store sales transactions
              </p>
            </div>

            {/* FILTERS AND SEARCH */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <div className="relative min-w-[200px]">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by Bill ID, Customer, Phone..."
                  value={historySearch}
                  onChange={(e) => setHistorySearch(e.target.value)}
                  className="w-full border rounded-xl pl-9 pr-3 py-2 text-xs font-medium"
                />
              </div>

              <select
                value={historyDateFilter}
                onChange={(e) => setHistoryDateFilter(e.target.value)}
                className="border rounded-xl px-3 py-2 text-xs font-semibold bg-white text-gray-700"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>

              <select
                value={historyPaymentFilter}
                onChange={(e) => setHistoryPaymentFilter(e.target.value)}
                className="border rounded-xl px-3 py-2 text-xs font-semibold bg-white text-gray-700"
              >
                <option value="all">All Payments</option>
                <option value="cash">Cash</option>
                <option value="upi">UPI</option>
                <option value="card">Card</option>
              </select>
            </div>
          </div>

          {/* BILL HISTORY TABLE */}
          <div className="overflow-x-auto min-h-[350px]">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="uppercase font-bold text-[11px] text-gray-400 bg-gray-50 border-b">
                  <th className="p-3">Bill ID</th>
                  <th className="p-3">Date & Time</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Items</th>
                  <th className="p-3 text-right">Grand Total</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBillHistory.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-16 text-center text-xs text-gray-400 font-semibold">
                      No saved POS bills matching current filters.
                    </td>
                  </tr>
                ) : (
                  filteredBillHistory.map((bill) => (
                    <tr key={bill.id} className="hover:bg-gray-50 transition">
                      <td className="p-3 font-mono font-bold text-[#18382a]">{bill.id}</td>
                      <td className="p-3 text-gray-500 font-medium">{bill.createdAt || "N/A"}</td>
                      <td className="p-3 font-bold text-gray-900">
                        {bill.customerName}
                        {bill.mobile && <span className="block text-[11px] font-normal text-gray-500">{bill.mobile}</span>}
                      </td>
                      <td className="p-3 text-gray-600 font-medium">
                        {(bill.items || []).length} items ({(bill.items || []).reduce((sum, i) => sum + (i.quantity || 1), 0)} units)
                      </td>
                      <td className="p-3 text-right font-bold text-gray-900">
                        ₹{(bill.grandTotal || 0).toLocaleString()}
                      </td>
                      <td className="p-3 font-bold text-gray-700">{bill.paymentMethod || "Cash"}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-800">
                          {bill.paymentStatus || "Paid"}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-1">
                        <button
                          type="button"
                          onClick={() => setViewingSavedBill(bill)}
                          className="px-2.5 py-1 bg-gray-100 border font-bold text-gray-700 rounded-lg hover:bg-gray-200"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowPrintBillModal(bill)}
                          className="px-2.5 py-1 bg-gray-900 font-bold text-white rounded-lg hover:bg-black"
                        >
                          Print
                        </button>
                        <button
                          type="button"
                          onClick={() => handleWhatsAppBill(bill)}
                          className="px-2.5 py-1 bg-emerald-100 font-bold text-emerald-800 rounded-lg hover:bg-emerald-200"
                        >
                          WhatsApp
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: VIEW SAVED BILL DETAIL MODAL */}
      {viewingSavedBill && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 space-y-4 border border-gray-200 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-bold text-sm text-[#18382a] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#c45d2a]" />
                  Saved POS Bill Detail
                </h3>
                <p className="text-[11px] font-mono text-gray-500 mt-0.5">{viewingSavedBill.id}</p>
              </div>
              <button
                type="button"
                onClick={() => setViewingSavedBill(null)}
                className="text-gray-400 hover:text-gray-700 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-xl border text-gray-700">
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold">Sales Channel</p>
                <p className="font-bold text-gray-900">Physical Store / POS</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold">Date & Time</p>
                <p className="font-medium text-gray-900">{viewingSavedBill.createdAt}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold">Customer Name</p>
                <p className="font-bold text-gray-900">{viewingSavedBill.customerName}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold">Mobile</p>
                <p className="font-medium text-gray-900">{viewingSavedBill.mobile || "Walk-in"}</p>
              </div>
            </div>

            {/* ITEM BREAKDOWN */}
            <div className="border rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-gray-50 font-bold text-[10px] text-gray-400 uppercase border-b">
                    <th className="p-2.5">Item</th>
                    <th className="p-2.5 text-center">Qty</th>
                    <th className="p-2.5 text-right">Price</th>
                    <th className="p-2.5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {(viewingSavedBill.items || []).map((i, idx) => (
                    <tr key={idx}>
                      <td className="p-2.5">
                        <p className="font-bold text-gray-900">{i.name}</p>
                        <p className="text-[10px] text-gray-500">{i.variant} • {i.sku}</p>
                      </td>
                      <td className="p-2.5 text-center font-bold">{i.quantity}</td>
                      <td className="p-2.5 text-right font-semibold">₹{(i.price || 0).toLocaleString()}</td>
                      <td className="p-2.5 text-right font-bold text-[#18382a]">₹{(i.total || 0).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* TOTALS SUMMARY */}
            <div className="space-y-1 text-right text-xs font-semibold text-gray-600 bg-gray-50 p-3 rounded-xl border">
              <p>Subtotal: <strong className="text-gray-900">₹{(viewingSavedBill.subtotal || 0).toLocaleString()}</strong></p>
              {viewingSavedBill.discount > 0 && <p className="text-red-600">Discount: -₹{viewingSavedBill.discount.toLocaleString()}</p>}
              <p>GST Included (18%): ₹{(viewingSavedBill.tax || 0).toLocaleString()}</p>
              <p className="text-sm font-bold text-[#18382a] pt-1 border-t">GRAND TOTAL: ₹{(viewingSavedBill.grandTotal || 0).toLocaleString()}</p>
              <p className="text-[10px] text-gray-500">Paid via {viewingSavedBill.paymentMethod} • Status: {viewingSavedBill.paymentStatus || 'Paid'}</p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => {
                  setShowPrintBillModal(viewingSavedBill);
                  setViewingSavedBill(null);
                }}
                className="px-4 py-2 bg-gray-900 text-white rounded-xl font-bold hover:bg-black"
              >
                🖨️ Print Invoice
              </button>
              <button
                type="button"
                onClick={() => handleWhatsAppBill(viewingSavedBill)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700"
              >
                Send WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: UNSAVED BILL CONFIRMATION MODAL */}
      {showUnsavedModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 border border-gray-200 shadow-2xl text-xs text-gray-800">
            <div className="flex items-center gap-3 text-amber-600">
              <AlertTriangle className="w-7 h-7 shrink-0" />
              <div>
                <h3 className="font-bold text-sm text-gray-900">Unsaved Bill Draft</h3>
                <p className="text-gray-500 text-[11px] mt-0.5">You have active items in your bill draft that haven't been saved yet.</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t font-bold">
              <button
                type="button"
                onClick={() => setShowUnsavedModal(false)}
                className="px-3.5 py-2 border rounded-xl text-gray-600 hover:bg-gray-100"
              >
                Continue Editing
              </button>
              <button
                type="button"
                onClick={() => handleStartNewBill(true)}
                className="px-3.5 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
              >
                Discard & Start New
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: COMPACT VARIANT SELECTION MODAL */}
      {posVariantModalProd && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-4 border border-gray-200 shadow-2xl">
            <div className="flex items-start justify-between border-b pb-3">
              <div>
                <h3 className="font-bold text-sm text-gray-900 leading-snug">
                  {posVariantModalProd.name}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Select variant to add to bill
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPosVariantModalProd(null)}
                className="text-gray-400 hover:text-gray-700 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {(posVariantModalProd.variants || []).map((v) => {
                const vPrice = Number(
                  v.price !== undefined ? v.price : posVariantModalProd.price || 0
                );
                const vStock = Number(v.stock !== undefined ? v.stock : 10);

                return (
                  <div
                    key={v.id || v.sku || `${v.colour}-${v.size}`}
                    className="flex items-center justify-between p-3 border rounded-xl hover:bg-gray-50 transition"
                  >
                    <div>
                      <p className="font-bold text-xs text-gray-900">
                        {[v.colour, v.size].filter(Boolean).join(" / ") ||
                          "Standard"}
                      </p>
                      <p className="text-[11px] font-mono text-gray-500">
                        SKU: {v.sku || posVariantModalProd.id}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-bold text-xs text-[#18382a]">
                          ₹{vPrice.toLocaleString()}
                        </p>
                        <p
                          className={`text-[10px] font-bold ${
                            vStock === 0 ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          {vStock === 0 ? "Out of Stock" : `Stock: ${vStock}`}
                        </p>
                      </div>

                      <button
                        type="button"
                        disabled={vStock === 0}
                        onClick={() => {
                          handlePosAddToCart(posVariantModalProd, v);
                          setPosVariantModalProd(null);
                        }}
                        className="bg-[#18382a] text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-[#c45d2a] transition disabled:opacity-40"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: QUICK ADD CUSTOMER MODAL */}
      {showQuickCustModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 border border-gray-200 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-sm text-[#18382a] flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-[#c45d2a]" />
                Quick Register Rider
              </h3>
              <button
                type="button"
                onClick={() => setShowQuickCustModal(false)}
                className="text-gray-400 hover:text-gray-700 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Rider Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vikram Sharma"
                  value={quickCustName}
                  onChange={(e) => setQuickCustName(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 9823012345"
                  value={quickCustPhone}
                  onChange={(e) => setQuickCustPhone(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="vikram@gmail.com"
                  value={quickCustEmail}
                  onChange={(e) => setQuickCustEmail(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 font-medium"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t text-xs font-bold">
              <button
                type="button"
                onClick={() => setShowQuickCustModal(false)}
                className="px-3.5 py-2 border rounded-xl text-gray-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleQuickAddCustomerSubmit}
                className="px-4 py-2 bg-[#18382a] text-white rounded-xl hover:bg-[#234e3b]"
              >
                Save Rider
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: THERMAL / A4 PRINT RECEIPT MODAL */}
      {showPrintBillModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 border border-gray-200 shadow-2xl text-xs font-mono text-gray-800">
            <div className="text-center space-y-1 pb-3 border-b border-dashed border-gray-300">
              <h2 className="text-base font-bold text-gray-900 tracking-wider">
                MOTOTREK PUNE
              </h2>
              <p className="text-[10px] text-gray-500">
                Premium Riding Gear & Accessories
              </p>
              <p className="text-[10px] text-gray-500">
                FC Road, Pune • Ph: +91 98230 12345
              </p>
              <p className="text-[10px] font-bold text-gray-700 pt-1">
                BILL NO: {showPrintBillModal.id}
              </p>
              <p className="text-[10px] text-gray-400">
                {showPrintBillModal.createdAt || new Date().toLocaleString()}
              </p>
            </div>

            <div className="space-y-1 text-[11px]">
              <p>
                <strong>Customer:</strong> {showPrintBillModal.customerName}
              </p>
              {showPrintBillModal.mobile && (
                <p>
                  <strong>Mobile:</strong> {showPrintBillModal.mobile}
                </p>
              )}
            </div>

            <div className="border-t border-b border-dashed border-gray-300 py-2 space-y-1 text-[11px]">
              {(showPrintBillModal.items || []).map((i, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>
                    {i.name} ({i.variant}) x{i.quantity}
                  </span>
                  <span>₹{(i.total || 0).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1 text-right text-[11px]">
              <p>Subtotal: ₹{(showPrintBillModal.subtotal || 0).toLocaleString()}</p>
              {showPrintBillModal.discount > 0 && (
                <p className="text-red-600">
                  Discount: -₹{showPrintBillModal.discount.toLocaleString()}
                </p>
              )}
              <p>
                GST Included (18%): ₹
                {(showPrintBillModal.tax || 0).toLocaleString()}
              </p>
              <p className="text-sm font-bold text-gray-900 pt-1 border-t">
                GRAND TOTAL: ₹
                {(showPrintBillModal.grandTotal || 0).toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-500">
                Paid via {showPrintBillModal.paymentMethod}
              </p>
            </div>

            <div className="text-center pt-2 text-[10px] text-gray-400 border-t border-dashed">
              Thank you for visiting Mototrek! Ride Safe 🏍️
            </div>

            <div className="flex justify-end gap-2 pt-2 font-sans">
              <button
                type="button"
                onClick={() => setShowPrintBillModal(null)}
                className="px-3 py-1.5 border rounded-xl font-bold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-1.5 bg-[#18382a] text-white rounded-xl font-bold hover:bg-[#244f3c]"
              >
                🖨️ Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}