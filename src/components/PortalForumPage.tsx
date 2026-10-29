"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import FlatIcon from "./FlatIcon";

export interface ForumReply {
  id: string;
  author: string;
  authorRole: "Siswa" | "Mentor" | "Reviewer";
  avatar: string;
  content: string;
  timeAgo: string;
  isAcceptedSolution?: boolean;
}

export interface CourseForumTopic {
  id: string;
  title: string;
  author: string;
  authorRole: "Siswa" | "Mentor" | "Reviewer";
  avatar: string;
  category: string;
  snippet: string;
  repliesCount: number;
  viewsCount: number;
  upvotes: number;
  hasUserUpvoted?: boolean;
  isSolved: boolean;
  timeAgo: string;
  replies: ForumReply[];
}

interface PortalForumPageProps {
  initialCourseTitle?: string;
  initialTopic?: string;
}

const INITIAL_TOPICS: CourseForumTopic[] = [
  {
    id: "top-1",
    title: "Error SyntaxError pada saat eksekusi Python Interpreter di Windows",
    author: "Budi Raharjo",
    authorRole: "Siswa",
    avatar: "/alumni/alumni_2.jpg",
    category: "Compiler & Interpreter",
    snippet:
      "Saat mencoba menjalankan script hello.py di PowerShell muncul SyntaxError: invalid character in identifier. Apakah ini karena encoding file?",
    repliesCount: 4,
    viewsCount: 142,
    upvotes: 12,
    hasUserUpvoted: false,
    isSolved: true,
    timeAgo: "2 jam yang lalu",
    replies: [
      {
        id: "rep-1",
        author: "Dr. Rian Pratama, M.Sc",
        authorRole: "Reviewer",
        avatar: "/mentors/mentor_1.jpg",
        content:
          "Halo Budi! Kemungkinan besar ada karakter spasi tak terlihat (non-breaking space) akibat copy-paste dari editor web. Buka file Anda di VS Code lalu simpan ulang menggunakan encoding UTF-8 standar tanpa BOM.",
        timeAgo: "1 jam yang lalu",
        isAcceptedSolution: true,
      },
      {
        id: "rep-2",
        author: "Budi Raharjo",
        authorRole: "Siswa",
        avatar: "/alumni/alumni_2.jpg",
        content:
          "Terima kasih banyak Pak Rian! Masalah langsung teratasi setelah ubah encoding ke UTF-8.",
        timeAgo: "45 menit yang lalu",
      },
    ],
  },
  {
    id: "top-2",
    title: "Perbedaan mendasar bytecode (.pyc) dengan Machine Code murni di C++",
    author: "Sarah Nabila",
    authorRole: "Siswa",
    avatar: "/alumni/alumni_3.jpg",
    category: "Compiler & Interpreter",
    snippet:
      "Apakah Python Bytecode di folder __pycache__ sama dengan file biner .exe atau machine code?",
    repliesCount: 3,
    viewsCount: 98,
    upvotes: 18,
    hasUserUpvoted: true,
    isSolved: true,
    timeAgo: "5 jam yang lalu",
    replies: [
      {
        id: "rep-3",
        author: "Hendra Wijaya",
        authorRole: "Mentor",
        avatar: "/mentors/mentor_2.jpg",
        content:
          "Berbeda Sarah. Machine code dieksekusi langsung oleh prosesor (CPU), sedangkan Python Bytecode adalah representasi intermediate yang hanya bisa dieksekusi oleh Python Virtual Machine (PVM).",
        timeAgo: "4 jam yang lalu",
        isAcceptedSolution: true,
      },
    ],
  },
  {
    id: "top-3",
    title: "Kapan sebaiknya menggunakan One-liner vs blok kode sekuensial biasa?",
    author: "Dimas Aditya",
    authorRole: "Siswa",
    avatar: "/alumni/alumni_4.jpg",
    category: "Aksi Sekuensial",
    snippet:
      "Di materi dibahas One-liner. Apakah di industri disarankan membuat kode one-liner atau justru dihindari karena readability?",
    repliesCount: 5,
    viewsCount: 210,
    upvotes: 25,
    hasUserUpvoted: false,
    isSolved: false,
    timeAgo: "Kemarin",
    replies: [
      {
        id: "rep-4",
        author: "Dewi Lestari, M.Kom",
        authorRole: "Reviewer",
        avatar: "/mentors/mentor_3.jpg",
        content:
          "Sesuai filosofi Zen of Python: 'Readability counts'. One-liner bagus untuk list comprehension sederhana, tetapi jika logika kompleks tetap disarankan penulisan bertahap agar mudah dimengerti tim lain saat code review.",
        timeAgo: "18 jam yang lalu",
      },
    ],
  },
  {
    id: "top-4",
    title: "Rekomendasi Library untuk Web Scraping selain BeautifulSoup",
    author: "Fajar Nugraha",
    authorRole: "Siswa",
    avatar: "/alumni/alumni_5.jpg",
    category: "Library & Modul",
    snippet:
      "Untuk website dinamis yang banyak memuat JavaScript, library apa yang paling cocok dipelajari setelah modul library dasar?",
    repliesCount: 2,
    viewsCount: 76,
    upvotes: 9,
    hasUserUpvoted: false,
    isSolved: false,
    timeAgo: "2 hari yang lalu",
    replies: [
      {
        id: "rep-5",
        author: "Siti Rahmawati",
        authorRole: "Siswa",
        avatar: "/alumni/alumni_1.jpg",
        content:
          "Bisa coba Playwright Python atau Selenium mas Fajar. Playwright sangat cepat dan modern untuk render SPA.",
        timeAgo: "1 hari yang lalu",
      },
    ],
  },
];

