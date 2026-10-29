"use client";

import React, { useState } from "react";
import FlatIcon from "./FlatIcon";

export interface BlogPost {
  id: string;
  title: string;
  category: "Teknologi & AI" | "Web Architecture" | "DevOps & Cloud" | "Tips Karir Tech";
  publishDate: string;
  readTime: string;
  author: string;
  authorRole: string;
  summary: string;
  image: string;
  isFeatured?: boolean;
  tags: string[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    title: "Mengapa Next.js 15+ dan WebContainers Mengubah Cara Belajar Fullstack di Tahun 2026",
    category: "Web Architecture",
    publishDate: "26 Oktober 2026",
    readTime: "6 Menit Baca",
    author: "Rian Pratama",
    authorRole: "Principal Web Architect",
    image: "/blog/blog-1.jpg",
    summary: "Evolusi React Server Components dan kemampuan menjalankan eksekusi Node.js langsung di dalam peramban web tanpa server remote membuka era baru in-browser cloud IDE yang instan dan hemat biaya.",
    isFeatured: true,
    tags: ["Next.js", "WebContainers", "RSC", "Frontend"],
  },
  {
    id: "post-2",
    title: "Membangun AI Agent Otonom dengan Arsitektur ReAct dan Local LLM Inference",
    category: "Teknologi & AI",
    publishDate: "24 Oktober 2026",
    readTime: "8 Menit Baca",
    author: "Dr. Rian Pratama, M.Sc",
    authorRole: "Lead AI Scientist",
    image: "/blog/blog-2.jpg",
    summary: "Panduan praktis merancang agen cerdas yang dapat berpikir multi-step, memanfaatkan tools browser, dan mengeksekusi tugas komputasi secara mandiri dengan latensi rendah.",
    tags: ["Agentic AI", "LLM", "Python", "ReAct"],
  },
  {
    id: "post-3",
    title: "Panduan Zero-Downtime Deployment Menggunakan Kubernetes dan Blue-Green Rollout",
    category: "DevOps & Cloud",
    publishDate: "21 Oktober 2026",
    readTime: "7 Menit Baca",
    author: "Hendra Wijaya",
    authorRole: "Senior DevOps Engineer",
    image: "/blog/blog-3.jpg",
    summary: "Strategi merilis fitur baru pada jutaan pengguna tanpa terputusnya koneksi aktif database, didukung oleh health check probe dan otomasi Ingress routing.",
    tags: ["Kubernetes", "DevOps", "CI/CD", "SRE"],
  },
  {
    id: "post-4",
    title: "Rahasia Lolos Coding Interview Tingkat Mahir di Perusahaan Teknologi Global",
    category: "Tips Karir Tech",
    publishDate: "18 Oktober 2026",
    readTime: "5 Menit Baca",
    author: "Dewi Lestari",
    authorRole: "Senior Tech Recruiter",
    image: "/blog/blog-4.jpg",
    summary: "Bukan hanya sekadar menghafal algoritma LeetCode: bagaimana cara mendemonstrasikan komunikasi terstruktur, trade-off arsitektur, dan ketahanan terhadap edge case sistemik.",
    tags: ["Karir", "Interview", "Tips", "Software Engineering"],
  },
  {
    id: "post-5",
    title: "Optimasi Query PostgreSQL Skala Besar: Menghindari N+1 dan Kunci Partisi Tabel",
    category: "Web Architecture",
    publishDate: "14 Oktober 2026",
    readTime: "6 Menit Baca",
    author: "Gunawan Santoso",
    authorRole: "Staff Database Administrator",
    image: "/blog/blog-5.jpg",
    summary: "Studi kasus nyata mengoptimalkan latensi p99 database dari 450ms menjadi di bawah 18ms dengan indexing covering, connection pooling PgBouncer, dan vector index.",
    tags: ["PostgreSQL", "Database", "Performance"],
  },
  {
    id: "post-6",
    title: "Tren Keamanan Siber 2026: Ancaman AI-Generated Malware dan Mitigasi DevSecOps",
    category: "Teknologi & AI",
    publishDate: "10 Oktober 2026",
    readTime: "9 Menit Baca",
    author: "Fajar Nugraha, CISSP",
    authorRole: "Head of Cyber Defense",
    image: "/blog/blog-6.jpg",
    summary: "Bagaimana tim rekayasa keamanan menerapkan automated secret rotation, SBOM scanning, dan zero-trust architecture untuk menangkal eksploitasi zero-day.",
    tags: ["CyberSec", "DevSecOps", "Zero Trust"],
  },
];

