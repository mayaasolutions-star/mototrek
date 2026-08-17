"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminBillingRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin?tab=pos");
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans text-xs font-bold text-gray-500">
      Loading POS Billing Terminal...
    </div>
  );
}
