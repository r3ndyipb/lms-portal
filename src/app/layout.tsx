import type { Metadata, Viewport } from "next";
import { Fraunces, Karla, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Portal Belajar ANVIEO Academy — Student & Learner Portal",
  description: "Portal masuk dan dashboard belajar terstruktur ANVIEO Academy: kurikulum berstandar industri, evaluasi reviewer ahli, dan laboratorium koding.",
  icons: {
    icon: "/logo-light.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A2E52",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-theme="light" data-scroll-behavior="smooth" suppressHydrationWarning className={`${fraunces.variable} ${karla.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('anvieo_theme');
                if (theme) {
                  document.documentElement.setAttribute('data-theme', theme);
                } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="portal-root">
        {children}
      </body>
    </html>
  );
}
