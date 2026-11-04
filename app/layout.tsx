import React from "react";
import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import { schoolData } from "@/lib/school-data";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

const siteUrl = `https://${schoolData.school.domain ?? "visual-24-technical-institute.vercel.app"}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: schoolData.seo.defaultTitle,
    template: schoolData.seo.titleTemplate,
  },
  description: schoolData.seo.description,
  icons: {
    icon: "/images/logos/favicon.webp",
    apple: "/images/logos/logo-main.webp",
  },
  verification: {
    google: "googlef17b3180d990c7e1",
  },
};

const themeInitScript = `(function(){try{var k='visual24-theme';var s=localStorage.getItem(k);var d=document.documentElement;var dark=s==='dark'||(s!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);d.classList.toggle('dark',dark);d.style.colorScheme=dark?'dark':'light';}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${schibstedGrotesk.variable} ${martianMono.variable} min-h-screen antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
          suppressHydrationWarning
        />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
