"use client";

import { ClockDisplay } from "@/components/clock-display";
import { SettingsSheet } from "@/components/settings/settings-sheet";
import { useClockSettings } from "@/context/clock-settings-context";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Clock() {
  const { settings } = useClockSettings();
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Prevent SSR mismatch by not rendering until on client
    return null;
  }

  const backgroundStyle: React.CSSProperties =
    settings.backgroundType === "image"
      ? {
          backgroundImage: `url(${settings.backgroundImageLink})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      : settings.backgroundType === "gradient"
      ? { backgroundImage: settings.backgroundColorValues.light }
      : settings.backgroundType === "color"
      ? {
          backgroundColor:
            resolvedTheme == "light"
              ? settings.backgroundColorValues.light
              : settings.backgroundColorValues.dark,
        }
      : {
          backgroundColor: "#ffffff", // fallback
        };

  return (
    <div style={backgroundStyle} className="h-dvh w-full">
      <main
        className="flex flex-col gap-3 items-center justify-center h-full p-10 text-center w-full"
        style={{
          backdropFilter: `blur(${settings.backgroundImageBlur}px) brightness(${settings.backgroundImageBrightness}) contrast(${settings.backgroundImageContrast}) grayscale(${settings.backgroundImageGrayscale})`,
        }}
      >
        <ClockDisplay />
        <SettingsSheet />
      </main>
    </div>
  );
}
