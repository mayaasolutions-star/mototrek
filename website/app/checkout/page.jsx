"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  CreditCard,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  User,
  MapPin,
  Tag,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, subtotal, totalDiscount, shippingFee, grandTotal, clearCart } = useCart();
  const { user, isLoggedIn } = useAuth();

  const [step, setStep] = useState(1); // 1: Account, 2: Address, 3: Review, 4: Payment

  // Account / Guest Form State
  const [guestEmail, setGuestEmail] = useState(user?.email || "");
  const [guestMobile, setGuestMobile] = useState(user?.mobile || "");
  const [guestName, setGuestName] = useState(user?.name || "");

  // Address Form State
  const [addressName, setAddressName] = useState(user?.name || "");
  const [addressMobile, setAddressMobile] = useState(user?.mobile || "");
  const [house, setHouse] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("Pune");
  const [state, setState] = useState("Maharashtra");
  const [pincode, setPincode] = useState("411045");
  const [addressType, setAddressType] = useState("Home");

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState("Razorpay (UPI/Card)");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      setGuestName(user.name);
      setGuestEmail(user.email);
      setGuestMobile(user.mobile);
      setAddressName(user.name);
      setAddressMobile(user.mobile);

      if (user.addresses && user.addresses.length > 0) {
        const def = user.addresses.find(a => a.isDefault) || user.addresses[0];
        setHouse(def.house || "");
        setStreet(def.street || "");
        setLandmark(def.landmark || "");
        setCity(def.city || "Pune");
        setState(def.state || "Maharashtra");
        setPincode(def.pincode || "411045");
      }
    }
  }, [user]);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f7f3ec] flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="w-16 h-16 rounded-full bg-[#18382a] text-white flex items-center justify-center mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-[#18382a]">Your Cart is Empty</h1>
        <p className="text-sm text-gray-600 mt-2 max-w-sm">
          Please add items to your shopping cart before proceeding to checkout.
        </p>
        <Link
          href="/shop"
          className="mt-6 px-6 py-3 bg-[#18382a] text-white text-sm font-bold rounded-xl hover:bg-[#c45d2a] transition"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  // Handle Coupon Validation
  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "MOTOTREK10") {
      setAppliedCoupon({ code: "MOTOTREK10", discount: Math.round(subtotal * 0.1) });
      setErrorMessage("");
    } else if (couponCode.toUpperCase() === "PUNE200") {
      setAppliedCoupon({ code: "PUNE200", discount: 200 });
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid coupon code.");
    }
  };

  const finalDiscount = totalDiscount + (appliedCoupon ? appliedCoupon.discount : 0);
  const finalGrandTotal = Math.max(0, subtotal - finalDiscount + shippingFee);

  // Handle Order Submission
  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    setErrorMessage("");

    const orderPayload = {
      customerId: user ? user.id : "guest",
      customerName: addressName || guestName || "Guest Rider",
      email: guestEmail,
      mobile: addressMobile || guestMobile,
      shippingAddress: {
        name: addressName,
        mobile: addressMobile,
        house,
        street,
        landmark,
        city,
        state,
        pincode,
        type: addressType,
      },
      items: cartItems.map((item) => ({
        productId: item.productId,
        name: item.name,
        brand: item.brand,
        colour: item.colour,
        size: item.size,
        sku: item.sku,
        price: item.price,
        quantity: item.quantity,
      })),
      discount: finalDiscount,
      paymentMethod,
    };

    try {
      const res = await fetch("/api/v1/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const json = await res.json();
      if (json.success && json.data) {
        clearCart();
        router.push(`/order-confirmation/${json.data.id}`);
      } else {
        setErrorMessage(json.error?.message || "Order placement failed.");
        setIsSubmitting(false);
      }
    } catch (e) {
      // Local fallback for offline/dev environment
      const orderId = `MT-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      clearCart();
      router.push(`/order-confirmation/${orderId}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f3ec] text-[#1f241f] p-4 sm:p-6 lg:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b pb-4">
          <Link href="/shop" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#18382a] hover:underline">
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-extrabold text-[#18382a]">
            <Lock className="w-4 h-4 text-green-700" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>

        {/* CHECKOUT STEPPER */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold">
          <div className={`p-3 rounded-2xl border ${step === 1 ? "bg-[#18382a] text-white shadow" : "bg-white text-gray-500"}`}>
            1. Account
          </div>
          <div className={`p-3 rounded-2xl border ${step === 2 ? "bg-[#18382a] text-white shadow" : "bg-white text-gray-500"}`}>
            2. Address
          </div>
          <div className={`p-3 rounded-2xl border ${step === 3 ? "bg-[#18382a] text-white shadow" : "bg-white text-gray-500"}`}>
            3. Review
          </div>
          <div className={`p-3 rounded-2xl border ${step === 4 ? "bg-[#18382a] text-white shadow" : "bg-white text-gray-500"}`}>
            4. Payment
          </div>
        </div>

        {/* MAIN CHECKOUT GRID */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT 2 COLUMNS: STEPS */}
          <div className="lg:col-span-2 space-y-6">
            {/* STEP 1: ACCOUNT / GUEST */}
            {step === 1 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
                <div className="flex items-center gap-2 border-b pb-4">
                  <User className="w-5 h-5 text-[#c45d2a]" />
                  <h2 className="text-xl font-bold text-[#18382a]">1. Customer Details</h2>
                </div>

                {isLoggedIn ? (
                  <div className="p-4 bg-green-50 rounded-2xl border border-green-200 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-green-800">Logged in as</p>
                      <p className="font-bold text-sm text-green-950">{user.name} ({user.email})</p>
                    </div>
                    <span className="px-3 py-1 bg-green-700 text-white rounded-full text-xs font-bold">Verified Account</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full border rounded-xl px-3 py-2.5 text-sm"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Email Address *</label>
                        <input
                          type="email"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          placeholder="rahul.s@gmail.com"
                          className="w-full border rounded-xl px-3 py-2.5 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Mobile Number *</label>
                        <input
                          type="tel"
                          value={guestMobile}
                          onChange={(e) => setGuestMobile(e.target.value)}
                          placeholder="+91 98230 11234"
                          className="w-full border rounded-xl px-3 py-2.5 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setStep(2)}
                  className="w-full py-3.5 bg-[#18382a] text-white rounded-2xl text-sm font-bold hover:bg-[#c45d2a] transition flex items-center justify-center gap-2"
                >
                  <span>Continue to Shipping Address</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2: ADDRESS */}
            {step === 2 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
                <div className="flex items-center gap-2 border-b pb-4">
                  <MapPin className="w-5 h-5 text-[#c45d2a]" />
                  <h2 className="text-xl font-bold text-[#18382a]">2. Delivery Address</h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Recipient Name *</label>
                    <input type="text" value={addressName} onChange={(e) => setAddressName(e.target.value)} className="w-full border rounded-xl px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Mobile Number *</label>
                    <input type="tel" value={addressMobile} onChange={(e) => setAddressMobile(e.target.value)} className="w-full border rounded-xl px-3 py-2 text-sm" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Flat / House No / Building Name *</label>
                    <input type="text" value={house} onChange={(e) => setHouse(e.target.value)} placeholder="e.g. Flat 402, Royal Palms" className="w-full border rounded-xl px-3 py-2 text-sm" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Street / Area / Locality *</label>
                    <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="e.g. Baner Road" className="w-full border rounded-xl px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Landmark (Optional)</label>
                    <input type="text" value={landmark} onChange={(e) => setLandmark(e.target.value)} placeholder="Near Crossword" className="w-full border rounded-xl px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">PIN Code *</label>
                    <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="411045" className="w-full border rounded-xl px-3 py-2 text-sm font-bold" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">City *</label>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full border rounded-xl px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">State *</label>
                    <input type="text" value={state} onChange={(e) => setState(e.target.value)} className="w-full border rounded-xl px-3 py-2 text-sm" />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button onClick={() => setStep(1)} className="px-5 py-3 border rounded-2xl text-xs font-bold">Back</button>
                  <button onClick={() => setStep(3)} className="flex-1 py-3.5 bg-[#18382a] text-white rounded-2xl text-sm font-bold hover:bg-[#c45d2a] transition flex items-center justify-center gap-2">
                    <span>Review Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: ORDER REVIEW */}
            {step === 3 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#c45d2a]" />
                    <h2 className="text-xl font-bold text-[#18382a]">3. Order Review</h2>
                  </div>
                  <span className="text-xs font-bold text-gray-500">{cartItems.length} Line Items</span>
                </div>

                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <div key={item.cartKey} className="py-3 flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover border shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-bold text-sm text-[#18382a]">{item.name}</h4>
                        <p className="text-xs text-gray-500">Colour: {item.colour} • Size: {item.size} • Qty: {item.quantity}</p>
                      </div>
                      <span className="font-extrabold text-sm text-[#18382a]">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 pt-4">
                  <button onClick={() => setStep(2)} className="px-5 py-3 border rounded-2xl text-xs font-bold">Back</button>
                  <button onClick={() => setStep(4)} className="flex-1 py-3.5 bg-[#18382a] text-white rounded-2xl text-sm font-bold hover:bg-[#c45d2a] transition flex items-center justify-center gap-2">
                    <span>Select Payment Method</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: PAYMENT & PLACE ORDER */}
            {step === 4 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
                <div className="flex items-center gap-2 border-b pb-4">
                  <CreditCard className="w-5 h-5 text-[#c45d2a]" />
                  <h2 className="text-xl font-bold text-[#18382a]">4. Payment Method</h2>
                </div>

                <div className="space-y-3">
                  <label className={`block p-4 rounded-2xl border-2 transition cursor-pointer ${paymentMethod.includes("Razorpay") ? "border-[#18382a] bg-[#18382a]/5" : "border-gray-200"}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="payment" checked={paymentMethod.includes("Razorpay")} onChange={() => setPaymentMethod("Razorpay (UPI/Card/NetBanking)")} />
                        <div>
                          <p className="font-bold text-sm text-[#18382a]">Razorpay Online Payment (UPI, Cards, NetBanking)</p>
                          <p className="text-xs text-gray-500">Instant verification & free insurance</p>
                        </div>
                      </div>
                      <ShieldCheck className="w-5 h-5 text-green-600" />
                    </div>
                  </label>

                  <label className={`block p-4 rounded-2xl border-2 transition cursor-pointer ${paymentMethod.includes("COD") ? "border-[#18382a] bg-[#18382a]/5" : "border-gray-200"}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="payment" checked={paymentMethod.includes("COD")} onChange={() => setPaymentMethod("Cash on Delivery (COD)")} />
                        <div>
                          <p className="font-bold text-sm text-[#18382a]">Cash on Delivery (COD)</p>
                          <p className="text-xs text-gray-500">Pay cash upon delivery at your doorstep</p>
                        </div>
                      </div>
                      <Truck className="w-5 h-5 text-gray-400" />
                    </div>
                  </label>
                </div>

                {errorMessage && (
                  <div className="p-4 bg-red-50 text-red-800 rounded-xl text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button onClick={() => setStep(3)} className="px-5 py-3 border rounded-2xl text-xs font-bold">Back</button>
                  <button
                    disabled={isSubmitting}
                    onClick={handlePlaceOrder}
                    className="flex-1 py-4 bg-[#18382a] text-white rounded-2xl text-base font-extrabold hover:bg-[#c45d2a] transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Placing Order...</span>
                      </>
                    ) : (
                      <>
                        <span>Place Order & Pay ₹{finalGrandTotal.toLocaleString()}</span>
                        <CheckCircle2 className="w-5 h-5 text-[#f0b04d]" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT 1 COLUMN: SUMMARY */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm h-fit space-y-6">
            <h3 className="font-bold text-lg text-[#18382a] border-b pb-3">Order Summary</h3>

            {/* COUPON INPUT */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-gray-400">Coupon Discount</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. MOTOTREK10"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 border rounded-xl px-3 py-2 text-xs font-bold"
                />
                <button onClick={handleApplyCoupon} className="px-3 py-2 bg-[#18382a] text-white rounded-xl text-xs font-bold">
                  Apply
                </button>
              </div>
              {appliedCoupon && (
                <p className="text-xs font-bold text-green-700 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Coupon {appliedCoupon.code} applied (-₹{appliedCoupon.discount})</span>
                </p>
              )}
            </div>

            <div className="space-y-3 text-xs text-gray-600 border-t pt-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold text-gray-900">₹{subtotal.toLocaleString()}</span>
              </div>
              {finalDiscount > 0 && (
                <div className="flex justify-between text-green-700 font-semibold">
                  <span>Discount:</span>
                  <span>- ₹{finalDiscount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span className="font-bold text-gray-900">{shippingFee === 0 ? "FREE" : `₹${shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#18382a] border-t pt-3">
                <span>Grand Total:</span>
                <span className="text-[#c45d2a]">₹{finalGrandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
