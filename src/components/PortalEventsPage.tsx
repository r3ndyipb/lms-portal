"use client";

import React, { useState } from "react";
import FlatIcon from "./FlatIcon";

export interface TechEvent {
  id: string;
  title: string;
  type: "Webinar" | "Hands-on Workshop" | "Live Coding" | "Tech Conference";
  dateFormatted: string;
  timeWIB: string;
  speaker: string;
  speakerRole: string;
  speakerCompany: string;
  quota: string;
  image: string;
  isLiveToday?: boolean;
  isRegistered?: boolean;
  description: string;
  tags: string[];
}

const EVENTS_DATA: TechEvent[] = [
  {
    id: "ev-1",
    title: "Deep Dive Next.js 16 Server Actions & High-Concurrency Backend Architecture",
    type: "Live Coding",
    dateFormatted: "Jumat, 31 Okt 2026",
    timeWIB: "19:30 - 21:00 WIB",
    speaker: "Rian Pratama",
    speakerRole: "Staff Software Engineer",
    speakerCompany: "Unicorn Tech Lead",
    quota: "500 Peserta (Tersisa 42 Kursi)",
    image: "/events/event-1.jpg",
    isLiveToday: true,
    description: "Sesi live coding implementasi Server Actions, optimistic UI updates, streaming response, dan penanganan distributed transaction dengan Redis & PostgreSQL.",
    tags: ["Next.js", "Server Actions", "PostgreSQL", "Live Coding"],
  },
  {
    id: "ev-2",
    title: "Membangun Agen AI Otonom dengan Tool Calling & Evaluasi LLM di Produksi",
    type: "Hands-on Workshop",
    dateFormatted: "Sabtu, 08 Nov 2026",
    timeWIB: "10:00 - 12:30 WIB",
    speaker: "Dr. Rian Pratama, M.Sc",
    speakerRole: "Principal AI Researcher",
    speakerCompany: "ANVIEO AI Labs",
    quota: "800 Peserta (Tersisa 195 Kursi)",
    image: "/events/event-2.jpg",
    description: "Hands-on coding membangun agen otonom yang dapat mengendalikan browser, mengeksekusi script terminal secara aman, dan menghasilkan laporan terstruktur.",
    tags: ["Agentic AI", "Python", "Tool Calling", "RAG"],
  },
  {
    id: "ev-3",
    title: "Zero-Downtime Migration: Memindahkan 10 Juta Baris Data Tanpa Gangguan Layanan",
    type: "Webinar",
    dateFormatted: "Rabu, 12 Nov 2026",
    timeWIB: "19:00 - 20:30 WIB",
    speaker: "Gunawan Santoso",
    speakerRole: "Principal DBA",
    speakerCompany: "Leading Digital Bank",
    quota: "1.000 Peserta (Tersisa 340 Kursi)",
    image: "/events/event-3.jpg",
    description: "Studi kasus arsitektur database perbankan dalam menjalankan schema migration online, index build concurrently, dan audit log pemulihan data.",
    tags: ["PostgreSQL", "Database", "FinTech", "Migration"],
  },
  {
    id: "ev-4",
    title: "DevSecOps Workshop: Mengamankan Kubernetes Cluster dari Serangan Supply Chain",
    type: "Hands-on Workshop",
    dateFormatted: "Sabtu, 21 Nov 2026",
    timeWIB: "13:30 - 16:00 WIB",
    speaker: "Fajar Nugraha, CISSP",
    speakerRole: "Security Director",
    speakerCompany: "Global Cyber Defense",
    quota: "400 Peserta (Tersisa 88 Kursi)",
    image: "/events/event-4.jpg",
    description: "Praktik simulasi audit keamanan container image, penegakan NetworkPolicy Kubernetes, dan konfigurasi secret vault di infrastruktur cloud publik.",
    tags: ["Kubernetes", "DevSecOps", "Security", "Docker"],
  },
];