export default function PortalForumPage({
  initialCourseTitle = "Memulai Pemrograman dengan Python",
  initialTopic = "",
}: PortalForumPageProps) {
  // Warna Utama LMS (AUI Warm Parchment & Deep Navy)
  const colors = {
    bg: "#FBF8F1",
    surface: "#FFFFFF",
    surfaceAlt: "#F4EFE6",
    brandNavy: "#0A2E52",
    brandNavyHover: "#12467A",
    gold: "#C9962E",
    goldSoft: "#F0DFB4",
    text: "#152232",
    textMuted: "#5C6B7D",
    border: "rgba(10, 46, 82, 0.12)",
    borderSoft: "rgba(10, 46, 82, 0.08)",
  };

  const [courseTitle] = useState(initialCourseTitle);
  const [topics, setTopics] = useState<CourseForumTopic[]>(INITIAL_TOPICS);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Topik");

  // Effect to handle topic matching or dedicated thread creation when initialTopic is provided
  useEffect(() => {
    if (initialTopic) {
      const match = topics.find(
        (t) =>
          t.title.toLowerCase().includes(initialTopic.toLowerCase()) ||
          initialTopic.toLowerCase().includes(t.title.toLowerCase())
      );
      if (match) {
        setSelectedTopicId(match.id);
      } else {
        const dedicatedTopic: CourseForumTopic = {
          id: `topic-active-${Date.now()}`,
          title: `Diskusi Materi: ${initialTopic}`,
          author: "Rendy Ariawindana",
          authorRole: "Siswa",
          avatar: "/alumni/alumni_1.jpg",
          category:
            initialTopic.toLowerCase().includes("compiler") || initialTopic.toLowerCase().includes("interpreter")
              ? "Compiler & Interpreter"
              : initialTopic.toLowerCase().includes("python")
              ? "Aksi Sekuensial"
              : "Materi Aktif",
          snippet: `Thread diskusi resmi seputar materi "${initialTopic}". Tanyakan kendala pemahaman sintaks, error eksekusi kode, atau diskusikan implementasi latihan dengan rekan siswa dan mentor.`,
          repliesCount: 2,
          viewsCount: 42,
          upvotes: 8,
          hasUserUpvoted: false,
          isSolved: false,
          timeAgo: "Baru saja",
          replies: [
            {
              id: "rep-active-1",
              author: "Dr. Rian Pratama, M.Sc",
              authorRole: "Reviewer",
              avatar: "/mentors/mentor_1.jpg",
              content: `Halo rekan pembelajar! Selamat datang di forum diskusi materi "${initialTopic}". Jika ada logika pemrograman atau kode yang masih membingungkan, silakan tanyakan di sini!`,
              timeAgo: "Baru saja",
              isAcceptedSolution: false,
            },
            {
              id: "rep-active-2",
              author: "Garda AI Copilot",
              authorRole: "Mentor",
              avatar: "/mentors/mentor_2.jpg",
              content: `Rekomendasi untuk materi "${initialTopic}": jalankan setiap blok kode contoh secara mandiri dan amati alur eksekusinya untuk mematangkan pemahaman konsep.`,
              timeAgo: "Baru saja",
              isAcceptedSolution: false,
            },
          ],
        };
        setTopics((prev) => [dedicatedTopic, ...prev]);
        setSelectedTopicId(dedicatedTopic.id);
      }
    }
  }, [initialTopic]);

  // New topic modal
  const [showNewTopicModal, setShowNewTopicModal] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicCategory, setNewTopicCategory] = useState("Compiler & Interpreter");
  const [newTopicContent, setNewTopicContent] = useState("");

  // New reply
  const [replyInput, setReplyInput] = useState("");

  const selectedTopic = topics.find((t) => t.id === selectedTopicId);

  const categories = [
    "Semua Topik",
    "Compiler & Interpreter",
    "Aksi Sekuensial",
    "Library & Modul",
    "Terpecahkan ✓",
    "Belum Terjawab",
  ];

  const filteredTopics = topics.filter((t) => {
    const matchSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.snippet.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedCategory === "Semua Topik") return matchSearch;
    if (selectedCategory === "Terpecahkan ✓") return matchSearch && t.isSolved;
    if (selectedCategory === "Belum Terjawab") return matchSearch && t.repliesCount === 0;
    return matchSearch && t.category === selectedCategory;
  });

  const handleToggleUpvote = (topicId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTopics((prev) =>
      prev.map((t) => {
        if (t.id === topicId) {
          const upvoted = t.hasUserUpvoted;
          return {
            ...t,
            upvotes: upvoted ? t.upvotes - 1 : t.upvotes + 1,
            hasUserUpvoted: !upvoted,
          };
        }
        return t;
      })
    );
  };

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicTitle.trim() || !newTopicContent.trim()) return;

    const newTopic: CourseForumTopic = {
      id: `top-${Date.now()}`,
      title: newTopicTitle,
      author: "Rendy Ariawindana",
      authorRole: "Siswa",
      avatar: "/alumni/alumni_1.jpg",
      category: newTopicCategory,
      snippet: newTopicContent.slice(0, 140) + "...",
      repliesCount: 0,
      viewsCount: 1,
      upvotes: 1,
      hasUserUpvoted: true,
      isSolved: false,
      timeAgo: "Baru saja",
      replies: [],
    };

    setTopics([newTopic, ...topics]);
    setNewTopicTitle("");
    setNewTopicContent("");
    setShowNewTopicModal(false);
    setSelectedTopicId(newTopic.id);
  };

  const handleAddReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyInput.trim() || !selectedTopicId) return;

    const newReply: ForumReply = {
      id: `rep-${Date.now()}`,
      author: "Rendy Ariawindana",
      authorRole: "Siswa",
      avatar: "/alumni/alumni_1.jpg",
      content: replyInput,
      timeAgo: "Baru saja",
    };

    setTopics((prev) =>
      prev.map((t) => {
        if (t.id === selectedTopicId) {
          return {
            ...t,
            repliesCount: t.repliesCount + 1,
            replies: [...t.replies, newReply],
          };
        }
        return t;
      })
    );
    setReplyInput("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.bg,
        color: colors.text,
        fontFamily: "var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Navigation Bar with LMS Primary Colors */}
      <header
        style={{
          height: "64px",
          background: colors.brandNavy,
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
          position: "sticky",
          top: 0,
          zIndex: 40,
          boxShadow: "0 2px 10px rgba(10, 46, 82, 0.15)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: colors.gold,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              color: colors.brandNavy,
              fontSize: "18px",
            }}
          >
            A
          </div>
          <div>
            <div style={{ fontSize: "1rem", fontWeight: 800, letterSpacing: "-0.01em" }}>
              ANVIEO Academy · Forum Komunitas Siswa
            </div>
            <div style={{ fontSize: "0.75rem", color: colors.goldSoft }}>
              Diskusi Materi Resmi: {courseTitle}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            type="button"
            onClick={() => setShowNewTopicModal(true)}
            style={{
              background: colors.gold,
              color: colors.brandNavy,
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              fontSize: "0.8125rem",
              fontWeight: 800,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              boxShadow: "0 2px 6px rgba(201, 150, 46, 0.3)",
            }}
          >
            <span>+</span>
            <span>Buat Topik Baru</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (window.opener) {
                window.close();
              } else {
                window.location.href = "/koridor-kelas";
              }
            }}
            style={{
              background: "rgba(255, 255, 255, 0.12)",
              color: "#FFFFFF",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              padding: "8px 14px",
              borderRadius: "6px",
              fontSize: "0.8125rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
            title="Tutup tab forum atau kembali"
          >
            ✕ Tutup Tab
          </button>
        </div>
      </header>

      {/* Hero Banner with Course Context */}
      <div
        style={{
          background: colors.surface,
          borderBottom: `1px solid ${colors.border}`,
          padding: "24px 28px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <span
              style={{
                background: colors.surfaceAlt,
                color: colors.brandNavy,
                fontSize: "0.75rem",
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: "12px",
                border: `1px solid ${colors.border}`,
              }}
            >
              Kelas Aktif
            </span>
            <span style={{ fontSize: "0.8125rem", color: colors.textMuted }}>
              Forum Diskusi Publik Siswa & Mentor
            </span>
          </div>

          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              color: colors.brandNavy,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            {courseTitle}
          </h1>
          <p style={{ margin: "6px 0 0", fontSize: "0.875rem", color: colors.textMuted }}>
            Ruang diskusi terbuka untuk tanya-jawab kode, kendala instalasi environment, debugging error, dan pemahaman materi bersama mentor serta ribuan rekan siswa lainnya.
          </p>

          {initialTopic && (
            <div
              style={{
                marginTop: "14px",
                background: "rgba(201, 150, 46, 0.12)",
                border: "1px solid rgba(201, 150, 46, 0.35)",
                borderRadius: "8px",
                padding: "10px 16px",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <span style={{ fontSize: "1rem" }}>📖</span>
              <span style={{ fontSize: "0.84375rem", color: colors.brandNavy, fontWeight: 700 }}>
                Fokus Diskusi Materi: <span style={{ color: colors.gold }}>{initialTopic}</span>
              </span>
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 800,
                  color: "#10B981",
                  background: "rgba(16, 185, 129, 0.15)",
                  padding: "2px 8px",
                  borderRadius: "4px",
                }}
              >
                Materi Aktif Sedang Dipelajari
              </span>
            </div>
          )}

          {/* Search bar & filter pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginTop: "20px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                flex: "1 1 320px",
                position: "relative",
              }}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari topik diskusi, judul pertanyaan, atau kode error..."
                style={{
                  width: "100%",
                  padding: "10px 14px 10px 38px",
                  borderRadius: "8px",
                  border: `1px solid ${colors.border}`,
                  background: colors.surfaceAlt,
                  color: colors.text,
                  fontSize: "0.875rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "14px",
                  opacity: 0.5,
                }}
              >
                🔍
              </span>
            </div>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "7px 14px",
                    borderRadius: "20px",
                    fontSize: "0.78125rem",
                    fontWeight: selectedCategory === cat ? 700 : 500,
                    background: selectedCategory === cat ? colors.brandNavy : colors.surfaceAlt,
                    color: selectedCategory === cat ? "#FFFFFF" : colors.text,
                    border: `1px solid ${
                      selectedCategory === cat ? colors.brandNavy : colors.border
                    }`,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Forum Stage */}
      <div
        style={{
          flex: 1,
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
          padding: "24px 28px",
          display: "grid",
          gridTemplateColumns: selectedTopic ? "1fr 1.3fr" : "1fr",
          gap: "24px",
          boxSizing: "border-box",
        }}
      >
        {/* Left: Topics List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "4px",
            }}
          >
            <span style={{ fontSize: "0.875rem", fontWeight: 700, color: colors.brandNavy }}>
              {filteredTopics.length} Topik Diskusi Ditemukan
            </span>
            <span style={{ fontSize: "0.75rem", color: colors.textMuted }}>
              Urut Berdasarkan: Terbaru
            </span>
          </div>

          {filteredTopics.length === 0 ? (
            <div
              style={{
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: "10px",
                padding: "48px 24px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "36px", marginBottom: "8px" }}>💬</div>
              <div style={{ fontSize: "1rem", fontWeight: 700, color: colors.brandNavy }}>
                Belum ada topik diskusi yang sesuai
              </div>
              <p style={{ fontSize: "0.8125rem", color: colors.textMuted, margin: "6px 0 16px" }}>
                Jadilah siswa pertama yang menanyakan topik ini di komunitas!
              </p>
              <button
                type="button"
                onClick={() => setShowNewTopicModal(true)}
                style={{
                  background: colors.brandNavy,
                  color: "#FFFFFF",
                  border: "none",
                  padding: "8px 18px",
                  borderRadius: "6px",
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                + Ajukan Pertanyaan Sekarang
              </button>
            </div>
          ) : (
            filteredTopics.map((topic) => {
              const isSelected = selectedTopicId === topic.id;
              return (
                <div
                  key={topic.id}
                  onClick={() => setSelectedTopicId(topic.id)}
                  style={{
                    background: colors.surface,
                    border: `1px solid ${isSelected ? colors.brandNavy : colors.border}`,
                    borderRadius: "10px",
                    padding: "16px 18px",
                    cursor: "pointer",
                    boxShadow: isSelected
                      ? `0 4px 14px rgba(10, 46, 82, 0.1)`
                      : "0 1px 3px rgba(0,0,0,0.02)",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "10px",
                      marginBottom: "8px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span
                        style={{
                          background: colors.surfaceAlt,
                          color: colors.brandNavy,
                          fontSize: "0.6875rem",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "4px",
                          border: `1px solid ${colors.border}`,
                        }}
                      >
                        {topic.category}
                      </span>
                      {topic.isSolved && (
                        <span
                          style={{
                            background: "rgba(16, 185, 129, 0.12)",
                            color: "#059669",
                            fontSize: "0.6875rem",
                            fontWeight: 700,
                            padding: "2px 8px",
                            borderRadius: "4px",
                          }}
                        >
                          ✓ Terpecahkan
                        </span>
                      )}
                    </div>

                    <span style={{ fontSize: "0.6875rem", color: colors.textMuted }}>
                      {topic.timeAgo}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: 700,
                      color: isSelected ? colors.brandNavy : colors.text,
                      margin: "0 0 6px",
                      lineHeight: 1.4,
                    }}
                  >
                    {topic.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: colors.textMuted,
                      margin: "0 0 12px",
                      lineHeight: 1.5,
                    }}
                  >
                    {topic.snippet}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderTop: `1px solid ${colors.borderSoft}`,
                      paddingTop: "10px",
                      fontSize: "0.75rem",
                      color: colors.textMuted,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <img
                        src={topic.avatar}
                        alt={topic.author}
                        style={{
                          width: "22px",
                          height: "22px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                      <span style={{ fontWeight: 600, color: colors.text }}>{topic.author}</span>
                      <span
                        style={{
                          fontSize: "0.6875rem",
                          background:
                            topic.authorRole === "Reviewer"
                              ? "rgba(16, 185, 129, 0.15)"
                              : topic.authorRole === "Mentor"
                              ? "rgba(201, 150, 46, 0.15)"
                              : colors.surfaceAlt,
                          color:
                            topic.authorRole === "Reviewer"
                              ? "#059669"
                              : topic.authorRole === "Mentor"
                              ? colors.gold
                              : colors.textMuted,
                          padding: "1px 6px",
                          borderRadius: "4px",
                          fontWeight: 700,
                        }}
                      >
                        {topic.authorRole}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <button
                        type="button"
                        onClick={(e) => handleToggleUpvote(topic.id, e)}
                        style={{
                          background: topic.hasUserUpvoted
                            ? "rgba(10, 46, 82, 0.1)"
                            : "transparent",
                          border: `1px solid ${
                            topic.hasUserUpvoted ? colors.brandNavy : colors.border
                          }`,
                          color: topic.hasUserUpvoted ? colors.brandNavy : colors.textMuted,
                          padding: "2px 8px",
                          borderRadius: "12px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                        }}
                      >
                        <span>▲</span>
                        <span>{topic.upvotes}</span>
                      </button>

                      <span>💬 {topic.repliesCount} balasan</span>
                      <span>👁 {topic.viewsCount}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right: Selected Thread View */}
        {selectedTopic && (
          <div
            style={{
              background: colors.surface,
              border: `1px solid ${colors.border}`,
              borderRadius: "10px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            }}
          >
            {/* Thread Header */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "12px",
                  marginBottom: "8px",
                }}
              >
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <span
                    style={{
                      background: colors.surfaceAlt,
                      color: colors.brandNavy,
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      padding: "3px 10px",
                      borderRadius: "6px",
                    }}
                  >
                    {selectedTopic.category}
                  </span>
                  {selectedTopic.isSolved && (
                    <span
                      style={{
                        background: "rgba(16, 185, 129, 0.12)",
                        color: "#059669",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: "6px",
                      }}
                    >
                      ✓ Solusi Diterima
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedTopicId(null)}
                  style={{
                    background: "none",
                    border: "none",
                    color: colors.textMuted,
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                  title="Tutup detail thread"
                >
                  ✕
                </button>
              </div>

              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: colors.brandNavy,
                  margin: "8px 0 12px",
                  lineHeight: 1.35,
                }}
              >
                {selectedTopic.title}
              </h2>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "0.8125rem",
                  color: colors.textMuted,
                }}
              >
                <img
                  src={selectedTopic.avatar}
                  alt={selectedTopic.author}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <span style={{ fontWeight: 700, color: colors.text }}>
                  {selectedTopic.author}
                </span>
                <span>•</span>
                <span>{selectedTopic.timeAgo}</span>
              </div>
            </div>

            {/* Thread Original Post Content */}
            <div
              style={{
                background: colors.surfaceAlt,
                border: `1px solid ${colors.border}`,
                borderRadius: "8px",
                padding: "16px",
                fontSize: "0.875rem",
                lineHeight: 1.6,
                color: colors.text,
              }}
            >
              {selectedTopic.snippet}
            </div>

            {/* Replies List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 800,
                  color: colors.brandNavy,
                  borderBottom: `1px solid ${colors.borderSoft}`,
                  paddingBottom: "8px",
                }}
              >
                {selectedTopic.replies.length} Balasan dari Komunitas
              </div>

              {selectedTopic.replies.map((reply) => (
                <div
                  key={reply.id}
                  style={{
                    background: reply.isAcceptedSolution
                      ? "rgba(16, 185, 129, 0.05)"
                      : colors.surface,
                    border: `1px solid ${
                      reply.isAcceptedSolution ? "rgba(16, 185, 129, 0.3)" : colors.border
                    }`,
                    borderRadius: "8px",
                    padding: "14px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <img
                        src={reply.avatar}
                        alt={reply.author}
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                      <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: colors.text }}>
                        {reply.author}
                      </span>
                      <span
                        style={{
                          fontSize: "0.6875rem",
                          background:
                            reply.authorRole === "Reviewer"
                              ? "rgba(16, 185, 129, 0.15)"
                              : reply.authorRole === "Mentor"
                              ? "rgba(201, 150, 46, 0.15)"
                              : colors.surfaceAlt,
                          color:
                            reply.authorRole === "Reviewer"
                              ? "#059669"
                              : reply.authorRole === "Mentor"
                              ? colors.gold
                              : colors.textMuted,
                          padding: "1px 6px",
                          borderRadius: "4px",
                          fontWeight: 700,
                        }}
                      >
                        {reply.authorRole}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {reply.isAcceptedSolution && (
                        <span
                          style={{
                            fontSize: "0.6875rem",
                            color: "#059669",
                            fontWeight: 700,
                          }}
                        >
                          ✓ Solusi Terbaik
                        </span>
                      )}
                      <span style={{ fontSize: "0.6875rem", color: colors.textMuted }}>
                        {reply.timeAgo}
                      </span>
                    </div>
                  </div>

                  <p
                    style={{
                      fontSize: "0.8125rem",
                      lineHeight: 1.6,
                      color: colors.text,
                      margin: 0,
                    }}
                  >
                    {reply.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Reply Input Form */}
            <form onSubmit={handleAddReply} style={{ marginTop: "8px" }}>
              <div style={{ fontSize: "0.8125rem", fontWeight: 700, marginBottom: "6px" }}>
                Tulis Balasan Anda:
              </div>
              <textarea
                rows={3}
                value={replyInput}
                onChange={(e) => setReplyInput(e.target.value)}
                placeholder="Bagikan solusi atau tambahkan pertanyaan tindak lanjut..."
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: `1px solid ${colors.border}`,
                  background: colors.surfaceAlt,
                  color: colors.text,
                  fontSize: "0.8125rem",
                  outline: "none",
                  boxSizing: "border-box",
                  resize: "vertical",
                  fontFamily: "inherit",
                }}
              />
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
                <button
                  type="submit"
                  style={{
                    background: colors.brandNavy,
                    color: "#FFFFFF",
                    border: "none",
                    padding: "8px 18px",
                    borderRadius: "6px",
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Kirim Balasan
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Modal Buat Topik Baru */}
      {showNewTopicModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10, 46, 82, 0.4)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "16px",
          }}
        >
          <div
            style={{
              background: colors.surface,
              borderRadius: "12px",
              width: "100%",
              maxWidth: "560px",
              padding: "24px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              border: `1px solid ${colors.border}`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "1.125rem", fontWeight: 800, color: colors.brandNavy }}>
                + Buat Topik Diskusi Baru
              </h3>
              <button
                type="button"
                onClick={() => setShowNewTopicModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: colors.textMuted,
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTopic} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "4px" }}>
                  Judul Pertanyaan / Masalah:
                </label>
                <input
                  type="text"
                  required
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                  placeholder="Contoh: Mengapa muncul TypeError saat memanggil fungsi math.sqrt()?"
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: "6px",
                    border: `1px solid ${colors.border}`,
                    background: colors.surfaceAlt,
                    color: colors.text,
                    fontSize: "0.8125rem",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "4px" }}>
                  Kategori Materi:
                </label>
                <select
                  value={newTopicCategory}
                  onChange={(e) => setNewTopicCategory(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: "6px",
                    border: `1px solid ${colors.border}`,
                    background: colors.surfaceAlt,
                    color: colors.text,
                    fontSize: "0.8125rem",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="Compiler & Interpreter">Compiler & Interpreter</option>
                  <option value="Aksi Sekuensial">Aksi Sekuensial</option>
                  <option value="Library & Modul">Library & Modul</option>
                  <option value="Lainnya">Lainnya / Umum</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, marginBottom: "4px" }}>
                  Deskripsi Lengkap & Kode Error:
                </label>
                <textarea
                  rows={5}
                  required
                  value={newTopicContent}
                  onChange={(e) => setNewTopicContent(e.target.value)}
                  placeholder="Jelaskan apa yang sudah Anda coba, sertakan baris kode dan pesan error yang muncul di terminal..."
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    border: `1px solid ${colors.border}`,
                    background: colors.surfaceAlt,
                    color: colors.text,
                    fontSize: "0.8125rem",
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
                <button
                  type="button"
                  onClick={() => setShowNewTopicModal(false)}
                  style={{
                    background: colors.surfaceAlt,
                    border: `1px solid ${colors.border}`,
                    padding: "8px 16px",
                    borderRadius: "6px",
                    fontSize: "0.8125rem",
                    cursor: "pointer",
                    color: colors.text,
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  style={{
                    background: colors.brandNavy,
                    border: "none",
                    color: "#FFFFFF",
                    padding: "8px 18px",
                    borderRadius: "6px",
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Publikasikan Topik
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
