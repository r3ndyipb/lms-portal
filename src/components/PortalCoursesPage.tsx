"use client";

import React, { useState, useMemo } from "react";
import FlatIcon from "./FlatIcon";

export interface CourseCatalogItem {
  id: string;
  title: string;
  slug: string;
  category: "Web Development" | "Artificial Intelligence & ML" | "Cloud & DevOps" | "Data Science" | "Cyber Security" | "Mobile Development";
  level: "Pemula" | "Menengah" | "Mahir" | "Profesional";
  type: "Gratis" | "Premium" | "Bootcamp";
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  totalModules: number;
  durationHours: number;
  instructor: string;
  instructorRole: string;
  description: string;
  tags: string[];
  isPopular?: boolean;
  image?: string;
}

function getCourseImage(course: CourseCatalogItem): string {
  if (course.image) return course.image;
  const slug = course.slug.toLowerCase();
  if (slug.includes("fullstack")) return "/courses/fullstack.jpg";
  if (slug.includes("web") || course.category === "Web Development") return "/courses/web-dev.jpg";
  if (slug.includes("python")) return "/courses/python.jpg";
  if (slug.includes("deep-learning")) return "/courses/deep-learning.jpg";
  if (slug.includes("machine-learning")) return "/courses/machine-learning.jpg";
  if (slug.includes("docker") || slug.includes("devops")) return "/courses/devops-k8s.jpg";
  if (slug.includes("cyber") || course.category === "Cyber Security") return "/courses/cyber-security.jpg";
  if (slug.includes("cloud") || course.category === "Cloud & DevOps") return "/courses/cloud-aws.jpg";
  if (slug.includes("react")) return "/courses/react-frontend.jpg";
  if (slug.includes("data") || course.category === "Data Science") return "/courses/data-science.jpg";
  if (slug.includes("flutter") || course.category === "Mobile Development") return "/courses/mobile-flutter.jpg";
  if (slug.includes("gen") || slug.includes("ai")) return "/courses/genai-rag.jpg";
  return "/courses/machine-learning.jpg";
}

