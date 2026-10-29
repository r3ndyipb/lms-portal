import React from "react";
import StudentPortalShell from "@/components/StudentPortalShell";

export const metadata = {
  title: "Mentoring 1-on-1 dengan Pakar — ANVIEO Academy LMS",
  description: "Sesi mentoring privat 1-on-1 dengan pakar industri teknologi terkurasi.",
};

export default function MentoringPage() {
  return <StudentPortalShell initialNav="mentoring" />;
}
