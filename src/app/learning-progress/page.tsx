import React from "react";
import StudentPortalShell from "@/components/StudentPortalShell";

export const metadata = {
  title: "Progres Belajar Siswa — ANVIEO Academy LMS",
  description: "Pantau kemajuan kelas yang dipelajari dan riwayat kelas yang diselesaikan di ANVIEO Academy.",
};

export default function LearningProgressPage() {
  return <StudentPortalShell initialNav="progres" />;
}
