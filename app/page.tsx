"use client";

import { ClockDisplay } from "@/components/home/clock-display";
import FloatingButtons from "@/components/home/floating-buttons";
import { useClockSettings } from "@/context/clock-settings-context";
import { useApplyTheme } from "@/hooks/use-apply-theme";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Clock() {
  const { settings } = useClockSettings();
  const { resolvedTheme } = useTheme();

  useApplyTheme();

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
    <div style={backgroundStyle} className="h-dvh w-full overflow-hidden">
      <main
        className="flex h-full w-full flex-col items-center justify-center gap-3 p-10 text-center"
        style={{
          backdropFilter: `blur(${settings.backgroundImageBlur}px) brightness(${settings.backgroundImageBrightness}) contrast(${settings.backgroundImageContrast}) grayscale(${settings.backgroundImageGrayscale})`,
        }}
      >
        <ClockDisplay />
        <FloatingButtons />
      </main>
    </div>
  );
}
