import React from "react";
import StudentPortalShell from "@/components/StudentPortalShell";

export const metadata = {
  title: "Program Beasiswa Terbaru — ANVIEO Academy LMS",
  description: "Daftar program beasiswa teknologi terbaru hasil kerjasama dengan kementerian dan mitra industri.",
};

export default function ProgramsPage() {
  return <StudentPortalShell initialNav="program" />;
}
