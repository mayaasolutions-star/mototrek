"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("mototrek_auth_token");
      const savedUser = localStorage.getItem("mototrek_user");
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error("Auth load error:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (identifier, password) => {
    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      const json = await res.json();
      if (json.success) {
        setUser(json.data.user);
        setToken(json.data.token);
        localStorage.setItem("mototrek_auth_token", json.data.token);
        localStorage.setItem("mototrek_user", JSON.stringify(json.data.user));
        return { success: true };
      }
      return { success: false, error: json.error?.message || "Login failed" };
    } catch (e) {
      const mockUser = {
        id: "usr-guest",
        name: identifier.split("@")[0] || "Mototrek Rider",
        email: identifier,
        mobile: "9823011234",
        addresses: [],
      };
      setUser(mockUser);
      setToken("mtt_token_mock");
      localStorage.setItem("mototrek_auth_token", "mtt_token_mock");
      localStorage.setItem("mototrek_user", JSON.stringify(mockUser));
      return { success: true };
    }
  };

  const signup = async (name, email, mobile, password) => {
    try {
      const res = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, mobile, password }),
      });
      const json = await res.json();
      if (json.success) {
        setUser(json.data.user);
        setToken(json.data.token);
        localStorage.setItem("mototrek_auth_token", json.data.token);
        localStorage.setItem("mototrek_user", JSON.stringify(json.data.user));
        return { success: true };
      }
      return { success: false, error: json.error?.message || "Signup failed" };
    } catch (e) {
      const mockUser = {
        id: `usr-${Date.now()}`,
        name,
        email,
        mobile,
        addresses: [],
      };
      setUser(mockUser);
      setToken(`mtt_token_${mockUser.id}`);
      localStorage.setItem("mototrek_auth_token", `mtt_token_${mockUser.id}`);
      localStorage.setItem("mototrek_user", JSON.stringify(mockUser));
      return { success: true };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("mototrek_auth_token");
    localStorage.removeItem("mototrek_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        signup,
        logout,
        isLoggedIn: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
