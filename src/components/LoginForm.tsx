"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FlatIcon from "./FlatIcon";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "portal_user",
          JSON.stringify({
            name: "Rendy ariawindana",
            email: email || "rendy.ariawindana@gmail.com",
            studentId: "ANV-2026-0842",
            role: "siswa",
            enrolledTrack: "Fullstack Web & AI Architecture",
            streak: 7,
            xp: 2840,
            points: 1450,
            avatar: "/alumni/alumni_1.jpg",
          })
        );
      }
      setIsLoading(false);
      router.push("/");
    }, 500);
  };

  return (
    <>
      <div className="portal-card-wrap">
        {/* Navigation Tabs (Masuk vs Daftar) */}
        <div className="portal-nav-tabs">
          <Link href="/login" className="portal-nav-tab active">
            Masuk Portal
          </Link>
          <Link href="/register" className="portal-nav-tab">
            Daftar Akun Baru
          </Link>
        </div>

        {/* Main Login Form */}
        <form onSubmit={handleSubmit} className="portal-form">
          {/* Email Field */}
          <div className="portal-form-group">
            <label htmlFor="email" className="portal-label">
              <span>Email Akun Portal <span style={{ color: "var(--gold)" }}>*</span></span>
            </label>
            <div className="portal-input-wrap">
              <span className="portal-input-icon">
                <FlatIcon type="email" size={17} />
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

          {/* Password Field */}
          <div className="portal-form-group">
            <label htmlFor="password" className="portal-label">
              <span>Kata Sandi <span style={{ color: "var(--gold)" }}>*</span></span>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="portal-link-gold"
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                Lupa Sandi?
              </button>
            </label>
            <div className="portal-input-wrap">
              <span className="portal-input-icon">
                <FlatIcon type="lock" size={17} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="current-password"
                required
                placeholder="••••••••••••"
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
                  <FlatIcon type={showPassword ? "eye-off" : "eye"} size={17} />
                </button>
              </span>
            </div>
          </div>

          {/* Options Row (Remember Me) */}
          <div className="portal-form-options">
            <label className="portal-checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Ingat saya di perangkat ini</span>
            </label>
            <span style={{ fontSize: "0.8125rem", color: "var(--bx-muted-soft)" }}>
              Sesi 30 Hari
            </span>
          </div>

          {/* Submit Button (Black) */}
          <button
            type="submit"
            disabled={isLoading}
            className="portal-submit-btn portal-submit-btn-black"
          >
            {isLoading ? (
              <>
                <span style={{ display: "inline-block", width: "16px", height: "16px", border: "2px solid #FFFFFF", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />
                <span>MEMVERIFIKASI...</span>
              </>
            ) : (
              <>
                <span>MASUK KE PORTAL BELAJAR</span>
                <FlatIcon type="arrow-right" size={16} color="#FFFFFF" />
              </>
            )}
          </button>
        </form>

        {/* SSO Divider */}
        <div className="portal-divider">
          <span>atau masuk dengan</span>
        </div>

        {/* SSO Social Logins (Google Only) */}
        <div className="portal-sso-single">
          <button
            type="button"
            className="portal-sso-btn portal-sso-btn-full"
            onClick={() => {
              setEmail("google.user@gmail.com");
              handleSubmit({ preventDefault: () => {} } as React.FormEvent);
            }}
          >
            <FlatIcon type="google" size={18} />
            <span>Masuk dengan Google</span>
          </button>
        </div>

        {/* Switch Prompt */}
        <div className="portal-switch-prompt">
          Belum memiliki akun portal?{" "}
          <Link href="/register" className="portal-link-gold">
            Daftar Sekarang (Gratis) →
          </Link>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div
          className="blackbox-modal-backdrop"
          onClick={() => {
            setShowForgotModal(false);
            setForgotSuccess(false);
          }}
        >
          <div className="blackbox-modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "440px" }}>
            <button
              type="button"
              className="blackbox-modal-close"
              onClick={() => {
                setShowForgotModal(false);
                setForgotSuccess(false);
              }}
              aria-label="Tutup"
            >
              ×
            </button>

            <div style={{ textAlign: "center", marginBottom: "18px" }}>
              <div style={{ width: "46px", height: "46px", margin: "0 auto 12px", background: "rgba(201,150,46,0.12)", border: "1px solid var(--gold)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FlatIcon type="key" size={22} color="var(--gold)" />
              </div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", margin: "0 0 6px", color: "var(--bx-ink-bright)" }}>
                Pemulihan Kata Sandi
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--bx-muted)", margin: 0 }}>
                Masukkan alamat email yang terdaftar untuk menerima tautan instruksi reset.
              </p>
            </div>

            {forgotSuccess ? (
              <div style={{ textAlign: "center", padding: "14px 0" }}>
                <div style={{ color: "#10B981", marginBottom: "8px", display: "flex", justifyContent: "center" }}>
                  <FlatIcon type="check-circle" size={36} color="#10B981" />
                </div>
                <h4 style={{ fontSize: "1rem", color: "var(--bx-ink-bright)", marginBottom: "6px" }}>
                  Tautan Reset Telah Terkirim!
                </h4>
                <p style={{ fontSize: "0.875rem", color: "var(--bx-muted)", marginBottom: "16px" }}>
                  Silakan periksa folder kotak masuk atau spam pada <strong>{forgotEmail || email}</strong>.
                </p>
                <button
                  type="button"
                  className="portal-submit-btn"
                  onClick={() => {
                    setShowForgotModal(false);
                    setForgotSuccess(false);
                  }}
                >
                  KEMBALI KE LOGIN
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setForgotSuccess(true);
                }}
                style={{ display: "flex", flexDirection: "column", gap: "14px" }}
              >
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "6px", color: "var(--bx-ink)" }}>
                    Email Terdaftar
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={forgotEmail || email}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      background: "var(--bx-bg)",
                      border: "1px solid var(--bx-border)",
                      borderRadius: "6px",
                      color: "var(--bx-ink-bright)",
                      fontSize: "0.9375rem",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="portal-submit-btn"
                >
                  KIRIM INSTRUKSI RESET →
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
