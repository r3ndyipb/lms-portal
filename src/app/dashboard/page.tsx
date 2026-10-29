import React from "react";
import StudentPortalShell from "@/components/StudentPortalShell";

export const metadata = {
  title: "Dashboard Siswa — ANVIEO Academy Portal",
  description: "Dashboard pembelajaran siswa ANVIEO Academy: akses silabus berjalan, feedback reviewer kode, dan asisten AI.",
};

export default function DashboardPage() {
  return <StudentPortalShell />;
}
