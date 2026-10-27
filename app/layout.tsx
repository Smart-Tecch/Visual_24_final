import React from "react";
import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";
import LightRays from "@/components/LightRays";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted_grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian_mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Visual 24",
  description: "A IT & Creative skills school.",
};

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
      <body className="min-h-screen bg-background text-foreground">
        <div className="absolute inset-0 top-0 z[-1] min-h-screen">
          <LightRays
            raysOrigin="top-center-offset"
            raysColor="#00e0ff"
            raysSpeed={1}
            lightSpread={0.9}
            rayLength={1.4}
            followMouse
            mouseInfluence={0.05}
            saturation={1}
            noiseAmount={0.0}
            distortion={0.01}
          />
        </div>
        {children}
      </body>
    </html>
  );
}
