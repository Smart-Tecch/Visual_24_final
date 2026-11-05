"use client";

import LightRays from "@/components/LightRays";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-25">
        <LightRays
          raysOrigin="top-center"
          raysColor="#7c9cf5"
          raysSpeed={0.8}
          lightSpread={0.9}
          rayLength={1.2}
          pulsating={false}
          fadeDistance={1}
          saturation={0.9}
          followMouse
          mouseInfluence={0.08}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
