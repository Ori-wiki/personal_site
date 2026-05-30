import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import {
  activeSectionClasses,
  directionClasses,
  phaseClasses,
  previousSectionClasses,
  sectionIds,
} from "./navigation/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://dvlpr.dev",
  ),
  applicationName: "Denis Kazakov",
  authors: [{ name: "Denis Kazakov" }],
  creator: "Denis Kazakov",
  keywords: [
    "Denis Kazakov",
    "Denis Kazakov",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
  ],
  title: {
    default: "Denis Kazakov | Frontend Developer",
    template: "%s | Denis Kazakov",
  },
  description:
    "Frontend developer portfolio by Denis Kazakov, focused on React, Next.js, TypeScript, motion and polished web interfaces.",
  openGraph: {
    title: "Denis Kazakov | Frontend Developer",
    description:
      "Frontend developer portfolio focused on React, Next.js, TypeScript, motion and polished web interfaces.",
    siteName: "Denis Kazakov Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Denis Kazakov | Frontend Developer",
    description:
      "Frontend developer portfolio focused on React, Next.js, TypeScript, motion and polished web interfaces.",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#121318",
};

const initActiveSectionScript = `
  (function () {
    const sectionIds = ${JSON.stringify(sectionIds)};
    const activeSectionClasses = ${JSON.stringify(activeSectionClasses)};
    const previousSectionClasses = ${JSON.stringify(previousSectionClasses)};
    const directionClasses = ${JSON.stringify(directionClasses)};
    const phaseClasses = ${JSON.stringify(phaseClasses)};
    const hash = window.location.hash ? window.location.hash.slice(1) : "top";
    const index = Math.max(sectionIds.indexOf(hash), 0);
    document.documentElement.dataset.activeSection = String(index);
    document.documentElement.classList.remove(
      ...activeSectionClasses,
      ...previousSectionClasses,
      ...directionClasses,
      ...phaseClasses
    );
    document.documentElement.classList.add(
      "active-section-" + index,
      "previous-section-" + index,
      "section-direction-down"
    );
    if (index === 1) {
      document.documentElement.classList.add("phase-about-intro", "about-intro-shown");
    }
    if (index === 2) {
      document.documentElement.classList.add("phase-skills-intro");
    }
    document.documentElement.style.setProperty("--initial-section-offset", "-" + (index * 100) + "vh");
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Script id="init-active-section" strategy="beforeInteractive">
          {initActiveSectionScript}
        </Script>
        {children}
      </body>
    </html>
  );
}
