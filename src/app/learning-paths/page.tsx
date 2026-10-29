import React from "react";
import StudentPortalShell from "@/components/StudentPortalShell";

export const metadata = {
  title: "Learning Path Karir — ANVIEO Academy LMS",
  description: "Jalur belajar kurikulum terstruktur yang dipetakan berdasarkan target profesi karir.",
};

export default function LearningPathsPage() {
  return <StudentPortalShell initialNav="learning-path" />;
}
