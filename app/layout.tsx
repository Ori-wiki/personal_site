import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Denis Kazakov | Frontend Developer",
  description: "Personal portfolio website for a frontend developer.",
};

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
      <body className="min-h-full flex flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var sectionIds = ["top", "about", "skills", "work", "contact"];
                var hash = window.location.hash ? window.location.hash.slice(1) : "top";
                var index = Math.max(sectionIds.indexOf(hash), 0);
                document.documentElement.dataset.activeSection = String(index);
                document.documentElement.style.setProperty("--initial-section-offset", "-" + (index * 100) + "vh");
                if ("scrollRestoration" in history) {
                  history.scrollRestoration = "manual";
                }
                window.scrollTo(0, 0);
              })();
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
