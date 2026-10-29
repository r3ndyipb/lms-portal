"use client";

import React, { useState } from "react";
import FlatIcon from "./FlatIcon";

export interface ScholarshipProgram {
  id: string;
  title: string;
  partner: string;
  partnerLogo?: string;
  image: string;
  status: "Dibuka" | "Seleksi" | "Segera";
  deadline: string;
  quota: string;
  targetAudience: string;
  summary: string;
  benefits: string[];
  requirements: string[];
}

const SCHOLARSHIP_PROGRAMS: ScholarshipProgram[] = [
  {
    id: "prog-idcamp-ai",
    title: "Beasiswa IDCamp x ANVIEO AI Developer Fellowship 2026",
    partner: "Indosat Ooredoo Hutchison & ANVIEO Academy",
    image: "/programs/scholarship.jpg",
    status: "Dibuka",
    deadline: "30 November 2026",
    quota: "1.500 Penerima Beasiswa",
    targetAudience: "Mahasiswa D3/D4/S1, Fresh Graduate, dan Developer Muda Indonesia (Usia 17 - 29 Tahun)",
    summary: "Program beasiswa komprehensif untuk mencetak talenta Artificial Intelligence dan Fullstack Web Architecture yang siap diserap langsung oleh industri teknologi multinasional.",
    benefits: [
      "Akses penuh gratis ke seluruh materi Learning Path Fullstack AI (senilai Rp 4.500.000)",
      "Sesi mentoring 1-on-1 mingguan bersama Tech Lead praktisi unicorn",
      "Voucher gratis ujian sertifikasi kompetensi terstandar global",
      "Insentif dana capstone project untuk 100 submission terbaik",
      "Fasilitas penyaluran kerja (Job Connect) ke 80+ perusahaan hiring partner",
    ],
    requirements: [
      "Warga Negara Indonesia (WNI) dibuktikan dengan KTP/Kartu Pelajar",
      "Memiliki komitmen belajar mandiri minimal 10 jam per minggu",
      "Mampu mengoperasikan komputer dan memiliki koneksi internet stabil",
      "Tidak sedang terikat kontrak beasiswa penuh lainnya",
    ],
  },
  {
    id: "prog-komdigi-cloud",
    title: "Beasiswa Talenta Digital Komdigi x Google Cloud Enterprise",
    partner: "Kementerian Komunikasi dan Digital RI & Google Cloud",
    image: "/programs/incubation.jpg",
    status: "Dibuka",
    deadline: "15 Desember 2026",
    quota: "3.000 Penerima Beasiswa",
    targetAudience: "Umum, Profesional IT, dan Guru/Dosen Vokasi Seluruh Indonesia",
    summary: "Inisiatif nasional akselerasi transformasi digital yang memfasilitasi sertifikasi resmi Google Cloud Associate Cloud Engineer dengan kurikulum berstandar industri silicon valley.",
    benefits: [
      "Akses gratis ke hands-on lab Qwiklabs & Cloud Architecture Sandbox",
      "Voucher resmi ujian sertifikasi Google Cloud Associate (bebas biaya ujian $125)",
      "Bimbingan live workshop intensif bersama Google Developer Experts (GDE)",
      "Sertifikat kelulusan terakreditasi Kementerian Komdigi RI",
    ],
    requirements: [
      "WNI berusia minimal 18 tahun",
      "Memiliki latar belakang dasar sistem operasi, terminal, atau pemrograman",
      "Menyelesaikan asesmen teknis dasar sebelum batas waktu",
    ],
  },
  {
    id: "prog-aws-female",
    title: "AWS Cloud Practitioner x ANVIEO Female Tech Fellowship",
    partner: "Amazon Web Services (AWS) Indonesia",
    image: "/programs/fellowship.jpg",
    status: "Dibuka",
    deadline: "20 November 2026",
    quota: "800 Penerima Beasiswa Khusus Perempuan",
    targetAudience: "Perempuan Mahasiswi & Karir Switcher yang ingin berkarir di bidang Cloud & DevOps",
    summary: "Program afirmasi keberagaman industri teknologi untuk memberdayakan perempuan Indonesia menguasai komputasi awan AWS, arsitektur microservices, dan cloud security.",
    benefits: [
      "Voucher ujian resmi sertifikasi AWS Certified Cloud Practitioner ($100 gratis)",
      "Mentorship eksklusif bersama Female Tech Leaders dari ekosistem AWS",
      "Webinar mingguan soft-skills, negotiation skill, dan personal branding karir",
      "Akses ke komunitas alumni perempuan teknologi se-Asia Tenggara",
    ],
    requirements: [
      "Perempuan WNI berusia 18 - 35 tahun",
      "Terbuka untuk latar belakang non-IT (tersedia materi pemula)",
      "Berkomitmen menyelesaikan seluruh modul kurikulum selama 2 bulan",
    ],
  },
  {
    id: "prog-fintech-bank",
    title: "FinTech Banking Modern Architecture Scholarship 2026",
    partner: "Konsorsium Perbankan Digital Indonesia",
    image: "/programs/fasttrack.jpg",
    status: "Seleksi",
    deadline: "05 November 2026 (Tahap Wawancara)",
    quota: "500 Penerima Beasiswa",
    targetAudience: "Lulusan Baru Ilmu Komputer, Sistem Informasi, dan Teknik Elektro",
    summary: "Beasiswa jalur cepat karir perbankan digital: penguasaan arsitektur backend perbankan high-concurrency, keamanan transaksi PCI-DSS, dan event-driven microservices.",
    benefits: [
      "Kesempatan penawaran kerja (Offering Letter) sebelum program berakhir",
      "Uang saku bulanan selama masa pelatihan intensif",
      "Hands-on studi kasus nyata simulasi transaksi perbankan 10.000 TPS",
    ],
    requirements: [
      "Lulusan D4/S1 dengan IPK minimal 3.00",
      "Memahami konsep dasar database SQL dan struktur data algoritma",
      "Lulus tahap tes logika dan tes kemampuan coding dasar",
    ],
  },
];

