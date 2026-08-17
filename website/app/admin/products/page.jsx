"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminProductsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#f7f3ec] flex items-center justify-center p-4 text-sm font-semibold text-[#18382a]">
      Loading Products Catalogue...
    </div>
  );
}
