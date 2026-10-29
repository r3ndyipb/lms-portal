import React from "react";
import PortalHeader from "@/components/PortalHeader";
import AuthShowcase from "@/components/AuthShowcase";
import RegisterForm from "@/components/RegisterForm";
import BlackboxRails from "@/components/BlackboxRails";
import PortalBottomBar from "@/components/PortalBottomBar";

export const metadata = {
  title: "Daftar Akun Portal Belajar — ANVIEO Academy",
  description: "Daftar akun portal belajar ANVIEO Academy untuk memulai jalur akselerasi karir teknologi, hukum bisnis, dan finansial berstandar industri.",
};

export default function RegisterPage() {
  return (
    <div className="portal-page-wrap">
      <PortalHeader currentPage="register" />

      <main className="portal-auth-container">
        <BlackboxRails position="both" />

        <div className="blackbox-frame">
          <div className="portal-auth-grid">
            {/* Left Column: Unboxed Editorial Showcase */}
            <AuthShowcase />

            {/* Right Column: Register Form */}
            <RegisterForm />
          </div>
        </div>
      </main>

      {/* Clean Bottom Bar (Copyright left, Terms/Privacy/Help right) */}
      <PortalBottomBar />
    </div>
  );
}
