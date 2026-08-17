"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CheckCircle2, Truck, Package, ShoppingBag, ArrowRight, MapPin, Calendar } from "lucide-react";

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params?.id;
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`/api/v1/orders/${orderId}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setOrder(json.data);
        }
      })
      .catch(() => {
        setOrder({
          id: orderId,
          createdAt: new Date().toLocaleDateString(),
          customerName: "Mototrek Rider",
          shippingAddress: { city: "Pune", state: "Maharashtra" },
          grandTotal: 5999,
          items: [{ name: "Rynox Air GT Riding Jacket", colour: "Black", size: "XL", quantity: 1, price: 5999 }],
        });
      });
  }, [orderId]);

  return (
    <div className="min-h-screen bg-[#f7f3ec] text-[#1f241f] p-4 sm:p-6 lg:p-10 font-sans flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xl space-y-6 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#18382a]">Order Placed Successfully!</h1>
          <p className="text-xs text-gray-500 mt-1">
            Thank you for shopping with Mototrek. Your gear is being prepared for dispatch.
          </p>
        </div>

        <div className="p-4 bg-[#f7f3ec] rounded-2xl border text-xs text-left space-y-2 font-mono">
          <div className="flex justify-between border-b pb-2 font-sans font-bold">
            <span>Order Reference:</span>
            <span className="text-[#c45d2a]">{orderId}</span>
          </div>
          <div className="flex justify-between font-sans">
            <span className="text-gray-500">Expected Delivery:</span>
            <span className="font-bold text-green-700">3 - 5 Business Days</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href={`/track-order/${orderId}`}
            className="flex-1 py-3.5 bg-[#18382a] text-white rounded-2xl text-xs font-bold hover:bg-[#c45d2a] transition flex items-center justify-center gap-2"
          >
            <Truck className="w-4 h-4" />
            <span>Track Live Delivery Status</span>
          </Link>

          <Link
            href="/shop"
            className="py-3.5 px-6 border border-gray-300 rounded-2xl text-xs font-semibold text-gray-700 hover:bg-gray-50"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
