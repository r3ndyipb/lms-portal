"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FlatIcon from "./FlatIcon";

export default function RegisterForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [track, setTrack] = useState("fullstack");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  // Calculate password strength
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, text: "Kosong", color: "var(--bx-muted-soft)" };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 1, text: "Sangat Lemah", class: "weak" };
    if (score === 2) return { score: 2, text: "Cukup", class: "medium" };
    if (score === 3) return { score: 3, text: "Kuat", class: "strong" };
    return { score: 4, text: "Sangat Kuat", class: "strong" };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert("Harap menyetujui Ketentuan Layanan & Kebijakan Privasi ANVIEO Academy.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "portal_user",
          JSON.stringify({
            name: fullName || "Peserta Baru",
            email: email || "peserta.baru@anvieo.edu",
            role: "siswa",
            enrolledTrack:
              track === "fullstack"
                ? "Fullstack Web & AI Architecture"
                : track === "cloud"
                ? "Cloud & Distributed Backend Systems"
                : track === "cyberlaw"
                ? "Cyberlaw & AI Governance"
                : "Financial Engineering & Corporate Valuation",
            streak: 1,
            xp: 150,
            avatar: "/alumni/alumni_4.jpg",
          })
        );
      }
      setIsLoading(false);
      router.push("/dashboard");
    }, 700);
  };

  return (
    <>
      <div className="portal-card-wrap">
        {/* Navigation Tabs (Masuk vs Daftar) */}
        <div className="portal-nav-tabs">
          <Link href="/login" className="portal-nav-tab">
            Masuk Portal
          </Link>
          <Link href="/register" className="portal-nav-tab active">
            Daftar Akun Baru
          </Link>
        </div>

        {/* Main Register Form */}
        <form onSubmit={handleSubmit} className="portal-form">
          {/* Row 1: Name & Email */}
          <div className="portal-form-grid-2">
            <div className="portal-form-group">
              <label htmlFor="name" className="portal-label">
                <span>Nama Lengkap <span style={{ color: "var(--gold)" }}>*</span></span>
              </label>
              <div className="portal-input-wrap">
                <span className="portal-input-icon">
                  <FlatIcon type="user" size={14} />
                </span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="Muhammad Farhan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="portal-input"
                />
              </div>
            </div>

            <div className="portal-form-group">
              <label htmlFor="email" className="portal-label">
                <span>Email Aktif <span style={{ color: "var(--gold)" }}>*</span></span>
              </label>
              <div className="portal-input-wrap">
                <span className="portal-input-icon">
                  <FlatIcon type="email" size={14} />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="username"
                  inputMode="email"
                  required
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="portal-input"
                />
              </div>
            </div>
          </div>

          {/* Row 2: WhatsApp & Track */}
          <div className="portal-form-grid-2">
            <div className="portal-form-group">
              <label htmlFor="phone" className="portal-label">
                <span>Nomor WhatsApp <span style={{ color: "var(--gold)" }}>*</span></span>
              </label>
              <div className="portal-input-wrap">
                <span className="portal-input-icon">
                  <FlatIcon type="phone" size={14} />
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  required
                  placeholder="081234567890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="portal-input"
                />
              </div>
            </div>

            <div className="portal-form-group">
              <label htmlFor="track" className="portal-label">
                <span>Jalur Spesialisasi <span style={{ color: "var(--gold)" }}>*</span></span>
              </label>
              <div className="portal-input-wrap">
                <span className="portal-input-icon">
                  <FlatIcon type="roadmap" size={14} />
                </span>
                <select
                  id="track"
                  name="track"
                  value={track}
                  onChange={(e) => setTrack(e.target.value)}
                  className="portal-input"
                  style={{ cursor: "pointer" }}
                >
                  <option value="fullstack">Fullstack Web &amp; AI (Next.js)</option>
                  <option value="cloud">Cloud &amp; Backend Systems (Go)</option>
                  <option value="cyberlaw">Cyberlaw &amp; AI Governance</option>
                  <option value="finance">Financial Modeling &amp; Valuation</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 3: Password */}
          <div className="portal-form-group">
            <label htmlFor="new-password" className="portal-label">
              <span>Kata Sandi Baru <span style={{ color: "var(--gold)" }}>*</span></span>
              <span style={{ fontSize: "0.6875rem", color: "var(--bx-muted-soft)" }}>Min. 8 Karakter</span>
            </label>
            <div className="portal-input-wrap">
              <span className="portal-input-icon">
                <FlatIcon type="lock" size={14} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="new-password"
                name="new-password"
                autoComplete="new-password"
                required
                placeholder="Kombinasi huruf, angka & simbol"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="portal-input"
              />
              <span className="portal-input-addon">
                <button
                  type="button"
                  className="portal-pw-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                  title={showPassword ? "Sembunyikan" : "Tampilkan"}
                >
                  <FlatIcon type={showPassword ? "eye-off" : "eye"} size={14} />
                </button>
              </span>
            </div>

            {/* Password Strength Meter */}
            {password && (
              <>
                <div className="portal-pw-strength-meter">
                  <div className={`portal-pw-strength-bar ${strength.score >= 1 ? strength.class : ""}`} />
                  <div className={`portal-pw-strength-bar ${strength.score >= 2 ? strength.class : ""}`} />
                  <div className={`portal-pw-strength-bar ${strength.score >= 3 ? strength.class : ""}`} />
                  <div className={`portal-pw-strength-bar ${strength.score >= 4 ? strength.class : ""}`} />
                </div>
                <div className="portal-pw-strength-label">
                  <span>Kekuatan: <strong>{strength.text}</strong></span>
                  <span>Gunakan huruf besar &amp; simbol</span>
                </div>
              </>
            )}
          </div>

          {/* Terms Agreement Checkbox */}
          <div className="portal-form-options">
            <label className="portal-checkbox-label">
              <input
                type="checkbox"
                required
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <span style={{ fontSize: "0.75rem", lineHeight: 1.3 }}>
                Setujui{" "}
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="portal-link-gold"
                  style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: "0.75rem" }}
                >
                  Ketentuan Layanan
                </button>{" "}
                &amp;{" "}
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="portal-link-gold"
                  style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: "0.75rem" }}
                >
                  Privasi
                </button>.
              </span>
            </label>
          </div>

          {/* Submit Button (Black) */}
          <button
            type="submit"
            disabled={isLoading}
            className="portal-submit-btn portal-submit-btn-black"
          >
            {isLoading ? (
              <>
                <span style={{ display: "inline-block", width: "14px", height: "14px", border: "2px solid #FFFFFF", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />
                <span>MEMBUAT AKUN PORTAL...</span>
              </>
            ) : (
              <>
                <span>BUAT AKUN BELAJAR SEKARANG</span>
                <FlatIcon type="arrow-right" size={14} color="#FFFFFF" />
              </>
            )}
          </button>
        </form>

        {/* SSO Divider */}
        <div className="portal-divider">
          <span>atau daftar dengan</span>
        </div>

        {/* SSO Social Logins (Google Only) */}
        <div className="portal-sso-single">
          <button
            type="button"
            className="portal-sso-btn portal-sso-btn-full"
            onClick={() => {
              setFullName("Alumni Google User");
              setEmail("alumni.google@gmail.com");
              setPhone("081234567890");
              setAgreeTerms(true);
              handleSubmit({ preventDefault: () => {} } as React.FormEvent);
            }}
          >
            <FlatIcon type="google" size={17} />
            <span>Daftar Cepat dengan Google</span>
          </button>
        </div>

        {/* Switch Prompt */}
        <div className="portal-switch-prompt">
          Sudah memiliki akun portal?{" "}
          <Link href="/login" className="portal-link-gold">
            Masuk Di Sini →
          </Link>
        </div>
      </div>

      {/* Terms Modal */}
      {showTermsModal && (
        <div className="blackbox-modal-backdrop" onClick={() => setShowTermsModal(false)}>
          <div className="blackbox-modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "480px" }}>
            <button
              type="button"
              className="blackbox-modal-close"
              onClick={() => setShowTermsModal(false)}
              aria-label="Tutup"
            >
              ×
            </button>

            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", margin: "0 0 10px", color: "var(--bx-ink-bright)" }}>
              Ketentuan Layanan &amp; Etika Pembelajaran
            </h3>

            <div style={{ maxHeight: "260px", overflowY: "auto", fontSize: "0.78125rem", color: "var(--bx-prose-ink)", lineHeight: 1.5, paddingRight: "6px" }}>
              <p style={{ marginBottom: "10px" }}>
                Selamat datang di ANVIEO Academy. Sebagai pembelajar di platform ini, Anda menyepakati hal-hal berikut:
              </p>
              <ul style={{ paddingLeft: "16px", marginBottom: "10px", display: "flex", flexDirection: "column", gap: "6px" }}>
                <li><strong>Integritas Akademik:</strong> Seluruh baris kode submission proyek wajib merupakan hasil karya sendiri atau dikembangkan dengan kaidah atribusi terbuka.</li>
                <li><strong>Reviewer SLA:</strong> Setiap kode tugas Anda akan dievaluasi oleh praktisi senior dalam kurun waktu 1x24 jam.</li>
                <li><strong>Kerahasiaan Akun:</strong> Akun portal bersifat personal dan tidak diperkenankan dipindahtangankan.</li>
                <li><strong>Perlindungan Data:</strong> Data kontak WhatsApp dan email hanya digunakan untuk kebutuhan notifikasi kelulusan dan sertifikat resmi.</li>
              </ul>
            </div>

            <button
              type="button"
              className="portal-submit-btn"
              onClick={() => {
                setAgreeTerms(true);
                setShowTermsModal(false);
              }}
              style={{ marginTop: "14px" }}
            >
              SAYA MENGERTI &amp; SETUJU
            </button>
          </div>
        </div>
      )}
    </>
  );
}
