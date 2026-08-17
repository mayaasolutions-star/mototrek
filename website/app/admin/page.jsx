"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import PosBillingComponent from "./components/PosBillingComponent";
import CustomerDirectoryComponent from "./components/CustomerDirectoryComponent";
import OrderWorkspaceModal from "./components/OrderWorkspaceModal";
import {
  demoAdminData,
  buildDashboardMetrics,
} from "../../mock/adminDemoData.mjs";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Boxes,
  Users,
  UserCheck,
  Ticket,
  BarChart3,
  Settings,
  Search,
  Bell,
  Plus,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ChevronRight,
  ExternalLink,
  X,
  Copy,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  RefreshCw,
  Eye,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  FileText,
  Check,
  Pencil,
  Receipt,
  Printer,
  Building2,
  Wallet,
  Landmark,
  TrendingDown,
  Minus,
  ShoppingCart,
  Trash2,
  Barcode,
  PauseCircle,
  PlayCircle,
  Send,
  UserPlus,
  QrCode,
  History,
} from "lucide-react";

const formatCurrency = (value = 0) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dateRange, setDateRange] = useState("lifetime"); // lifetime | month | week | yesterday | today
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [orderFilter, setOrderFilter] = useState("All");
  const [demoMode, setDemoMode] = useState(true);
  const [selectedPosVariantMap, setSelectedPosVariantMap] = useState({});

  const orderModalBodyRef = useRef(null);

  // Dynamic API Metrics State
  const [metrics, setMetrics] = useState(demoAdminData.metrics);

  // Dynamic Data Lists
  const [productsList, setProductsList] = useState(demoAdminData.products);
  const [ordersList, setOrdersList] = useState(demoAdminData.orders);
  const [customersList, setCustomersList] = useState(demoAdminData.customers);
  const [couponsList, setCouponsList] = useState(demoAdminData.coupons);
  const [posBillsList, setPosBillsList] = useState(demoAdminData.posBills);
  const [suppliersList, setSuppliersList] = useState(demoAdminData.suppliers);
  const [purchaseOrdersList, setPurchaseOrdersList] = useState(demoAdminData.purchaseOrders);
  const [accountsSummary, setAccountsSummary] = useState(demoAdminData.accountsSummary);
  const [transactionsList, setTransactionsList] = useState(demoAdminData.transactions);

  // Inventory Stock Modal State
  const [stockModalVariant, setStockModalVariant] = useState(null);
  const [stockAdjAmount, setStockAdjAmount] = useState(5);
  const [stockAdjReason, setStockAdjReason] = useState("Restock");

  // POS BILLS STATE (FOR HISTORICAL VIEW)
  const [selectedPosBill, setSelectedPosBill] = useState(null);

  // SUPPLIERS & PURCHASES STATE
  const [suppliersSubTab, setSuppliersSubTab] = useState("orders"); // orders | suppliers
  const [showCreatePoModal, setShowCreatePoModal] = useState(false);
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
  const [poSupplierId, setPoSupplierId] = useState("");
  const [poItemSku, setPoItemSku] = useState("");
  const [poItemQty, setPoItemQty] = useState(10);
  const [poItemCost, setPoItemCost] = useState(3800);
  const [poNotes, setPoNotes] = useState("");

  const [newSupName, setNewSupName] = useState("");
  const [newSupCompany, setNewSupCompany] = useState("");
  const [newSupContact, setNewSupContact] = useState("");
  const [newSupPhone, setNewSupPhone] = useState("");
  const [newSupEmail, setNewSupEmail] = useState("");
  const [newSupGstin, setNewSupGstin] = useState("");
  const [newSupAddress, setNewSupAddress] = useState("");

  // ACCOUNTS EXPENSE STATE
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [expCategory, setExpCategory] = useState("Rent");
  const [expDescription, setExpDescription] = useState("");
  const [expAmount, setExpAmount] = useState("");
  const [expPaymentMethod, setExpPaymentMethod] = useState("Bank Transfer");

  // Body Scroll Lock & Scroll-Top Reset & Escape Key Handler
  useEffect(() => {
    if (selectedOrder || selectedCustomer || stockModalVariant || selectedPosBill || showCreatePoModal || showAddSupplierModal || showExpenseModal) {
      document.body.style.overflow = "hidden";

      if (selectedOrder && orderModalBodyRef.current) {
        orderModalBodyRef.current.scrollTop = 0;
      }

      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          setSelectedOrder(null);
          setSelectedCustomer(null);
          setStockModalVariant(null);
          setSelectedPosBill(null);
          setShowCreatePoModal(false);
          setShowAddSupplierModal(false);
          setShowExpenseModal(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [selectedOrder, selectedCustomer, stockModalVariant, selectedPosBill, showCreatePoModal, showAddSupplierModal, showExpenseModal]);

  const setDemoDataState = () => {
    setDemoMode(true);
    setMetrics(buildDashboardMetrics(dateRange));
    setProductsList(demoAdminData.products);
    setOrdersList(demoAdminData.orders);
    setCustomersList(demoAdminData.customers);
    setCouponsList(demoAdminData.coupons);
    setPosBillsList(demoAdminData.posBills);
    setSuppliersList(demoAdminData.suppliers);
    setPurchaseOrdersList(demoAdminData.purchaseOrders);
    setAccountsSummary(demoAdminData.accountsSummary);
    setTransactionsList(demoAdminData.transactions);
    if (!poSupplierId && demoAdminData.suppliers[0]) {
      setPoSupplierId(demoAdminData.suppliers[0].id);
    }
  };

  // Fetch Dashboard Metrics by Date Range
  const fetchDashboardMetrics = (range = dateRange) => {
    fetch(`http://localhost:5000/api/v1/analytics/dashboard?range=${range}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setDemoMode(false);
          setMetrics(json.data);
        } else {
          setDemoDataState();
        }
      })
      .catch((err) => {
        console.log("Dashboard metrics API info:", err.message);
        setDemoDataState();
      });
  };

  // Fetch All Admin Domain Data
  const fetchAllAdminData = () => {
    fetch("http://localhost:5000/api/v1/products/admin/all")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setDemoMode(false);
          setProductsList(json.data);
          const initialMap = {};
          json.data.forEach((p) => {
            if (Array.isArray(p.variants) && p.variants.length > 0) {
              initialMap[p.id] = p.variants[0].id || p.variants[0].sku;
            }
          });
          setSelectedPosVariantMap(initialMap);
        } else {
          setProductsList(demoAdminData.products);
        }
      })
      .catch((err) => {
        console.log("Products API info:", err.message);
        setProductsList(demoAdminData.products);
      });

    fetch("http://localhost:5000/api/v1/orders")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setDemoMode(false);
          setOrdersList(json.data);
        } else {
          setOrdersList(demoAdminData.orders);
        }
      })
      .catch((err) => {
        console.log("Orders API info:", err.message);
        setOrdersList(demoAdminData.orders);
      });

    fetch("http://localhost:5000/api/v1/customers")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setDemoMode(false);
          setCustomersList(json.data);
        } else {
          setCustomersList(demoAdminData.customers);
        }
      })
      .catch((err) => {
        console.log("Customers API info:", err.message);
        setCustomersList(demoAdminData.customers);
      });

    fetch("http://localhost:5000/api/v1/coupons")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setDemoMode(false);
          setCouponsList(json.data);
        } else {
          setCouponsList(demoAdminData.coupons);
        }
      })
      .catch((err) => {
        console.log("Coupons API info:", err.message);
        setCouponsList(demoAdminData.coupons);
      });

    fetch("http://localhost:5000/api/v1/pos")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setDemoMode(false);
          setPosBillsList(json.data);
        } else {
          setPosBillsList(demoAdminData.posBills);
        }
      })
      .catch((err) => {
        console.log("POS API info:", err.message);
        setPosBillsList(demoAdminData.posBills);
      });

    fetch("http://localhost:5000/api/v1/suppliers")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setDemoMode(false);
          setSuppliersList(json.data);
          if (json.data.length > 0 && !poSupplierId) {
            setPoSupplierId(json.data[0].id);
          }
        } else {
          setSuppliersList(demoAdminData.suppliers);
        }
      })
      .catch((err) => {
        console.log("Suppliers API info:", err.message);
        setSuppliersList(demoAdminData.suppliers);
      });

    fetch("http://localhost:5000/api/v1/purchases")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setDemoMode(false);
          setPurchaseOrdersList(json.data);
        } else {
          setPurchaseOrdersList(demoAdminData.purchaseOrders);
        }
      })
      .catch((err) => {
        console.log("Purchases API info:", err.message);
        setPurchaseOrdersList(demoAdminData.purchaseOrders);
      });

    fetch("http://localhost:5000/api/v1/accounts")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setDemoMode(false);
          if (json.data.summary) setAccountsSummary(json.data.summary);
          if (Array.isArray(json.data.transactions)) setTransactionsList(json.data.transactions);
        } else {
          setAccountsSummary(demoAdminData.accountsSummary);
          setTransactionsList(demoAdminData.transactions);
        }
      })
      .catch((err) => {
        console.log("Accounts API info:", err.message);
        setAccountsSummary(demoAdminData.accountsSummary);
        setTransactionsList(demoAdminData.transactions);
      });
  };

  useEffect(() => {
    fetchDashboardMetrics("lifetime");
    fetchAllAdminData();
  }, []);

  const handleDateRangeChange = (newRange) => {
    setDateRange(newRange);
    fetchDashboardMetrics(newRange);
  };

  const handleOrderStatusChange = (orderId, newStatus) => {
    fetch(`http://localhost:5000/api/v1/orders/${orderId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          fetchAllAdminData();
          fetchDashboardMetrics(dateRange);
          if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder({ ...selectedOrder, orderStatus: newStatus });
          }
        }
      })
      .catch((err) => console.log("Update status error:", err.message));
  };

  const handleDuplicateProduct = (prodId) => {
    fetch(`http://localhost:5000/api/v1/products/${prodId}/duplicate`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          fetchAllAdminData();
        }
      })
      .catch((err) => console.log("Duplicate product error:", err.message));
  };

  const handleAdjustStockSubmit = () => {
    if (!stockModalVariant) return;
    fetch("http://localhost:5000/api/v1/products/inventory/adjust", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        variantId: stockModalVariant.sku,
        adjustment: Number(stockAdjAmount),
        reason: stockAdjReason,
        adminName: "Pratik M. (Admin)",
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          fetchAllAdminData();
          setStockModalVariant(null);
        }
      })
      .catch((err) => console.log("Adjust stock error:", err.message));
  };

  // PURCHASES: RECEIVE STOCK SUBMIT
  const handleReceivePo = (poId) => {
    fetch(`http://localhost:5000/api/v1/purchases/${poId}/receive`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminName: "Pratik M. (Store Manager)" }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          fetchAllAdminData();
        }
      })
      .catch((err) => console.log("Receive PO error:", err.message));
  };

  // PURCHASES: CREATE PO SUBMIT
  const handleCreatePoSubmit = () => {
    const selectedSup = suppliersList.find((s) => s.id === poSupplierId) || suppliersList[0];
    const totalCost = Number(poItemQty) * Number(poItemCost);

    const payload = {
      supplierId: poSupplierId || selectedSup?.id,
      supplierName: selectedSup?.name || "Supplier",
      items: [{ name: "Stock Batch Item", sku: poItemSku || "RYN-BLK-L", quantity: Number(poItemQty), unitCost: Number(poItemCost), totalCost }],
      subtotalCost: totalCost,
      taxCost: Math.round(totalCost * 0.18),
      totalPurchaseCost: Math.round(totalCost * 1.18),
      paymentStatus: "Pending",
      status: "Ordered",
      notes: poNotes,
    };

    fetch("http://localhost:5000/api/v1/purchases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setShowCreatePoModal(false);
          fetchAllAdminData();
        }
      })
      .catch((err) => console.log("Create PO error:", err.message));
  };

  // SUPPLIERS: CREATE SUPPLIER SUBMIT
  const handleAddSupplierSubmit = () => {
    if (!newSupName) return;
    const payload = {
      name: newSupName,
      companyName: newSupCompany || newSupName,
      contactPerson: newSupContact,
      phone: newSupPhone,
      email: newSupEmail,
      address: newSupAddress,
      gstin: newSupGstin,
    };

    fetch("http://localhost:5000/api/v1/suppliers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setShowAddSupplierModal(false);
          setNewSupName("");
          fetchAllAdminData();
        }
      })
      .catch((err) => console.log("Add Supplier error:", err.message));
  };

  // ACCOUNTS: ADD EXPENSE SUBMIT
  const handleAddExpenseSubmit = () => {
    if (!expDescription || !expAmount) return;
    const payload = {
      category: expCategory,
      description: `${expCategory}: ${expDescription}`,
      amount: Number(expAmount),
      paymentMethod: expPaymentMethod,
    };

    fetch("http://localhost:5000/api/v1/accounts/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setShowExpenseModal(false);
          setExpDescription("");
          setExpAmount("");
          fetchAllAdminData();
        }
      })
      .catch((err) => console.log("Add Expense error:", err.message));
  };

  // Filtered Products
  const filteredProducts = productsList.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      (p.brand && p.brand.toLowerCase().includes(q)) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.slug && p.slug.toLowerCase().includes(q))
    );
  });

  const todayKey = new Date().toISOString().slice(0, 10);
  const onlineSalesToday = ordersList.reduce((sum, o) => {
    const orderDate = o.createdAt ? new Date(o.createdAt).toISOString().slice(0, 10) : null;
    return orderDate === todayKey ? sum + Number(o.grandTotal || 0) : sum;
  }, 0);
  const storeSalesToday = posBillsList.reduce((sum, bill) => {
    const billDate = bill.createdAt ? new Date(bill.createdAt).toISOString().slice(0, 10) : null;
    return billDate === todayKey ? sum + Number(bill.grandTotal || 0) : sum;
  }, 0);
  const totalSalesToday = onlineSalesToday + storeSalesToday;
  const todayBillsCount = posBillsList.filter((bill) => {
    const billDate = bill.createdAt ? new Date(bill.createdAt).toISOString().slice(0, 10) : null;
    return billDate === todayKey;
  }).length;
  const avgBillValue = totalSalesToday && todayBillsCount ? totalSalesToday / todayBillsCount : 0;

  const newOrdersToday = ordersList.filter((o) => {
    const orderDate = o.createdAt ? new Date(o.createdAt).toISOString().slice(0, 10) : null;
    return orderDate === todayKey;
  }).length;
  const pendingPaymentVerification = ordersList.filter((o) => (o.paymentStatus || "Paid") !== "Paid").length;
  const ordersToPack = ordersList.filter((o) => ["Confirmed", "Processing", "Packed"].includes(o.orderStatus || o.status)).length;
  const ordersReadyToShip = ordersList.filter((o) => (o.orderStatus || o.status) === "Packed").length;
  const delayedOrders = ordersList.filter((o) => {
    const createdAt = o.createdAt ? new Date(o.createdAt) : null;
    if (!createdAt) return false;
    return (Date.now() - createdAt.getTime()) > 1000 * 60 * 60 * 24 * 3 && !["Delivered", "Cancelled"].includes(o.orderStatus || o.status);
  }).length;

  const outOfStockProducts = productsList.filter((p) => Number(p.totalStock ?? p.stock ?? 0) <= 0).length;
  const lowStockProducts = productsList.filter((p) => {
    const stock = Number(p.totalStock ?? p.stock ?? 0);
    const threshold = Number(p.lowStockThreshold ?? 8);
    return stock > 0 && stock <= threshold;
  }).length;
  const stockValue = productsList.reduce((sum, p) => sum + (Number(p.price || 0) * Number(p.totalStock ?? p.stock ?? 0)), 0);
  const fastMovingProducts = productsList.filter((p) => Number(p.totalStock ?? p.stock ?? 0) <= 10).length;

  const newCustomersThisWeek = customersList.filter((c) => {
    const date = c.registrationDate ? new Date(c.registrationDate) : null;
    if (!date) return false;
    return Date.now() - date.getTime() <= 1000 * 60 * 60 * 24 * 7;
  }).length;
  const pendingEnquiries = demoAdminData.enquiries.filter((enq) => ["New", "Contacted", "Follow-up"].includes(enq.status)).length;
  const followUpsDueToday = demoAdminData.enquiries.filter((enq) => enq.followUpDate === todayKey).length;

  const cashCollectedToday = posBillsList.filter((bill) => {
    const billDate = bill.createdAt ? new Date(bill.createdAt).toISOString().slice(0, 10) : null;
    return billDate === todayKey && (bill.paymentMethod || "Cash") === "Cash";
  }).reduce((sum, bill) => sum + Number(bill.grandTotal || 0), 0);
  const upiCollectedToday = posBillsList.filter((bill) => {
    const billDate = bill.createdAt ? new Date(bill.createdAt).toISOString().slice(0, 10) : null;
    return billDate === todayKey && (bill.paymentMethod || "").toLowerCase() === "upi";
  }).reduce((sum, bill) => sum + Number(bill.grandTotal || 0), 0);
  const cardCollectedToday = posBillsList.filter((bill) => {
    const billDate = bill.createdAt ? new Date(bill.createdAt).toISOString().slice(0, 10) : null;
    return billDate === todayKey && (bill.paymentMethod || "").toLowerCase() === "card";
  }).reduce((sum, bill) => sum + Number(bill.grandTotal || 0), 0);

  const needsAttention = [
    { type: "danger", text: `${ordersToPack} online orders waiting to be packed` },
    { type: "danger", text: `${pendingPaymentVerification} payment verifications pending` },
    { type: "danger", text: `${outOfStockProducts} products out of stock` },
    { type: "warning", text: `${followUpsDueToday} customer follow-ups due today` },
    { type: "warning", text: `₹${(demoAdminData.payments.filter((p) => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0)).toLocaleString()} supplier/payment follow-up due` },
    { type: "warning", text: `${lowStockProducts} low-stock fast-moving products` },
  ];

  // Filtered Orders
  const filteredOrders = ordersList.filter((o) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      o.id.toLowerCase().includes(q) ||
      (o.customerName && o.customerName.toLowerCase().includes(q)) ||
      (o.customer && o.customer.toLowerCase().includes(q));

    const statusMatch = orderFilter === "All" || o.orderStatus === orderFilter || o.status === orderFilter;
    return matchesSearch && statusMatch;
  });

  return (
    <div className="h-screen bg-[#f7f3ec] text-[#1f241f] font-sans flex flex-col overflow-hidden">
      {/* HEADER BAR */}
      <header className="bg-[#10281e] text-white border-b border-white/10 shrink-0 h-16 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-[#c45d2a] flex items-center justify-center font-black text-white text-lg shadow">
                M
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-[#f0b04d] transition">
                MOTOTREK <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/80">ADMIN</span>
              </span>
            </Link>
          </div>

          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search orders, products, customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 text-white placeholder-white/40 border border-white/15 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:bg-white/20 transition"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#f0b04d]/40 bg-[#f0b04d]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#f0d9aa]">
              Demo Data
            </span>
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white bg-white/10 px-3 py-1.5 rounded-lg transition"
            >
              <span>Customer Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center gap-2 pl-2 border-l border-white/10">
              <div className="w-8 h-8 rounded-full bg-[#c45d2a] text-white flex items-center justify-center font-bold text-xs shadow">
                PM
              </div>
              <span className="text-xs font-semibold hidden lg:inline-block">Pratik M.</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN APPLICATION SHELL CONTAINER */}
      <div className="flex-1 flex overflow-hidden w-full">
        {/* FIXED LEFT SIDEBAR NAVIGATION */}
        <aside className="w-64 shrink-0 h-full overflow-y-auto bg-[#10281e] text-white p-4 border-r border-white/10 hidden md:block space-y-1">
            <p className="px-3 text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
              Core Modules
            </p>

            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                activeTab === "dashboard"
                  ? "bg-[#c45d2a] text-white font-semibold shadow-lg"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                activeTab === "orders"
                  ? "bg-[#c45d2a] text-white font-semibold shadow-lg"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Orders</span>
              </div>
              <span className="bg-[#f0b04d] text-[#10281e] text-xs font-bold px-2 py-0.5 rounded-full">
                {ordersList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("products")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                activeTab === "products"
                  ? "bg-[#c45d2a] text-white font-semibold shadow-lg"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products Catalogue</span>
            </button>

            <button
              onClick={() => setActiveTab("inventory")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                activeTab === "inventory"
                  ? "bg-[#c45d2a] text-white font-semibold shadow-lg"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Boxes className="w-4 h-4" />
                <span>Inventory</span>
              </div>
              {metrics.outOfStockProducts > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {metrics.outOfStockProducts}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("customers")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                activeTab === "customers"
                  ? "bg-[#c45d2a] text-white font-semibold shadow-lg"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Customers</span>
            </button>

            <p className="px-3 text-[11px] font-bold uppercase tracking-widest text-white/40 pt-5 mb-2">
              Sales & Operations
            </p>

            <button
              onClick={() => setActiveTab("pos")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                activeTab === "pos"
                  ? "bg-[#c45d2a] text-white font-semibold shadow-lg"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Receipt className="w-4 h-4" />
              <span>Billing / POS</span>
            </button>

            <button
              onClick={() => setActiveTab("suppliers")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                activeTab === "suppliers"
                  ? "bg-[#c45d2a] text-white font-semibold shadow-lg"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Suppliers & Purchases</span>
            </button>

            <button
              onClick={() => setActiveTab("coupons")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                activeTab === "coupons"
                  ? "bg-[#c45d2a] text-white font-semibold shadow-lg"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>Coupons & Promo</span>
            </button>

            <button
              onClick={() => setActiveTab("reports")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                activeTab === "reports"
                  ? "bg-[#c45d2a] text-white font-semibold shadow-lg"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Reports</span>
            </button>

            <p className="px-3 text-[11px] font-bold uppercase tracking-widest text-white/40 pt-5 mb-2">
              Finance
            </p>

            <button
              onClick={() => setActiveTab("accounts")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                activeTab === "accounts"
                  ? "bg-[#c45d2a] text-white font-semibold shadow-lg"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span>Accounts</span>
            </button>

            <p className="px-3 text-[11px] font-bold uppercase tracking-widest text-white/40 pt-5 mb-2">
              System
            </p>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                activeTab === "settings"
                  ? "bg-[#c45d2a] text-white font-semibold shadow-lg"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
        </aside>

        {/* MAIN CONTENT PANELS (SCROLLABLE INDEPENDENTLY) */}
        <main className="flex-1 h-full overflow-y-auto p-4 sm:p-6 lg:p-8 min-w-0 bg-[#f7f3ec]">
          {/* 1. DASHBOARD TAB */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#18382a]">
                    Executive Overview
                  </h1>
                  <p className="text-sm text-gray-600 mt-1 flex items-center gap-2 flex-wrap">
                    <span>Live store performance from Mototrek's connected backend</span>
                    {demoMode && (
                      <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700">
                        Demo Data
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href="/admin/products/new"
                    className="inline-flex items-center gap-2 bg-[#18382a] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#c45d2a] transition shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Product</span>
                  </Link>
                </div>
              </div>

              {/* DATE FILTER BAR */}
              <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm w-fit text-xs font-bold">
                {[
                  { label: "Lifetime", value: "lifetime" },
                  { label: "This Month", value: "month" },
                  { label: "This Week", value: "week" },
                  { label: "Yesterday", value: "yesterday" },
                  { label: "Today", value: "today" },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => handleDateRangeChange(item.value)}
                    className={`px-3 py-1.5 rounded-xl transition ${
                      dateRange === item.value
                        ? "bg-[#18382a] text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
                    <p className="text-[10px] uppercase font-bold tracking-[0.18em] text-gray-500">Today sales</p>
                    <h3 className="mt-3 text-2xl font-bold text-[#18382a]">₹{totalSalesToday.toLocaleString()}</h3>
                    <p className="mt-1 text-xs text-gray-500">Online {formatCurrency(onlineSalesToday)} • Store {formatCurrency(storeSalesToday)}</p>
                  </div>
                  <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
                    <p className="text-[10px] uppercase font-bold tracking-[0.18em] text-gray-500">Orders</p>
                    <h3 className="mt-3 text-2xl font-bold text-[#18382a]">{newOrdersToday}</h3>
                    <p className="mt-1 text-xs text-gray-500">{ordersToPack} waiting to pack</p>
                  </div>
                  <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
                    <p className="text-[10px] uppercase font-bold tracking-[0.18em] text-gray-500">Store bills</p>
                    <h3 className="mt-3 text-2xl font-bold text-[#18382a]">{todayBillsCount}</h3>
                    <p className="mt-1 text-xs text-gray-500">Avg bill ₹{avgBillValue.toLocaleString()}</p>
                  </div>
                  <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
                    <p className="text-[10px] uppercase font-bold tracking-[0.18em] text-gray-500">Gross margin</p>
                    <h3 className="mt-3 text-2xl font-bold text-green-700">41%</h3>
                    <p className="mt-1 text-xs text-gray-500">Stock value ₹{stockValue.toLocaleString()}</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-[#18382a]">Needs attention</h3>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Operational</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    {needsAttention.map((item, index) => (
                      <div key={index} className={`flex items-start gap-2 rounded-xl px-3 py-2 ${item.type === "danger" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}>
                        <span className={`mt-1 h-2 w-2 rounded-full ${item.type === "danger" ? "bg-red-500" : "bg-amber-500"}`}></span>
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 6 EXECUTIVE METRIC CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="text-xs uppercase font-bold tracking-wider">Total Sales</span>
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-3xl font-bold text-green-700">
                      ₹{metrics.amountMade.toLocaleString()}
                    </h3>
                    <p className="text-xs text-green-600 font-semibold mt-1">
                      Lifetime revenue from online + store sales
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="text-xs uppercase font-bold tracking-wider">Orders</span>
                    <ShoppingBag className="w-5 h-5 text-[#c45d2a]" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-3xl font-bold text-[#18382a]">
                      {metrics.ordersPlaced.toLocaleString()}
                    </h3>
                    <p className="text-xs text-gray-500 font-semibold mt-1">
                      {pendingPaymentVerification} awaiting payment verification
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="text-xs uppercase font-bold tracking-wider">Store Bills</span>
                    <Receipt className="w-5 h-5 text-[#18382a]" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-3xl font-bold text-[#18382a]">
                      {posBillsList.length.toLocaleString()}
                    </h3>
                    <p className="text-xs text-gray-500 font-semibold mt-1">
                      {todayBillsCount} bills today • Avg ₹{avgBillValue.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="text-xs uppercase font-bold tracking-wider">Customers</span>
                    <UserCheck className="w-5 h-5 text-[#18382a]" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-3xl font-bold text-[#18382a]">
                      {metrics.customersWithOrders.toLocaleString()}
                    </h3>
                    <p className="text-xs text-gray-500 font-semibold mt-1">
                      {newCustomersThisWeek} new this week
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="text-xs uppercase font-bold tracking-wider">Stock Value</span>
                    <Boxes className="w-5 h-5 text-[#18382a]" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-3xl font-bold text-[#18382a]">
                      ₹{stockValue.toLocaleString()}
                    </h3>
                    <p className="text-xs text-red-500 font-semibold mt-1">
                      {outOfStockProducts} out of stock • {lowStockProducts} low stock
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="text-xs uppercase font-bold tracking-wider">Cash Summary</span>
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-3xl font-bold text-green-700">
                      ₹{(cashCollectedToday + upiCollectedToday + cardCollectedToday).toLocaleString()}
                    </h3>
                    <p className="text-xs text-gray-500 font-semibold mt-1">
                      Cash ₹{cashCollectedToday.toLocaleString()} • UPI ₹{upiCollectedToday.toLocaleString()} • Card ₹{cardCollectedToday.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-[#18382a] mb-3">Sales funnel</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span>New online orders</span><strong>{newOrdersToday}</strong></div>
                    <div className="flex justify-between"><span>Awaiting payment</span><strong>{pendingPaymentVerification}</strong></div>
                    <div className="flex justify-between"><span>Ready to ship</span><strong>{ordersReadyToShip}</strong></div>
                    <div className="flex justify-between"><span>Delayed</span><strong>{delayedOrders}</strong></div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-[#18382a] mb-3">Inventory focus</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span>Out of stock</span><strong className="text-red-600">{outOfStockProducts}</strong></div>
                    <div className="flex justify-between"><span>Low stock</span><strong className="text-amber-600">{lowStockProducts}</strong></div>
                    <div className="flex justify-between"><span>Fast-moving</span><strong>{fastMovingProducts}</strong></div>
                    <div className="flex justify-between"><span>Follow-ups due</span><strong>{followUpsDueToday}</strong></div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-[#18382a] mb-3">Today’s enquiries</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span>New</span><strong>{demoAdminData.enquiries.filter((e) => e.status === 'New').length}</strong></div>
                    <div className="flex justify-between"><span>Contacted</span><strong>{demoAdminData.enquiries.filter((e) => e.status === 'Contacted').length}</strong></div>
                    <div className="flex justify-between"><span>Follow-up</span><strong>{demoAdminData.enquiries.filter((e) => e.status === 'Follow-up').length}</strong></div>
                    <div className="flex justify-between"><span>Converted</span><strong>{demoAdminData.enquiries.filter((e) => e.status === 'Converted').length}</strong></div>
                  </div>
                </div>
              </div>

              {/* RECENT ORDERS TABLE */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center justify-between pb-4 mb-4 border-b">
                  <h2 className="font-bold text-lg text-[#18382a]">Recent Orders</h2>
                  <button onClick={() => setActiveTab("orders")} className="text-xs font-semibold text-[#c45d2a] hover:underline flex items-center gap-1">
                    <span>View All Orders</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="text-xs uppercase text-gray-400 border-b">
                        <th className="pb-3 font-semibold">Order ID</th>
                        <th className="pb-3 font-semibold">Customer</th>
                        <th className="pb-3 font-semibold">Total</th>
                        <th className="pb-3 font-semibold">Status</th>
                        <th className="pb-3 font-semibold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {ordersList.slice(0, 6).map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition">
                          <td className="py-3 font-mono font-bold text-[#18382a]">{order.id}</td>
                          <td className="py-3 font-semibold text-gray-900">{order.customerName || order.customer}</td>
                          <td className="py-3 font-bold text-[#18382a]">₹{(order.grandTotal || 0).toLocaleString()}</td>
                          <td className="py-3">
                            <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700">
                              {order.orderStatus || order.status}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <Link href={`/admin/orders/${encodeURIComponent(order.id)}`} className="text-xs font-bold text-[#18382a] hover:text-[#c45d2a] underline">
                              View Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 2. ORDERS TAB */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#18382a]">
                    Customer Online Orders
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    Manage online website orders, payment verifications & courier fulfillments
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm text-xs font-bold">
                  {["All", "Processing", "Shipped", "Delivered", "Cancelled"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setOrderFilter(st)}
                      className={`px-3 py-1.5 rounded-xl transition ${
                        orderFilter === st ? "bg-[#18382a] text-white" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="text-xs uppercase text-gray-400 border-b bg-gray-50/50">
                        <th className="p-4 font-semibold">Order ID & Date</th>
                        <th className="p-4 font-semibold">Customer</th>
                        <th className="p-4 font-semibold">Payment</th>
                        <th className="p-4 font-semibold">Total</th>
                        <th className="p-4 font-semibold">Status</th>
                        <th className="p-4 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition">
                          <td className="p-4">
                            <p className="font-mono font-bold text-[#18382a]">{order.id}</p>
                            <p className="text-xs text-gray-400">{order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-IN") : "Recent"}</p>
                          </td>
                          <td className="p-4">
                            <p className="font-semibold text-gray-900">{order.customerName}</p>
                            <p className="text-xs text-gray-500">{order.email}</p>
                          </td>
                          <td className="p-4">
                            <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-lg">
                              {order.paymentMethod}
                            </span>
                          </td>
                          <td className="p-4 font-bold text-[#18382a]">
                            ₹{(order.grandTotal || 0).toLocaleString()}
                          </td>
                          <td className="p-4">
                            <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                              order.orderStatus === "Delivered" ? "bg-green-100 text-green-700" :
                              order.orderStatus === "Shipped" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
                            }`}>
                              {order.orderStatus || order.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <Link
                              href={`/admin/orders/${encodeURIComponent(order.id)}`}
                              className="px-3.5 py-1.5 rounded-xl bg-[#18382a] text-white text-xs font-semibold hover:bg-[#c45d2a] transition shadow-sm inline-block"
                            >
                              Order Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 3. PRODUCTS TAB */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#18382a]">
                    Products Catalogue
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    Manage motorcycle riding gear, pricing, specifications & visibility
                  </p>
                </div>

                <Link
                  href="/admin/products/new"
                  className="inline-flex items-center gap-2 bg-[#18382a] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#c45d2a] transition shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </Link>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="text-xs uppercase text-gray-400 border-b bg-gray-50/50">
                        <th className="p-4 font-semibold">Image & Product</th>
                        <th className="p-4 font-semibold">Brand / Category</th>
                        <th className="p-4 font-semibold">Selling Price</th>
                        <th className="p-4 font-semibold">Stock</th>
                        <th className="p-4 font-semibold">Status</th>
                        <th className="p-4 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredProducts.map((product) => {
                        const img = Array.isArray(product.images) ? product.images[0] : (product.image || "/images/helmet.webp");
                        const totalStock = product.totalStock !== undefined ? product.totalStock : (product.stock || 0);

                        return (
                          <tr key={product.id} className="hover:bg-gray-50 transition">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <img src={img} alt={product.name} className="w-12 h-12 rounded-xl object-cover border" />
                                <div>
                                  <p className="font-bold text-gray-900 leading-snug">{product.name}</p>
                                </div>
                              </div>
                            </td>

                            <td className="p-4">
                              <p className="font-semibold text-gray-800">{product.brand || "Mototrek"}</p>
                              <p className="text-xs text-gray-500">{product.category}</p>
                            </td>

                            <td className="p-4 font-bold text-[#18382a]">
                              ₹{(product.price || 0).toLocaleString()}
                            </td>

                            <td className="p-4">
                              <p className={`text-xs font-semibold ${totalStock === 0 ? "text-red-600" : "text-green-600"}`}>
                                {totalStock === 0 ? "Sold Out" : `${totalStock} units`}
                              </p>
                            </td>

                            <td className="p-4">
                              <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-700">
                                {product.status || "Active"}
                              </span>
                            </td>

                            <td className="p-4 text-right">
                              <div className="inline-flex items-center gap-2">
                                <Link
                                  href={`/admin/products/${product.id}/edit`}
                                  className="p-1.5 rounded-lg border text-gray-600 hover:text-[#18382a] hover:bg-gray-100 transition"
                                  title="Edit Product"
                                  aria-label="Edit Product"
                                >
                                  <Pencil className="w-4 h-4" />
                                </Link>

                                <a
                                  href={`/product/${product.slug}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg border text-gray-600 hover:text-[#18382a] hover:bg-gray-100 transition"
                                  title="View on Website"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>

                                <button
                                  onClick={() => handleDuplicateProduct(product.id)}
                                  className="p-1.5 rounded-lg border text-gray-600 hover:text-[#18382a] hover:bg-gray-100 transition"
                                  title="Duplicate Product"
                                >
                                  <Copy className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 4. INVENTORY TAB */}
          {activeTab === "inventory" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#18382a]">
                  Physical Inventory Stock
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Single source of physical stock truth for both online website orders and offline POS bills
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="text-xs uppercase text-gray-400 border-b bg-gray-50/50">
                        <th className="p-4 font-semibold">Product Name</th>
                        <th className="p-4 font-semibold">Variant & SKU</th>
                        <th className="p-4 font-semibold">Selling Price</th>
                        <th className="p-4 font-semibold">Available Physical Stock</th>
                        <th className="p-4 font-semibold text-right">Quick Restock</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {productsList.flatMap((prod) =>
                        (prod.variants || [{ colour: "Default", size: "Standard", sku: prod.sku || prod.internalSku || prod.id, stock: prod.stock || 10 }]).map((variant) => (
                          <tr key={`${prod.id}-${variant.sku}`} className="hover:bg-gray-50 transition">
                            <td className="p-4 font-bold text-gray-900">{prod.name}</td>
                            <td className="p-4">
                              <p className="font-semibold text-gray-800">{variant.colour} / {variant.size}</p>
                              <p className="text-xs font-mono text-gray-500">{variant.sku}</p>
                            </td>
                            <td className="p-4 font-bold text-[#18382a]">₹{(prod.price || 0).toLocaleString()}</td>
                            <td className="p-4">
                              <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                                (variant.stock || 0) === 0 ? "bg-red-100 text-red-700" :
                                (variant.stock || 0) <= 3 ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
                              }`}>
                                {variant.stock || 0} units
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => {
                                  setStockModalVariant({ ...variant, productName: prod.name });
                                  setStockAdjAmount(5);
                                }}
                                className="px-3 py-1.5 rounded-xl border border-gray-300 text-xs font-bold text-[#18382a] hover:bg-gray-100 transition"
                              >
                                Adjust Stock
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 5. CUSTOMERS TAB */}
          {activeTab === "customers" && (
            <CustomerDirectoryComponent
              customersList={customersList}
              ordersList={ordersList}
              posBillsList={posBillsList}
              fetchAllAdminData={fetchAllAdminData}
              onOpenPosWithCustomer={(cust) => {
                setActiveTab("pos");
              }}
              onOpenOrderDetail={(order) => {
                setSelectedOrder(order);
              }}
            />
          )}

          {/* 6. BILLING / POS TAB */}
          {activeTab === "pos" && (
            <PosBillingComponent
              productsList={productsList}
              customersList={customersList}
              posBillsList={posBillsList}
              fetchAllAdminData={fetchAllAdminData}
              fetchDashboardMetrics={fetchDashboardMetrics}
              dateRange={dateRange}
            />
          )}

          {/* 7. SUPPLIERS & PURCHASES TAB */}
          {activeTab === "suppliers" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#18382a]">
                    Suppliers & Stock Purchases
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    Manage Riding Gear distributors, Purchase Orders and receive physical stock
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowAddSupplierModal(true)}
                    className="px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 transition"
                  >
                    + Add Supplier
                  </button>

                  <button
                    onClick={() => setShowCreatePoModal(true)}
                    className="inline-flex items-center gap-2 bg-[#18382a] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#c45d2a] transition shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Purchase Order</span>
                  </button>
                </div>
              </div>

              {/* TABS SWITCHER */}
              <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm w-fit text-xs font-bold">
                <button
                  onClick={() => setSuppliersSubTab("orders")}
                  className={`px-4 py-2 rounded-xl transition ${
                    suppliersSubTab === "orders" ? "bg-[#18382a] text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Purchase Orders ({purchaseOrdersList.length})
                </button>

                <button
                  onClick={() => setSuppliersSubTab("suppliers")}
                  className={`px-4 py-2 rounded-xl transition ${
                    suppliersSubTab === "suppliers" ? "bg-[#18382a] text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Suppliers Directory ({suppliersList.length})
                </button>
              </div>

              {/* SUBTAB 1: PURCHASE ORDERS */}
              {suppliersSubTab === "orders" && (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="text-xs uppercase text-gray-400 border-b bg-gray-50/50">
                          <th className="p-4 font-semibold">PO Reference</th>
                          <th className="p-4 font-semibold">Supplier</th>
                          <th className="p-4 font-semibold">Purchase Cost</th>
                          <th className="p-4 font-semibold">Payment Status</th>
                          <th className="p-4 font-semibold">PO Status</th>
                          <th className="p-4 font-semibold text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {purchaseOrdersList.map((po) => (
                          <tr key={po.id} className="hover:bg-gray-50 transition">
                            <td className="p-4">
                              <p className="font-mono font-bold text-[#18382a]">{po.id}</p>
                              <p className="text-xs text-gray-400">{po.purchaseDate}</p>
                            </td>
                            <td className="p-4 font-semibold text-gray-900">{po.supplierName}</td>
                            <td className="p-4 font-bold text-gray-900">₹{(po.totalPurchaseCost || 0).toLocaleString()}</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                                po.paymentStatus === "Paid" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                              }`}>
                                {po.paymentStatus}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                                po.status === "Received" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                              }`}>
                                {po.status}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              {po.status !== "Received" ? (
                                <button
                                  onClick={() => handleReceivePo(po.id)}
                                  className="px-3.5 py-1.5 rounded-xl bg-[#18382a] text-white text-xs font-bold hover:bg-green-700 transition shadow-sm"
                                >
                                  Mark Stock Received
                                </button>
                              ) : (
                                <span className="text-xs font-bold text-green-600 flex items-center justify-end gap-1">
                                  <Check className="w-4 h-4" />
                                  <span>Stock Received</span>
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SUBTAB 2: SUPPLIERS DIRECTORY */}
              {suppliersSubTab === "suppliers" && (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="text-xs uppercase text-gray-400 border-b bg-gray-50/50">
                          <th className="p-4 font-semibold">Supplier Name</th>
                          <th className="p-4 font-semibold">Contact Person</th>
                          <th className="p-4 font-semibold">Phone & Email</th>
                          <th className="p-4 font-semibold">GSTIN</th>
                          <th className="p-4 font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {suppliersList.map((sup) => (
                          <tr key={sup.id} className="hover:bg-gray-50 transition">
                            <td className="p-4 font-bold text-gray-900">{sup.name}</td>
                            <td className="p-4 font-semibold text-gray-800">{sup.contactPerson}</td>
                            <td className="p-4 text-xs text-gray-600">
                              <p>{sup.phone}</p>
                              <p>{sup.email}</p>
                            </td>
                            <td className="p-4 font-mono text-xs text-gray-500">{sup.gstin}</td>
                            <td className="p-4">
                              <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-green-100 text-green-700">
                                {sup.status || "Active"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 8. ACCOUNTS TAB */}
          {activeTab === "accounts" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#18382a]">
                    Business Accounts & Finance
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    Financial overview aggregating Online Sales, Offline POS Bills, Supplier Purchase Costs & Expenses
                  </p>
                </div>

                <button
                  onClick={() => setShowExpenseModal(true)}
                  className="inline-flex items-center gap-2 bg-[#18382a] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#c45d2a] transition shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Record Business Expense</span>
                </button>
              </div>

              {/* FINANCIAL CARDS SUMMARY */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-2">
                  <p className="text-xs uppercase font-bold text-gray-400">Total Business Revenue</p>
                  <h3 className="text-2xl font-bold text-green-700">₹{(accountsSummary.totalSalesRevenue || 0).toLocaleString()}</h3>
                  <div className="text-[11px] text-gray-500 pt-1 border-t space-y-0.5">
                    <p className="flex justify-between"><span>Online Website:</span> <strong>₹{(accountsSummary.onlineSalesRevenue || 0).toLocaleString()}</strong></p>
                    <p className="flex justify-between"><span>Offline POS Store:</span> <strong>₹{(accountsSummary.offlineSalesRevenue || 0).toLocaleString()}</strong></p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-2">
                  <p className="text-xs uppercase font-bold text-gray-400">Stock Purchases Cost</p>
                  <h3 className="text-2xl font-bold text-amber-700">₹{(accountsSummary.totalStockPurchases || 0).toLocaleString()}</h3>
                  <p className="text-xs text-gray-500">Supplier inventory purchases</p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-2">
                  <p className="text-xs uppercase font-bold text-gray-400">Operating Expenses</p>
                  <h3 className="text-2xl font-bold text-red-600">₹{(accountsSummary.totalOperatingExpenses || 0).toLocaleString()}</h3>
                  <p className="text-xs text-gray-500">Rent, Utilities, Salaries & Marketing</p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-2">
                  <p className="text-xs uppercase font-bold text-gray-400">Net Cash Movement</p>
                  <h3 className={`text-2xl font-bold ${accountsSummary.netCash >= 0 ? "text-green-700" : "text-red-600"}`}>
                    ₹{(accountsSummary.netCash || 0).toLocaleString()}
                  </h3>
                  <p className="text-xs text-gray-500">Net business cash position</p>
                </div>
              </div>

              {/* FINANCIAL TRANSACTION LEDGER TABLE */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-4">
                <h3 className="font-bold text-lg text-[#18382a]">Complete Transaction Ledger</h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="text-xs uppercase text-gray-400 border-b bg-gray-50/50">
                        <th className="p-3.5 font-semibold">Date</th>
                        <th className="p-3.5 font-semibold">Reference</th>
                        <th className="p-3.5 font-semibold">Type</th>
                        <th className="p-3.5 font-semibold">Description</th>
                        <th className="p-3.5 font-semibold">Income (+)</th>
                        <th className="p-3.5 font-semibold">Expense (-)</th>
                        <th className="p-3.5 font-semibold">Source</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {transactionsList.map((t) => (
                        <tr key={t.id} className="hover:bg-gray-50 transition">
                          <td className="p-3.5 text-xs text-gray-500">{t.date ? new Date(t.date).toLocaleDateString("en-IN") : "Recent"}</td>
                          <td className="p-3.5 font-mono font-bold text-gray-900">{t.reference}</td>
                          <td className="p-3.5">
                            <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                              t.type === "Online Sale" ? "bg-green-100 text-green-700" :
                              t.type === "Offline Sale" ? "bg-blue-100 text-blue-700" :
                              t.type === "Stock Purchase" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-700"
                            }`}>
                              {t.type}
                            </span>
                          </td>
                          <td className="p-3.5 text-xs font-medium text-gray-800">{t.description}</td>
                          <td className="p-3.5 font-bold text-green-700">
                            {t.income ? `+₹${t.income.toLocaleString()}` : "-"}
                          </td>
                          <td className="p-3.5 font-bold text-red-600">
                            {t.expense ? `-₹${t.expense.toLocaleString()}` : "-"}
                          </td>
                          <td className="p-3.5 text-xs text-gray-500">{t.source}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 9. REPORTS TAB */}
          {activeTab === "reports" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#18382a]">
                  Reports & Business Analytics
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Sales breakdown by Online vs Offline POS channels, product sales & revenue performance
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
                  <h3 className="font-bold text-lg text-[#18382a] border-b pb-3">Sales Channel Revenue Split</h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
                      <div>
                        <p className="font-bold text-green-900">Online Website Sales</p>
                        <p className="text-xs text-green-700">{ordersList.length} Customer Orders</p>
                      </div>
                      <span className="text-xl font-bold text-green-800">
                        ₹{(accountsSummary.onlineSalesRevenue || metrics.amountMade || 0).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-200">
                      <div>
                        <p className="font-bold text-blue-900">Offline Physical Store POS</p>
                        <p className="text-xs text-blue-700">{posBillsList.length} Store Bills</p>
                      </div>
                      <span className="text-xl font-bold text-blue-800">
                        ₹{(accountsSummary.offlineSalesRevenue || 0).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#18382a] text-white rounded-xl shadow">
                      <div>
                        <p className="font-bold text-base">Total Recognized Sales</p>
                        <p className="text-xs text-white/70">Online + Offline POS Channels</p>
                      </div>
                      <span className="text-2xl font-bold text-[#f0b04d]">
                        ₹{((accountsSummary.onlineSalesRevenue || metrics.amountMade || 0) + (accountsSummary.offlineSalesRevenue || 0)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
                  <h3 className="font-bold text-lg text-[#18382a] border-b pb-3">Top Product Categories</h3>

                  <div className="space-y-3 text-xs font-semibold text-gray-700">
                    <div className="flex items-center justify-between p-2.5 border-b">
                      <span>Jackets & Apparel</span>
                      <span className="font-bold text-[#18382a]">₹48,200 (42%)</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 border-b">
                      <span>Helmets & Visors</span>
                      <span className="font-bold text-[#18382a]">₹28,500 (25%)</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 border-b">
                      <span>Luggage & Top Cases</span>
                      <span className="font-bold text-[#18382a]">₹24,999 (22%)</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5">
                      <span>Boots & Accessories</span>
                      <span className="font-bold text-[#18382a]">₹12,899 (11%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 10. COUPONS TAB */}
          {activeTab === "coupons" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#18382a]">
                  Coupons & Promotional Discounts
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Active promo codes usable across online checkout and physical store POS
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="text-xs uppercase text-gray-400 border-b bg-gray-50/50">
                        <th className="p-4 font-semibold">Coupon Code</th>
                        <th className="p-4 font-semibold">Discount Type</th>
                        <th className="p-4 font-semibold">Value</th>
                        <th className="p-4 font-semibold">Min Spend</th>
                        <th className="p-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {couponsList.map((c) => (
                        <tr key={c.id} className="hover:bg-gray-50 transition">
                          <td className="p-4 font-mono font-bold text-[#18382a]">{c.code}</td>
                          <td className="p-4 font-semibold text-gray-800">{c.type}</td>
                          <td className="p-4 font-bold text-green-700">{c.type === "percentage" ? `${c.value}% OFF` : `₹${c.value} OFF`}</td>
                          <td className="p-4 text-xs font-semibold text-gray-600">₹{(c.minSpend || 0).toLocaleString()}</td>
                          <td className="p-4">
                            <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-green-100 text-green-700">
                              Active
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 11. SETTINGS TAB */}
          {activeTab === "settings" && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#18382a]">
                  Store & POS Settings
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Configure Mototrek store details, GST invoicing & POS terminal preferences
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-[#18382a] border-b pb-2">Physical Store Information</h3>
                  <div className="grid sm:grid-cols-2 gap-4 text-xs font-semibold">
                    <div>
                      <label className="block uppercase text-gray-500 mb-1">Store Name</label>
                      <input type="text" defaultValue="Mototrek Riding Gear & Accessories" className="w-full border rounded-xl px-3 py-2" />
                    </div>
                    <div>
                      <label className="block uppercase text-gray-500 mb-1">Store GSTIN</label>
                      <input type="text" defaultValue="27AABCM9910E1Z4" className="w-full border rounded-xl px-3 py-2 font-mono" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block uppercase text-gray-500 mb-1">Address</label>
                      <input type="text" defaultValue="Showroom No. 4, Baner Main Road, Pune, MH - 411045" className="w-full border rounded-xl px-3 py-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ORDER WORKSPACE MODAL */}
      {selectedOrder && (
        <OrderWorkspaceModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={handleOrderStatusChange}
        />
      )}

      {/* MODAL 2: POS BILL PRINT RECEIPT MODAL */}
      {selectedPosBill && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-hidden">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl border">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-extrabold text-lg text-[#18382a]">MOTOTREK RECEIPT</h3>
                <p className="text-xs font-mono text-gray-500">{selectedPosBill.id}</p>
              </div>
              <button onClick={() => setSelectedPosBill(null)} className="p-1 rounded-full hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="text-xs space-y-3 font-mono">
              <p><strong>Customer:</strong> {selectedPosBill.customerName}</p>
              <p><strong>Date:</strong> {selectedPosBill.createdAt}</p>
              <p><strong>Staff:</strong> {selectedPosBill.staffName}</p>

              <div className="border-t border-b py-2 space-y-1.5">
                {(selectedPosBill.items || []).map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{item.quantity} × {item.name}</span>
                    <span>₹{item.total.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1 text-right">
                <p>Subtotal: ₹{(selectedPosBill.subtotal || 0).toLocaleString()}</p>
                {selectedPosBill.discount > 0 && <p className="text-red-600">Discount: -₹{selectedPosBill.discount}</p>}
                <p>Tax (GST): ₹{(selectedPosBill.tax || 0).toLocaleString()}</p>
                <p className="text-base font-bold text-[#18382a]">Total Paid: ₹{(selectedPosBill.grandTotal || 0).toLocaleString()}</p>
                <p className="text-[10px] text-gray-500 uppercase">Paid via {selectedPosBill.paymentMethod}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 bg-[#18382a] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#c45d2a] transition flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Bill</span>
              </button>
              <button
                onClick={() => setSelectedPosBill(null)}
                className="px-4 py-2.5 border rounded-xl text-xs font-bold hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: INVENTORY STOCK ADJUSTMENT MODAL */}
      {stockModalVariant && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border">
            <h3 className="font-bold text-base text-[#18382a]">Adjust Physical Stock</h3>
            <p className="text-xs text-gray-600">
              Product: <strong>{stockModalVariant.productName}</strong> ({stockModalVariant.colour} / {stockModalVariant.size})
            </p>

            <div className="space-y-3 text-xs font-semibold">
              <div>
                <label className="block text-gray-500 uppercase mb-1">Stock Adjustment Quantity (+/-)</label>
                <input
                  type="number"
                  value={stockAdjAmount}
                  onChange={(e) => setStockAdjAmount(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 font-bold text-[#18382a]"
                />
              </div>

              <div>
                <label className="block text-gray-500 uppercase mb-1">Reason</label>
                <select
                  value={stockAdjReason}
                  onChange={(e) => setStockAdjReason(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 font-semibold"
                >
                  <option value="Restock">Restock</option>
                  <option value="Audit Adjustment">Audit Adjustment</option>
                  <option value="Damaged Stock">Damaged Stock</option>
                  <option value="Store Display">Store Display</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button onClick={() => setStockModalVariant(null)} className="px-4 py-2 border rounded-xl text-xs font-bold">
                Cancel
              </button>
              <button onClick={handleAdjustStockSubmit} className="px-4 py-2 bg-[#18382a] text-white rounded-xl text-xs font-bold hover:bg-[#c45d2a]">
                Save Adjustment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: CREATE PURCHASE ORDER MODAL */}
      {showCreatePoModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border">
            <h3 className="font-bold text-base text-[#18382a]">Create Supplier Purchase Order</h3>

            <div className="space-y-3 text-xs font-semibold">
              <div>
                <label className="block text-gray-500 uppercase mb-1">Select Supplier</label>
                <select
                  value={poSupplierId}
                  onChange={(e) => setPoSupplierId(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2"
                >
                  {suppliersList.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-500 uppercase mb-1">Target Product SKU</label>
                <input
                  type="text"
                  value={poItemSku}
                  onChange={(e) => setPoItemSku(e.target.value)}
                  placeholder="e.g. RYN-BLK-L"
                  className="w-full border rounded-xl px-3 py-2 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-500 uppercase mb-1">Quantity</label>
                  <input
                    type="number"
                    value={poItemQty}
                    onChange={(e) => setPoItemQty(e.target.value)}
                    className="w-full border rounded-xl px-3 py-2 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 uppercase mb-1">Unit Cost (₹)</label>
                  <input
                    type="number"
                    value={poItemCost}
                    onChange={(e) => setPoItemCost(e.target.value)}
                    className="w-full border rounded-xl px-3 py-2 font-bold text-[#18382a]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-500 uppercase mb-1">Notes / Instructions</label>
                <input
                  type="text"
                  value={poNotes}
                  onChange={(e) => setPoNotes(e.target.value)}
                  placeholder="Batch shipment notes..."
                  className="w-full border rounded-xl px-3 py-2"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button onClick={() => setShowCreatePoModal(false)} className="px-4 py-2 border rounded-xl text-xs font-bold">
                Cancel
              </button>
              <button onClick={handleCreatePoSubmit} className="px-4 py-2 bg-[#18382a] text-white rounded-xl text-xs font-bold hover:bg-[#c45d2a]">
                Submit Purchase Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: ADD SUPPLIER MODAL */}
      {showAddSupplierModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border">
            <h3 className="font-bold text-base text-[#18382a]">Add Supplier</h3>

            <div className="space-y-3 text-xs font-semibold">
              <div>
                <label className="block text-gray-500 uppercase mb-1">Supplier / Brand Name *</label>
                <input
                  type="text"
                  value={newSupName}
                  onChange={(e) => setNewSupName(e.target.value)}
                  placeholder="e.g. Rynox Gears India Ltd"
                  className="w-full border rounded-xl px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-500 uppercase mb-1">Contact Person</label>
                  <input
                    type="text"
                    value={newSupContact}
                    onChange={(e) => setNewSupContact(e.target.value)}
                    placeholder="Account Manager"
                    className="w-full border rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 uppercase mb-1">Phone</label>
                  <input
                    type="text"
                    value={newSupPhone}
                    onChange={(e) => setNewSupPhone(e.target.value)}
                    placeholder="+91 98000 00000"
                    className="w-full border rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-500 uppercase mb-1">GSTIN</label>
                <input
                  type="text"
                  value={newSupGstin}
                  onChange={(e) => setNewSupGstin(e.target.value)}
                  placeholder="27AAAAA0000A1Z5"
                  className="w-full border rounded-xl px-3 py-2 font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button onClick={() => setShowAddSupplierModal(false)} className="px-4 py-2 border rounded-xl text-xs font-bold">
                Cancel
              </button>
              <button onClick={handleAddSupplierSubmit} className="px-4 py-2 bg-[#18382a] text-white rounded-xl text-xs font-bold hover:bg-[#c45d2a]">
                Save Supplier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 6: ADD EXPENSE MODAL */}
      {showExpenseModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border">
            <h3 className="font-bold text-base text-[#18382a]">Record Business Expense</h3>

            <div className="space-y-3 text-xs font-semibold">
              <div>
                <label className="block text-gray-500 uppercase mb-1">Expense Category</label>
                <select
                  value={expCategory}
                  onChange={(e) => setExpCategory(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 font-semibold"
                >
                  <option value="Rent">Store Rent</option>
                  <option value="Electricity">Electricity & Utilities</option>
                  <option value="Salary">Staff Salary</option>
                  <option value="Marketing">Marketing & Ads</option>
                  <option value="Packaging">Packaging & Courier</option>
                  <option value="Repairs">Repairs & Maintenance</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-500 uppercase mb-1">Description *</label>
                <input
                  type="text"
                  value={expDescription}
                  onChange={(e) => setExpDescription(e.target.value)}
                  placeholder="e.g. Monthly Showroom Rent"
                  className="w-full border rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-gray-500 uppercase mb-1">Amount (₹) *</label>
                <input
                  type="number"
                  value={expAmount}
                  onChange={(e) => setExpAmount(e.target.value)}
                  placeholder="45000"
                  className="w-full border rounded-xl px-3 py-2 font-bold text-red-600"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button onClick={() => setShowExpenseModal(false)} className="px-4 py-2 border rounded-xl text-xs font-bold">
                Cancel
              </button>
              <button onClick={handleAddExpenseSubmit} className="px-4 py-2 bg-[#18382a] text-white rounded-xl text-xs font-bold hover:bg-[#c45d2a]">
                Record Expense
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
