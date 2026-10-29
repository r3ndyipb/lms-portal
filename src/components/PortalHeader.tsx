"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import FlatIcon from "./FlatIcon";

interface PortalHeaderProps {
  currentPage?: "login" | "register" | "home" | "dashboard";
  onToggleSidebar?: () => void;
  isSidebarCollapsed?: boolean;
}

interface PortalUser {
  name: string;
  email: string;
  studentId: string;
  role: string;
  enrolledTrack: string;
  streak: number;
  xp: number;
  points: number;
  avatar: string;
}

const DEFAULT_USER: PortalUser = {
  name: "Rendy ariawindana",
  email: "rendy.ariawindana@gmail.com",
  studentId: "ANV-2026-0842",
  role: "siswa",
  enrolledTrack: "Fullstack Web & AI Architecture",
  streak: 7,
  xp: 2840,
  points: 1450,
  avatar: "/alumni/alumni_1.jpg",
};

const STREAK_DAYS = [
  { day: "Sel", completed: true },
  { day: "Rab", completed: true },
  { day: "Kam", completed: true },
  { day: "Jum", completed: true },
  { day: "Sab", completed: true },
  { day: "Min", completed: true },
  { day: "Sen", completed: true, isToday: true },
];

export default function PortalHeader({
  currentPage = "home",
  onToggleSidebar,
  isSidebarCollapsed = false,
}: PortalHeaderProps) {
  const router = useRouter();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [user, setUser] = useState<PortalUser>(DEFAULT_USER);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showStreakTooltip, setShowStreakTooltip] = useState(false);

  const userDropdownRef = useRef<HTMLDivElement>(null);
  const notifDropdownRef = useRef<HTMLDivElement>(null);
  const streakRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateThemeState = () => {
      const current = document.documentElement.getAttribute("data-theme") as "light" | "dark" | null;
      setTheme(current || "light");
    };

    updateThemeState();
    const observer = new MutationObserver(updateThemeState);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // Load user data from localStorage
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("portal_user");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUser((prev) => ({
            ...prev,
            ...parsed,
            studentId: parsed.studentId || "ANV-2026-0842",
            points: parsed.points || 1450,
          }));
        } catch (e) {
          console.error("Failed to parse portal_user", e);
        }
      }
    }

    // Click outside listener
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target as Node)) {
        setShowNotifDropdown(false);
      }
      if (streakRef.current && !streakRef.current.contains(event.target as Node)) {
        setShowStreakTooltip(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      observer.disconnect();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("portal_user");
    }
    setShowUserDropdown(false);
    router.push("/login");
  };

  const isAuthPage = currentPage === "login" || currentPage === "register";

  return (
    <header className="portal-auth-header">
      <div className={isAuthPage ? "blackbox-frame" : "portal-header-fluid"}>
        <div className="portal-auth-header-inner">
          {/* Side Menu Toggle & Brand Logo Group */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            {/* Sidebar Toggle Button (Placed to the LEFT of Logo) */}
            {!isAuthPage && onToggleSidebar && (
              <button
                type="button"
                className="portal-header-sidebar-toggle"
                onClick={onToggleSidebar}
                title={isSidebarCollapsed ? "Perluas Menu Samping" : "Kecilkan Menu Samping"}
                aria-label="Toggle Side Menu"
              >
                <FlatIcon type="menu" size={17} />
              </button>
            )}

            <Link href="/" className="portal-auth-brand-group" aria-label="ANVIEO ACADEMY LMS">
              <img
                src={theme === "light" ? "/logo-dark.png" : "/logo-light.png"}
                alt="Anvieo Logo"
                width={34}
                height={34}
                style={{
                  width: "34px",
                  height: "34px",
                  objectFit: "contain",
                  display: "block",
                  flexShrink: 0,
                }}
              />
              <div style={{ display: "inline-flex", flexDirection: "column", justifyContent: "center", lineHeight: 1 }}>
                <span className="portal-brand-title">ANVIEO</span>
                <div className="portal-brand-subtitle" aria-hidden="true">
                  {"ACADEMY".split("").map((char, idx) => (
                    <span key={idx}>{char}</span>
                  ))}
                </div>
              </div>

              {/* Vertical Divider Line */}
              <span className="portal-brand-divider" aria-hidden="true" />

              {/* Tulisan Learning Management System tanpa badge */}
              <span className="portal-header-plain-title">Learning Management System</span>
            </Link>
          </div>

          {/* Right Header Actions */}
          <div className="portal-header-actions" style={{ position: "relative" }}>
            {isAuthPage ? (
              <>
                <a
                  href="http://localhost:3000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portal-back-link"
                  title="Kunjungi website publik LMS"
                >
                  <FlatIcon type="globe" size={14} />
                  <span>Halaman Utama</span>
                </a>

                {currentPage === "login" && (
                  <Link href="/register" className="portal-back-link" style={{ fontWeight: 700, color: "var(--gold)" }}>
                    <span>Daftar Akun</span>
                    <FlatIcon type="arrow-right" size={13} />
                  </Link>
                )}

                {currentPage === "register" && (
                  <Link href="/login" className="portal-back-link" style={{ fontWeight: 700, color: "var(--gold)" }}>
                    <span>Masuk Portal</span>
                    <FlatIcon type="arrow-right" size={13} />
                  </Link>
                )}

                <ThemeToggle />
              </>
            ) : (
              <>
                {/* 1. Streak Belajar Berturut-turut (Icon Petir/Api) */}
                <div className="portal-streak-container" ref={streakRef} style={{ position: "relative" }}>
                  <button
                    type="button"
                    className="portal-streak-btn"
                    onClick={() => setShowStreakTooltip(!showStreakTooltip)}
                    title={`Streak Belajar ${user.streak} Hari Berturut-turut`}
                    aria-label="Informasi Streak Belajar"
                  >
                    <span className="portal-streak-icon-wrap" aria-hidden="true">
                      🔥
                    </span>
                    <span className="portal-streak-text">{user.streak} Hari</span>
                  </button>

                  {showStreakTooltip && (
                    <div className="portal-streak-popover">
                      {/* 7-Days Streak Calendar Row */}
                      <div className="portal-streak-week-grid">
                        {STREAK_DAYS.map((item, idx) => (
                          <div key={idx} className={`portal-streak-day-col ${item.isToday ? "today" : ""}`}>
                            <span className="portal-streak-day-label">{item.day}</span>
                            <div className={`portal-streak-day-circle ${item.completed ? "active" : ""}`}>
                              {item.completed ? "🔥" : "·"}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Guidance text */}
                      <p className="portal-streak-guidance">
                        Selesaikan minimal 1 materi untuk mendapatkan streak.
                      </p>

                      <div className="portal-streak-divider" />

                      {/* Longest streak record */}
                      <div className="portal-streak-record-row">
                        <span className="portal-streak-record-label">Rekor Streak terpanjang:</span>
                        <strong className="portal-streak-record-val">8</strong>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Lonceng Notifikasi */}
                <div className="portal-notif-container" ref={notifDropdownRef} style={{ position: "relative" }}>
                  <button
                    type="button"
                    className="portal-header-icon-btn"
                    onClick={() => {
                      setShowNotifDropdown(!showNotifDropdown);
                      setShowUserDropdown(false);
                      setShowStreakTooltip(false);
                    }}
                    aria-label="Buka Notifikasi Pembelajaran"
                    title="Notifikasi Pembelajaran (3 baru)"
                  >
                    <FlatIcon type="bell" size={17} />
                    <span className="portal-header-badge">3</span>
                  </button>

                  {showNotifDropdown && (
                    <div className="portal-notif-dropdown">
                      <div className="portal-notif-header">
                        <strong>Notifikasi Akademik</strong>
                        <span className="portal-notif-chip">3 Baru</span>
                      </div>
                      <div className="portal-notif-list">
                        <div className="portal-notif-item unread">
                          <div className="portal-notif-icon-circle green">
                            <FlatIcon type="check" size={13} color="#10B981" />
                          </div>
                          <div className="portal-notif-body">
                            <div className="portal-notif-title">Submission Tugas Akhir Modul 3 Lulus!</div>
                            <div className="portal-notif-desc">Nilai Grade A (98/100) oleh Reviewer Rian Pratama. SLA 1x24 jam terpenuhi.</div>
                            <span className="portal-notif-time">2 jam yang lalu</span>
                          </div>
                        </div>

                        <div className="portal-notif-item unread">
                          <div className="portal-notif-icon-circle gold">
                            <FlatIcon type="sparkle" size={13} color="#F59E0B" />
                          </div>
                          <div className="portal-notif-body">
                            <div className="portal-notif-title">Live Masterclass AI Dimulai Besok</div>
                            <div className="portal-notif-desc">Workshop Arsitektur Multi-Agent bersama praktisi industri pukul 19:00 WIB.</div>
                            <span className="portal-notif-time">Kemarin</span>
                          </div>
                        </div>

                        <div className="portal-notif-item">
                          <div className="portal-notif-icon-circle red">
                            <FlatIcon type="fire" size={13} color="#EF4444" />
                          </div>
                          <div className="portal-notif-body">
                            <div className="portal-notif-title">Pencapaian: Streak 7 Hari Berturut-turut!</div>
                            <div className="portal-notif-desc">Konsistensi belajarmu terjaga. Bonus +100 XP telah ditambahkan ke profil.</div>
                            <span className="portal-notif-time">Hari ini</span>
                          </div>
                        </div>
                      </div>
                      <div className="portal-notif-footer">
                        <button type="button" className="portal-notif-all-btn">
                          Tandai Semua Sudah Dibaca
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Divider between quick tools & user profile */}
                <span className="portal-header-action-divider" aria-hidden="true" />

                {/* 3. User Avatar + Profile Trigger & Dropdown Menu */}
                <div className="portal-user-container" ref={userDropdownRef} style={{ position: "relative" }}>
                  <button
                    type="button"
                    className={`portal-header-user-btn ${showUserDropdown ? "active" : ""}`}
                    onClick={() => {
                      setShowUserDropdown(!showUserDropdown);
                      setShowNotifDropdown(false);
                      setShowStreakTooltip(false);
                    }}
                    aria-expanded={showUserDropdown}
                    aria-label={`Menu profil ${user.name}`}
                  >
                    <div className="portal-header-avatar-wrap">
                      <img src={user.avatar} alt={user.name} className="portal-header-avatar" />
                      <span className="portal-avatar-status-dot" title="Status: Online" />
                    </div>

                    <div className="portal-header-user-text">
                      <span className="portal-header-user-name">{user.name}</span>
                      <div className="portal-header-user-id-email">
                        <span className="portal-user-badge-id">{user.studentId}</span>
                        <span className="portal-sep">·</span>
                        <span className="portal-user-email-text">{user.email}</span>
                      </div>
                    </div>

                    <span className={`portal-header-chevron ${showUserDropdown ? "open" : ""}`} aria-hidden="true">
                      <FlatIcon type="chevron-down" size={13} />
                    </span>
                  </button>

                  {/* Dropdown Menu sesuai referensi user */}
                  {showUserDropdown && (
                    <div className="portal-user-dropdown-card">
                      {/* Identity Card Header */}
                      <div className="portal-dropdown-profile-header">
                        <div className="portal-dropdown-avatar-wrap">
                          <img src={user.avatar} alt={user.name} className="portal-dropdown-avatar" />
                          <span className="portal-avatar-status-dot-large" />
                        </div>
                        <div className="portal-dropdown-profile-meta">
                          <h4 className="portal-dropdown-name">{user.name}</h4>
                          <p className="portal-dropdown-email">{user.email}</p>
                          <div className="portal-dropdown-badges">
                            <span className="portal-dropdown-id-chip">No. ID: {user.studentId}</span>
                            <span className="portal-dropdown-status-chip">Siswa Aktif</span>
                          </div>
                        </div>
                      </div>

                      <div className="portal-dropdown-divider" />

                      {/* Clean EXP & Points Row separated by line separators */}
                      <div className="portal-dropdown-stat-strip">
                        <span className="portal-stat-strip-val">{(user.xp || 2840).toLocaleString("id-ID")} EXP</span>
                        <span className="portal-stat-strip-sep" aria-hidden="true">·</span>
                        <span className="portal-stat-strip-val">{(user.points || 1450).toLocaleString("id-ID")} Pts</span>
                      </div>

                      <div className="portal-dropdown-divider" />

                      {/* Menu List strictly as requested */}
                      <div className="portal-dropdown-links-list">
                        <a
                          href="https://www.dicoding.com/users/r3ndy_ipb"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="portal-dropdown-link-row"
                        >
                          <span className="portal-dropdown-link-icon">
                            <FlatIcon type="user" size={15} />
                          </span>
                          <span className="portal-dropdown-link-label">Profil</span>
                          <span className="portal-external-arrow" aria-hidden="true">↗</span>
                        </a>

                        <a
                          href="https://www.dicoding.com/settings/profile"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="portal-dropdown-link-row"
                        >
                          <span className="portal-dropdown-link-icon">
                            <FlatIcon type="settings" size={15} />
                          </span>
                          <span className="portal-dropdown-link-label">Pengaturan</span>
                          <span className="portal-external-arrow" aria-hidden="true">↗</span>
                        </a>

                        <a
                          href="https://app.dicoding.com/api/legacy-dashboard"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="portal-dropdown-link-row"
                        >
                          <span className="portal-dropdown-link-icon">
                            <FlatIcon type="history" size={15} />
                          </span>
                          <span className="portal-dropdown-link-label">Kembali ke tampilan lama</span>
                          <span className="portal-external-arrow" aria-hidden="true">↗</span>
                        </a>
                      </div>

                      <div className="portal-dropdown-divider" />

                      {/* Logout Action */}
                      <div className="portal-dropdown-footer">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="portal-dropdown-logout-btn"
                        >
                          <FlatIcon type="logout" size={15} color="#EF4444" />
                          <span>Keluar</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
