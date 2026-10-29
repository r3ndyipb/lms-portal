import React from "react";
import StudentPortalShell from "@/components/StudentPortalShell";

export const metadata = {
  title: "Katalog Kelas & Kurikulum — ANVIEO Academy LMS",
  description: "Daftar lengkap kelas pembelajaran dengan filter tingkat, topik, dan tipe kelas.",
};

export default function CoursesPage() {
  return <StudentPortalShell initialNav="kelas" />;
}
