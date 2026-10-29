export interface UserProfile {
  name: string;
  email: string;
  role: "siswa" | "reviewer" | "instruktur";
  enrolledTrack: string;
  studentId: string;
  streak: number;
  xp: number;
  avatar: string;
}

export interface ModuleNode {
  id: string;
  number: number;
  title: string;
  status: "completed" | "current" | "locked";
  completedDate?: string;
  duration?: string;
  score?: string;
  access?: "free" | "premium"; // freemium
}

export interface StageNode {
  id: string;
  stageNumber: number;
  title: string;
  status: "completed" | "current" | "locked";
  progressText: string;
  modules: ModuleNode[];
}

export interface CompletedMilestone {
  title: string;
  date: string;
  badge: string;
}

export interface CurriculumProgress {
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
  completedMilestones: CompletedMilestone[];
}

export interface CompletedClassItem {
  id: string;
  title: string;
  category: string;
  level: string;
  completedDate: string;
  finalScore: string;
  certificateId: string;
  certificateUrl?: string;
  instructor: string;
  totalModules: number;
  durationHours: number;
  skills: string[];
}

export const getProgressTheme = (progress: number) => {
  if (progress >= 65) {
    return {
      textColor: "#10B981", // Hijau (progres tinggi >= 65%)
      bgColor: "rgba(16, 185, 129, 0.12)",
      borderColor: "rgba(16, 185, 129, 0.35)",
      barGradient: "linear-gradient(90deg, #10B981 0%, #059669 100%)",
      label: "Tinggi",
    };
  }
  if (progress >= 35) {
    return {
      textColor: "#F59E0B", // Kuning / Amber (progres menengah 35-64%)
      bgColor: "rgba(245, 158, 11, 0.12)",
      borderColor: "rgba(245, 158, 11, 0.35)",
      barGradient: "linear-gradient(90deg, #F59E0B 0%, #D97706 100%)",
      label: "Menengah",
    };
  }
  return {
    textColor: "#EF4444", // Merah (progres awal/rendah < 35%)
    bgColor: "rgba(239, 68, 68, 0.12)",
    borderColor: "rgba(239, 68, 68, 0.35)",
    barGradient: "linear-gradient(90deg, #EF4444 0%, #DC2626 100%)",
    label: "Awal",
  };
};

export const INITIAL_CURRICULA: CurriculumProgress[] = [
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
];

export const INITIAL_COMPLETED_CLASSES: CompletedClassItem[] = [
  {
    id: "comp-1",
    title: "Dasar Pemrograman Web Modern (HTML, CSS, Modern JS)",
    category: "Frontend Engineering",
    level: "Tingkat Pemula",
    completedDate: "18 Sep 2026",
    finalScore: "98 / 100",
    certificateId: "CERT-ANV-2026-0419",
    instructor: "Budi Santoso, S.Kom",
    totalModules: 12,
    durationHours: 36,
    skills: ["HTML5 Semantics", "CSS Grid/Flexbox", "JavaScript ES6+", "DOM Manipulation", "Responsive Design"],
  },
  {
    id: "comp-2",
    title: "Algoritma Pemrograman & Struktur Data Komputasi",
    category: "Computer Science Core",
    level: "Tingkat Menengah",
    completedDate: "05 Okt 2026",
    finalScore: "95 / 100",
    certificateId: "CERT-ANV-2026-0588",
    instructor: "Dr. Rian Pratama, M.Sc",
    totalModules: 14,
    durationHours: 42,
    skills: ["Time Complexity (Big O)", "Sorting & Searching", "Linked Lists & Trees", "Graph Traversal", "Dynamic Programming"],
  },
];
