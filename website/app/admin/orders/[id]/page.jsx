"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Printer,
  MoreVertical,
  CheckCircle2,
  Package,
  Truck,
  RotateCcw,
  Ban,
  Phone,
  Mail,
  Send,
  ExternalLink,
  Edit,
  RefreshCw,
  Plus,
  DollarSign,
  User,
  CreditCard,
  MapPin,
  Clock,
  Check,
  ChevronDown,
} from "lucide-react";

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id ? decodeURIComponent(params.id) : "";

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // MODALS & DROPDOWNS
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [showStatusOverridePopover, setShowStatusOverridePopover] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingStatusUpdate, setPendingStatusUpdate] = useState(null);

  // MANUAL STATUS SELECTOR STATE
  const [selectedOverrideStatus, setSelectedOverrideStatus] = useState("");

  // INLINE DELIVERY & NOTE PANELS
  const [showDeliveryStatusPicker, setShowDeliveryStatusPicker] = useState(false);
  const [showDeliveryEditForm, setShowDeliveryEditForm] = useState(false);
  const [showAddNoteForm, setShowAddNoteForm] = useState(false);

  // DELIVERY FORM FIELDS
  const [deliveryStatusChoice, setDeliveryStatusChoice] = useState("Shipped");
  const [deliveryFailureReason, setDeliveryFailureReason] = useState("Customer unavailable");
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [courierInput, setCourierInput] = useState("BlueDart Express");
  const [awbInput, setAwbInput] = useState("BD94810234IN");
  const [shippingDateInput, setShippingDateInput] = useState("");
  const [expectedDeliveryInput, setExpectedDeliveryInput] = useState("");
  const [deliveryNoteInput, setDeliveryNoteInput] = useState("");

  // RETURN MODAL FORM STATE
  const [returnProductId, setReturnProductId] = useState("");
  const [returnQty, setReturnQty] = useState(1);
  const [returnReason, setReturnReason] = useState("Size / Fit Exchange");
  const [returnCondition, setReturnCondition] = useState("Unused with Tags");
  const [returnRefundMethod, setReturnRefundMethod] = useState("Store Credit");
  const [returnSuccessMessage, setReturnSuccessMessage] = useState("");

  // CANCELLATION STATE
  const [cancellationReason, setCancellationReason] = useState("Customer Request");
  const [internalNoteText, setInternalNoteText] = useState("");
  const [actionSuccessMessage, setActionSuccessMessage] = useState("");
  const [actionErrorMessage, setActionErrorMessage] = useState("");

  const moreMenuRef = useRef(null);
  const statusPopoverRef = useRef(null);

  // ALL VALID STATUS OPTIONS FOR MANUAL OVERRIDE
  const allOrderStatuses = [
    "Order Placed",
    "Confirmed",
    "Processing",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
    "Return Requested",
    "Returned",
    "Refunded",
  ];

  // CLOSE DROPDOWNS ON CLICK OUTSIDE
  useEffect(() => {
    function handleClickOutside(event) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setShowMoreActions(false);
      }
      if (statusPopoverRef.current && !statusPopoverRef.current.contains(event.target)) {
        setShowStatusOverridePopover(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // FETCH ORDER DATA
  useEffect(() => {
    if (!orderId) return;

    async function fetchOrder() {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/v1/orders/${encodeURIComponent(orderId)}`);
        const json = await res.json();

        if (json.success && json.data) {
          setOrder(json.data);
          setSelectedOverrideStatus(json.data.orderStatus || "Order Placed");
          setDeliveryStatusChoice(json.data.orderStatus || "Shipped");
          setCourierInput(json.data.courier || "BlueDart Express");
          setAwbInput(json.data.awb || json.data.tracking || "BD94810234IN");
          setShippingDateInput(json.data.shippingDate || "");
          setExpectedDeliveryInput(json.data.expectedDelivery || "");
        } else {
          setError("Order not found");
        }
      } catch (err) {
        console.error("Failed to fetch order:", err);
        setError("Unable to connect to server");
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f3ec] p-8 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-[#18382a] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-bold text-xs text-[#18382a]">Loading Order #{orderId}...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#f7f3ec] p-8 flex items-center justify-center">
        <div className="bg-white p-6 rounded-2xl border max-w-md w-full text-center space-y-4 shadow-sm">
          <p className="font-bold text-base text-red-700">{error || "Order Not Found"}</p>
          <Link
            href="/admin"
            className="inline-block px-4 py-2 bg-[#18382a] text-white rounded-xl text-xs font-bold hover:bg-[#234e3b] transition"
          >
            ← Back to Admin Orders
          </Link>
        </div>
      </div>
    );
  }

  // FORMATTERS
  const formatCurrency = (val = 0) => `₹${Number(val || 0).toLocaleString("en-IN")}`;

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "—";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  const formatDateShort = (dateStr) => {
    if (!dateStr) return "—";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  // STATUS BADGE COLOR HELPER
  const getStatusBadge = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "delivered" || s === "completed") {
      return "bg-emerald-100 text-emerald-800 border-emerald-300";
    }
    if (s === "shipped" || s === "out for delivery") {
      return "bg-blue-100 text-blue-800 border-blue-300";
    }
    if (s === "packed" || s === "confirmed") {
      return "bg-indigo-100 text-indigo-800 border-indigo-300";
    }
    if (s === "processing" || s === "order placed" || s === "pending") {
      return "bg-amber-100 text-amber-900 border-amber-300";
    }
    if (s === "cancelled" || s === "failed" || s === "delivery failed") {
      return "bg-red-100 text-red-800 border-red-300";
    }
    if (s.includes("return") || s === "refunded") {
      return "bg-purple-100 text-purple-800 border-purple-300";
    }
    return "bg-gray-100 text-gray-800 border-gray-300";
  };

  // PERSIST ORDER UPDATES TO BACKEND API & STATE
  const persistOrderUpdate = async (updates, adminName = "Admin", userNote = "") => {
    setIsUpdatingStatus(true);
    setActionErrorMessage("");

    try {
      const previousStatus = order.orderStatus;
      const response = await fetch(`http://localhost:5000/api/v1/orders/${encodeURIComponent(order.id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updates, adminName, deliveryNote: userNote }),
      });
      const json = await response.json();

      if (json.success && json.data) {
        setOrder(json.data);
        setSelectedOverrideStatus(json.data.orderStatus || updates.orderStatus || previousStatus);
      } else {
        // Fallback local update
        const updatedLocal = { ...order, ...updates };
        if (updates.orderStatus && updates.orderStatus !== previousStatus) {
          updatedLocal.statusHistory = updatedLocal.statusHistory || [];
          updatedLocal.statusHistory.push({
            status: updates.orderStatus,
            timestamp: new Date().toISOString(),
            updatedBy: adminName,
            note: userNote || updates.cancellationReason || updates.failureReason || `${previousStatus} → ${updates.orderStatus}`,
          });
        }
        setOrder(updatedLocal);
        setSelectedOverrideStatus(updates.orderStatus || previousStatus);
      }

      setActionSuccessMessage("Order status updated successfully.");
      setTimeout(() => setActionSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Failed to update order:", err);
      setActionErrorMessage("Unable to update order status. Please try again.");
      setTimeout(() => setActionErrorMessage(""), 3500);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // TRIGGER CONFIRMATION OR DIRECT UPDATE
  const requestStatusChange = (targetStatus, extraDetails = {}) => {
    const isDestructive = ["Cancelled", "Returned", "Refunded"].includes(targetStatus);

    if (isDestructive) {
      setPendingStatusUpdate({ targetStatus, extraDetails });
      setShowConfirmModal(true);
    } else {
      persistOrderUpdate(
        { orderStatus: targetStatus, ...extraDetails },
        "Admin",
        extraDetails.note || `${order.orderStatus} → ${targetStatus}`
      );
    }
  };

  // EXECUTE CONFIRMED STATUS CHANGE
  const confirmPendingStatusUpdate = () => {
    if (!pendingStatusUpdate) return;
    const { targetStatus, extraDetails } = pendingStatusUpdate;
    persistOrderUpdate(
      { orderStatus: targetStatus, ...extraDetails },
      "Admin",
      extraDetails.note || extraDetails.failureReason || `${order.orderStatus} → ${targetStatus}`
    );
    setShowConfirmModal(false);
    setPendingStatusUpdate(null);
  };

  // WHATSAPP ACTION HANDLER
  const handleWhatsAppCustomer = () => {
    const phone = order.mobile || order.shippingAddress?.phone || order.billingAddress?.phone;
    if (!phone) {
      alert("Customer mobile number is not available.");
      return;
    }
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const itemsText = (order.items || [])
      .map((i) => `• ${i.name} (${i.variant || 'Standard'}) x${i.quantity}`)
      .join("\n");

    const message = `Hello ${order.customerName || 'Rider'},\n\nThis is Mototrek regarding your order *${order.id}*.\n\n*Order Total:* ₹${(order.grandTotal || 0).toLocaleString()}\n*Status:* ${order.orderStatus}\n\n*Items Purchased:*\n${itemsText}\n\nThank you for shopping with Mototrek Pune! Ride Safe 🏍️`;

    window.open(
      `https://api.whatsapp.com/send?phone=${cleanPhone.length === 10 ? "91" + cleanPhone : cleanPhone}&text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  // ADDRESS PARSER
  const shippingAddr = order.shippingAddress || order.billingAddress || {};
  const formattedAddress = [
    shippingAddr.house,
    shippingAddr.street,
    shippingAddr.area,
    shippingAddr.city,
    shippingAddr.state ? `${shippingAddr.state} - ${shippingAddr.pincode || ''}` : shippingAddr.pincode,
  ]
    .filter(Boolean)
    .join(", ");

  // CALCULATE FINANCIALS ACCURATELY
  const itemsSubtotal = (order.items || []).reduce(
    (sum, i) => sum + (Number(i.subtotal || i.price * i.quantity) || 0),
    0
  ) || order.subtotal || order.grandTotal || 0;
  const itemsDiscount = Number(order.itemsDiscount || order.discount || 0);
  const couponDiscount = Number(order.couponDiscount || 0);
  const totalDiscount = itemsDiscount + couponDiscount;
  const shippingFee = Number(order.shippingFee || 0);
  const grandTotal = Number(order.grandTotal || itemsSubtotal - totalDiscount + shippingFee);

  // WORKFLOW STAGES PROGRESS TRACKER
  const stages = [
    { label: "Order Placed", key: "Order Placed" },
    { label: "Confirmed", key: "Confirmed" },
    { label: "Packed", key: "Packed" },
    { label: "Shipped", key: "Shipped" },
    { label: "Out for Delivery", key: "Out for Delivery" },
    { label: "Delivered", key: "Delivered" },
  ];

  const currentStatusIndex = stages.findIndex(
    (s) => s.key.toLowerCase() === (order.orderStatus || "").toLowerCase()
  );

  // NEXT RELEVANT PRIMARY WORKFLOW BUTTON RESOLVER
  const renderPrimaryWorkflowButton = () => {
    const s = (order.orderStatus || "").toLowerCase();

    if (s === "order placed") {
      return (
        <button
          type="button"
          disabled={isUpdatingStatus}
          onClick={() => requestStatusChange("Confirmed")}
          className="px-4 py-2 bg-[#c45d2a] hover:bg-[#a64c1f] text-white rounded-xl font-bold text-xs shadow-sm transition flex items-center gap-1.5 disabled:opacity-50"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isUpdatingStatus ? "Updating..." : "Confirm Order"}</span>
        </button>
      );
    }
    if (s === "confirmed") {
      return (
        <button
          type="button"
          disabled={isUpdatingStatus}
          onClick={() => requestStatusChange("Processing")}
          className="px-4 py-2 bg-[#c45d2a] hover:bg-[#a64c1f] text-white rounded-xl font-bold text-xs shadow-sm transition flex items-center gap-1.5 disabled:opacity-50"
        >
          <RefreshCw className="w-4 h-4" />
          <span>{isUpdatingStatus ? "Updating..." : "Start Processing"}</span>
        </button>
      );
    }
    if (s === "processing") {
      return (
        <button
          type="button"
          disabled={isUpdatingStatus}
          onClick={() => requestStatusChange("Packed")}
          className="px-4 py-2 bg-[#c45d2a] hover:bg-[#a64c1f] text-white rounded-xl font-bold text-xs shadow-sm transition flex items-center gap-1.5 disabled:opacity-50"
        >
          <Package className="w-4 h-4" />
          <span>{isUpdatingStatus ? "Updating..." : "Mark as Packed"}</span>
        </button>
      );
    }
    if (s === "packed") {
      return (
        <button
          type="button"
          disabled={isUpdatingStatus}
          onClick={() => requestStatusChange("Shipped")}
          className="px-4 py-2 bg-[#c45d2a] hover:bg-[#a64c1f] text-white rounded-xl font-bold text-xs shadow-sm transition flex items-center gap-1.5 disabled:opacity-50"
        >
          <Truck className="w-4 h-4" />
          <span>{isUpdatingStatus ? "Updating..." : "Mark as Shipped"}</span>
        </button>
      );
    }
    if (s === "shipped") {
      return (
        <button
          type="button"
          disabled={isUpdatingStatus}
          onClick={() => requestStatusChange("Out for Delivery")}
          className="px-4 py-2 bg-[#c45d2a] hover:bg-[#a64c1f] text-white rounded-xl font-bold text-xs shadow-sm transition flex items-center gap-1.5 disabled:opacity-50"
        >
          <Truck className="w-4 h-4" />
          <span>{isUpdatingStatus ? "Updating..." : "Mark Out for Delivery"}</span>
        </button>
      );
    }
    if (s === "out for delivery") {
      return (
        <button
          type="button"
          disabled={isUpdatingStatus}
          onClick={() => requestStatusChange("Delivered")}
          className="px-4 py-2 bg-[#c45d2a] hover:bg-[#a64c1f] text-white rounded-xl font-bold text-xs shadow-sm transition flex items-center gap-1.5 disabled:opacity-50"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isUpdatingStatus ? "Updating..." : "Mark as Delivered"}</span>
        </button>
      );
    }
    if (s === "delivered" || s === "completed") {
      return (
        <button
          type="button"
          onClick={() => {
            setReturnProductId(order.items?.[0]?.productId || order.items?.[0]?.sku || "");
            setShowReturnModal(true);
          }}
          className="px-4 py-2 bg-amber-50 border border-amber-300 text-amber-900 font-bold text-xs rounded-xl hover:bg-amber-100 transition flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Manage Return</span>
        </button>
      );
    }
    if (s === "return requested" || s === "return processing") {
      return (
        <button
          type="button"
          disabled={isUpdatingStatus}
          onClick={() => requestStatusChange("Returned")}
          className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold text-xs shadow-sm transition flex items-center gap-1.5 disabled:opacity-50"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{isUpdatingStatus ? "Updating..." : "Mark Item Returned"}</span>
        </button>
      );
    }
    if (s === "returned") {
      return (
        <button
          type="button"
          disabled={isUpdatingStatus}
          onClick={() => requestStatusChange("Refunded")}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-sm transition flex items-center gap-1.5 disabled:opacity-50"
        >
          <DollarSign className="w-4 h-4" />
          <span>{isUpdatingStatus ? "Updating..." : "Process Refund"}</span>
        </button>
      );
    }
    return (
      <span className="px-3 py-1.5 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl border">
        Status: {order.orderStatus}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#f7f3ec] text-[#1f241f] font-sans flex flex-col">
      {/* 1. TOP HEADER BAR */}
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

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="text-xs font-semibold text-white/80 hover:text-white bg-white/10 px-3 py-1.5 rounded-lg transition"
            >
              ← Back to Admin
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT WORKSPACE */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* BACK TO ORDERS LINK */}
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#18382a] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Orders</span>
          </Link>
        </div>

        {/* TOP ORDER HEADER */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="font-mono font-bold text-2xl sm:text-3xl text-[#18382a] tracking-tight">
                ORDER #{order.id}
              </h1>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(order.orderStatus)}`}>
                {order.orderStatus}
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Placed {formatDateTime(order.createdAt || order.orderDate)} • {(order.items || []).length} items · <strong className="text-gray-900">₹{grandTotal.toLocaleString()}</strong>
            </p>
          </div>

          {/* HEADER ACTION HIERARCHY */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* 1. CONTEXTUAL PRIMARY WORKFLOW ACTION */}
            {renderPrimaryWorkflowButton()}

            {/* 2. PROMINENT EXPLICIT [ UPDATE ORDER STATUS ] MANUAL OVERRIDE BUTTON */}
            <div className="relative" ref={statusPopoverRef}>
              <button
                type="button"
                onClick={() => setShowStatusOverridePopover(!showStatusOverridePopover)}
                className="px-4 py-2 bg-[#18382a] hover:bg-[#234e3b] text-white rounded-xl font-bold text-xs shadow-sm transition flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Update Order Status</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {/* CLEAN STATUS OVERRIDE POPOVER PANEL */}
              {showStatusOverridePopover && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 p-4 space-y-3 text-xs text-gray-800">
                  <div className="border-b pb-2">
                    <p className="font-bold text-gray-900 text-xs">Update Order Status</p>
                    <p className="text-[11px] text-gray-500 font-medium">
                      Current: <strong className="text-[#18382a]">{order.orderStatus}</strong>
                    </p>
                  </div>

                  <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                    <p className="text-[10px] font-bold uppercase text-gray-400">Select Status:</p>
                    {allOrderStatuses.map((st) => (
                      <label
                        key={st}
                        className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer transition ${
                          selectedOverrideStatus === st
                            ? "bg-[#18382a]/10 border-[#18382a] font-bold text-[#18382a]"
                            : "bg-white border-gray-200 hover:bg-gray-50 font-semibold"
                        }`}
                      >
                        <input
                          type="radio"
                          name="orderStatusOverride"
                          value={st}
                          checked={selectedOverrideStatus === st}
                          onChange={() => setSelectedOverrideStatus(st)}
                          className="accent-[#18382a]"
                        />
                        <span>{st}</span>
                      </label>
                    ))}
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t font-bold">
                    <button
                      type="button"
                      onClick={() => setShowStatusOverridePopover(false)}
                      className="px-3 py-1.5 border rounded-xl text-gray-600 hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={isUpdatingStatus || selectedOverrideStatus === order.orderStatus}
                      onClick={() => {
                        setShowStatusOverridePopover(false);
                        requestStatusChange(selectedOverrideStatus);
                      }}
                      className="px-4 py-1.5 bg-[#c45d2a] text-white rounded-xl hover:bg-[#a64c1f] disabled:opacity-50"
                    >
                      {isUpdatingStatus ? "Updating..." : "Update Status"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3. SECONDARY ACTION: PRINT INVOICE */}
            <button
              type="button"
              onClick={() => setShowInvoiceModal(true)}
              className="px-3.5 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>

            {/* 4. MORE ACTIONS DROPDOWN */}
            <div className="relative" ref={moreMenuRef}>
              <button
                type="button"
                onClick={() => setShowMoreActions(!showMoreActions)}
                className="p-2 border border-gray-300 text-gray-700 bg-white rounded-xl hover:bg-gray-100 transition"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {showMoreActions && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-40 py-1 text-xs font-semibold text-gray-800">
                  <button
                    type="button"
                    onClick={() => {
                      setShowMoreActions(false);
                      handleWhatsAppCustomer();
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-emerald-800"
                  >
                    <Send className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp Customer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowMoreActions(false);
                      setShowDeliveryEditForm(true);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Edit className="w-3.5 h-3.5 text-gray-500" />
                    <span>Edit Delivery Info</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowMoreActions(false);
                      setShowAddNoteForm(true);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Plus className="w-3.5 h-3.5 text-gray-500" />
                    <span>Add Internal Note</span>
                  </button>

                  {order.orderStatus !== "Cancelled" && order.orderStatus !== "Delivered" && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowMoreActions(false);
                        setShowCancelModal(true);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-700 flex items-center gap-2 border-t"
                    >
                      <Ban className="w-3.5 h-3.5" />
                      <span>Cancel Order</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* NOTIFICATION TOASTS */}
        {actionSuccessMessage && (
          <div className="bg-emerald-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold text-center shadow-sm">
            ✓ {actionSuccessMessage}
          </div>
        )}
        {actionErrorMessage && (
          <div className="bg-red-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold text-center shadow-sm">
            ⚠ {actionErrorMessage}
          </div>
        )}

        {/* COMPACT ORDER PROGRESS TRACKER WITH STATUS CHANGE LINK */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-600">
              Current Operational Status: <strong className="text-[#18382a]">{order.orderStatus}</strong>
            </span>
            <button
              type="button"
              onClick={() => setShowStatusOverridePopover(!showStatusOverridePopover)}
              className="text-xs font-bold text-[#c45d2a] hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Change Status</span>
            </button>
          </div>

          <div className="flex items-center justify-between min-w-max overflow-x-auto pt-1">
            {stages.map((st, idx) => {
              const isCompleted = currentStatusIndex >= idx;
              const isCurrent = currentStatusIndex === idx;

              return (
                <React.Fragment key={st.key}>
                  <div className="flex flex-col items-center text-center px-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition ${
                        isCompleted
                          ? "bg-[#18382a] text-white"
                          : "bg-gray-100 text-gray-400 border border-gray-300"
                      }`}
                    >
                      {isCompleted ? "✓" : idx + 1}
                    </div>
                    <span className={`text-[11px] mt-1.5 font-bold ${isCurrent ? "text-[#c45d2a]" : isCompleted ? "text-gray-900" : "text-gray-400"}`}>
                      {st.label}
                    </span>
                  </div>
                  {idx < stages.length - 1 && (
                    <div className={`flex-1 h-0.5 min-w-[30px] mx-2 ${isCompleted ? "bg-[#18382a]" : "bg-gray-200"}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          
          {/* LEFT MAIN CONTENT (70%) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. ORDER ITEMS */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs space-y-4">
              <h2 className="font-bold text-sm text-[#18382a] border-b pb-2 uppercase tracking-wide">
                Order Items · {(order.items || []).length} Items
              </h2>

              <div className="divide-y divide-gray-100">
                {(order.items || []).map((item, idx) => {
                  const unitPrice = Number(item.price || item.unitPrice || 0);
                  const lineQty = Number(item.quantity || 1);
                  const lineDiscount = Number(item.discount || 0);
                  const lineSubtotal = Number(item.total || item.subtotal || unitPrice * lineQty - lineDiscount);

                  return (
                    <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-gray-500 text-xs shrink-0">
                          {item.name?.slice(0, 2).toUpperCase() || "MT"}
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold text-sm text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-500 font-medium">
                            Variant: <strong className="text-gray-700">{item.variant || [item.colour, item.size].filter(Boolean).join(" / ") || "Standard"}</strong>
                          </p>
                          <p className="text-xs text-gray-400 font-mono">SKU: {item.sku || order.id}</p>
                        </div>
                      </div>

                      <div className="text-right space-y-1">
                        <p className="font-bold text-sm text-[#18382a]">₹{lineSubtotal.toLocaleString()}</p>
                        <p className="text-xs text-gray-500 font-medium">
                          Qty: {lineQty} × ₹{unitPrice.toLocaleString()}
                        </p>
                        {lineDiscount > 0 && (
                          <p className="text-[11px] font-semibold text-red-600">Discount: -₹{lineDiscount.toLocaleString()}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. PRICE SUMMARY */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs space-y-3">
              <h2 className="font-bold text-sm text-[#18382a] border-b pb-2 uppercase tracking-wide">
                Financial Price Summary
              </h2>

              <div className="space-y-2 text-xs font-semibold text-gray-600 max-w-md ml-auto">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span>Subtotal:</span>
                  <span className="font-bold text-gray-900">₹{itemsSubtotal.toLocaleString()}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between py-1 border-b border-gray-100 text-red-600">
                    <span>Discount Applied:</span>
                    <span className="font-bold">-₹{totalDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span>Shipping Fee:</span>
                  <span className="font-bold text-gray-900">{shippingFee > 0 ? `₹${shippingFee.toLocaleString()}` : "FREE"}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100 text-gray-500">
                  <span>GST Included (18%):</span>
                  <span>₹{(order.gst || Math.round(grandTotal * (18 / 118))).toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 text-base font-bold text-[#18382a]">
                  <span>Grand Total:</span>
                  <span>₹{grandTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                  <span>Amount Paid:</span>
                  <span className="font-bold">₹{order.paymentStatus === "Paid" ? grandTotal.toLocaleString() : "0"}</span>
                </div>
              </div>
            </div>

            {/* 3. SHIPPING & DELIVERY */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b pb-2 gap-2">
                <h2 className="font-bold text-sm text-[#18382a] uppercase tracking-wide">
                  Shipping & Delivery
                </h2>
                
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowDeliveryStatusPicker(!showDeliveryStatusPicker)}
                    className="px-3 py-1 bg-gray-100 border border-gray-300 text-gray-800 rounded-xl font-bold text-[11px] hover:bg-gray-200 transition"
                  >
                    Update Delivery Status
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDeliveryEditForm(!showDeliveryEditForm)}
                    className="px-3 py-1 bg-[#18382a] text-white rounded-xl font-bold text-[11px] hover:bg-[#234e3b] transition"
                  >
                    Edit Delivery Info
                  </button>
                </div>
              </div>

              {/* INLINE DELIVERY STATUS PICKER */}
              {showDeliveryStatusPicker && (
                <div className="bg-amber-50/70 border border-amber-300 rounded-xl p-4 space-y-3">
                  <p className="font-bold text-xs text-amber-900">Select Delivery Status:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-bold">
                    {["Shipped", "Out for Delivery", "Delivered", "Delivery Failed", "Returned"].map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setDeliveryStatusChoice(st)}
                        className={`p-2.5 rounded-xl border text-center transition ${
                          deliveryStatusChoice === st
                            ? "bg-[#18382a] text-white border-[#18382a]"
                            : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  {deliveryStatusChoice === "Delivery Failed" && (
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-red-800">Failure Reason:</label>
                      <select
                        value={deliveryFailureReason}
                        onChange={(e) => setDeliveryFailureReason(e.target.value)}
                        className="w-full border rounded-xl p-2 text-xs font-semibold bg-white"
                      >
                        <option value="Customer unavailable">Customer unavailable at address</option>
                        <option value="Wrong address / Incomplete">Wrong address / Incomplete location</option>
                        <option value="Courier operational delay">Courier operational delay</option>
                        <option value="Customer requested reschedule">Customer requested reschedule</option>
                      </select>
                    </div>
                  )}

                  <div className="flex justify-end gap-2 pt-2 border-t border-amber-200">
                    <button
                      type="button"
                      onClick={() => setShowDeliveryStatusPicker(false)}
                      className="px-3 py-1 border rounded-lg font-bold text-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        requestStatusChange(deliveryStatusChoice, {
                          failureReason: deliveryStatusChoice === "Delivery Failed" ? deliveryFailureReason : null,
                        });
                        setShowDeliveryStatusPicker(false);
                      }}
                      className="px-4 py-1.5 bg-[#c45d2a] text-white rounded-lg font-bold hover:bg-[#a64c1f]"
                    >
                      Save Delivery Update
                    </button>
                  </div>
                </div>
              )}

              {/* INLINE EDIT DELIVERY METADATA FORM */}
              {showDeliveryEditForm && (
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-4 space-y-3">
                  <p className="font-bold text-xs text-gray-900">Edit Courier & Shipping Info:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase">Courier Partner</label>
                      <input
                        type="text"
                        value={courierInput}
                        onChange={(e) => setCourierInput(e.target.value)}
                        className="w-full border rounded-xl p-2 font-bold text-gray-900 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase">AWB / Tracking Number</label>
                      <input
                        type="text"
                        value={awbInput}
                        onChange={(e) => setAwbInput(e.target.value)}
                        className="w-full border rounded-xl p-2 font-mono font-bold text-gray-900 bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setShowDeliveryEditForm(false)}
                      className="px-3 py-1 border rounded-lg font-bold text-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        persistOrderUpdate(
                          { courier: courierInput, awb: awbInput, tracking: awbInput },
                          "Admin",
                          "Delivery metadata updated"
                        );
                        setShowDeliveryEditForm(false);
                      }}
                      className="px-4 py-1.5 bg-[#18382a] text-white rounded-lg font-bold hover:bg-[#234e3b]"
                    >
                      Save Delivery Details
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5 bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Delivery Address</p>
                  <p className="font-bold text-gray-900">{shippingAddr.name || order.customerName}</p>
                  <p className="text-gray-700 leading-relaxed font-medium">
                    {formattedAddress || "Standard Counter Pickup"}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-gray-700 font-medium">
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-400 font-semibold">Courier:</span>
                    <span className="font-bold text-gray-900">{order.courier || courierInput || "BlueDart Express"}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-400 font-semibold">Tracking AWB:</span>
                    <span className="font-mono font-bold text-[#18382a]">{order.awb || order.tracking || awbInput}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-400 font-semibold">Shipping Date:</span>
                    <span>{formatDateShort(order.shippingDate || order.createdAt)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-400 font-semibold">Expected / Delivered:</span>
                    <span className="font-bold text-gray-900">{formatDateShort(order.deliveredAt || order.expectedDelivery)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. PAYMENT INFORMATION */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs space-y-3">
              <h2 className="font-bold text-sm text-[#18382a] border-b pb-2 uppercase tracking-wide">
                Payment Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium text-gray-700">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-400 font-semibold">Payment Status:</span>
                  <span className={`font-bold ${order.paymentStatus === 'Paid' ? 'text-green-700' : 'text-amber-700'}`}>
                    {order.paymentStatus || "Paid"}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-400 font-semibold">Payment Method:</span>
                  <span className="font-bold text-gray-900">{order.paymentMethod || "Razorpay (UPI)"}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-400 font-semibold">Transaction ID:</span>
                  <span className="font-mono font-bold text-gray-900">{order.transactionId || order.paymentId || "pay_RZP882910"}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-400 font-semibold">Amount Paid:</span>
                  <span className="font-bold text-[#18382a]">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* 5. INTERNAL NOTES */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <h2 className="font-bold text-sm text-[#18382a] uppercase tracking-wide">
                  Internal Staff Notes
                </h2>
                <button
                  type="button"
                  onClick={() => setShowAddNoteForm(!showAddNoteForm)}
                  className="text-[11px] font-bold text-[#c45d2a] hover:underline"
                >
                  + Add Note
                </button>
              </div>

              {order.internalNotes && (
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-900 font-medium">
                  {order.internalNotes}
                </div>
              )}

              {showAddNoteForm && (
                <div className="space-y-2 pt-1">
                  <textarea
                    rows={2}
                    value={internalNoteText}
                    onChange={(e) => setInternalNoteText(e.target.value)}
                    placeholder="Type internal staff note..."
                    className="w-full border rounded-xl p-2.5 text-xs font-medium focus:outline-none focus:border-[#18382a]"
                  />
                  <div className="flex justify-end gap-2 font-bold text-xs">
                    <button
                      type="button"
                      onClick={() => setShowAddNoteForm(false)}
                      className="px-3 py-1 border rounded-lg text-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!internalNoteText) return;
                        persistOrderUpdate({ internalNotes: internalNoteText }, "Admin", internalNoteText);
                        setShowAddNoteForm(false);
                      }}
                      className="px-3 py-1 bg-[#18382a] text-white rounded-lg hover:bg-[#234e3b]"
                    >
                      Save Note
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 6. ORDER ACTIVITY / AUDIT HISTORY */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs space-y-3">
              <h2 className="font-bold text-sm text-[#18382a] border-b pb-2 uppercase tracking-wide">
                Order Activity & Status Audit History
              </h2>
              <div className="relative pl-6 space-y-4 text-xs before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                {(order.statusHistory || [
                  { status: "Order Placed", timestamp: order.createdAt || order.orderDate, updatedBy: "Customer" },
                  { status: order.orderStatus || "Delivered", timestamp: order.deliveredAt || order.createdAt, updatedBy: "Admin" }
                ]).map((hist, idx) => (
                  <div key={idx} className="relative flex items-start gap-2">
                    <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#18382a] ring-4 ring-white" />
                    <div>
                      <p className="font-bold text-gray-900">{hist.status}</p>
                      <p className="text-[10px] text-gray-400 font-mono">
                        {formatDateTime(hist.timestamp)} • Updated by: <strong className="text-gray-700">{hist.updatedBy || "System"}</strong>
                      </p>
                      {hist.note && (
                        <p className="text-[11px] text-amber-800 italic mt-0.5">Note: {hist.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR (30%) */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* ORDER SUMMARY CARD */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-2xs space-y-3 text-xs">
              <h3 className="font-bold text-xs text-[#18382a] uppercase tracking-wide border-b pb-2">
                Quick Order Summary
              </h3>
              <div className="space-y-2 font-medium text-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-400">Order Total:</span>
                  <span className="font-bold text-gray-900">₹{grandTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Items:</span>
                  <span className="font-bold text-gray-900">{(order.items || []).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Payment:</span>
                  <span className={`font-bold ${order.paymentStatus === 'Paid' ? 'text-green-700' : 'text-amber-700'}`}>
                    {order.paymentStatus || 'Paid'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Fulfilment:</span>
                  <span className="font-bold text-gray-900">{order.orderStatus}</span>
                </div>
              </div>
            </div>

            {/* CUSTOMER CARD */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-2xs space-y-3 text-xs">
              <h3 className="font-bold text-xs text-[#18382a] uppercase tracking-wide border-b pb-2">
                Customer Reference
              </h3>
              <div className="space-y-2 font-medium text-gray-700">
                <p className="font-bold text-sm text-gray-900">{order.customerName || "Walk-in Guest"}</p>
                <p className="text-gray-500 font-mono">{order.customerId || "usr-101"}</p>
                <p className="text-gray-700">{order.mobile ? `+91 ${order.mobile}` : ''}</p>
                <p className="text-gray-600 text-[11px] truncate">{order.email}</p>

                <div className="pt-2">
                  <Link
                    href="/admin?tab=customers"
                    className="w-full text-center block px-3 py-1.5 border rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition"
                  >
                    View Customer Profile
                  </Link>
                </div>
              </div>
            </div>

            {/* DELIVERY QUICK INFO */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-2xs space-y-3 text-xs">
              <h3 className="font-bold text-xs text-[#18382a] uppercase tracking-wide border-b pb-2">
                Delivery Reference
              </h3>
              <div className="space-y-2 font-medium text-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-400">Courier:</span>
                  <span className="font-bold text-gray-900">{order.courier || courierInput || "BlueDart"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">AWB:</span>
                  <span className="font-mono font-bold text-gray-900">{order.awb || order.tracking || awbInput}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* CONFIRM DESTRUCTIVE STATUS CHANGE MODAL */}
      {showConfirmModal && pendingStatusUpdate && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 border border-gray-200 shadow-2xl text-xs font-sans">
            <div className="border-b pb-2">
              <h3 className="font-bold text-sm text-red-700 flex items-center gap-1.5">
                <Ban className="w-4 h-4" />
                Change Order Status to {pendingStatusUpdate.targetStatus}?
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5">
                This will mark the order status as <strong>{pendingStatusUpdate.targetStatus}</strong>.
              </p>
            </div>

            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-2 font-medium">
              <div className="flex justify-between">
                <span className="text-gray-400 font-semibold">Order ID:</span>
                <span className="font-mono font-bold text-gray-900">{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-semibold">Transition:</span>
                <span className="font-bold text-red-700">
                  {order.orderStatus} → {pendingStatusUpdate.targetStatus}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t font-bold">
              <button
                type="button"
                onClick={() => {
                  setShowConfirmModal(false);
                  setPendingStatusUpdate(null);
                }}
                className="px-4 py-2 border rounded-xl text-gray-600 hover:bg-gray-50"
              >
                Keep Order
              </button>
              <button
                type="button"
                disabled={isUpdatingStatus}
                onClick={confirmPendingStatusUpdate}
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50"
              >
                {isUpdatingStatus ? "Updating..." : "Confirm Status Change"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRINTABLE INVOICE MODAL */}
      {showInvoiceModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 border border-gray-200 shadow-2xl text-xs font-mono text-gray-900 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b pb-4">
              <div>
                <h2 className="text-lg font-bold font-sans text-[#18382a]">MOTOTREK PUNE</h2>
                <p className="text-[11px] font-sans text-gray-500">Official Tax Invoice</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm">INVOICE: {order.id}</p>
                <p className="text-gray-500">{formatDateShort(order.createdAt || order.orderDate)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-b pb-4">
              <div>
                <p className="font-bold font-sans text-gray-400 uppercase text-[10px]">Customer / Billed To</p>
                <p className="font-bold">{order.customerName}</p>
                <p>{order.mobile ? `+91 ${order.mobile}` : ''}</p>
                <p>{order.email}</p>
              </div>
              <div>
                <p className="font-bold font-sans text-gray-400 uppercase text-[10px]">Shipping Address</p>
                <p className="font-medium">{formattedAddress}</p>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-gray-100 font-bold border-b">
                    <th className="p-2">Item</th>
                    <th className="p-2 text-center">Qty</th>
                    <th className="p-2 text-right">Price</th>
                    <th className="p-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {(order.items || []).map((i, idx) => (
                    <tr key={idx}>
                      <td className="p-2">
                        {i.name} ({i.variant || 'Std'})
                        <div className="text-[10px] text-gray-500">SKU: {i.sku}</div>
                      </td>
                      <td className="p-2 text-center">{i.quantity}</td>
                      <td className="p-2 text-right">₹{(i.price || 0).toLocaleString()}</td>
                      <td className="p-2 text-right">₹{(i.subtotal || i.price * i.quantity || 0).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-right space-y-1 pt-2 border-t font-semibold">
              <p>Subtotal: ₹{itemsSubtotal.toLocaleString()}</p>
              {totalDiscount > 0 && <p className="text-red-600">Discount: -₹{totalDiscount.toLocaleString()}</p>}
              <p>Shipping: ₹{shippingFee.toLocaleString()}</p>
              <p className="text-sm font-bold text-gray-900 pt-1 border-t">GRAND TOTAL: ₹{grandTotal.toLocaleString()}</p>
              <p className="text-[10px] text-gray-500 font-sans">Payment Method: {order.paymentMethod || 'Razorpay'} ({order.paymentStatus || 'Paid'})</p>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t font-sans font-bold">
              <button
                type="button"
                onClick={() => setShowInvoiceModal(false)}
                className="px-4 py-2 border rounded-xl text-gray-700"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 bg-[#18382a] text-white rounded-xl hover:bg-[#234e3b] flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
