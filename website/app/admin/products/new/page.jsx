"use client";

import React, { Suspense } from "react";
import ProductForm from "../../../../components/ProductForm";

export default function AddProductPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs font-bold text-[#18382a]">Loading Product Form...</div>}>
      <ProductForm initialMode="create" />
    </Suspense>
  );
}
