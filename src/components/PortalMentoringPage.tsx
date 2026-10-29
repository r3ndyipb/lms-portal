"use client";

import React, { useState } from "react";
import FlatIcon from "./FlatIcon";

export interface MentorProfile {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  totalSessions: number;
  yearsExperience: number;
  bio: string;
  expertise: string[];
  availableDays: string;
}

const MENTORS_LIST: MentorProfile[] = [
  {
    id: "m-1",
    name: "Rian Firmansyah, S.Kom",
    role: "Staff Software Engineer / Tech Lead",
    company: "Google / Unicorn Tech",
    avatar: "/mentors/mentor-1.jpg",
    rating: 4.98,
    totalSessions: 240,
    yearsExperience: 9,
    bio: "Berpengalaman merancang sistem terdistribusi dengan high-concurrency, modern Next.js 15+ App Router, dan PostgreSQL partitioning di platform dengan 20M+ pengguna bulanan.",
    expertise: ["System Architecture", "Next.js & React", "PostgreSQL", "Career Strategy"],
    availableDays: "Selasa, Kamis, Sabtu (19:00 - 21:00 WIB)",
  },
  {
    id: "m-2",
    name: "Dr. Rian Pratama, M.Sc",
    role: "Principal AI Scientist",
    company: "AI Research Lab & Tech Startup",
    avatar: "/mentors/mentor-2.jpg",
    rating: 4.96,
    totalSessions: 185,
    yearsExperience: 8,
    bio: "Peneliti dan praktisi Machine Learning, PyTorch, Agentic AI, fine-tuning model LLM, serta implementasi sistem RAG pada korporasi finansial terkemuka.",
    expertise: ["Machine Learning", "PyTorch", "Agentic AI & LLM", "Data Pipeline"],
    availableDays: "Senin, Rabu, Jumat (20:00 - 22:00 WIB)",
  },
  {
    id: "m-3",
    name: "Hendra Wijaya",
    role: "Senior Cloud & DevOps Architect",
    company: "Enterprise Cloud Solutions",
    avatar: "/mentors/mentor-3.jpg",
    rating: 4.94,
    totalSessions: 160,
    yearsExperience: 10,
    bio: "Spesialis orkestrasi Kubernetes kluster skala ribuan pod, automatisasi pipeline GitOps zero-downtime, dan pengelolaan multi-cloud AWS & GCP.",
    expertise: ["Kubernetes", "AWS Cloud", "Docker & CI/CD", "Infrastructure as Code"],
    availableDays: "Rabu, Sabtu (14:00 - 17:00 WIB)",
  },
  {
    id: "m-4",
    name: "Fajar Nugraha, CISSP",
    role: "Head of Cyber Defense & Security Audit",
    company: "Banking & FinTech Security",
    avatar: "/mentors/mentor-4.jpg",
    rating: 4.97,
    totalSessions: 120,
    yearsExperience: 11,
    bio: "Praktisi penetrasi testing dan mitigasi OWASP Top 10. Membantu developer dan engineer membangun secure coding standards dan audit kepatuhan regulasi data.",
    expertise: ["Ethical Hacking", "OWASP Security", "DevSecOps", "Audit Kepatuhan"],
    availableDays: "Kamis, Minggu (19:30 - 21:30 WIB)",
  },
];

