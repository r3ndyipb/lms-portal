"use client";

import React, { useState } from "react";
import { FlatIcon } from "./FlatIcon";

export interface CertificateData {
  recipientName: string;
  courseTitle: string;
  certificateId: string;
  completionDate: string;
  finalScore?: string;
  durationHours?: number;
  instructorName?: string;
  isInitiallyGenerated?: boolean;
}

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: CertificateData;
  onStudyAgain?: () => void;
}

export default function CertificateModal({
  isOpen,
  onClose,
  certificate,
  onStudyAgain,
}: CertificateModalProps) {
  // State: apakah sertifikat sudah dibuat (generated) atau belum
  // Sesuai permintaan user: "ada tombol buat sertifikat lalu setelah jadi ada tombol perbaharui sertifikat"
  const [isGenerated, setIsGenerated] = useState<boolean>(
    certificate.isInitiallyGenerated ?? false
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Dynamic certificate metadata
  const [certId, setCertId] = useState<string>(
    certificate.certificateId || "6RPN71MK8X2M"
  );
  const [issuedDate, setIssuedDate] = useState<string>(
    certificate.completionDate || "16 April 2026"
  );
  const [validUntil, setValidUntil] = useState<string>("16 April 2029");

  if (!isOpen) return null;

  const verifyUrl = `https://www.dicoding.com/certificates/${certId}`;

  // Handle Klik "Buat Sertifikat"
  const handleGenerateCertificate = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsGenerated(true);
      setCertId("6RPN71MK8X2M");
      setIssuedDate("16 April 2026");
      setValidUntil("16 April 2029");
      setToastMessage("🎉 Selamat! Sertifikat kompetensi kelulusan resmi Anda berhasil diterbitkan.");
      setTimeout(() => setToastMessage(null), 4000);
    }, 1000);
  };

  // Handle Klik "Perbarui Sertifikat"
  const handleRenewCertificate = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setValidUntil("16 April 2029");
      setToastMessage("✓ Sertifikat berhasil diperbarui! Kredensial dan masa berlaku Anda telah disinkronkan.");
      setTimeout(() => setToastMessage(null), 4000);
    }, 900);
  };

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(verifyUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.65)",
        backdropFilter: "blur(4px)",
        zIndex: 99999,
        display: "flex",
        justifyContent: "flex-end", // Aligns slider to the right side
        alignItems: "stretch",
        overflow: "hidden",
      }}
      // NOTE: Backdrop click intentionally does NOT close the slider
      // User requirement: "tidak bisa di close kecuali klik tombol close"
    >
      <div
        className="portal-certificate-slider"
        style={{
          background: "#FFFFFF",
          color: "#1E293B",
          width: "90%",
          maxWidth: "90vw",
          height: "100vh",
          maxHeight: "100vh",
          boxShadow: "-12px 0 40px rgba(0, 0, 0, 0.45)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          fontFamily: "var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.15)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header / Slider Close & Demo Switcher */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 24px",
            background: "#0F172A",
            color: "#FFFFFF",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            flexShrink: 0,
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#F8FAFC", letterSpacing: "0.02em" }}>
              Verifikasi Sertifikat Kelulusan
            </span>

            {/* Status indicator badge */}
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 800,
                padding: "3px 10px",
                borderRadius: "4px",
                background: isGenerated ? "rgba(16, 185, 129, 0.2)" : "rgba(245, 158, 11, 0.2)",
                color: isGenerated ? "#10B981" : "#F59E0B",
                border: `1px solid ${isGenerated ? "#10B981" : "#F59E0B"}`,
              }}
            >
              {isGenerated ? "Status: Sudah Terbit" : "Status: Belum Diterbitkan"}
            </span>

            {/* Quick Demo Reset Toggle */}
            <button
              type="button"
              onClick={() => setIsGenerated(!isGenerated)}
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#94A3B8",
                padding: "3px 10px",
                borderRadius: "4px",
                fontSize: "0.6875rem",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              title="Klik untuk beralih mode demo antara 'Belum Ada Sertifikat' dan 'Sudah Jadi'"
            >
              🔄 Simulasi: {isGenerated ? "Ganti ke Belum Dibuat" : "Ganti ke Sudah Jadi"}
            </button>
          </div>

          {/* Tombol Tutup Khusus (Satu-satunya cara menutup slider sesuai instruksi user) */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup Slider Sertifikat"
            style={{
              background: "#EF4444",
              border: "none",
              color: "#FFFFFF",
              cursor: "pointer",
              padding: "7px 18px",
              borderRadius: "6px",
              fontSize: "0.8125rem",
              fontWeight: 800,
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 2px 8px rgba(239, 68, 68, 0.35)",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#DC2626";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#EF4444";
            }}
            title="Klik untuk menutup tampilan sertifikat"
          >
            <span>Tutup</span>
            <span style={{ fontSize: "1rem", lineHeight: 1 }}>✕</span>
          </button>
        </div>

        {/* Scrollable Content Container (Inside Slider) */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >

        {/* Toast Banner Feedback */}
        {toastMessage && (
          <div
            style={{
              background: isGenerated ? "#065F46" : "#1E293B",
              color: "#FFFFFF",
              padding: "10px 20px",
              fontSize: "0.8125rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>{toastMessage}</span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              style={{ background: "none", border: "none", color: "#FFFFFF", cursor: "pointer" }}
            >
              ✕
            </button>
          </div>
        )}

        {/* =====================================================================
            1. TOP CERTIFICATE STAGE (Grey/Light Blue Canvas with Framed Certificate)
            ===================================================================== */}
        <div
          style={{
            background: "#F1F5F9",
            padding: "40px 20px 36px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderBottom: "1px solid #E2E8F0",
          }}
        >
          {/* Framed Certificate Box (Matches user's screenshot exactly!) */}
          <div
            style={{
              width: "100%",
              maxWidth: "680px",
              background: "#1E293B",
              padding: "14px",
              borderRadius: "4px",
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.16)",
              marginBottom: "24px",
            }}
          >
            {/* The Certificate Paper */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "2px",
                padding: "28px 32px 24px",
                position: "relative",
                minHeight: "360px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                overflow: "hidden",
                border: "1px solid #E2E8F0",
              }}
            >
              {/* Draft Watermark overlay if not generated */}
              {!isGenerated && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(255, 255, 255, 0.88)",
                    backdropFilter: "blur(2px)",
                    zIndex: 20,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>📜</div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 800, color: "#1E293B", margin: "0 0 6px" }}>
                    Sertifikat Siap Diterbitkan
                  </h3>
                  <p style={{ fontSize: "0.8125rem", color: "#64748B", maxWidth: "380px", margin: "0 0 16px", lineHeight: 1.5 }}>
                    Anda telah menyelesaikan 100% materi dan ujian kelas &ldquo;{certificate.courseTitle}&rdquo;. Klik tombol di bawah untuk membuat sertifikat resmi Anda.
                  </p>
                  <div
                    style={{
                      border: "2px dashed #CBD5E1",
                      borderRadius: "6px",
                      padding: "6px 14px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#94A3B8",
                      letterSpacing: "0.08em",
                    }}
                  >
                    STATUS: BELUM DITERBITKAN
                  </div>
                </div>
              )}

              {/* Top Row: Logo & Top Right Ribbon Badge */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  {/* Dicoding Logo */}
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                    <span
                      style={{
                        fontSize: "1.375rem",
                        fontWeight: 900,
                        letterSpacing: "-0.04em",
                        color: "#1E293B",
                        fontFamily: "var(--font-heading, sans-serif)",
                      }}
                    >
                      dicoding
                    </span>
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        background: "#00A79D",
                        borderRadius: "50%",
                        display: "inline-block",
                      }}
                    />
                  </div>

                  {/* Badge: SERI KELULUSAN */}
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: "0.5625rem",
                      fontWeight: 800,
                      background: "#1E293B",
                      color: "#FFFFFF",
                      padding: "2px 6px",
                      borderRadius: "3px",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    SERI KELULUSAN
                  </span>
                </div>

                {/* Ribbon Badge Top Right: SERTIFIKAT KOMPETENSI KELULUSAN */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: "32px",
                    width: "58px",
                    background: "#1E293B",
                    color: "#FFFFFF",
                    padding: "10px 4px 16px",
                    textAlign: "center",
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 88%, 50% 100%, 0% 88%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.4375rem",
                      fontWeight: 800,
                      letterSpacing: "0.06em",
                      lineHeight: 1.15,
                      textTransform: "uppercase",
                    }}
                  >
                    SERTIFIKAT KOMPETENSI KELULUSAN
                  </span>

                  {/* Emblem Circle with Medal 9 */}
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      border: "2px solid #F8FAFC",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      fontSize: "0.875rem",
                      color: "#FFFFFF",
                    }}
                  >
                    9
                  </div>
                </div>
              </div>

              {/* Certificate Middle: Recipient & Course info */}
              <div style={{ margin: "24px 0 18px", paddingRight: "70px" }}>
                <div style={{ fontSize: "0.6875rem", color: "#64748B", marginBottom: "4px" }}>
                  Diberikan kepada
                </div>

                <div
                  style={{
                    fontSize: "1.45rem",
                    fontWeight: 800,
                    color: "#00A79D",
                    marginBottom: "8px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {certificate.recipientName || "Rendy Ariawindana"}
                </div>

                <div style={{ fontSize: "0.6875rem", color: "#64748B", marginBottom: "4px" }}>
                  Atas kelulusannya pada kelas
                </div>

                <div
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: "#00A79D",
                    lineHeight: 1.35,
                  }}
                >
                  {certificate.courseTitle || "Memulai Pemrograman dengan Python"}
                </div>
              </div>

              {/* Certificate Bottom: Date, Signature & QR Code */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  borderTop: "1px solid #F1F5F9",
                  paddingTop: "14px",
                }}
              >
                {/* Left: Date & Signatures */}
                <div>
                  <div style={{ fontSize: "0.625rem", color: "#64748B", marginBottom: "6px" }}>
                    {issuedDate}
                  </div>

                  {/* Signature mark */}
                  <div
                    style={{
                      fontFamily: "'Brush Script MT', 'Dancing Script', cursive",
                      fontSize: "1.35rem",
                      color: "#1E293B",
                      marginBottom: "2px",
                      lineHeight: 1,
                    }}
                  >
                    Narendra Wicaksono
                  </div>

                  <div style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#1E293B" }}>
                    Narendra Wicaksono
                  </div>
                  <div style={{ fontSize: "0.5625rem", color: "#64748B" }}>
                    Chief Executive Officer
                  </div>
                  <div style={{ fontSize: "0.5625rem", color: "#64748B" }}>
                    Dicoding Indonesia
                  </div>
                </div>

                {/* Right: QR Code & Verification URL */}
                <div style={{ textAlign: "right" }}>
                  {/* Mock SVG QR Code */}
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      border: "1px solid #CBD5E1",
                      borderRadius: "4px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#FFFFFF",
                      padding: "2px",
                      marginBottom: "4px",
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="40" height="40" fill="#1E293B">
                      <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm13-2h3v3h-3v-3zm0 5h3v3h-3v-3zm3-2h2v2h-2v-2zm-5 0h2v2h-2v-2zM5 5h2v2H5V5zm12 0h2v2h-2V5zM5 17h2v2H5v-2z" />
                    </svg>
                  </div>

                  <div style={{ fontSize: "0.5625rem", fontWeight: 700, color: "#1E293B" }}>
                    Verifikasi Sertifikat
                  </div>
                  <div style={{ fontSize: "0.5rem", color: "#64748B" }}>
                    dicoding.com/certificates/{certId}
                  </div>
                  <div style={{ fontSize: "0.5rem", color: "#64748B" }}>
                    Berlaku hingga {validUntil}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================================
              THE ACTION BUTTON: "Buat Sertifikat" LALU "Perbarui Sertifikat"
              =================================================================== */}
          <div>
            {!isGenerated ? (
              /* Tombol Buat Sertifikat (Jika belum jadi) */
              <button
                type="button"
                onClick={handleGenerateCertificate}
                disabled={isProcessing}
                style={{
                  background: "#1E293B",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "10px 28px",
                  borderRadius: "6px",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  cursor: isProcessing ? "wait" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 14px rgba(30, 41, 59, 0.25)",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#0F172A")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#1E293B")}
              >
                <span>📜</span>
                <span>{isProcessing ? "Menerbitkan Sertifikat..." : "Buat Sertifikat"}</span>
              </button>
            ) : (
              /* Tombol Perbarui Sertifikat (Setelah jadi, persis di gambar referensi) */
              <button
                type="button"
                onClick={handleRenewCertificate}
                disabled={isProcessing}
                style={{
                  background: "#1E293B",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "10px 24px",
                  borderRadius: "6px",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  cursor: isProcessing ? "wait" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 14px rgba(30, 41, 59, 0.25)",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#0F172A")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#1E293B")}
              >
                <span>{isProcessing ? "Memperbarui..." : "Perbarui Sertifikat"}</span>
              </button>
            )}
          </div>
        </div>

        {/* =====================================================================
            2. BOTTOM TWO-COLUMN CONTENT SECTION (Exact replica of screenshot!)
            ===================================================================== */}
        <div
          style={{
            padding: "36px 32px 48px",
            maxWidth: "1020px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: "36px",
          }}
        >
          {/* -------------------------------------------------------------------
              LEFT COLUMN: Course Header, Partner Logos, Description, Syllabus
              ------------------------------------------------------------------- */}
          <div>
            {/* Course Header with Thumbnail & Title */}
            <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
              <img
                src="/courses/python.jpg"
                alt="Memulai Pemrograman dengan Python"
                style={{
                  width: "120px",
                  height: "85px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  border: "1px solid #E2E8F0",
                  flexShrink: 0,
                }}
              />

              <div>
                <h2
                  style={{
                    fontSize: "1.375rem",
                    fontWeight: 800,
                    color: "#0F172A",
                    margin: "0 0 6px",
                    lineHeight: 1.3,
                  }}
                >
                  {certificate.courseTitle || "Memulai Pemrograman dengan Python"}
                </h2>

                <div style={{ fontSize: "0.8125rem", color: "#64748B", marginBottom: "4px" }}>
                  Disusun oleh: <strong>Dicoding Indonesia</strong>
                </div>

                <div style={{ fontSize: "0.8125rem", color: "#64748B", marginBottom: "6px" }}>
                  Level: Dasar
                </div>

                <a
                  href="#detail-kelas"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onStudyAgain) onStudyAgain();
                  }}
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    color: "#0284C7",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span>Lihat detail kelas</span>
                  <span>›</span>
                </a>
              </div>
            </div>

            {/* Partner Logos: dicoding & Google Developers Authorized Training Partner */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
                padding: "14px 0",
                borderTop: "1px solid #E2E8F0",
                borderBottom: "1px solid #E2E8F0",
                marginBottom: "20px",
                flexWrap: "wrap",
              }}
            >
              {/* Dicoding logo */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "1.25rem", fontWeight: 900, color: "#1E293B", letterSpacing: "-0.04em" }}>
                  dicoding
                </span>
                <span style={{ width: "6px", height: "6px", background: "#00A79D", borderRadius: "50%" }} />
              </div>

              {/* Google Developers Authorized Training Partner Logo */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {/* Google brackets <> */}
                <div style={{ display: "flex", alignItems: "center", gap: "2px", fontSize: "1.1rem", fontWeight: 900 }}>
                  <span style={{ color: "#4285F4" }}>&lt;</span>
                  <span style={{ color: "#EA4335" }}>/</span>
                  <span style={{ color: "#34A853" }}>&gt;</span>
                </div>
                <div>
                  <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#475569", lineHeight: 1.1 }}>
                    Google Developers
                  </div>
                  <div style={{ fontSize: "0.625rem", color: "#94A3B8", letterSpacing: "0.04em" }}>
                    Authorized Training Partner
                  </div>
                </div>
              </div>
            </div>

            {/* Course Summary Description */}
            <p
              style={{
                fontSize: "0.875rem",
                color: "#334155",
                lineHeight: 1.65,
                marginBottom: "24px",
              }}
            >
              Kelas ditujukan bagi pemula yang ingin belajar dasar pemrograman Python dengan mengacu pada standar industri. Di akhir kelas, siswa mampu membuat program dengan Python menggunakan berbagai IDE yang telah dipelajari, seperti Visual Studio Code, Jupyter Notebook, dan Google Colaboratory.
            </p>

            {/* Materi yang dipelajari (Syllabus List with Hours) */}
            <div>
              <h3 style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#0F172A", margin: "0 0 12px" }}>
                Materi yang dipelajari:
              </h3>

              <ul
                style={{
                  margin: 0,
                  paddingLeft: "18px",
                  fontSize: "0.84375rem",
                  color: "#334155",
                  lineHeight: 1.7,
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <li>
                  <strong>Berkenalan dengan Python:</strong> Pengenalan bahasa Python dari perkembangan, versi rilis, hingga membuat kode pertamamu. <em>(5 jam 30 menit)</em>
                </li>
                <li>
                  <strong>Berinteraksi dengan Data:</strong> Menjelaskan bagaimana berinteraksi dengan berbagai macam data menggunakan bahasa Python, mulai dari pengenalan hingga mengoperasikannya. <em>(11 jam 30 menit)</em>
                </li>
                <li>
                  <strong>Ekspresi:</strong> Menjelaskan konsep ekspresi dan penerapannya pada bahasa Python. <em>(3 jam 55 menit)</em>
                </li>
                <li>
                  <strong>Aksi Sekuensial:</strong> Menjelaskan konsep aksi sekuensial dan penerapannya pada bahasa Python. <em>(2 jam 10 menit)</em>
                </li>
                <li>
                  <strong>Control Flow:</strong> Menjelaskan cara mengontrol alur menggunakan percabangan dan perulangan serta mengontrol kesalahan pada Python. <em>(6 jam 20 menit)</em>
                </li>
                <li>
                  <strong>Array dan Pemrosesannya:</strong> Menjelaskan konsep array pada pemrograman dan menerapkannya ke dalam bahasa Python. <em>(4 jam 15 menit)</em>
                </li>
                <li>
                  <strong>Matriks:</strong> Menjelaskan konsep matriks pada pemrograman dan menerapkannya ke dalam bahasa Python. <em>(2 jam 35 menit)</em>
                </li>
                <li>
                  <strong>Subprogram:</strong> Menjelaskan cara efektif membangun program dengan membaginya menjadi fungsi dan prosedur. <em>(6 jam 5 menit)</em>
                </li>
                <li>
                  <strong>Object-Oriented Programming (OOP):</strong> Menjelaskan pemrograman berorientasi objek pada Python, seperti object, class, method, atribut, dan pewarisan atau inheritance. Materi ini bersifat opsional. <em>(5 jam 20 menit)</em>
                </li>
              </ul>
            </div>
          </div>

          {/* -------------------------------------------------------------------
              RIGHT COLUMN: Student Card, Validity, Social Share & LinkedIn
              ------------------------------------------------------------------- */}
          <div>
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "10px",
                padding: "24px 20px",
                textAlign: "center",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
              }}
            >
              {/* Circular Student Avatar Photo */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "12px" }}>
                <img
                  src="/alumni/alumni_1.jpg"
                  alt={certificate.recipientName || "Rendy Ariawindana"}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "3px solid #E2E8F0",
                  }}
                />
              </div>

              {/* Student Name */}
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 800,
                  color: "#0F172A",
                  margin: "0 0 6px",
                }}
              >
                {certificate.recipientName || "Rendy ariawindana"}
              </h3>

              {/* Credential ID */}
              <div style={{ marginBottom: "16px" }}>
                <span style={{ fontSize: "0.6875rem", color: "#64748B", display: "block" }}>ID</span>
                <span
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 800,
                    color: "#1E293B",
                    fontFamily: "var(--font-mono, monospace)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {certId}
                </span>
              </div>

              {/* Diberikan pada & Berlaku sampai */}
              <div style={{ marginBottom: "12px" }}>
                <span style={{ fontSize: "0.6875rem", color: "#64748B", display: "block" }}>
                  Diberikan pada
                </span>
                <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#1E293B" }}>
                  {issuedDate}
                </span>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <span style={{ fontSize: "0.6875rem", color: "#64748B", display: "block" }}>
                  Berlaku sampai
                </span>
                <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#1E293B" }}>
                  {validUntil}
                </span>
              </div>

              <a
                href="#profil"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Membuka profil publik siswa: Rendy Ariawindana");
                }}
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  color: "#0284C7",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  marginBottom: "20px",
                }}
              >
                <span>Lihat profil lengkap</span>
                <span>›</span>
              </a>

              {/* Divider */}
              <div style={{ height: "1px", background: "#E2E8F0", margin: "0 0 16px" }} />

              {/* Bagikan sertifikat */}
              <div style={{ fontSize: "0.75rem", color: "#64748B", marginBottom: "10px" }}>
                Bagikan sertifikat:
              </div>

              {/* Social icons: LinkedIn, Twitter/X, Facebook, Copy link */}
              <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
                {/* LinkedIn */}
                <button
                  type="button"
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(verifyUrl)}`, "_blank")}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "6px",
                    border: "1px solid #CBD5E1",
                    background: "#FFFFFF",
                    color: "#0A66C2",
                    fontWeight: 800,
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  title="Bagikan ke LinkedIn"
                >
                  in
                </button>

                {/* Twitter / X */}
                <button
                  type="button"
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Saya telah lulus sertifikasi ${certificate.courseTitle} di Dicoding! ${verifyUrl}`)}`, "_blank")}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "6px",
                    border: "1px solid #CBD5E1",
                    background: "#FFFFFF",
                    color: "#0F172A",
                    fontWeight: 800,
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  title="Bagikan ke X / Twitter"
                >
                  𝕏
                </button>

                {/* Facebook */}
                <button
                  type="button"
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(verifyUrl)}`, "_blank")}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "6px",
                    border: "1px solid #CBD5E1",
                    background: "#FFFFFF",
                    color: "#1877F2",
                    fontWeight: 800,
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  title="Bagikan ke Facebook"
                >
                  f
                </button>

                {/* Copy Link */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "6px",
                    border: "1px solid #CBD5E1",
                    background: copied ? "#059669" : "#FFFFFF",
                    color: copied ? "#FFFFFF" : "#475569",
                    fontWeight: 800,
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  title="Salin tautan sertifikat"
                >
                  {copied ? "✓" : "🔗"}
                </button>
              </div>

              {/* Prominent Blue Button: Tambahkan ke LinkedIn */}
              <button
                type="button"
                onClick={() => {
                  const addCertUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
                    certificate.courseTitle
                  )}&organizationName=Dicoding%20Indonesia&issueYear=2026&issueMonth=4&certUrl=${encodeURIComponent(verifyUrl)}&certId=${certId}`;
                  window.open(addCertUrl, "_blank");
                }}
                style={{
                  width: "100%",
                  background: "#0A66C2",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "6px",
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  boxShadow: "0 2px 6px rgba(10, 102, 194, 0.3)",
                }}
              >
                <span>Tambahkan ke LinkedIn</span>
                <span style={{ fontSize: "0.75rem" }}>↗</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Close Button */}
        <div
          style={{
            padding: "16px 28px",
            borderTop: "1px solid #E2E8F0",
            background: "#F8FAFC",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            marginTop: "24px",
          }}
        >
          <span style={{ fontSize: "0.8125rem", color: "#64748B" }}>
            Kredensial sertifikat terdaftar resmi pada sistem ANVIEO Academy &amp; terintegrasi dengan verifikasi QR Code.
          </span>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: "#0F172A",
              color: "#FFFFFF",
              border: "none",
              padding: "8px 22px",
              borderRadius: "6px",
              fontSize: "0.8125rem",
              fontWeight: 800,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#EF4444";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#0F172A";
            }}
          >
            <span>Tutup Sertifikat</span>
            <span style={{ fontSize: "1rem", lineHeight: 1 }}>✕</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);
}
