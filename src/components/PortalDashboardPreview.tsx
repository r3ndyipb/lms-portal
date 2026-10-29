"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import FlatIcon from "./FlatIcon";

interface UserProfile {
  name: string;
  email: string;
  role: "siswa" | "reviewer" | "instruktur";
  enrolledTrack: string;
  studentId: string;
  streak: number;
  xp: number;
  avatar: string;
}

interface ModuleNode {
  id: string;
  number: number;
  title: string;
  status: "completed" | "current" | "locked";
  completedDate?: string;
  duration?: string;
  score?: string;
  access?: "free" | "premium"; // freemium
}

interface StageNode {
  id: string;
  stageNumber: number;
  title: string;
  status: "completed" | "current" | "locked";
  progressText: string;
  modules: ModuleNode[];
}

interface CurriculumProgress {
  id: string;
  title: string;
  category: string;
  level: string;
  progress: number;
  completedModules: number;
  totalModules: number;
  instructor: string;
  lastStudied: string;
  learningPeriodTotalDays: number;
  daysRemaining: number;
  deadlineDate: string;
  isDroppedOut?: boolean;
  isLearningPeriodExpired?: boolean;
  unreadReviewsCount?: number;
  stages: StageNode[];
  completedMilestones: { title: string; date: string; badge: string }[];
}

export const getProgressTheme = (progress: number) => {
  if (progress >= 65) {
    return {
      textColor: "#10B981", // Hijau (progres tinggi)
      bgColor: "rgba(16, 185, 129, 0.12)",
      borderColor: "rgba(16, 185, 129, 0.35)",
      barGradient: "linear-gradient(90deg, #10B981 0%, #059669 100%)",
      label: "Tinggi",
    };
  }
  if (progress >= 35) {
    return {
      textColor: "#F59E0B", // Kuning / Amber (progres menengah)
      bgColor: "rgba(245, 158, 11, 0.12)",
      borderColor: "rgba(245, 158, 11, 0.35)",
      barGradient: "linear-gradient(90deg, #F59E0B 0%, #D97706 100%)",
      label: "Menengah",
    };
  }
  return {
    textColor: "#EF4444", // Merah (progres awal/rendah)
    bgColor: "rgba(239, 68, 68, 0.12)",
    borderColor: "rgba(239, 68, 68, 0.35)",
    barGradient: "linear-gradient(90deg, #EF4444 0%, #DC2626 100%)",
    label: "Awal",
  };
};

