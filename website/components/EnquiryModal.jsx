"use client";

import React, { useState } from "react";
import { useEnquiry } from "../context/EnquiryContext";

export default function EnquiryModal() {
  const {
    enquiryBucket,
    removeFromEnquiry,
    isEnquiryOpen,
    openEnquiryModal,
    closeEnquiryModal,
  } = useEnquiry();

  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [customerCity, setCustomerCity] = useState("");

  const handleSendWhatsapp = () => {
    if (!enquiryBucket.length) {
      alert("Please add at least one product.");
      return;
    }

    if (
      customerName.trim() === "" ||
      customerMobile.trim() === "" ||
      customerCity.trim() === ""
    ) {
      alert("Please fill all details.");
      return;
    }

    let message = `Hi MotoTrek,

I would like to enquire about the following products:

`;

    enquiryBucket.forEach((product, index) => {
      message += `${index + 1}. ${product.name}
Price: ${product.price}

`;
    });

    message += `--------------------------------

Customer Details

Name: ${customerName}

Phone: ${customerMobile}

Location: ${customerCity}

Please let me know the availability and pricing.

Thank you.`;

    window.open(
      "https://wa.me/919511901753?text=" + encodeURIComponent(message),
      "_blank"
    );
  };

  return (
    <>
      {/* FLOATING ENQUIRY BUTTON */}
      <button
        id="enquiryBtn"
        onClick={openEnquiryModal}
        style={{ display: enquiryBucket.length ? "flex" : "none" }}
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 bg-[#18382a] text-white px-5 py-3 rounded-full shadow-xl z-[9998] hover:bg-[#c45d2a] transition"
      >
        📋 My Enquiry (<span id="enquiryCount">{enquiryBucket.length}</span>)
      </button>

      {/* ENQUIRY POPUP */}
      {isEnquiryOpen && (
        <div
          id="enquiryModal"
          style={{ display: "flex" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 py-6 overflow-y-auto"
          onClick={closeEnquiryModal}
        >
          <div
            className="relative bg-white w-full max-w-[560px] max-h-[90vh] mx-auto rounded-3xl flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <h3 className="text-2xl font-bold">Your Enquiry</h3>

              <button
                id="closeEnquiryTop"
                onClick={closeEnquiryModal}
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-black transition text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            <div
              id="selectedProductsList"
              className="flex-1 overflow-y-auto px-6 py-5 space-y-3"
            >
              {!enquiryBucket.length ? (
                <p className="text-center text-gray-500 py-6">
                  No products selected yet.
                </p>
              ) : (
                enquiryBucket.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded-xl object-cover border border-gray-200 flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-[15px] leading-5 text-[#18382a]">
                        {product.name}
                      </h4>

                      <p className="text-sm text-gray-500 mt-1">
                        {product.price}
                      </p>
                    </div>

                    <button
                      className="remove-product text-sm font-medium text-red-500 hover:text-red-700 transition"
                      data-id={product.id}
                      onClick={() => removeFromEnquiry(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="border-t bg-white px-6 py-5 sm:px-8 sm:py-6">
              <input
                id="customerName"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Your Name"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base mb-4 focus:border-[#18382a] focus:ring-2 focus:ring-[#18382a]/10 outline-none transition"
              />

              <input
                id="customerMobile"
                type="tel"
                value={customerMobile}
                onChange={(e) => setCustomerMobile(e.target.value)}
                placeholder="Mobile Number"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base mb-4 focus:border-[#18382a] focus:ring-2 focus:ring-[#18382a]/10 outline-none transition"
              />

              <input
                id="customerCity"
                type="text"
                value={customerCity}
                onChange={(e) => setCustomerCity(e.target.value)}
                placeholder="City"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base mb-4 focus:border-[#18382a] focus:ring-2 focus:ring-[#18382a]/10 outline-none transition"
              />

              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <button
                  id="sendWhatsapp"
                  onClick={handleSendWhatsapp}
                  className="flex-1 flex items-center justify-center min-h-[56px] sm:min-h-[56px] px-6 rounded-xl bg-[#18382a] text-white text-lg font-semibold leading-none hover:bg-[#c45d2a] transition"
                >
                  Send WhatsApp Enquiry
                </button>

                <button
                  id="closeEnquiry"
                  onClick={closeEnquiryModal}
                  className="flex items-center justify-center min-h-[56px] px-8 rounded-xl border border-gray-300 text-lg font-medium hover:bg-gray-100 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