const COURSES_DATA: CourseCatalogItem[] = [
  {
    id: "c-1",
    title: "Fullstack Web & Modern AI Architecture",
    slug: "fullstack-web-ai-architecture",
    category: "Web Development",
    level: "Mahir",
    type: "Premium",
    rating: 4.95,
    reviewsCount: 1420,
    studentsCount: 8940,
    totalModules: 20,
    durationHours: 90,
    instructor: "Lead Expert ANVIEO",
    instructorRole: "Staff Software Architect",
    description: "Kuasai arsitektur Next.js 15+ App Router, distributed backend microservices, caching Redis, serta integrasi Socratic AI Tutor berbasis WebContainers.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "GenAI"],
    isPopular: true,
  },
  {
    id: "c-2",
    title: "Dasar Pemrograman Web & HTML5 Semantics",
    slug: "dasar-pemrograman-web",
    category: "Web Development",
    level: "Pemula",
    type: "Gratis",
    rating: 4.88,
    reviewsCount: 3210,
    studentsCount: 24500,
    totalModules: 12,
    durationHours: 35,
    instructor: "Budi Santoso, S.Kom",
    instructorRole: "Senior Frontend Engineer",
    description: "Pelajari fondasi utama web modern: struktur HTML5 semantik, CSS Grid & Flexbox responsif, aksesibilitas WAI-ARIA, dan DOM modern.",
    tags: ["HTML5", "CSS3", "Responsive", "A11y"],
  },
  {
    id: "c-3",
    title: "Machine Learning Terapan & Deep Learning PyTorch",
    slug: "machine-learning-deep-learning",
    category: "Artificial Intelligence & ML",
    level: "Menengah",
    type: "Premium",
    rating: 4.92,
    reviewsCount: 980,
    studentsCount: 6200,
    totalModules: 16,
    durationHours: 75,
    instructor: "Dr. Rian Pratama, M.Sc",
    instructorRole: "Principal AI Scientist",
    description: "Mulai dari dasar manipulasi data komputasi numerik dengan NumPy & Pandas hingga pembangunan arsitektur Transformer dan Computer Vision.",
    tags: ["Python", "PyTorch", "Scikit-Learn", "Computer Vision"],
    isPopular: true,
  },
  {
    id: "c-4",
    title: "Prompt Engineering & GenAI Agent Workflow",
    slug: "prompt-engineering-genai-agent",
    category: "Artificial Intelligence & ML",
    level: "Pemula",
    type: "Gratis",
    rating: 4.85,
    reviewsCount: 1870,
    studentsCount: 15400,
    totalModules: 8,
    durationHours: 20,
    instructor: "Dewi Lestari, M.Kom",
    instructorRole: "AI Solutions Consultant",
    description: "Pelajari teknik prompt engineering tingkat lanjut, Chain-of-Thought, RAG (Retrieval Augmented Generation), dan orkestrasi agent AI multi-domain.",
    tags: ["Prompting", "LLM", "RAG", "Agentic AI"],
  },
  {
    id: "c-5",
    title: "DevOps CI/CD & Kubernetes Cluster Orchestration",
    slug: "devops-cicd-kubernetes",
    category: "Cloud & DevOps",
    level: "Mahir",
    type: "Premium",
    rating: 4.94,
    reviewsCount: 740,
    studentsCount: 4890,
    totalModules: 18,
    durationHours: 80,
    instructor: "Hendra Wijaya",
    instructorRole: "Senior DevOps Architect",
    description: "Bangun pipeline CI/CD zero-downtime dengan GitHub Actions, containerization Docker multi-stage, dan orkestrasi kluster Kubernetes tingkat enterprise.",
    tags: ["Docker", "Kubernetes", "CI/CD", "Linux", "GitOps"],
  },
  {
    id: "c-6",
    title: "Cloud Infrastructure Specialist with AWS",
    slug: "cloud-specialist-aws",
    category: "Cloud & DevOps",
    level: "Menengah",
    type: "Bootcamp",
    rating: 4.91,
    reviewsCount: 520,
    studentsCount: 3100,
    totalModules: 22,
    durationHours: 110,
    instructor: "Arif Kurniawan, AWS Champion",
    instructorRole: "Cloud Solutions Architect",
    description: "Persiapan lengkap sertifikasi AWS Solutions Architect & Cloud Practitioner dengan puluhan sesi hands-on lab dan live mentoring 1-on-1.",
    tags: ["AWS", "Terraform", "Serverless", "Security"],
  },
  {
    id: "c-7",
    title: "Data Science & Big Data Engineering dengan PySpark",
    slug: "data-science-big-data-pyspark",
    category: "Data Science",
    level: "Menengah",
    type: "Premium",
    rating: 4.89,
    reviewsCount: 650,
    studentsCount: 4200,
    totalModules: 14,
    durationHours: 65,
    instructor: "Siti Rahmawati, Ph.D",
    instructorRole: "Lead Data Scientist",
    description: "Eksplorasi pengolahan data volume besar menggunakan Apache Spark, data pipeline ETL otomatis, dan visualisasi interaktif analitik bisnis.",
    tags: ["Python", "Spark", "SQL", "Big Data", "ETL"],
  },
  {
    id: "c-8",
    title: "Cybersecurity Defense & Ethical Penetration Testing",
    slug: "cybersecurity-defense-ethical-hacking",
    category: "Cyber Security",
    level: "Mahir",
    type: "Premium",
    rating: 4.96,
    reviewsCount: 810,
    studentsCount: 5120,
    totalModules: 16,
    durationHours: 70,
    instructor: "Fajar Nugraha, CISSP",
    instructorRole: "Head of Cyber Defense",
    description: "Pelajari metodologi keamanan siber OWASP Top 10, penetration testing, analisis kelemahan jaringan, serta proteksi infrastruktur cloud kritis.",
    tags: ["CyberSec", "OWASP", "Ethical Hacking", "Forensics"],
  },
  {
    id: "c-9",
    title: "Flutter & Dart: Multiplatform Cross-App Development",
    slug: "flutter-multiplatform-development",
    category: "Mobile Development",
    level: "Pemula",
    type: "Gratis",
    rating: 4.87,
    reviewsCount: 1640,
    studentsCount: 12800,
    totalModules: 10,
    durationHours: 40,
    instructor: "Reza Pratama",
    instructorRole: "Mobile Specialist Lead",
    description: "Bangun aplikasi mobile Android & iOS berkinerja tinggi dalam satu basis kode menggunakan Google Flutter, Bloc state management, dan Clean Architecture.",
    tags: ["Flutter", "Dart", "Android", "iOS", "Mobile"],
  },
  {
    id: "c-10",
    title: "Enterprise Architecture & Micro-Frontend Governance",
    slug: "enterprise-architecture-micro-frontend",
    category: "Web Development",
    level: "Profesional",
    type: "Bootcamp",
    rating: 4.98,
    reviewsCount: 390,
    studentsCount: 1850,
    totalModules: 24,
    durationHours: 120,
    instructor: "VP of Engineering ANVIEO",
    instructorRole: "Executive Tech Advisor",
    description: "Program intensif level prinsipal: decoupling aplikasi monolitik menjadi micro-frontend dan microservices berkinerja miliaran request per bulan.",
    tags: ["Microservices", "System Design", "Enterprise", "High-Concurrency"],
  },
  {
    id: "c-11",
    title: "Modern Database Engineering: PostgreSQL & Vector Search",
    slug: "database-engineering-postgresql-vector",
    category: "Data Science",
    level: "Mahir",
    type: "Premium",
    rating: 4.93,
    reviewsCount: 460,
    studentsCount: 2980,
    totalModules: 14,
    durationHours: 55,
    instructor: "Gunawan Santoso",
    instructorRole: "Staff Database Administrator",
    description: "Pelajari query optimization, locking mechanism, indexing HNSW/IVFFlat dengan pgvector untuk AI semantic search, dan database partitioning.",
    tags: ["PostgreSQL", "pgvector", "SQL Tuning", "Vector DB"],
  },
  {
    id: "c-12",
    title: "iOS Native App Development dengan Swift & SwiftUI",
    slug: "ios-native-swift-swiftui",
    category: "Mobile Development",
    level: "Menengah",
    type: "Premium",
    rating: 4.9,
    reviewsCount: 510,
    studentsCount: 3400,
    totalModules: 15,
    durationHours: 60,
    instructor: "Kevin Chandra",
    instructorRole: "iOS Senior Architect",
    description: "Kuasai pemrograman Apple ecosystem dengan Swift modern, deklaratif SwiftUI, integrasi CoreData & CloudKit, dan arsitektur MVVM modular.",
    tags: ["Swift", "SwiftUI", "iOS", "Apple", "Mobile"],
  },
];

