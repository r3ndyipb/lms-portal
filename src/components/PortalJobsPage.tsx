"use client";

import React, { useState, useMemo } from "react";
import FlatIcon from "./FlatIcon";

export interface JobListing {
  id: string;
  title: string;
  company: string;
  companyLogoText: string;
  image: string;
  location: string;
  workType: "Remote" | "Hybrid" | "On-site";
  category: "Fullstack & Web" | "AI & Machine Learning" | "Cloud & DevOps" | "Data & Database" | "Cybersecurity";
  experienceLevel: "Fresh Graduate (LMS)" | "Junior (1-2 Thn)" | "Mid/Senior (3+ Thn)";
  salaryRange: string;
  postedDate: string;
  deadline: string;
  description: string;
  requirements: string[];
  skills: string[];
  isPartnerVerified: boolean;
}

export interface CandidateTalent {
  id: string;
  name: string;
  title: string;
  learningTrack: string;
  avatarText: string;
  avatar?: string;
  graduationScore: string;
  graduationDate: string;
  employmentStatus: "Belum Bekerja (Open to Work)" | "Tersedia Segera";
  location: string;
  expectedSalary: string;
  reviewerEndorsement: string;
  skills: string[];
  capstoneProject: string;
  certificateId: string;
}

const JOBS_DATA: JobListing[] = [
  {
    id: "job-1",
    title: "Fullstack Web & AI Systems Engineer",
    company: "PT Pixel Perdana Jaya",
    companyLogoText: "PPJ",
    image: "/jobs/job-1.jpg",
    location: "Jakarta Selatan (Hybrid)",
    workType: "Hybrid",
    category: "Fullstack & Web",
    experienceLevel: "Fresh Graduate (LMS)",
    salaryRange: "Rp 15.000.000 - Rp 24.000.000 / bln",
    postedDate: "25 Okt 2026",
    deadline: "15 Nov 2026",
    description: "Membangun sistem SaaS ERP dan portal layanan pelanggan modern berbasis Next.js 15+ App Router, microservices backend, serta integrasi copilot AI penalaran sistem.",
    requirements: [
      "Lulusan terverifikasi ANVIEO Academy jalur Fullstack Web & AI Architecture dengan nilai minimal 90",
      "Keahlian mendalam TypeScript, Next.js Server Components, PostgreSQL, dan Redis caching",
      "Mampu bekerja secara kolaboratif dalam sprint Agile dan CI/CD pipeline",
    ],
    skills: ["Next.js 15", "TypeScript", "PostgreSQL", "Redis", "GenAI"],
    isPartnerVerified: true,
  },
  {
    id: "job-2",
    title: "Applied Machine Learning & LLM Engineer",
    company: "Unicorn AI FinTech Lab",
    companyLogoText: "UAI",
    image: "/jobs/job-2.jpg",
    location: "Jakarta Pusat / Remote Indonesia",
    workType: "Remote",
    category: "AI & Machine Learning",
    experienceLevel: "Fresh Graduate (LMS)",
    salaryRange: "Rp 16.000.000 - Rp 28.000.000 / bln",
    postedDate: "24 Okt 2026",
    deadline: "20 Nov 2026",
    description: "Mengembangkan pipeline fine-tuning model LLM lokal, evaluasi RAG (Retrieval Augmented Generation), dan serving model machine learning dengan latensi ultra-rendah.",
    requirements: [
      "Memahami arsitektur Transformer, PyTorch, LangChain/LlamaIndex, dan vektor database (pgvector/Pinecone)",
      "Portofolio implementasi agen AI atau klasifikasi numerik yang teruji di produksi",
      "Lulusan jalur Applied AI Engineer ANVIEO atau setara",
    ],
    skills: ["Python", "PyTorch", "RAG", "LLM Fine-tuning", "FastAPI"],
    isPartnerVerified: true,
  },
  {
    id: "job-3",
    title: "Cloud Infrastructure & DevOps Engineer",
    company: "Enterprise Cloud Partner Indonesia",
    companyLogoText: "ECP",
    image: "/jobs/job-3.jpg",
    location: "Bandung / Hybrid",
    workType: "Hybrid",
    category: "Cloud & DevOps",
    experienceLevel: "Junior (1-2 Thn)",
    salaryRange: "Rp 14.000.000 - Rp 22.000.000 / bln",
    postedDate: "22 Okt 2026",
    deadline: "10 Nov 2026",
    description: "Mengelola kluster Kubernetes multi-environment, provisioning infrastruktur deklaratif dengan Terraform di AWS, dan memastikan zero-downtime deployment.",
    requirements: [
      "Pengalaman praktis mengoperasikan Docker container, Kubernetes Pod, Ingress, dan Helm charts",
      "Terbiasa dengan automated pipeline GitHub Actions dan Linux terminal automation",
      "Sertifikasi AWS Cloud Practitioner atau kelulusan bootcamp DevOps diutamakan",
    ],
    skills: ["Kubernetes", "Docker", "Terraform", "AWS", "CI/CD"],
    isPartnerVerified: true,
  },
  {
    id: "job-4",
    title: "Cyber Defense & Application Security Analyst",
    company: "Bank Digital Mandiri Konsorsium",
    companyLogoText: "BDM",
    image: "/jobs/job-4.jpg",
    location: "Jakarta Barat (On-site)",
    workType: "On-site",
    category: "Cybersecurity",
    experienceLevel: "Fresh Graduate (LMS)",
    salaryRange: "Rp 15.000.000 - Rp 25.000.000 / bln",
    postedDate: "20 Okt 2026",
    deadline: "18 Nov 2026",
    description: "Melakukan audit keamanan aplikasi berbasis OWASP Top 10, penetration testing internal, dan memonitor deteksi ancaman siber pada platform transaksi perbankan.",
    requirements: [
      "Menguasai teknik mitigasi SQLi, XSS, CSRF, IAM hardening, dan enkripsi data end-to-end",
      "Memiliki etika profesional tinggi dan sertifikasi kompetensi keamanan siber terverifikasi",
      "Bersedia bekerja dalam tim operasional keamanan perbankan (SOC)",
    ],
    skills: ["OWASP", "Penetration Testing", "Network Security", "Cryptography", "DevSecOps"],
    isPartnerVerified: true,
  },
  {
    id: "job-5",
    title: "Database Architect & High-Performance Data Engineer",
    company: "Global Logistics Tech Platform",
    companyLogoText: "GLT",
    image: "/jobs/job-5.jpg",
    location: "Jakarta Utara (Hybrid)",
    workType: "Hybrid",
    category: "Data & Database",
    experienceLevel: "Mid/Senior (3+ Thn)",
    salaryRange: "Rp 22.000.000 - Rp 35.000.000 / bln",
    postedDate: "18 Okt 2026",
    deadline: "30 Nov 2026",
    description: "Merancang database partitioning, query index tuning pada tabel miliaran baris data, dan streaming ETL pipeline data analitis real-time.",
    requirements: [
      "Pengalaman mendalam PostgreSQL, Apache Kafka/RabbitMQ, clickstream analytics, dan database caching",
      "Kemampuan problem solving kuat dalam menangani deadlock transaksi dan connection exhaustion",
    ],
    skills: ["PostgreSQL", "Kafka", "SQL Optimization", "Data Modeling", "Redis"],
    isPartnerVerified: true,
  },
  {
    id: "job-6",
    title: "Mobile Application & React Native Engineer",
    company: "Nusantara FinTech Innovations",
    companyLogoText: "NFI",
    image: "/jobs/job-6.jpg",
    location: "Surabaya (Hybrid)",
    workType: "Hybrid",
    category: "Fullstack & Web",
    experienceLevel: "Junior (1-2 Thn)",
    salaryRange: "Rp 13.000.000 - Rp 20.000.000 / bln",
    postedDate: "16 Okt 2026",
    deadline: "25 Nov 2026",
    description: "Membangun antarmuka mobile e-wallet responsif dan aman menggunakan React Native, offline-first sync SQLite, dan biometric authentication.",
    requirements: [
      "Pengalaman pengembangan cross-platform React Native / Flutter",
      "Memahami state management Zustand / Redux Toolkit dan secure token storage",
    ],
    skills: ["React Native", "TypeScript", "Mobile", "REST API", "Zustand"],
    isPartnerVerified: true,
  },
];

