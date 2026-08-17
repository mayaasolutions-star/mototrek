"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  ShoppingBag,
  MapPin,
  LogOut,
  ChevronRight,
  Truck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Plus,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AccountDashboardPage() {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (isLoggedIn && user) {
      fetch(`/api/v1/orders?customerId=${user.id}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.success && Array.isArray(json.data)) {
            setOrders(json.data);
          }
        })
        .catch(() => {
          // Fallback mock orders for local dev
          setOrders([
            {
              id: "MT-ORD-10892",
              createdAt: "14 Aug 2026",
              items: [{ name: "Axor Apex Superfly Helmet", quantity: 1, price: 4994, colour: "Black", size: "L" }],
              grandTotal: 4994,
              orderStatus: "Shipped",
              paymentStatus: "Paid",
              awb: "BD-88291039",
            },
          ]);
        });
    }
  }, [isLoggedIn, user]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#f7f3ec] flex flex-col items-center justify-center p-6 text-center font-sans">
        <h1 className="text-2xl font-bold text-[#18382a]">Please Sign In</h1>
        <p className="text-xs text-gray-600 mt-2">Sign in to view your order history and saved addresses.</p>
        <Link href="/account/login" className="mt-6 px-6 py-3 bg-[#18382a] text-white text-xs font-bold rounded-xl hover:bg-[#c45d2a]">
          Go to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f3ec] text-[#1f241f] p-4 sm:p-6 lg:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* PROFILE BANNER */}
        <div className="bg-[#10281e] text-white p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-white/10 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#c45d2a] flex items-center justify-center font-bold text-xl text-white">
              {user.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">{user.name}</h1>
              <p className="text-xs text-white/70">{user.email} • {user.mobile}</p>
            </div>
          </div>

          <button
            onClick={() => { logout(); router.push("/"); }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition self-start sm:self-auto"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* ACCOUNT NAVIGATION TABS */}
        <div className="flex gap-2 border-b pb-2">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "orders" ? "bg-[#18382a] text-white shadow" : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>My Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("addresses")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "addresses" ? "bg-[#18382a] text-white shadow" : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses</span>
          </button>
        </div>

        {/* TAB 1: MY ORDERS */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-white p-8 rounded-3xl text-center border text-gray-500">
                <p className="font-bold text-base">No orders placed yet.</p>
                <Link href="/shop" className="mt-4 inline-block px-5 py-2 bg-[#18382a] text-white text-xs font-bold rounded-xl">
                  Start Shopping
                </Link>
              </div>
            ) : (
              orders.map((ord) => (
                <div key={ord.id} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
                    <div>
                      <span className="font-mono font-bold text-sm text-[#18382a]">{ord.id}</span>
                      <p className="text-xs text-gray-400">Placed on {ord.createdAt}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                        {ord.orderStatus || "Processing"}
                      </span>
                      <Link
                        href={`/track-order/${ord.id}`}
                        className="px-3.5 py-1.5 bg-[#18382a] text-white rounded-xl text-xs font-bold hover:bg-[#c45d2a] transition flex items-center gap-1"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Track Order</span>
                      </Link>
                    </div>
                  </div>

                  <div className="divide-y">
                    {(ord.items || []).map((item, idx) => (
                      <div key={idx} className="py-2 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-gray-900">{item.name}</p>
                          <p className="text-gray-500">{item.colour} / {item.size} • Qty: {item.quantity}</p>
                        </div>
                        <span className="font-bold text-[#18382a]">₹{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-xs font-bold border-t pt-3">
                    <span className="text-gray-500">Grand Total:</span>
                    <span className="text-base text-[#c45d2a]">₹{ord.grandTotal?.toLocaleString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: SAVED ADDRESSES */}
        {activeTab === "addresses" && (
          <div className="bg-white p-6 rounded-3xl border border-gray-200 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base text-[#18382a]">Saved Shipping Addresses</h3>
            </div>
            <p className="text-xs text-gray-500">Manage your delivery locations for faster checkout.</p>
          </div>
        )}
      </div>
    </div>
  );
}
