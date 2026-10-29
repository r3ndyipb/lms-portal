"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PortalForumPage from "@/components/PortalForumPage";

function ForumContent() {
  const searchParams = useSearchParams();
  const courseTitle = searchParams.get("course") || "Memulai Pemrograman dengan Python";
  const topicTitle = searchParams.get("topic") || "";

  return <PortalForumPage initialCourseTitle={courseTitle} initialTopic={topicTitle} />;
}

export default function ForumPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            background: "#FBF8F1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "sans-serif",
            color: "#0A2E52",
            fontWeight: 700,
          }}
        >
          Memuat Forum Komunitas Siswa...
        </div>
      }
    >
      <ForumContent />
    </Suspense>
  );
}
