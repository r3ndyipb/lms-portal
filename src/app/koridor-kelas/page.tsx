import React from "react";
import StudentPortalShell from "@/components/StudentPortalShell";

export const metadata = {
  title: "Detail Kelas & Koridor Belajar — Belajar Machine Learning untuk Pemula",
  description:
    "Pelajari dasar machine learning dengan fokus materi supervised learning, unsupervised learning, hingga teknik meningkatkan performa model.",
};

export default function KoridorKelasPage() {
  return <StudentPortalShell initialNav="koridor-kelas" />;
}
