import React from "react";
import StudentPortalShell from "@/components/StudentPortalShell";

export const metadata = {
  title: "Jobs & Stakeholder Talent Matching — ANVIEO Academy LMS",
  description: "Portal lowongan kerja teknologi dari berbagai perusahaan dan rekomendasi talenta berkualitas siap kerja.",
};

export default function JobsPage() {
  return <StudentPortalShell initialNav="jobs" />;
}
