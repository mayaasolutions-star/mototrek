"use client";

import API_BASE from "../../../../utils/api";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ShoppingBag,
  DollarSign,
  Clock,
  Send,
  Edit,
  ExternalLink,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  MoreVertical,
  Tag,
  CreditCard,
  Building2,
} from "lucide-react";

export default function CustomerProfilePage() {
  const params = useParams();
  const router = useRouter();
  const customerId = params?.id ? decodeURIComponent(params.id) : "";

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState("generic"); // "connection" | "not_found" | "auth" | "generic"

  const fetchCustomer = async () => {
    if (!customerId) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/customers/${encodeURIComponent(customerId)}`);
      if (res.status === 401 || res.status === 403) {
        setErrorType("auth");
        setError("Your session has expired. Please sign in again.");
        return;
      }
      if (res.status === 404) {
        setErrorType("not_found");
        setError("Customer profile not found.");
        return;
      }

      const json = await res.json();
      if (json.success && json.data) {
        setCustomer(json.data);
      } else {
        setErrorType("not_found");
        setError(json.message || "Customer profile not found.");
      }
    } catch (err) {
      console.error("Failed to fetch customer profile:", err);
      setErrorType("connection");
      setError("Unable to connect to the Mototrek server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, [customerId]);

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

  const handleWhatsAppCustomer = () => {
    if (!customer?.mobile) {
      alert("Customer mobile number is unavailable.");
      return;
    }
    const cleanPhone = customer.mobile.replace(/[^0-9]/g, "");
    const msg = `Hello ${customer.name || 'Rider'},\n\nThis is Mototrek Pune regarding your account *${customer.id}*.\n\nHow may we assist you today? 🏍️`;
    window.open(
      `https://api.whatsapp.com/send?phone=${cleanPhone.length === 10 ? "91" + cleanPhone : cleanPhone}&text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f3ec] p-8 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-[#18382a] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-bold text-xs text-[#18382a]">Loading customer profile details...</p>
        </div>
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="min-h-screen bg-[#f7f3ec] p-8 flex items-center justify-center">
        <div className="bg-white p-6 rounded-2xl border max-w-md w-full text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto">
            {errorType === "auth" ? <ShieldAlert className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
          </div>
          <div className="space-y-1">
            <h2 className="font-bold text-base text-gray-900">
              {errorType === "connection"
                ? "Unable to connect to the Mototrek server."
                : errorType === "auth"
                ? "Your session has expired. Please sign in again."
                : errorType === "not_found"
                ? "Customer not found."
                : "Something went wrong while loading this customer."}
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              {error || "Check backend API connection or customer ID."}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              type="button"
              onClick={fetchCustomer}
              className="px-4 py-2 bg-[#18382a] text-white rounded-xl text-xs font-bold hover:bg-[#234e3b] transition flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
            <Link
              href="/admin?tab=customers"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-100 transition"
            >
              ← Back to Customers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f3ec] text-[#1f241f] font-sans flex flex-col">
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

          <div className="flex items-center gap-3">
            <Link
              href="/admin?tab=customers"
              className="text-xs font-semibold text-white/80 hover:text-white bg-white/10 px-3 py-1.5 rounded-lg transition"
            >
              ← Back to Customers Directory
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT WORKSPACE */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* BREADCRUMB */}
        <div>
          <Link
            href="/admin?tab=customers"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#18382a] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Unified Customer Directory</span>
          </Link>
        </div>

        {/* TOP CUSTOMER HEADER */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#18382a] text-white font-black text-2xl flex items-center justify-center shadow">
                {customer.name ? customer.name.charAt(0).toUpperCase() : "C"}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {customer.name}
                  </h1>
                  <span className="font-mono font-bold px-2.5 py-0.5 rounded-lg bg-[#18382a]/10 text-[#18382a] text-xs">
                    {customer.id}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      customer.source === "Website + POS"
                        ? "bg-purple-50 text-purple-800 border-purple-200"
                        : customer.source === "POS"
                        ? "bg-blue-50 text-blue-800 border-blue-200"
                        : "bg-emerald-50 text-emerald-800 border-emerald-200"
                    }`}
                  >
                    {customer.source || "Website"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-800">
                    {customer.status || "Active"}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mt-1 flex-wrap">
                  <span className="flex items-center gap-1 text-gray-800 font-semibold">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    {customer.mobile ? `+91 ${customer.mobile}` : "No phone"}
                  </span>
                  <span className="flex items-center gap-1 text-gray-800 font-semibold">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    {customer.email || "No email"}
                  </span>
                  <span className="flex items-center gap-1 text-gray-500">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    Registered: {formatDateShort(customer.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={handleWhatsAppCustomer}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-sm transition flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Contact via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => alert(`Customer ID ${customer.id} details up to date.`)}
                className="px-3.5 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>

          {/* FINANCIAL SUMMARY CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 text-xs">
              <p className="text-gray-400 font-bold uppercase text-[10px]">Total Purchases</p>
              <p className="text-lg font-bold text-[#18382a] mt-0.5">{customer.totalOrders || 0} Orders</p>
            </div>
            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 text-xs">
              <p className="text-gray-400 font-bold uppercase text-[10px]">Lifetime Spent</p>
              <p className="text-lg font-bold text-[#18382a] mt-0.5">₹{(customer.totalSpent || 0).toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 text-xs">
              <p className="text-gray-400 font-bold uppercase text-[10px]">Average Order Value</p>
              <p className="text-lg font-bold text-[#18382a] mt-0.5">₹{(customer.avgOrderValue || 0).toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 text-xs">
              <p className="text-gray-400 font-bold uppercase text-[10px]">Last Purchase Date</p>
              <p className="text-sm font-bold text-gray-900 mt-1">{formatDateShort(customer.lastPurchase || customer.lastActive)}</p>
            </div>
          </div>
        </div>

        {/* TWO-COLUMN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          
          {/* LEFT PANEL (70%): ORDER HISTORY */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h2 className="font-bold text-sm text-[#18382a] uppercase tracking-wide">
                  Order & Purchase History · {(customer.orderHistory || []).length} Records
                </h2>
              </div>

              {(!customer.orderHistory || customer.orderHistory.length === 0) ? (
                <div className="text-center py-12 text-gray-400 text-xs font-semibold">
                  No orders or POS purchases found for this rider.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="uppercase font-bold text-[11px] text-gray-400 bg-gray-50 border-b">
                        <th className="p-3">Order ID & Date</th>
                        <th className="p-3">Source</th>
                        <th className="p-3 text-center">Items</th>
                        <th className="p-3 text-right">Amount</th>
                        <th className="p-3">Payment</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {customer.orderHistory.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition">
                          <td className="p-3">
                            <p className="font-mono font-bold text-[#18382a]">{item.id}</p>
                            <p className="text-[10px] text-gray-400 font-mono">{formatDateShort(item.date)}</p>
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                              item.source === "Store / POS"
                                ? "bg-blue-50 text-blue-800 border-blue-200"
                                : "bg-emerald-50 text-emerald-800 border-emerald-200"
                            }`}>
                              {item.source}
                            </span>
                          </td>
                          <td className="p-3 text-center font-semibold text-gray-700">
                            {item.itemsCount}
                          </td>
                          <td className="p-3 text-right font-bold text-gray-900">
                            ₹{(item.total || 0).toLocaleString()}
                          </td>
                          <td className="p-3 font-semibold text-gray-700">
                            {item.paymentMethod || "Paid"}
                          </td>
                          <td className="p-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              item.status === "Delivered" || item.status === "Completed"
                                ? "bg-emerald-100 text-emerald-800"
                                : item.status === "Cancelled"
                                ? "bg-red-100 text-red-800"
                                : "bg-amber-100 text-amber-900"
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            {item.source === "Website" ? (
                              <Link
                                href={`/admin/orders/${encodeURIComponent(item.id)}`}
                                className="px-3 py-1 bg-[#18382a] text-white rounded-xl text-[11px] font-bold hover:bg-[#234e3b] transition inline-block"
                              >
                                View Order
                              </Link>
                            ) : (
                              <span className="text-[11px] font-semibold text-gray-400">POS Bill</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* CUSTOMER TIMELINE */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs space-y-3">
              <h2 className="font-bold text-sm text-[#18382a] border-b pb-2 uppercase tracking-wide">
                Customer Activity Audit Timeline
              </h2>
              <div className="relative pl-6 space-y-4 text-xs before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                {(customer.timeline || [
                  { id: "t1", time: customer.createdAt, title: "Account Created", detail: `Source: ${customer.source || 'Website'}` }
                ]).map((evt, idx) => (
                  <div key={idx} className="relative flex items-start gap-2">
                    <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#18382a] ring-4 ring-white" />
                    <div>
                      <p className="font-bold text-gray-900">{evt.title}</p>
                      <p className="text-[10px] text-gray-400 font-mono">
                        {formatDateTime(evt.time)}
                      </p>
                      {evt.detail && (
                        <p className="text-[11px] text-gray-600 font-medium mt-0.5">{evt.detail}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR (30%): CUSTOMER INFO CARD */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-2xs space-y-4 text-xs">
              <h3 className="font-bold text-xs text-[#18382a] uppercase tracking-wide border-b pb-2">
                Detailed Information
              </h3>
              
              <div className="space-y-3 text-gray-700 font-medium">
                <div>
                  <p className="text-gray-400 text-[10px] uppercase font-bold">Permanent Customer ID</p>
                  <p className="font-mono font-bold text-[#18382a] text-sm mt-0.5">{customer.id}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] uppercase font-bold">Full Name</p>
                  <p className="font-bold text-gray-900 mt-0.5">{customer.name}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] uppercase font-bold">Mobile Phone</p>
                  <p className="font-semibold text-gray-900 mt-0.5">{customer.mobile ? `+91 ${customer.mobile}` : "—"}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] uppercase font-bold">Email Address</p>
                  <p className="font-semibold text-gray-900 mt-0.5">{customer.email || "—"}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] uppercase font-bold">Primary Delivery Address</p>
                  <p className="text-gray-800 leading-relaxed font-medium mt-0.5">
                    {customer.address || customer.shippingAddress || "Walk-in Store Customer (Pune)"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] uppercase font-bold">Account Registration Date</p>
                  <p className="font-semibold text-gray-800 mt-0.5">{formatDateTime(customer.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}