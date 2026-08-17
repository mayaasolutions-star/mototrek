"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, Phone, User, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export default function RiderLoginPage() {
  const router = useRouter();
  const { login, signup } = useAuth();

  const [tab, setTab] = useState("login"); // "login" | "signup"
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await login(identifier, password);
    setLoading(false);
    if (res.success) {
      router.push("/account");
    } else {
      setError(res.error || "Login failed");
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signup(name, email, mobile, newPassword);
    setLoading(false);
    if (res.success) {
      router.push("/account");
    } else {
      setError(res.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f3ec] text-[#1f241f] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-10 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <img src="/images/mototrek-logo.webp" alt="Mototrek Logo" className="h-10 w-auto mx-auto" />
          <h1 className="text-xl font-bold text-[#18382a]">Mototrek Rider Portal</h1>
          <p className="text-xs text-gray-500">Access your orders, saved addresses & exclusive gear updates</p>
        </div>

        {/* TABS */}
        <div className="grid grid-cols-2 p-1 bg-gray-100 rounded-2xl text-xs font-bold">
          <button
            onClick={() => setTab("login")}
            className={`py-2.5 rounded-xl transition ${tab === "login" ? "bg-[#18382a] text-white shadow" : "text-gray-600 hover:text-gray-900"}`}
          >
            Rider Login
          </button>
          <button
            onClick={() => setTab("signup")}
            className={`py-2.5 rounded-xl transition ${tab === "signup" ? "bg-[#18382a] text-white shadow" : "text-gray-600 hover:text-gray-900"}`}
          >
            Create Account
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold text-center">
            {error}
          </div>
        )}

        {/* LOGIN FORM */}
        {tab === "login" ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Email or Mobile Number</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="rahul.s@gmail.com"
                  className="w-full border rounded-xl pl-9 pr-3 py-2.5 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border rounded-xl pl-9 pr-3 py-2.5 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#18382a] text-white rounded-2xl text-sm font-bold hover:bg-[#c45d2a] transition flex items-center justify-center gap-2"
            >
              <span>{loading ? "Authenticating..." : "Sign In to Account"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* SIGNUP FORM */
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rahul Sharma"
                className="w-full border rounded-xl px-3 py-2.5 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul@gmail.com"
                  className="w-full border rounded-xl px-3 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Mobile</label>
                <input
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="9823011234"
                  className="w-full border rounded-xl px-3 py-2.5 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border rounded-xl px-3 py-2.5 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#18382a] text-white rounded-2xl text-sm font-bold hover:bg-[#c45d2a] transition flex items-center justify-center gap-2"
            >
              <span>{loading ? "Creating Account..." : "Create Rider Profile"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 pt-2 border-t">
          <ShieldCheck className="w-4 h-4 text-green-600" />
          <span>Salted PBKDF2 Encrypted Server Authentication</span>
        </div>
      </div>
    </div>
  );
}