interface PortalProgramsPageProps {
  onNavigateNav?: (navId: string) => void;
}

export default function PortalProgramsPage({ onNavigateNav }: PortalProgramsPageProps) {
  const [selectedProgram, setSelectedProgram] = useState<ScholarshipProgram | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formName, setFormName] = useState("Rendy ariawindana");
  const [formEmail, setFormEmail] = useState("rendy.ariawindana@gmail.com");
  const [formPhone, setFormPhone] = useState("081234567890");
  const [formMotivation, setFormMotivation] = useState("");
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleOpenRegister = (prog: ScholarshipProgram) => {
    setSelectedProgram(prog);
    setModalOpen(true);
  };

  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProgram) return;

    setModalOpen(false);
    setSuccessToast(
      `Pendaftaran Anda untuk "${selectedProgram.title}" telah diterima! Bukti pendaftaran dikirim ke ${formEmail}.`
    );
    setFormMotivation("");
    setTimeout(() => setSuccessToast(null), 6000);
  };

  return (
    <div className="portal-content-fluid" style={{ paddingBottom: "90px" }}>
      {/* Toast Notification */}
      {successToast && (
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
            <span>{successToast}</span>
          </span>
          <button
            type="button"
            onClick={() => setSuccessToast(null)}
            style={{ background: "none", border: "none", color: "#10B981", cursor: "pointer" }}
          >
            <FlatIcon type="close" size={14} color="#10B981" />
          </button>
        </div>
      )}

      {/* Header Halaman */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px", flexWrap: "wrap", gap: "10px" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>
            Periode Pendaftaran Aktif 2026
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              fontWeight: 800,
              color: "#3B82F6",
              background: "rgba(59, 130, 246, 0.12)",
              border: "1px solid rgba(59, 130, 246, 0.35)",
              padding: "2px 8px",
              borderRadius: "4px",
              marginLeft: "auto",
            }}
          >
            PROGRAM TERBARU
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
          Daftar Program Beasiswa Terbaru
        </h1>
        <p style={{ fontSize: "0.84375rem", color: "var(--bx-muted)", margin: 0, maxWidth: "720px", lineHeight: 1.5 }}>
          Raih beasiswa pembelajaran teknologi gratis berstandar global hasil kolaborasi ANVIEO Academy dengan kementerian dan raksasa industri teknologi.
        </p>
      </div>

      {/* LIST OF SCHOLARSHIP PROGRAMS */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {SCHOLARSHIP_PROGRAMS.map((prog) => {
          const isOpened = prog.status === "Dibuka";

          return (
            <div
              key={prog.id}
              className="portal-dash-card"
              style={{
                padding: 0,
                overflow: "hidden",
                border: isOpened ? "1px solid var(--bx-border)" : "1px solid rgba(245, 158, 11, 0.35)",
                borderRadius: "10px",
                background: "var(--bx-surface)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Program Cover Image Banner */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "175px",
                  overflow: "hidden",
                  background: "#0F172A",
                }}
              >
                <img
                  src={prog.image}
                  alt={prog.title}
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
                    background: "linear-gradient(to top, rgba(10, 10, 12, 0.95) 0%, rgba(10, 10, 12, 0.45) 50%, rgba(10, 10, 12, 0.25) 100%)",
                  }}
                />
                {/* Floating Top Badges */}
                <div
                  style={{
                    position: "absolute",
                    top: "14px",
                    left: "16px",
                    right: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      color: "var(--gold)",
                      background: "rgba(10, 10, 12, 0.85)",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      backdropFilter: "blur(6px)",
                      border: "1px solid rgba(201, 150, 46, 0.3)",
                    }}
                  >
                    Mitra: {prog.partner}
                  </span>
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 800,
                      color: isOpened ? "#10B981" : "#F59E0B",
                      background: isOpened ? "rgba(16, 185, 129, 0.25)" : "rgba(245, 158, 11, 0.25)",
                      border: `1px solid ${isOpened ? "#10B981" : "#F59E0B"}`,
                      padding: "4px 10px",
                      borderRadius: "6px",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    STATUS: {prog.status.toUpperCase()}
                  </span>
                </div>

                {/* Floating Bottom Metadata inside image banner */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "16px",
                    right: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "10px",
                    fontSize: "0.78125rem",
                  }}
                >
                  <span style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                    Batas Pendaftaran: <strong style={{ color: "var(--gold)" }}>{prog.deadline}</strong>
                  </span>
                  <span style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                    Kuota: <strong style={{ color: "#10B981" }}>{prog.quota}</strong>
                  </span>
                </div>
              </div>

              {/* Card Body Padding */}
              <div style={{ padding: "22px 24px" }}>
                {/* Header Card: Title, Summary & CTA */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "14px", marginBottom: "14px" }}>
                  <div style={{ flex: "1 1 500px" }}>
                    <h2
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.25rem",
                        fontWeight: 800,
                        color: "var(--bx-ink-bright)",
                        margin: "0 0 8px",
                      }}
                    >
                      {prog.title}
                    </h2>

                    <p style={{ fontSize: "0.84375rem", color: "var(--bx-muted)", margin: 0, lineHeight: 1.55 }}>
                      {prog.summary}
                    </p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <button
                      type="button"
                      onClick={() => handleOpenRegister(prog)}
                      style={{
                        background: isOpened ? "#10B981" : "var(--gold)",
                        color: isOpened ? "#FFFFFF" : "#0A0A0C",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "6px",
                        fontSize: "0.8125rem",
                        fontWeight: 800,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <span>{isOpened ? "Daftar Beasiswa Sekarang" : "Lihat Status Seleksi"}</span>
                      <FlatIcon type="chevron-right" size={12} color={isOpened ? "#FFFFFF" : "#0A0A0C"} />
                    </button>
                  </div>
                </div>

              {/* Detail Grid: Fasilitas & Persyaratan */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "16px",
                  marginTop: "16px",
                  paddingTop: "16px",
                  borderTop: "1px solid var(--bx-border)",
                }}
              >
                {/* Benefits List */}
                <div style={{ background: "var(--bx-bg)", padding: "14px 16px", borderRadius: "8px", border: "1px solid var(--bx-border)" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--bx-ink-bright)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <FlatIcon type="award" size={14} color="#10B981" />
                    <span>Fasilitas yang Didapatkan:</span>
                  </div>
                  <ul style={{ paddingLeft: "16px", margin: 0, fontSize: "0.78125rem", color: "var(--bx-muted)", lineHeight: 1.6 }}>
                    {prog.benefits.map((b, bIdx) => (
                      <li key={bIdx} style={{ marginBottom: "4px" }}>
                        <span style={{ color: "var(--bx-ink)" }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements List */}
                <div style={{ background: "var(--bx-bg)", padding: "14px 16px", borderRadius: "8px", border: "1px solid var(--bx-border)" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--bx-ink-bright)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <FlatIcon type="check-circle" size={14} color="var(--gold)" />
                    <span>Persyaratan Pendaftar:</span>
                  </div>
                  <ul style={{ paddingLeft: "16px", margin: 0, fontSize: "0.78125rem", color: "var(--bx-muted)", lineHeight: 1.6 }}>
                    {prog.requirements.map((r, rIdx) => (
                      <li key={rIdx} style={{ marginBottom: "4px" }}>
                        <span style={{ color: "var(--bx-ink)" }}>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
        })}
      </div>

      {/* ========================================================================= */}
      {/* MODAL PENDAFTARAN BEASISWA                                                */}
      {/* ========================================================================= */}
      {modalOpen && selectedProgram && (
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
          onClick={() => setModalOpen(false)}
        >
          <div
            style={{
              background: "var(--bx-surface)",
              border: "1px solid var(--bx-border)",
              borderRadius: "10px",
              maxWidth: "540px",
              width: "100%",
              padding: "24px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FlatIcon type="rocket" size={18} color="var(--gold)" />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--bx-ink-bright)", margin: 0 }}>
                  Formulir Pendaftaran Beasiswa
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                style={{ background: "none", border: "none", color: "var(--bx-muted)", cursor: "pointer" }}
              >
                <FlatIcon type="close" size={16} />
              </button>
            </div>

            <div style={{ background: "var(--bx-bg)", padding: "10px 14px", borderRadius: "6px", marginBottom: "16px", border: "1px solid var(--bx-border)" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>Program yang Dipilih:</div>
              <div style={{ fontSize: "0.84375rem", fontWeight: 700, color: "var(--bx-ink-bright)" }}>
                {selectedProgram.title}
              </div>
            </div>

            <form onSubmit={handleSubmitRegistration}>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "4px" }}>
                  Nama Lengkap Sesuai KTP:
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
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

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "4px" }}>
                    Email Aktif:
                  </label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
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
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "4px" }}>
                    Nomor WhatsApp:
                  </label>
                  <input
                    type="tel"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
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
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "4px" }}>
                  Motivasi Mengikuti Beasiswa &amp; Rencana Karir:
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Ceritakan mengapa Anda layak mendapatkan beasiswa ini dan bagaimana rencana Anda berkontribusi setelah lulus..."
                  value={formMotivation}
                  onChange={(e) => setFormMotivation(e.target.value)}
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
                  onClick={() => setModalOpen(false)}
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
                  Kirim Pendaftaran Beasiswa →
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
              Menampilkan {SCHOLARSHIP_PROGRAMS.length} Program Beasiswa Terbuka
            </span>
            <span style={{ fontSize: "0.75rem", color: "#10B981" }}>
              ● 100% Beasiswa Penuh &amp; Fasilitas Sertifikasi
            </span>
          </div>

          {/* Quick Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              type="button"
              onClick={() => onNavigateNav ? onNavigateNav("kelas") : null}
              style={{
                background: "var(--bx-bg)",
                border: "1px solid var(--bx-border)",
                color: "var(--bx-ink)",
                padding: "7px 14px",
                borderRadius: "6px",
                fontSize: "0.75rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>Eksplorasi Katalog Kelas</span>
              <FlatIcon type="chevron-right" size={11} color="var(--bx-ink)" />
            </button>
            <button
              type="button"
              onClick={() => onNavigateNav ? onNavigateNav("jalur-belajar") : null}
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
              <span>Lihat Learning Path</span>
              <FlatIcon type="chevron-right" size={11} color="#0A0A0C" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