const CANDIDATES_DATA: CandidateTalent[] = [
  {
    id: "can-1",
    name: "Rendy Ariawindana",
    title: "Fullstack Web & AI Systems Architect (Top 5% Graduate)",
    learningTrack: "Fullstack Web & AI Architecture",
    avatarText: "RA",
    avatar: "/alumni/alumni_1.jpg",
    graduationScore: "98 / 100 (Predikat Cum Laude)",
    graduationDate: "Oktober 2026",
    employmentStatus: "Belum Bekerja (Open to Work)",
    location: "Jakarta / Siap Remote",
    expectedSalary: "Rp 16.000.000 - Rp 22.000.000",
    reviewerEndorsement: "“Rendy menunjukkan pemahaman arsitektur yang sangat matang dalam memisahkan server action, asynchronous caching Redis, dan isolasi keamanan container WebContainers. Sangat direkomendasikan untuk posisi Software Engineer tingkat Mahir.”",
    skills: ["Next.js 15+", "TypeScript", "PostgreSQL", "Redis", "WebContainers", "Docker", "GenAI Integration"],
    capstoneProject: "Enterprise Multi-Tenant SaaS LMS & In-Browser Socratic AI Cloud Playground",
    certificateId: "CERT-ANV-2026-0842-FULLSTACK",
  },
  {
    id: "can-2",
    name: "Nadia Saraswati, S.Kom",
    title: "Applied AI & Computer Vision Specialist",
    learningTrack: "Applied AI & Machine Learning",
    avatarText: "NS",
    avatar: "/alumni/alumni_2.jpg",
    graduationScore: "96 / 100",
    graduationDate: "September 2026",
    employmentStatus: "Belum Bekerja (Open to Work)",
    location: "Bandung / Siap Relokasi",
    expectedSalary: "Rp 15.000.000 - Rp 20.000.000",
    reviewerEndorsement: "“Mampu membangun model klasifikasi citra medis dan RAG pipeline hukum dengan presisi 97.4%. Kode Python sangat modular dan terdokumentasi rapi sesuai standar PEP8.”",
    skills: ["Python", "PyTorch", "OpenCV", "LangChain", "FastAPI", "Docker", "pgvector"],
    capstoneProject: "Autonomous Multi-Document Legal RAG Engine & Visual Inspection Model",
    certificateId: "CERT-ANV-2026-0711-AIML",
  },
  {
    id: "can-3",
    name: "Dimas Suryo Prasetyo",
    title: "Cloud Infrastructure & GitOps Specialist",
    learningTrack: "Cloud Solutions Architect & DevOps",
    avatarText: "DP",
    avatar: "/alumni/alumni_3.jpg",
    graduationScore: "95 / 100",
    graduationDate: "Oktober 2026",
    employmentStatus: "Belum Bekerja (Open to Work)",
    location: "Surabaya / Siap Remote",
    expectedSalary: "Rp 14.000.000 - Rp 19.000.000",
    reviewerEndorsement: "“Proyek capstone Kubernetes cluster Dimas berhasil lolos stress testing 50.000 concurrent request dengan auto-scaling HPA tanpa kegagalan pod. Memiliki pemahaman kuat mengenai IaC Terraform.”",
    skills: ["Kubernetes", "AWS Cloud", "Terraform", "GitHub Actions", "Prometheus", "Linux CLI"],
    capstoneProject: "Resilient Multi-Region Kubernetes Cluster with Automated Zero-Downtime Pipeline",
    certificateId: "CERT-ANV-2026-0923-DEVOPS",
  },
  {
    id: "can-4",
    name: "Citra Amelia Putri",
    title: "Application Security & DevSecOps Engineer",
    learningTrack: "Cyber Defense Specialist",
    avatarText: "CP",
    avatar: "/alumni/alumni_4.jpg",
    graduationScore: "97 / 100",
    graduationDate: "Oktober 2026",
    employmentStatus: "Belum Bekerja (Open to Work)",
    location: "Yogyakarta / Siap Remote",
    expectedSalary: "Rp 15.000.000 - Rp 20.000.000",
    reviewerEndorsement: "“Citra mampu mengidentifikasi 8 celah keamanan kritis dalam simulasi aplikasi perbankan dan membuat mitigasi kode pencegahan XSS/SSRF secara instan. Sangat teliti dalam audit IAM.”",
    skills: ["OWASP Top 10", "Penetration Testing", "SAST/DAST", "Cloud IAM", "Cryptography", "Python"],
    capstoneProject: "Automated Security Audit Pipeline & Defense Guard for Cloud Microservices",
    certificateId: "CERT-ANV-2026-0645-CYBER",
  },
];

