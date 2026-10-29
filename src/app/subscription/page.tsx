import React from "react";
import StudentPortalShell from "@/components/StudentPortalShell";

export const metadata = {
  title: "Langganan & Akses Penuh — ANVIEO Academy LMS",
  description: "Kelola paket langganan belajar, akses penuh seluruh fitur, dan daftar transaksi resmi ANVIEO Academy.",
};

export default function SubscriptionPage() {
  return <StudentPortalShell initialNav="langganan" />;
}