export default function PortalMentoringPage() {
  const [mentors] = useState<MentorProfile[]>(MENTORS_LIST);
  const [selectedMentor, setSelectedMentor] = useState<MentorProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form inside modal
  const [sessionDate, setSessionDate] = useState("2026-11-05");
  const [sessionTime, setSessionTime] = useState("19:30 WIB");
  const [topicNotes, setTopicNotes] = useState("");
  const [bookingToast, setBookingToast] = useState<string | null>(null);

  const handleOpenBookingModal = (mentor: MentorProfile) => {
    setSelectedMentor(mentor);
    setIsModalOpen(true);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentor) return;

    setIsModalOpen(false);
    setBookingToast(
      `Permintaan sesi mentoring bersama ${selectedMentor.name} pada ${sessionDate} pukul ${sessionTime} telah dijadwalkan! Instruksi pertemuan Google Meet telah dikirimkan.`
    );
    setTopicNotes("");
    setTimeout(() => setBookingToast(null), 6000);
  };

  return (
    <div className="portal-content-fluid" style={{ paddingBottom: "90px" }}>
      {/* Toast Notification */}
      {bookingToast && (
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
            <span>{bookingToast}</span>
          </span>
          <button
            type="button"
            onClick={() => setBookingToast(null)}
            style={{ background: "none", border: "none", color: "#10B981", cursor: "pointer" }}
          >
            <FlatIcon type="close" size={14} color="#10B981" />
          </button>
        </div>
      )}

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
          Sesi Mentoring 1-on-1 dengan Pakar Industri
        </h1>
        <p style={{ fontSize: "0.84375rem", color: "var(--bx-muted)", margin: 0, maxWidth: "760px", lineHeight: 1.5 }}>
          Konsultasi langsung secara privat 1-on-1 bersama para pakar dan praktisi teknologi terbaik untuk review arsitektur sistem, problem solving kode, hingga konsultasi arah karir.
        </p>
      </div>

      {/* LIST OF MENTORS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "20px" }}>
        {mentors.map((mentor) => (
          <div
            key={mentor.id}
            className="portal-dash-card"
            style={{
              padding: 0,
              overflow: "hidden",
              border: "1px solid var(--bx-border)",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              background: "var(--bx-surface)",
            }}
          >
            {/* Top Mentor Banner Header */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100px",
                overflow: "hidden",
                background: "linear-gradient(135deg, rgba(201, 150, 46, 0.25) 0%, rgba(10, 46, 82, 0.4) 100%)",
              }}
            >
              <img
                src={mentor.avatar}
                alt={mentor.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "blur(6px) brightness(0.6)",
                  transform: "scale(1.15)",
                }}
              />
              <div style={{ position: "absolute", inset: 0, background: "rgba(10, 10, 12, 0.55)" }} />
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  background: "rgba(10, 10, 12, 0.85)",
                  padding: "3px 8px",
                  borderRadius: "4px",
                  border: "1px solid rgba(201, 150, 46, 0.4)",
                  fontSize: "0.71875rem",
                  color: "var(--gold)",
                  fontWeight: 800,
                  backdropFilter: "blur(6px)",
                }}
              >
                <FlatIcon type="star" size={12} color="var(--gold)" />
                <span>{mentor.rating.toFixed(2)} ({mentor.totalSessions} Sesi)</span>
              </div>
            </div>

            {/* Mentor Card Body with Overlapping Avatar */}
            <div style={{ padding: "0 22px 22px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                {/* Top Mentor Profile Header */}
                <div style={{ display: "flex", gap: "14px", alignItems: "flex-end", marginTop: "-32px", marginBottom: "14px", position: "relative", zIndex: 2 }}>
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "3px solid var(--gold)",
                      background: "var(--bx-surface)",
                      flexShrink: 0,
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.35)",
                    }}
                  >
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>

                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.1rem",
                        fontWeight: 800,
                        color: "var(--bx-ink-bright)",
                        margin: "0 0 3px",
                      }}
                    >
                      {mentor.name}
                    </h3>
                    <div style={{ fontSize: "0.78125rem", color: "var(--gold)", fontWeight: 700 }}>
                      {mentor.role}
                    </div>
                    <div style={{ fontSize: "0.71875rem", color: "var(--bx-muted)" }}>
                      {mentor.company} · {mentor.yearsExperience} Thn Pengalaman
                    </div>
                  </div>
                </div>

              {/* Stats: Rating & Sesi */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  fontSize: "0.75rem",
                  padding: "8px 12px",
                  background: "var(--bx-bg)",
                  borderRadius: "6px",
                  marginBottom: "14px",
                  border: "1px solid var(--bx-border)",
                }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "var(--gold)", fontWeight: 700 }}>
                  <FlatIcon type="star" size={13} color="var(--gold)" />
                  <span>{mentor.rating.toFixed(2)} Rating</span>
                </span>
                <span>·</span>
                <span style={{ color: "var(--bx-ink-bright)", fontWeight: 600 }}>
                  {mentor.totalSessions} Sesi Selesai
                </span>
              </div>

              {/* Bio */}
              <p style={{ fontSize: "0.8125rem", color: "var(--bx-muted)", lineHeight: 1.55, margin: "0 0 14px" }}>
                {mentor.bio}
              </p>

              {/* Expertise Tags */}
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
                {mentor.expertise.map((exp, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: "0.6875rem",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      background: "var(--bx-bg)",
                      border: "1px solid var(--bx-border)",
                      color: "var(--bx-ink)",
                    }}
                  >
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div style={{ borderTop: "1px solid var(--bx-border)", paddingTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
              <div style={{ fontSize: "0.71875rem", color: "var(--bx-muted)" }}>
                <div>Jadwal Tersedia:</div>
                <div style={{ fontWeight: 600, color: "var(--bx-ink-bright)" }}>{mentor.availableDays}</div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenBookingModal(mentor)}
                style={{
                  background: "var(--gold)",
                  color: "#0A0A0C",
                  border: "none",
                  padding: "9px 18px",
                  borderRadius: "6px",
                  fontSize: "0.8125rem",
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <FlatIcon type="calendar" size={14} color="#0A0A0C" />
                <span>Book Mentoring</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

      {/* ========================================================================= */}
      {/* MODAL BOOK MENTORING (DENGAN KONTEN SPESIFIK SESUAI INSTRUKSI USER)        */}
      {/* ========================================================================= */}
      {isModalOpen && selectedMentor && (
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
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              background: "var(--bx-surface)",
              border: "1px solid var(--bx-border)",
              borderRadius: "10px",
              maxWidth: "560px",
              width: "100%",
              padding: "24px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
              <div>
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
                    display: "inline-block",
                    marginBottom: "6px",
                  }}
                >
                  1-ON-1 PRIVATE SESSION
                </span>

                {/* EXACT TEXT REQUESTED BY USER */}
                <h2
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    color: "var(--bx-ink-bright)",
                    margin: "0 0 6px",
                  }}
                >
                  Premium Mentoring Session
                </h2>

                <p style={{ fontSize: "0.84375rem", color: "var(--bx-muted)", margin: 0, lineHeight: 1.5 }}>
                  Dicoding telah melakukan kurasi terhadap orang orang terbaik di industrinya untuk berbagi pengetahuan dengan Anda.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{ background: "none", border: "none", color: "var(--bx-muted)", cursor: "pointer", padding: "4px" }}
              >
                <FlatIcon type="close" size={16} />
              </button>
            </div>

            {/* Mentor Info Box */}
            <div style={{ background: "var(--bx-bg)", padding: "12px 14px", borderRadius: "8px", border: "1px solid var(--bx-border)", marginBottom: "16px" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>Mentor yang Dipilih:</div>
              <div style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--bx-ink-bright)" }}>
                {selectedMentor.name}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--gold)" }}>
                {selectedMentor.role} ({selectedMentor.company})
              </div>
            </div>

            {/* EXACT PRICING & PROMO TEXT */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(201, 150, 46, 0.1) 0%, rgba(10, 46, 82, 0.08) 100%)",
                border: "1px solid rgba(201, 150, 46, 0.35)",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "1.6rem",
                  fontWeight: 900,
                  color: "var(--gold)",
                  margin: "0 0 2px",
                }}
              >
                Rp200.000
              </div>
              <div style={{ fontSize: "0.8125rem", color: "var(--bx-ink-bright)", fontWeight: 600, marginBottom: "8px" }}>
                Per 30 menit sesi mentoring.
              </div>

              {/* Exact promo link */}
              <div style={{ fontSize: "0.78125rem", color: "var(--bx-muted)", lineHeight: 1.5 }}>
                Dapatkan potongan harga menarik dengan mengunjungi tautan berikut{" "}
                <a
                  href="https://wa.me/628176464646?text=Halo%20kak,%20saya%20tertarik%20dengan%20penawaran%20Dicoding%20mentoring,%20apakah%20saat%20ini%20ada%20promo%20khusus?"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#10B981", fontWeight: 700, textDecoration: "underline" }}
                >
                  mentoring101
                </a>
              </div>
            </div>

            {/* EXACT 4 BENEFITS BULLET POINTS */}
            <div style={{ marginBottom: "18px" }}>
              <div style={{ fontSize: "0.78125rem", fontWeight: 700, color: "var(--bx-ink-bright)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
                Manfaat Sesi Mentoring:
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {[
                  "Knowledge sharing premium",
                  "Networking dengan practitioner",
                  "Problem solving",
                  "Career advice",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "0.8125rem",
                      color: "var(--bx-ink-bright)",
                      fontWeight: 600,
                      background: "var(--bx-bg)",
                      padding: "8px 10px",
                      borderRadius: "6px",
                      border: "1px solid var(--bx-border)",
                    }}
                  >
                    <FlatIcon type="check" size={12} color="#10B981" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleConfirmBooking}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "4px" }}>
                    Pilih Tanggal:
                  </label>
                  <input
                    type="date"
                    required
                    value={sessionDate}
                    onChange={(e) => setSessionDate(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 10px",
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
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "4px" }}>
                    Pilih Jam:
                  </label>
                  <select
                    value={sessionTime}
                    onChange={(e) => setSessionTime(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      borderRadius: "6px",
                      border: "1px solid var(--bx-border)",
                      background: "var(--bx-bg)",
                      color: "var(--bx-ink-bright)",
                      fontSize: "0.8125rem",
                      outline: "none",
                      boxSizing: "border-box",
                      cursor: "pointer",
                    }}
                  >
                    <option value="19:00 WIB">19:00 - 19:30 WIB</option>
                    <option value="19:30 WIB">19:30 - 20:00 WIB</option>
                    <option value="20:00 WIB">20:00 - 20:30 WIB</option>
                    <option value="20:30 WIB">20:30 - 21:00 WIB</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "4px" }}>
                  Catatan Topik / Masalah yang Ingin Dikonsultasikan:
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Contoh: Diskusi review arsitektur microservices Next.js dan tips negosiasi tawaran kerja..."
                  value={topicNotes}
                  onChange={(e) => setTopicNotes(e.target.value)}
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

              {/* Action Buttons */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <a
                  href="https://wa.me/628176464646?text=Halo%20kak,%20saya%20tertarik%20dengan%20penawaran%20Dicoding%20mentoring,%20apakah%20saat%20ini%20ada%20promo%20khusus?"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "0.78125rem", color: "#10B981", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "4px" }}
                >
                  <FlatIcon type="chat" size={14} color="#10B981" />
                  <span>Klaim Promo WhatsApp</span>
                </a>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
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
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span>Book Mentoring Sekarang</span>
                    <FlatIcon type="chevron-right" size={12} color="#0A0A0C" />
                  </button>
                </div>
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
              Menampilkan {mentors.length} Mentor Ahli Aktif
            </span>
            <span style={{ fontSize: "0.75rem", color: "#10B981" }}>
              ● Sesi 1-on-1 Privat via Google Meet &amp; Akses Recording
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
