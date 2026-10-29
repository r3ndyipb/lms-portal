"use client";

import React, { useState, useEffect } from "react";
import FlatIcon from "./FlatIcon";
import CertificateModal, { CertificateData } from "./CertificateModal";
import {
  UserProfile,
  ModuleNode,
  CurriculumProgress,
  CompletedClassItem,
  getProgressTheme,
  INITIAL_CURRICULA,
  INITIAL_COMPLETED_CLASSES,
} from "@/types/curriculum";

interface PortalProgressPageProps {
  onNavigateNav?: (navId: string) => void;
  onOpenKoridor?: (courseTitle?: string) => void;
}

export default function PortalProgressPage({ onNavigateNav, onOpenKoridor }: PortalProgressPageProps) {
  // Main Tab State: "in-progress" (Kelas yang di Pelajari) vs "completed" (Kelas yang di Selesaikan)
  const [activeMainTab, setActiveMainTab] = useState<"in-progress" | "completed">("in-progress");
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateData | null>(null);

  // Curricula state
  const [curricula, setCurricula] = useState<CurriculumProgress[]>(INITIAL_CURRICULA);
  const [selectedCurriculumId, setSelectedCurriculumId] = useState<string>("aws-ai-academy");
  const [expandedCurriculumIds, setExpandedCurriculumIds] = useState<string[]>(["aws-ai-academy"]);
  const [curriculumSubTabs, setCurriculumSubTabs] = useState<Record<string, "tree" | "reviewer" | "ai" | "milestones">>({
    "aws-ai-academy": "tree",
    "dbs-genai-adv": "tree",
    "fullstack-ai": "tree",
    "devops-cloud": "tree",
  });

  const toggleExpandCurriculum = (curriculumId: string) => {
    setExpandedCurriculumIds((prev) =>
      prev.includes(curriculumId)
        ? prev.filter((id) => id !== curriculumId)
        : [...prev, curriculumId]
    );
    setSelectedCurriculumId(curriculumId);
  };

  const getSubTab = (id: string) => curriculumSubTabs[id] || "tree";
  const setSubTab = (id: string, tab: "tree" | "reviewer" | "ai" | "milestones") => {
    setCurriculumSubTabs((prev) => ({ ...prev, [id]: tab }));
  };

  // Completed classes list
  const [completedClasses, setCompletedClasses] = useState<CompletedClassItem[]>(INITIAL_COMPLETED_CLASSES);

  // Subscription state
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // AI interactive prompt
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSub = localStorage.getItem("portal_subscribed");
      if (storedSub === "true") {
        setIsSubscribed(true);
      }
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const currentCurriculum =
    curricula.find((c) => c.id === selectedCurriculumId) || curricula[0];
  const activeTheme = getProgressTheme(currentCurriculum.progress);

  // Handler: Tandai review reviewer sudah dibaca -> badge hilang
  const handleMarkReviewRead = (curriculumId: string) => {
    setCurricula((prev) =>
      prev.map((c) => (c.id === curriculumId ? { ...c, unreadReviewsCount: 0 } : c))
    );
    showToast("Feedback reviewer telah ditandai sudah dibaca.");
  };

  // Handler: Buka Materi (Hijau) dengan proteksi freemium
  const handleOpenModule = (module: ModuleNode) => {
    if (module.access === "premium" && !isSubscribed) {
      alert(
        `[Materi Premium Terkunci]\n\nModul ${module.number}: "${module.title}" memerlukan paket langganan aktif.\n\nSilakan berlangganan di menu Langganan untuk membuka modul ini dan review kode unlimited.`
      );
      if (onNavigateNav) {
        onNavigateNav("langganan");
      }
      return;
    }
    alert(`Membuka materi belajar:\nModul ${module.number}: ${module.title}`);
  };

  // Handler: Simulasi Drop Out (DO)
  const handleToggleDropOut = (curriculumId: string) => {
    setCurricula((prev) =>
      prev.map((c) => {
        if (c.id === curriculumId) {
          const nextDO = !c.isDroppedOut;
          return {
            ...c,
            isDroppedOut: nextDO,
            isLearningPeriodExpired: nextDO ? true : c.isLearningPeriodExpired,
          };
        }
        return c;
      })
    );
  };

  // Handler: Simulasi Masa Belajar Selesai (Expired)
  const handleToggleExpired = (curriculumId: string) => {
    setCurricula((prev) =>
      prev.map((c) => {
        if (c.id === curriculumId) {
          const nextExpired = !c.isLearningPeriodExpired;
          return {
            ...c,
            isLearningPeriodExpired: nextExpired,
            daysRemaining: nextExpired ? 0 : 18,
          };
        }
        return c;
      })
    );
  };

  // Handler: Beli materi lagi setelah DO -> reset ke 0% dan mulai dari awal (Modul 1)
  const handleRebuyCurriculum = (curriculumId: string) => {
    setCurricula((prev) =>
      prev.map((c) => {
        if (c.id === curriculumId) {
          const resetStages = c.stages.map((stage, sIdx) => ({
            ...stage,
            status: sIdx === 0 ? ("current" as const) : ("locked" as const),
            progressText: sIdx === 0 ? "Sedang Berjalan (Modul 1)" : `Terkunci (0/${stage.modules.length} Modul)`,
            modules: stage.modules.map((m, mIdx) => ({
              ...m,
              status: sIdx === 0 && mIdx === 0 ? ("current" as const) : ("locked" as const),
              completedDate: undefined,
              score: undefined,
            })),
          }));

          return {
            ...c,
            progress: 0,
            completedModules: 0,
            daysRemaining: c.learningPeriodTotalDays,
            isDroppedOut: false,
            isLearningPeriodExpired: false,
            unreadReviewsCount: 0,
            stages: resetStages,
            completedMilestones: [],
          };
        }
        return c;
      })
    );
    setSubTab(curriculumId, "tree");
    showToast(`Kurikulum berhasil didaftarkan ulang! Progres dimulai dari awal (0%).`);
  };

  // Socratic AI response simulation
  const handleAskAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;
    setAiAnswer(
      `Pertanyaan bagus mengenai ${currentCurriculum.title}! Pada materi ini, arsitektur yang direkomendasikan berfokus pada decoupling komponen, type safety di compile-time, serta penanganan error terpusat. Coba periksa Modul ${currentCurriculum.completedModules + 1} untuk melihat implementasi langsungnya!`
    );
  };

  // Check if any curriculum is dropped out
  const droppedOutCurricula = curricula.filter((c) => c.isDroppedOut);

  return (
    <div className="portal-content-fluid">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            background: "rgba(16, 185, 129, 0.15)",
            border: "1px solid #10B981",
            color: "#10B981",
            padding: "12px 18px",
            borderRadius: "8px",
            marginBottom: "18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: 600,
            fontSize: "0.875rem",
            gap: "10px",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <FlatIcon type="check-circle" size={16} color="#10B981" />
            <span>{toastMessage}</span>
          </span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            style={{ background: "none", border: "none", color: "#10B981", cursor: "pointer", display: "flex", alignItems: "center" }}
            aria-label="Tutup notifikasi"
          >
            <FlatIcon type="close" size={14} color="#10B981" />
          </button>
        </div>
      )}

      {/* Page Header */}
      <div style={{ marginBottom: "22px" }}>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.5rem",
            fontWeight: 800,
            color: "var(--bx-ink-bright)",
            margin: "0 0 6px",
          }}
        >
          Progres Belajar
        </h1>
        <p style={{ fontSize: "0.84375rem", color: "var(--bx-muted)", margin: 0 }}>
          Pantau status kelas yang sedang kamu pelajari dan riwayat kelas yang telah kamu selesaikan.
        </p>
      </div>

      {/* 2 MAIN TABS: KELAS YANG DIPELAJARI vs KELAS YANG DISELESAIKAN */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid var(--bx-border)",
          marginBottom: "24px",
          gap: "8px",
        }}
      >
        <button
          type="button"
          onClick={() => setActiveMainTab("in-progress")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 20px",
            fontSize: "0.875rem",
            fontWeight: 700,
            color: activeMainTab === "in-progress" ? "var(--bx-ink-bright)" : "var(--bx-muted)",
            borderBottom: activeMainTab === "in-progress" ? "2px solid var(--gold)" : "2px solid transparent",
            background: "none",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          <FlatIcon type="book-open" size={17} color={activeMainTab === "in-progress" ? "var(--gold)" : "var(--bx-muted)"} />
          <span>Kelas yang Dipelajari</span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              padding: "2px 6px",
              borderRadius: "4px",
              background: activeMainTab === "in-progress" ? "rgba(201, 150, 46, 0.15)" : "var(--bx-surface)",
              color: activeMainTab === "in-progress" ? "var(--gold)" : "var(--bx-muted)",
              fontWeight: 700,
            }}
          >
            {curricula.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMainTab("completed")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 20px",
            fontSize: "0.875rem",
            fontWeight: 700,
            color: activeMainTab === "completed" ? "var(--bx-ink-bright)" : "var(--bx-muted)",
            borderBottom: activeMainTab === "completed" ? "2px solid #10B981" : "2px solid transparent",
            background: "none",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          <FlatIcon type="check-circle" size={17} color={activeMainTab === "completed" ? "#10B981" : "var(--bx-muted)"} />
          <span>Kelas yang Diselesaikan</span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              padding: "2px 6px",
              borderRadius: "4px",
              background: activeMainTab === "completed" ? "rgba(16, 185, 129, 0.15)" : "var(--bx-surface)",
              color: activeMainTab === "completed" ? "#10B981" : "var(--bx-muted)",
              fontWeight: 700,
            }}
          >
            {completedClasses.length}
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: KELAS YANG DIPELAJARI (LIST KELAS & EXPANDABLE TREE SILABUS)       */}
      {/* ========================================================================= */}
      {activeMainTab === "in-progress" && (
        <div>
          {/* Header Summary for Enrolled Classes */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "20px",
              padding: "16px 20px",
              background: "var(--bx-surface)",
              border: "1px solid var(--bx-border)",
              borderRadius: "8px",
            }}
          >
            <div>
              <div style={{ fontSize: "0.9375rem", fontWeight: 800, color: "var(--bx-ink-bright)" }}>
                Daftar Kelas yang Sedang Dipelajari ({curricula.length} Kurikulum Aktif)
              </div>
              <div style={{ fontSize: "0.78125rem", color: "var(--bx-muted)" }}>
                Klik pada setiap kelas untuk membuka struktur pohon silabus (Tree Roadmap) dan materi belajarnya.
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button
                type="button"
                onClick={() => {
                  if (expandedCurriculumIds.length === curricula.length) {
                    setExpandedCurriculumIds([]);
                  } else {
                    setExpandedCurriculumIds(curricula.map((c) => c.id));
                  }
                }}
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--gold)",
                  background: "rgba(201, 150, 46, 0.12)",
                  border: "1px solid rgba(201, 150, 46, 0.3)",
                  padding: "6px 14px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <FlatIcon type="layers" size={13} color="var(--gold)" />
                <span>{expandedCurriculumIds.length === curricula.length ? "Tutup Semua Silabus" : "Buka Semua Silabus"}</span>
              </button>
            </div>
          </div>

          {/* LIST OF ENROLLED CLASSES (ACCORDION CARDS WITH TREE ROADMAP) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
            {curricula.map((c) => {
              const isExpanded = expandedCurriculumIds.includes(c.id);
              const theme = getProgressTheme(c.progress);
              const curSubTab = getSubTab(c.id);

              return (
                <div
                  key={c.id}
                  className="portal-dash-card"
                  style={{
                    padding: 0,
                    overflow: "hidden",
                    border: isExpanded ? `1.5px solid ${theme.textColor}` : "1px solid var(--bx-border)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {/* ACCORDION HEADER (CLICKABLE TO OPEN/CLOSE TREE) */}
                  <div
                    onClick={() => toggleExpandCurriculum(c.id)}
                    style={{
                      padding: "18px 22px",
                      cursor: "pointer",
                      background: isExpanded ? "var(--bx-surface-card)" : "var(--bx-surface)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "16px",
                      flexWrap: "wrap",
                      borderBottom: isExpanded ? "1px solid var(--bx-border)" : "none",
                      userSelect: "none",
                    }}
                  >
                    {/* Left: Chevron + Class Title + Deadline */}
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", flex: "1 1 360px", minWidth: 0 }}>
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "8px",
                          background: isExpanded ? theme.bgColor : "var(--bx-bg)",
                          border: `1px solid ${isExpanded ? theme.borderColor : "var(--bx-border)"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: isExpanded ? theme.textColor : "var(--bx-muted)",
                          flexShrink: 0,
                          marginTop: "2px",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <FlatIcon type={isExpanded ? "chevron-up" : "chevron-down"} size={16} color={isExpanded ? theme.textColor : "var(--bx-muted)"} />
                      </div>

                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
                          <span
                            style={{
                              fontSize: "0.6875rem",
                              fontWeight: 700,
                              padding: "2px 8px",
                              borderRadius: "4px",
                              background: "rgba(201, 150, 46, 0.1)",
                              border: "1px solid rgba(201, 150, 46, 0.25)",
                              color: "var(--gold)",
                            }}
                          >
                            {c.category}
                          </span>
                          <span
                            style={{
                              fontSize: "0.6875rem",
                              fontWeight: 700,
                              padding: "2px 8px",
                              borderRadius: "4px",
                              background: "var(--bx-bg)",
                              border: "1px solid var(--bx-border)",
                              color: "var(--bx-muted)",
                            }}
                          >
                            {c.level}
                          </span>
                          {c.isDroppedOut && (
                            <span
                              style={{
                                fontSize: "0.6875rem",
                                fontWeight: 800,
                                padding: "2px 8px",
                                borderRadius: "4px",
                                background: "rgba(239, 68, 68, 0.15)",
                                border: "1px solid #EF4444",
                                color: "#EF4444",
                              }}
                            >
                              Status: Drop Out (DO)
                            </span>
                          )}
                        </div>

                        <h3
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "1.2rem",
                            fontWeight: 800,
                            color: "var(--bx-ink-bright)",
                            margin: "0 0 6px",
                            lineHeight: 1.3,
                          }}
                        >
                          {c.title}
                        </h3>

                        {/* EXACT DEADLINE TEXT as requested: */}
                        <div
                          style={{
                            fontSize: "0.8125rem",
                            color: c.daysRemaining <= 7 ? "#EF4444" : "var(--gold)",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontWeight: 600,
                          }}
                        >
                          <FlatIcon type="clock" size={13} color={c.daysRemaining <= 7 ? "#EF4444" : "var(--gold)"} />
                          <span>Deadline belajar seluruh kelas materi: {c.deadlineDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Progress Modules Count & Colored Percentage Badge */}
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "flex-end", marginBottom: "5px" }}>
                          <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>
                            {c.completedModules} dari {c.totalModules} Modul
                          </span>

                          {/* Percentage Badge: Hijau (>=65%), Kuning (35-64%), Merah (<35%) */}
                          <span
                            style={{
                              fontSize: "0.8125rem",
                              fontWeight: 800,
                              fontFamily: "var(--font-mono)",
                              color: theme.textColor,
                              background: theme.bgColor,
                              border: `1px solid ${theme.borderColor}`,
                              padding: "2px 8px",
                              borderRadius: "4px",
                            }}
                          >
                            {c.progress}%
                          </span>
                        </div>

                        {/* Progress Bar Colored */}
                        <div
                          style={{
                            width: "140px",
                            height: "6px",
                            background: "rgba(100, 100, 100, 0.2)",
                            borderRadius: "3px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${c.progress}%`,
                              height: "100%",
                              background: theme.barGradient,
                              transition: "width 0.3s ease",
                            }}
                          />
                        </div>
                      </div>

                      {/* Open/Close Tree Button */}
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: isExpanded ? "var(--gold)" : "var(--bx-muted)",
                          padding: "6px 12px",
                          borderRadius: "5px",
                          background: isExpanded ? "rgba(201, 150, 46, 0.1)" : "var(--bx-bg)",
                          border: `1px solid ${isExpanded ? "rgba(201, 150, 46, 0.25)" : "var(--bx-border)"}`,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <FlatIcon type="tree" size={13} color={isExpanded ? "var(--gold)" : "var(--bx-muted)"} />
                        <span>{isExpanded ? "Tutup Tree" : "Buka Tree Silabus"}</span>
                      </span>
                    </div>
                  </div>

                  {/* EXPANDABLE BODY: KETIKA DI KLIK MUNCUL TREE OPEN */}
                  {isExpanded && (
                    <div style={{ padding: "20px 24px", background: "var(--bx-bg)" }}>
                      {/* Sub-header inside expanded card */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "16px" }}>
                        <div style={{ fontSize: "0.8125rem", color: "var(--bx-muted)" }}>
                          Instruktur: <strong style={{ color: "var(--bx-ink-bright)" }}>{c.instructor}</strong> · Terakhir dipelajari: {c.lastStudied}
                        </div>

                        {/* Dev Simulation Controls */}
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleDropOut(c.id);
                            }}
                            style={{
                              fontSize: "0.6875rem",
                              fontWeight: 700,
                              padding: "5px 9px",
                              borderRadius: "4px",
                              cursor: "pointer",
                              background: c.isDroppedOut ? "rgba(239, 68, 68, 0.2)" : "var(--bx-surface)",
                              border: c.isDroppedOut ? "1px solid #EF4444" : "1px dashed var(--bx-border)",
                              color: c.isDroppedOut ? "#EF4444" : "var(--bx-muted)",
                            }}
                            title="Simulasi kondisi siswa Drop Out akibat batas waktu"
                          >
                            [Simulasi DO: {c.isDroppedOut ? "ON" : "OFF"}]
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleExpired(c.id);
                            }}
                            style={{
                              fontSize: "0.6875rem",
                              fontWeight: 700,
                              padding: "5px 9px",
                              borderRadius: "4px",
                              cursor: "pointer",
                              background: c.isLearningPeriodExpired ? "rgba(245, 158, 11, 0.2)" : "var(--bx-surface)",
                              border: c.isLearningPeriodExpired ? "1px solid #F59E0B" : "1px dashed var(--bx-border)",
                              color: c.isLearningPeriodExpired ? "#F59E0B" : "var(--bx-muted)",
                            }}
                            title="Simulasi masa belajar berakhir"
                          >
                            [Simulasi Habis: {c.isLearningPeriodExpired ? "Habis" : "Aktif"}]
                          </button>
                        </div>
                      </div>

                      {/* DROP OUT BANNER */}
                      {c.isDroppedOut && (
                        <div
                          style={{
                            background: "rgba(239, 68, 68, 0.12)",
                            border: "1px solid #EF4444",
                            borderRadius: "8px",
                            padding: "16px 20px",
                            marginBottom: "20px",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", flexWrap: "wrap" }}>
                            <div
                              style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "50%",
                                background: "rgba(239, 68, 68, 0.2)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#EF4444",
                                flexShrink: 0,
                              }}
                            >
                              <FlatIcon type="alert-triangle" size={20} color="#EF4444" />
                            </div>
                            <div style={{ flex: 1, minWidth: "260px" }}>
                              <div style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#EF4444", marginBottom: "4px" }}>
                                Status Siswa: Drop Out (DO) pada Kurikulum Ini
                              </div>
                              <p style={{ fontSize: "0.8125rem", color: "var(--bx-ink)", margin: "0 0 12px", lineHeight: 1.5 }}>
                                Masa waktu belajar yang ditentukan telah terlewati. Sesuai ketentuan akademik, materi tidak tersimpan di tab <strong>Kelas yang Diselesaikan</strong>. Anda dapat membeli kembali materi kurikulum ini untuk mendaftar ulang dan memulai belajar dari awal lagi (Modul 1).
                              </p>
                              <button
                                type="button"
                                onClick={() => handleRebuyCurriculum(c.id)}
                                style={{
                                  background: "#10B981",
                                  color: "#FFFFFF",
                                  border: "none",
                                  padding: "8px 18px",
                                  borderRadius: "6px",
                                  fontSize: "0.8125rem",
                                  fontWeight: 700,
                                  cursor: "pointer",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "8px",
                                }}
                              >
                                <FlatIcon type="refresh" size={14} color="#FFFFFF" />
                                <span>Beli Materi Lagi &amp; Mulai Dari Awal</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SUB-TABS: TREE ROADMAP | REVIEWER 1-ON-1 | AI TUTOR | MILESTONES */}
                      <div
                        style={{
                          display: "flex",
                          borderBottom: "1px solid var(--bx-border)",
                          gap: "4px",
                          marginBottom: "18px",
                          overflowX: "auto",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => setSubTab(c.id, "tree")}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "8px 14px",
                            fontSize: "0.8125rem",
                            fontWeight: 700,
                            color: curSubTab === "tree" ? "var(--gold)" : "var(--bx-muted)",
                            borderBottom: curSubTab === "tree" ? "2px solid var(--gold)" : "2px solid transparent",
                            background: "none",
                            cursor: "pointer",
                          }}
                        >
                          <FlatIcon type="layers" size={15} color={curSubTab === "tree" ? "var(--gold)" : "var(--bx-muted)"} />
                          <span>Struktur Silabus (Tree Roadmap)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSubTab(c.id, "reviewer")}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "8px 14px",
                            fontSize: "0.8125rem",
                            fontWeight: 700,
                            color: curSubTab === "reviewer" ? "var(--gold)" : "var(--bx-muted)",
                            borderBottom: curSubTab === "reviewer" ? "2px solid var(--gold)" : "2px solid transparent",
                            background: "none",
                            cursor: "pointer",
                          }}
                        >
                          <FlatIcon type="chat" size={15} color={curSubTab === "reviewer" ? "var(--gold)" : "var(--bx-muted)"} />
                          <span>Reviewer 1-on-1</span>
                          {(c.unreadReviewsCount ?? 0) > 0 && (
                            <span
                              style={{
                                background: "#EF4444",
                                color: "#FFFFFF",
                                fontSize: "0.6875rem",
                                fontWeight: 800,
                                padding: "2px 6px",
                                borderRadius: "10px",
                              }}
                            >
                              {c.unreadReviewsCount} Baru
                            </span>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => setSubTab(c.id, "ai")}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "8px 14px",
                            fontSize: "0.8125rem",
                            fontWeight: 700,
                            color: curSubTab === "ai" ? "var(--gold)" : "var(--bx-muted)",
                            borderBottom: curSubTab === "ai" ? "2px solid var(--gold)" : "2px solid transparent",
                            background: "none",
                            cursor: "pointer",
                          }}
                        >
                          <FlatIcon type="cpu" size={15} color={curSubTab === "ai" ? "var(--gold)" : "var(--bx-muted)"} />
                          <span>Socratic AI Tutor</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSubTab(c.id, "milestones")}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "8px 14px",
                            fontSize: "0.8125rem",
                            fontWeight: 700,
                            color: curSubTab === "milestones" ? "var(--gold)" : "var(--bx-muted)",
                            borderBottom: curSubTab === "milestones" ? "2px solid var(--gold)" : "2px solid transparent",
                            background: "none",
                            cursor: "pointer",
                          }}
                        >
                          <FlatIcon type="award" size={15} color={curSubTab === "milestones" ? "var(--gold)" : "var(--bx-muted)"} />
                          <span>Milestone &amp; Sertifikat ({c.completedMilestones.length})</span>
                        </button>
                      </div>

                      {/* SUB-PANEL 1: TREE ROADMAP */}
                      {curSubTab === "tree" && (
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", flexWrap: "wrap", gap: "10px" }}>
                            <span style={{ fontSize: "0.8125rem", color: "var(--bx-muted)" }}>
                              Klik modul untuk mempelajari materi, atau arahkan kursor (hover) untuk tombol <strong>Koridor Kelas</strong> hijau.
                            </span>
                            <div style={{ display: "flex", gap: "12px", fontSize: "0.75rem", color: "var(--bx-muted)", alignItems: "center" }}>
                              <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                                <span style={{ width: "16px", height: "16px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.15)", border: "1px solid #10B981", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                                  <FlatIcon type="check" size={10} color="#10B981" />
                                </span>
                                <span>Sudah Dibaca</span>
                              </span>
                              <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                                <span style={{ width: "16px", height: "16px", borderRadius: "50%", background: "var(--bx-surface)", border: "1px solid var(--bx-border)" }} />
                                <span>Belum Dibaca (Tanpa Icon)</span>
                              </span>
                              <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                                <span style={{ width: "16px", height: "16px", borderRadius: "50%", background: "rgba(239, 68, 68, 0.15)", border: "1px solid #EF4444", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                                  <FlatIcon type="lock" size={10} color="#EF4444" />
                                </span>
                                <span>Terkunci</span>
                              </span>
                            </div>
                          </div>

                          {/* Stages and Modules Tree */}
                          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                            {c.stages.map((stage) => (
                              <div
                                key={stage.id}
                                style={{
                                  background: "var(--bx-surface)",
                                  border: "1px solid var(--bx-border)",
                                  borderRadius: "8px",
                                  overflow: "hidden",
                                }}
                              >
                                {/* Stage Header */}
                                <div
                                  style={{
                                    padding: "10px 16px",
                                    background: "rgba(255, 255, 255, 0.02)",
                                    borderBottom: "1px solid var(--bx-border)",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                    gap: "8px",
                                  }}
                                >
                                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <span
                                      style={{
                                        width: "22px",
                                        height: "22px",
                                        borderRadius: "4px",
                                        background: stage.status === "completed" ? "rgba(16, 185, 129, 0.15)" : stage.status === "current" ? "rgba(59, 130, 246, 0.15)" : "var(--bx-bg)",
                                        color: stage.status === "completed" ? "#10B981" : stage.status === "current" ? "#3B82F6" : "var(--bx-muted)",
                                        border: `1px solid ${stage.status === "completed" ? "#10B981" : stage.status === "current" ? "#3B82F6" : "var(--bx-border)"}`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: 800,
                                        fontSize: "0.75rem",
                                        fontFamily: "var(--font-mono)",
                                      }}
                                    >
                                      {stage.stageNumber}
                                    </span>
                                    <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--bx-ink-bright)" }}>
                                      {stage.title}
                                    </span>
                                  </div>

                                  <span
                                    style={{
                                      fontSize: "0.71875rem",
                                      fontFamily: "var(--font-mono)",
                                      color: stage.status === "completed" ? "#10B981" : stage.status === "current" ? "#3B82F6" : "var(--bx-muted)",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {stage.progressText}
                                  </span>
                                </div>

                                {/* Modules inside Stage */}
                                <div style={{ padding: "8px 12px", display: "flex", flexDirection: "column", gap: "6px" }}>
                                  {stage.modules.map((m) => {
                                    const isCompleted = m.status === "completed";
                                    const isLocked = m.status === "locked";
                                    const isCurrent = m.status === "current";

                                    return (
                                      <div
                                        key={m.id}
                                        className="portal-module-row"
                                        onClick={() => handleOpenModule(m)}
                                        title={`Klik untuk masuk ke materi: Modul ${m.number}: ${m.title}`}
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "space-between",
                                          padding: "10px 14px",
                                          borderRadius: "6px",
                                          background: isCurrent ? "var(--bx-surface-card)" : "var(--bx-bg)",
                                          border: isCurrent ? "1px solid var(--bx-border)" : "1px solid var(--bx-border)",
                                          flexWrap: "wrap",
                                          gap: "10px",
                                          cursor: "pointer",
                                        }}
                                      >
                                        <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, minWidth: "240px" }}>
                                          {/* Status icon:
                                              - Sudah dibaca -> icon ceklis hijau
                                              - Terkunci -> icon gembok merah
                                              - Belum dibaca -> tidak ada icon apapun (null)
                                          */}
                                          {isCompleted ? (
                                            <div
                                              style={{
                                                width: "28px",
                                                height: "28px",
                                                borderRadius: "50%",
                                                background: "rgba(16, 185, 129, 0.12)",
                                                color: "#10B981",
                                                border: "1px solid #10B981",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexShrink: 0,
                                              }}
                                            >
                                              <FlatIcon type="check" size={14} color="#10B981" />
                                            </div>
                                          ) : isLocked ? (
                                            <div
                                              style={{
                                                width: "28px",
                                                height: "28px",
                                                borderRadius: "50%",
                                                background: "rgba(239, 68, 68, 0.12)",
                                                color: "#EF4444",
                                                border: "1px solid #EF4444",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexShrink: 0,
                                              }}
                                            >
                                              <FlatIcon type="lock" size={13} color="#EF4444" />
                                            </div>
                                          ) : null}

                                          <div>
                                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                              <span style={{ fontSize: "0.84375rem", fontWeight: 700, color: "var(--bx-ink-bright)" }}>
                                                Modul {m.number}: {m.title}
                                              </span>
                                            </div>

                                            <div style={{ fontSize: "0.71875rem", color: "var(--bx-muted)", marginTop: "3px" }}>
                                              {isCompleted && m.completedDate && (
                                                <span>Diselesaikan pada {m.completedDate} {m.score ? `· Nilai: ${m.score}` : ""}</span>
                                              )}
                                              {isCurrent && (
                                                <span style={{ color: "#3B82F6" }}>{m.duration || "Estimasi 2-3 Jam"} · Sedang dikerjakan</span>
                                              )}
                                              {isLocked && (
                                                <span>Buka materi dengan menyelesaikan modul sebelumnya atau berlangganan.</span>
                                              )}
                                            </div>
                                          </div>
                                        </div>

                                        {/* Button Koridor Kelas hanya muncul jika modul TIDAK terlock */}
                                        {!isLocked && (
                                          <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                                            <button
                                              type="button"
                                              className="portal-koridor-btn"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                if (onOpenKoridor) {
                                                  onOpenKoridor(m.title);
                                                } else if (onNavigateNav) {
                                                  onNavigateNav("koridor-kelas");
                                                }
                                              }}
                                              title={`Masuk ke Koridor Kelas: ${m.title}`}
                                            >
                                              <span>Koridor Kelas</span>
                                              <FlatIcon type="chevron-right" size={11} color="#ffffff" />
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* SUB-PANEL 2: REVIEWER 1-ON-1 */}
                      {curSubTab === "reviewer" && (
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
                            <div>
                              <h4 style={{ fontSize: "0.9375rem", fontWeight: 800, color: "var(--bx-ink-bright)", margin: "0 0 4px" }}>
                                Feedback &amp; Sesi Reviewer 1-on-1 · {c.title}
                              </h4>
                              <p style={{ fontSize: "0.78125rem", color: "var(--bx-muted)", margin: 0 }}>
                                Review kode mendalam dari praktisi industri untuk setiap submission tugas Anda.
                              </p>
                            </div>

                            {(c.unreadReviewsCount ?? 0) > 0 && (
                              <button
                                type="button"
                                onClick={() => handleMarkReviewRead(c.id)}
                                style={{
                                  background: "rgba(16, 185, 129, 0.12)",
                                  border: "1px solid #10B981",
                                  color: "#10B981",
                                  padding: "6px 12px",
                                  borderRadius: "5px",
                                  fontSize: "0.75rem",
                                  fontWeight: 700,
                                  cursor: "pointer",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "6px",
                                }}
                              >
                                <FlatIcon type="check" size={13} color="#10B981" />
                                <span>Tandai Semua Sudah Dibaca</span>
                              </button>
                            )}
                          </div>

                          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            <div
                              style={{
                                background: "var(--bx-surface)",
                                border: (c.unreadReviewsCount ?? 0) > 0 ? "1px solid #EF4444" : "1px solid var(--bx-border)",
                                borderRadius: "8px",
                                padding: "16px",
                              }}
                            >
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                  <div
                                    style={{
                                      width: "36px",
                                      height: "36px",
                                      borderRadius: "50%",
                                      background: "var(--bx-bg)",
                                      border: "1px solid var(--bx-border)",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      fontWeight: 800,
                                      color: "var(--gold)",
                                      fontSize: "0.8125rem",
                                    }}
                                  >
                                    RV
                                  </div>
                                  <div>
                                    <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--bx-ink-bright)" }}>
                                      Tim Reviewer Ahli · Dicoding &amp; Industri Partner
                                    </div>
                                    <div style={{ fontSize: "0.71875rem", color: "var(--bx-muted)" }}>
                                      Submission Evaluasi Modul Praktik · 25 Okt 2026, 14:20 WIB
                                    </div>
                                  </div>
                                </div>

                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                  {(c.unreadReviewsCount ?? 0) > 0 && (
                                    <span
                                      style={{
                                        fontSize: "0.6875rem",
                                        fontWeight: 800,
                                        background: "#EF4444",
                                        color: "#FFFFFF",
                                        padding: "2px 8px",
                                        borderRadius: "4px",
                                      }}
                                    >
                                      Belum Dibaca
                                    </span>
                                  )}
                                  <span
                                    style={{
                                      fontSize: "0.75rem",
                                      fontWeight: 700,
                                      color: "#10B981",
                                      background: "rgba(16, 185, 129, 0.12)",
                                      padding: "2px 8px",
                                      borderRadius: "4px",
                                      border: "1px solid #10B981",
                                    }}
                                  >
                                    Lulus ⭐ 5/5
                                  </span>
                                </div>
                              </div>

                              <p style={{ fontSize: "0.8125rem", color: "var(--bx-ink)", lineHeight: 1.6, margin: "0 0 12px" }}>
                                &ldquo;Hasil implementasi tugas Anda untuk {c.title} sangat terstruktur. Kode modular, penamaan variabel deskriptif, dan error handling telah diuji dengan skenario edge-case. Pertahankan kualitas ini untuk modul berikutnya!&rdquo;
                              </p>

                              <button
                                type="button"
                                onClick={() => alert(`Membuka catatan lengkap reviewer untuk ${c.title}...`)}
                                style={{
                                  background: "var(--bx-bg)",
                                  border: "1px solid var(--bx-border)",
                                  color: "var(--bx-ink-bright)",
                                  fontSize: "0.75rem",
                                  fontWeight: 700,
                                  padding: "6px 12px",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                }}
                              >
                                Lihat Detail Kode Submission
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SUB-PANEL 3: SOCRATIC AI TUTOR */}
                      {curSubTab === "ai" && (
                        <div>
                          <h4 style={{ fontSize: "0.9375rem", fontWeight: 800, color: "var(--bx-ink-bright)", margin: "0 0 4px" }}>
                            Socratic AI Tutor · {c.title}
                          </h4>
                          <p style={{ fontSize: "0.78125rem", color: "var(--bx-muted)", margin: "0 0 16px" }}>
                            Asisten belajar cerdas yang membimbing Anda memahami logika pemrograman dan arsitektur sistem.
                          </p>

                          <form onSubmit={handleAskAI} style={{ marginBottom: "16px" }}>
                            <div style={{ display: "flex", gap: "10px" }}>
                              <input
                                type="text"
                                value={aiQuestion}
                                onChange={(e) => setAiQuestion(e.target.value)}
                                placeholder={`Tanyakan materi seputar ${c.title}...`}
                                style={{
                                  flex: 1,
                                  padding: "10px 14px",
                                  fontSize: "0.8125rem",
                                  borderRadius: "6px",
                                  border: "1px solid var(--bx-border)",
                                  background: "var(--bx-surface)",
                                  color: "var(--bx-ink-bright)",
                                  outline: "none",
                                }}
                              />
                              <button
                                type="submit"
                                style={{
                                  background: "var(--gold)",
                                  color: "#0A0A0C",
                                  fontWeight: 800,
                                  fontSize: "0.8125rem",
                                  padding: "10px 18px",
                                  borderRadius: "6px",
                                  cursor: "pointer",
                                  border: "none",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "6px",
                                }}
                              >
                                <FlatIcon type="send" size={14} color="#0A0A0C" />
                                <span>Kirim Pertanyaan</span>
                              </button>
                            </div>
                          </form>

                          {aiAnswer && (
                            <div
                              style={{
                                background: "var(--bx-surface)",
                                border: "1px solid var(--bx-border)",
                                borderRadius: "8px",
                                padding: "16px",
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", color: "var(--gold)", fontWeight: 700, fontSize: "0.8125rem" }}>
                                <FlatIcon type="cpu" size={16} color="var(--gold)" />
                                <span>Respons Socratic AI:</span>
                              </div>
                              <p style={{ fontSize: "0.8125rem", color: "var(--bx-ink-bright)", lineHeight: 1.6, margin: 0 }}>
                                {aiAnswer}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* SUB-PANEL 4: MILESTONES & SERTIFIKAT */}
                      {curSubTab === "milestones" && (
                        <div>
                          <h4 style={{ fontSize: "0.9375rem", fontWeight: 800, color: "var(--bx-ink-bright)", margin: "0 0 4px" }}>
                            Milestone &amp; Sertifikat Kelulusan · {c.title}
                          </h4>
                          <p style={{ fontSize: "0.78125rem", color: "var(--bx-muted)", margin: "0 0 16px" }}>
                            Sertifikat kompetensi yang telah berhasil diselesaikan dan terverifikasi.
                          </p>

                          {c.completedMilestones.length === 0 ? (
                            <div style={{ padding: "20px", textAlign: "center", background: "var(--bx-surface)", borderRadius: "8px", border: "1px dashed var(--bx-border)", color: "var(--bx-muted)", fontSize: "0.8125rem" }}>
                              Belum ada milestone yang diselesaikan pada kurikulum ini. Selesaikan modul untuk membuka sertifikat.
                            </div>
                          ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                              {c.completedMilestones.map((ms, mIdx) => (
                                <div
                                  key={mIdx}
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "12px 16px",
                                    background: "var(--bx-surface)",
                                    border: "1px solid var(--bx-border)",
                                    borderRadius: "6px",
                                    flexWrap: "wrap",
                                    gap: "10px",
                                  }}
                                >
                                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <span
                                      style={{
                                        width: "28px",
                                        height: "28px",
                                        borderRadius: "50%",
                                        background: "rgba(16, 185, 129, 0.15)",
                                        color: "#10B981",
                                        border: "1px solid #10B981",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                      }}
                                    >
                                      <FlatIcon type="check" size={14} color="#10B981" />
                                    </span>
                                    <div>
                                      <div style={{ fontSize: "0.84375rem", fontWeight: 700, color: "var(--bx-ink-bright)" }}>
                                        {ms.title}
                                      </div>
                                      <div style={{ fontSize: "0.71875rem", color: "var(--bx-muted)" }}>
                                        Diterbitkan: {ms.date}
                                      </div>
                                    </div>
                                  </div>

                                  <span
                                    style={{
                                      fontSize: "0.71875rem",
                                      fontWeight: 700,
                                      color: "#10B981",
                                      background: "rgba(16, 185, 129, 0.12)",
                                      border: "1px solid #10B981",
                                      padding: "3px 8px",
                                      borderRadius: "4px",
                                    }}
                                  >
                                    {ms.badge}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: KELAS YANG DISELESAIKAN                                            */}
      {/* ========================================================================= */}
      {activeMainTab === "completed" && (
        <div>
          {/* Header Summary for Completed Classes */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "20px",
              padding: "16px 20px",
              background: "var(--bx-surface)",
              border: "1px solid var(--bx-border)",
              borderRadius: "8px",
            }}
          >
            <div>
              <div style={{ fontSize: "0.9375rem", fontWeight: 800, color: "var(--bx-ink-bright)" }}>
                Riwayat Kelulusan &amp; Kelas yang Telah Diselesaikan
              </div>
              <div style={{ fontSize: "0.78125rem", color: "var(--bx-muted)" }}>
                Total {completedClasses.length} kelas diselesaikan dengan sertifikat kompetensi terverifikasi global.
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#10B981",
                  background: "rgba(16, 185, 129, 0.12)",
                  border: "1px solid #10B981",
                  padding: "4px 10px",
                  borderRadius: "5px",
                }}
              >
                100% Standar Industri
              </span>
            </div>
          </div>

          {/* Academic Policy Notice for Drop Out (DO) */}
          <div
            style={{
              padding: "14px 18px",
              background: "var(--bx-bg)",
              border: "1px dashed var(--bx-border)",
              borderRadius: "8px",
              marginBottom: "22px",
              fontSize: "0.8125rem",
              color: "var(--bx-muted)",
              lineHeight: 1.5,
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <FlatIcon type="info" size={18} color="var(--gold)" />
            <div>
              <strong style={{ color: "var(--bx-ink-bright)" }}>Ketentuan Akademik Penyimpanan Kelas:</strong>
              <br />
              Kelas yang tercatat pada halaman ini adalah kelas yang telah <strong>100% selesai</strong> dan lulus review sebelum masa belajar berakhir. Sesuai aturan, jika siswa mengalami <strong>Drop Out (DO)</strong> pada suatu kurikulum, materi dari kelas tersebut <strong>tidak akan tersimpan di tab ini</strong>. Siswa perlu mendaftar ulang untuk memulai proses belajar kembali dari awal.
            </div>
          </div>

          {/* If there are any dropped out curricula, alert here */}
          {droppedOutCurricula.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              {droppedOutCurricula.map((doCurriculum) => (
                <div
                  key={doCurriculum.id}
                  style={{
                    padding: "14px 18px",
                    background: "rgba(239, 68, 68, 0.08)",
                    border: "1px solid rgba(239, 68, 68, 0.4)",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "0.84375rem", fontWeight: 700, color: "#EF4444", display: "flex", alignItems: "center", gap: "6px" }}>
                      <FlatIcon type="alert-triangle" size={14} color="#EF4444" />
                      <span>Status Drop Out: {doCurriculum.title}</span>
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--bx-muted)", marginTop: "2px" }}>
                      Materi tidak tersimpan di riwayat selesai. Daftar ulang untuk mereset ke 0% dan mulai belajar dari awal.
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRebuyCurriculum(doCurriculum.id)}
                    style={{
                      background: "#10B981",
                      color: "#FFFFFF",
                      border: "none",
                      padding: "6px 14px",
                      borderRadius: "5px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <FlatIcon type="refresh" size={13} color="#FFFFFF" />
                    <span>Beli Materi Lagi &amp; Mulai Ulang</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* List of Completed Classes */}
          {completedClasses.length === 0 ? (
            <div
              style={{
                padding: "48px 20px",
                textAlign: "center",
                background: "var(--bx-surface)",
                border: "1px dashed var(--bx-border)",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "var(--bx-bg)",
                  border: "1px solid var(--bx-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                  color: "var(--bx-muted)",
                }}
              >
                <FlatIcon type="award" size={22} color="var(--bx-muted)" />
              </div>
              <div style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "4px" }}>
                Belum ada kelas yang diselesaikan.
              </div>
              <p style={{ fontSize: "0.8125rem", color: "var(--bx-muted)", margin: "0 0 16px" }}>
                Selesaikan seluruh modul dan capstone project pada kelas yang sedang dipelajari untuk mendapatkan sertifikat kelulusan.
              </p>
              <button
                type="button"
                onClick={() => setActiveMainTab("in-progress")}
                style={{
                  background: "var(--gold)",
                  color: "#0A0A0C",
                  border: "none",
                  padding: "8px 18px",
                  borderRadius: "6px",
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Lihat Kelas yang Dipelajari →
              </button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "16px" }}>
              {completedClasses.map((item) => (
                <div
                  key={item.id}
                  className="portal-dash-card"
                  style={{
                    padding: "20px",
                    border: "1px solid var(--bx-border)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    {/* Top Row: Track & Badge Selesai Hijau */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <span
                        style={{
                          fontSize: "0.6875rem",
                          fontFamily: "var(--font-mono)",
                          fontWeight: 700,
                          color: "var(--bx-muted)",
                        }}
                      >
                        {item.category}
                      </span>

                      <FlatIcon type="check-circle" size={18} color="#10B981" />
                    </div>

                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.1rem",
                        fontWeight: 800,
                        color: "var(--bx-ink-bright)",
                        margin: "0 0 8px",
                        lineHeight: 1.35,
                      }}
                    >
                      {item.title}
                    </h3>

                    <div style={{ fontSize: "0.78125rem", color: "var(--bx-muted)", marginBottom: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
                      <span>Instruktur: {item.instructor}</span>
                      <span>Diselesaikan pada: {item.completedDate} · Durasi: {item.durationHours} Jam ({item.totalModules} Modul)</span>
                      <span>
                        Nilai Akhir: <strong style={{ color: "#10B981" }}>{item.finalScore}</strong>
                      </span>
                    </div>

                    {/* Skill Pills */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                      {item.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          style={{
                            fontSize: "0.6875rem",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            background: "var(--bx-bg)",
                            border: "1px solid var(--bx-border)",
                            color: "var(--bx-ink)",
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div
                    style={{
                      borderTop: "1px solid var(--bx-border)",
                      paddingTop: "14px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    <span style={{ fontSize: "0.6875rem", fontFamily: "var(--font-mono)", color: "var(--bx-muted)" }}>
                      ID: {item.certificateId}
                    </span>

                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                      {/* Tombol Lihat Sertifikat */}
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedCertificate({
                            recipientName: "Rendy Ariawindana",
                            courseTitle: item.title,
                            certificateId: item.certificateId,
                            completionDate: item.completedDate,
                            finalScore: item.finalScore,
                            durationHours: item.durationHours,
                            instructorName: item.instructor,
                          })
                        }
                        style={{
                          background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                          color: "#0A0A0C",
                          border: "none",
                          padding: "6px 14px",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          fontWeight: 800,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          boxShadow: "0 2px 8px rgba(245, 158, 11, 0.3)",
                        }}
                      >
                        <FlatIcon type="certificate" size={13} color="#0A0A0C" />
                        <span>Lihat Sertifikat</span>
                      </button>

                      {/* Tombol Belajar Lagi */}
                      <button
                        type="button"
                        onClick={() => {
                          if (onNavigateNav) onNavigateNav("classroom");
                          else setActiveMainTab("in-progress");
                          if (typeof window !== "undefined") {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }
                        }}
                        style={{
                          background: "#10B981",
                          color: "#FFFFFF",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          boxShadow: "0 2px 6px rgba(16, 185, 129, 0.2)",
                        }}
                      >
                        <FlatIcon type="refresh" size={12} color="#FFFFFF" />
                        <span>Belajar Lagi</span>
                      </button>

                      {/* Tombol Koridor Kelas */}
                      {onOpenKoridor && (
                        <button
                          type="button"
                          onClick={() => onOpenKoridor(item.title)}
                          style={{
                            background: "var(--bx-bg)",
                            border: "1px solid var(--bx-border)",
                            color: "var(--bx-ink-bright)",
                            padding: "6px 10px",
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <FlatIcon type="award" size={12} color="var(--gold)" />
                          <span>Koridor Kelas</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal Lihat Sertifikat Kelulusan */}
      {selectedCertificate && (
        <CertificateModal
          isOpen={!!selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
          certificate={selectedCertificate}
          onStudyAgain={() => {
            setSelectedCertificate(null);
            setActiveMainTab("in-progress");
            if (typeof window !== "undefined") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        />
      )}
    </div>
  );
}
