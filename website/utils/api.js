/**
 * Centralized API Base URL Resolver for Mototrek
 * Supports:
 * - Production Vercel environment variable: NEXT_PUBLIC_API_URL
 * - Localhost fallback: http://localhost:5000/api/v1
 */
const getApiBase = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl && envUrl.trim() !== "") {
    const cleaned = envUrl.trim().replace(/\/$/, "");
    return cleaned.endsWith("/api/v1") ? cleaned : `${cleaned}/api/v1`;
  }

  // Same-origin fallback for deployed environments without port hardcoding
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "http://localhost:5000/api/v1";
    }
    // Deployed relative or origin-based fallback
    return `${window.location.protocol}//${window.location.host}/api/v1`;
  }

  return "http://localhost:5000/api/v1";
};

export const API_BASE = getApiBase();
export default API_BASE;
