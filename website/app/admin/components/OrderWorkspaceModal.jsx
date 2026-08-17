"use client";

import API_BASE from "../../../utils/api";
import React, { useState, useEffect } from "react";
import {
  X,
  Phone,
  Mail,
  Copy,
  MapPin,
  Truck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Printer,
  Send,
  ExternalLink,
  RotateCcw,
  FileText,
  CreditCard,
  Building2,
  Package,
  Plus,
  Check,
  Edit,
  RefreshCw,
  Ban,
  DollarSign,
} from "lucide-react";

export default function OrderWorkspaceModal({ order: initialOrder, onClose, onStatusChange, fetchAllAdminData }) {
  const [order, setOrder] = useState(initialOrder);

  // SUB-MODALS & PANELS STATE
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingStatusUpdate, setPendingStatusUpdate] = useState(null);

  // INLINE DELIVERY PANELS STATE
  const [showDeliveryStatusPicker, setShowDeliveryStatusPicker] = useState(false);
  const [showDeliveryEditForm, setShowDeliveryEditForm] = useState(false);
  const [showAddNoteForm, setShowAddNoteForm] = useState(false);

  // DELIVERY FORM FIELDS
  const [deliveryStatusChoice, setDeliveryStatusChoice] = useState(order?.orderStatus || "Shipped");
  const [deliveryFailureReason, setDeliveryFailureReason] = useState("Customer unavailable");
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [courierInput, setCourierInput] = useState(order?.courier || "BlueDart Express");
  const [awbInput, setAwbInput] = useState(order?.awb || order?.tracking || "BD94810234IN");
  const [shippingDateInput, setShippingDateInput] = useState(order?.shippingDate || "");
  const [expectedDeliveryInput, setExpectedDeliveryInput] = useState(order?.expectedDelivery || "");
  const [deliveryNoteInput, setDeliveryNoteInput] = useState(order?.deliveryNote || "");

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

  // LOCK BACKGROUND SCROLLING
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // KEEP LOCAL ORDER IN SYNC
  useEffect(() => {
    if (initialOrder) {
      setOrder(initialOrder);
      setDeliveryStatusChoice(initialOrder.orderStatus || "Shipped");
      setCourierInput(initialOrder.courier || "BlueDart Express");
      setAwbInput(initialOrder.awb || initialOrder.tracking || "BD94810234IN");
      setShippingDateInput(initialOrder.shippingDate || "");
      setExpectedDeliveryInput(initialOrder.expectedDelivery || "");
    }
  }, [initialOrder]);

  if (!order) return null;

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
    try {
      const response = await fetch(`${API_BASE}/orders/${encodeURIComponent(order.id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updates, adminName, deliveryNote: userNote }),
      });
      const json = await response.json();
      if (json.success && json.data) {
        setOrder(json.data);
      } else {
        // Fallback local update
        const updatedLocal = { ...order, ...updates };
        if (updates.orderStatus && updates.orderStatus !== order.orderStatus) {
          updatedLocal.statusHistory = updatedLocal.statusHistory || [];
          updatedLocal.statusHistory.push({
            status: updates.orderStatus,
            timestamp: new Date().toISOString(),
            updatedBy: adminName,
            note: userNote || updates.cancellationReason || updates.failureReason || null,
          });
        }
        setOrder(updatedLocal);
      }

      // Notify parent handlers
      if (onStatusChange && updates.orderStatus) {
        onStatusChange(order.id, updates.orderStatus);
      }
      if (fetchAllAdminData) {
        fetchAllAdminData();
      }

      setActionSuccessMessage("Order updated successfully!");
      setTimeout(() => setActionSuccessMessage(""), 2500);
    } catch (err) {
      console.error("Failed to update order:", err);
    }
  };

  // TRIGGER CONFIRMATION MODAL BEFORE STATUS CHANGE
  const requestStatusChange = (newStatus, extraDetails = {}) => {
    setPendingStatusUpdate({ targetStatus: newStatus, extraDetails });
    setShowConfirmModal(true);
  };

  // EXECUTE CONFIRMED STATUS CHANGE
  const confirmPendingStatusUpdate = () => {
    if (!pendingStatusUpdate) return;
    const { targetStatus, extraDetails } = pendingStatusUpdate;
    persistOrderUpdate(
      { orderStatus: targetStatus, ...extraDetails },
      "Admin",
      extraDetails.note || extraDetails.failureReason || ""
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

  // NEXT RELEVANT PRIMARY WORKFLOW BUTTON RESOLVER
  const renderPrimaryWorkflowButton = () => {
    const s = (order.orderStatus || "").toLowerCase();

    if (s === "order placed") {
      return (
        <button
          type="button"
          onClick={() => requestStatusChange("Confirmed")}
          className="px-4 py-2 bg-[#c45d2a] hover:bg-[#a64c1f] text-white rounded-xl font-bold text-xs shadow-md transition flex items-center gap-1.5"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Confirm Order</span>
        </button>
      );
    }
    if (s === "confirmed") {
      return (
        <button
          type="button"
          onClick={() => requestStatusChange("Processing")}
          className="px-4 py-2 bg-[#c45d2a] hover:bg-[#a64c1f] text-white rounded-xl font-bold text-xs shadow-md transition flex items-center gap-1.5"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Start Processing</span>
        </button>
      );
    }
    if (s === "processing") {
      return (
        <button
          type="button"
          onClick={() => requestStatusChange("Packed")}
          className="px-4 py-2 bg-[#c45d2a] hover:bg-[#a64c1f] text-white rounded-xl font-bold text-xs shadow-md transition flex items-center gap-1.5"
        >
          <Package className="w-4 h-4" />
          <span>Mark as Packed</span>
        </button>
      );
    }
    if (s === "packed") {
      return (
        <button
          type="button"
          onClick={() => requestStatusChange("Shipped")}
          className="px-4 py-2 bg-[#c45d2a] hover:bg-[#a64c1f] text-white rounded-xl font-bold text-xs shadow-md transition flex items-center gap-1.5"
        >
          <Truck className="w-4 h-4" />
          <span>Mark as Shipped</span>
        </button>
      );
    }
    if (s === "shipped") {
      return (
        <button
          type="button"
          onClick={() => requestStatusChange("Out for Delivery")}
          className="px-4 py-2 bg-[#c45d2a] hover:bg-[#a64c1f] text-white rounded-xl font-bold text-xs shadow-md transition flex items-center gap-1.5"
        >
          <Truck className="w-4 h-4" />
          <span>Mark Out for Delivery</span>
        </button>
      );
    }
    if (s === "out for delivery") {
      return (
        <button
          type="button"
          onClick={() => requestStatusChange("Delivered")}
          className="px-4 py-2 bg-[#c45d2a] hover:bg-[#a64c1f] text-white rounded-xl font-bold text-xs shadow-md transition flex items-center gap-1.5"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Mark as Delivered</span>
        </button>
      );
    }
    if (s === "delivered" || s === "completed") {
      return (
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl flex items-center gap-1 border border-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Order Delivered ✓</span>
          </span>
          <button
            type="button"
            onClick={() => {
              setReturnProductId(order.items?.[0]?.productId || order.items?.[0]?.sku || "");
              setShowReturnModal(true);
            }}
            className="px-3.5 py-1.5 bg-amber-50 border border-amber-300 text-amber-900 font-bold text-xs rounded-xl hover:bg-amber-100 transition flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start Return</span>
          </button>
        </div>
      );
    }
    if (s === "return requested" || s === "return processing") {
      return (
        <button
          type="button"
          onClick={() => requestStatusChange("Returned")}
          className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold text-xs shadow-md transition flex items-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Mark Item Returned</span>
        </button>
      );
    }
    if (s === "returned") {
      return (
        <button
          type="button"
          onClick={() => requestStatusChange("Refunded")}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-md transition flex items-center gap-1.5"
        >
          <DollarSign className="w-4 h-4" />
          <span>Process Refund</span>
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
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-hidden">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[calc(100vh-30px)] flex flex-col overflow-hidden shadow-2xl border border-gray-200 text-xs">
        
        {/* 1. STICKY HEADER */}
        <div className="shrink-0 bg-[#10281e] text-white px-6 py-4 flex items-center justify-between border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="font-mono font-bold text-xl sm:text-2xl text-white tracking-wide">
                {order.id}
              </h2>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(order.orderStatus)}`}>
                {order.orderStatus}
              </span>
              <span className="text-xs text-white/70 font-medium">
                Placed on {formatDateTime(order.createdAt || order.orderDate || order.orderDateTime)}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-white/80 font-medium">
              <span className="font-bold text-white text-sm">₹{grandTotal.toLocaleString()}</span>
              <span>•</span>
              <span>{(order.items || []).length} Items</span>
              <span>•</span>
              <span className={order.paymentStatus === "Paid" ? "text-emerald-400 font-bold" : "text-amber-300 font-bold"}>
                Payment: {order.paymentStatus || "Paid"}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 2. QUICK ORDER SUMMARY STRIP */}
        <div className="shrink-0 bg-gray-50 px-6 py-2.5 border-b border-gray-200 flex items-center justify-between text-xs font-semibold text-gray-600 overflow-x-auto">
          <div className="flex items-center gap-6 min-w-max">
            <div>
              <span className="text-gray-400">Customer: </span>
              <strong className="text-gray-900">{order.customerName || "Walk-in Customer"}</strong>
            </div>
            <div>
              <span className="text-gray-400">Order Total: </span>
              <strong className="text-[#18382a]">₹{grandTotal.toLocaleString()}</strong>
            </div>
            <div>
              <span className="text-gray-400">Payment Status: </span>
              <strong className={order.paymentStatus === "Paid" ? "text-green-700 font-bold" : "text-amber-700 font-bold"}>
                {order.paymentStatus || "Paid"}
              </strong>
            </div>
            <div>
              <span className="text-gray-400">Delivery Status: </span>
              <strong className="text-gray-900">{order.fulfilmentStatus || order.orderStatus || "Processing"}</strong>
            </div>
            <div>
              <span className="text-gray-400">Items: </span>
              <strong className="text-gray-900">{(order.items || []).length}</strong>
            </div>
          </div>
        </div>

        {/* SUCCESS NOTIFICATION TOAST */}
        {actionSuccessMessage && (
          <div className="bg-emerald-600 text-white px-6 py-2 text-xs font-bold text-center shrink-0">
            ✓ {actionSuccessMessage}
          </div>
        )}

        {/* 3. SCROLLABLE MAIN CONTENT (SINGLE UNIFIED VIEW) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* ================================================== */}
          {/* DEDICATED TOP BANNER: ORDER ACTIONS & PRIMARY NEXT STEP */}
          {/* ================================================== */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                ORDER OPERATIONAL WORKFLOW
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-600 font-semibold text-xs">Current Status:</span>
                <span className={`px-2.5 py-0.5 rounded-full font-bold border text-xs ${getStatusBadge(order.orderStatus)}`}>
                  {order.orderStatus}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {renderPrimaryWorkflowButton()}
              {order.orderStatus !== "Cancelled" && order.orderStatus !== "Delivered" && (
                <button
                  type="button"
                  onClick={() => setShowCancelModal(true)}
                  className="px-3 py-2 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded-xl font-bold text-xs transition flex items-center gap-1"
                >
                  <Ban className="w-3.5 h-3.5" />
                  <span>Cancel Order</span>
                </button>
              )}
            </div>
          </div>

          {/* SECTION 1: CUSTOMER INFORMATION */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-2xs space-y-4">
            <h3 className="font-bold text-sm text-[#18382a] border-b pb-2 uppercase tracking-wide">
              Customer Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500 font-semibold">Customer Name:</span>
                  <span className="font-bold text-gray-900">{order.customerName || "Guest Customer"}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500 font-semibold">Customer ID:</span>
                  <span className="font-mono font-bold text-gray-900">{order.customerId || "Walk-in Guest"}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500 font-semibold">Phone Number:</span>
                  <span className="font-bold text-gray-900">{order.mobile ? `+91 ${order.mobile}` : "Not provided"}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500 font-semibold">Email Address:</span>
                  <span className="font-medium text-gray-900">{order.email || "Not provided"}</span>
                </div>
              </div>

              <div className="space-y-2 bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                <p className="text-[10px] text-gray-400 uppercase font-bold">Delivery / Shipping Address</p>
                <p className="font-bold text-gray-900">{shippingAddr.name || order.customerName}</p>
                <p className="text-gray-700 leading-relaxed font-medium">
                  {formattedAddress || "Standard Store / Counter Delivery"}
                </p>

                <div className="pt-2 flex items-center gap-2 flex-wrap">
                  {order.mobile && (
                    <>
                      <a
                        href={`tel:${order.mobile}`}
                        className="px-2.5 py-1 bg-white border rounded-lg font-bold text-gray-700 hover:bg-gray-100 transition flex items-center gap-1 text-[11px]"
                      >
                        <Phone className="w-3 h-3 text-[#c45d2a]" />
                        <span>Call</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleWhatsAppCustomer}
                        className="px-2.5 py-1 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-lg font-bold hover:bg-emerald-100 transition flex items-center gap-1 text-[11px]"
                      >
                        <Send className="w-3 h-3 text-emerald-600" />
                        <span>WhatsApp</span>
                      </button>
                    </>
                  )}
                  {order.email && (
                    <a
                      href={`mailto:${order.email}`}
                      className="px-2.5 py-1 bg-white border rounded-lg font-bold text-gray-700 hover:bg-gray-100 transition flex items-center gap-1 text-[11px]"
                    >
                      <Mail className="w-3 h-3 text-gray-500" />
                      <span>Email</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: ORDER & PAYMENT DETAILS (2 COLUMNS) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* ORDER INFORMATION BOX */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-2xs space-y-3">
              <h3 className="font-bold text-sm text-[#18382a] border-b pb-2 uppercase tracking-wide">
                Order Information
              </h3>
              <div className="space-y-2 text-xs text-gray-700 font-medium">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-400 font-semibold">Order Reference:</span>
                  <span className="font-mono font-bold text-gray-900">{order.id}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-400 font-semibold">Order Placed Date:</span>
                  <span className="font-medium text-gray-900">{formatDateTime(order.createdAt || order.orderDate)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-400 font-semibold">Sales Channel:</span>
                  <span className="font-bold text-gray-900">{order.salesChannel || "Online Website Store"}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-400 font-semibold">Fulfillment Status:</span>
                  <span className={`font-bold ${order.orderStatus === 'Delivered' ? 'text-green-700' : 'text-gray-900'}`}>
                    {order.orderStatus}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-400 font-semibold">Payment Status:</span>
                  <span className={`font-bold ${order.paymentStatus === 'Paid' ? 'text-green-700' : 'text-amber-700'}`}>
                    {order.paymentStatus || "Paid"}
                  </span>
                </div>
              </div>
            </div>

            {/* PAYMENT DETAILS BOX */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-2xs space-y-3">
              <h3 className="font-bold text-sm text-[#18382a] border-b pb-2 uppercase tracking-wide flex items-center justify-between">
                <span>Payment Details</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                  {order.paymentStatus || 'Paid'}
                </span>
              </h3>
              <div className="space-y-2 text-xs text-gray-700 font-medium">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-400 font-semibold">Payment Method:</span>
                  <span className="font-bold text-gray-900">{order.paymentMethod || "Razorpay (UPI)"}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-400 font-semibold">Amount Paid:</span>
                  <span className="font-bold text-[#18382a]">₹{grandTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-400 font-semibold">Payment Date:</span>
                  <span className="font-medium text-gray-900">{formatDateTime(order.paymentDate || order.createdAt)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-400 font-semibold">Transaction ID:</span>
                  <span className="font-mono font-bold text-gray-900">{order.transactionId || order.paymentId || "pay_RZP882910"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================== */}
          {/* SECTION 3: DELIVERY & COURIER TRACKING (ACTIONABLE) */}
          {/* ================================================== */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-2xs space-y-4">
            <div className="flex flex-wrap items-center justify-between border-b pb-2 gap-2">
              <h3 className="font-bold text-sm text-[#18382a] uppercase tracking-wide">
                Delivery & Courier Tracking
              </h3>
              
              {/* ACTION BUTTONS FOR DELIVERY */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowDeliveryStatusPicker(!showDeliveryStatusPicker)}
                  className="px-3 py-1 bg-gray-100 border border-gray-300 text-gray-800 rounded-xl font-bold text-[11px] hover:bg-gray-200 transition flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3 text-[#c45d2a]" />
                  <span>Update Delivery Status</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeliveryEditForm(!showDeliveryEditForm)}
                  className="px-3 py-1 bg-[#18382a] text-white rounded-xl font-bold text-[11px] hover:bg-[#234e3b] transition flex items-center gap-1"
                >
                  <Edit className="w-3 h-3" />
                  <span>Edit Delivery Details</span>
                </button>
              </div>
            </div>

            {/* ACTION AREA 1: INLINE DELIVERY STATUS UPDATE PICKER */}
            {showDeliveryStatusPicker && (
              <div className="bg-amber-50/70 border border-amber-300 rounded-xl p-4 space-y-3">
                <p className="font-bold text-xs text-amber-900">Select New Delivery Status:</p>
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

                {/* CONDITIONAL FAILURE REASON */}
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

                {/* CONDITIONAL RESCHEDULE DATE */}
                {(deliveryStatusChoice === "Delivery Failed" || deliveryStatusChoice === "Out for Delivery") && (
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-gray-700">Reschedule / Expected Date (Optional):</label>
                    <input
                      type="date"
                      value={rescheduleDate}
                      onChange={(e) => setRescheduleDate(e.target.value)}
                      className="border rounded-xl p-2 text-xs font-semibold bg-white"
                    />
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
                        expectedDelivery: rescheduleDate || expectedDeliveryInput,
                      });
                      setShowDeliveryStatusPicker(false);
                    }}
                    className="px-4 py-1.5 bg-[#c45d2a] text-white rounded-lg font-bold hover:bg-[#a64c1f]"
                  >
                    Save Status Update
                  </button>
                </div>
              </div>
            )}

            {/* ACTION AREA 2: INLINE EDIT DELIVERY DETAILS FORM */}
            {showDeliveryEditForm && (
              <div className="bg-gray-50 border border-gray-300 rounded-xl p-4 space-y-3">
                <p className="font-bold text-xs text-gray-900">Edit Courier & Shipping Metadata:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase">Courier Partner</label>
                    <input
                      type="text"
                      value={courierInput}
                      onChange={(e) => setCourierInput(e.target.value)}
                      className="w-full border rounded-xl p-2 font-bold text-gray-900 bg-white"
                      placeholder="e.g. BlueDart Express"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase">AWB / Tracking Number</label>
                    <input
                      type="text"
                      value={awbInput}
                      onChange={(e) => setAwbInput(e.target.value)}
                      className="w-full border rounded-xl p-2 font-mono font-bold text-gray-900 bg-white"
                      placeholder="e.g. BD94810234IN"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase">Shipping Date</label>
                    <input
                      type="date"
                      value={shippingDateInput}
                      onChange={(e) => setShippingDateInput(e.target.value)}
                      className="w-full border rounded-xl p-2 font-bold text-gray-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase">Expected Delivery Date</label>
                    <input
                      type="date"
                      value={expectedDeliveryInput}
                      onChange={(e) => setExpectedDeliveryInput(e.target.value)}
                      className="w-full border rounded-xl p-2 font-bold text-gray-900 bg-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase">Delivery Note</label>
                    <input
                      type="text"
                      value={deliveryNoteInput}
                      onChange={(e) => setDeliveryNoteInput(e.target.value)}
                      className="w-full border rounded-xl p-2 font-medium text-gray-900 bg-white"
                      placeholder="Operational delivery notes..."
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
                        {
                          courier: courierInput,
                          awb: awbInput,
                          tracking: awbInput,
                          shippingDate: shippingDateInput,
                          expectedDelivery: expectedDeliveryInput,
                          deliveryNote: deliveryNoteInput,
                        },
                        "Admin",
                        "Delivery details updated"
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

            {/* COURIER METRICS GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium">
              <div className="bg-gray-50 p-3 rounded-xl border">
                <p className="text-[10px] text-gray-400 uppercase font-bold">Delivery Status</p>
                <p className="font-bold text-gray-900 mt-0.5">{order.fulfilmentStatus || order.orderStatus || "Processing"}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border">
                <p className="text-[10px] text-gray-400 uppercase font-bold">Courier Partner</p>
                <p className="font-bold text-gray-900 mt-0.5">{order.courier || courierInput || "BlueDart Express"}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border">
                <p className="text-[10px] text-gray-400 uppercase font-bold">AWB / Tracking No.</p>
                <p className="font-mono font-bold text-[#18382a] mt-0.5">{order.awb || order.tracking || awbInput || "BD94810234IN"}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border">
                <p className="text-[10px] text-gray-400 uppercase font-bold">Expected / Delivered Date</p>
                <p className="font-bold text-gray-900 mt-0.5">
                  {formatDateShort(order.deliveredAt || order.deliveryDate || order.expectedDelivery || expectedDeliveryInput)}
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 4: PURCHASED ITEMS TABLE */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-2xs space-y-3">
            <h3 className="font-bold text-sm text-[#18382a] border-b pb-2 uppercase tracking-wide">
              Purchased Line Items
            </h3>
            <div className="overflow-x-auto border rounded-xl">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="uppercase font-bold text-[10px] text-gray-400 bg-gray-50 border-b">
                    <th className="p-3">Product Name</th>
                    <th className="p-3">Variant</th>
                    <th className="p-3">SKU</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Unit Price</th>
                    <th className="p-3 text-right">Discount</th>
                    <th className="p-3 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {(order.items || []).map((item, idx) => {
                    const unitPrice = Number(item.price || item.unitPrice || 0);
                    const lineQty = Number(item.quantity || 1);
                    const lineDiscount = Number(item.discount || 0);
                    const lineSubtotal = Number(item.total || item.subtotal || unitPrice * lineQty - lineDiscount);

                    return (
                      <tr key={idx} className="hover:bg-gray-50/80 transition">
                        <td className="p-3 font-bold text-gray-900">{item.name}</td>
                        <td className="p-3 font-medium text-gray-600">
                          {item.variant || [item.colour, item.size].filter(Boolean).join(" / ") || "Standard"}
                        </td>
                        <td className="p-3 font-mono text-gray-500">{item.sku || order.id}</td>
                        <td className="p-3 text-center font-bold text-gray-900">{lineQty}</td>
                        <td className="p-3 text-right font-medium text-gray-700">₹{unitPrice.toLocaleString()}</td>
                        <td className="p-3 text-right font-medium text-red-600">
                          {lineDiscount > 0 ? `-₹${lineDiscount.toLocaleString()}` : "—"}
                        </td>
                        <td className="p-3 text-right font-bold text-[#18382a]">₹{lineSubtotal.toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION 5: PRICE SUMMARY (RIGHT ALIGNED) */}
          <div className="flex justify-end">
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 w-full max-w-sm space-y-2 text-xs font-semibold text-gray-600">
              <h4 className="font-bold text-gray-900 border-b pb-2 uppercase tracking-wide text-[11px]">
                Price Summary
              </h4>
              <div className="flex justify-between py-1">
                <span>Items Subtotal:</span>
                <span className="font-bold text-gray-900">₹{itemsSubtotal.toLocaleString()}</span>
              </div>
              {totalDiscount > 0 && (
                <div className="flex justify-between py-1 text-red-600">
                  <span>Discount Applied:</span>
                  <span className="font-bold">-₹{totalDiscount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between py-1">
                <span>Shipping Charge:</span>
                <span className="font-bold text-gray-900">{shippingFee > 0 ? `₹${shippingFee.toLocaleString()}` : "FREE"}</span>
              </div>
              <div className="flex justify-between py-1 text-gray-500">
                <span>GST Included (18%):</span>
                <span>₹{(order.gst || Math.round(grandTotal * (18 / 118))).toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-gray-300 pt-2 text-base font-bold text-[#18382a]">
                <span>Grand Total:</span>
                <span className="text-[#18382a]">₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* SECTION 6: ORDER TIMELINE & STAFF NOTES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* TIMELINE WITH UPDATED BY ADMIN */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-2xs space-y-3">
              <h3 className="font-bold text-sm text-[#18382a] border-b pb-2 uppercase tracking-wide">
                Order Activity & Status Audit History
              </h3>
              <div className="relative pl-6 space-y-3 text-xs before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                {(order.statusHistory || [
                  { status: "Order Placed", timestamp: order.createdAt || order.orderDate, updatedBy: "System" },
                  { status: order.orderStatus || "Delivered", timestamp: order.deliveredAt || order.createdAt, updatedBy: "Admin" }
                ]).map((hist, idx) => (
                  <div key={idx} className="relative flex items-start gap-2">
                    <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#18382a] ring-4 ring-white" />
                    <div>
                      <p className="font-bold text-gray-900">{hist.status}</p>
                      <p className="text-[10px] text-gray-400 font-mono">
                        {formatDateTime(hist.timestamp)} • Updated by: <strong className="text-gray-700">{hist.updatedBy || "Admin"}</strong>
                      </p>
                      {hist.note && (
                        <p className="text-[11px] text-amber-800 italic mt-0.5">Note: {hist.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* STAFF NOTES */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="font-bold text-sm text-[#18382a] uppercase tracking-wide">
                  Internal Staff Notes
                </h3>
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
          </div>
        </div>

        {/* ================================================== */}
        {/* 4. STICKY BOTTOM ACTION BAR (PROMINENT HIERARCHY) */}
        {/* ================================================== */}
        <div className="shrink-0 bg-white border-t border-gray-200 px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs font-bold">
          {/* SECONDARY ACTIONS (LEFT/CENTER) */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setShowInvoiceModal(true)}
              className="px-3.5 py-2 bg-[#18382a] text-white rounded-xl hover:bg-[#234e3b] transition flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>View Invoice</span>
            </button>
            <button
              type="button"
              onClick={handleWhatsAppCustomer}
              className="px-3.5 py-2 border border-gray-300 text-gray-800 rounded-xl hover:bg-gray-100 transition flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Customer</span>
            </button>
            <button
              type="button"
              onClick={() => setShowDeliveryEditForm(!showDeliveryEditForm)}
              className="px-3.5 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition"
            >
              Edit Delivery Info
            </button>
          </div>

          {/* PRIMARY NEXT WORKFLOW ACTION (RIGHT) */}
          <div className="flex items-center gap-2">
            {renderPrimaryWorkflowButton()}
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* SUB-MODAL 1: STATUS CHANGE CONFIRMATION DIALOG */}
      {/* ================================================== */}
      {showConfirmModal && pendingStatusUpdate && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 border border-gray-200 shadow-2xl text-xs font-sans">
            <div className="border-b pb-2">
              <h3 className="font-bold text-sm text-[#18382a] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#c45d2a]" />
                Confirm Order Status Update
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Are you sure you want to update the operational status of this order?
              </p>
            </div>

            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-2 font-medium">
              <div className="flex justify-between">
                <span className="text-gray-400 font-semibold">Order ID:</span>
                <span className="font-mono font-bold text-gray-900">{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-semibold">Customer:</span>
                <span className="font-bold text-gray-900">{order.customerName}</span>
              </div>
              <div className="flex justify-between pt-1 border-t">
                <span className="text-gray-400 font-semibold">Status Transition:</span>
                <span className="font-bold text-[#c45d2a]">
                  {order.orderStatus} → {pendingStatusUpdate.targetStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-semibold">Updated By:</span>
                <span className="font-bold text-gray-900">Admin</span>
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
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmPendingStatusUpdate}
                className="px-4 py-2 bg-[#c45d2a] text-white rounded-xl hover:bg-[#a64c1f]"
              >
                Confirm Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* SUB-MODAL 2: CANCEL ORDER REASON MODAL */}
      {/* ================================================== */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 border border-gray-200 shadow-2xl text-xs font-sans">
            <div className="border-b pb-2">
              <h3 className="font-bold text-sm text-red-700 flex items-center gap-1.5">
                <Ban className="w-4 h-4" />
                Cancel Order {order.id}
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Please specify the reason for cancelling this order:
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Cancellation Reason *</label>
                <select
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                  className="w-full border rounded-xl p-2.5 text-xs font-semibold bg-white"
                >
                  <option value="Customer Request">Customer requested cancellation</option>
                  <option value="Item Out of Stock">Item Out of Stock</option>
                  <option value="Address Unreachable">Shipping Address Unreachable</option>
                  <option value="Payment Issue / Unverified">Payment Unverified / Fraud Risk</option>
                  <option value="Duplicate Order">Duplicate Order Created</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t font-bold">
                <button
                  type="button"
                  onClick={() => setShowCancelModal(false)}
                  className="px-4 py-2 border rounded-xl text-gray-600 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    persistOrderUpdate({ orderStatus: "Cancelled", cancellationReason }, "Admin", cancellationReason);
                    setShowCancelModal(false);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
                >
                  Confirm Cancellation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-MODAL 3: PRINTABLE INVOICE MODAL */}
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

      {/* SUB-MODAL 4: STRUCTURED RETURN INITIATION MODAL */}
      {showReturnModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-4 border border-gray-200 shadow-2xl text-xs font-sans">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-sm text-[#18382a] flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#c45d2a]" />
                Initiate Product Return / Exchange
              </h3>
              <button
                type="button"
                onClick={() => setShowReturnModal(false)}
                className="text-gray-400 hover:text-gray-700 font-bold"
              >
                ✕
              </button>
            </div>

            {returnSuccessMessage ? (
              <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl text-emerald-900 font-bold text-center">
                {returnSuccessMessage}
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Select Item to Return *</label>
                  <select
                    value={returnProductId}
                    onChange={(e) => setReturnProductId(e.target.value)}
                    className="w-full border rounded-xl p-2.5 text-xs font-semibold bg-white"
                  >
                    {(order.items || []).map((i) => (
                      <option key={i.productId || i.sku} value={i.productId || i.sku}>
                        {i.name} ({i.variant || 'Std'})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Quantity *</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={returnQty}
                    onChange={(e) => setReturnQty(Number(e.target.value))}
                    className="w-full border rounded-xl p-2.5 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Return Reason *</label>
                  <select
                    value={returnReason}
                    onChange={(e) => setReturnReason(e.target.value)}
                    className="w-full border rounded-xl p-2.5 text-xs font-semibold bg-white"
                  >
                    <option value="Size / Fit Exchange">Size / Fit Exchange</option>
                    <option value="Product Defect / Damaged">Product Defect / Damaged</option>
                    <option value="Wrong Item Shipped">Wrong Item Shipped</option>
                    <option value="Buyer Changed Mind">Buyer Changed Mind</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Item Condition *</label>
                  <select
                    value={returnCondition}
                    onChange={(e) => setReturnCondition(e.target.value)}
                    className="w-full border rounded-xl p-2.5 text-xs font-semibold bg-white"
                  >
                    <option value="Unused with Tags">Unused with Tags</option>
                    <option value="Opened Box / Like New">Opened Box / Like New</option>
                    <option value="Defective / Damaged">Defective / Damaged</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Refund / Action Method *</label>
                  <select
                    value={returnRefundMethod}
                    onChange={(e) => setReturnRefundMethod(e.target.value)}
                    className="w-full border rounded-xl p-2.5 text-xs font-semibold bg-white"
                  >
                    <option value="Store Credit">Store Credit Voucher</option>
                    <option value="Replacement Shipment">Send Replacement Product</option>
                    <option value="Original Payment Refund">Refund to Original Payment</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t font-bold">
                  <button
                    type="button"
                    onClick={() => setShowReturnModal(false)}
                    className="px-3.5 py-2 border rounded-xl text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      persistOrderUpdate({ orderStatus: "Return Processing" }, "Admin", returnReason);
                      setReturnSuccessMessage("Return request submitted and order status set to Return Processing");
                      setTimeout(() => {
                        setShowReturnModal(false);
                        setReturnSuccessMessage("");
                      }, 2000);
                    }}
                    className="px-4 py-2 bg-[#c45d2a] text-white rounded-xl hover:bg-[#a64c1f]"
                  >
                    Confirm Return
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}