export default function PortalBlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["Semua", "Teknologi & AI", "Web Architecture", "DevOps & Cloud", "Tips Karir Tech"];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    if (selectedCategory !== "Semua" && post.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const featuredPost = BLOG_POSTS.find((p) => p.isFeatured) || BLOG_POSTS[0];

  return (
    <div className="portal-content-fluid" style={{ paddingBottom: "90px" }}>
      {/* Header Halaman */}
      <div style={{ marginBottom: "24px" }}>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.5rem",
            fontWeight: 800,
            color: "var(--bx-ink-bright)",
            margin: "0 0 6px",
          }}
        >
          ANVIEO Tech Blog &amp; Berita Edukasi
        </h1>
        <p style={{ fontSize: "0.84375rem", color: "var(--bx-muted)", margin: 0 }}>
          Artikel editorial, wawasan rekayasa perangkat lunak, tutorial arsitektur sistem, dan kabar teknologi terkini.
        </p>
      </div>

      {/* FEATURED HEADLINE ARTICLE (BERITA UTAMA) */}
      {selectedCategory === "Semua" && !searchQuery && (
        <div
          className="portal-dash-card"
          style={{
            padding: 0,
            overflow: "hidden",
            marginBottom: "28px",
            background: "linear-gradient(135deg, rgba(201, 150, 46, 0.08) 0%, rgba(10, 46, 82, 0.05) 100%), var(--bx-surface-card)",
            border: "1px solid rgba(201, 150, 46, 0.4)",
            borderRadius: "10px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          {/* Featured Image Cover */}
          <div style={{ position: "relative", minHeight: "220px", background: "#0F172A" }}>
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(10, 10, 12, 0.8) 0%, transparent 60%)",
              }}
            />
            <span
              style={{
                position: "absolute",
                top: "14px",
                left: "14px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                fontWeight: 800,
                color: "var(--gold)",
                background: "rgba(10, 10, 12, 0.85)",
                border: "1px solid rgba(201, 150, 46, 0.5)",
                padding: "3px 10px",
                borderRadius: "4px",
                backdropFilter: "blur(6px)",
              }}
            >
              BERITA UTAMA
            </span>
          </div>

          {/* Featured Body */}
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--gold)", fontWeight: 700 }}>
                  {featuredPost.category}
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>
                  · {featuredPost.publishDate} · {featuredPost.readTime}
                </span>
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.35rem",
                  fontWeight: 800,
                  color: "var(--bx-ink-bright)",
                  margin: "0 0 10px",
                  lineHeight: 1.35,
                }}
              >
                {featuredPost.title}
              </h2>

              <p style={{ fontSize: "0.875rem", color: "var(--bx-muted)", margin: "0 0 16px", lineHeight: 1.6 }}>
                {featuredPost.summary}
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", borderTop: "1px solid var(--bx-border)", paddingTop: "14px" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>
                Penulis: <strong style={{ color: "var(--bx-ink-bright)" }}>{featuredPost.author}</strong> ({featuredPost.authorRole})
              </div>

              <button
                type="button"
                onClick={() => alert(`Membuka artikel: "${featuredPost.title}"`)}
                style={{
                  background: "var(--gold)",
                  color: "#0A0A0C",
                  border: "none",
                  padding: "8px 18px",
                  borderRadius: "6px",
                  fontSize: "0.8125rem",
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>Baca Selengkapnya</span>
                <FlatIcon type="chevron-right" size={12} color="#0A0A0C" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Pills & Search */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "0.78125rem",
                fontWeight: 700,
                cursor: "pointer",
                border: selectedCategory === cat ? "1px solid var(--gold)" : "1px solid var(--bx-border)",
                background: selectedCategory === cat ? "rgba(201, 150, 46, 0.15)" : "var(--bx-surface)",
                color: selectedCategory === cat ? "var(--gold)" : "var(--bx-muted)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ width: "260px" }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari artikel..."
            style={{
              width: "100%",
              padding: "7px 12px",
              borderRadius: "6px",
              border: "1px solid var(--bx-border)",
              background: "var(--bx-surface)",
              color: "var(--bx-ink-bright)",
              fontSize: "0.78125rem",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>

      {/* ARTICLE GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="portal-dash-card"
            style={{
              padding: 0,
              overflow: "hidden",
              border: "1px solid var(--bx-border)",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              background: "var(--bx-surface)",
            }}
          >
            {/* Card Cover Image Header */}
            <div style={{ position: "relative", width: "100%", height: "160px", background: "#0F172A", overflow: "hidden" }}>
              <img
                src={post.image}
                alt={post.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(10, 10, 12, 0.9) 0%, rgba(10, 10, 12, 0.2) 60%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "12px",
                  right: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-mono)",
                    color: "var(--gold)",
                    background: "rgba(10, 10, 12, 0.8)",
                    border: "1px solid rgba(201, 150, 46, 0.4)",
                    padding: "2px 8px",
                    borderRadius: "4px",
                  }}
                >
                  {post.category}
                </span>
                <span style={{ fontSize: "0.6875rem", color: "rgba(255, 255, 255, 0.85)" }}>
                  {post.publishDate}
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div style={{ padding: "18px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.05rem",
                    fontWeight: 800,
                    color: "var(--bx-ink-bright)",
                    margin: "0 0 8px",
                    lineHeight: 1.4,
                  }}
                >
                  {post.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--bx-muted)",
                    margin: "0 0 14px",
                    lineHeight: 1.5,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {post.summary}
                </p>

                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
                  {post.tags.map((t, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: "0.625rem",
                        padding: "2px 6px",
                        borderRadius: "3px",
                        background: "var(--bx-bg)",
                        border: "1px solid var(--bx-border)",
                        color: "var(--bx-ink)",
                      }}
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--bx-border)", paddingTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.71875rem", color: "var(--bx-muted)" }}>
                  {post.author} · {post.readTime}
                </span>

                <button
                  type="button"
                  onClick={() => alert(`Membaca artikel: "${post.title}"`)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--gold)",
                    fontSize: "0.78125rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span>Baca Artikel</span>
                  <FlatIcon type="chevron-right" size={11} color="var(--gold)" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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
              Menampilkan {filteredPosts.length} dari {BLOG_POSTS.length} Artikel
            </span>
            {selectedCategory !== "Semua" && (
              <span style={{ fontSize: "0.75rem", color: "var(--gold)" }}>
                (Kategori: {selectedCategory})
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("Semua");
                setSearchQuery("");
              }}
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
              Reset Filter
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
