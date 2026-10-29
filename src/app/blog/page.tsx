import React from "react";
import StudentPortalShell from "@/components/StudentPortalShell";

export const metadata = {
  title: "Tech Blog & Berita Edukasi — ANVIEO Academy LMS",
  description: "Artikel tutorial, wawasan teknologi, dan kabar terkini seputar rekayasa software dan AI.",
};

export default function BlogPage() {
  return <StudentPortalShell initialNav="blog" />;
}