const INITIAL_CURRICULA: CurriculumProgress[] = [
  {
    id: "aws-ai-academy",
    title: "AWS AI Academy - Level Dasar & Pemula",
    category: "Cloud & AI Academy",
    level: "Level Dasar & Pemula",
    progress: 50, // KUNING (35% - 64%)
    completedModules: 2,
    totalModules: 4,
    instructor: "AWS Certified AI/ML Specialist & Dicoding Elite",
    lastStudied: "Hari ini, 18:30 WIB",
    learningPeriodTotalDays: 90,
    daysRemaining: 66,
    deadlineDate: "31 Desember 2026 pukul 23.59 (66 hari lagi)",
    isDroppedOut: false,
    isLearningPeriodExpired: false,
    unreadReviewsCount: 1, // Ada review reviewer baru
    stages: [
      {
        id: "aws-st-1",
        stageNumber: 1,
        title: "Kurikulum Terstruktur AWS AI Academy",
        status: "current",
        progressText: "50% Selesai (2/4 Modul)",
        modules: [
          {
            id: "aws-m-1",
            number: 1,
            title: "Spec-Driven Development dengan Kiro",
            status: "completed",
            access: "free",
            completedDate: "20 Okt 2026",
            score: "100/100",
          },
          {
            id: "aws-m-2",
            number: 2,
            title: "Belajar Dasar Cloud dan Gen AI di AWS",
            status: "completed",
            access: "free",
            completedDate: "24 Okt 2026",
            score: "98/100",
          },
          {
            id: "aws-m-3",
            number: 3,
            title: "Memulai Pemrograman dengan Python",
            status: "current", // Belum dibaca / sedang dikerjakan -> tidak ada icon apapun
            access: "free",
            duration: "Estimasi: 3 Jam",
          },
          {
            id: "aws-m-4",
            number: 4,
            title: "Belajar Machine Learning untuk Pemula",
            status: "locked", // Terkunci -> icon gembok merah
            access: "premium",
          },
        ],
      },
    ],
    completedMilestones: [
      { title: "Sertifikat Kelulusan: Spec-Driven Development dengan Kiro", date: "20 Okt 2026", badge: "Terverifikasi" },
      { title: "Sertifikat Kelulusan: Belajar Dasar Cloud dan Gen AI di AWS", date: "24 Okt 2026", badge: "Terverifikasi" },
      { title: "Reviewer Feedback: Submission Modul 2 Disetujui", date: "25 Okt 2026", badge: "Bintang 5" },
    ],
  },
  {
    id: "dbs-genai-adv",
    title: "DBS Foundation - Gen AI & Advanced Engineering",
    category: "Financial & Enterprise AI",
    level: "Level Adv",
    progress: 40, // KUNING (35% - 64%)
    completedModules: 2,
    totalModules: 5,
    instructor: "Principal AI Architect @ DBS & Enterprise Tech Lead",
    lastStudied: "Kemarin, 21:10 WIB",
    learningPeriodTotalDays: 60,
    daysRemaining: 35,
    deadlineDate: "30 November 2026 pukul 23.59 (35 hari lagi)",
    isDroppedOut: false,
    isLearningPeriodExpired: false,
    unreadReviewsCount: 0,
    stages: [
      {
        id: "dbs-st-1",
        stageNumber: 1,
        title: "Kurikulum Lanjut Gen AI & Enterprise Engineering",
        status: "current",
        progressText: "40% Selesai (2/5 Modul)",
        modules: [
          {
            id: "dbs-m-1",
            number: 1,
            title: "Arsitektur Transformer, Attention Mechanism & LLM Internals",
            status: "completed",
            access: "free",
            completedDate: "14 Okt 2026",
            score: "96/100",
          },
          {
            id: "dbs-m-2",
            number: 2,
            title: "Advanced Prompt Engineering, ReAct & In-Context Reasoning",
            status: "completed",
            access: "free",
            completedDate: "19 Okt 2026",
            score: "98/100",
          },
          {
            id: "dbs-m-3",
            number: 3,
            title: "Enterprise Retrieval-Augmented Generation (RAG) & Vector Database",
            status: "current", // Belum dibaca / sedang berjalan -> tidak ada icon apapun
            access: "premium",
            duration: "Estimasi: 4 Jam",
          },
          {
            id: "dbs-m-4",
            number: 4,
            title: "Fine-Tuning Open Source LLMs (LoRA, QLoRA) & Quantization",
            status: "locked", // Terkunci -> icon gembok merah
            access: "premium",
          },
          {
            id: "dbs-m-5",
            number: 5,
            title: "Autonomous Multi-Agent Orchestration & Production Security Safeguards",
            status: "locked", // Terkunci -> icon gembok merah
            access: "premium",
          },
        ],
      },
    ],
    completedMilestones: [
      { title: "Sertifikat Kelulusan: LLM Internals & Attention Architecture", date: "14 Okt 2026", badge: "Terverifikasi" },
      { title: "Sertifikat Kelulusan: Advanced Prompt Engineering & Reasoning", date: "19 Okt 2026", badge: "Terverifikasi" },
    ],
  },
  {
    id: "fullstack-ai",
    title: "Fullstack Web & AI Architecture",
    category: "Learning Path Utama",
    level: "Tingkat Mahir",
    progress: 70, // HIJAU (>= 65%)
    completedModules: 14,
    totalModules: 20,
    instructor: "Lead Expert ANVIEO & Praktisi Industri",
    lastStudied: "Hari ini, 19:40 WIB",
    learningPeriodTotalDays: 90,
    daysRemaining: 18,
    deadlineDate: "14 November 2026 pukul 23.59 (18 hari lagi)",
    isDroppedOut: false,
    isLearningPeriodExpired: false,
    unreadReviewsCount: 1, // Ada 1 review baru yang belum dibaca -> munculkan badge
    stages: [
      {
        id: "st-1",
        stageNumber: 1,
        title: "Tahap 1: Fondasi Arsitektur Web & TypeScript Rigorous",
        status: "completed",
        progressText: "100% Selesai (3/3 Modul)",
        modules: [
          { id: "m-1", number: 1, title: "HTML5 Semantics, WAI-ARIA & Modern CSS Grid/Flexbox", status: "completed", access: "free", completedDate: "12 Okt 2026", score: "100/100" },
          { id: "m-2", number: 2, title: "Modern JavaScript (ES2024) & TypeScript Rigorous Types", status: "completed", access: "free", completedDate: "16 Okt 2026", score: "98/100" },
          { id: "m-3", number: 3, title: "Next.js 15+ App Router, React Server Components & Server Actions", status: "completed", access: "premium", completedDate: "20 Okt 2026", score: "95/100" },
        ],
      },
      {
        id: "st-2",
        stageNumber: 2,
        title: "Tahap 2: Backend Microservices & High-Trust Database",
        status: "completed",
        progressText: "100% Selesai (2/2 Modul)",
        modules: [
          { id: "m-13", number: 13, title: "Distributed Caching with Redis & Async Task Message Queues", status: "completed", access: "premium", completedDate: "22 Okt 2026", score: "96/100" },
          { id: "m-14", number: 14, title: "Middleware Pipeline, JWT, RBAC & PostgreSQL Audit Security", status: "completed", access: "premium", completedDate: "24 Okt 2026", score: "⭐ 5/5" },
        ],
      },
      {
        id: "st-3",
        stageNumber: 3,
        title: "Tahap 3: AI Copilot Integration & In-Browser Cloud Containers",
        status: "current",
        progressText: "50% Sedang Berjalan (1/2 Modul)",
        modules: [
          { id: "m-15", number: 15, title: "Integrasi WebContainers & Socratic AI Reasoning Playground", status: "current", access: "premium", duration: "Estimasi: 3 Jam" },
          { id: "m-16", number: 16, title: "Uji Beban Mikroservis, Rate Limiting & High-Concurrency Systems", status: "locked", access: "premium" },
        ],
      },
      {
        id: "st-4",
        stageNumber: 4,
        title: "Tahap 4: Capstone Project & Sertifikasi Kompetensi Terverifikasi",
        status: "locked",
        progressText: "Terkunci (0/3 Modul)",
        modules: [
          { id: "m-20", number: 20, title: "Submission Capstone Enterprise Application & Final Peer Review", status: "locked", access: "premium" },
        ],
      },
    ],
    completedMilestones: [
      { title: "Sertifikat Kelulusan: Arsitektur Modern Frontend & Next.js", date: "20 Okt 2026", badge: "Terverifikasi" },
      { title: "Sertifikat Kelulusan: High-Performance Database & Security", date: "24 Okt 2026", badge: "Terverifikasi" },
      { title: "Evaluasi Submission Proyek 1: Bintang 5 Reviewer", date: "24 Okt 2026", badge: "Reviewer Lolos" },
    ],
  },
  {
    id: "devops-cloud",
    title: "DevOps CI/CD & Automated Cloud Architecture",
    category: "Cloud & Infrastructure",
    level: "Tingkat Mahir",
    progress: 25, // MERAH (< 35%)
    completedModules: 3,
    totalModules: 12,
    instructor: "Senior DevOps Engineer @ Enterprise",
    lastStudied: "3 hari yang lalu",
    learningPeriodTotalDays: 60,
    daysRemaining: 5,
    deadlineDate: "01 November 2026 pukul 23.59 (5 hari lagi)",
    isDroppedOut: false,
    isLearningPeriodExpired: false,
    unreadReviewsCount: 0, // Tidak ada review baru -> tidak ada badge
    stages: [
      {
        id: "st-d1",
        stageNumber: 1,
        title: "Tahap 1: Linux CLI Administration & Automated Scripting",
        status: "completed",
        progressText: "100% Selesai (2/2 Modul)",
        modules: [
          { id: "dm-1", number: 1, title: "Linux CLI Mastery, Bash Scripting & File Permissions", status: "completed", access: "free", completedDate: "15 Okt 2026", score: "98/100" },
          { id: "dm-2", number: 2, title: "GitOps, Branch Protections & Release Tagging", status: "completed", access: "free", completedDate: "18 Okt 2026", score: "96/100" },
        ],
      },
      {
        id: "st-d2",
        stageNumber: 2,
        title: "Tahap 2: Containerization & Orchestration",
        status: "current",
        progressText: "33% Sedang Berjalan (1/3 Modul)",
        modules: [
          { id: "dm-4", number: 4, title: "Multi-Stage Docker Build & Kubernetes Pod Scheduling", status: "current", access: "premium", duration: "Estimasi: 4 Jam" },
          { id: "dm-5", number: 5, title: "Ingress Controllers & Let's Encrypt TLS Automation", status: "locked", access: "premium" },
        ],
      },
      {
        id: "st-d3",
        stageNumber: 3,
        title: "Tahap 3: Automated CI/CD & Zero-Downtime Pipeline",
        status: "locked",
        progressText: "Terkunci (0/4 Modul)",
        modules: [
          { id: "dm-12", number: 12, title: "GitHub Actions Enterprise Runner & Blue-Green Deployments", status: "locked", access: "premium" },
        ],
      },
    ],
    completedMilestones: [
      { title: "Sertifikat Kelulusan: Linux & GitOps Automation", date: "18 Okt 2026", badge: "Terverifikasi" },
    ],
  },
  {
    id: "machine-learning-agent",
    title: "Machine Learning & Autonomous Multi-Agent",
    category: "AI & Data Intelligence",
    level: "Tingkat Lanjutan",
    progress: 85, // HIJAU (>= 65%)
    completedModules: 17,
    totalModules: 20,
    instructor: "Dr. Rian Pratama, M.Sc · Senior AI Researcher",
    lastStudied: "Kemarin, 21:15 WIB",
    learningPeriodTotalDays: 90,
    daysRemaining: 42,
    deadlineDate: "15 Desember 2026 pukul 23.59 (42 hari lagi)",
    isDroppedOut: false,
    isLearningPeriodExpired: false,
    unreadReviewsCount: 0,
    stages: [
      {
        id: "st-ml-1",
        stageNumber: 1,
        title: "Tahap 1: Deep Learning Foundations & Vector Embeddings",
        status: "completed",
        progressText: "100% Selesai (3/3 Modul)",
        modules: [
          { id: "mlm-1", number: 1, title: "Neural Networks from Scratch & PyTorch Tensor Ops", status: "completed", access: "free", completedDate: "10 Okt 2026", score: "99/100" },
          { id: "mlm-2", number: 2, title: "Transformer Architecture & Self-Attention Mechanisms", status: "completed", access: "free", completedDate: "15 Okt 2026", score: "96/100" },
          { id: "mlm-3", number: 3, title: "Vector Embeddings & pgvector HNSW Indexing", status: "completed", access: "free", completedDate: "20 Okt 2026", score: "100/100" },
        ],
      },
      {
        id: "st-ml-2",
        stageNumber: 2,
        title: "Tahap 2: Autonomous Multi-Agent Orchestration & Tool Calling",
        status: "current",
        progressText: "50% Sedang Berjalan (1/2 Modul)",
        modules: [
          { id: "mlm-4", number: 4, title: "Multi-Agent ReAct Planning & Reflexion Loops", status: "current", access: "premium", duration: "Estimasi: 4 Jam" },
          { id: "mlm-5", number: 5, title: "Production Evaluation with RAG Triad & LLM-as-a-Judge", status: "locked", access: "premium" },
        ],
      },
    ],
    completedMilestones: [
      { title: "Sertifikat Kelulusan: Vector Search & Embeddings", date: "20 Okt 2026", badge: "Terverifikasi" },
    ],
  },
  {
    id: "cybersecurity-devsecops",
    title: "Cybersecurity Defense & Cloud Compliance",
    category: "Security & Cloud Defense",
    level: "Tingkat Menengah",
    progress: 40, // KUNING (35% - 64%)
    completedModules: 4,
    totalModules: 10,
    instructor: "Budi Santoso, CISSP · Security Architect",
    lastStudied: "4 hari yang lalu",
    learningPeriodTotalDays: 75,
    daysRemaining: 30,
    deadlineDate: "28 November 2026 pukul 23.59 (30 hari lagi)",
    isDroppedOut: false,
    isLearningPeriodExpired: false,
    unreadReviewsCount: 0,
    stages: [
      {
        id: "st-sec-1",
        stageNumber: 1,
        title: "Tahap 1: Network Defense & Zero-Trust Architecture",
        status: "completed",
        progressText: "100% Selesai (2/2 Modul)",
        modules: [
          { id: "secm-1", number: 1, title: "OWASP Top 10 API Security & Threat Modeling", status: "completed", access: "free", completedDate: "12 Okt 2026", score: "97/100" },
          { id: "secm-2", number: 2, title: "mTLS, Vault Secrets Management & Identity Federation", status: "completed", access: "free", completedDate: "18 Okt 2026", score: "95/100" },
        ],
      },
      {
        id: "st-sec-2",
        stageNumber: 2,
        title: "Tahap 2: DevSecOps Pipeline & SAST/DAST Automation",
        status: "current",
        progressText: "33% Sedang Berjalan (1/3 Modul)",
        modules: [
          { id: "secm-3", number: 3, title: "Automated Vulnerability Scanning with Trivy & Snyk", status: "current", access: "premium", duration: "Estimasi: 3.5 Jam" },
          { id: "secm-4", number: 4, title: "Container Runtime Security with Falco & eBPF", status: "locked", access: "premium" },
        ],
      },
    ],
    completedMilestones: [
      { title: "Sertifikat Kelulusan: Zero-Trust Network Defense", date: "18 Okt 2026", badge: "Terverifikasi" },
    ],
  },
];

interface PortalDashboardPreviewProps {
  onNavigateNav?: (navId: string) => void;
  onOpenKoridor?: (courseTitle?: string) => void;
}

