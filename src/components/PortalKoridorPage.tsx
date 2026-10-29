"use client";

import React, { useState, useEffect } from "react";
import FlatIcon from "./FlatIcon";
import CertificateModal from "./CertificateModal";
import PortalClassroomView from "./PortalClassroomView";

export interface SubmissionHistoryItem {
  id: string;
  title: string;
  date: string;
  status: "Diterima" | "Ditolak";
  rating?: string;
  feedbackSummary: string;
  notes?: string;
  submissionFile?: string;
  reviewedBy: string;
}

export interface ExamHistoryItem {
  id: string;
  title: string;
  date: string;
  score: string;
  passingScore: string;
  status: "Lulus" | "Tidak Lulus";
  totalQuestions: number;
}

export interface ForumTopicItem {
  id: string;
  title: string;
  author: string;
  authorRole: string;
  repliesCount: number;
  lastActivity: string;
  isSolved?: boolean;
}

export interface RecommendedCourseItem {
  id: string;
  title: string;
  slug: string;
  rating: string;
  durationHours: number;
  level: string;
  tracks: string[];
  description: string;
}

export interface ModuleNode {
  id: string;
  number: number;
  title: string;
  status: "completed" | "current" | "locked";
  access: "free" | "premium";
  completedDate?: string;
  score?: string;
  duration?: string;
}

export interface StageNode {
  id: string;
  stageNumber: number;
  title: string;
  status: "completed" | "current" | "locked";
  progressText: string;
  modules: ModuleNode[];
}

interface PortalKoridorPageProps {
  onNavigateNav?: (navId: string, courseTitle?: string) => void;
  courseTitle?: string;
}