interface PortalJobsPageProps {
  onNavigateNav?: (navId: string) => void;
}

export default function PortalJobsPage({ onNavigateNav }: PortalJobsPageProps) {
  // Main Tab: "jobs-board" (Lowongan Kerja) vs "talent-pool" (Rekomendasi Talenta untuk Stakeholder)
  const [activeTab, setActiveTab] = useState<"jobs-board" | "talent-pool">("jobs-board");

  // Filters for Job Board
  const [jobCategory, setJobCategory] = useState<string>("Semua");
  const [jobWorkType, setJobWorkType] = useState<string>("Semua");
  const [jobLevel, setJobLevel] = useState<string>("Semua");

  // Filters for Talent Pool
  const [talentTrack, setTalentTrack] = useState<string>("Semua");

  // Job Application Modal
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyNotes, setApplyNotes] = useState("");

  // Interview Invitation Modal for Stakeholder
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateTalent | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [invitePosition, setInvitePosition] = useState("Fullstack Web & AI Systems Engineer");
  const [inviteDate, setInviteDate] = useState("2026-11-06");
  const [inviteNotes, setInviteNotes] = useState("");

  // Post Job Modal for Stakeholder
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newJobCompany, setNewJobCompany] = useState("");
  const [newJobSalary, setNewJobSalary] = useState("Rp 15.000.000 - Rp 22.000.000");

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 6000);
  };

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return JOBS_DATA.filter((j) => {
      if (jobCategory !== "Semua" && j.category !== jobCategory) return false;
      if (jobWorkType !== "Semua" && j.workType !== jobWorkType) return false;
      if (jobLevel !== "Semua" && j.experienceLevel !== jobLevel) return false;
      return true;
    });
  }, [jobCategory, jobWorkType, jobLevel]);

  // Filtered candidates
  const filteredCandidates = useMemo(() => {
    return CANDIDATES_DATA.filter((c) => {
      if (talentTrack !== "Semua" && !c.learningTrack.includes(talentTrack)) return false;
      return true;
    });
  }, [talentTrack]);

  // Handlers
  const handleOpenApplyModal = (job: JobListing) => {
    setSelectedJob(job);
    setIsApplyModalOpen(true);
  };

  const handleConfirmApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    setIsApplyModalOpen(false);
    showToast(
      `Lamaran Anda untuk posisi "${selectedJob.title}" di ${selectedJob.company} berhasil dikirim beserta Sertifikat Terverifikasi ANVIEO!`
    );
    setApplyNotes("");
  };

  const handleOpenInviteModal = (candidate: CandidateTalent) => {
    setSelectedCandidate(candidate);
    setIsInviteModalOpen(true);
  };

  const handleConfirmInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCandidate) return;
    setIsInviteModalOpen(false);
    showToast(
      `Undangan wawancara berhasil dikirimkan kepada ${selectedCandidate.name} untuk posisi "${invitePosition}" pada tanggal ${inviteDate}!`
    );
    setInviteNotes("");
  };

  const handleConfirmPostJob = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPostJobModalOpen(false);
    showToast(
      `Lowongan "${newJobTitle}" untuk perusahaan "${newJobCompany}" berhasil dipublikasikan ke seluruh jaringan lulusan ANVIEO!`
    );
    setNewJobTitle("");
    setNewJobCompany("");
  };

  return (
    <div className="portal-content-fluid" style={{ paddingBottom: "90px" }}>
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
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <FlatIcon type="check-circle" size={16} color="#10B981" />
            <span>{toastMessage}</span>
          </span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            style={{ background: "none", border: "none", color: "#10B981", cursor: "pointer" }}
          >
            <FlatIcon type="close" size={14} color="#10B981" />
          </button>
        </div>
      )}

      {/* Header Halaman */}
      <div style={{ marginBottom: "22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "14px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  fontWeight: 800,
                  color: "var(--gold)",
                  background: "rgba(201, 150, 46, 0.12)",
                  border: "1px solid rgba(201, 150, 46, 0.35)",
                  padding: "2px 8px",
                  borderRadius: "4px",
                }}
              >
                CAREER &amp; HIRING PORTAL
              </span>
              <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>
                Ekosistem Penyaluran Kerja Terverifikasi
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "var(--bx-ink-bright)",
                margin: "0 0 6px",
              }}
            >
              Jobs &amp; Stakeholder Talent Matching
            </h1>

            <p style={{ fontSize: "0.84375rem", color: "var(--bx-muted)", margin: 0, maxWidth: "760px", lineHeight: 1.5 }}>
              Perusahaan stakeholder mempublikasikan lowongan kerja teknologi bergengsi, dan stakeholder juga dapat menemukan <strong>rekomendasi talenta berkualitas yang belum memiliki pekerjaan</strong> untuk direkrut langsung.
            </p>
          </div>

          {/* Action button for Stakeholders */}
          <button
            type="button"
            onClick={() => setIsPostJobModalOpen(true)}
            style={{
              background: "var(--gold)",
              color: "#0A0A0C",
              border: "none",
              padding: "10px 18px",
              borderRadius: "6px",
              fontSize: "0.8125rem",
              fontWeight: 800,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <FlatIcon type="plus" size={14} color="#0A0A0C" />
            <span>+ Pasang Lowongan Stakeholder</span>
          </button>
        </div>
      </div>

      {/* 2 MAIN TABS: LOWONGAN PEKERJAAN vs PORTAL STAKEHOLDER (REKOMENDASI TALENTA) */}
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
          onClick={() => setActiveTab("jobs-board")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 20px",
            fontSize: "0.875rem",
            fontWeight: 700,
            color: activeTab === "jobs-board" ? "var(--bx-ink-bright)" : "var(--bx-muted)",
            borderBottom: activeTab === "jobs-board" ? "2px solid var(--gold)" : "2px solid transparent",
            background: "none",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          <FlatIcon type="briefcase" size={17} color={activeTab === "jobs-board" ? "var(--gold)" : "var(--bx-muted)"} />
          <span>Lowongan Pekerjaan Perusahaan</span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              padding: "2px 6px",
              borderRadius: "4px",
              background: activeTab === "jobs-board" ? "rgba(201, 150, 46, 0.15)" : "var(--bx-surface)",
              color: activeTab === "jobs-board" ? "var(--gold)" : "var(--bx-muted)",
              fontWeight: 700,
            }}
          >
            {filteredJobs.length} Lowongan
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("talent-pool")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 20px",
            fontSize: "0.875rem",
            fontWeight: 700,
            color: activeTab === "talent-pool" ? "var(--bx-ink-bright)" : "var(--bx-muted)",
            borderBottom: activeTab === "talent-pool" ? "2px solid #10B981" : "2px solid transparent",
            background: "none",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          <FlatIcon type="users" size={17} color={activeTab === "talent-pool" ? "#10B981" : "var(--bx-muted)"} />
          <span>Rekomendasi Talenta Siap Kerja (Stakeholder Mode)</span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              padding: "2px 6px",
              borderRadius: "4px",
              background: activeTab === "talent-pool" ? "rgba(16, 185, 129, 0.15)" : "var(--bx-surface)",
              color: activeTab === "talent-pool" ? "#10B981" : "var(--bx-muted)",
              fontWeight: 700,
            }}
          >
            {filteredCandidates.length} Siap Kerja
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: LOWONGAN PEKERJAAN (UNTUK PENCARI KERJA / SISWA)                    */}
      {/* ========================================================================= */}
      {activeTab === "jobs-board" && (
        <div>
          {/* Filters Bar */}
          <div
            className="portal-dash-card"
            style={{
              padding: "16px 20px",
              marginBottom: "20px",
              background: "var(--bx-surface)",
              border: "1px solid var(--bx-border)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "12px",
              }}
            >
              {/* Category */}
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "4px" }}>
                  Bidang Teknologi:
                </label>
                <select
                  value={jobCategory}
                  onChange={(e) => setJobCategory(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "7px 10px",
                    borderRadius: "6px",
                    border: "1px solid var(--bx-border)",
                    background: "var(--bx-bg)",
                    color: "var(--bx-ink-bright)",
                    fontSize: "0.8125rem",
                    outline: "none",
                  }}
                >
                  <option value="Semua">Semua Bidang</option>
                  <option value="Fullstack & Web">Fullstack &amp; Web</option>
                  <option value="AI & Machine Learning">AI &amp; Machine Learning</option>
                  <option value="Cloud & DevOps">Cloud &amp; DevOps</option>
                  <option value="Data & Database">Data &amp; Database</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                </select>
              </div>

              {/* Work Type */}
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "4px" }}>
                  Tipe Kerja:
                </label>
                <select
                  value={jobWorkType}
                  onChange={(e) => setJobWorkType(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "7px 10px",
                    borderRadius: "6px",
                    border: "1px solid var(--bx-border)",
                    background: "var(--bx-bg)",
                    color: "var(--bx-ink-bright)",
                    fontSize: "0.8125rem",
                    outline: "none",
                  }}
                >
                  <option value="Semua">Semua Tipe Kerja</option>
                  <option value="Remote">Remote (Kerja dari Mana Saja)</option>
                  <option value="Hybrid">Hybrid (Fleksibel)</option>
                  <option value="On-site">On-site (Kantor)</option>
                </select>
              </div>

              {/* Level */}
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "4px" }}>
                  Tingkat Pengalaman:
                </label>
                <select
                  value={jobLevel}
                  onChange={(e) => setJobLevel(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "7px 10px",
                    borderRadius: "6px",
                    border: "1px solid var(--bx-border)",
                    background: "var(--bx-bg)",
                    color: "var(--bx-ink-bright)",
                    fontSize: "0.8125rem",
                    outline: "none",
                  }}
                >
                  <option value="Semua">Semua Tingkat</option>
                  <option value="Fresh Graduate (LMS)">Fresh Graduate (Lulusan Baru LMS)</option>
                  <option value="Junior (1-2 Thn)">Junior (1-2 Tahun)</option>
                  <option value="Mid/Senior (3+ Thn)">Mid / Senior (3+ Tahun)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Jobs List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="portal-dash-card"
                style={{
                  padding: 0,
                  overflow: "hidden",
                  border: "1px solid var(--bx-border)",
                  borderRadius: "10px",
                  background: "var(--bx-surface)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Job Cover Image Banner */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "125px",
                    overflow: "hidden",
                    background: "#0F172A",
                  }}
                >
                  <img
                    src={job.image}
                    alt={job.title}
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
                      inset: 0,
                      background: "linear-gradient(to top, rgba(10, 10, 12, 0.95) 0%, rgba(10, 10, 12, 0.4) 50%, rgba(10, 10, 12, 0.2) 100%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "14px",
                      right: "14px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.6875rem",
                        fontWeight: 800,
                        fontFamily: "var(--font-mono)",
                        color: "var(--gold)",
                        background: "rgba(10, 10, 12, 0.85)",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        border: "1px solid rgba(201, 150, 46, 0.4)",
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      {job.category}
                    </span>
                    {job.isPartnerVerified && (
                      <span
                        style={{
                          fontSize: "0.625rem",
                          fontWeight: 800,
                          fontFamily: "var(--font-mono)",
                          color: "#10B981",
                          background: "rgba(16, 185, 129, 0.25)",
                          border: "1px solid rgba(16, 185, 129, 0.4)",
                          padding: "3px 8px",
                          borderRadius: "4px",
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        MITRA RESMI TERVERIFIKASI
                      </span>
                    )}
                  </div>
                </div>

                {/* Job Card Body */}
                <div style={{ padding: "20px 24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "14px", marginBottom: "12px" }}>
                    <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                      {/* Company Initial Badge */}
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "8px",
                          background: "var(--bx-bg)",
                          border: "1px solid var(--bx-border)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 800,
                          fontFamily: "var(--font-mono)",
                          color: "var(--gold)",
                          fontSize: "0.9375rem",
                          flexShrink: 0,
                        }}
                      >
                        {job.companyLogoText}
                      </div>

                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
                          <span style={{ fontSize: "0.84375rem", fontWeight: 700, color: "var(--gold)" }}>
                            {job.company}
                          </span>
                        </div>

                        <h2
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "1.2rem",
                            fontWeight: 800,
                            color: "var(--bx-ink-bright)",
                            margin: "0 0 6px",
                          }}
                        >
                          {job.title}
                        </h2>

                        <div style={{ display: "flex", gap: "12px", alignItems: "center", fontSize: "0.75rem", color: "var(--bx-muted)", flexWrap: "wrap" }}>
                          <span>📍 {job.location}</span>
                          <span>·</span>
                          <span style={{ color: "#3B82F6", fontWeight: 700 }}>{job.workType}</span>
                          <span>·</span>
                          <span>{job.experienceLevel}</span>
                          <span>·</span>
                          <span style={{ color: "#10B981", fontWeight: 800 }}>Gaji: {job.salaryRange}</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
                      <span style={{ fontSize: "0.6875rem", color: "var(--bx-muted)" }}>
                        Batas Lamaran: <strong>{job.deadline}</strong>
                      </span>

                      <button
                        type="button"
                        onClick={() => handleOpenApplyModal(job)}
                        style={{
                          background: "#10B981",
                          color: "#FFFFFF",
                          border: "none",
                          padding: "9px 20px",
                          borderRadius: "6px",
                          fontSize: "0.8125rem",
                          fontWeight: 800,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <span>Lamar Pekerjaan Sekarang</span>
                        <FlatIcon type="chevron-right" size={12} color="#FFFFFF" />
                      </button>
                    </div>
                  </div>

                  <p style={{ fontSize: "0.8125rem", color: "var(--bx-muted)", lineHeight: 1.5, margin: "0 0 12px" }}>
                    {job.description}
                  </p>

                  {/* Requirements Bullet */}
                  <div style={{ background: "var(--bx-bg)", padding: "10px 14px", borderRadius: "6px", marginBottom: "12px", border: "1px solid var(--bx-border)" }}>
                    <div style={{ fontSize: "0.71875rem", fontWeight: 700, color: "var(--bx-ink-bright)", textTransform: "uppercase", marginBottom: "4px" }}>
                      Kualifikasi Utama:
                    </div>
                    <ul style={{ paddingLeft: "16px", margin: 0, fontSize: "0.78125rem", color: "var(--bx-muted)", lineHeight: 1.5 }}>
                      {job.requirements.map((req, rIdx) => (
                        <li key={rIdx}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills Tags */}
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {job.skills.map((skill, sIdx) => (
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
                        #{skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: PORTAL STAKEHOLDER (REKOMENDASI TALENTA SIAP KERJA)                */}
      {/* ========================================================================= */}
      {activeTab === "talent-pool" && (
        <div>
          {/* Banner Stakeholder */}
          <div
            style={{
              padding: "18px 22px",
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(10, 46, 82, 0.05) 100%), var(--bx-surface-card)",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              borderRadius: "8px",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "14px",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    fontWeight: 800,
                    color: "#10B981",
                    background: "rgba(16, 185, 129, 0.15)",
                    border: "1px solid #10B981",
                    padding: "2px 8px",
                    borderRadius: "4px",
                  }}
                >
                  STAKEHOLDER TALENT MATCHING ENGINE
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>
                  Standar Kompetensi Terverifikasi
                </span>
              </div>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--bx-ink-bright)", margin: "0 0 4px" }}>
                Rekomendasi Orang-Orang Berkualitas yang Belum Memiliki Pekerjaan
              </h2>
              <p style={{ fontSize: "0.8125rem", color: "var(--bx-muted)", margin: 0, maxWidth: "780px", lineHeight: 1.5 }}>
                Daftar talenta di bawah ini merupakan lulusan terbaik ANVIEO Academy dengan predikat nilai tinggi yang saat ini <strong>berstatus siap direkrut segera</strong>. Stakeholder dapat langsung mengundang wawancara atau meninjau repositori proyek capstone mereka.
              </p>
            </div>

            {/* Filter by track */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)", fontWeight: 600 }}>Filter Jalur:</span>
              <select
                value={talentTrack}
                onChange={(e) => setTalentTrack(e.target.value)}
                style={{
                  padding: "7px 12px",
                  borderRadius: "6px",
                  border: "1px solid var(--bx-border)",
                  background: "var(--bx-surface)",
                  color: "var(--bx-ink-bright)",
                  fontSize: "0.8125rem",
                  outline: "none",
                }}
              >
                <option value="Semua">Semua Spesialisasi</option>
                <option value="Fullstack">Fullstack Web &amp; AI</option>
                <option value="AI">Machine Learning &amp; AI</option>
                <option value="DevOps">Cloud &amp; DevOps</option>
                <option value="Cyber">Cyber Defense</option>
              </select>
            </div>
          </div>

          {/* Candidates List */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "18px" }}>
            {filteredCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="portal-dash-card"
                style={{
                  padding: "22px",
                  border: "1px solid var(--bx-border)",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  background: "var(--bx-surface)",
                }}
              >
                <div>
                  {/* Top Candidate Identity */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          background: "rgba(16, 185, 129, 0.12)",
                          border: "2px solid #10B981",
                          color: "#10B981",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 800,
                          fontFamily: "var(--font-heading)",
                          fontSize: "1rem",
                          flexShrink: 0,
                          overflow: "hidden",
                        }}
                      >
                        {candidate.avatar ? (
                          <img
                            src={candidate.avatar}
                            alt={candidate.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                          />
                        ) : (
                          candidate.avatarText
                        )}
                      </div>

                      <div>
                        <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--bx-ink-bright)", margin: "0 0 2px" }}>
                          {candidate.name}
                        </h3>
                        <div style={{ fontSize: "0.75rem", color: "var(--gold)", fontWeight: 700 }}>
                          {candidate.learningTrack}
                        </div>
                        <div style={{ fontSize: "0.6875rem", color: "var(--bx-muted)" }}>
                          {candidate.location} · Lulus {candidate.graduationDate}
                        </div>
                      </div>
                    </div>

                    {/* Status Badge: Belum Bekerja / Open to Work */}
                    <span
                      style={{
                        fontSize: "0.625rem",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 800,
                        color: "#10B981",
                        background: "rgba(16, 185, 129, 0.15)",
                        border: "1px solid #10B981",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        textAlign: "right",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B981" }} />
                      <span>OPEN TO WORK</span>
                    </span>
                  </div>

                  {/* Score & Expected Salary */}
                  <div
                    style={{
                      background: "var(--bx-bg)",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      marginBottom: "12px",
                      border: "1px solid var(--bx-border)",
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.75rem",
                    }}
                  >
                    <span>
                      Nilai Kelulusan: <strong style={{ color: "#10B981" }}>{candidate.graduationScore}</strong>
                    </span>
                    <span>
                      Ekspektasi: <strong style={{ color: "var(--gold)" }}>{candidate.expectedSalary}</strong>
                    </span>
                  </div>

                  {/* Reviewer Endorsement */}
                  <div
                    style={{
                      fontStyle: "italic",
                      fontSize: "0.78125rem",
                      color: "var(--bx-muted)",
                      lineHeight: 1.5,
                      marginBottom: "12px",
                      paddingLeft: "10px",
                      borderLeft: "2px solid var(--gold)",
                    }}
                  >
                    {candidate.reviewerEndorsement}
                  </div>

                  {/* Capstone Project Info */}
                  <div style={{ fontSize: "0.75rem", color: "var(--bx-muted)", marginBottom: "12px" }}>
                    Proyek Capstone: <strong style={{ color: "var(--bx-ink-bright)" }}>{candidate.capstoneProject}</strong>
                  </div>

                  {/* Skills tags */}
                  <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginBottom: "16px" }}>
                    {candidate.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        style={{
                          fontSize: "0.625rem",
                          padding: "2px 6px",
                          borderRadius: "3px",
                          background: "var(--bx-bg)",
                          border: "1px solid var(--bx-border)",
                          color: "var(--bx-ink)",
                        }}
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stakeholder Action Buttons */}
                <div style={{ borderTop: "1px solid var(--bx-border)", paddingTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                  <span style={{ fontSize: "0.6875rem", fontFamily: "var(--font-mono)", color: "var(--bx-muted)" }}>
                    ID: {candidate.certificateId.slice(0, 16)}...
                  </span>

                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      type="button"
                      onClick={() => alert(`Membuka portofolio interaktif capstone ${candidate.name}...`)}
                      style={{
                        background: "var(--bx-bg)",
                        border: "1px solid var(--bx-border)",
                        color: "var(--bx-ink-bright)",
                        padding: "6px 10px",
                        borderRadius: "5px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Portofolio
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenInviteModal(candidate)}
                      style={{
                        background: "#10B981",
                        color: "#FFFFFF",
                        border: "none",
                        padding: "6px 14px",
                        borderRadius: "5px",
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <span>Undang Wawancara</span>
                      <FlatIcon type="chevron-right" size={11} color="#FFFFFF" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: LAMAR PEKERJAAN (UNTUK PENCARI KERJA)                             */}
      {/* ========================================================================= */}
      {isApplyModalOpen && selectedJob && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(6px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setIsApplyModalOpen(false)}
        >
          <div
            style={{
              background: "var(--bx-surface)",
              border: "1px solid var(--bx-border)",
              borderRadius: "10px",
              maxWidth: "520px",
              width: "100%",
              padding: "24px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--bx-ink-bright)", margin: 0 }}>
                Kirim Lamaran Pekerjaan
              </h3>
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(false)}
                style={{ background: "none", border: "none", color: "var(--bx-muted)", cursor: "pointer" }}
              >
                <FlatIcon type="close" size={16} />
              </button>
            </div>

            <div style={{ background: "var(--bx-bg)", padding: "10px 14px", borderRadius: "6px", marginBottom: "16px", border: "1px solid var(--bx-border)" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>Posisi &amp; Perusahaan:</div>
              <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--bx-ink-bright)" }}>
                {selectedJob.title}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--gold)" }}>
                {selectedJob.company} · {selectedJob.location}
              </div>
            </div>

            <form onSubmit={handleConfirmApply}>
              <div style={{ marginBottom: "12px" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "4px" }}>
                  Profil &amp; Sertifikat Terlampir Otomatis:
                </div>
                <div style={{ background: "var(--bx-bg)", padding: "8px 12px", borderRadius: "6px", border: "1px solid var(--bx-border)", fontSize: "0.75rem", color: "var(--bx-muted)" }}>
                  ✓ Profil Siswa: Rendy Ariawindana (ANV-2026-0842)<br />
                  ✓ Sertifikat Resmi ANVIEO: Fullstack Web &amp; AI Architecture<br />
                  ✓ Transkrip Nilai &amp; Hasil Capstone Reviewer Bintang 5
                </div>
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "4px" }}>
                  Catatan Pengantar / Cover Letter Singkat:
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Jelaskan secara singkat mengapa Anda cocok untuk posisi ini..."
                  value={applyNotes}
                  onChange={(e) => setApplyNotes(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid var(--bx-border)",
                    background: "var(--bx-bg)",
                    color: "var(--bx-ink-bright)",
                    fontSize: "0.8125rem",
                    outline: "none",
                    boxSizing: "border-box",
                    resize: "vertical",
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  style={{
                    background: "var(--bx-bg)",
                    border: "1px solid var(--bx-border)",
                    color: "var(--bx-muted)",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    fontSize: "0.8125rem",
                    cursor: "pointer",
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  style={{
                    background: "#10B981",
                    color: "#FFFFFF",
                    border: "none",
                    padding: "8px 20px",
                    borderRadius: "6px",
                    fontSize: "0.8125rem",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  Kirim Lamaran Sekarang →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: UNDANG WAWANCARA (UNTUK STAKEHOLDER MEREKRUT KANDIDAT)           */}
      {/* ========================================================================= */}
      {isInviteModalOpen && selectedCandidate && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(6px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setIsInviteModalOpen(false)}
        >
          <div
            style={{
              background: "var(--bx-surface)",
              border: "1px solid var(--bx-border)",
              borderRadius: "10px",
              maxWidth: "520px",
              width: "100%",
              padding: "24px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FlatIcon type="mail" size={18} color="#10B981" />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--bx-ink-bright)", margin: 0 }}>
                  Undang Wawancara Kandidat
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsInviteModalOpen(false)}
                style={{ background: "none", border: "none", color: "var(--bx-muted)", cursor: "pointer" }}
              >
                <FlatIcon type="close" size={16} />
              </button>
            </div>

            <div style={{ background: "var(--bx-bg)", padding: "10px 14px", borderRadius: "6px", marginBottom: "16px", border: "1px solid var(--bx-border)" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>Kandidat yang Dituju:</div>
              <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--bx-ink-bright)" }}>
                {selectedCandidate.name} ({selectedCandidate.learningTrack})
              </div>
              <div style={{ fontSize: "0.75rem", color: "#10B981" }}>
                Status: {selectedCandidate.employmentStatus} · Nilai: {selectedCandidate.graduationScore}
              </div>
            </div>

            <form onSubmit={handleConfirmInvite}>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "4px" }}>
                  Posisi Pekerjaan yang Ditawarkan:
                </label>
                <input
                  type="text"
                  required
                  value={invitePosition}
                  onChange={(e) => setInvitePosition(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid var(--bx-border)",
                    background: "var(--bx-bg)",
                    color: "var(--bx-ink-bright)",
                    fontSize: "0.8125rem",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "4px" }}>
                  Rencana Tanggal Wawancara:
                </label>
                <input
                  type="date"
                  required
                  value={inviteDate}
                  onChange={(e) => setInviteDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid var(--bx-border)",
                    background: "var(--bx-bg)",
                    color: "var(--bx-ink-bright)",
                    fontSize: "0.8125rem",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "4px" }}>
                  Pesan Khusus &amp; Link Meeting:
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tuliskan detail undangan wawancara atau link Google Meet..."
                  value={inviteNotes}
                  onChange={(e) => setInviteNotes(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid var(--bx-border)",
                    background: "var(--bx-bg)",
                    color: "var(--bx-ink-bright)",
                    fontSize: "0.8125rem",
                    outline: "none",
                    boxSizing: "border-box",
                    resize: "vertical",
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  style={{
                    background: "var(--bx-bg)",
                    border: "1px solid var(--bx-border)",
                    color: "var(--bx-muted)",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    fontSize: "0.8125rem",
                    cursor: "pointer",
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  style={{
                    background: "#10B981",
                    color: "#FFFFFF",
                    border: "none",
                    padding: "8px 20px",
                    borderRadius: "6px",
                    fontSize: "0.8125rem",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  Kirim Undangan Wawancara →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: PASANG LOWONGAN BARU (STAKEHOLDER POST JOB)                       */}
      {/* ========================================================================= */}
      {isPostJobModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(6px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setIsPostJobModalOpen(false)}
        >
          <div
            style={{
              background: "var(--bx-surface)",
              border: "1px solid var(--bx-border)",
              borderRadius: "10px",
              maxWidth: "520px",
              width: "100%",
              padding: "24px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FlatIcon type="plus" size={18} color="var(--gold)" />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--bx-ink-bright)", margin: 0 }}>
                  Pasang Lowongan Pekerjaan Baru
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPostJobModalOpen(false)}
                style={{ background: "none", border: "none", color: "var(--bx-muted)", cursor: "pointer" }}
              >
                <FlatIcon type="close" size={16} />
              </button>
            </div>

            <form onSubmit={handleConfirmPostJob}>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "4px" }}>
                  Judul Posisi Lowongan:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Senior Frontend Next.js Developer"
                  value={newJobTitle}
                  onChange={(e) => setNewJobTitle(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid var(--bx-border)",
                    background: "var(--bx-bg)",
                    color: "var(--bx-ink-bright)",
                    fontSize: "0.8125rem",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "4px" }}>
                  Nama Perusahaan Stakeholder:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: PT Pixel Perdana Jaya"
                  value={newJobCompany}
                  onChange={(e) => setNewJobCompany(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid var(--bx-border)",
                    background: "var(--bx-bg)",
                    color: "var(--bx-ink-bright)",
                    fontSize: "0.8125rem",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "4px" }}>
                  Rentang Gaji Ditawarkan:
                </label>
                <input
                  type="text"
                  required
                  value={newJobSalary}
                  onChange={(e) => setNewJobSalary(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid var(--bx-border)",
                    background: "var(--bx-bg)",
                    color: "var(--bx-ink-bright)",
                    fontSize: "0.8125rem",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setIsPostJobModalOpen(false)}
                  style={{
                    background: "var(--bx-bg)",
                    border: "1px solid var(--bx-border)",
                    color: "var(--bx-muted)",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    fontSize: "0.8125rem",
                    cursor: "pointer",
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  style={{
                    background: "var(--gold)",
                    color: "#0A0A0C",
                    border: "none",
                    padding: "8px 20px",
                    borderRadius: "6px",
                    fontSize: "0.8125rem",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  Publikasikan Lowongan →
                </button>
              </div>
            </form>
          </div>
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
              {activeTab === "jobs-board"
                ? `Menampilkan ${filteredJobs.length} Lowongan Kerja Aktif`
                : `Menampilkan ${filteredCandidates.length} Talenta Kualifikasi Siap Rekrut`}
            </span>
            <span style={{ fontSize: "0.75rem", color: "#10B981" }}>
              ● Terhubung Langsung ke Hiring Partner &amp; Portofolio Terverifikasi
            </span>
          </div>

          {/* Quick Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === "jobs-board" ? "talent-pool" : "jobs-board")}
              style={{
                background: "var(--bx-bg)",
                border: "1px solid var(--bx-border)",
                color: "var(--bx-ink)",
                padding: "7px 14px",
                borderRadius: "6px",
                fontSize: "0.75rem",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {activeTab === "jobs-board" ? "Buka Talent Pool Stakeholder →" : "← Buka Lowongan Kerja"}
            </button>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{
                background: "var(--gold)",
                border: "none",
                color: "#0A0A0C",
                padding: "7px 16px",
                borderRadius: "6px",
                fontSize: "0.75rem",
                fontWeight: 800,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>Kembali Ke Atas ↑</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
