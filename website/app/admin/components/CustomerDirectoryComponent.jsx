"use client";

import API_BASE from "../../../utils/api";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  Search,
  UserCheck,
  ShoppingBag,
  Receipt,
  Clock,
  Calendar,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ChevronRight,
  ArrowLeft,
  DollarSign,
  ShoppingCart,
  Activity,
  Award,
  Filter,
  CheckCircle2,
  AlertCircle,
  FileText,
  CreditCard,
  Building2,
  Tag,
} from "lucide-react";

export default function CustomerDirectoryComponent({
  customersList = [],
  ordersList = [],
  posBillsList = [],
  fetchAllAdminData,
  onOpenPosWithCustomer,
  onOpenOrderDetail,
}) {
  // VIEW STATE: "list" | "profile"
  const [activeView, setActiveView] = useState("list");
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [customerDetail, setCustomerDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // SEARCH & FILTER STATE FOR LIST TABLE
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all"); // all | Website | POS | Website + POS
  const [statusFilter, setStatusFilter] = useState("all"); // all | Active | Inactive

  // FETCH DETAILED CUSTOMER PROFILE
  const fetchCustomerProfile = (id) => {
    setLoadingDetail(true);
    fetch(`${API_BASE}/customers/${encodeURIComponent(id)}`)
      .then((res) => res.json())
      .then((json) => {
        setLoadingDetail(false);
        if (json.success) {
          setCustomerDetail(json.data);
          setSelectedCustomerId(id);
          setActiveView("profile");
        } else {
          alert("Customer profile not found");
        }
      })
      .catch((err) => {
        setLoadingDetail(false);
        console.log("Fetch customer profile error:", err);
      });
  };

  // FILTERED CUSTOMER DIRECTORY LIST
  const filteredCustomers = useMemo(() => {
    return (customersList || []).filter((cust) => {
      const q = (searchTerm || "").trim().toLowerCase();
      const matchSearch =
        !q ||
        (cust.id && cust.id.toLowerCase().includes(q)) ||
        (cust.name && cust.name.toLowerCase().includes(q)) ||
        (cust.mobile && cust.mobile.toLowerCase().includes(q)) ||
        (cust.email && cust.email.toLowerCase().includes(q));

      const matchSource =
        sourceFilter === "all" ||
        (cust.source && cust.source.toLowerCase() === sourceFilter.toLowerCase());

      const matchStatus =
        statusFilter === "all" ||
        (cust.status && cust.status.toLowerCase() === statusFilter.toLowerCase());

      return matchSearch && matchSource && matchStatus;
    });
  }, [customersList, searchTerm, sourceFilter, statusFilter]);

  // DATE FORMATTER HELPER
  const formatDate = (isoString) => {
    if (!isoString) return "—";
    try {
      const d = new Date(isoString);
      if (isNaN(d.getTime())) return "—";
      return d.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "—";
    }
  };

  const formatDateShort = (isoString) => {
    if (!isoString) return "—";
    try {
      const d = new Date(isoString);
      if (isNaN(d.getTime())) return "—";
      return d.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "—";
    }
  };

  return (
    <div className="space-y-5">
      {/* DIRECTORY HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#18382a] flex items-center gap-2.5">
            <Users className="w-6 h-6 text-[#c45d2a]" />
            <span>Unified Customer Directory</span>
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            Single relational master record connecting Website accounts, Online orders & Physical Store POS sales
          </p>
        </div>

        {activeView === "profile" ? (
          <button
            type="button"
            onClick={() => {
              setActiveView("list");
              setCustomerDetail(null);
            }}
            className="px-4 py-2 rounded-xl bg-[#18382a] text-white text-xs font-bold hover:bg-[#234e3b] transition flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Customer Directory</span>
          </button>
        ) : (
          <div className="flex items-center gap-3 text-xs font-bold text-gray-700 bg-gray-50 px-4 py-2 rounded-xl border">
            <span>Total Registered Riders: <strong className="text-[#18382a]">{customersList.length}</strong></span>
          </div>
        )}
      </div>

      {/* VIEW 1: DIRECTORY LIST TABLE */}
      {activeView === "list" && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-5 space-y-4">
          {/* SEARCH & FILTERS BAR */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="relative min-w-[280px]">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Customer ID (MTK-C-00001), Name, Phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border rounded-xl pl-10 pr-3 py-2.5 font-medium text-xs focus:outline-none focus:border-[#18382a] shadow-2xs"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 font-semibold">
              <div className="flex items-center gap-1 text-gray-500 mr-1">
                <Filter className="w-3.5 h-3.5 text-gray-400" />
                <span>Filters:</span>
              </div>

              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="border rounded-xl px-3 py-2 bg-white text-gray-700 font-semibold"
              >
                <option value="all">All Sources</option>
                <option value="Website">Website Only</option>
                <option value="POS">Store / POS Only</option>
                <option value="Website + POS">Website + POS</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border rounded-xl px-3 py-2 bg-white text-gray-700 font-semibold"
              >
                <option value="all">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* CUSTOMER MASTER DIRECTORY TABLE */}
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="uppercase font-bold text-[11px] text-gray-400 bg-gray-50 border-b">
                  <th className="p-3.5">Customer ID</th>
                  <th className="p-3.5">Rider Details</th>
                  <th className="p-3.5">Phone Number</th>
                  <th className="p-3.5 text-center">Total Purchases</th>
                  <th className="p-3.5 text-right">Lifetime Spent</th>
                  <th className="p-3.5">Last Active</th>
                  <th className="p-3.5">Source</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-center">Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-16 text-center text-xs text-gray-400 font-semibold">
                      No customer records match "{searchTerm}".
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((cust) => (
                    <tr
                      key={cust.id}
                      className="hover:bg-gray-50/80 transition cursor-pointer"
                      onClick={() => fetchCustomerProfile(cust.id)}
                    >
                      <td className="p-3.5 font-mono font-bold text-[#18382a]">
                        {cust.id}
                      </td>
                      <td className="p-3.5">
                        <p className="font-bold text-xs text-gray-900 leading-snug">
                          {cust.name}
                        </p>
                        <p className="text-[11px] text-gray-500 font-medium">
                          {cust.email || "No email on record"}
                        </p>
                      </td>
                      <td className="p-3.5 font-medium text-gray-700">
                        {cust.mobile ? `+91 ${cust.mobile}` : "—"}
                      </td>
                      <td className="p-3.5 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                          {cust.totalOrders || 0} Orders
                        </span>
                      </td>
                      <td className="p-3.5 text-right font-bold text-gray-900">
                        ₹{(cust.totalSpent || 0).toLocaleString()}
                      </td>
                      <td className="p-3.5 text-gray-500 font-medium">
                        {formatDateShort(cust.lastActive || cust.createdAt)}
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            cust.source === "Website + POS"
                              ? "bg-purple-50 text-purple-800 border-purple-200"
                              : cust.source === "POS"
                              ? "bg-blue-50 text-blue-800 border-blue-200"
                              : "bg-emerald-50 text-emerald-800 border-emerald-200"
                          }`}
                        >
                          {cust.source || "Website"}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            cust.status === "Inactive"
                              ? "bg-gray-100 text-gray-600"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {cust.status || "Active"}
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <Link
                          href={`/admin/customers/${encodeURIComponent(cust.id)}`}
                          onClick={(e) => e.stopPropagation()}
                          className="px-3 py-1 bg-[#18382a] text-white rounded-lg font-bold hover:bg-[#234e3b] transition text-[11px] inline-block"
                        >
                          View Profile
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 2: FULL UNIFIED CUSTOMER PROFILE */}
      {activeView === "profile" && (
        <div className="space-y-6">
          {loadingDetail ? (
            <div className="bg-white p-12 rounded-2xl border text-center text-xs font-bold text-gray-500">
              Loading unified rider profile...
            </div>
          ) : !customerDetail ? (
            <div className="bg-white p-12 rounded-2xl border text-center text-xs font-bold text-red-600">
              Customer profile data unavailable.
            </div>
          ) : (
            <>
              {/* PROFILE HEADER CARD */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#18382a] text-white font-black text-2xl flex items-center justify-center shadow">
                      {customerDetail.name ? customerDetail.name.charAt(0).toUpperCase() : "R"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                          {customerDetail.name}
                        </h2>
                        <span className="font-mono font-bold px-2.5 py-0.5 rounded-lg bg-[#18382a]/10 text-[#18382a] text-xs">
                          {customerDetail.id}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            customerDetail.source === "Website + POS"
                              ? "bg-purple-50 text-purple-800 border-purple-200"
                              : customerDetail.source === "POS"
                              ? "bg-blue-50 text-blue-800 border-blue-200"
                              : "bg-emerald-50 text-emerald-800 border-emerald-200"
                          }`}
                        >
                          {customerDetail.source || "Website"}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-800">
                          {customerDetail.status || "Active"}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mt-1 flex-wrap">
                        <span className="flex items-center gap-1 text-gray-800 font-semibold">
                          <Phone className="w-3.5 h-3.5 text-[#c45d2a]" />
                          {customerDetail.mobile ? `+91 ${customerDetail.mobile}` : "No phone"}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-gray-400" />
                          {customerDetail.email || "No email"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {onOpenPosWithCustomer && (
                      <button
                        type="button"
                        onClick={() => onOpenPosWithCustomer(customerDetail)}
                        className="px-3.5 py-2 bg-[#c45d2a] text-white rounded-xl text-xs font-bold hover:bg-[#a64c1f] transition shadow flex items-center gap-1.5"
                      >
                        <Receipt className="w-4 h-4 text-white" />
                        <span>Create POS Bill</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 1. CUSTOMER OVERVIEW METRICS */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-xs">
                  <div className="bg-gray-50 p-3 rounded-xl border text-center">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Total Orders</p>
                    <p className="text-lg font-bold text-gray-900 mt-0.5">{customerDetail.totalOrders || 0}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl border text-center">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Completed</p>
                    <p className="text-lg font-bold text-green-600 mt-0.5">{customerDetail.completedOrders || 0}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl border text-center">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Cancelled</p>
                    <p className="text-lg font-bold text-red-600 mt-0.5">{customerDetail.cancelledOrders || 0}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl border text-center">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Total Spent</p>
                    <p className="text-lg font-bold text-[#18382a] mt-0.5">₹{(customerDetail.totalSpent || 0).toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl border text-center">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Avg Order Value</p>
                    <p className="text-lg font-bold text-gray-900 mt-0.5">₹{(customerDetail.avgOrderValue || 0).toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl border text-center">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">First Purchase</p>
                    <p className="text-xs font-bold text-gray-800 mt-1">{formatDateShort(customerDetail.firstPurchase)}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl border text-center">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Last Purchase</p>
                    <p className="text-xs font-bold text-gray-800 mt-1">{formatDateShort(customerDetail.lastPurchase)}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl border text-center">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Active Cart</p>
                    <p className="text-xs font-bold text-[#c45d2a] mt-1">{customerDetail.cart ? `₹${customerDetail.cart.total || 0}` : "Empty"}</p>
                  </div>
                </div>
              </div>

              {/* GRID: 2 COLUMNS SUMMARY (ACCOUNT INFO + WEBSITE ACTIVITY) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 2. ACCOUNT INFORMATION CARD */}
                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-3 text-xs">
                  <h3 className="font-bold text-sm text-[#18382a] border-b pb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#c45d2a]" />
                    Account Information
                  </h3>

                  <div className="space-y-2 text-gray-700 font-medium">
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-400 font-semibold">Customer Permanent ID:</span>
                      <span className="font-mono font-bold text-gray-900">{customerDetail.id}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-400 font-semibold">Full Name:</span>
                      <span className="font-bold text-gray-900">{customerDetail.name}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-400 font-semibold">Primary Phone Number:</span>
                      <span className="font-bold text-gray-900">{customerDetail.mobile ? `+91 ${customerDetail.mobile}` : "—"}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-400 font-semibold">Email Address:</span>
                      <span className="font-semibold text-gray-900">{customerDetail.email || "—"}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-400 font-semibold">Account Created:</span>
                      <span className="font-medium text-gray-900">{formatDate(customerDetail.createdAt)}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-400 font-semibold">Account Source:</span>
                      <span className="font-bold text-gray-900">{customerDetail.source || "Website"}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-400 font-semibold">Last Activity:</span>
                      <span className="font-medium text-gray-900">{formatDate(customerDetail.lastActive)}</span>
                    </div>
                  </div>
                </div>

                {/* 3. WEBSITE ACTIVITY & CURRENT CART */}
                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-3 text-xs">
                  <h3 className="font-bold text-sm text-[#18382a] border-b pb-2 flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-[#c45d2a]" />
                    Website Activity & Current Active Cart
                  </h3>

                  {!customerDetail.cart || !customerDetail.cart.items || customerDetail.cart.items.length === 0 ? (
                    <div className="py-8 text-center text-gray-400 font-medium">
                      <ShoppingCart className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="font-bold text-gray-600">No items currently in cart.</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Rider has no active web checkout session.</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="font-bold text-gray-700">Active Website Cart Items:</p>
                      <div className="border rounded-xl overflow-hidden divide-y">
                        {customerDetail.cart.items.map((item, idx) => (
                          <div key={idx} className="p-2.5 flex items-center justify-between">
                            <div>
                              <p className="font-bold text-gray-900">{item.name}</p>
                              <p className="text-[11px] text-gray-500">{item.variant} • Qty {item.quantity}</p>
                            </div>
                            <p className="font-bold text-[#18382a]">₹{(item.total || 0).toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between font-bold text-sm text-[#18382a] pt-1">
                        <span>Cart Total:</span>
                        <span>₹{(customerDetail.cart.total || 0).toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 4. UNIFIED ORDER & POS PURCHASE HISTORY */}
              <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h3 className="font-bold text-sm text-[#18382a] flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-[#c45d2a]" />
                      Combined Website Orders & Physical Store POS Purchases
                    </h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Unified transaction ledger across online website & physical store counter
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto min-h-[250px]">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="uppercase font-bold text-[11px] text-gray-400 bg-gray-50 border-b">
                        <th className="p-3">Order / Bill ID</th>
                        <th className="p-3">Date & Time</th>
                        <th className="p-3">Items Purchased</th>
                        <th className="p-3">Source</th>
                        <th className="p-3 text-right">Grand Total</th>
                        <th className="p-3">Payment</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {!customerDetail.orderHistory || customerDetail.orderHistory.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-12 text-center text-xs text-gray-400 font-semibold">
                            No purchases recorded for this customer.
                          </td>
                        </tr>
                      ) : (
                        customerDetail.orderHistory.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50 transition">
                            <td className="p-3 font-mono font-bold text-[#18382a]">{item.id}</td>
                            <td className="p-3 text-gray-600 font-medium">{formatDate(item.date)}</td>
                            <td className="p-3">
                              <p className="font-bold text-gray-900">{item.itemsCount} items</p>
                              <p className="text-[11px] text-gray-500 font-medium truncate max-w-xs">
                                {(item.items || []).map((i) => i.name).join(", ")}
                              </p>
                            </td>
                            <td className="p-3">
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                                  item.source === "Store / POS"
                                    ? "bg-blue-50 text-blue-800 border-blue-200"
                                    : "bg-emerald-50 text-emerald-800 border-emerald-200"
                                }`}
                              >
                                {item.source}
                              </span>
                            </td>
                            <td className="p-3 text-right font-bold text-gray-900">
                              ₹{(item.total || 0).toLocaleString()}
                            </td>
                            <td className="p-3 font-medium text-gray-700">{item.paymentMethod}</td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  item.status === "Delivered" || item.status === "Completed"
                                    ? "bg-green-100 text-green-800"
                                    : item.status === "Cancelled"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              {onOpenOrderDetail && item.rawOrder && (
                                <button
                                  type="button"
                                  onClick={() => onOpenOrderDetail(item.rawOrder)}
                                  className="px-2.5 py-1 bg-gray-100 border text-gray-800 rounded-lg font-bold hover:bg-gray-200 transition text-[11px]"
                                >
                                  View Order
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 5. ACTIVITY TIMELINE STREAM */}
              <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-[#18382a] border-b pb-2 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#c45d2a]" />
                  Chronological Rider Activity Stream
                </h3>

                <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                  {(!customerDetail.timeline || customerDetail.timeline.length === 0) ? (
                    <p className="text-xs text-gray-400 font-medium">No activity history available.</p>
                  ) : (
                    customerDetail.timeline.map((event, idx) => (
                      <div key={event.id || idx} className="relative flex items-start gap-3 text-xs">
                        <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-[#18382a] ring-4 ring-white" />
                        <div>
                          <p className="font-bold text-gray-900">{event.title}</p>
                          <p className="text-[11px] text-gray-500 font-medium">{event.detail}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{formatDate(event.time)}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}