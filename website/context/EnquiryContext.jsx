"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const EnquiryContext = createContext();

export function EnquiryProvider({ children }) {
  const [enquiryBucket, setEnquiryBucket] = useState([]);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  // Load initial bucket from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mototrek_enquiry");
      if (saved) {
        setEnquiryBucket(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save to localStorage when updated
  useEffect(() => {
    try {
      localStorage.setItem("mototrek_enquiry", JSON.stringify(enquiryBucket));
    } catch (e) {
      console.error(e);
    }
  }, [enquiryBucket]);

  const toggleEnquiry = (product) => {
    setEnquiryBucket((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const removeFromEnquiry = (id) => {
    setEnquiryBucket((prev) => prev.filter((item) => item.id !== id));
  };

  const isInEnquiry = (id) => {
    return enquiryBucket.some((item) => item.id === id);
  };

  const openEnquiryModal = () => setIsEnquiryOpen(true);
  const closeEnquiryModal = () => setIsEnquiryOpen(false);

  return (
    <EnquiryContext.Provider
      value={{
        enquiryBucket,
        toggleEnquiry,
        removeFromEnquiry,
        isInEnquiry,
        isEnquiryOpen,
        openEnquiryModal,
        closeEnquiryModal,
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error("useEnquiry must be used within an EnquiryProvider");
  }
  return context;
}
