"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme, type ThemeChoice } from "@/components/ThemeProvider";
import { cn } from "cn";

const options: { value: ThemeChoice; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

type ThemeToggleProps = {
  className?: string;
  overlay?: boolean;
};

export default function ThemeToggle({ className, overlay }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={cn(
        "inline-flex rounded-full border p-0.5",
        overlay
          ? "border-white/30 bg-black/20"
          : "border-border bg-card/80",
        className,
      )}
      role="group"
      aria-label="Color theme"
    >
      {options.map(({ value, label, icon: Icon }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            className={cn(
              "inline-flex size-8 items-center justify-center rounded-full transition",
              active
                ? overlay
                  ? "bg-white text-dark-100"
                  : "bg-primary text-primary-foreground"
                : overlay
                  ? "text-white/80 hover:text-white"
                  : "text-muted-foreground hover:text-foreground",
            )}
            aria-pressed={active}
            aria-label={label}
            title={label}
          >
            <Icon className="size-4" />
          </button>
        );
      })}
    </div>
  );
}
