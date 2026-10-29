"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PortalHeader from "./PortalHeader";
import PortalSidebar from "./PortalSidebar";
import PortalDashboardPreview from "./PortalDashboardPreview";
import PortalProgressPage from "./PortalProgressPage";
import PortalSubscriptionPage from "./PortalSubscriptionPage";
import PortalCoursesPage from "./PortalCoursesPage";
import PortalLearningPathPage from "./PortalLearningPathPage";
import PortalProgramsPage from "./PortalProgramsPage";
import PortalBlogPage from "./PortalBlogPage";
import PortalEventsPage from "./PortalEventsPage";
import PortalMentoringPage from "./PortalMentoringPage";
import PortalJobsPage from "./PortalJobsPage";
import PortalKoridorPage from "./PortalKoridorPage";
import PortalClassroomView from "./PortalClassroomView";

export type PortalNavId =
  | "beranda"
  | "progres"
  | "langganan"
  | "referral"
  | "kelas"
  | "learning-path"
  | "program"
  | "blog"
  | "event"
  | "mentoring"
  | "jobs"
  | "koridor-kelas"
  | "classroom";

interface StudentPortalShellProps {
  initialNav?: PortalNavId;
}

export default function StudentPortalShell({ initialNav = "beranda" }: StudentPortalShellProps) {
  const router = useRouter();
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [activeNav, setActiveNav] = useState<PortalNavId>(initialNav);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedKoridorCourse, setSelectedKoridorCourse] = useState<string>("Memulai Pemrograman dengan Python");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("portal_user");
      if (!user) {
        router.replace("/login");
        return;
      }
      setIsAuthReady(true);

      const stored = localStorage.getItem("portal_sidebar_collapsed");
      if (stored !== null) {
        setSidebarCollapsed(stored === "true");
      }

      // Read initial URL hash
      const parseHash = () => {
        const hash = window.location.hash.replace("#", "").toLowerCase() as PortalNavId | "belajar";
        if (
          hash === "classroom" ||
          hash === "belajar"
        ) {
          setActiveNav("classroom");
        } else if (
          hash === "progres" ||
          hash === "langganan" ||
          hash === "referral" ||
          hash === "kelas" ||
          hash === "learning-path" ||
          hash === "program" ||
          hash === "blog" ||
          hash === "event" ||
          hash === "mentoring" ||
          hash === "jobs" ||
          hash === "koridor-kelas"
        ) {
          setActiveNav(hash as PortalNavId);
        } else if (hash === "beranda" || hash === "home") {
          setActiveNav("beranda");
        }
      };

      parseHash();
      window.addEventListener("hashchange", parseHash);
      return () => window.removeEventListener("hashchange", parseHash);
    }
  }, []);

  // Ketika masuk / berada di halaman progres belajar, otomatis side menu menjadi minimalis
  useEffect(() => {
    if (activeNav === "progres") {
      setSidebarCollapsed(true);
    }
  }, [activeNav]);

  const handleToggleSidebar = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("portal_sidebar_collapsed", String(next));
      }
      return next;
    });
  };

  const handleSelectNav = (navId: string, courseTitle?: string) => {
    if (courseTitle) {
      setSelectedKoridorCourse(courseTitle);
    }
    const validNav = navId as PortalNavId;
    setActiveNav(validNav);
    if (validNav === "progres") {
      setSidebarCollapsed(true);
    }
    if (typeof window !== "undefined") {
      window.location.hash = validNav;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleOpenKoridor = (courseTitle?: string) => {
    if (courseTitle) {
      setSelectedKoridorCourse(courseTitle);
    }
    setActiveNav("koridor-kelas");
    if (typeof window !== "undefined") {
      window.location.hash = "koridor-kelas";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!isAuthReady) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bx-bg, #FBF8F1)",
          color: "var(--brand, #0A2E52)",
          gap: "14px",
        }}
      >
        <div className="portal-spinner" style={{ width: "28px", height: "28px" }} />
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "0.95rem",
            fontWeight: "700",
            letterSpacing: "0.02em",
          }}
        >
          Memuat Portal Belajar...
        </span>
      </div>
    );
  }

  // Jika sedang membuka Kelas Belajar (Classroom Viewer Mode), tampilkan full-screen tanpa sidebar luar
  if (activeNav === "classroom") {
    return (
      <PortalClassroomView
        courseTitle={selectedKoridorCourse}
        onBackToKoridor={() => handleSelectNav("koridor-kelas")}
      />
    );
  }

  return (
    <div className="portal-app-layout">
      {/* Top Header */}
      <PortalHeader
        currentPage="dashboard"
        onToggleSidebar={handleToggleSidebar}
        isSidebarCollapsed={sidebarCollapsed}
      />

      {/* Main Body: Collapsible Left Sidebar + Stage */}
      <div className="portal-app-body">
        <PortalSidebar
          collapsed={sidebarCollapsed}
          onToggle={handleToggleSidebar}
          activeId={activeNav}
          onSelectNav={handleSelectNav}
        />

        <div className={`portal-main-stage ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
          {/* Active View Router */}
          {activeNav === "beranda" && (
            <PortalDashboardPreview
              onNavigateNav={handleSelectNav}
              onOpenKoridor={handleOpenKoridor}
            />
          )}

          {activeNav === "progres" && (
            <PortalProgressPage
              onNavigateNav={handleSelectNav}
              onOpenKoridor={handleOpenKoridor}
            />
          )}

          {(activeNav === "langganan" || activeNav === "referral") && (
            <PortalSubscriptionPage />
          )}

          {activeNav === "kelas" && (
            <PortalCoursesPage onNavigateNav={handleSelectNav} />
          )}

          {activeNav === "learning-path" && (
            <PortalLearningPathPage onNavigateNav={handleSelectNav} />
          )}

          {activeNav === "program" && (
            <PortalProgramsPage onNavigateNav={handleSelectNav} />
          )}

          {activeNav === "blog" && (
            <PortalBlogPage />
          )}

          {activeNav === "event" && (
            <PortalEventsPage />
          )}

          {activeNav === "mentoring" && (
            <PortalMentoringPage />
          )}

          {activeNav === "jobs" && (
            <PortalJobsPage onNavigateNav={handleSelectNav} />
          )}

          {activeNav === "koridor-kelas" && (
            <PortalKoridorPage
              onNavigateNav={handleSelectNav}
              courseTitle={selectedKoridorCourse}
            />
          )}

          {/* Minimalist Student Footer Bar */}
          <footer className="portal-app-footer">
            <div className="portal-footer-fluid">
              <span>© 2026 ANVIEO Academy · High-Trust Multidisciplinary LMS. Standar Kurikulum Global.</span>
              <div style={{ display: "flex", gap: "16px" }}>
                <span>Ketentuan Layanan</span>
                <span>Kebijakan Privasi</span>
                <span>Bantuan Siswa</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
