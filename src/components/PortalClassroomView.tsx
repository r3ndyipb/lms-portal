"use client";

import React, { useState, useEffect, useRef } from "react";
import { FlatIcon } from "./FlatIcon";

interface PortalClassroomViewProps {
  courseTitle?: string;
  onBackToKoridor: () => void;
}

interface ClassroomModuleItem {
  id: string; // e.g. "5.2"
  title: string;
  type: "reading" | "quiz" | "exam";
  duration: string;
  isCompleted: boolean;
}

interface ClassroomChapter {
  id: string;
  title: string;
  isCompleted: boolean;
  modules: ClassroomModuleItem[];
}

export type ClassroomTheme = "adem" | "putih" | "gelap";

interface ThemeColors {
  name: string;
  bg: string;
  surface: string;
  surfaceAlt: string;
  card: string;
  border: string;
  text: string;
  textMuted: string;
  textHeading: string;
  accent: string;
  accentHover: string;
  codeBg: string;
  activeItemBg: string;
  activeItemBorder: string;
  cardBg: string;
  diagramBg: string;
}

const THEME_PALETTES: Record<ClassroomTheme, ThemeColors> = {
  adem: {
    name: "Adem (Terang Adem / LMS Utama)",
    bg: "#FBF8F1", // Warna utama LMS / AUI warm soft cream (Terang Adem, bukan gelap)
    surface: "#FFFFFF",
    surfaceAlt: "#F4EFE6",
    card: "#FFFFFF",
    border: "rgba(10, 46, 82, 0.12)",
    text: "#152232",
    textMuted: "#5C6B7D",
    textHeading: "#0A2E52",
    accent: "#0A2E52",
    accentHover: "#12467A",
    codeBg: "#F4EFE6",
    activeItemBg: "rgba(10, 46, 82, 0.08)",
    activeItemBorder: "#0A2E52",
    cardBg: "#FFFFFF",
    diagramBg: "#FFFFFF",
  },
  putih: {
    name: "Putih (Bersih Modern)",
    bg: "#F8FAFC",
    surface: "#FFFFFF",
    surfaceAlt: "#F1F5F9",
    card: "#FFFFFF",
    border: "#E2E8F0",
    text: "#334155",
    textMuted: "#64748B",
    textHeading: "#0F172A",
    accent: "#0284C7",
    accentHover: "#0369A1",
    codeBg: "#F1F5F9",
    activeItemBg: "rgba(2, 132, 199, 0.12)",
    activeItemBorder: "#0284C7",
    cardBg: "#FFFFFF",
    diagramBg: "#FFFFFF",
  },
  gelap: {
    name: "Gelap (Mode Malam)",
    bg: "#0A0A0C",
    surface: "#111216",
    surfaceAlt: "#181920",
    card: "#15161C",
    border: "rgba(255, 255, 255, 0.12)",
    text: "#E5E7EB",
    textMuted: "#9CA3AF",
    textHeading: "#FFFFFF",
    accent: "#22D3EE",
    accentHover: "#06B6D4",
    codeBg: "#08090C",
    activeItemBg: "rgba(34, 211, 238, 0.14)",
    activeItemBorder: "#22D3EE",
    cardBg: "#15161C",
    diagramBg: "#FFFFFF",
  },
};

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// GARDA AI AVATAR: Sesuai Referensi Gambar Pengguna
// - Lingkaran gelap di tengah dengan pendar hijau zamrud (emerald green glow)
// - Sepasang mata putih berbentuk kapsul vertikal (pill capsules) yang mengikuti mouse
// - Kabut berwarna menyala seperti api bergerak (flame mist: merah-oranye, magenta-ungu, biru, sian)
// ---------------------------------------------------------------------------
export function GardaAiAvatar({
  size = 38,
  pupilOffset,
  isBlinking: propIsBlinking,
}: {
  size?: number;
  pupilOffset?: { x: number; y: number };
  isBlinking?: boolean;
}) {
  const avatarRef = useRef<HTMLDivElement>(null);
  const [internalOffset, setInternalOffset] = useState({ x: 0, y: 0 });
  const [internalBlinking, setInternalBlinking] = useState(false);

  // Mouse tracking: Sepasang mata putih bergerak luwes mengikuti arah mouse
  useEffect(() => {
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!avatarRef.current) return;
        const rect = avatarRef.current.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const dist = Math.hypot(dx, dy);

        // Batas pergerakan mata kapsul putih di dalam lingkaran gelap
        const maxOffsetX = Math.max(2, size * 0.08);
        const maxOffsetY = Math.max(1.8, size * 0.07);

        if (dist === 0) {
          setInternalOffset({ x: 0, y: 0 });
        } else {
          const angle = Math.atan2(dy, dx);
          const pull = Math.min(dist / 45, 1);
          setInternalOffset({
            x: Math.cos(angle) * maxOffsetX * pull,
            y: Math.sin(angle) * maxOffsetY * pull,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [size]);

  // Kedipan alami mata AI
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    const scheduleNextBlink = () => {
      const interval = Math.random() * 2500 + 3200;
      timerId = setTimeout(() => {
        setInternalBlinking(true);
        setTimeout(() => {
          setInternalBlinking(false);
          scheduleNextBlink();
        }, 140);
      }, interval);
    };

    scheduleNextBlink();
    return () => clearTimeout(timerId);
  }, []);

  const activeOffset =
    pupilOffset && (pupilOffset.x !== 0 || pupilOffset.y !== 0)
      ? pupilOffset
      : internalOffset;
  const activeBlinking =
    propIsBlinking !== undefined ? propIsBlinking : internalBlinking;

  // Ukuran proporsional persis sesuai gambar referensi:
  // Ukuran proporsional:
  // Disc tengah solid hitam (~78% dari size) sehingga ada ruang bagi ombak untuk bergulung dan melebar indah
  const discSize = Math.round(size * 0.78);
  // Mata: sepasang kapsul vertikal putih
  const eyeWidth = Math.max(2.4, Math.round(size * 0.09));
  const eyeHeight = Math.max(5, Math.round(size * 0.22));
  const eyeGap = Math.max(2.4, Math.round(size * 0.09));

  // Gradien spektrum berwarna yang lembut dan tipis (sheer chromatic water tint)
  const sheerWaterGradient = `conic-gradient(
    from 215deg,
    rgba(255, 68, 56, 0.44) 0%,
    rgba(255, 122, 0, 0.38) 16%,
    rgba(236, 72, 153, 0.40) 34%,
    rgba(168, 85, 247, 0.44) 50%,
    rgba(59, 130, 246, 0.45) 68%,
    rgba(6, 182, 212, 0.44) 86%,
    rgba(255, 68, 56, 0.44) 100%
  )`;

  return (
    <div
      ref={avatarRef}
      style={{
        position: "relative",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        userSelect: "none",
      }}
    >
      <style>{`
        @keyframes gardaOmbakWave1 {
          0% {
            border-radius: 46% 54% 52% 48% / 53% 47% 53% 47%;
            transform: scale(0.96) rotate(0deg);
            opacity: 0.65;
          }
          50% {
            border-radius: 54% 46% 58% 42% / 46% 54% 44% 56%;
            transform: scale(1.18) rotate(45deg);
            opacity: 0.42;
          }
          100% {
            border-radius: 48% 52% 46% 54% / 54% 46% 52% 48%;
            transform: scale(1.36) rotate(90deg);
            opacity: 0;
          }
        }
        @keyframes gardaOmbakWave2 {
          0% {
            border-radius: 52% 48% 46% 54% / 48% 52% 47% 53%;
            transform: scale(0.96) rotate(120deg);
            opacity: 0.65;
          }
          50% {
            border-radius: 44% 56% 54% 46% / 55% 45% 56% 44%;
            transform: scale(1.18) rotate(165deg);
            opacity: 0.42;
          }
          100% {
            border-radius: 56% 44% 48% 52% / 45% 55% 46% 54%;
            transform: scale(1.36) rotate(210deg);
            opacity: 0;
          }
        }
        @keyframes gardaOmbakWave3 {
          0% {
            border-radius: 48% 52% 54% 46% / 52% 48% 54% 46%;
            transform: scale(0.96) rotate(240deg);
            opacity: 0.65;
          }
          50% {
            border-radius: 56% 44% 46% 54% / 44% 56% 46% 54%;
            transform: scale(1.18) rotate(285deg);
            opacity: 0.42;
          }
          100% {
            border-radius: 46% 54% 52% 48% / 53% 47% 53% 47%;
            transform: scale(1.36) rotate(330deg);
            opacity: 0;
          }
        }
        @keyframes gardaOmbakRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Rim Halus di Bibir Bulatan Hitam */}
      <div
        style={{
          position: "absolute",
          inset: "-1px",
          borderRadius: "50%",
          background: sheerWaterGradient,
          filter: "blur(1.5px)",
          opacity: 0.75,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Ombak 1 (Ocean Wave Swell 1 - Mengembang & Bergulung Asimetris) */}
      <div
        style={{
          position: "absolute",
          inset: "-2px",
          borderRadius: "50%",
          background: sheerWaterGradient,
          filter: "blur(2.5px)",
          opacity: 0,
          animation: "gardaOmbakWave1 3.2s cubic-bezier(0.25, 0.8, 0.25, 1) infinite both, gardaOmbakRotate 14s linear infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Ombak 2 (Ocean Wave Swell 2 - Jeda 1.05s) */}
      <div
        style={{
          position: "absolute",
          inset: "-2px",
          borderRadius: "50%",
          background: sheerWaterGradient,
          filter: "blur(2.5px)",
          opacity: 0,
          animation: "gardaOmbakWave2 3.2s cubic-bezier(0.25, 0.8, 0.25, 1) 1.05s infinite both, gardaOmbakRotate 14s linear infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Ombak 3 (Ocean Wave Swell 3 - Jeda 2.1s) */}
      <div
        style={{
          position: "absolute",
          inset: "-2px",
          borderRadius: "50%",
          background: sheerWaterGradient,
          filter: "blur(2.5px)",
          opacity: 0,
          animation: "gardaOmbakWave3 3.2s cubic-bezier(0.25, 0.8, 0.25, 1) 2.1s infinite both, gardaOmbakRotate 14s linear infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Center Disc: Bulatan warna HITAM pekat murni */}
      <div
        style={{
          position: "relative",
          width: `${discSize}px`,
          height: `${discSize}px`,
          borderRadius: "50%",
          background: "#000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
          overflow: "hidden",
          boxShadow: "0 0 2px rgba(0, 0, 0, 0.9), inset 0 0 2px rgba(255, 255, 255, 0.08)",
        }}
      >
        {/* Subtle Specular Top Sheen */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at 50% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />

        {/* Eyes Pair Container: Bergerak mengikuti arah mouse */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: `${eyeGap}px`,
            transform: `translate(${activeOffset.x}px, ${activeOffset.y}px)`,
            transition: "transform 0.08s cubic-bezier(0.2, 0.8, 0.4, 1)",
            zIndex: 3,
          }}
        >
          {/* Left Eye - Kapsul Putih Tegak (Vertical Pill Capsule) */}
          <div
            style={{
              width: `${eyeWidth}px`,
              height: activeBlinking ? "1.5px" : `${eyeHeight}px`,
              borderRadius: activeBlinking ? "1px" : "999px",
              background: "#FFFFFF",
              boxShadow: "0 0 3px #FFFFFF, 0 0 7px rgba(255, 255, 255, 0.9), 0 0 12px rgba(255, 255, 255, 0.4)",
              transition: "height 0.08s ease, border-radius 0.08s ease, opacity 0.08s ease",
            }}
          />

          {/* Right Eye - Kapsul Putih Tegak (Vertical Pill Capsule) */}
          <div
            style={{
              width: `${eyeWidth}px`,
              height: activeBlinking ? "1.5px" : `${eyeHeight}px`,
              borderRadius: activeBlinking ? "1px" : "999px",
              background: "#FFFFFF",
              boxShadow: "0 0 3px #FFFFFF, 0 0 7px rgba(255, 255, 255, 0.9), 0 0 12px rgba(255, 255, 255, 0.4)",
              transition: "height 0.08s ease, border-radius 0.08s ease, opacity 0.08s ease",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// Forum Topic Item Interface for Dedicated Course Forum
interface CourseForumTopic {
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
  replies: Array<{
    id: string;
    author: string;
    authorRole: "Siswa" | "Mentor" | "Reviewer";
    avatar: string;
    content: string;
    timeAgo: string;
    isAcceptedSolution?: boolean;
  }>;
}

export default function PortalClassroomView({
  courseTitle = "Memulai Pemrograman dengan Python",
  onBackToKoridor,
}: PortalClassroomViewProps) {
  // Theme state: default "adem"
  const [currentTheme, setCurrentTheme] = useState<ClassroomTheme>("adem");
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  // Load saved theme preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("anvieo_classroom_theme") as ClassroomTheme | null;
      if (saved && (saved === "adem" || saved === "putih" || saved === "gelap")) {
        setCurrentTheme(saved);
      }
    }
  }, []);

  const handleChangeTheme = (theme: ClassroomTheme) => {
    setCurrentTheme(theme);
    setShowThemeMenu(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("anvieo_classroom_theme", theme);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node)) {
        setShowThemeMenu(false);
      }
    };
    if (showThemeMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showThemeMenu]);

  // Sidebar state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<"modul" | "catatan">("modul");
  const [selectedModuleId, setSelectedModuleId] = useState<string>("5.2");

  // AI Chat Slider State:
  // "ketika ai di klik sise menu tertutup dan menu chat slider dari kanan muncul, menggeser tampilan ke kiri ini seperti chat, bisa bicara dan bertanya"
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [isAiChatExpanded, setIsAiChatExpanded] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);

  // Full Forum Diskusi State:
  // "di tomnol komunitas siswa / forum ketika di klik menampilkan halaman lain full forum diskusi, pertema misal sekarang sedang buka memulai pemrograman dengan python maka langsung membuaka forum yang membahas materi tersebut"
  const [showForumView, setShowForumView] = useState(false);
  const [selectedForumTopicId, setSelectedForumTopicId] = useState<string | null>(null);
  const [forumSearch, setForumSearch] = useState("");
  const [forumCategoryFilter, setForumCategoryFilter] = useState("Semua Topik");
  const [showNewTopicModal, setShowNewTopicModal] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicCategory, setNewTopicCategory] = useState("Aksi Sekuensial");
  const [newTopicContent, setNewTopicContent] = useState("");
  const [newReplyText, setNewReplyText] = useState("");

  // Notes state
  const [personalNotes, setPersonalNotes] = useState<string>(
    "Catatan Belajar: Compiler menerjemahkan seluruh source code ke machine code sebelum dieksekusi, sedangkan Interpreter menerjemahkan baris demi baris secara dinamis."
  );
  const [noteSavedToast, setNoteSavedToast] = useState(false);

  // Modals & Panels
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [satisfaction, setSatisfaction] = useState<"puas" | "tidak" | null>(null);

  // Interactive Quiz State
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<{ [qIdx: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Garda AI chat state
  const [gardaInput, setGardaInput] = useState("");
  const [gardaChat, setGardaChat] = useState<Array<{ sender: "user" | "garda"; text: string; time: string }>>([
    {
      sender: "garda",
      text: "Halo! Saya Garda AI, asisten belajar AI Anda. Anda bisa bertanya lewat teks atau langsung berbicara menggunakan tombol mikrofon. Ada materi di modul ini yang ingin Anda diskusikan?",
      time: "Baru saja",
    },
  ]);


  // Close AI Chat Slider (re-opens the sidebar menu)
  const handleCloseAiSlider = () => {
    setIsAiChatOpen(false);
    setSidebarCollapsed(false); // Sidebar menu terbuka lagi ketika chat AI ditutup!
  };

  // Open/Toggle AI Chat Slider (closes side menu & slides right drawer in)
  const handleOpenAiSlider = (expand = false) => {
    if (isAiChatOpen && !expand) {
      handleCloseAiSlider();
      return;
    }
    setSidebarCollapsed(true);
    setIsAiChatOpen(true);
    if (expand) setIsAiChatExpanded(true);
  };

  // Voice Speech Recognition Handler ("bisa bicara")
  const handleStartVoice = () => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      try {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = "id-ID";
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setIsListening(false);
          if (transcript) {
            handleSendUserMessage(transcript);
          }
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
        return;
      } catch (err) {
        // Fallback
      }
    }

    // Fallback simulation for offline/unsupported browsers
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      const simulatedVoiceQuestions = [
        "Jelaskan apa perbedaan utama Compiler dan Interpreter di Python",
        "Mengapa Python disebut interpreted language?",
        "Bagaimana cara menghindari SyntaxError pada aksi sekuensial?",
      ];
      const randomQ = simulatedVoiceQuestions[Math.floor(Math.random() * simulatedVoiceQuestions.length)];
      handleSendUserMessage(randomQ);
    }, 2000);
  };

  // Text-to-speech for Garda AI ("bisa bicara dan bertanya")
  const handleSpeakText = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      if (isBotSpeaking) {
        window.speechSynthesis.cancel();
        setIsBotSpeaking(false);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "id-ID";
      utterance.rate = 1.05;
      utterance.onstart = () => setIsBotSpeaking(true);
      utterance.onend = () => setIsBotSpeaking(false);
      utterance.onerror = () => setIsBotSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-Speech tidak didukung pada browser ini.");
    }
  };

  // Send message to Garda AI
  const handleSendUserMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userText = textToSend;
    setGardaInput("");
    setGardaChat((prev) => [...prev, { sender: "user", text: userText, time: "Baru saja" }]);

    setTimeout(() => {
      let reply = `Terkait materi modul ini: "${userText}" — Pada Python, interpreter menerjemahkan instruksi menjadi bytecode secara otomatis saat runtime. Ini membuat eksekusi Python sangat dinamis dan mudah dipelajari!`;
      if (userText.toLowerCase().includes("compiler") || userText.toLowerCase().includes("interpreter")) {
        reply = `Perbedaan utamanya: Compiler membaca seluruh source code dan mengubahnya ke Machine Code file biner sekaligus (seperti C/Go), sedangkan Interpreter (Python) mengeksekusi kode baris demi baris via Python Virtual Machine (PVM).`;
      } else if (userText.toLowerCase().includes("syntax") || userText.toLowerCase().includes("error")) {
        reply = `Untuk mengatasi SyntaxError di Python, periksa indentation (gunakan konsisten 4 spasi), pastikan kurung tutup lengkap (), serta tanda titik dua (:) di akhir statement if/def/class.`;
      }
      setGardaChat((prev) => [...prev, { sender: "garda", text: reply, time: "Baru saja" }]);
    }, 600);
  };

  const handleSendGarda = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    handleSendUserMessage(gardaInput);
  };

  // Course Forum Data - Initial Topics for "Memulai Pemrograman dengan Python"
  const [forumTopics, setForumTopics] = useState<CourseForumTopic[]>([
    {
      id: "top-1",
      title: "Error SyntaxError pada saat eksekusi Python Interpreter di Windows",
      author: "Budi Raharjo",
      authorRole: "Siswa",
      avatar: "/alumni/alumni_2.jpg",
      category: "Compiler & Interpreter",
      snippet: "Saat mencoba menjalankan script hello.py di PowerShell muncul SyntaxError: invalid character in identifier. Apakah ini karena encoding file?",
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
          content: "Halo Budi! Kemungkinan besar ada karakter spasi tak terlihat (non-breaking space) akibat copy-paste dari editor web. Simpan ulang file menggunakan encoding UTF-8 standar di VS Code.",
          timeAgo: "1 jam yang lalu",
          isAcceptedSolution: true,
        },
        {
          id: "rep-2",
          author: "Budi Raharjo",
          authorRole: "Siswa",
          avatar: "/alumni/alumni_2.jpg",
          content: "Terima kasih banyak Pak Rian! Masalah langsung teratasi setelah ubah encoding ke UTF-8.",
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
      snippet: "Apakah Python Bytecode di folder __pycache__ sama dengan file .exe atau machine code biner?",
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
          content: "Berbeda Sarah. Machine code dieksekusi langsung oleh prosesor (CPU), sedangkan Python Bytecode adalah representasi intermediate yang hanya bisa dieksekusi oleh Python Virtual Machine (PVM).",
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
      snippet: "Di modul 5.3 dibahas One-liner. Apakah di industri disarankan membuat kode one-liner atau justru dihindari karena readability?",
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
          content: "Sesuai filosofi Zen of Python: 'Readability counts'. One-liner bagus untuk list comprehension sederhana, tetapi jika logika kompleks tetap disarankan penulisan bertahap agar mudah didebug tim.",
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
      snippet: "Untuk website dinamis yang banyak memuat JavaScript, library apa yang paling cocok dipelajari setelah modul 13.7?",
      repliesCount: 2,
      viewsCount: 76,
      upvotes: 9,
      hasUserUpvoted: false,
      isSolved: false,
      timeAgo: "2 hari yang lalu",
      replies: [],
    },
  ]);

  // Handle upvote in forum
  const handleToggleUpvote = (topicId: string) => {
    setForumTopics((prev) =>
      prev.map((t) => {
        if (t.id === topicId) {
          const isUpvoted = t.hasUserUpvoted;
          return {
            ...t,
            upvotes: isUpvoted ? t.upvotes - 1 : t.upvotes + 1,
            hasUserUpvoted: !isUpvoted,
          };
        }
        return t;
      })
    );
  };

  // Add new topic in forum
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

    setForumTopics([newTopic, ...forumTopics]);
    setNewTopicTitle("");
    setNewTopicContent("");
    setShowNewTopicModal(false);
    setSelectedForumTopicId(newTopic.id);
  };

  // Add reply in forum topic
  const handleAddReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReplyText.trim() || !selectedForumTopicId) return;

    setForumTopics((prev) =>
      prev.map((t) => {
        if (t.id === selectedForumTopicId) {
          const reply = {
            id: `rep-${Date.now()}`,
            author: "Rendy Ariawindana",
            authorRole: "Siswa" as const,
            avatar: "/alumni/alumni_1.jpg",
            content: newReplyText,
            timeAgo: "Baru saja",
          };
          return {
            ...t,
            repliesCount: t.repliesCount + 1,
            replies: [...t.replies, reply],
          };
        }
        return t;
      })
    );
    setNewReplyText("");
  };

  // Curriculum chapters database
  const chapters: ClassroomChapter[] = [
    {
      id: "ch-5",
      title: "AKSI SEKUENSIAL",
      isCompleted: true,
      modules: [
        { id: "5.1", title: "Pengenalan Aksi Sekuensial", type: "reading", duration: "5 mnt", isCompleted: true },
        { id: "5.2", title: "Python Interpreter", type: "reading", duration: "8 mnt", isCompleted: true },
        { id: "5.3", title: "One-liner", type: "reading", duration: "6 mnt", isCompleted: true },
        { id: "5.4", title: "Rangkuman Aksi Sekuensial", type: "reading", duration: "4 mnt", isCompleted: true },
        { id: "5.5", title: "Kuis Aksi Sekuensial", type: "quiz", duration: "10 mnt", isCompleted: true },
      ],
    },
    {
      id: "ch-6",
      title: "CONTROL FLOW",
      isCompleted: true,
      modules: [
        { id: "6.1", title: "Percabangan dan Ternary Operators", type: "reading", duration: "10 mnt", isCompleted: true },
        { id: "6.2", title: "Perulangan (For & While Loop)", type: "reading", duration: "12 mnt", isCompleted: true },
        { id: "6.3", title: "Kuis Control Flow", type: "quiz", duration: "8 mnt", isCompleted: true },
      ],
    },
    {
      id: "ch-13",
      title: "LIBRARY POPULER PADA PYTHON",
      isCompleted: true,
      modules: [
        { id: "13.1", title: "Pengenalan Library", type: "reading", duration: "5 mnt", isCompleted: true },
        { id: "13.2", title: "Library Text Processing", type: "reading", duration: "8 mnt", isCompleted: true },
        { id: "13.3", title: "Library Matematika", type: "reading", duration: "6 mnt", isCompleted: true },
        { id: "13.4", title: "Library Parser", type: "reading", duration: "7 mnt", isCompleted: true },
        { id: "13.5", title: "Library Pengolahan Data", type: "reading", duration: "10 mnt", isCompleted: true },
        { id: "13.6", title: "Library File Management", type: "reading", duration: "6 mnt", isCompleted: true },
        { id: "13.7", title: "Library Web Scraping", type: "reading", duration: "9 mnt", isCompleted: true },
        { id: "13.8", title: "Library Machine Learning", type: "reading", duration: "12 mnt", isCompleted: true },
        { id: "13.9", title: "Library Web Development", type: "reading", duration: "8 mnt", isCompleted: true },
        { id: "13.10", title: "Rangkuman Library Populer pada Python", type: "reading", duration: "5 mnt", isCompleted: true },
        { id: "13.11", title: "Kuis Library Populer pada Python", type: "quiz", duration: "5 mnt", isCompleted: true },
      ],
    },
    {
      id: "ch-14",
      title: "PENUTUP",
      isCompleted: true,
      modules: [
        { id: "14.1", title: "Rangkuman Kelas", type: "reading", duration: "6 mnt", isCompleted: true },
        { id: "14.2", title: "Ujian Akhir", type: "exam", duration: "30 mnt", isCompleted: true },
      ],
    },
  ];

  const allModules = chapters.flatMap((c) => c.modules);
  const currentModuleIndex = allModules.findIndex((m) => m.id === selectedModuleId);
  const currentModule = allModules[currentModuleIndex] || allModules[1];

  const handlePrevModule = () => {
    if (currentModuleIndex > 0) {
      setSelectedModuleId(allModules[currentModuleIndex - 1].id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextModule = () => {
    if (currentModuleIndex < allModules.length - 1) {
      setSelectedModuleId(allModules[currentModuleIndex + 1].id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const sampleQuestions = [
    {
      q: "Library manakah yang paling sering digunakan untuk komputasi numerik dan manipulasi multidimensional array pada Python?",
      options: ["NumPy", "BeautifulSoup", "Flask", "Urllib"],
      correct: 0,
    },
    {
      q: "Untuk melakukan manipulasi data tabular berupa DataFrame dan pembersihan data (data cleaning), library Python yang standar adalah?",
      options: ["Matplotlib", "Pandas", "Scikit-Learn", "PyTest"],
      correct: 1,
    },
    {
      q: "Apa fungsi utama dari library 'Requests' di ekosistem Python?",
      options: ["Membuat antarmuka GUI desktop", "Mengirimkan HTTP request (GET, POST) dengan mudah", "Melakukan visualisasi 3D", "Mengelola database SQL"],
      correct: 1,
    },
    {
      q: "Berapa syarat nilai kelulusan minimal pada Kuis Library Populer pada Python?",
      options: ["50%", "65%", "75%", "100%"],
      correct: 2,
    },
  ];

  const t = THEME_PALETTES[currentTheme];

  // =========================================================================
  // VIEW: FULL FORUM DISKUSI KHUSUS TOPIK KELAS AKTIF (e.g. Memulai Pemrograman dengan Python)
  // =========================================================================
  if (showForumView) {
    const selectedTopic = forumTopics.find((tp) => tp.id === selectedForumTopicId);
    const filteredTopics = forumTopics.filter((tp) => {
      const matchSearch =
        tp.title.toLowerCase().includes(forumSearch.toLowerCase()) ||
        tp.snippet.toLowerCase().includes(forumSearch.toLowerCase());
      if (forumCategoryFilter === "Semua Topik") return matchSearch;
      if (forumCategoryFilter === "Terpecahkan ✓") return matchSearch && tp.isSolved;
      if (forumCategoryFilter === "Belum Terjawab") return matchSearch && tp.repliesCount === 0;
      return matchSearch && tp.category === forumCategoryFilter;
    });

    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: t.bg,
          color: t.text,
          zIndex: 99999,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          fontFamily: "var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
        }}
      >
        {/* Forum Top Navigation Bar */}
        <header
          style={{
            height: "60px",
            background: t.surface,
            borderBottom: `1px solid ${t.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              type="button"
              onClick={() => {
                setShowForumView(false);
                setSelectedForumTopicId(null);
              }}
              style={{
                background: t.surfaceAlt,
                border: `1px solid ${t.border}`,
                color: t.textHeading,
                padding: "8px 14px",
                borderRadius: "6px",
                fontSize: "0.8125rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>←</span>
              <span>Kembali ke Kelas Belajar</span>
            </button>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h1 style={{ fontSize: "1.1rem", fontWeight: 800, color: t.textHeading, margin: 0 }}>
                  Forum Diskusi Komunitas
                </h1>
                <span
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 800,
                    padding: "2px 8px",
                    borderRadius: "4px",
                    background: t.activeItemBg,
                    color: t.accent,
                    border: `1px solid ${t.activeItemBorder}`,
                  }}
                >
                  {courseTitle}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              type="button"
              onClick={() => setShowNewTopicModal(true)}
              style={{
                background: t.accent,
                color: "#FFFFFF",
                border: "none",
                padding: "8px 18px",
                borderRadius: "6px",
                fontSize: "0.8125rem",
                fontWeight: 800,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            >
              <span>+</span>
              <span>Buat Topik Baru</span>
            </button>
          </div>
        </header>

        {/* Forum Main Content Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 24px 60px" }}>
          <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
            {/* If looking at a single thread */}
            {selectedTopic ? (
              <div>
                <button
                  type="button"
                  onClick={() => setSelectedForumTopicId(null)}
                  style={{
                    background: "none",
                    border: "none",
                    color: t.accent,
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    padding: 0,
                    marginBottom: "16px",
                  }}
                >
                  ← Kembali ke Daftar Diskusi
                </button>

                {/* Main Topic Question Card */}
                <div
                  style={{
                    background: t.surface,
                    border: `1px solid ${t.border}`,
                    borderRadius: "10px",
                    padding: "24px",
                    marginBottom: "24px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <span
                      style={{
                        fontSize: "0.6875rem",
                        fontWeight: 800,
                        padding: "2px 8px",
                        borderRadius: "4px",
                        background: t.surfaceAlt,
                        color: t.textMuted,
                      }}
                    >
                      {selectedTopic.category}
                    </span>
                    {selectedTopic.isSolved && (
                      <span
                        style={{
                          fontSize: "0.6875rem",
                          fontWeight: 800,
                          padding: "2px 8px",
                          borderRadius: "4px",
                          background: "rgba(16, 185, 129, 0.15)",
                          color: "#10B981",
                        }}
                      >
                        ✓ Terpecahkan
                      </span>
                    )}
                  </div>

                  <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: t.textHeading, margin: "0 0 16px" }}>
                    {selectedTopic.title}
                  </h2>

                  <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: t.text, marginBottom: "20px" }}>
                    {selectedTopic.snippet}
                  </p>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${t.border}`, paddingTop: "14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <img
                        src={selectedTopic.avatar}
                        alt={selectedTopic.author}
                        style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" }}
                      />
                      <div>
                        <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: t.textHeading }}>
                          {selectedTopic.author}{" "}
                          <span style={{ fontSize: "0.6875rem", color: t.textMuted }}>({selectedTopic.authorRole})</span>
                        </div>
                        <div style={{ fontSize: "0.6875rem", color: t.textMuted }}>Ditanyakan {selectedTopic.timeAgo}</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleUpvote(selectedTopic.id)}
                      style={{
                        background: selectedTopic.hasUserUpvoted ? t.activeItemBg : t.surfaceAlt,
                        border: `1px solid ${selectedTopic.hasUserUpvoted ? t.activeItemBorder : t.border}`,
                        color: selectedTopic.hasUserUpvoted ? t.accent : t.textHeading,
                        padding: "6px 14px",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      ▲ {selectedTopic.upvotes} Bermanfaat
                    </button>
                  </div>
                </div>

                {/* Answers List */}
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: t.textHeading, margin: "0 0 16px" }}>
                  Tanggapan & Solusi ({selectedTopic.replies.length})
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "32px" }}>
                  {selectedTopic.replies.map((reply) => (
                    <div
                      key={reply.id}
                      style={{
                        background: reply.isAcceptedSolution ? "rgba(16, 185, 129, 0.08)" : t.surface,
                        border: `1px solid ${reply.isAcceptedSolution ? "#10B981" : t.border}`,
                        borderRadius: "8px",
                        padding: "18px",
                      }}
                    >
                      {reply.isAcceptedSolution && (
                        <div style={{ fontSize: "0.6875rem", fontWeight: 800, color: "#10B981", marginBottom: "8px" }}>
                          ✓ SOLUSI DITERIMA DARI REVIEWER
                        </div>
                      )}
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                        <img
                          src={reply.avatar}
                          alt={reply.author}
                          style={{ width: "28px", height: "28px", borderRadius: "50%", objectFit: "cover" }}
                        />
                        <div>
                          <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: t.textHeading }}>
                            {reply.author} <span style={{ fontSize: "0.6875rem", color: t.accent }}>({reply.authorRole})</span>
                          </div>
                          <div style={{ fontSize: "0.6875rem", color: t.textMuted }}>{reply.timeAgo}</div>
                        </div>
                      </div>
                      <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: t.text, margin: 0 }}>
                        {reply.content}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Post Answer Box */}
                <form
                  onSubmit={handleAddReply}
                  style={{
                    background: t.surface,
                    border: `1px solid ${t.border}`,
                    borderRadius: "10px",
                    padding: "20px",
                  }}
                >
                  <h4 style={{ fontSize: "0.9375rem", fontWeight: 700, color: t.textHeading, margin: "0 0 10px" }}>
                    Tulis Balasan atau Bantuan Solusi
                  </h4>
                  <textarea
                    rows={4}
                    value={newReplyText}
                    onChange={(e) => setNewReplyText(e.target.value)}
                    placeholder="Berikan penjelasan, potongan kode, atau klarifikasi Anda di sini..."
                    style={{
                      width: "100%",
                      background: t.surfaceAlt,
                      border: `1px solid ${t.border}`,
                      borderRadius: "6px",
                      padding: "12px",
                      color: t.text,
                      fontSize: "0.84375rem",
                      boxSizing: "border-box",
                      marginBottom: "12px",
                      outline: "none",
                    }}
                  />
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      type="submit"
                      style={{
                        background: t.accent,
                        color: "#FFFFFF",
                        border: "none",
                        padding: "8px 20px",
                        borderRadius: "6px",
                        fontSize: "0.8125rem",
                        fontWeight: 800,
                        cursor: "pointer",
                      }}
                    >
                      Kirim Tanggapan ✓
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* Topic List View */
              <div>
                {/* Search & Category Filter */}
                <div style={{ marginBottom: "24px" }}>
                  <div
                    style={{
                      background: t.surface,
                      border: `1px solid ${t.border}`,
                      borderRadius: "8px",
                      padding: "10px 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "14px",
                    }}
                  >
                    <FlatIcon type="search" size={16} color={t.textMuted} />
                    <input
                      type="text"
                      value={forumSearch}
                      onChange={(e) => setForumSearch(e.target.value)}
                      placeholder={`Cari topik diskusi seputar ${courseTitle}...`}
                      style={{
                        flex: 1,
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        color: t.textHeading,
                        fontSize: "0.875rem",
                      }}
                    />
                  </div>

                  {/* Filter Pills */}
                  <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
                    {["Semua Topik", "Aksi Sekuensial", "Compiler & Interpreter", "Library & Modul", "Terpecahkan ✓", "Belum Terjawab"].map(
                      (cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setForumCategoryFilter(cat)}
                          style={{
                            background: forumCategoryFilter === cat ? t.accent : t.surface,
                            color: forumCategoryFilter === cat ? "#FFFFFF" : t.text,
                            border: `1px solid ${forumCategoryFilter === cat ? t.accent : t.border}`,
                            padding: "6px 14px",
                            borderRadius: "20px",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {cat}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Topics Grid/List */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {filteredTopics.map((topic) => (
                    <div
                      key={topic.id}
                      onClick={() => setSelectedForumTopicId(topic.id)}
                      style={{
                        background: t.surface,
                        border: `1px solid ${t.border}`,
                        borderRadius: "10px",
                        padding: "18px 20px",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "16px",
                        transition: "all 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = t.accent;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = t.border;
                      }}
                    >
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" }}>
                          <span
                            style={{
                              fontSize: "0.6875rem",
                              fontWeight: 800,
                              padding: "2px 8px",
                              borderRadius: "4px",
                              background: t.surfaceAlt,
                              color: t.textMuted,
                            }}
                          >
                            {topic.category}
                          </span>
                          {topic.isSolved && (
                            <span
                              style={{
                                fontSize: "0.6875rem",
                                fontWeight: 800,
                                padding: "2px 8px",
                                borderRadius: "4px",
                                background: "rgba(16, 185, 129, 0.15)",
                                color: "#10B981",
                              }}
                            >
                              ✓ Terpecahkan
                            </span>
                          )}
                          <span style={{ fontSize: "0.75rem", color: t.textMuted }}>· {topic.timeAgo}</span>
                        </div>

                        <h3
                          style={{
                            fontSize: "1rem",
                            fontWeight: 700,
                            color: t.textHeading,
                            margin: "0 0 6px",
                            lineHeight: 1.35,
                          }}
                        >
                          {topic.title}
                        </h3>

                        <p
                          style={{
                            fontSize: "0.8125rem",
                            color: t.textMuted,
                            margin: 0,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {topic.snippet}
                        </p>
                      </div>

                      {/* Stats badge */}
                      <div style={{ display: "flex", alignItems: "center", gap: "14px", flexShrink: 0 }}>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: "0.9375rem", fontWeight: 800, color: t.textHeading }}>{topic.upvotes}</div>
                          <div style={{ fontSize: "0.625rem", color: t.textMuted }}>Vote</div>
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: "0.9375rem", fontWeight: 800, color: t.accent }}>{topic.repliesCount}</div>
                          <div style={{ fontSize: "0.625rem", color: t.textMuted }}>Balasan</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Buat Topik Baru */}
        {showNewTopicModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.75)",
              backdropFilter: "blur(6px)",
              zIndex: 100000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "600px",
                background: t.surface,
                border: `1px solid ${t.border}`,
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 800, color: t.textHeading, margin: 0 }}>
                  Buat Topik Diskusi Baru
                </h3>
                <button
                  type="button"
                  onClick={() => setShowNewTopicModal(false)}
                  style={{ background: "none", border: "none", color: t.textMuted, fontSize: "1.1rem", cursor: "pointer" }}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateTopic}>
                <div style={{ marginBottom: "14px" }}>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: t.textMuted, display: "block", marginBottom: "6px" }}>
                    Judul Pertanyaan / Kendala
                  </label>
                  <input
                    type="text"
                    required
                    value={newTopicTitle}
                    onChange={(e) => setNewTopicTitle(e.target.value)}
                    placeholder="Contoh: Mengapa muncul TypeError saat memanggil fungsi math.sqrt()?"
                    style={{
                      width: "100%",
                      background: t.surfaceAlt,
                      border: `1px solid ${t.border}`,
                      borderRadius: "6px",
                      padding: "10px",
                      color: t.textHeading,
                      fontSize: "0.875rem",
                      boxSizing: "border-box",
                      outline: "none",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "14px" }}>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: t.textMuted, display: "block", marginBottom: "6px" }}>
                    Kategori Materi
                  </label>
                  <select
                    value={newTopicCategory}
                    onChange={(e) => setNewTopicCategory(e.target.value)}
                    style={{
                      width: "100%",
                      background: t.surfaceAlt,
                      border: `1px solid ${t.border}`,
                      borderRadius: "6px",
                      padding: "10px",
                      color: t.textHeading,
                      fontSize: "0.875rem",
                      boxSizing: "border-box",
                      outline: "none",
                    }}
                  >
                    <option value="Aksi Sekuensial">Aksi Sekuensial</option>
                    <option value="Compiler & Interpreter">Compiler & Interpreter</option>
                    <option value="Control Flow">Control Flow</option>
                    <option value="Library & Modul">Library & Modul</option>
                    <option value="Kuis & Proyek">Kuis & Proyek</option>
                  </select>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: t.textMuted, display: "block", marginBottom: "6px" }}>
                    Detail Pertanyaan & Potongan Kode
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={newTopicContent}
                    onChange={(e) => setNewTopicContent(e.target.value)}
                    placeholder="Tuliskan kendala Anda secara rinci, langkah yang sudah Anda coba, dan pesan error yang didapatkan..."
                    style={{
                      width: "100%",
                      background: t.surfaceAlt,
                      border: `1px solid ${t.border}`,
                      borderRadius: "6px",
                      padding: "10px",
                      color: t.text,
                      fontSize: "0.84375rem",
                      boxSizing: "border-box",
                      outline: "none",
                      resize: "vertical",
                    }}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={() => setShowNewTopicModal(false)}
                    style={{
                      background: "none",
                      border: `1px solid ${t.border}`,
                      color: t.textMuted,
                      padding: "8px 16px",
                      borderRadius: "6px",
                      fontSize: "0.8125rem",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    style={{
                      background: t.accent,
                      color: "#FFFFFF",
                      border: "none",
                      padding: "8px 20px",
                      borderRadius: "6px",
                      fontSize: "0.8125rem",
                      fontWeight: 800,
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

  // =========================================================================
  // MAIN CLASSROOM VIEW (Materi Belajar + Side Drawer + Right AI Chat Slider)
  // =========================================================================
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        background: t.bg,
        color: t.text,
        zIndex: 99999,
        display: "flex",
        overflow: "hidden",
        fontFamily: "var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
        transition: "background 0.25s ease, color 0.25s ease",
      }}
    >
      <style>{`
        @keyframes orbPulse {
          0% { transform: scale(0.92); opacity: 0.7; filter: blur(4px); }
          50% { transform: scale(1.15); opacity: 0.95; filter: blur(6px); }
          100% { transform: scale(0.92); opacity: 0.7; filter: blur(4px); }
        }
      `}</style>

      {/* =========================================================================
          LEFT COLUMN: Header, Syllabus Reading Workspace, and Sticky Footer
          Pushed and shifted cleanly to the left when Garda AI column appears!
          ========================================================================= */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* =========================================================================
            1. TOP NAVIGATION BAR (Header Classroom)
            ========================================================================= */}
        <header
        style={{
          height: "56px",
          background: t.surface,
          borderBottom: `1px solid ${t.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 18px",
          flexShrink: 0,
          zIndex: 50,
          transition: "background 0.2s ease, border-color 0.2s ease",
        }}
      >
        {/* Left: Kembali ke koridor */}
        <button
          type="button"
          onClick={onBackToKoridor}
          style={{
            background: "none",
            border: "none",
            color: t.textHeading,
            fontSize: "0.875rem",
            fontWeight: 700,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 12px",
            borderRadius: "6px",
            transition: "background 0.15s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = t.surfaceAlt)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
        >
          <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>←</span>
          <span>Kembali ke koridor</span>
        </button>

        {/* Right Action Tools: Search, Streak, Community / Forum, Theme Selector (Gear icon) */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Search bar button */}
          <button
            type="button"
            onClick={() => setShowSearchModal(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: t.surfaceAlt,
              border: `1px solid ${t.border}`,
              borderRadius: "6px",
              padding: "5px 10px",
              color: t.textMuted,
              fontSize: "0.75rem",
              cursor: "pointer",
            }}
            title="Cari Materi Kelas"
          >
            <FlatIcon type="search" size={13} color={t.textMuted} />
            <span style={{ display: "inline-flex", alignItems: "center", gap: "2px", opacity: 0.75 }}>
              <span>⌘</span>
              <span>/</span>
            </span>
          </button>

          {/* Energy / Streak Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "0.8125rem",
              fontWeight: 700,
              color: "#F59E0B",
              padding: "4px 8px",
            }}
            title="Streak Belajar Aktif: 1 Hari"
          >
            <span>⚡</span>
            <span>1</span>
          </div>

          {/* Community / Forum Button: Icon saja tanpa border/bulatan, buka tab baru dengan diskusi materi yang sedang aktif */}
          <button
            type="button"
            onClick={() => {
              window.open(
                `/forum?course=${encodeURIComponent(courseTitle)}&topic=${encodeURIComponent(currentModule.title)}`,
                "_blank"
              );
            }}
            style={{
              background: "transparent",
              border: "none",
              borderRadius: "0",
              padding: "4px",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: t.textHeading,
              lineHeight: 1,
            }}
            title={`Forum Diskusi Materi: ${currentModule.title} (Buka Tab Baru)`}
          >
            <FlatIcon type="users" size={19} color={t.textHeading} />
          </button>

          {/* Settings Gear icon with Theme Dropdown */}
          <div style={{ position: "relative" }} ref={themeMenuRef}>
            <button
              type="button"
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "6px",
                background: showThemeMenu ? t.surfaceAlt : "none",
                border: showThemeMenu ? `1px solid ${t.border}` : "none",
                color: t.textMuted,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              title="Pilihan Tema Tampilan Kelas"
            >
              <span style={{ fontSize: "16px" }}>⚙</span>
            </button>

            {/* Dropdown Menu Pilihan Tema */}
            {showThemeMenu && (
              <div
                style={{
                  position: "absolute",
                  top: "40px",
                  right: "0",
                  width: "220px",
                  background: t.surface,
                  border: `1px solid ${t.border}`,
                  borderRadius: "10px",
                  boxShadow: "0 15px 35px rgba(0, 0, 0, 0.35)",
                  padding: "8px",
                  zIndex: 100,
                }}
              >
                <div
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 800,
                    letterSpacing: "0.06em",
                    color: t.textMuted,
                    textTransform: "uppercase",
                    padding: "4px 8px 8px",
                    borderBottom: `1px solid ${t.border}`,
                    marginBottom: "6px",
                  }}
                >
                  Pilihan Tema Belajar
                </div>

                {/* 1. Adem (Warna Utama LMS - Terang Adem) */}
                <button
                  type="button"
                  onClick={() => handleChangeTheme("adem")}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 10px",
                    borderRadius: "6px",
                    border: "none",
                    background: currentTheme === "adem" ? "rgba(10, 46, 82, 0.1)" : "transparent",
                    color: currentTheme === "adem" ? "#0A2E52" : t.text,
                    fontSize: "0.8125rem",
                    fontWeight: currentTheme === "adem" ? 700 : 500,
                    cursor: "pointer",
                    textAlign: "left",
                    marginBottom: "2px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>🏛️</span>
                    <span>Adem (Warna Utama)</span>
                  </div>
                  {currentTheme === "adem" && <span style={{ color: "#0A2E52", fontWeight: 800 }}>✓</span>}
                </button>

                {/* 2. Putih (Bersih Modern) */}
                <button
                  type="button"
                  onClick={() => handleChangeTheme("putih")}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 10px",
                    borderRadius: "6px",
                    border: "none",
                    background: currentTheme === "putih" ? "rgba(2, 132, 199, 0.12)" : "transparent",
                    color: currentTheme === "putih" ? "#0284C7" : t.text,
                    fontSize: "0.8125rem",
                    fontWeight: currentTheme === "putih" ? 700 : 500,
                    cursor: "pointer",
                    textAlign: "left",
                    marginBottom: "2px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>☀️</span>
                    <span>Putih (Bersih)</span>
                  </div>
                  {currentTheme === "putih" && <span style={{ color: "#0284C7", fontWeight: 800 }}>✓</span>}
                </button>

                {/* 3. Gelap (Mode Malam) */}
                <button
                  type="button"
                  onClick={() => handleChangeTheme("gelap")}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 10px",
                    borderRadius: "6px",
                    border: "none",
                    background: currentTheme === "gelap" ? "rgba(34, 211, 238, 0.14)" : "transparent",
                    color: currentTheme === "gelap" ? "#22D3EE" : t.text,
                    fontSize: "0.8125rem",
                    fontWeight: currentTheme === "gelap" ? 700 : 500,
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>🌙</span>
                    <span>Gelap (Malam)</span>
                  </div>
                  {currentTheme === "gelap" && <span style={{ color: "#22D3EE", fontWeight: 800 }}>✓</span>}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. MAIN CLASSROOM BODY:
          - Left Sidebar (Modul Drawer) - collapses when AI opens
          - Center Stage (Materi Belajar) - shifts/compresses to the left
          - Right AI Chat Slider (Slides in from the right edge, interactive Q&A & Voice)
          ========================================================================= */}
      <div style={{ display: "flex", flex: 1, minHeight: 0, overflow: "hidden" }}>
        {/* -----------------------------------------------------------------------
            LEFT SIDEBAR: MODUL DRAWER
            ----------------------------------------------------------------------- */}
        <aside
          style={{
            width: sidebarCollapsed ? "0px" : "310px",
            background: t.surface,
            borderRight: sidebarCollapsed ? "none" : `1px solid ${t.border}`,
            display: "flex",
            flexDirection: "column",
            transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1), background 0.2s ease",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {/* Sidebar Top: MODUL Header & Collapse Button */}
          <div
            style={{
              padding: "14px 16px 10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: `1px solid ${t.border}`,
            }}
          >
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 800,
                letterSpacing: "0.08em",
                color: t.textMuted,
                textTransform: "uppercase",
              }}
            >
              MODUL
            </span>

            <button
              type="button"
              onClick={() => setSidebarCollapsed(true)}
              style={{
                background: "none",
                border: "none",
                color: t.textMuted,
                cursor: "pointer",
                padding: "4px",
                display: "flex",
                alignItems: "center",
              }}
              title="Ciutkan Sidebar Modul"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="9" y1="3" x2="9" y2="21" />
              </svg>
            </button>
          </div>

          {/* KELAS AKTIF Progress Card */}
          <div
            style={{
              margin: "12px 14px",
              padding: "12px 14px",
              background: t.surfaceAlt,
              border: `1px solid ${t.border}`,
              borderRadius: "8px",
            }}
          >
            <span
              style={{
                fontSize: "0.625rem",
                fontWeight: 800,
                color: t.accent,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "4px",
              }}
            >
              KELAS AKTIF
            </span>

            <h3
              style={{
                fontSize: "0.875rem",
                fontWeight: 700,
                color: t.textHeading,
                margin: "0 0 8px",
                lineHeight: 1.3,
              }}
            >
              {courseTitle}
            </h3>

            <div
              style={{
                height: "4px",
                width: "100%",
                background: "rgba(128, 128, 128, 0.2)",
                borderRadius: "2px",
                overflow: "hidden",
                marginBottom: "6px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  background: `linear-gradient(90deg, ${t.accent} 0%, #10B981 100%)`,
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.6875rem",
                color: t.textMuted,
              }}
            >
              <span>91 / 91 modul</span>
              <span style={{ fontWeight: 700, color: t.accent }}>100%</span>
            </div>
          </div>

          {/* Two Tabs: Daftar Modul / Catatan Belajar */}
          <div
            style={{
              margin: "0 14px 12px",
              padding: "3px",
              background: t.surfaceAlt,
              borderRadius: "6px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4px",
            }}
          >
            <button
              type="button"
              onClick={() => setSidebarTab("modul")}
              style={{
                background: sidebarTab === "modul" ? t.surface : "transparent",
                color: sidebarTab === "modul" ? t.textHeading : t.textMuted,
                border: "none",
                padding: "6px 0",
                fontSize: "0.75rem",
                fontWeight: 700,
                borderRadius: "4px",
                cursor: "pointer",
                boxShadow: sidebarTab === "modul" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                transition: "all 0.15s ease",
              }}
            >
              Daftar Modul
            </button>
            <button
              type="button"
              onClick={() => setSidebarTab("catatan")}
              style={{
                background: sidebarTab === "catatan" ? t.surface : "transparent",
                color: sidebarTab === "catatan" ? t.textHeading : t.textMuted,
                border: "none",
                padding: "6px 0",
                fontSize: "0.75rem",
                fontWeight: 700,
                borderRadius: "4px",
                cursor: "pointer",
                boxShadow: sidebarTab === "catatan" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                transition: "all 0.15s ease",
              }}
            >
              Catatan Belajar
            </button>
          </div>

          {/* Tab 1 Content: Tree List of Chapters & Modules */}
          {sidebarTab === "modul" && (
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                paddingBottom: "40px",
              }}
            >
              {chapters.map((chapter) => (
                <div key={chapter.id} style={{ marginBottom: "16px" }}>
                  <div
                    style={{
                      padding: "8px 16px 6px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.6875rem",
                        fontWeight: 800,
                        color: t.textMuted,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {chapter.title}
                    </span>

                    {chapter.isCompleted && (
                      <span
                        style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          border: "1.5px solid #10B981",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#10B981",
                          fontSize: "10px",
                          fontWeight: 900,
                        }}
                      >
                        ✓
                      </span>
                    )}
                  </div>

                  <div>
                    {chapter.modules.map((m) => {
                      const isActive = m.id === selectedModuleId;

                      return (
                        <div
                          key={m.id}
                          onClick={() => {
                            setSelectedModuleId(m.id);
                            setIsQuizActive(false);
                            setQuizSubmitted(false);
                          }}
                          style={{
                            padding: "8px 16px",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "10px",
                            cursor: "pointer",
                            background: isActive ? t.activeItemBg : "transparent",
                            borderLeft: isActive ? `3px solid ${t.activeItemBorder}` : "3px solid transparent",
                            transition: "background 0.12s ease",
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive) e.currentTarget.style.background = t.surfaceAlt;
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) e.currentTarget.style.background = "transparent";
                          }}
                        >
                          <div
                            style={{
                              width: "16px",
                              height: "16px",
                              borderRadius: "50%",
                              border: "1.5px solid #10B981",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#10B981",
                              fontSize: "10px",
                              fontWeight: 900,
                              flexShrink: 0,
                              marginTop: "2px",
                            }}
                          >
                            ✓
                          </div>

                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div
                              style={{
                                fontSize: "0.8125rem",
                                fontWeight: isActive ? 700 : 500,
                                color: isActive ? t.textHeading : t.text,
                                lineHeight: 1.35,
                              }}
                            >
                              {m.title}
                            </div>
                            <div
                              style={{
                                fontSize: "0.6875rem",
                                color: t.textMuted,
                                marginTop: "2px",
                              }}
                            >
                              {m.id}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2 Content: Catatan Belajar */}
          {sidebarTab === "catatan" && (
            <div style={{ padding: "14px 16px", flex: 1, overflowY: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: t.textHeading }}>Catatan Modul Ini</span>
                <button
                  type="button"
                  onClick={() => {
                    setNoteSavedToast(true);
                    setTimeout(() => setNoteSavedToast(false), 2000);
                  }}
                  style={{
                    background: "#10B981",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "4px",
                    padding: "3px 8px",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Simpan
                </button>
              </div>

              <textarea
                value={personalNotes}
                onChange={(e) => setPersonalNotes(e.target.value)}
                placeholder="Tulis rangkuman atau poin penting yang Anda pelajari di sini..."
                rows={12}
                style={{
                  width: "100%",
                  background: t.surfaceAlt,
                  border: `1px solid ${t.border}`,
                  borderRadius: "6px",
                  color: t.text,
                  fontSize: "0.8125rem",
                  padding: "10px",
                  resize: "vertical",
                  boxSizing: "border-box",
                  lineHeight: 1.5,
                  outline: "none",
                }}
              />

              {noteSavedToast && (
                <div style={{ marginTop: "8px", fontSize: "0.71875rem", color: "#10B981" }}>
                  ✓ Catatan berhasil disimpan ke akun Anda
                </div>
              )}
            </div>
          )}
        </aside>

        {/* Expand Sidebar Floating Tab (if collapsed) */}
        {sidebarCollapsed && !isAiChatOpen && (
          <button
            type="button"
            onClick={() => setSidebarCollapsed(false)}
            style={{
              position: "absolute",
              top: "70px",
              left: "12px",
              background: t.surface,
              border: `1px solid ${t.border}`,
              color: t.textHeading,
              borderRadius: "6px",
              padding: "6px 10px",
              cursor: "pointer",
              zIndex: 30,
              fontSize: "0.75rem",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
            <span>Buka Modul</span>
          </button>
        )}

        {/* -----------------------------------------------------------------------
            CENTER MAIN STAGE: LEARNING MATERIAL VIEWER (Pushed / shifted when AI open)
            ----------------------------------------------------------------------- */}
        <main
          style={{
            flex: 1,
            height: "100%",
            overflowY: "auto",
            position: "relative",
            background: t.bg,
            transition: "background 0.2s ease",
          }}
        >
          <div
            style={{
              maxWidth: "860px",
              margin: "0 auto",
              padding: "40px 32px 50px",
            }}
          >
            {/* CASE A: READING LESSON */}
            {currentModule.type === "reading" && (
              <div>
                <h1
                  style={{
                    fontSize: "2rem",
                    fontWeight: 800,
                    color: t.textHeading,
                    margin: "0 0 24px",
                    lineHeight: 1.25,
                    fontFamily: "var(--font-heading, sans-serif)",
                  }}
                >
                  {currentModule.title}
                </h1>

                <p
                  style={{
                    fontSize: "1.0625rem",
                    lineHeight: 1.75,
                    color: t.text,
                    marginBottom: "20px",
                  }}
                >
                  Python termasuk bahasa pemrograman yang mudah dimengerti oleh manusia karena sintaksnya yang mudah dipahami. Tahukah Anda bahwa proses komputer menjalankan kode yang Anda bangun tidak sesederhana Anda memahaminya?
                </p>

                <p
                  style={{
                    fontSize: "1.0625rem",
                    lineHeight: 1.75,
                    color: t.text,
                    marginBottom: "32px",
                  }}
                >
                  Kode dari program Python yang Anda bangun akan ditransformasi menjadi kode yang mudah dimengerti oleh mesin menggunakan program <em>compiler</em> atau <em>interpreter</em>. <em>Compiler</em> merupakan program yang akan menerjemahkan bahasa pemrograman menjadi bahasa mesin sebelum dijalankan dan menghasilkan output. Ini artinya program yang Anda bangun secara keseluruhan akan diubah terlebih dahulu semuanya menjadi bahasa mesin.
                </p>

                {/* VISUAL DIAGRAM: How Compiler Works */}
                <div
                  style={{
                    background: t.diagramBg,
                    borderRadius: "10px",
                    padding: "36px 24px",
                    margin: "36px 0",
                    border: `1px solid ${t.border}`,
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                  }}
                >
                  <h3
                    style={{
                      textAlign: "center",
                      color: "#1F2937",
                      fontSize: "1.1875rem",
                      fontWeight: 800,
                      margin: "0 0 32px",
                      fontFamily: "var(--font-heading, sans-serif)",
                    }}
                  >
                    How Compiler Works
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexWrap: "wrap",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        background: "#60A5FA",
                        color: "#FFFFFF",
                        fontWeight: 700,
                        fontSize: "0.9375rem",
                        padding: "16px 24px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 6px rgba(96, 165, 250, 0.4)",
                      }}
                    >
                      Source Code
                    </div>

                    <div style={{ color: "#4B5563", fontSize: "1.5rem", fontWeight: 700 }}>
                      →
                    </div>

                    <div
                      style={{
                        background: "#FBBF24",
                        color: "#1F2937",
                        fontWeight: 800,
                        fontSize: "0.9375rem",
                        padding: "16px 28px",
                        borderRadius: "8px",
                        clipPath: "polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)",
                        boxShadow: "0 2px 6px rgba(251, 191, 36, 0.4)",
                      }}
                    >
                      Compiler
                    </div>

                    <div style={{ color: "#4B5563", fontSize: "1.5rem", fontWeight: 700 }}>
                      →
                    </div>

                    <div
                      style={{
                        background: "#34D399",
                        color: "#FFFFFF",
                        fontWeight: 700,
                        fontSize: "0.9375rem",
                        padding: "16px 24px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 6px rgba(52, 211, 153, 0.4)",
                      }}
                    >
                      Machine Code
                    </div>

                    <div style={{ color: "#4B5563", fontSize: "1.5rem", fontWeight: 700 }}>
                      →
                    </div>

                    <div
                      style={{
                        background: "#9CA3AF",
                        color: "#FFFFFF",
                        fontWeight: 700,
                        fontSize: "0.9375rem",
                        padding: "16px 28px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 6px rgba(156, 163, 175, 0.4)",
                      }}
                    >
                      Output
                    </div>
                  </div>
                </div>

                {/* Additional Material & Code Sample */}
                <div
                  style={{
                    background: t.card,
                    border: `1px solid ${t.border}`,
                    borderRadius: "8px",
                    padding: "20px",
                    margin: "28px 0",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 800, color: t.accent, letterSpacing: "0.05em" }}>
                      CONTOH KODE PYTHON
                    </span>
                  </div>
                  <pre
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "0.875rem",
                      color: currentTheme === "putih" ? "#0F172A" : "#E5E7EB",
                      lineHeight: 1.6,
                      background: t.codeBg,
                      border: `1px solid ${t.border}`,
                      padding: "16px",
                      borderRadius: "6px",
                      overflowX: "auto",
                    }}
                  >
                    <code>{`# Python adalah interpreted language (diterjemahkan baris demi baris)
nama = "Dicoding Student"
kelas = "Memulai Pemrograman dengan Python"

print(f"Halo, {nama}! Selamat belajar di kelas {kelas}.")
# PVM (Python Virtual Machine) mengeksekusi bytecode secara instan`}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* CASE B: QUIZ LESSON */}
            {currentModule.type === "quiz" && (
              <div>
                <h1
                  style={{
                    fontSize: "1.875rem",
                    fontWeight: 800,
                    color: t.textHeading,
                    margin: "0 0 20px",
                    lineHeight: 1.25,
                    fontFamily: "var(--font-heading, sans-serif)",
                  }}
                >
                  {currentModule.title}
                </h1>

                <p style={{ fontSize: "1rem", lineHeight: 1.7, color: t.text, marginBottom: "16px" }}>
                  Kuis ini bertujuan untuk menguji pengetahuan Anda tentang materi {currentModule.title.replace("Kuis ", "")}.
                </p>

                <p style={{ fontSize: "1rem", lineHeight: 1.7, color: t.text, marginBottom: "8px" }}>
                  Terdapat 4 pertanyaan yang harus dikerjakan dalam kuis ini. Beberapa ketentuannya sebagai berikut:
                </p>

                <ul style={{ fontSize: "1rem", lineHeight: 1.8, color: t.text, margin: "0 0 20px 20px", padding: 0 }}>
                  <li>Syarat nilai kelulusan : <strong>75%</strong></li>
                  <li>Durasi ujian : <strong>5 menit</strong></li>
                </ul>

                <p style={{ fontSize: "1rem", lineHeight: 1.7, color: t.text, marginBottom: "28px" }}>
                  Apabila tidak memenuhi syarat kelulusan, maka Anda harus menunggu selama 1 menit untuk mengulang pengerjaan kuis kembali. Manfaatkan waktu tunggu tersebut untuk mempelajari kembali materi sebelumnya, ya.
                </p>

                <p style={{ fontSize: "1rem", fontWeight: 700, color: t.textHeading, marginBottom: "24px" }}>
                  Selamat Mengerjakan!
                </p>

                <div style={{ marginBottom: "40px" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsQuizActive(true);
                      setCurrentQuizQuestion(0);
                      setQuizAnswers({});
                      setQuizSubmitted(false);
                    }}
                    style={{
                      background: t.accent,
                      color: "#FFFFFF",
                      border: "none",
                      padding: "10px 24px",
                      borderRadius: "6px",
                      fontWeight: 800,
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      boxShadow: "0 2px 10px rgba(20, 184, 166, 0.3)",
                      transition: "all 0.15s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = t.accentHover)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = t.accent)}
                  >
                    Mulai
                  </button>
                </div>

                {/* Riwayat Table */}
                <div style={{ marginTop: "32px", marginBottom: "40px" }}>
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 800,
                      color: t.textHeading,
                      margin: "0 0 16px",
                    }}
                  >
                    Riwayat
                  </h3>

                  <div
                    style={{
                      background: t.card,
                      border: `1px solid ${t.border}`,
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
                        padding: "12px 18px",
                        background: t.surfaceAlt,
                        borderBottom: `1px solid ${t.border}`,
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: t.textMuted,
                      }}
                    >
                      <div>Tanggal</div>
                      <div>Persentase</div>
                      <div>Status</div>
                      <div>Action</div>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
                        padding: "14px 18px",
                        fontSize: "0.8125rem",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ color: t.text }}>16 Apr 2026 00:20</div>
                      <div style={{ fontWeight: 800, color: t.textHeading }}>100%</div>
                      <div>
                        <span
                          style={{
                            fontSize: "0.6875rem",
                            fontWeight: 800,
                            padding: "2px 8px",
                            borderRadius: "4px",
                            background: "rgba(16, 185, 129, 0.15)",
                            color: "#10B981",
                          }}
                        >
                          Lulus
                        </span>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => alert("Menampilkan rekapitulasi 4 dari 4 jawaban benar!")}
                          style={{
                            background: t.surfaceAlt,
                            border: `1px solid ${t.border}`,
                            color: t.textHeading,
                            padding: "5px 12px",
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          Lihat Detail
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CASE C: EXAM LESSON */}
            {currentModule.type === "exam" && (
              <div>
                <h1 style={{ fontSize: "1.875rem", fontWeight: 800, color: t.textHeading, margin: "0 0 20px" }}>
                  {currentModule.title}
                </h1>
                <p style={{ fontSize: "1rem", lineHeight: 1.7, color: t.text, marginBottom: "20px" }}>
                  Ujian akhir ini mencakup seluruh silabus kelas mulai dari sintaks dasar Python, sekuensial, percabangan, fungsi, hingga library populer.
                </p>
                <div style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid #10B981", padding: "16px 20px", borderRadius: "8px", marginBottom: "32px" }}>
                  <div style={{ fontWeight: 800, color: "#10B981", marginBottom: "4px" }}>Status: Lulus (Skor 95%)</div>
                  <div style={{ fontSize: "0.8125rem", color: t.text }}>Anda telah berhasil menyelesaikan ujian kelulusan kelas ini.</div>
                </div>
              </div>
            )}

            {/* Bottom Navigation Buttons: Sebelumnya & Selanjutnya */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "48px",
                marginBottom: "32px",
                paddingTop: "24px",
                borderTop: `1px solid ${t.border}`,
              }}
            >
              <button
                type="button"
                onClick={handlePrevModule}
                disabled={currentModuleIndex === 0}
                style={{
                  background: t.surfaceAlt,
                  border: `1px solid ${t.border}`,
                  color: currentModuleIndex === 0 ? t.textMuted : t.textHeading,
                  padding: "10px 20px",
                  borderRadius: "6px",
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  cursor: currentModuleIndex === 0 ? "not-allowed" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  opacity: currentModuleIndex === 0 ? 0.6 : 1,
                }}
              >
                <span>←</span>
                <span>Sebelumnya</span>
              </button>

              <button
                type="button"
                onClick={handleNextModule}
                disabled={currentModuleIndex === allModules.length - 1}
                style={{
                  background: t.accent,
                  border: "none",
                  color: "#FFFFFF",
                  padding: "10px 22px",
                  borderRadius: "6px",
                  fontSize: "0.8125rem",
                  fontWeight: 800,
                  cursor: currentModuleIndex === allModules.length - 1 ? "not-allowed" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>Selanjutnya</span>
                <span>→</span>
              </button>
            </div>

            {/* Satisfaction Rating Card */}
            <div
              style={{
                background: t.card,
                border: `1px solid ${t.border}`,
                borderRadius: "8px",
                padding: "24px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: t.textHeading,
                  marginBottom: "16px",
                }}
              >
                Apakah Anda puas dengan modul &ldquo;{currentModule.title}&rdquo;?
              </div>

              <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
                <button
                  type="button"
                  onClick={() => setSatisfaction("puas")}
                  style={{
                    background: satisfaction === "puas" ? "rgba(16, 185, 129, 0.2)" : t.surfaceAlt,
                    border: satisfaction === "puas" ? "1px solid #10B981" : `1px solid ${t.border}`,
                    color: satisfaction === "puas" ? "#10B981" : t.textHeading,
                    padding: "8px 20px",
                    borderRadius: "6px",
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span>👍</span>
                  <span>Puas</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSatisfaction("tidak")}
                  style={{
                    background: satisfaction === "tidak" ? "rgba(239, 68, 68, 0.2)" : t.surfaceAlt,
                    border: satisfaction === "tidak" ? "1px solid #EF4444" : `1px solid ${t.border}`,
                    color: satisfaction === "tidak" ? "#EF4444" : t.textHeading,
                    padding: "8px 20px",
                    borderRadius: "6px",
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span>👎</span>
                  <span>Tidak puas</span>
                </button>
              </div>

              {satisfaction && (
                <div style={{ marginTop: "12px", fontSize: "0.75rem", color: "#10B981" }}>
                  Terima kasih atas masukan Anda untuk kualitas kurikulum ANVIEO LMS!
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* =========================================================================
          3. STICKY BOTTOM FOOTER BAR (Menempel di Bawah, Pojok Kanan AI Button)
          ========================================================================= */}
      <footer
        style={{
          height: "54px",
          background: t.surface,
          borderTop: `1px solid ${t.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          flexShrink: 0,
          zIndex: 50,
          transition: "background 0.2s ease, border-color 0.2s ease",
        }}
      >
        {/* Left: Active Lesson Label & Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
          <span
            style={{
              fontSize: "0.8125rem",
              fontWeight: 700,
              color: t.textHeading,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Modul {currentModule.id} · {currentModule.title}
          </span>
          <span
            style={{
              fontSize: "0.6875rem",
              fontWeight: 800,
              padding: "2px 8px",
              borderRadius: "4px",
              background: "rgba(16, 185, 129, 0.15)",
              color: "#10B981",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              whiteSpace: "nowrap",
            }}
          >
            ✓ Selesai
          </span>
        </div>

        {/* Right Corner (Pojok Kanan): Lebarkan, Layar Penuh, Learning with AI with Orbs & Mouse-Tracking Eyes */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
          {/* 1. Tombol Lebarkan (di sebelah kiri AI, sembunyikan saat chat AI terbuka) */}
          {!isAiChatOpen && (
            <button
              type="button"
              onClick={() => handleOpenAiSlider(true)}
              style={{
                background: "none",
                border: "none",
                color: t.textMuted,
                fontSize: "0.78125rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                padding: "6px 8px",
                borderRadius: "6px",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = t.textHeading;
                e.currentTarget.style.background = t.surfaceAlt;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = t.textMuted;
                e.currentTarget.style.background = "none";
              }}
              title="Lebarkan Panel AI Chat Copilot"
            >
              <span>^</span>
              <span>Lebarkan</span>
            </button>
          )}

          {/* 2. Tombol Layar Penuh (di sebelah kiri AI) */}
          <button
            type="button"
            onClick={handleToggleFullscreen}
            style={{
              background: "none",
              border: "none",
              color: t.textMuted,
              fontSize: "0.78125rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "6px 8px",
              borderRadius: "6px",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = t.textHeading;
              e.currentTarget.style.background = t.surfaceAlt;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = t.textMuted;
              e.currentTarget.style.background = "none";
            }}
            title="Mode Belajar Layar Penuh"
          >
            <span>⛶</span>
            <span>Layar Penuh</span>
          </button>

          {/* 3. Animasi Garda AI di Pojok Kanan (Cukup animasi saja, tanpa bentuk tombol & tanpa tulisan, hide saat chat terbuka) */}
          {!isAiChatOpen && (
            <button
              type="button"
              onClick={() => handleOpenAiSlider(false)}
              style={{
                background: "none",
                border: "none",
                padding: "2px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                transition: "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
                outline: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
              title="Buka Garda AI"
              aria-label="Buka Garda AI"
            >
              <GardaAiAvatar size={36} />
            </button>
          )}
        </div>
      </footer>
    </div>

    {/* =========================================================================
        RIGHT COLUMN: FULL-HEIGHT GARDA AI SLIDER (Full Column 100vh di Kanan)
        "slider ai harus nya kolom tersendiri di kanan menggeser header, konten utama dan footer juga full kolom kanan"
        ========================================================================= */}
    {isAiChatOpen && (
      <aside
        style={{
          width: isAiChatExpanded ? "50%" : "380px",
          height: "100vh",
          background: t.surface,
          borderLeft: `1px solid ${t.border}`,
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          zIndex: 50,
          transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1), background 0.2s ease",
          boxShadow: "-4px 0 20px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Header Garda AI */}
        <div
          style={{
            padding: "14px 18px",
            background: t.surfaceAlt,
            borderBottom: `1px solid ${t.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <GardaAiAvatar size={32} />
            <div>
              <div style={{ fontSize: "0.9375rem", fontWeight: 800, color: t.textHeading }}>
                Garda AI
              </div>
              <div style={{ fontSize: "0.6875rem", color: "#10B981" }}>
                ● Asisten Belajar AI · Modul {selectedModuleId}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {/* Button Expand/Contract Width - ICON ONLY, NO WORDING */}
            <button
              type="button"
              onClick={() => setIsAiChatExpanded(!isAiChatExpanded)}
              style={{
                background: t.surface,
                border: `1px solid ${t.border}`,
                color: t.textHeading,
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                padding: 0,
                transition: "all 0.15s ease",
              }}
              title={isAiChatExpanded ? "Perkecil panel (380px)" : "Perlebar panel (50% layar)"}
            >
              {isAiChatExpanded ? "⤡" : "⤢"}
            </button>

            {/* Close Slider - ICON ONLY */}
            <button
              type="button"
              onClick={handleCloseAiSlider}
              style={{
                background: "none",
                border: "none",
                color: t.textMuted,
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                padding: 0,
                lineHeight: 1,
                transition: "color 0.15s ease",
              }}
              title="Tutup Garda AI"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Chat Stream Area */}
        <div
          style={{
            flex: 1,
            padding: "16px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {gardaChat.map((msg, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                maxWidth: "90%",
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                flexDirection: msg.sender === "user" ? "row-reverse" : "row",
              }}
            >

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: msg.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    background: msg.sender === "user" ? t.accent : t.surfaceAlt,
                    border: msg.sender === "user" ? "none" : `1px solid ${t.border}`,
                    borderRadius: msg.sender === "user" ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
                    padding: "10px 14px",
                    fontSize: "0.8125rem",
                    lineHeight: 1.5,
                    color: msg.sender === "user" ? "#FFFFFF" : t.text,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                  }}
                >
                  {msg.text}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                  <span style={{ fontSize: "0.625rem", color: t.textMuted }}>{msg.time}</span>
                  {msg.sender === "garda" && (
                    <button
                      type="button"
                      onClick={() => handleSpeakText(msg.text)}
                      style={{
                        background: "none",
                        border: "none",
                        color: isBotSpeaking ? "#10B981" : t.textMuted,
                        cursor: "pointer",
                        fontSize: "0.75rem",
                        padding: "2px",
                      }}
                      title={isBotSpeaking ? "Hentikan Suara" : "Dengarkan Jawaban (Suara)"}
                    >
                      {isBotSpeaking ? "🔊 Berhenti" : "🔈 Bicara"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Voice Listening Active Indicator Banner */}
        {isListening && (
          <div
            style={{
              padding: "8px 16px",
              background: "rgba(239, 68, 68, 0.15)",
              borderTop: `1px solid rgba(239, 68, 68, 0.3)`,
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#EF4444",
            }}
          >
            <span style={{ fontSize: "1rem" }}>🎙️</span>
            <span style={{ fontSize: "0.78125rem", fontWeight: 700 }}>
              Mendengarkan suara Anda... Silakan berbicara sekarang...
            </span>
          </div>
        )}

        {/* Quick Prompt Pills */}
        <div style={{ padding: "0 12px 8px", display: "flex", gap: "6px", overflowX: "auto" }}>
          <button
            type="button"
            onClick={() => handleSendUserMessage("Jelaskan perbedaan Compiler dan Interpreter secara ringkas")}
            style={{
              background: t.surfaceAlt,
              border: `1px solid ${t.border}`,
              color: t.accent,
              padding: "4px 8px",
              borderRadius: "12px",
              fontSize: "0.6875rem",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            💡 Compiler vs Interpreter
          </button>
          <button
            type="button"
            onClick={() => handleSendUserMessage("Beri contoh kode aksi sekuensial sederhana")}
            style={{
              background: t.surfaceAlt,
              border: `1px solid ${t.border}`,
              color: t.accent,
              padding: "4px 8px",
              borderRadius: "12px",
              fontSize: "0.6875rem",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            📝 Contoh Kode
          </button>
        </div>

        {/* Chat Input & Microphone Button ("bisa bicara dan bertanya") */}
        <form
          onSubmit={handleSendGarda}
          style={{
            padding: "10px 14px",
            background: t.surfaceAlt,
            borderTop: `1px solid ${t.border}`,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {/* Microphone Button (Voice Speech Input) */}
          <button
            type="button"
            onClick={handleStartVoice}
            style={{
              background: isListening ? "#EF4444" : t.surface,
              border: `1px solid ${isListening ? "#EF4444" : t.border}`,
              color: isListening ? "#FFFFFF" : t.accent,
              borderRadius: "50%",
              width: "34px",
              height: "34px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "15px",
              flexShrink: 0,
              transition: "all 0.15s ease",
              boxShadow: isListening ? "0 0 10px rgba(239, 68, 68, 0.5)" : "none",
            }}
            title="Bicara dengan Suara (Voice Input)"
          >
            🎙
          </button>

          <input
            type="text"
            value={gardaInput}
            onChange={(e) => setGardaInput(e.target.value)}
            placeholder="Tanya atau bicara ke Garda AI..."
            style={{
              flex: 1,
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: "20px",
              padding: "8px 14px",
              color: t.textHeading,
              fontSize: "0.8125rem",
              outline: "none",
            }}
          />

          <button
            type="submit"
            style={{
              background: t.accent,
              color: "#FFFFFF",
              border: "none",
              borderRadius: "50%",
              width: "34px",
              height: "34px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              flexShrink: 0,
            }}
            title="Kirim Pertanyaan"
          >
            ↑
          </button>
        </form>
      </aside>
    )}

      {/* =========================================================================
          4. MODAL: QUIZ SIMULATOR
          ========================================================================= */}
      {isQuizActive && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(6px)",
            zIndex: 100000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "650px",
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: "12px",
              padding: "28px",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5)",
            }}
          >
            {!quizSubmitted ? (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, color: t.accent, letterSpacing: "0.05em" }}>
                    PERTANYAAN {currentQuizQuestion + 1} DARI {sampleQuestions.length}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#F59E0B", fontWeight: 700 }}>
                    ⏱ Sisa Waktu: 04:45
                  </span>
                </div>

                <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: t.textHeading, marginBottom: "20px", lineHeight: 1.4 }}>
                  {sampleQuestions[currentQuizQuestion].q}
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
                  {sampleQuestions[currentQuizQuestion].options.map((opt, oIdx) => {
                    const isSelected = quizAnswers[currentQuizQuestion] === oIdx;
                    return (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => setQuizAnswers({ ...quizAnswers, [currentQuizQuestion]: oIdx })}
                        style={{
                          textAlign: "left",
                          padding: "12px 16px",
                          borderRadius: "8px",
                          background: isSelected ? t.activeItemBg : t.surfaceAlt,
                          border: isSelected ? `1.5px solid ${t.activeItemBorder}` : `1px solid ${t.border}`,
                          color: isSelected ? t.textHeading : t.text,
                          fontSize: "0.875rem",
                          fontWeight: isSelected ? 700 : 500,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <span
                          style={{
                            width: "22px",
                            height: "22px",
                            borderRadius: "50%",
                            border: isSelected ? `2px solid ${t.accent}` : `1px solid ${t.border}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            color: isSelected ? t.accent : t.textMuted,
                          }}
                        >
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button
                    type="button"
                    onClick={() => setCurrentQuizQuestion((prev) => Math.max(0, prev - 1))}
                    disabled={currentQuizQuestion === 0}
                    style={{
                      background: "none",
                      border: "none",
                      color: currentQuizQuestion === 0 ? t.textMuted : t.textHeading,
                      cursor: currentQuizQuestion === 0 ? "not-allowed" : "pointer",
                      fontSize: "0.8125rem",
                      fontWeight: 700,
                    }}
                  >
                    ← Sebelumnya
                  </button>

                  {currentQuizQuestion < sampleQuestions.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentQuizQuestion((prev) => prev + 1)}
                      style={{
                        background: t.accent,
                        color: "#FFFFFF",
                        border: "none",
                        padding: "8px 20px",
                        borderRadius: "6px",
                        fontSize: "0.8125rem",
                        fontWeight: 800,
                        cursor: "pointer",
                      }}
                    >
                      Selanjutnya →
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        let correctCount = 0;
                        sampleQuestions.forEach((q, idx) => {
                          if (quizAnswers[idx] === q.correct) correctCount++;
                        });
                        const calculated = Math.round((correctCount / sampleQuestions.length) * 100);
                        setQuizScore(calculated);
                        setQuizSubmitted(true);
                      }}
                      style={{
                        background: "#10B981",
                        color: "#FFFFFF",
                        border: "none",
                        padding: "8px 22px",
                        borderRadius: "6px",
                        fontSize: "0.8125rem",
                        fontWeight: 800,
                        cursor: "pointer",
                      }}
                    >
                      Kirim Jawaban Kuis ✓
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>
                  {quizScore !== null && quizScore >= 75 ? "🎉" : "💪"}
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: t.textHeading, margin: "0 0 8px" }}>
                  {quizScore !== null && quizScore >= 75 ? "Selamat! Anda Lulus Kuis" : "Belum Lulus, Semangat!"}
                </h3>
                <div style={{ fontSize: "2rem", fontWeight: 900, color: quizScore !== null && quizScore >= 75 ? "#10B981" : "#EF4444", marginBottom: "8px" }}>
                  {quizScore}%
                </div>
                <p style={{ fontSize: "0.875rem", color: t.textMuted, marginBottom: "24px" }}>
                  Syarat kelulusan kuis adalah 75%. Hasil kuis Anda telah dicatat ke riwayat pembelajaran.
                </p>
                <button
                  type="button"
                  onClick={() => setIsQuizActive(false)}
                  style={{
                    background: t.accent,
                    color: "#FFFFFF",
                    border: "none",
                    padding: "10px 24px",
                    borderRadius: "6px",
                    fontWeight: 800,
                    fontSize: "0.875rem",
                    cursor: "pointer",
                  }}
                >
                  Kembali ke Materi Kuis
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          5. MODAL: SEARCH MATERIAL
          ========================================================================= */}
      {showSearchModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(4px)",
            zIndex: 100000,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: "100px",
          }}
          onClick={() => setShowSearchModal(false)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "520px",
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: "10px",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: "14px 16px", borderBottom: `1px solid ${t.border}`, display: "flex", alignItems: "center", gap: "10px" }}>
              <FlatIcon type="search" size={16} color={t.textMuted} />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari modul atau topik pembelajaran..."
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: t.textHeading,
                  fontSize: "0.875rem",
                }}
              />
            </div>

            <div style={{ maxHeight: "300px", overflowY: "auto", padding: "8px 0" }}>
              {allModules
                .filter((m) => m.title.toLowerCase().includes(searchQuery.toLowerCase()) || m.id.includes(searchQuery))
                .slice(0, 6)
                .map((m) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      setSelectedModuleId(m.id);
                      setShowSearchModal(false);
                    }}
                    style={{
                      padding: "10px 18px",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = t.surfaceAlt)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <div>
                      <div style={{ fontSize: "0.8125rem", color: t.textHeading, fontWeight: 600 }}>{m.title}</div>
                      <div style={{ fontSize: "0.6875rem", color: t.textMuted }}>Modul {m.id} · {m.type}</div>
                    </div>
                    <span style={{ fontSize: "0.75rem", color: t.accent }}>Buka →</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