export default function PortalEventsPage() {
  const [events, setEvents] = useState<TechEvent[]>(EVENTS_DATA);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleRegisterEvent = (eventId: string, title: string) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === eventId ? { ...ev, isRegistered: true } : ev))
    );
    setToastMsg(`Pendaftaran Anda untuk event "${title}" berhasil! Link live webinar telah dikirimkan.`);
    setTimeout(() => setToastMsg(null), 5000);
  };

  return (
    <div className="portal-content-fluid" style={{ paddingBottom: "90px" }}>
      {/* Toast */}
      {toastMsg && (
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
            <span>{toastMsg}</span>
          </span>
          <button
            type="button"
            onClick={() => setToastMsg(null)}
            style={{ background: "none", border: "none", color: "#10B981", cursor: "pointer" }}
          >
            <FlatIcon type="close" size={14} color="#10B981" />
          </button>
        </div>
      )}

      {/* Header Halaman */}
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
          Event &amp; Workshop Teknologi
        </h1>
        <p style={{ fontSize: "0.84375rem", color: "var(--bx-muted)", margin: 0 }}>
          Ikuti webinar gratis, hands-on workshop, dan sesi live coding interaktif bersama para praktisi top industri.
        </p>
      </div>

      {/* LIST OF EVENTS */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {events.map((ev) => {
          return (
            <div
              key={ev.id}
              className="portal-dash-card"
              style={{
                padding: 0,
                overflow: "hidden",
                border: ev.isLiveToday ? "1px solid rgba(239, 68, 68, 0.45)" : "1px solid var(--bx-border)",
                background: "var(--bx-surface)",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Event Cover Image Banner */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "165px",
                  overflow: "hidden",
                  background: "#0F172A",
                }}
              >
                <img
                  src={ev.image}
                  alt={ev.title}
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
                    background: "linear-gradient(to top, rgba(10, 10, 12, 0.95) 0%, rgba(10, 10, 12, 0.4) 50%, rgba(10, 10, 12, 0.25) 100%)",
                  }}
                />

                {/* Floating Top Badges */}
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "14px",
                    right: "14px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {ev.isLiveToday && (
                      <span
                        style={{
                          fontSize: "0.6875rem",
                          fontFamily: "var(--font-mono)",
                          fontWeight: 800,
                          color: "#EF4444",
                          background: "rgba(239, 68, 68, 0.25)",
                          border: "1px solid #EF4444",
                          padding: "3px 8px",
                          borderRadius: "4px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#EF4444" }} />
                        <span>LIVE HARI INI</span>
                      </span>
                    )}

                    <span
                      style={{
                        fontSize: "0.6875rem",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 700,
                        color: "var(--gold)",
                        background: "rgba(10, 10, 12, 0.8)",
                        border: "1px solid rgba(201, 150, 46, 0.4)",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      {ev.type}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "rgba(255, 255, 255, 0.9)",
                      background: "rgba(10, 10, 12, 0.8)",
                      padding: "3px 8px",
                      borderRadius: "4px",
                      border: "1px solid var(--bx-border)",
                      backdropFilter: "blur(6px)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <FlatIcon type="calendar" size={13} color="var(--gold)" />
                    <span>{ev.dateFormatted} ({ev.timeWIB})</span>
                  </span>
                </div>

                {/* Floating Bottom Metadata in Banner */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "14px",
                    right: "14px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "0.75rem",
                    color: "rgba(255, 255, 255, 0.85)",
                  }}
                >
                  <span>Kuota: <strong style={{ color: "#10B981" }}>{ev.quota}</strong></span>
                  <span>Akses: <strong style={{ color: "var(--gold)" }}>Gratis Terbuka</strong></span>
                </div>
              </div>

              {/* Event Card Body */}
              <div style={{ padding: "20px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "14px", marginBottom: "12px" }}>
                  <div style={{ flex: "1 1 500px" }}>
                    <h2
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.2rem",
                        fontWeight: 800,
                        color: "var(--bx-ink-bright)",
                        margin: "0 0 6px",
                      }}
                    >
                      {ev.title}
                    </h2>

                    <p style={{ fontSize: "0.8125rem", color: "var(--bx-muted)", margin: 0, lineHeight: 1.5 }}>
                      {ev.description}
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
                    {ev.isRegistered ? (
                      <div
                        style={{
                          background: "rgba(16, 185, 129, 0.15)",
                          border: "1px solid #10B981",
                          color: "#10B981",
                          padding: "8px 16px",
                          borderRadius: "6px",
                          fontSize: "0.78125rem",
                          fontWeight: 700,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <FlatIcon type="check-circle" size={14} color="#10B981" />
                        <span>Anda Sudah Terdaftar</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleRegisterEvent(ev.id, ev.title)}
                        style={{
                          background: ev.isLiveToday ? "#EF4444" : "var(--gold)",
                          color: ev.isLiveToday ? "#FFFFFF" : "#0A0A0C",
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
                        <span>{ev.isLiveToday ? "Gabung Sesi Live" : "Daftar Event (Gratis)"}</span>
                        <FlatIcon type="chevron-right" size={12} color={ev.isLiveToday ? "#FFFFFF" : "#0A0A0C"} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Speaker & Tags */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", paddingTop: "12px", borderTop: "1px solid var(--bx-border)" }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>
                    Pembicara: <strong style={{ color: "var(--bx-ink-bright)" }}>{ev.speaker}</strong> ({ev.speakerRole} @ {ev.speakerCompany})
                  </div>

                  <div style={{ display: "flex", gap: "6px" }}>
                    {ev.tags.map((tag, idx) => (
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
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
              Menampilkan {events.length} Event &amp; Workshop Mendatang
            </span>
            <span style={{ fontSize: "0.75rem", color: "#10B981" }}>
              ● 100% Akses Live &amp; Sertifikat Kehadiran Digital
            </span>
          </div>

          {/* Quick Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