export default function PortalKoridorPage({
  onNavigateNav,
  courseTitle = "Belajar Machine Learning untuk Pemula",
}: PortalKoridorPageProps) {
  const [activeCourseTitle, setActiveCourseTitle] = useState(courseTitle);
  const [showClassroom, setShowClassroom] = useState(false);

  useEffect(() => {
    setActiveCourseTitle(courseTitle);
  }, [courseTitle]);

  // Modal state for submission detail & certificate
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionHistoryItem | null>(null);
  const [selectedExam, setSelectedExam] = useState<ExamHistoryItem | null>(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"materi" | "submission" | "exam">("materi");

  const handleEnterClassroom = (moduleTitle?: string) => {
    if (onNavigateNav) {
      onNavigateNav("classroom", activeCourseTitle);
    } else {
      setShowClassroom(true);
    }
  };

  // Jika sedang membuka Kelas Belajar secara mandiri di halaman koridor
  if (showClassroom) {
    return (
      <PortalClassroomView
        courseTitle={activeCourseTitle}
        onBackToKoridor={() => setShowClassroom(false)}
      />
    );
  }

  // Sample data conforming exactly to user's specification
  const getCourseData = (title: string) => {
    if (title === "Machine Learning Terapan") {
      return {
        title,
        headline: title,
        description:
          "Pelajari penerapan machine learning untuk studi kasus riil: Predictive Maintenance, Fraud Detection, NLP Sentiment Analysis, dan Sistem Rekomendasi E-Commerce.",
        rating: "4,92",
        duration: "75 Jam",
        level: "Level Mahir",
        enrolledStudents: "112.430 Siswa Terdaftar",
        isCompleted: false,
        learningPaths: [
          { name: "AI Engineer", id: "65" },
          { name: "Data Scientist", id: "60" },
        ],
      };
    }
    if (title === "Machine Learning Operations (MLOps)") {
      return {
        title,
        headline: title,
        description:
          "Kuasai siklus hidup model production secara end-to-end: Continuous Training, model versioning dengan DVC, registry MLflow, dan deployment di Kubernetes.",
        rating: "4,89",
        duration: "60 Jam",
        level: "Level Mahir",
        enrolledStudents: "84.120 Siswa Terdaftar",
        isCompleted: false,
        learningPaths: [
          { name: "MLOps Engineer", id: "30" },
          { name: "Cloud AI", id: "72" },
        ],
      };
    }
    return {
      title,
      headline: title,
      description:
        "Pelajari dasar machine learning dengan fokus materi supervised learning, unsupervised learning, hingga teknik meningkatkan performa model.",
      rating: "4,86",
      duration: "90 Jam",
      level: "Level Pemula",
      enrolledStudents: "290.489 Siswa Terdaftar",
      isCompleted: true,
      certificateId: "ANV-CERT-2026-ML90-8472",
      completionDate: "2 Mei 2026",
      finalScore: "95%",
      learningPaths: [
        { name: "AI Engineer", id: "65" },
        { name: "Data Scientist", id: "60" },
        { name: "Gen AI Engineer", id: "68" },
        { name: "MLOps Engineer", id: "30" },
      ],
    };
  };

  const getCourseStages = (title: string): StageNode[] => {
    if (title === "Machine Learning Terapan") {
      return [
        {
          id: "mlt-st-1",
          stageNumber: 1,
          title: "Tahap 1: Data Preparation & Advanced Feature Engineering",
          status: "completed",
          progressText: "100% Selesai (2/2 Modul)",
          modules: [
            {
              id: "mlt-m-1",
              number: 1,
              title: "Handling Imbalanced Data, SMOTE & Outlier Detection",
              status: "completed",
              access: "free",
              completedDate: "20 Okt 2026",
              score: "100/100",
            },
            {
              id: "mlt-m-2",
              number: 2,
              title: "Feature Selection, Dimensionality Reduction & Encoding",
              status: "completed",
              access: "free",
              completedDate: "25 Okt 2026",
              score: "98/100",
            },
          ],
        },
        {
          id: "mlt-st-2",
          stageNumber: 2,
          title: "Tahap 2: Deep Learning & Neural Networks Fundamentals",
          status: "current",
          progressText: "50% Selesai (1/2 Modul)",
          modules: [
            {
              id: "mlt-m-3",
              number: 3,
              title: "Artificial Neural Networks (ANN) & Backpropagation",
              status: "completed",
              access: "free",
              completedDate: "27 Okt 2026",
              score: "95/100",
            },
            {
              id: "mlt-m-4",
              number: 4,
              title: "Convolutional Neural Networks (CNN) untuk Computer Vision",
              status: "current",
              access: "premium",
              duration: "Estimasi: 4 Jam",
            },
          ],
        },
        {
          id: "mlt-st-3",
          stageNumber: 3,
          title: "Tahap 3: Natural Language Processing & Recommendation Systems",
          status: "locked",
          progressText: "Terkunci (0/3 Modul)",
          modules: [
            {
              id: "mlt-m-5",
              number: 5,
              title: "NLP Text Preprocessing, TF-IDF, Word2Vec & BERT",
              status: "locked",
              access: "premium",
            },
            {
              id: "mlt-m-6",
              number: 6,
              title: "Collaborative Filtering & Content-Based Recommendation",
              status: "locked",
              access: "premium",
            },
            {
              id: "mlt-m-7",
              number: 7,
              title: "Proyek Akhir Terapan: Sistem Rekomendasi Terintegrasi",
              status: "locked",
              access: "premium",
            },
          ],
        },
      ];
    }

    if (title === "Machine Learning Operations (MLOps)") {
      return [
        {
          id: "mlo-st-1",
          stageNumber: 1,
          title: "Tahap 1: Model Development Lifecycle & Tracking",
          status: "completed",
          progressText: "100% Selesai (2/2 Modul)",
          modules: [
            {
              id: "mlo-m-1",
              number: 1,
              title: "MLflow Tracking, Experiments & Model Registry",
              status: "completed",
              access: "free",
              completedDate: "15 Okt 2026",
              score: "96/100",
            },
            {
              id: "mlo-m-2",
              number: 2,
              title: "Data & Pipeline Versioning dengan DVC",
              status: "completed",
              access: "free",
              completedDate: "22 Okt 2026",
              score: "98/100",
            },
          ],
        },
        {
          id: "mlo-st-2",
          stageNumber: 2,
          title: "Tahap 2: Continuous Integration & Deployment (CI/CD) for ML",
          status: "current",
          progressText: "0% Selesai (0/2 Modul)",
          modules: [
            {
              id: "mlo-m-3",
              number: 3,
              title: "Automated Testing Data, Model Drift & FastAPI Serving",
              status: "current",
              access: "free",
              duration: "Estimasi: 5 Jam",
            },
            {
              id: "mlo-m-4",
              number: 4,
              title: "Containerization Docker & Kubernetes Orchestration",
              status: "locked",
              access: "premium",
            },
          ],
        },
        {
          id: "mlo-st-3",
          stageNumber: 3,
          title: "Tahap 3: Model Monitoring & Observability in Production",
          status: "locked",
          progressText: "Terkunci (0/2 Modul)",
          modules: [
            {
              id: "mlo-m-5",
              number: 5,
              title: "Prometheus, Grafana & Evidently AI Monitoring",
              status: "locked",
              access: "premium",
            },
            {
              id: "mlo-m-6",
              number: 6,
              title: "Proyek Akhir: End-to-End Production MLOps Pipeline",
              status: "locked",
              access: "premium",
            },
          ],
        },
      ];
    }

    if (title.includes("Python") || title.includes("Pemrograman")) {
      return [
        {
          id: "py-st-1",
          stageNumber: 1,
          title: "Tahap 1: Fondasi Sintaksis & Struktur Data Python",
          status: "completed",
          progressText: "100% Selesai (3/3 Modul)",
          modules: [
            {
              id: "py-m-1",
              number: 1,
              title: "Pengenalan Bahasa Python & Setup Virtual Environment",
              status: "completed",
              access: "free",
              completedDate: "15 Okt 2026",
              score: "100/100",
            },
            {
              id: "py-m-2",
              number: 2,
              title: "Tipe Data Primitif, Operator, dan Ekspresi Logika",
              status: "completed",
              access: "free",
              completedDate: "18 Okt 2026",
              score: "100/100",
            },
            {
              id: "py-m-3",
              number: 3,
              title: "Struktur Data: List, Tuple, Set, dan Dictionary",
              status: "completed",
              access: "free",
              completedDate: "21 Okt 2026",
              score: "98/100",
            },
          ],
        },
        {
          id: "py-st-2",
          stageNumber: 2,
          title: "Tahap 2: Kontrol Alur, Fungsi & Object-Oriented Programming (OOP)",
          status: "current",
          progressText: "66% Selesai (2/3 Modul)",
          modules: [
            {
              id: "py-m-4",
              number: 4,
              title: "Percabangan Kondisi (if-elif-else) & Perulangan (for/while)",
              status: "completed",
              access: "free",
              completedDate: "24 Okt 2026",
              score: "96/100",
            },
            {
              id: "py-m-5",
              number: 5,
              title: "Pemrograman Berorientasi Objek (Class, Object, Inheritance)",
              status: "completed",
              access: "free",
              completedDate: "26 Okt 2026",
              score: "95/100",
            },
            {
              id: "py-m-6",
              number: 6,
              title: "Penanganan Error, Exception Handling & Unit Testing",
              status: "current",
              access: "free",
              duration: "Estimasi: 3 Jam",
            },
          ],
        },
        {
          id: "py-st-3",
          stageNumber: 3,
          title: "Tahap 3: Modul Eksternal & Proyek Akhir Python",
          status: "locked",
          progressText: "Terkunci (0/2 Modul)",
          modules: [
            {
              id: "py-m-7",
              number: 7,
              title: "Bekerja dengan File I/O, JSON, dan HTTP Request",
              status: "locked",
              access: "premium",
            },
            {
              id: "py-m-8",
              number: 8,
              title: "Proyek Akhir: Aplikasi Pengelola Data Terstruktur",
              status: "locked",
              access: "premium",
            },
          ],
        },
      ];
    }

    // Default: "Belajar Machine Learning untuk Pemula"
    return [
      {
        id: "bml-st-1",
        stageNumber: 1,
        title: "Tahap 1: Pengantar Machine Learning & Matematika Dasar",
        status: "completed",
        progressText: "100% Selesai (3/3 Modul)",
        modules: [
          {
            id: "bml-m-1",
            number: 1,
            title: "Pengenalan Machine Learning & Ekosistem Python Data Science",
            status: "completed",
            access: "free",
            completedDate: "18 Okt 2026",
            score: "100/100",
          },
          {
            id: "bml-m-2",
            number: 2,
            title: "Aljabar Linier, Kalkulus, dan Probabilitas untuk ML",
            status: "completed",
            access: "free",
            completedDate: "22 Okt 2026",
            score: "95/100",
          },
          {
            id: "bml-m-3",
            number: 3,
            title: "Eksplorasi Data Analisis (EDA) dengan Pandas & Matplotlib",
            status: "completed",
            access: "free",
            completedDate: "25 Okt 2026",
            score: "98/100",
          },
        ],
      },
      {
        id: "bml-st-2",
        stageNumber: 2,
        title: "Tahap 2: Supervised & Unsupervised Learning Algorithms",
        status: "completed",
        progressText: "100% Selesai (3/3 Modul)",
        modules: [
          {
            id: "bml-m-4",
            number: 4,
            title: "Regresi Linear, Regresi Logistik & Klasifikasi Dasar",
            status: "completed",
            access: "free",
            completedDate: "28 Okt 2026",
            score: "96/100",
          },
          {
            id: "bml-m-5",
            number: 5,
            title: "Decision Trees, Random Forest & Ensemble Methods",
            status: "completed",
            access: "free",
            completedDate: "30 Okt 2026",
            score: "97/100",
          },
          {
            id: "bml-m-6",
            number: 6,
            title: "K-Means Clustering & Principal Component Analysis (PCA)",
            status: "completed",
            access: "free",
            completedDate: "1 Mei 2026",
            score: "94/100",
          },
        ],
      },
      {
        id: "bml-st-3",
        stageNumber: 3,
        title: "Tahap 3: Evaluasi Model, Tuning & Submission Akhir",
        status: "completed",
        progressText: "100% Selesai (2/2 Modul)",
        modules: [
          {
            id: "bml-m-7",
            number: 7,
            title: "Hyperparameter Tuning, Cross Validation & Model Metrics",
            status: "completed",
            access: "free",
            completedDate: "2 Mei 2026",
            score: "98/100",
          },
          {
            id: "bml-m-8",
            number: 8,
            title: "Proyek Akhir: Membangun Model Machine Learning Teruji",
            status: "completed",
            access: "free",
            completedDate: "2 Mei 2026",
            score: "100/100",
          },
        ],
      },
    ];
  };

  const courseData = getCourseData(activeCourseTitle);
  const stages = getCourseStages(activeCourseTitle);
  const totalModulesCount = stages.reduce((acc, stage) => acc + stage.modules.length, 0);
  const completedModulesCount = stages.reduce(
    (acc, stage) => acc + stage.modules.filter((m) => m.status === "completed").length,
    0
  );

  // Riwayat Submission data
  const submissionHistory: SubmissionHistoryItem[] = [
    {
      id: "sub-1",
      title: "Membangun Proyek Machine Learning",
      date: "2 Mei 2026",
      status: "Diterima",
      rating: "⭐ 5/5",
      feedbackSummary: "Seluruh kriteria bintang 5 terpenuhi dengan sempurna. Preprocessing data, split train-test, dan evaluasi matriks (Precision, Recall, ROC-AUC) sangat rapi.",
      notes: "Implementasi GridSearchCV untuk parameter tuning Random Forest Classifier sangat optimal. Kode terdokumentasi dengan docstring standar Google Python Style.",
      submissionFile: "submission_proyek_ml_final.zip (14.2 MB)",
      reviewedBy: "Dr. Rian Pratama, M.Sc · Senior Machine Learning Reviewer",
    },
    {
      id: "sub-2",
      title: "Membangun Proyek Machine Learning",
      date: "2 Mei 2026",
      status: "Ditolak",
      feedbackSummary: "Terjadi data leakage pada proses feature scaling (StandardScaler dilakukan sebelum train_test_split). Harap lakukan split data terlebih dahulu.",
      notes: "Catatan perbaikan: Pastikan fit_transform hanya diterapkan pada data latih (X_train), dan gunakan transform pada data uji (X_test) untuk mencegah bias.",
      submissionFile: "submission_proyek_ml_v2.zip (13.8 MB)",
      reviewedBy: "Budi Santoso, S.Kom · AI Engineer Reviewer",
    },
    {
      id: "sub-3",
      title: "Membangun Proyek Machine Learning",
      date: "2 Mei 2026",
      status: "Ditolak",
      feedbackSummary: "Akurasi model pada validation set di bawah threshold minimal (diperoleh 68%, batas minimal 80%). Missing value belum ditangani dengan tepat.",
      notes: "Catatan perbaikan: Kolom dengan missing value > 30% perlu diimputasi menggunakan median atau dibersihkan dengan strategi imputasi yang sesuai.",
      submissionFile: "submission_proyek_ml_v1.zip (12.5 MB)",
      reviewedBy: "Dewi Lestari, M.Kom · Evaluator Kurikulum",
    },
  ];

  // Riwayat Exam data
  const examHistory: ExamHistoryItem[] = [
    {
      id: "ex-1",
      title: "Ujian Akhir",
      date: "18 April 2026",
      score: "95%",
      passingScore: "80%",
      status: "Lulus",
      totalQuestions: 40,
    },
    {
      id: "ex-2",
      title: "Kuis Optimasi Model dengan Hyperparameter Tuning",
      date: "18 April 2026",
      score: "100%",
      passingScore: "80%",
      status: "Lulus",
      totalQuestions: 15,
    },
    {
      id: "ex-3",
      title: "Kuis Overfitting dan Underfitting",
      date: "18 April 2026",
      score: "100%",
      passingScore: "80%",
      status: "Lulus",
      totalQuestions: 15,
    },
    {
      id: "ex-4",
      title: "Kuis Teknik Feature Engineering",
      date: "18 April 2026",
      score: "91%",
      passingScore: "80%",
      status: "Lulus",
      totalQuestions: 15,
    },
  ];

  // Rekomendasi kelas FOR YOU
  const recommendedCourses: RecommendedCourseItem[] = [
    {
      id: "rec-1",
      title: "Machine Learning Terapan",
      slug: "machine-learning-terapan",
      rating: "4,92",
      durationHours: 75,
      level: "Level Mahir",
      tracks: ["AI Engineer", "Data Scientist"],
      description:
        "Pelajari penerapan machine learning untuk studi kasus riil: Predictive Maintenance, Fraud Detection, NLP Sentiment Analysis, dan Sistem Rekomendasi E-Commerce.",
    },
    {
      id: "rec-2",
      title: "Machine Learning Operations (MLOps)",
      slug: "machine-learning-operations-mlops",
      rating: "4,89",
      durationHours: 60,
      level: "Level Mahir",
      tracks: ["MLOps Engineer", "Cloud AI"],
      description:
        "Kuasai siklus hidup model production secara end-to-end: Continuous Training, model versioning dengan DVC, registry MLflow, dan deployment di Kubernetes.",
    },
  ];

  return (
    <div className="portal-content-fluid" style={{ paddingBottom: "60px" }}>
      {/* =========================================================================
          1. BREADCRUMB NAVIGATION
          ========================================================================= */}
      <nav
        aria-label="Breadcrumb"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "0.8125rem",
          color: "var(--bx-muted)",
          marginBottom: "16px",
          flexWrap: "wrap",
        }}
      >
        <button
          type="button"
          onClick={() => {
            if (onNavigateNav) onNavigateNav("kelas");
            else if (typeof window !== "undefined") window.location.hash = "kelas";
          }}
          style={{
            background: "none",
            border: "none",
            color: "var(--gold)",
            fontWeight: 700,
            cursor: "pointer",
            padding: 0,
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <FlatIcon type="arrow-left" size={13} color="var(--gold)" />
          <span>Kelas</span>
        </button>

        <span style={{ color: "var(--bx-border)" }}>/</span>

        <button
          type="button"
          onClick={() => {
            if (onNavigateNav) onNavigateNav("progres");
            else if (typeof window !== "undefined") window.location.hash = "progres";
          }}
          style={{
            background: "none",
            border: "none",
            color: "var(--bx-muted)",
            fontWeight: 600,
            cursor: "pointer",
            padding: 0,
          }}
        >
          Koridor Kelas
        </button>

        <span style={{ color: "var(--bx-border)" }}>/</span>

        <span style={{ color: "var(--bx-ink-bright)", fontWeight: 700 }}>
          {courseData.title}
        </span>
      </nav>

      {/* =========================================================================
          2. HERO SECTION / HEADER DETAIL KELAS
          ========================================================================= */}
      <div
        className="portal-dash-card"
        style={{
          padding: "28px 32px",
          marginBottom: "24px",
          background: "linear-gradient(135deg, var(--bx-surface) 0%, rgba(201, 150, 46, 0.05) 100%)",
          border: "1px solid var(--bx-border)",
          borderRadius: "12px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "28px",
            flexWrap: "wrap",
          }}
        >
          {/* Left Column: Info & Action Buttons */}
          <div style={{ flex: "1 1 540px", minWidth: 0 }}>
            {/* Subtitle / Tag Category */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "10px" }}>
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  padding: "3px 10px",
                  borderRadius: "4px",
                  background: "rgba(201, 150, 46, 0.15)",
                  color: "var(--gold)",
                  border: "1px solid rgba(201, 150, 46, 0.3)",
                }}
              >
                Koridor Kelas
              </span>

              {courseData.isCompleted ? (
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#10B981",
                    background: "rgba(16, 185, 129, 0.12)",
                    padding: "3px 10px",
                    borderRadius: "4px",
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                  }}
                >
                  <FlatIcon type="check" size={12} color="#10B981" />
                  Kelas Selesai · Lulus
                </span>
              ) : (
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#10B981",
                    background: "rgba(16, 185, 129, 0.12)",
                    padding: "3px 10px",
                    borderRadius: "4px",
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B981" }} />
                  Akses Aktif
                </span>
              )}
            </div>

            {/* Main Title */}
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.85rem",
                fontWeight: 800,
                color: "var(--bx-ink-bright)",
                margin: "0 0 12px",
                lineHeight: 1.25,
              }}
            >
              {courseData.headline}
            </h1>

            {/* Description */}
            <p
              style={{
                fontSize: "0.9375rem",
                color: "var(--bx-muted)",
                lineHeight: 1.6,
                margin: "0 0 20px",
              }}
            >
              {courseData.description}
            </p>

            {/* Metric Stats Bar: 4,86 | 90 Jam | Level Pemula | 290.489 Siswa Terdaftar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                flexWrap: "wrap",
                padding: "14px 18px",
                background: "var(--bx-bg)",
                border: "1px solid var(--bx-border)",
                borderRadius: "8px",
                marginBottom: "20px",
              }}
            >
              {/* Rating */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <FlatIcon type="star" size={15} color="#F59E0B" />
                <span style={{ fontWeight: 800, fontSize: "0.875rem", color: "var(--bx-ink-bright)", fontFamily: "var(--font-mono)" }}>
                  {courseData.rating}
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>(Rating Kelas)</span>
              </div>

              <span style={{ color: "var(--bx-border)" }}>·</span>

              {/* Total Jam */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <FlatIcon type="clock" size={15} color="var(--gold)" />
                <span style={{ fontWeight: 800, fontSize: "0.875rem", color: "var(--bx-ink-bright)", fontFamily: "var(--font-mono)" }}>
                  {courseData.duration}
                </span>
              </div>

              <span style={{ color: "var(--bx-border)" }}>·</span>

              {/* Level */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <FlatIcon type="award" size={15} color="#3B82F6" />
                <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--bx-ink-bright)" }}>
                  {courseData.level}
                </span>
              </div>

              <span style={{ color: "var(--bx-border)" }}>·</span>

              {/* Total Siswa */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <FlatIcon type="users" size={15} color="#10B981" />
                <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--bx-ink-bright)" }}>
                  {courseData.enrolledStudents}
                </span>
              </div>
            </div>

            {/* Learning Paths Association Links */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "22px" }}>
              <span style={{ fontSize: "0.78125rem", color: "var(--bx-muted)", fontWeight: 600 }}>
                Termasuk dalam Learning Path:
              </span>
              {courseData.learningPaths.map((lp) => (
                <button
                  key={lp.id}
                  type="button"
                  onClick={() => {
                    if (onNavigateNav) onNavigateNav("learning-path");
                    else if (typeof window !== "undefined") window.location.hash = "learning-path";
                  }}
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--gold)",
                    background: "rgba(201, 150, 46, 0.1)",
                    border: "1px solid rgba(201, 150, 46, 0.25)",
                    padding: "3px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    transition: "all 0.15s ease",
                  }}
                >
                  <span>{lp.name}</span>
                  <FlatIcon type="chevron-right" size={10} color="var(--gold)" />
                </button>
              ))}
            </div>

            {/* Action Buttons: Belajar Lagi & Lihat Sertifikat (di kanannya) */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
              {courseData.isCompleted ? (
                <>
                  {/* Tombol Belajar Lagi */}
                  <button
                    type="button"
                    onClick={() => handleEnterClassroom()}
                    style={{
                      background: "#10B981",
                      color: "#FFFFFF",
                      border: "none",
                      padding: "10px 22px",
                      borderRadius: "6px",
                      fontWeight: 800,
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      boxShadow: "0 2px 8px rgba(16, 185, 129, 0.25)",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <FlatIcon type="refresh" size={14} color="#FFFFFF" />
                    <span>Belajar Lagi</span>
                  </button>

                  {/* Tombol Lihat Sertifikat (di kanan tombol Belajar Lagi) */}
                  <button
                    type="button"
                    onClick={() => setShowCertificateModal(true)}
                    style={{
                      background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                      color: "#0A0A0C",
                      border: "none",
                      padding: "10px 22px",
                      borderRadius: "6px",
                      fontWeight: 800,
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      boxShadow: "0 2px 10px rgba(245, 158, 11, 0.35)",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <FlatIcon type="certificate" size={16} color="#0A0A0C" />
                    <span>Lihat Sertifikat</span>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => handleEnterClassroom()}
                  style={{
                    background: "#10B981",
                    color: "#FFFFFF",
                    border: "none",
                    padding: "10px 22px",
                    borderRadius: "6px",
                    fontWeight: 800,
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 2px 8px rgba(16, 185, 129, 0.25)",
                  }}
                >
                  <FlatIcon type="play" size={14} color="#FFFFFF" />
                  <span>Lanjutkan Belajar Modul</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Hero Course Image di Pojok Kanan */}
          <div
            style={{
              flexShrink: 0,
              width: "210px",
              height: "210px",
              borderRadius: "14px",
              overflow: "hidden",
              border: "1px solid rgba(201, 150, 46, 0.35)",
              boxShadow: "0 12px 28px rgba(0, 0, 0, 0.45)",
              background: "#0d1017",
              position: "relative",
            }}
          >
            <img
              src="/courses/machine-learning.jpg"
              alt={courseData.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                background: "rgba(10, 10, 12, 0.82)",
                backdropFilter: "blur(6px)",
                padding: "3px 8px",
                borderRadius: "4px",
                fontSize: "0.625rem",
                fontWeight: 800,
                color: "var(--gold)",
                border: "1px solid rgba(201, 150, 46, 0.35)",
                letterSpacing: "0.06em",
              }}
            >
              AI & ML
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. NAVIGATION TABS (Materi Belajar, Riwayat Submission, Riwayat Exam) & TOMBOL FORUM DISKUSI
          ========================================================================= */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid var(--bx-border)",
          gap: "12px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        {/* Tiga Tab Konten: Materi Belajar (Default), Riwayat Submission & Riwayat Exam */}
        <div style={{ display: "flex", gap: "8px", overflowX: "auto" }}>
          <button
            type="button"
            onClick={() => setActiveTab("materi")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 18px",
              fontSize: "0.875rem",
              fontWeight: 700,
              color: activeTab === "materi" ? "var(--gold)" : "var(--bx-muted)",
              borderBottom: activeTab === "materi" ? "2px solid var(--gold)" : "2px solid transparent",
              background: "none",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              cursor: "pointer",
            }}
          >
            <FlatIcon type="tree" size={16} color={activeTab === "materi" ? "var(--gold)" : "var(--bx-muted)"} />
            <span>Materi Belajar ({totalModulesCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("submission")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 18px",
              fontSize: "0.875rem",
              fontWeight: 700,
              color: activeTab === "submission" ? "var(--gold)" : "var(--bx-muted)",
              borderBottom: activeTab === "submission" ? "2px solid var(--gold)" : "2px solid transparent",
              background: "none",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              cursor: "pointer",
            }}
          >
            <FlatIcon type="document" size={16} color={activeTab === "submission" ? "var(--gold)" : "var(--bx-muted)"} />
            <span>Riwayat Submission ({submissionHistory.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("exam")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 18px",
              fontSize: "0.875rem",
              fontWeight: 700,
              color: activeTab === "exam" ? "var(--gold)" : "var(--bx-muted)",
              borderBottom: activeTab === "exam" ? "2px solid var(--gold)" : "2px solid transparent",
              background: "none",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              cursor: "pointer",
            }}
          >
            <FlatIcon type="award" size={16} color={activeTab === "exam" ? "var(--gold)" : "var(--bx-muted)"} />
            <span>Riwayat Exam ({examHistory.length})</span>
          </button>
        </div>

        {/* Tombol Forum Diskusi (Membuka Tab Baru Sesuai Topik Kelas & Materi Aktif) */}
        <button
          type="button"
          onClick={() => {
            if (typeof window !== "undefined") {
              const allModules = stages.flatMap((s) => s.modules);
              const activeMod =
                allModules.find((m) => m.status === "current") ||
                allModules[allModules.length - 1] ||
                allModules[0];
              const topicParam = activeMod ? `&topic=${encodeURIComponent(activeMod.title)}` : "";
              window.open(`/forum?course=${encodeURIComponent(activeCourseTitle)}${topicParam}`, "_blank");
            }
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            fontSize: "0.8125rem",
            fontWeight: 700,
            color: "var(--bx-ink-bright)",
            background: "var(--bx-surface)",
            border: "1px solid var(--bx-border)",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "all 0.15s ease",
            marginBottom: "6px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--gold)";
            e.currentTarget.style.color = "var(--gold)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--bx-border)";
            e.currentTarget.style.color = "var(--bx-ink-bright)";
          }}
          title={`Buka Tab Baru Forum Diskusi Materi Aktif: ${activeCourseTitle}`}
        >
          <FlatIcon type="chat" size={15} color="var(--gold)" />
          <span>Forum Diskusi</span>
          <FlatIcon type="chevron-right" size={12} color="var(--gold)" />
        </button>
      </div>

      {/* =========================================================================
          4. SECTION: TIMELINE MODEL SEPERTI HALAMAN UTAMA LMS-WEB
          Menggunakan struktur .portal-tree-stage, .portal-tree-stage-header,
          .portal-tree-branch, .portal-tree-node.portal-module-row.
          TIDAK ADA TULISAN "URUTAN MATERI".
          Ketika di klik materi nya, langsung masuk ke detail kelas (handleEnterClassroom).
          ========================================================================= */}
      {activeTab === "materi" && (
        <section style={{ marginBottom: "32px" }}>
          {/* Subheader bar dengan status ringkas & tombol aksi cepat */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.8125rem", color: "var(--bx-muted)", fontWeight: 600 }}>
                Roadmap &amp; modul kurikulum dari awal hingga sertifikasi capstone:
              </span>
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  color: "#10B981",
                  background: "rgba(16, 185, 129, 0.12)",
                  padding: "2px 8px",
                  borderRadius: "4px",
                }}
              >
                {completedModulesCount} dari {totalModulesCount} Modul Tuntas
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleEnterClassroom()}
              style={{
                background: "#10B981",
                color: "#ffffff",
                border: "none",
                padding: "6px 14px",
                fontSize: "0.78125rem",
                fontWeight: 700,
                borderRadius: "6px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 2px 6px rgba(16, 185, 129, 0.25)",
                transition: "all 0.15s ease",
              }}
            >
              <FlatIcon type="play" size={11} color="#ffffff" />
              <span>{courseData.isCompleted ? "Belajar Lagi Modul →" : "Lanjutkan Belajar →"}</span>
            </button>
          </div>

          {/* Tree Stages & Modules */}
          <div>
            {stages.map((stage) => {
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
                      ) : (
                        <span
                          style={{
                            width: "22px",
                            height: "22px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "rgba(201, 150, 46, 0.15)",
                            color: "var(--gold)",
                            flexShrink: 0,
                          }}
                        >
                          <FlatIcon type="play" size={10} color="var(--gold)" />
                        </span>
                      )}
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
                          onClick={() => {
                            if (isModuleLocked) {
                              alert(`Modul ${module.number}: "${module.title}" masih terkunci. Silakan selesaikan modul sebelumnya terlebih dahulu.`);
                              return;
                            }
                            handleEnterClassroom(module.title);
                          }}
                          title={isModuleLocked ? `Modul ${module.number}: ${module.title} (Terkunci)` : `Klik untuk masuk ke materi: Modul ${module.number}: ${module.title}`}
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
                            ) : (
                              <span
                                style={{
                                  width: "22px",
                                  height: "22px",
                                  borderRadius: "50%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  background: "rgba(201, 150, 46, 0.15)",
                                  color: "var(--gold)",
                                  flexShrink: 0,
                                }}
                              >
                                <FlatIcon type="play" size={10} color="var(--gold)" />
                              </span>
                            )}

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

                          {/* Button "Masuk Kelas" hanya muncul jika modul TIDAK terlock */}
                          {!isModuleLocked && (
                            <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                              <button
                                type="button"
                                className="portal-koridor-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEnterClassroom(module.title);
                                }}
                                title={`Masuk ke Kelas: ${module.title}`}
                              >
                                <span>Masuk Kelas</span>
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
        </section>
      )}

      {/* =========================================================================
          5. SECTION: RIWAYAT SUBMISSION
          ========================================================================= */}
      {activeTab === "submission" && (
        <section style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "var(--bx-ink-bright)",
                  margin: "0 0 4px",
                }}
              >
                Riwayat Submission
              </h2>
              <span style={{ fontSize: "0.78125rem", color: "var(--bx-muted)" }}>
                Daftar pengumpulan tugas proyek akhir dan catatan evaluasi dari tim reviewer kurikulum.
              </span>
            </div>

            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#10B981",
                background: "rgba(16, 185, 129, 0.12)",
                border: "1px solid #10B981",
                padding: "3px 10px",
                borderRadius: "4px",
              }}
            >
              Terverifikasi Lulus (Submission Terakhir)
            </span>
          </div>

          <div
            style={{
              background: "var(--bx-surface)",
              border: "1px solid var(--bx-border)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {submissionHistory.map((sub, idx) => {
              const isAccepted = sub.status === "Diterima";

              return (
                <div
                  key={sub.id}
                  style={{
                    padding: "10px 16px",
                    borderBottom: idx < submissionHistory.length - 1 ? "1px solid var(--bx-border)" : "none",
                    borderLeft: isAccepted ? "3px solid #10B981" : "3px solid #EF4444",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "10px 16px",
                    transition: "background 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--bx-bg)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--bx-surface)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: "1 1 320px", minWidth: 0 }}>
                    {/* Status Badge Icon */}
                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "6px",
                        background: isAccepted ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                        border: `1px solid ${isAccepted ? "#10B981" : "#EF4444"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <FlatIcon type={isAccepted ? "check" : "close"} size={14} color={isAccepted ? "#10B981" : "#EF4444"} />
                    </div>

                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", lineHeight: 1.3 }}>
                        {/* Status Label */}
                        <span
                          style={{
                            fontSize: "0.6875rem",
                            fontWeight: 800,
                            padding: "1px 7px",
                            borderRadius: "4px",
                            background: isAccepted ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                            color: isAccepted ? "#10B981" : "#EF4444",
                            border: `1px solid ${isAccepted ? "#10B981" : "#EF4444"}`,
                          }}
                        >
                          {sub.status}
                        </span>

                        <span
                          style={{
                            fontSize: "0.875rem",
                            fontWeight: 700,
                            color: "var(--bx-ink-bright)",
                          }}
                        >
                          {sub.title}
                        </span>

                        <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>
                          · {sub.date}
                        </span>

                        {sub.rating && (
                          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#F59E0B" }}>
                            · {sub.rating}
                          </span>
                        )}
                      </div>

                      <p
                        style={{
                          fontSize: "0.78125rem",
                          color: "var(--bx-muted)",
                          margin: "3px 0 0",
                          lineHeight: 1.4,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        title={sub.feedbackSummary}
                      >
                        {sub.feedbackSummary}
                      </p>
                    </div>
                  </div>

                  {/* Action Right Button */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                    <button
                      type="button"
                      onClick={() => setSelectedSubmission(sub)}
                      style={{
                        background: isAccepted ? "rgba(16, 185, 129, 0.12)" : "var(--bx-bg)",
                        border: isAccepted ? "1px solid #10B981" : "1px solid var(--bx-border)",
                        color: isAccepted ? "#10B981" : "var(--bx-ink-bright)",
                        fontSize: "0.71875rem",
                        fontWeight: 700,
                        padding: "5px 12px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        transition: "all 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = "0.85";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = "1";
                      }}
                    >
                      <FlatIcon type="document" size={13} color={isAccepted ? "#10B981" : "var(--bx-muted)"} />
                      <span>{isAccepted ? "Lihat Review Submission" : "Lihat Catatan Evaluasi"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* =========================================================================
          5. SECTION: RIWAYAT EXAM (UJIAN & KUIS)
          ========================================================================= */}
      {activeTab === "exam" && (
        <section style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "var(--bx-ink-bright)",
                  margin: "0 0 4px",
                }}
              >
                Riwayat Exam
              </h2>
              <span style={{ fontSize: "0.78125rem", color: "var(--bx-muted)" }}>
                Rekapitulasi perolehan nilai ujian akhir dan kuis pemahaman materi.
              </span>
            </div>
          </div>

          <div
            style={{
              background: "var(--bx-surface)",
              border: "1px solid var(--bx-border)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {/* Table Header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(240px, 2fr) 140px 100px 120px 120px",
                padding: "12px 18px",
                background: "var(--bx-bg)",
                borderBottom: "1px solid var(--bx-border)",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--bx-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              <div>Ujian / Kuis</div>
              <div>Tanggal</div>
              <div>Nilai</div>
              <div>Status</div>
              <div style={{ textAlign: "right" }}>Aksi</div>
            </div>

            {/* Table Body */}
            <div>
              {examHistory.map((exam, idx) => (
                <div
                  key={exam.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(240px, 2fr) 140px 100px 120px 120px",
                    padding: "14px 18px",
                    borderBottom: idx < examHistory.length - 1 ? "1px solid var(--bx-border)" : "none",
                    alignItems: "center",
                    fontSize: "0.8125rem",
                    transition: "background 0.15s ease",
                  }}
                >
                  <div style={{ fontWeight: 700, color: "var(--bx-ink-bright)", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#10B981",
                        flexShrink: 0,
                      }}
                    />
                    <span>{exam.title}</span>
                  </div>

                  <div style={{ color: "var(--bx-muted)" }}>
                    {exam.date}
                  </div>

                  <div style={{ fontFamily: "var(--font-mono)", fontWeight: 800, color: "#10B981", fontSize: "0.875rem" }}>
                    {exam.score}
                  </div>

                  <div>
                    <span
                      style={{
                        fontSize: "0.6875rem",
                        fontWeight: 800,
                        padding: "2px 8px",
                        borderRadius: "4px",
                        background: "rgba(16, 185, 129, 0.12)",
                        color: "#10B981",
                        border: "1px solid #10B981",
                      }}
                    >
                      {exam.status}
                    </span>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <button
                      type="button"
                      onClick={() => setSelectedExam(exam)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--gold)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        padding: "4px 8px",
                      }}
                    >
                      Tinjau Hasil →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* =========================================================================
          7. SECTION: REKOMENDASI KELAS (FOR YOU)
          ========================================================================= */}
      <section style={{ marginTop: "12px" }}>
        <div style={{ marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 800,
                padding: "2px 8px",
                borderRadius: "4px",
                background: "rgba(201, 150, 46, 0.15)",
                color: "var(--gold)",
                border: "1px solid rgba(201, 150, 46, 0.3)",
                letterSpacing: "0.06em",
              }}
            >
              FOR YOU
            </span>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "var(--bx-ink-bright)",
                margin: 0,
              }}
            >
              Rekomendasi kelas
            </h2>
          </div>
          <p style={{ fontSize: "0.8125rem", color: "var(--bx-muted)", margin: 0 }}>
            Berikut adalah kelas yang bisa Anda pelajari juga yang masih 1 lingkup learning path atau 1 tema dengan minat Anda
          </p>
        </div>

        {/* 2 Recommended Class Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "16px",
          }}
        >
          {recommendedCourses.map((rec) => (
            <div
              key={rec.id}
              className="portal-dash-card"
              style={{
                padding: "20px",
                background: "var(--bx-surface)",
                border: "1px solid var(--bx-border)",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all 0.2s ease",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {rec.tracks.map((t, tIdx) => (
                      <span
                        key={tIdx}
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
                        {t}
                      </span>
                    ))}
                  </div>

                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#F59E0B",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <FlatIcon type="star" size={13} color="#F59E0B" />
                    <span>{rec.rating}</span>
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    color: "var(--bx-ink-bright)",
                    margin: "0 0 8px",
                    lineHeight: 1.3,
                  }}
                >
                  {rec.title}
                </h3>

                <p style={{ fontSize: "0.8125rem", color: "var(--bx-muted)", lineHeight: 1.5, margin: "0 0 16px" }}>
                  {rec.description}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "14px",
                  borderTop: "1px solid var(--bx-border)",
                }}
              >
                <div style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>
                  <span>{rec.level} · {rec.durationHours} Jam</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveCourseTitle(rec.title);
                    if (typeof window !== "undefined") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
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
                  <span>Buka Koridor Kelas</span>
                  <FlatIcon type="chevron-right" size={11} color="#FFFFFF" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          8. MODAL DETAIL SUBMISSION
          ========================================================================= */}
      {selectedSubmission && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setSelectedSubmission(null)}
        >
          <div
            style={{
              background: "var(--bx-surface-card)",
              border: "1px solid var(--bx-border)",
              borderRadius: "12px",
              maxWidth: "600px",
              width: "100%",
              padding: "24px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 800,
                      padding: "2px 8px",
                      borderRadius: "4px",
                      background: selectedSubmission.status === "Diterima" ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                      color: selectedSubmission.status === "Diterima" ? "#10B981" : "#EF4444",
                      border: `1px solid ${selectedSubmission.status === "Diterima" ? "#10B981" : "#EF4444"}`,
                    }}
                  >
                    {selectedSubmission.status}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>
                    · {selectedSubmission.date}
                  </span>
                  {selectedSubmission.rating && (
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#F59E0B" }}>
                      · {selectedSubmission.rating}
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--bx-ink-bright)", margin: 0 }}>
                  {selectedSubmission.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedSubmission(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--bx-muted)",
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                <FlatIcon type="close" size={16} color="var(--bx-muted)" />
              </button>
            </div>

            <div style={{ marginBottom: "16px", padding: "14px", background: "var(--bx-bg)", borderRadius: "8px", border: "1px solid var(--bx-border)" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--gold)", marginBottom: "4px" }}>
                Evaluasi Reviewer ({selectedSubmission.reviewedBy}):
              </div>
              <p style={{ fontSize: "0.8125rem", color: "var(--bx-ink-bright)", margin: "0 0 10px", lineHeight: 1.6 }}>
                &ldquo;{selectedSubmission.feedbackSummary}&rdquo;
              </p>
              {selectedSubmission.notes && (
                <div style={{ fontSize: "0.75rem", color: "var(--bx-muted)", lineHeight: 1.5 }}>
                  {selectedSubmission.notes}
                </div>
              )}
            </div>

            {selectedSubmission.submissionFile && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "var(--bx-surface)", borderRadius: "6px", border: "1px solid var(--bx-border)", marginBottom: "20px" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <FlatIcon type="document" size={13} color="var(--gold)" />
                  <span>{selectedSubmission.submissionFile}</span>
                </span>
                <button
                  type="button"
                  onClick={() => alert(`Mengunduh berkas ${selectedSubmission.submissionFile}...`)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--gold)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Unduh Berkas
                </button>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                type="button"
                onClick={() => setSelectedSubmission(null)}
                style={{
                  background: "var(--bx-bg)",
                  border: "1px solid var(--bx-border)",
                  color: "var(--bx-ink-bright)",
                  padding: "8px 18px",
                  borderRadius: "6px",
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          9. MODAL DETAIL EXAM
          ========================================================================= */}
      {selectedExam && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setSelectedExam(null)}
        >
          <div
            style={{
              background: "var(--bx-surface-card)",
              border: "1px solid var(--bx-border)",
              borderRadius: "12px",
              maxWidth: "520px",
              width: "100%",
              padding: "24px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div>
                <span
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 800,
                    padding: "2px 8px",
                    borderRadius: "4px",
                    background: "rgba(16, 185, 129, 0.15)",
                    color: "#10B981",
                    border: "1px solid #10B981",
                  }}
                >
                  {selectedExam.status}
                </span>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--bx-ink-bright)", margin: "8px 0 2px" }}>
                  {selectedExam.title}
                </h3>
                <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>
                  Diselesaikan pada {selectedExam.date}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedExam(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--bx-muted)",
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                <FlatIcon type="close" size={16} color="var(--bx-muted)" />
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
              <div style={{ padding: "12px", background: "var(--bx-bg)", borderRadius: "6px", border: "1px solid var(--bx-border)", textAlign: "center" }}>
                <div style={{ fontSize: "0.6875rem", color: "var(--bx-muted)", textTransform: "uppercase" }}>Nilai Akhir</div>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#10B981", fontFamily: "var(--font-mono)" }}>{selectedExam.score}</div>
              </div>
              <div style={{ padding: "12px", background: "var(--bx-bg)", borderRadius: "6px", border: "1px solid var(--bx-border)", textAlign: "center" }}>
                <div style={{ fontSize: "0.6875rem", color: "var(--bx-muted)", textTransform: "uppercase" }}>Passing Grade</div>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--bx-ink-bright)", fontFamily: "var(--font-mono)" }}>{selectedExam.passingScore}</div>
              </div>
            </div>

            <p style={{ fontSize: "0.8125rem", color: "var(--bx-muted)", lineHeight: 1.5, margin: "0 0 20px" }}>
              Anda berhasil menjawab benar {Math.round((parseInt(selectedExam.score) / 100) * selectedExam.totalQuestions)} dari {selectedExam.totalQuestions} soal ujian pemahaman materi.
            </p>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                type="button"
                onClick={() => setSelectedExam(null)}
                style={{
                  background: "#10B981",
                  border: "none",
                  color: "#FFFFFF",
                  padding: "8px 18px",
                  borderRadius: "6px",
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}



      {/* =========================================================================
          11. MODAL LIHAT SERTIFIKAT KELULUSAN
          ========================================================================= */}
      <CertificateModal
        isOpen={showCertificateModal}
        onClose={() => setShowCertificateModal(false)}
        certificate={{
          recipientName: "Rendy Ariawindana",
          courseTitle: courseData.title,
          certificateId: courseData.certificateId || "ANV-CERT-2026-ML90-8472",
          completionDate: courseData.completionDate || "2 Mei 2026",
          finalScore: courseData.finalScore || "95%",
          durationHours: 90,
          instructorName: "Dr. Rian Pratama, M.Sc",
        }}
        onStudyAgain={() => {
          if (onNavigateNav) onNavigateNav("classroom");
          else setShowClassroom(true);
        }}
      />
    </div>
  );
}
