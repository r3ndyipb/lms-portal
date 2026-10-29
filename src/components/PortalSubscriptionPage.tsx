"use client";

import React, { useState, useEffect } from "react";
import FlatIcon from "./FlatIcon";

export default function PortalSubscriptionPage() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionToast, setSubscriptionToast] = useState<string | null>(null);

  // Token redeem state
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [tokenInput, setTokenInput] = useState("");
  const [tokenFeedback, setTokenFeedback] = useState<{ text: string; success: boolean } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("portal_subscribed");
      if (stored === "true") {
        setIsSubscribed(true);
      }
    }
  }, []);

  const handleSubscribe = () => {
    setIsSubscribed(true);
    setSubscriptionToast("Pembayaran langganan berhasil! Akses penuh seluruh kelas telah aktif.");
    if (typeof window !== "undefined") {
      localStorage.setItem("portal_subscribed", "true");
    }
    setTimeout(() => setSubscriptionToast(null), 5000);
  };

  const handleFreeTrial = () => {
    setIsSubscribed(true);
    setSubscriptionToast("Mode Coba Gratis 7 Hari aktif! Nikmati akses penuh ke seluruh kurikulum.");
    if (typeof window !== "undefined") {
      localStorage.setItem("portal_subscribed", "true");
    }
    setTimeout(() => setSubscriptionToast(null), 5000);
  };

  const handleRedeemToken = () => {
    const trimmed = tokenInput.trim();
    if (!trimmed) {
      setTokenFeedback({ text: "Silakan masukkan kode token terlebih dahulu.", success: false });
      return;
    }
    setIsSubscribed(true);
    setTokenFeedback({
      text: `Token "${trimmed.toUpperCase()}" berhasil di-redeem! Akses langganan aktif.`,
      success: true,
    });
    setSubscriptionToast(`Token ${trimmed.toUpperCase()} berhasil divalidasi! Akses penuh aktif.`);
    if (typeof window !== "undefined") {
      localStorage.setItem("portal_subscribed", "true");
    }
    setTokenInput("");
    setTimeout(() => {
      setTokenFeedback(null);
      setShowTokenInput(false);
      setSubscriptionToast(null);
    }, 5000);
  };

  const handleResetSubscription = () => {
    setIsSubscribed(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("portal_subscribed");
    }
  };

  return (
    <div className="portal-content-fluid">
      {/* Toast Notification */}
      {subscriptionToast && (
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
            gap: "10px",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <FlatIcon type="check-circle" size={16} color="#10B981" />
            <span>{subscriptionToast}</span>
          </span>
          <button
            type="button"
            onClick={() => setSubscriptionToast(null)}
            style={{ background: "none", border: "none", color: "#10B981", cursor: "pointer", display: "flex", alignItems: "center" }}
            aria-label="Tutup notifikasi"
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
          Langganan
        </h1>
        <p style={{ fontSize: "0.84375rem", color: "var(--bx-muted)", margin: 0 }}>
          Kelola paket langganan belajar, akses fitur premium, dan riwayat transaksi akun kamu.
        </p>
      </div>

      {/* CARD 1: LANGGANAN UNTUK AKSES PENUH */}
      <div
        className="portal-dash-card"
        style={{
          padding: "24px",
          marginBottom: "24px",
          background: isSubscribed
            ? "var(--bx-surface-card)"
            : "linear-gradient(135deg, rgba(201, 150, 46, 0.08) 0%, rgba(10, 46, 82, 0.05) 100%), var(--bx-surface-card)",
          border: isSubscribed ? "1px solid var(--bx-border)" : "1px solid rgba(201, 150, 46, 0.45)",
          borderRadius: "10px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "18px" }}>
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                color: isSubscribed ? "#10B981" : "var(--gold)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                background: isSubscribed ? "rgba(16, 185, 129, 0.12)" : "rgba(201, 150, 46, 0.12)",
                padding: "3px 8px",
                borderRadius: "4px",
                display: "inline-block",
                marginBottom: "8px",
                border: isSubscribed ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid rgba(201, 150, 46, 0.3)",
              }}
            >
              {isSubscribed ? "STATUS: LANGGANAN AKTIF" : "UPGRADE AKSES"}
            </div>

            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.3rem",
                fontWeight: 800,
                color: "var(--bx-ink-bright)",
                margin: "0 0 6px",
              }}
            >
              Langganan untuk Akses Penuh
            </h2>

            <p style={{ fontSize: "0.84375rem", color: "var(--bx-muted)", margin: 0, maxWidth: "620px", lineHeight: 1.5 }}>
              {isSubscribed
                ? "Akun Anda saat ini memiliki akses penuh ke seluruh kelas, kurikulum lanjutan, submission kode tanpa batas, dan sesi konsultasi 1-on-1 dengan Reviewer Industri."
                : "Anda belum memiliki langganan aktif. Berlangganan untuk membuka seluruh fitur belajar."}
            </p>
          </div>

          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "10px",
              background: "rgba(201, 150, 46, 0.12)",
              border: "1px solid rgba(201, 150, 46, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <FlatIcon type="crown" size={26} color="var(--gold)" />
          </div>
        </div>

        {/* List Benefit */}
        <div style={{ margin: "20px 0 24px" }}>
          <div style={{ fontSize: "0.78125rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Fitur &amp; Manfaat Akses Penuh:
          </div>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "12px",
            }}
          >
            {[
              "Sertifikat diakui global",
              "Unlimited submission",
              "Code review",
              "Forum diskusi",
              "Punya token?",
            ].map((item, idx) => (
              <li
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "0.84375rem",
                  color: "var(--bx-ink-bright)",
                  fontWeight: 600,
                  background: "var(--bx-bg)",
                  border: "1px solid var(--bx-border)",
                  padding: "10px 14px",
                  borderRadius: "6px",
                }}
              >
                <span
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: "rgba(16, 185, 129, 0.15)",
                    color: "#10B981",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <FlatIcon type="check" size={12} color="#10B981" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons & Token Form */}
        <div style={{ borderTop: "1px solid var(--bx-border)", paddingTop: "18px" }}>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", marginBottom: "16px" }}>
            {!isSubscribed ? (
              <>
                <button
                  type="button"
                  className="blackbox-pill blackbox-pill-blue"
                  style={{ padding: "10px 22px", fontSize: "0.84375rem", fontWeight: 800, cursor: "pointer" }}
                  onClick={handleSubscribe}
                >
                  Berlangganan Sekarang →
                </button>
                <button
                  type="button"
                  className="portal-demo-pill"
                  style={{ padding: "10px 20px", fontSize: "0.84375rem", fontWeight: 700, cursor: "pointer" }}
                  onClick={handleFreeTrial}
                >
                  Coba Gratis 7 Hari
                </button>
              </>
            ) : (
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#10B981", fontSize: "0.84375rem", fontWeight: 700 }}>
                <FlatIcon type="check-circle" size={18} color="#10B981" />
                <span>Paket Berlangganan Anda Aktif</span>
              </div>
            )}

            {!showTokenInput && (
              <button
                type="button"
                onClick={() => setShowTokenInput(true)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--gold)",
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  padding: "6px 12px",
                  textDecoration: "underline",
                  marginLeft: "auto",
                }}
              >
                Punya token? Redeem di sini
              </button>
            )}
          </div>

          {/* Token Form */}
          {showTokenInput && (
            <div
              style={{
                background: "var(--bx-bg)",
                border: "1px dashed var(--bx-border)",
                borderRadius: "8px",
                padding: "16px",
                maxWidth: "480px",
                marginTop: "12px",
              }}
            >
              <div style={{ fontSize: "0.78125rem", fontWeight: 700, color: "var(--bx-ink-bright)", marginBottom: "8px" }}>
                Masukkan Kode Token Langganan
              </div>
              <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                <input
                  type="text"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  placeholder="Contoh: TOKEN-ANVIEO-PRO..."
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    fontSize: "0.8125rem",
                    borderRadius: "6px",
                    border: "1px solid var(--bx-border)",
                    background: "var(--bx-surface)",
                    color: "var(--bx-ink-bright)",
                    fontFamily: "var(--font-mono)",
                    outline: "none",
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleRedeemToken();
                  }}
                />
                <button
                  type="button"
                  className="blackbox-pill blackbox-pill-blue"
                  style={{ padding: "8px 16px", fontSize: "0.78125rem", fontWeight: 700 }}
                  onClick={handleRedeemToken}
                >
                  Redeem Token
                </button>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.71875rem", color: "var(--bx-muted)" }}>
                  Token promosi atau voucher bootcamp mitra
                </span>
                <button
                  type="button"
                  onClick={() => setShowTokenInput(false)}
                  style={{ background: "none", border: "none", color: "var(--bx-muted)", fontSize: "0.71875rem", cursor: "pointer" }}
                >
                  Tutup Form
                </button>
              </div>

              {tokenFeedback && (
                <div
                  style={{
                    marginTop: "10px",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    background: tokenFeedback.success ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.12)",
                    color: tokenFeedback.success ? "#10B981" : "#EF4444",
                    border: `1px solid ${tokenFeedback.success ? "#10B981" : "#EF4444"}`,
                  }}
                >
                  {tokenFeedback.text}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* CARD 2: DAFTAR TRANSAKSI */}
      <div className="portal-dash-card" style={{ padding: "24px" }}>
        <div style={{ marginBottom: "16px" }}>
          <h3
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.15rem",
              fontWeight: 800,
              color: "var(--bx-ink-bright)",
              margin: "0 0 6px",
            }}
          >
            Daftar Transaksi
          </h3>
          <p style={{ fontSize: "0.8125rem", color: "var(--bx-muted)", margin: 0 }}>
            Berikut ini adalah daftar transaksi Langganan yang pernah Anda lakukan:
          </p>
        </div>

        {!isSubscribed ? (
          /* EMPTY STATE (SEBELUM ADA TRANSAKSI) */
          <div
            style={{
              padding: "40px 20px",
              textAlign: "center",
              background: "var(--bx-bg)",
              border: "1px dashed var(--bx-border)",
              borderRadius: "8px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "var(--bx-surface)",
                border: "1px solid var(--bx-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px",
                color: "var(--bx-muted)",
              }}
            >
              <FlatIcon type="card" size={22} color="var(--bx-muted)" />
            </div>
            <div
              style={{
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "var(--bx-ink-bright)",
                marginBottom: "4px",
              }}
            >
              Anda belum pernah melakukan transaksi.
            </div>
            <p style={{ fontSize: "0.78125rem", color: "var(--bx-muted)", margin: 0, maxWidth: "420px", marginLeft: "auto", marginRight: "auto" }}>
              Seluruh riwayat pembayaran langganan, invoice resmi, dan status masa aktif akun Anda akan tercatat otomatis di bagian ini.
            </p>
          </div>
        ) : (
          /* DAFTAR TRANSAKSI AKTIF / RIWAYAT */
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8125rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--bx-border)", textAlign: "left", color: "var(--bx-muted)" }}>
                  <th style={{ padding: "10px 14px", fontWeight: 700 }}>No. Invoice</th>
                  <th style={{ padding: "10px 14px", fontWeight: 700 }}>Paket Langganan</th>
                  <th style={{ padding: "10px 14px", fontWeight: 700 }}>Tanggal</th>
                  <th style={{ padding: "10px 14px", fontWeight: 700 }}>Jumlah</th>
                  <th style={{ padding: "10px 14px", fontWeight: 700 }}>Status</th>
                  <th style={{ padding: "10px 14px", fontWeight: 700, textAlign: "right" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--bx-border)" }}>
                  <td style={{ padding: "12px 14px", fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--bx-ink-bright)" }}>
                    INV-2026-0842-SUB
                  </td>
                  <td style={{ padding: "12px 14px", color: "var(--bx-ink-bright)", fontWeight: 600 }}>
                    Langganan Akses Penuh (Full Access Pass)
                  </td>
                  <td style={{ padding: "12px 14px", color: "var(--bx-muted)" }}>
                    27 Okt 2026
                  </td>
                  <td style={{ padding: "12px 14px", fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--gold)" }}>
                    Rp 249.000
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <span
                      style={{
                        fontSize: "0.6875rem",
                        fontWeight: 700,
                        color: "#10B981",
                        background: "rgba(16, 185, 129, 0.12)",
                        border: "1px solid rgba(16, 185, 129, 0.35)",
                        padding: "3px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      BERHASIL
                    </span>
                  </td>
                  <td style={{ padding: "12px 14px", textAlign: "right" }}>
                    <button
                      type="button"
                      style={{
                        background: "none",
                        border: "1px solid var(--bx-border)",
                        color: "var(--gold)",
                        padding: "4px 10px",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                      onClick={() => alert("Mengunduh Invoice PDF: INV-2026-0842-SUB...")}
                    >
                      Unduh Invoice
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Development reset helper */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
              <button
                type="button"
                onClick={handleResetSubscription}
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--bx-muted)",
                  background: "none",
                  border: "1px dashed var(--bx-border)",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                title="Reset status langganan untuk pengujian simulasi"
              >
                [Dev: Reset Status Langganan ke Belum Bayar]
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