const ITEMS_PER_PAGE = 6;

interface PortalCoursesPageProps {
  onNavigateNav?: (navId: string) => void;
}

export default function PortalCoursesPage({ onNavigateNav }: PortalCoursesPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("Semua");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [selectedType, setSelectedType] = useState<string>("Semua");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [enrollToast, setEnrollToast] = useState<string | null>(null);

  // Filter options
  const levelOptions = ["Semua", "Pemula", "Menengah", "Mahir", "Profesional"];
  const categoryOptions = [
    "Semua",
    "Web Development",
    "Artificial Intelligence & ML",
    "Cloud & DevOps",
    "Data Science",
    "Cyber Security",
    "Mobile Development",
  ];
  const typeOptions = ["Semua", "Gratis", "Premium", "Bootcamp"];

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter((course) => {
      // Search text
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = course.title.toLowerCase().includes(query);
        const matchesDesc = course.description.toLowerCase().includes(query);
        const matchesTags = course.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesTags) return false;
      }

      // Level
      if (selectedLevel !== "Semua" && course.level !== selectedLevel) {
        return false;
      }

      // Category
      if (selectedCategory !== "Semua" && course.category !== selectedCategory) {
        return false;
      }

      // Type
      if (selectedType !== "Semua" && course.type !== selectedType) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedLevel, selectedCategory, selectedType]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE) || 1;
  const validPage = Math.min(currentPage, totalPages);
  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleEnrollCourse = (course: CourseCatalogItem) => {
    if (course.type === "Premium") {
      setEnrollToast(`Membuka silabus "${course.title}". Modul premium membutuhkan akses langganan aktif.`);
    } else {
      setEnrollToast(`Pendaftaran kelas "${course.title}" berhasil! Silakan mulai belajar dari modul 1.`);
    }
    setTimeout(() => setEnrollToast(null), 5000);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedLevel("Semua");
    setSelectedCategory("Semua");
    setSelectedType("Semua");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedLevel !== "Semua" ||
    selectedCategory !== "Semua" ||
    selectedType !== "Semua";

  return (
    <div className="portal-content-fluid" style={{ paddingBottom: "90px" }}>
      {/* Toast Notification */}
      {enrollToast && (
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
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <FlatIcon type="check-circle" size={16} color="#10B981" />
            <span>{enrollToast}</span>
          </span>
          <button
            type="button"
            onClick={() => setEnrollToast(null)}
            style={{ background: "none", border: "none", color: "#10B981", cursor: "pointer" }}
          >
            <FlatIcon type="close" size={14} color="#10B981" />
          </button>
        </div>
      )}

      {/* Header Halaman */}
      <div style={{ marginBottom: "22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "var(--bx-ink-bright)",
                margin: "0 0 6px",
              }}
            >
              Katalog Kelas &amp; Kurikulum
            </h1>
            <p style={{ fontSize: "0.84375rem", color: "var(--bx-muted)", margin: 0 }}>
              Jelajahi seluruh kelas pembelajaran berstandar global dengan filter tingkat, topik, dan tipe kelas.
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="button"
              onClick={() => onNavigateNav && onNavigateNav("learning-path")}
              style={{
                background: "var(--bx-surface)",
                border: "1px solid var(--bx-border)",
                color: "var(--gold)",
                padding: "8px 14px",
                borderRadius: "6px",
                fontSize: "0.8125rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <FlatIcon type="layers" size={14} color="var(--gold)" />
              <span>Lihat Learning Path →</span>
            </button>
          </div>
        </div>
      </div>

      {/* FILTER BAR SECTION */}
      <div
        className="portal-dash-card"
        style={{
          padding: "18px 20px",
          marginBottom: "24px",
          background: "var(--bx-surface)",
          border: "1px solid var(--bx-border)",
        }}
      >
        {/* Search Input Row */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--bx-muted)" }}>
              <FlatIcon type="search" size={16} color="var(--bx-muted)" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Cari kelas, teknologi, instruktur, atau kata kunci (contoh: Next.js, Python, Kubernetes)..."
              style={{
                width: "100%",
                padding: "10px 14px 10px 40px",
                borderRadius: "6px",
                border: "1px solid var(--bx-border)",
                background: "var(--bx-bg)",
                color: "var(--bx-ink-bright)",
                fontSize: "0.84375rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "var(--bx-muted)",
                  cursor: "pointer",
                }}
              >
                <FlatIcon type="close" size={14} color="var(--bx-muted)" />
              </button>
            )}
          </div>
        </div>

        {/* 3 Dropdown / Filter Rows: Tingkat, Topik, Tipe Kelas */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "14px",
          }}
        >
          {/* Filter 1: Tingkat */}
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "6px" }}>
              Tingkat Kesulitan:
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => {
                setSelectedLevel(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                width: "100%",
                padding: "8px 12px",
                fontSize: "0.8125rem",
                borderRadius: "6px",
                border: "1px solid var(--bx-border)",
                background: "var(--bx-bg)",
                color: "var(--bx-ink-bright)",
                outline: "none",
                cursor: "pointer",
              }}
            >
              {levelOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === "Semua" ? "Semua Tingkat" : `Tingkat ${opt}`}
                </option>
              ))}
            </select>
          </div>

          {/* Filter 2: Topik */}
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "6px" }}>
              Topik Pembelajaran:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                width: "100%",
                padding: "8px 12px",
                fontSize: "0.8125rem",
                borderRadius: "6px",
                border: "1px solid var(--bx-border)",
                background: "var(--bx-bg)",
                color: "var(--bx-ink-bright)",
                outline: "none",
                cursor: "pointer",
              }}
            >
              {categoryOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === "Semua" ? "Semua Topik" : opt}
                </option>
              ))}
            </select>
          </div>

          {/* Filter 3: Tipe Kelas */}
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "6px" }}>
              Tipe Kelas:
            </label>
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                width: "100%",
                padding: "8px 12px",
                fontSize: "0.8125rem",
                borderRadius: "6px",
                border: "1px solid var(--bx-border)",
                background: "var(--bx-bg)",
                color: "var(--bx-ink-bright)",
                outline: "none",
                cursor: "pointer",
              }}
            >
              {typeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === "Semua" ? "Semua Tipe Kelas" : opt === "Gratis" ? "Gratis (Freemium)" : opt === "Premium" ? "Premium (Akses Penuh)" : "Bootcamp Bersertifikat"}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Quick Pills and Reset */}
        {hasActiveFilters && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "14px", flexWrap: "wrap", paddingTop: "12px", borderTop: "1px solid var(--bx-border)" }}>
            <span style={{ fontSize: "0.71875rem", color: "var(--bx-muted)", fontWeight: 600 }}>Filter aktif:</span>
            {selectedLevel !== "Semua" && (
              <span style={{ fontSize: "0.6875rem", background: "var(--bx-bg)", border: "1px solid var(--bx-border)", padding: "2px 8px", borderRadius: "12px", color: "var(--gold)" }}>
                Tingkat: {selectedLevel}
              </span>
            )}
            {selectedCategory !== "Semua" && (
              <span style={{ fontSize: "0.6875rem", background: "var(--bx-bg)", border: "1px solid var(--bx-border)", padding: "2px 8px", borderRadius: "12px", color: "var(--gold)" }}>
                Topik: {selectedCategory}
              </span>
            )}
            {selectedType !== "Semua" && (
              <span style={{ fontSize: "0.6875rem", background: "var(--bx-bg)", border: "1px solid var(--bx-border)", padding: "2px 8px", borderRadius: "12px", color: "var(--gold)" }}>
                Tipe: {selectedType}
              </span>
            )}
            <button
              type="button"
              onClick={handleResetFilters}
              style={{ fontSize: "0.71875rem", color: "#EF4444", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", marginLeft: "auto" }}
            >
              Reset Semua Filter
            </button>
          </div>
        )}
      </div>

      {/* COURSE CARDS GRID */}
      {paginatedCourses.length === 0 ? (
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
            <FlatIcon type="search" size={20} color="var(--bx-muted)" />
          </div>
          <div style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "4px" }}>
            Tidak ada kelas yang sesuai dengan kriteria filter.
          </div>
          <p style={{ fontSize: "0.8125rem", color: "var(--bx-muted)", margin: "0 0 16px" }}>
            Coba ubah kata kunci pencarian atau reset filter untuk melihat katalog kelas lainnya.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            style={{
              background: "var(--gold)",
              color: "#0A0A0C",
              padding: "8px 18px",
              borderRadius: "6px",
              fontSize: "0.8125rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="portal-courses-grid">
          {paginatedCourses.map((course) => {
            const isGratis = course.type === "Gratis";
            const isBootcamp = course.type === "Bootcamp";

            return (
              <div
                key={course.id}
                className="portal-dash-card"
                style={{
                  padding: "0",
                  border: "1px solid var(--bx-border)",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.18s ease, border-color 0.18s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Course Card Cover Image */}
                <div
                  style={{
                    width: "100%",
                    height: "155px",
                    position: "relative",
                    background: "#0d1017",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={getCourseImage(course)}
                    alt={course.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  {/* Floating Badges Row on Image */}
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      right: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.625rem",
                        fontWeight: 800,
                        padding: "3px 8px",
                        borderRadius: "4px",
                        background: "rgba(10, 10, 12, 0.85)",
                        backdropFilter: "blur(6px)",
                        color: "var(--gold)",
                        border: "1px solid rgba(201, 150, 46, 0.35)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {course.category}
                    </span>

                    <span
                      style={{
                        fontSize: "0.625rem",
                        fontWeight: 800,
                        fontFamily: "var(--font-mono)",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        background: isGratis
                          ? "rgba(16, 185, 129, 0.9)"
                          : isBootcamp
                          ? "rgba(139, 92, 246, 0.9)"
                          : "rgba(201, 150, 46, 0.9)",
                        color: isGratis || isBootcamp ? "#FFFFFF" : "#0A0A0C",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
                      }}
                    >
                      {course.type.toUpperCase()}
                    </span>
                  </div>

                  {/* Level Pill Bottom Left of Image */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "8px",
                      left: "10px",
                      background: "rgba(10, 10, 12, 0.8)",
                      backdropFilter: "blur(4px)",
                      padding: "2px 7px",
                      borderRadius: "4px",
                      fontSize: "0.625rem",
                      fontWeight: 700,
                      color: "var(--bx-ink-bright)",
                      border: "1px solid var(--bx-border)",
                    }}
                  >
                    Tingkat {course.level}
                  </div>
                </div>

                <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                  <div>

                  {/* Course Title */}
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
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--bx-muted)",
                      lineHeight: 1.5,
                      margin: "0 0 14px",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {course.description}
                  </p>

                  {/* Stats Row: Rating, Students, Modules */}
                  <div style={{ display: "flex", gap: "12px", alignItems: "center", fontSize: "0.75rem", color: "var(--bx-muted)", marginBottom: "14px", flexWrap: "wrap" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "var(--gold)", fontWeight: 700 }}>
                      <FlatIcon type="star" size={13} color="var(--gold)" />
                      <span>{course.rating.toFixed(2)}</span>
                    </span>
                    <span>·</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <FlatIcon type="users" size={13} color="var(--bx-muted)" />
                      <span>{course.studentsCount.toLocaleString("id-ID")} Siswa</span>
                    </span>
                    <span>·</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <FlatIcon type="clock" size={13} color="var(--bx-muted)" />
                      <span>{course.durationHours} Jam ({course.totalModules} Modul)</span>
                    </span>
                  </div>

                  {/* Instructor */}
                  <div style={{ fontSize: "0.75rem", color: "var(--bx-muted)", marginBottom: "14px" }}>
                    Instruktur: <strong style={{ color: "var(--bx-ink-bright)" }}>{course.instructor}</strong> ({course.instructorRole})
                  </div>

                  {/* Tags */}
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
                    {course.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          fontSize: "0.6875rem",
                          padding: "2px 7px",
                          borderRadius: "4px",
                          background: "var(--bx-bg)",
                          border: "1px solid var(--bx-border)",
                          color: "var(--bx-ink)",
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div style={{ borderTop: "1px solid var(--bx-border)", paddingTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.78125rem", fontWeight: 700, color: isGratis ? "#10B981" : "var(--gold)" }}>
                    {isGratis ? "Akses Terbuka" : isBootcamp ? "Kurikulum Intensif" : "Paket Langganan"}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleEnrollCourse(course)}
                    style={{
                      background: isGratis ? "#10B981" : "var(--gold)",
                      color: isGratis ? "#FFFFFF" : "#0A0A0C",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      fontSize: "0.78125rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span>{isGratis ? "Pelajari Gratis" : "Buka Kelas"}</span>
                    <FlatIcon type="chevron-right" size={12} color={isGratis ? "#FFFFFF" : "#0A0A0C"} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* STICKY FOOTER NAVIGATION (DI KANAN / KONTEN, TIDAK MENUTUPI MENU SAMPING) */}
      {/* ========================================================================= */}
      <div className="portal-courses-bottom-nav">
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          {/* Left Summary */}
          <div style={{ fontSize: "0.8125rem", color: "var(--bx-muted)", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontWeight: 700, color: "var(--bx-ink-bright)" }}>
              Menampilkan {paginatedCourses.length > 0 ? startIndex + 1 : 0} -{" "}
              {Math.min(startIndex + ITEMS_PER_PAGE, filteredCourses.length)} dari {filteredCourses.length} Kelas
            </span>
            {hasActiveFilters && (
              <span style={{ fontSize: "0.75rem", color: "var(--gold)" }}>
                (Filter Diterapkan)
              </span>
            )}
          </div>

          {/* Right Pagination Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              type="button"
              disabled={validPage <= 1}
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{
                padding: "6px 14px",
                borderRadius: "5px",
                border: "1px solid var(--bx-border)",
                background: validPage <= 1 ? "var(--bx-bg)" : "var(--bx-surface)",
                color: validPage <= 1 ? "var(--bx-muted)" : "var(--bx-ink-bright)",
                fontSize: "0.78125rem",
                fontWeight: 700,
                cursor: validPage <= 1 ? "not-allowed" : "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <FlatIcon type="chevron-left" size={12} />
              <span>Sebelumnya</span>
            </button>

            <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--bx-ink-bright)", padding: "0 6px" }}>
              Halaman {validPage} dari {totalPages}
            </span>

            <button
              type="button"
              disabled={validPage >= totalPages}
              onClick={() => {
                setCurrentPage((p) => Math.min(totalPages, p + 1));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{
                padding: "6px 14px",
                borderRadius: "5px",
                border: "1px solid var(--bx-border)",
                background: validPage >= totalPages ? "var(--bx-bg)" : "var(--bx-surface)",
                color: validPage >= totalPages ? "var(--bx-muted)" : "var(--bx-ink-bright)",
                fontSize: "0.78125rem",
                fontWeight: 700,
                cursor: validPage >= totalPages ? "not-allowed" : "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>Selanjutnya</span>
              <FlatIcon type="chevron-right" size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