export default function PortalDashboardPreview({ onNavigateNav, onOpenKoridor }: PortalDashboardPreviewProps = {}) {
  const [user, setUser] = useState<UserProfile>({
    name: "Rendy ariawindana",
    email: "rendy.ariawindana@gmail.com",
    role: "siswa",
    enrolledTrack: "AWS AI Academy - Level Dasar & Pemula",
    studentId: "ANV-2026-0842",
    streak: 7,
    xp: 2840,
    avatar: "/alumni/alumni_1.jpg",
  });

  // Running Curricula state (with masa belajar, DO, and freemium support)
  const [curricula, setCurricula] = useState<CurriculumProgress[]>(INITIAL_CURRICULA);

  // Active selected curriculum ID (default to first one)
  const [selectedCurriculumId, setSelectedCurriculumId] = useState<string>("aws-ai-academy");
  // Sub-tab inside curriculum: tree / reviewer / ai
  const [activeSubTab, setActiveSubTab] = useState<"tree" | "reviewer" | "ai">("tree");

  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  // Check-in state
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInRewardToast, setCheckInRewardToast] = useState(false);

  // Subscription state (disappears once subscribed / paid)
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionToast, setSubscriptionToast] = useState<string | null>(null);

  // Token redeem state
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [tokenInput, setTokenInput] = useState("");
  const [tokenFeedback, setTokenFeedback] = useState<{ text: string; success: boolean } | null>(null);

  // Event registration state
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);

  // Ref and state for tab group horizontal slide buttons
  const tabsScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkTabsScroll = () => {
    if (tabsScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsScrollRef.current;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
    }
  };

  useEffect(() => {
    checkTabsScroll();
    const el = tabsScrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkTabsScroll, { passive: true });
      window.addEventListener("resize", checkTabsScroll);
      return () => {
        el.removeEventListener("scroll", checkTabsScroll);
        window.removeEventListener("resize", checkTabsScroll);
      };
    }
  }, [curricula]);

  const handleScrollTabs = (direction: "left" | "right") => {
    if (tabsScrollRef.current) {
      const scrollAmount = 260;
      tabsScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkTabsScroll, 320);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("portal_user");
      if (stored) {
        try {
          setUser((prev) => ({ ...prev, ...JSON.parse(stored) }));
        } catch (e) {
          console.error(e);
        }
      }

      const storedSub = localStorage.getItem("portal_subscribed");
      if (storedSub === "true") {
        setIsSubscribed(true);
      }

      const storedCheckIn = localStorage.getItem("portal_checked_in_today");
      if (storedCheckIn === "true") {
        setIsCheckedIn(true);
      }
    }
  }, []);

  // Current active curriculum and its dynamic color theme (hijau/kuning/merah)
  const currentCurriculum =
    curricula.find((c) => c.id === selectedCurriculumId) || curricula[0];
  const activeTheme = getProgressTheme(currentCurriculum.progress);

  // Handler: Tandai review sudah dibaca -> badge otomatis hilang
  const handleMarkReviewRead = (curriculumId: string) => {
    setCurricula((prev) =>
      prev.map((c) => (c.id === curriculumId ? { ...c, unreadReviewsCount: 0 } : c))
    );
  };

  // Handler: Simulasi Drop Out (DO) toggle
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

  // Handler: Simulasi Masa Belajar Selesai (Expired) toggle
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

  // Handler: Beli materi lagi setelah Drop Out -> reset ke 0% dan mulai dari awal (Modul 1)
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
    setActiveSubTab("tree");
    setSubscriptionToast(`Kurikulum "${currentCurriculum.title}" berhasil dibeli kembali! Progres telah di-reset dan dimulai dari awal (Modul 1).`);
    setTimeout(() => setSubscriptionToast(null), 5000);
  };

  // Handler: Buka materi dengan pengecekan freemium
  const handleOpenModule = (module: ModuleNode) => {
    if (module.access === "premium" && !isSubscribed) {
      alert(
        `[Materi Premium Terkunci]\n\nModul ${module.number}: "${module.title}" memerlukan paket langganan aktif.\n\nSilakan berlangganan atau aktifkan Coba Gratis 7 Hari pada panel Langganan untuk membuka modul ini dan unlimited code review.`
      );
      return;
    }
    alert(`Membuka materi pembelajaran:\nModul ${module.number}: ${module.title}`);
  };

  const handleAskAi = (promptText: string) => {
    setAiPrompt(promptText);
    setAiResponse("Memproses logika analisis...");
    setTimeout(() => {
      if (promptText.includes("Error")) {
        setAiResponse(
          "**Socratic Guidance**: Error 'Hydration failed' biasanya terjadi karena perbedaan render antara server HTML dan client DOM (misal penggunaan `typeof window` tanpa `useEffect` atau mismatch tag `<p>` di dalam `<div>`). Coba pastikan komponen dinamis dieksekusi setelah komponen termount di browser!"
        );
      } else if (promptText.includes("Logika")) {
        setAiResponse(
          "**Petunjuk Algoritma**: Untuk mencari elemen duplikat dalam O(n), gunakan struktur data Set atau Hash Map. Apakah kamu sudah mencoba memetakan frekuensi kemunculan setiap nilai saat iterasi array pertama?"
        );
      } else {
        setAiResponse(
          "**Tips Arsitektur**: Selalu buat database index pada kolom foreign key dan kolom yang sering masuk klausul WHERE atau ORDER BY untuk menghindari Full Table Scan pada PostgreSQL."
        );
      }
    }, 500);
  };

  const handleCheckIn = () => {
    if (isCheckedIn) return;
    setIsCheckedIn(true);
    setUser((prev) => ({
      ...prev,
      xp: prev.xp + 20,
    }));
    setCheckInRewardToast(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("portal_checked_in_today", "true");
    }
    setTimeout(() => setCheckInRewardToast(false), 4000);
  };

  const handleSubscribe = () => {
    setIsSubscribed(true);
    setSubscriptionToast("Pembayaran langganan berhasil! Akses penuh seluruh kelas telah aktif.");
    if (typeof window !== "undefined") {
      localStorage.setItem("portal_subscribed", "true");
    }
    setTimeout(() => setSubscriptionToast(null), 5000);
  };

  const handleFreeTrial = () => {
    setIsSubscribed(true);
    setSubscriptionToast("Mode Coba Gratis 7 Hari aktif! Nikmati akses penuh ke seluruh kurikulum.");
    if (typeof window !== "undefined") {
      localStorage.setItem("portal_subscribed", "true");
    }
    setTimeout(() => setSubscriptionToast(null), 5000);
  };

  const handleRedeemToken = () => {
    const trimmed = tokenInput.trim();
    if (!trimmed) {
      setTokenFeedback({ text: "Silakan masukkan kode token terlebih dahulu.", success: false });
      return;
    }
    setIsSubscribed(true);
    setTokenFeedback({ text: `Token "${trimmed.toUpperCase()}" berhasil di-redeem! Akses langganan aktif.`, success: true });
    setSubscriptionToast(`Token ${trimmed.toUpperCase()} berhasil divalidasi! Akses penuh aktif.`);
    if (typeof window !== "undefined") {
      localStorage.setItem("portal_subscribed", "true");
    }
    setTokenInput("");
    setTimeout(() => {
      setTokenFeedback(null);
      setShowTokenInput(false);
      setSubscriptionToast(null);
    }, 5000);
  };

  const handleResetSubscription = () => {
    setIsSubscribed(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("portal_subscribed");
    }
  };

  const handleToggleEvent = (eventId: string) => {
    setRegisteredEvents((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  const handleGoToEvents = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (onNavigateNav) {
      onNavigateNav("event");
    } else if (typeof window !== "undefined") {
      window.location.href = "/events";
    }
  };

  return (
    <div className="portal-content-fluid">
      {/* =========================================================================
          1. MINIMALIST SINGLE-LINE GREETING (TIDAK BOROS TEMPAT)
          ========================================================================= */}
      <div className="portal-welcome-strip">
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.15rem",
              fontWeight: 800,
              color: "var(--bx-ink-bright)",
              margin: 0,
              lineHeight: 1,
            }}
          >
            Selamat Datang, {user.name}!
          </h1>
          <span style={{ color: "var(--bx-muted)", fontSize: "0.8125rem" }}>·</span>
          <span style={{ fontSize: "0.78125rem", color: "var(--bx-muted)" }}>
            Jalur Aktif: <strong style={{ color: "var(--bx-ink-bright)" }}>{user.enrolledTrack}</strong>
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              color: "var(--gold)",
              background: "rgba(201, 150, 46, 0.12)",
              border: "1px solid rgba(201, 150, 46, 0.3)",
              padding: "2px 8px",
              borderRadius: "4px",
              fontWeight: 700,
            }}
          >
            {user.studentId || "ANV-2026-0842"}
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--bx-muted)", textTransform: "uppercase" }}>
            PORTAL SISWA
          </span>
        </div>
      </div>

      {/* Floating Feedback Toasts */}
      {subscriptionToast && (
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
            <span>{subscriptionToast}</span>
          </span>
          <button
            type="button"
            onClick={() => setSubscriptionToast(null)}
            style={{ background: "none", border: "none", color: "#10B981", cursor: "pointer", display: "flex", alignItems: "center" }}
            aria-label="Tutup notifikasi"
          >
            <FlatIcon type="close" size={14} color="#10B981" />
          </button>
        </div>
      )}

      {checkInRewardToast && (
        <div
          style={{
            background: "rgba(201, 150, 46, 0.15)",
            border: "1px solid var(--gold)",
            color: "var(--gold)",
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
            <FlatIcon type="flame" size={16} color="#F97316" />
            <span>Check-in berhasil! Kamu mendapatkan bonus <strong>+20 XP</strong> hari ini.</span>
          </span>
          <button
            type="button"
            onClick={() => setCheckInRewardToast(false)}
            style={{ background: "none", border: "none", color: "var(--gold)", cursor: "pointer", display: "flex", alignItems: "center" }}
            aria-label="Tutup notifikasi"
          >
            <FlatIcon type="close" size={14} color="var(--gold)" />
          </button>
        </div>
      )}

      {/* =========================================================================
          2. MAIN SECTION: PROGRES BELAJAR (TREE VIEW) & CARD CHECK-IN HARIAN (DI SAMPING)
          ========================================================================= */}
      <div className="portal-dash-main-grid">
        {/* =========================================================================
            LEFT COLUMN: PROGRES BELAJAR (TREE VIEW 3 SILABUS BERJALAN)
            ========================================================================= */}
        <div style={{ minWidth: 0, maxWidth: "100%", width: "100%", boxSizing: "border-box" }}>
          {/* Header Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", flexWrap: "wrap", gap: "10px" }}>
            <div style={{ minWidth: 0 }}>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.3rem",
                  fontWeight: 800,
                  color: "var(--bx-ink-bright)",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                Progres Belajar
              </h2>
              <span style={{ fontSize: "0.78125rem", color: "var(--bx-muted)" }}>
                Silabus berjalan dalam bentuk roadmap tree &amp; materi yang telah diselesaikan
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onNavigateNav) onNavigateNav("progres");
                else if (typeof window !== "undefined") window.location.hash = "progres";
              }}
              style={{
                fontSize: "0.8125rem",
                color: "var(--gold)",
                fontWeight: 700,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                flexShrink: 0,
              }}
            >
              Lihat Progres Belajar Lengkap →
            </button>
          </div>

          {/* Curricula Tabs Switcher with Left & Right Slider Buttons */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "16px",
              width: "100%",
              maxWidth: "100%",
              boxSizing: "border-box",
            }}
          >
            {/* Tombol Slide Kiri */}
            <button
              type="button"
              onClick={() => handleScrollTabs("left")}
              disabled={!canScrollLeft}
              style={{
                width: "32px",
                height: "36px",
                borderRadius: "6px",
                border: "1px solid var(--bx-border)",
                background: "var(--bx-surface-card)",
                color: canScrollLeft ? "var(--gold)" : "var(--bx-muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: canScrollLeft ? "pointer" : "default",
                opacity: canScrollLeft ? 1 : 0.35,
                transition: "all 0.15s ease",
                flexShrink: 0,
                boxShadow: canScrollLeft ? "0 2px 6px rgba(0,0,0,0.12)" : "none",
              }}
              onMouseEnter={(e) => {
                if (canScrollLeft) {
                  e.currentTarget.style.borderColor = "var(--gold)";
                  e.currentTarget.style.background = "var(--bx-surface)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--bx-border)";
                e.currentTarget.style.background = "var(--bx-surface-card)";
              }}
              title="Geser Tab Learning Path ke Kiri"
              aria-label="Geser Tab Learning Path ke Kiri"
            >
              <FlatIcon type="chevron-left" size={15} color="currentColor" />
            </button>

            {/* Scrollable Tabs Wrapper */}
            <div
              ref={tabsScrollRef}
              className="portal-tabs-scroll-hidden"
              style={{
                display: "flex",
                gap: "8px",
                overflowX: "auto",
                scrollBehavior: "smooth",
                padding: "2px 0",
                flex: "1 1 auto",
                minWidth: 0,
                boxSizing: "border-box",
              }}
            >
              {curricula.map((curriculum) => {
                const isSelected = selectedCurriculumId === curriculum.id;
                const theme = getProgressTheme(curriculum.progress);

                return (
                  <button
                    key={curriculum.id}
                    type="button"
                    onClick={(e) => {
                      setSelectedCurriculumId(curriculum.id);
                      setActiveSubTab("tree");
                      e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
                    }}
                    style={{
                      padding: "8px 14px",
                      borderRadius: "6px",
                      border: isSelected ? `1px solid ${theme.borderColor}` : "1px solid var(--bx-border)",
                      background: isSelected ? "var(--bx-surface-card)" : "var(--bx-bg)",
                      color: isSelected ? "var(--bx-ink-bright)" : "var(--bx-muted)",
                      fontWeight: isSelected ? 700 : 500,
                      fontSize: "0.8125rem",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      flexShrink: 0,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = "var(--bx-border-focus)";
                        e.currentTarget.style.color = "var(--bx-ink-bright)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = "var(--bx-border)";
                        e.currentTarget.style.color = "var(--bx-muted)";
                      }
                    }}
                  >
                    <FlatIcon type="tree" size={14} color={isSelected ? theme.textColor : "var(--bx-muted)"} />
                    <span>{curriculum.title}</span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6875rem",
                        padding: "2px 7px",
                        borderRadius: "4px",
                        background: theme.bgColor,
                        color: theme.textColor,
                        border: `1px solid ${theme.borderColor}`,
                        fontWeight: 800,
                      }}
                    >
                      {curriculum.progress}%
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Tombol Slide Kanan */}
            <button
              type="button"
              onClick={() => handleScrollTabs("right")}
              disabled={!canScrollRight}
              style={{
                width: "32px",
                height: "36px",
                borderRadius: "6px",
                border: "1px solid var(--bx-border)",
                background: "var(--bx-surface-card)",
                color: canScrollRight ? "var(--gold)" : "var(--bx-muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: canScrollRight ? "pointer" : "default",
                opacity: canScrollRight ? 1 : 0.35,
                transition: "all 0.15s ease",
                flexShrink: 0,
                boxShadow: canScrollRight ? "0 2px 6px rgba(0,0,0,0.12)" : "none",
              }}
              onMouseEnter={(e) => {
                if (canScrollRight) {
                  e.currentTarget.style.borderColor = "var(--gold)";
                  e.currentTarget.style.background = "var(--bx-surface)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--bx-border)";
                e.currentTarget.style.background = "var(--bx-surface-card)";
              }}
              title="Geser Tab Learning Path ke Kanan"
              aria-label="Geser Tab Learning Path ke Kanan"
            >
              <FlatIcon type="chevron-right" size={15} color="currentColor" />
            </button>
          </div>

          {/* Active Curriculum Main Card (Tanpa border berwarna di kirinya) */}
          <div className="portal-dash-card" style={{ marginBottom: 0, padding: "20px" }}>
            {/* Header: Overview of Active Curriculum */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "14px" }}>
              <div style={{ flex: "1 1 320px", minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "6px" }}>
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: "4px",
                      background: "rgba(201, 150, 46, 0.1)",
                      border: "1px solid rgba(201, 150, 46, 0.25)",
                      color: "var(--gold)",
                      textTransform: "uppercase",
                    }}
                  >
                    {currentCurriculum.category}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>· {currentCurriculum.level}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>· Terakhir dipelajari: {currentCurriculum.lastStudied}</span>
                </div>

                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 800, margin: "0 0 4px", color: "var(--bx-ink-bright)" }}>
                  {currentCurriculum.title}
                </h3>
                <div style={{ fontSize: "0.78125rem", color: "var(--bx-muted)", marginBottom: "8px" }}>
                  Instruktur: {currentCurriculum.instructor}
                </div>

                {/* Masa Belajar & Batas Waktu */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", paddingTop: "4px" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)", display: "inline-flex", alignItems: "center", gap: "5px" }}>
                    <FlatIcon type="clock" size={13} color="var(--bx-muted)" />
                    Masa Belajar: <strong style={{ color: "var(--bx-ink-bright)" }}>{currentCurriculum.learningPeriodTotalDays} Hari</strong>
                  </span>
                  <span style={{ color: "var(--bx-muted)", fontSize: "0.75rem" }}>·</span>
                  <span style={{ fontSize: "0.75rem", display: "inline-flex", alignItems: "center", gap: "5px" }}>
                    {currentCurriculum.isDroppedOut ? (
                      <span style={{ color: "#EF4444", fontWeight: 700, background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", padding: "2px 8px", borderRadius: "4px" }}>
                        Status: Drop Out (Waktu Habis)
                      </span>
                    ) : currentCurriculum.isLearningPeriodExpired ? (
                      <span style={{ color: "#EF4444", fontWeight: 700, background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", padding: "2px 8px", borderRadius: "4px" }}>
                        Masa Belajar Selesai ({currentCurriculum.deadlineDate})
                      </span>
                    ) : (
                      <span style={{ color: "var(--bx-muted)" }}>
                        <strong style={{ color: currentCurriculum.daysRemaining <= 7 ? "#EF4444" : "var(--gold)" }}>Deadline seluruh kelas: {currentCurriculum.deadlineDate}</strong>
                      </span>
                    )}
                  </span>

                  {/* Simulator Controls */}
                  <div style={{ display: "inline-flex", gap: "6px", marginLeft: "auto" }}>
                    <button
                      type="button"
                      onClick={() => handleToggleExpired(currentCurriculum.id)}
                      style={{
                        fontSize: "0.6875rem",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        border: "1px solid var(--bx-border)",
                        background: currentCurriculum.isLearningPeriodExpired ? "rgba(239, 68, 68, 0.15)" : "var(--bx-surface)",
                        color: currentCurriculum.isLearningPeriodExpired ? "#EF4444" : "var(--bx-muted)",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                      title="Klik untuk mensimulasikan masa belajar selesai"
                    >
                      {currentCurriculum.isLearningPeriodExpired ? "Batal Expired" : "Simulasi Expired"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleDropOut(currentCurriculum.id)}
                      style={{
                        fontSize: "0.6875rem",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        border: "1px solid var(--bx-border)",
                        background: currentCurriculum.isDroppedOut ? "rgba(239, 68, 68, 0.15)" : "var(--bx-surface)",
                        color: currentCurriculum.isDroppedOut ? "#EF4444" : "var(--bx-muted)",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                      title="Klik untuk mensimulasikan Drop Out"
                    >
                      {currentCurriculum.isDroppedOut ? "Batal DO" : "Simulasi Drop Out"}
                    </button>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: activeTheme.textColor,
                  }}
                >
                  {currentCurriculum.progress}% SELESAI
                </div>
                <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>
                  {currentCurriculum.completedModules} dari {currentCurriculum.totalModules} Modul Tuntas
                </span>
              </div>
            </div>

            {/* Progress Bar (Gradien sesuai persentase hijau/kuning/merah) */}
            <div className="portal-progress-bar-wrap" style={{ margin: "6px 0 16px" }}>
              <div
                className="portal-progress-bar-fill"
                style={{
                  width: `${currentCurriculum.progress}%`,
                  background: activeTheme.barGradient,
                }}
              />
            </div>

            {/* Navigation Sub-Tabs: Tree Silabus, Reviewer 1-on-1, Socratic Tutor, Selesai */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                borderBottom: "1px solid var(--bx-border)",
                marginBottom: "18px",
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                onClick={() => setActiveSubTab("tree")}
                style={{
                  padding: "8px 14px",
                  fontSize: "0.84375rem",
                  fontWeight: 700,
                  color: activeSubTab === "tree" ? "var(--gold)" : "var(--bx-muted)",
                  borderBottom: activeSubTab === "tree" ? "2px solid var(--gold)" : "none",
                  background: "none",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <FlatIcon type="tree" size={14} color={activeSubTab === "tree" ? "var(--gold)" : "var(--bx-muted)"} />
                <span>Silabus Berjalan (Tree)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSubTab("reviewer")}
                style={{
                  padding: "8px 14px",
                  fontSize: "0.84375rem",
                  fontWeight: 700,
                  color: activeSubTab === "reviewer" ? "var(--gold)" : "var(--bx-muted)",
                  borderBottom: activeSubTab === "reviewer" ? "2px solid var(--gold)" : "none",
                  background: "none",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <FlatIcon type="user" size={14} color={activeSubTab === "reviewer" ? "var(--gold)" : "var(--bx-muted)"} />
                <span>Reviewer 1 on 1</span>
                {Boolean(currentCurriculum.unreadReviewsCount && currentCurriculum.unreadReviewsCount > 0) && (
                  <span
                    style={{
                      background: "#EF4444",
                      color: "#FFFFFF",
                      fontSize: "0.6875rem",
                      fontWeight: 800,
                      padding: "1px 7px",
                      borderRadius: "9999px",
                      lineHeight: "1.2",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {currentCurriculum.unreadReviewsCount} Baru
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveSubTab("ai")}
                style={{
                  padding: "8px 14px",
                  fontSize: "0.84375rem",
                  fontWeight: 700,
                  color: activeSubTab === "ai" ? "var(--gold)" : "var(--bx-muted)",
                  borderBottom: activeSubTab === "ai" ? "2px solid var(--gold)" : "none",
                  background: "none",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <FlatIcon type="brain" size={14} color={activeSubTab === "ai" ? "var(--gold)" : "var(--bx-muted)"} />
                <span>Socratic Tutor</span>
              </button>
            </div>

            {/* TAB 1: TREE VIEW SILABUS BERJALAN */}
            {activeSubTab === "tree" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", flexWrap: "wrap", gap: "10px" }}>
                  <span style={{ fontSize: "0.78125rem", color: "var(--bx-muted)", fontWeight: 600 }}>
                    Roadmap &amp; modul terstruktur dari awal hingga capstone certification:
                  </span>
                </div>

                {/* Tree Branches */}
                <div>
                  {currentCurriculum.stages.map((stage) => {
                    const isStageCompleted = stage.status === "completed";
                    const isStageCurrent = stage.status === "current";

                    return (
                      <div key={stage.id} className="portal-tree-stage">
                        {/* Stage Root Node */}
                        <div className="portal-tree-stage-header">
                          <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0, flex: "1 1 auto" }}>
                            {isStageCompleted ? (
                              <span
                                style={{
                                  width: "22px",
                                  height: "22px",
                                  borderRadius: "50%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  background: "rgba(16, 185, 129, 0.15)",
                                  color: "#10B981",
                                  flexShrink: 0,
                                }}
                              >
                                <FlatIcon type="check" size={12} color="#10B981" />
                              </span>
                            ) : stage.status === "locked" ? (
                              <span
                                style={{
                                  width: "22px",
                                  height: "22px",
                                  borderRadius: "50%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  background: "rgba(239, 68, 68, 0.08)",
                                  color: "#EF4444",
                                  flexShrink: 0,
                                }}
                              >
                                <FlatIcon type="lock" size={12} color="#EF4444" />
                              </span>
                            ) : null}
                            <span style={{ color: "var(--bx-ink-bright)", wordBreak: "break-word" }}>
                              {stage.title}
                            </span>
                          </div>

                          <span
                            style={{
                              fontSize: "0.71875rem",
                              fontWeight: 600,
                              color: isStageCompleted ? "#10B981" : isStageCurrent ? "var(--gold)" : "#EF4444",
                              flexShrink: 0,
                            }}
                          >
                            {stage.progressText}
                          </span>
                        </div>

                        {/* Stage Child Module Nodes */}
                        <div className="portal-tree-branch">
                          {stage.modules.map((module) => {
                            const isModuleCompleted = module.status === "completed";
                            const isModuleCurrent = module.status === "current";
                            const isModuleLocked = module.status === "locked";

                            return (
                              <div
                                key={module.id}
                                className={`portal-tree-node portal-module-row ${isModuleLocked ? "portal-module-locked" : ""}`}
                                onClick={() => handleOpenModule(module)}
                                title={
                                  isModuleLocked
                                    ? `Modul ${module.number}: ${module.title} (Terkunci)`
                                    : `Klik untuk masuk ke materi: Modul ${module.number}: ${module.title}`
                                }
                                style={isModuleLocked ? { cursor: "not-allowed", opacity: 0.82 } : undefined}
                              >
                                <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0, flex: "1 1 auto" }}>
                                  {isModuleCompleted ? (
                                    <span
                                      style={{
                                        width: "22px",
                                        height: "22px",
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        background: "rgba(16, 185, 129, 0.12)",
                                        color: "#10B981",
                                        flexShrink: 0,
                                      }}
                                    >
                                      <FlatIcon type="check" size={13} color="#10B981" />
                                    </span>
                                  ) : isModuleLocked ? (
                                    <span
                                      style={{
                                        width: "22px",
                                        height: "22px",
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        background: "rgba(239, 68, 68, 0.08)",
                                        color: "#EF4444",
                                        flexShrink: 0,
                                      }}
                                    >
                                      <FlatIcon type="lock" size={12} color="#EF4444" />
                                    </span>
                                  ) : null}

                                  <div style={{ minWidth: 0, wordBreak: "break-word" }}>
                                    <div
                                      style={{
                                        fontSize: "0.8125rem",
                                        fontWeight: isModuleCurrent ? 700 : 600,
                                        color: isModuleCurrent
                                          ? "var(--bx-ink-bright)"
                                          : isModuleCompleted
                                          ? "var(--bx-ink-bright)"
                                          : "var(--bx-muted)",
                                        wordBreak: "break-word",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                      }}
                                    >
                                      <span>
                                        Modul {module.number}: {module.title}
                                      </span>
                                    </div>

                                    {module.completedDate && (
                                      <span style={{ fontSize: "0.6875rem", color: "var(--bx-muted)" }}>
                                        Selesai pada {module.completedDate}
                                      </span>
                                    )}
                                    {module.duration && (
                                      <span style={{ fontSize: "0.6875rem", color: "#10B981" }}>
                                        {module.duration} · Sedang Aktif Dipelajari
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Button "Koridor Kelas" hanya muncul jika modul TIDAK terlock */}
                                {!isModuleLocked && (
                                  <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                                    <button
                                      type="button"
                                      className="portal-koridor-btn"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (onOpenKoridor) {
                                          onOpenKoridor(module.title);
                                        } else if (onNavigateNav) {
                                          onNavigateNav("koridor-kelas");
                                        }
                                      }}
                                      title={`Masuk ke Koridor Kelas: ${module.title}`}
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
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: REVIEWER 1 ON 1 (Tanpa border berwarna di kiri) */}
            {activeSubTab === "reviewer" && (
              <div style={{ background: "var(--bx-bg)", border: "1px solid var(--bx-border)", borderRadius: "8px", padding: "18px" }}>
                {/* Banner review belum dibaca (Hanya muncul jika unreadReviewsCount > 0) */}
                {Boolean(currentCurriculum.unreadReviewsCount && currentCurriculum.unreadReviewsCount > 0) && (
                  <div
                    style={{
                      padding: "12px 14px",
                      background: "rgba(239, 68, 68, 0.08)",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      borderRadius: "6px",
                      marginBottom: "16px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <FlatIcon type="alert-circle" size={16} color="#EF4444" />
                      <span style={{ fontSize: "0.8125rem", color: "var(--bx-ink-bright)", fontWeight: 600 }}>
                        Ada <strong>{currentCurriculum.unreadReviewsCount} review baru</strong> yang belum kamu baca dari Reviewer!
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleMarkReviewRead(currentCurriculum.id)}
                      style={{
                        background: "#10B981",
                        color: "#fff",
                        border: "none",
                        padding: "5px 12px",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <FlatIcon type="check" size={12} color="#fff" />
                      Tandai Sudah Dibaca
                    </button>
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", flexWrap: "wrap", gap: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <img
                      src="/alumni/alumni_2.jpg"
                      alt="Reviewer"
                      style={{ width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover" }}
                    />
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--bx-ink-bright)" }}>
                        Budi Hartono <span style={{ fontWeight: 400, color: "var(--bx-muted)" }}>· Principal Engineer @ GoTo</span>
                      </div>
                      <span style={{ fontSize: "0.71875rem", color: "var(--bx-muted-soft)" }}>
                        Evaluasi Proyek Akhir Tahap 2 · SLA Waktu Review: 4.8 Jam (Jaminan &le; 24h)
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#10B981",
                      background: "rgba(16, 185, 129, 0.1)",
                      border: "1px solid #10B981",
                      padding: "4px 10px",
                      borderRadius: "9999px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span>LULUS · EVALUASI 5.0</span>
                    <span style={{ display: "inline-flex", gap: "2px" }}>
                      {[...Array(5)].map((_, i) => (
                        <FlatIcon key={i} type="star" size={12} color="var(--gold)" />
                      ))}
                    </span>
                  </div>
                </div>

                <div style={{ padding: "12px 14px", background: "var(--bx-surface)", border: "1px solid var(--bx-border)", borderRadius: "6px", marginBottom: "14px" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "4px" }}>
                    Catatan Komprehensif Reviewer:
                  </div>
                  <p style={{ fontSize: "0.8125rem", color: "var(--bx-prose-ink)", lineHeight: 1.6, margin: 0 }}>
                    &ldquo;Arsitektur Clean Architecture yang diterapkan pada Modul 14 sangat matang. Pemisahan layer Service dan Repository dengan dependency injection sangat konsisten. Unit test coverage mencapai 92%. Penanganan token refresh dan invalidation blacklist di Redis berjalan akurat.&rdquo;
                  </p>
                </div>

                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.71875rem", background: "rgba(201, 150, 46, 0.1)", color: "var(--gold)", padding: "3px 8px", borderRadius: "4px", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <FlatIcon type="check" size={12} color="var(--gold)" />
                    Kriteria 1: Clean Architecture
                  </span>
                  <span style={{ fontSize: "0.71875rem", background: "rgba(16, 185, 129, 0.1)", color: "#10B981", padding: "3px 8px", borderRadius: "4px", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <FlatIcon type="check" size={12} color="#10B981" />
                    Kriteria 2: 90%+ Test Coverage
                  </span>
                  <span style={{ fontSize: "0.71875rem", background: "rgba(14, 165, 233, 0.1)", color: "#0EA5E9", padding: "3px 8px", borderRadius: "4px", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <FlatIcon type="check" size={12} color="#0EA5E9" />
                    Kriteria 3: High-Performance Redis Caching
                  </span>
                </div>
              </div>
            )}

            {/* TAB 3: SOCRATIC TUTOR (Tanpa border berwarna di kiri) */}
            {activeSubTab === "ai" && (
              <div style={{ background: "var(--bx-bg)", border: "1px solid var(--bx-border)", borderRadius: "8px", padding: "18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(139, 92, 246, 0.12)", border: "1px solid rgba(139, 92, 246, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#8B5CF6" }}>
                    <FlatIcon type="brain" size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", margin: 0, color: "var(--bx-ink-bright)" }}>
                      Socratic AI Reasoning Tutor (24/7 Companion)
                    </h4>
                    <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>
                      Asisten pancingan logika socratic tanpa memberikan bocoran jawaban langsung
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
                  <button
                    type="button"
                    className="portal-demo-pill"
                    onClick={() => handleAskAi("Jelaskan Error Hydration mismatch di Next.js")}
                    style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                  >
                    <FlatIcon type="search" size={13} />
                    <span>Error Hydration di Next.js</span>
                  </button>
                  <button
                    type="button"
                    className="portal-demo-pill"
                    onClick={() => handleAskAi("Beri Petunjuk Logika mencari duplikat dalam O(n)")}
                    style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                  >
                    <FlatIcon type="brain" size={13} />
                    <span>Petunjuk Logika O(n)</span>
                  </button>
                  <button
                    type="button"
                    className="portal-demo-pill"
                    onClick={() => handleAskAi("Optimasi Indeks Kueri PostgreSQL")}
                    style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                  >
                    <FlatIcon type="lightning" size={13} />
                    <span>Optimasi Indeks SQL</span>
                  </button>
                </div>

                {aiResponse && (
                  <div style={{ background: "var(--bx-surface)", border: "1px solid var(--bx-border)", borderRadius: "6px", padding: "14px", fontSize: "0.8125rem", color: "var(--bx-ink-bright)", lineHeight: 1.6 }}>
                    <div style={{ fontWeight: 700, color: "#8B5CF6", marginBottom: "4px" }}>
                      Pertanyaan Siswa: &ldquo;{aiPrompt}&rdquo;
                    </div>
                    <div>{aiResponse}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: CARD CHECK-IN HARIAN (DI SAMPING PROGRES BELAJAR) & HOTLINE
            ========================================================================= */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", minWidth: 0, maxWidth: "100%", width: "100%", boxSizing: "border-box" }}>
          {/* Card Check-in Harian */}
          <div
            className="portal-dash-card"
            style={{
              marginBottom: 0,
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: "100%",
              boxSizing: "border-box",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <FlatIcon type="flame" size={20} color="#F97316" />
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.0625rem", margin: 0, color: "var(--bx-ink-bright)", fontWeight: 800 }}>
                    Check-in Harian
                  </h3>
                </div>
                <span style={{ fontSize: "0.75rem", color: "#F59E0B", fontWeight: 700 }}>
                  {user.streak} Hari Streak
                </span>
              </div>

              <p style={{ fontSize: "0.78125rem", color: "var(--bx-muted)", margin: "0 0 14px", lineHeight: 1.4 }}>
                Check-in setiap hari untuk menjaga rekor streak dan klaim bonus <strong>+20 XP</strong>!
              </p>

              {/* Streak day indicators */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  gap: "4px",
                  marginBottom: "16px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                {["Sel", "Rab", "Kam", "Jum", "Sab", "Min", "Sen"].map((d, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                    <div
                      style={{
                        width: "100%",
                        maxWidth: "32px",
                        height: "28px",
                        borderRadius: "50%",
                        background: i <= 5 || isCheckedIn ? "var(--gold)" : "var(--bx-border)",
                        color: i <= 5 || isCheckedIn ? "#0A2E52" : "var(--bx-muted)",
                        fontSize: "0.6875rem",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s ease",
                        margin: "0 auto",
                      }}
                    >
                      <FlatIcon type="check" size={12} color={i <= 5 || isCheckedIn ? "#0A2E52" : "var(--bx-muted)"} />
                    </div>
                    <span style={{ fontSize: "0.625rem", color: i === 6 ? "var(--gold)" : "var(--bx-muted)", fontWeight: i === 6 ? 700 : 500 }}>
                      {d}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="blackbox-pill"
              style={{
                width: "100%",
                padding: "10px",
                background: isCheckedIn ? "rgba(16, 185, 129, 0.15)" : "var(--gold)",
                color: isCheckedIn ? "#10B981" : "#0A2E52",
                borderColor: isCheckedIn ? "#10B981" : "var(--gold)",
                fontWeight: 700,
                fontSize: "0.8125rem",
                cursor: isCheckedIn ? "default" : "pointer",
                transition: "all 0.2s ease",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
              onClick={handleCheckIn}
              disabled={isCheckedIn}
            >
              {isCheckedIn ? (
                <>
                  <FlatIcon type="check" size={14} color="#10B981" />
                  <span>Sudah Check-in Hari Ini</span>
                </>
              ) : (
                <span>Check-in Hari Ini (+20 XP)</span>
              )}
            </button>
          </div>

          {/* Reviewer SLA Hotline Card */}
          <div className="portal-dash-card" style={{ marginBottom: 0, padding: "18px" }}>
            <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "0.9375rem", margin: "0 0 8px", color: "var(--bx-ink-bright)", display: "flex", alignItems: "center", gap: "8px" }}>
              <FlatIcon type="clock" size={15} color="var(--gold)" />
              <span>Jaminan SLA Reviewer</span>
            </h4>
            <p style={{ fontSize: "0.78125rem", color: "var(--bx-muted)", lineHeight: 1.5, margin: "0 0 10px" }}>
              Seluruh submission proyek Anda dijamin menerima feedback mendalam dalam <strong>&le; 24 jam</strong> oleh praktisi industri.
            </p>
            <div style={{ padding: "8px 12px", borderRadius: "6px", background: "var(--bx-bg)", border: "1px solid var(--bx-border)", fontSize: "0.75rem", color: "var(--bx-ink)", display: "flex", alignItems: "center", gap: "6px" }}>
              <span>Rata-rata respons saat ini: <strong>4.8 Jam</strong></span>
              <FlatIcon type="lightning" size={13} color="var(--gold)" />
            </div>
          </div>

          {/* Card Langganan untuk Akses Penuh (Pengganti Navigasi Cepat) */}
          <div
            className="portal-dash-card"
            style={{
              marginBottom: 0,
              padding: "18px",
              background: isSubscribed
                ? "var(--bx-surface-card)"
                : "linear-gradient(135deg, rgba(201, 150, 46, 0.08) 0%, rgba(10, 46, 82, 0.05) 100%), var(--bx-surface-card)",
              border: isSubscribed ? "1px solid var(--bx-border)" : "1px solid rgba(201, 150, 46, 0.4)",
              borderRadius: "10px",
              width: "100%",
              maxWidth: "100%",
              boxSizing: "border-box",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", gap: "8px" }}>
              <div style={{ minWidth: 0 }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    fontWeight: 700,
                    color: "var(--gold)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    background: "rgba(201, 150, 46, 0.12)",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    display: "inline-block",
                    marginBottom: "5px",
                  }}
                >
                  {isSubscribed ? "STATUS: AKTIF" : "UPGRADE AKSES"}
                </span>
                <h4
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.0625rem",
                    fontWeight: 800,
                    margin: 0,
                    color: "var(--bx-ink-bright)",
                    lineHeight: 1.25,
                  }}
                >
                  Langganan untuk Akses Penuh
                </h4>
              </div>
              <FlatIcon type="crown" size={24} color="var(--gold)" />
            </div>

            {/* List Benefit */}
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 16px 0",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {[
                "Sertifikat diakui global",
                "Unlimited submission",
                "Code review",
                "Forum diskusi",
              ].map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "0.78125rem",
                    color: "var(--bx-ink)",
                    fontWeight: 600,
                  }}
                >
                  <span
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      background: "rgba(16, 185, 129, 0.15)",
                      color: "#10B981",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <FlatIcon type="check" size={11} color="#10B981" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Tombol Berlangganan & Coba Gratis */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
              <button
                type="button"
                className="blackbox-pill blackbox-pill-blue"
                style={{
                  flex: "1 1 120px",
                  padding: "9px 12px",
                  fontSize: "0.78125rem",
                  fontWeight: 800,
                  justifyContent: "center",
                  cursor: "pointer",
                  textAlign: "center",
                }}
                onClick={handleSubscribe}
              >
                Berlangganan
              </button>
              <button
                type="button"
                className="portal-demo-pill"
                style={{
                  flex: "1 1 110px",
                  padding: "9px 12px",
                  fontSize: "0.78125rem",
                  fontWeight: 700,
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={handleFreeTrial}
              >
                Coba Gratis
              </button>
            </div>

            {/* Punya Token Section */}
            <div
              style={{
                borderTop: "1px dashed var(--bx-border)",
                paddingTop: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.78125rem", color: "var(--bx-muted)", fontWeight: 600 }}>
                  Punya token?
                </span>
                {!showTokenInput && (
                  <button
                    type="button"
                    onClick={() => setShowTokenInput(true)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--gold)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      padding: 0,
                      textDecoration: "underline",
                    }}
                  >
                    Input Token
                  </button>
                )}
              </div>

              {!showTokenInput ? (
                <button
                  type="button"
                  className="portal-demo-pill"
                  style={{
                    width: "100%",
                    padding: "8px",
                    fontSize: "0.78125rem",
                    fontWeight: 700,
                    color: "var(--gold)",
                    borderColor: "rgba(201, 150, 46, 0.45)",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowTokenInput(true)}
                >
                  Redeem Token
                </button>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <input
                      type="text"
                      value={tokenInput}
                      onChange={(e) => setTokenInput(e.target.value)}
                      placeholder="Masukkan kode token..."
                      style={{
                        flex: 1,
                        padding: "7px 10px",
                        fontSize: "0.75rem",
                        borderRadius: "6px",
                        border: "1px solid var(--bx-border)",
                        background: "var(--bx-bg)",
                        color: "var(--bx-ink-bright)",
                        fontFamily: "var(--font-mono)",
                        outline: "none",
                        minWidth: 0,
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleRedeemToken();
                      }}
                    />
                    <button
                      type="button"
                      className="blackbox-pill blackbox-pill-blue"
                      style={{ padding: "7px 12px", fontSize: "0.75rem", fontWeight: 700, flexShrink: 0 }}
                      onClick={handleRedeemToken}
                    >
                      Redeem
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowTokenInput(false)}
                    style={{ background: "none", border: "none", color: "var(--bx-muted)", fontSize: "0.6875rem", cursor: "pointer", textAlign: "right" }}
                  >
                    Batal
                  </button>
                </div>
              )}

              {tokenFeedback && (
                <div
                  style={{
                    padding: "6px 10px",
                    borderRadius: "4px",
                    fontSize: "0.71875rem",
                    fontWeight: 600,
                    background: tokenFeedback.success ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.12)",
                    color: tokenFeedback.success ? "#10B981" : "#EF4444",
                    border: `1px solid ${tokenFeedback.success ? "#10B981" : "#EF4444"}`,
                  }}
                >
                  {tokenFeedback.text}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. SECTION: STATUS BERLANGGANAN (Akan hilang jika sudah langganan / bayar)
          ========================================================================= */}
      {!isSubscribed && (
        <section id="langganan" style={{ marginBottom: "32px", width: "100%", maxWidth: "100%", boxSizing: "border-box" }}>
          <div
            style={{
              background: "linear-gradient(135deg, rgba(201, 150, 46, 0.12) 0%, rgba(10, 46, 82, 0.08) 100%), var(--bx-surface-card)",
              border: "1px solid var(--gold)",
              borderRadius: "10px",
              padding: "22px 26px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
              width: "100%",
              maxWidth: "100%",
              boxSizing: "border-box",
            }}
          >
            <div style={{ maxWidth: "680px", minWidth: 0, flex: "1 1 300px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(201, 150, 46, 0.2)", padding: "3px 10px", borderRadius: "4px", fontSize: "0.6875rem", fontWeight: 700, color: "var(--gold)", letterSpacing: "0.06em", marginBottom: "8px" }}>
                STATUS: BELUM BERLANGGANAN / TRIAL
              </div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", margin: "0 0 6px", color: "var(--bx-ink-bright)", fontWeight: 800 }}>
                Tingkatkan Akses ke Paket Berlangganan Penuh
              </h3>
              <p style={{ fontSize: "0.8125rem", color: "var(--bx-muted)", margin: 0, lineHeight: 1.5 }}>
                Buka akses ke 40+ kelas materi standar industri, review submission proyek tanpa batas kuota oleh Senior Engineer, serta sertifikat kompetensi yang diakui mitra rekrutmen.
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <button
                type="button"
                className="blackbox-pill blackbox-pill-blue"
                style={{ padding: "11px 22px", fontSize: "0.84375rem", fontWeight: 800 }}
                onClick={handleSubscribe}
              >
                Berlangganan Sekarang →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* If subscribed, render subtle test reset indicator for development verification */}
      {isSubscribed && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
          <button
            type="button"
            onClick={handleResetSubscription}
            style={{ fontSize: "0.6875rem", color: "var(--bx-muted)", background: "none", border: "1px dashed var(--bx-border)", padding: "4px 8px", borderRadius: "4px", cursor: "pointer" }}
            title="Reset status langganan untuk pengujian simulasi"
          >
            [Dev: Status Langganan Aktif · Klik untuk Reset]
          </button>
        </div>
      )}

      {/* =========================================================================
          4. SECTION: EVENT MENDATANG
          ========================================================================= */}
      <section id="event-mendatang" style={{ marginBottom: "40px", width: "100%", maxWidth: "100%", boxSizing: "border-box" }}>
        <div className="portal-dash-card" style={{ marginBottom: 0, width: "100%", maxWidth: "100%", boxSizing: "border-box" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", flexWrap: "wrap", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ width: "4px", height: "18px", background: "var(--gold)", borderRadius: "2px" }} />
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", margin: 0, color: "var(--bx-ink-bright)", fontWeight: 800 }}>
                Event Mendatang
              </h3>
            </div>
            <a
              href="/events"
              onClick={handleGoToEvents}
              style={{ fontSize: "0.8125rem", color: "var(--gold)", fontWeight: 700, textDecoration: "none", cursor: "pointer" }}
              title="Buka Halaman Daftar Event"
            >
              Lihat Semua Event →
            </a>
          </div>

          {/* Event Items List */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px", width: "100%", boxSizing: "border-box" }}>
            {/* Event 1 */}
            <div
              className="portal-module-item"
              style={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "stretch",
                gap: "14px",
                marginBottom: 0,
                minWidth: 0,
                maxWidth: "100%",
                boxSizing: "border-box",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", minWidth: 0 }}>
                <div style={{ textAlign: "center", background: "rgba(201, 150, 46, 0.12)", border: "1px solid rgba(201, 150, 46, 0.3)", borderRadius: "8px", padding: "6px 12px", minWidth: "56px", flexShrink: 0 }}>
                  <div style={{ fontSize: "0.6875rem", color: "var(--gold)", fontWeight: 700 }}>OKT</div>
                  <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--bx-ink-bright)", lineHeight: 1 }}>28</div>
                </div>
                <div style={{ minWidth: 0, wordBreak: "break-word" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.6875rem", background: "rgba(239, 68, 68, 0.1)", color: "#EF4444", padding: "2px 6px", borderRadius: "3px", fontWeight: 700 }}>
                      LIVE WEBINAR
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>19:30 - 21:00 WIB</span>
                  </div>
                  <div style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--bx-ink-bright)", lineHeight: 1.3, marginBottom: "4px" }}>
                    Mastering Distributed Microservices &amp; High-Concurrency Systems
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>
                    Bersama Budi Hartono (Principal Engineer @ GoTo)
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "4px" }}>
                <button
                  type="button"
                  onClick={handleGoToEvents}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "7px 16px",
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    borderRadius: "6px",
                    background: registeredEvents.includes("ev-1") ? "rgba(16, 185, 129, 0.12)" : "rgba(201, 150, 46, 0.12)",
                    border: registeredEvents.includes("ev-1") ? "1px solid #10B981" : "1px solid var(--gold)",
                    color: registeredEvents.includes("ev-1") ? "#10B981" : "var(--gold)",
                    cursor: "pointer",
                    transition: "all 0.18s ease",
                    boxSizing: "border-box",
                    lineHeight: 1.2,
                  }}
                  onMouseEnter={(e) => {
                    if (registeredEvents.includes("ev-1")) {
                      e.currentTarget.style.background = "#10B981";
                      e.currentTarget.style.color = "#0A0A0C";
                    } else {
                      e.currentTarget.style.background = "var(--gold)";
                      e.currentTarget.style.color = "#0A0A0C";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (registeredEvents.includes("ev-1")) {
                      e.currentTarget.style.background = "rgba(16, 185, 129, 0.12)";
                      e.currentTarget.style.color = "#10B981";
                    } else {
                      e.currentTarget.style.background = "rgba(201, 150, 46, 0.12)";
                      e.currentTarget.style.color = "var(--gold)";
                    }
                  }}
                  title="Buka Halaman Daftar Event"
                >
                  {registeredEvents.includes("ev-1") ? (
                    <>
                      <FlatIcon type="check" size={13} color="currentColor" />
                      <span>Terdaftar · Lihat Event</span>
                    </>
                  ) : (
                    <>
                      <span>Daftar Event</span>
                      <FlatIcon type="chevron-right" size={12} color="currentColor" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Event 2 */}
            <div
              className="portal-module-item"
              style={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "stretch",
                gap: "14px",
                marginBottom: 0,
                minWidth: 0,
                maxWidth: "100%",
                boxSizing: "border-box",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", minWidth: 0 }}>
                <div style={{ textAlign: "center", background: "rgba(14, 165, 233, 0.12)", border: "1px solid rgba(14, 165, 233, 0.3)", borderRadius: "8px", padding: "6px 12px", minWidth: "56px", flexShrink: 0 }}>
                  <div style={{ fontSize: "0.6875rem", color: "#0EA5E9", fontWeight: 700 }}>OKT</div>
                  <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--bx-ink-bright)", lineHeight: 1 }}>31</div>
                </div>
                <div style={{ minWidth: 0, wordBreak: "break-word" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.6875rem", background: "rgba(14, 165, 233, 0.1)", color: "#0EA5E9", padding: "2px 6px", borderRadius: "3px", fontWeight: 700 }}>
                      HANDS-ON WORKSHOP
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>14:00 - 17:00 WIB</span>
                  </div>
                  <div style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--bx-ink-bright)", lineHeight: 1.3, marginBottom: "4px" }}>
                    Building Autonomous AI Agents with LangChain &amp; Socratic LLMs
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>
                    Bersama Dr. Rian Pratama (Senior AI Researcher)
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "4px" }}>
                <button
                  type="button"
                  onClick={handleGoToEvents}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "7px 16px",
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    borderRadius: "6px",
                    background: registeredEvents.includes("ev-2") ? "rgba(16, 185, 129, 0.12)" : "rgba(201, 150, 46, 0.12)",
                    border: registeredEvents.includes("ev-2") ? "1px solid #10B981" : "1px solid var(--gold)",
                    color: registeredEvents.includes("ev-2") ? "#10B981" : "var(--gold)",
                    cursor: "pointer",
                    transition: "all 0.18s ease",
                    boxSizing: "border-box",
                    lineHeight: 1.2,
                  }}
                  onMouseEnter={(e) => {
                    if (registeredEvents.includes("ev-2")) {
                      e.currentTarget.style.background = "#10B981";
                      e.currentTarget.style.color = "#0A0A0C";
                    } else {
                      e.currentTarget.style.background = "var(--gold)";
                      e.currentTarget.style.color = "#0A0A0C";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (registeredEvents.includes("ev-2")) {
                      e.currentTarget.style.background = "rgba(16, 185, 129, 0.12)";
                      e.currentTarget.style.color = "#10B981";
                    } else {
                      e.currentTarget.style.background = "rgba(201, 150, 46, 0.12)";
                      e.currentTarget.style.color = "var(--gold)";
                    }
                  }}
                  title="Buka Halaman Daftar Event"
                >
                  {registeredEvents.includes("ev-2") ? (
                    <>
                      <FlatIcon type="check" size={13} color="currentColor" />
                      <span>Terdaftar · Lihat Event</span>
                    </>
                  ) : (
                    <>
                      <span>Daftar Event</span>
                      <FlatIcon type="chevron-right" size={12} color="currentColor" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Event 3 */}
            <div
              className="portal-module-item"
              style={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "stretch",
                gap: "14px",
                marginBottom: 0,
                minWidth: 0,
                maxWidth: "100%",
                boxSizing: "border-box",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", minWidth: 0 }}>
                <div style={{ textAlign: "center", background: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: "8px", padding: "6px 12px", minWidth: "56px", flexShrink: 0 }}>
                  <div style={{ fontSize: "0.6875rem", color: "#10B981", fontWeight: 700 }}>NOV</div>
                  <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--bx-ink-bright)", lineHeight: 1 }}>04</div>
                </div>
                <div style={{ minWidth: 0, wordBreak: "break-word" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.6875rem", background: "rgba(16, 185, 129, 0.1)", color: "#10B981", padding: "2px 6px", borderRadius: "3px", fontWeight: 700 }}>
                      CODE REVIEW LIVE
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>19:00 - 20:30 WIB</span>
                  </div>
                  <div style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--bx-ink-bright)", lineHeight: 1.3, marginBottom: "4px" }}>
                    Clean Architecture &amp; Scalable Database Tuning Showcase
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>
                    Bersama Reviewer Senior ANVIEO
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "4px" }}>
                <button
                  type="button"
                  onClick={handleGoToEvents}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "7px 16px",
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    borderRadius: "6px",
                    background: registeredEvents.includes("ev-3") ? "rgba(16, 185, 129, 0.12)" : "rgba(201, 150, 46, 0.12)",
                    border: registeredEvents.includes("ev-3") ? "1px solid #10B981" : "1px solid var(--gold)",
                    color: registeredEvents.includes("ev-3") ? "#10B981" : "var(--gold)",
                    cursor: "pointer",
                    transition: "all 0.18s ease",
                    boxSizing: "border-box",
                    lineHeight: 1.2,
                  }}
                  onMouseEnter={(e) => {
                    if (registeredEvents.includes("ev-3")) {
                      e.currentTarget.style.background = "#10B981";
                      e.currentTarget.style.color = "#0A0A0C";
                    } else {
                      e.currentTarget.style.background = "var(--gold)";
                      e.currentTarget.style.color = "#0A0A0C";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (registeredEvents.includes("ev-3")) {
                      e.currentTarget.style.background = "rgba(16, 185, 129, 0.12)";
                      e.currentTarget.style.color = "#10B981";
                    } else {
                      e.currentTarget.style.background = "rgba(201, 150, 46, 0.12)";
                      e.currentTarget.style.color = "var(--gold)";
                    }
                  }}
                  title="Buka Halaman Daftar Event"
                >
                  {registeredEvents.includes("ev-3") ? (
                    <>
                      <FlatIcon type="check" size={13} color="currentColor" />
                      <span>Terdaftar · Lihat Event</span>
                    </>
                  ) : (
                    <>
                      <span>Daftar Event</span>
                      <FlatIcon type="chevron-right" size={12} color="currentColor" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
