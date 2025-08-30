"use client";

import { useClockSettings } from "@/context/clock-settings-context";
import { useTheme } from "next-themes";
import { CSSProperties, useEffect, useState } from "react";

export function useBackgroundStyle() {
  const { settings } = useClockSettings();
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (settings.backgroundType === "image") {
    return {
      backgroundImage: `url(${settings.backgroundImageLink})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    } satisfies CSSProperties;
  }

  if (settings.backgroundType === "gradient") {
    return {
      backgroundImage: settings.backgroundColorValues.light,
    } satisfies CSSProperties;
  }

  if (settings.backgroundType === "color") {
    return {
      backgroundColor:
        resolvedTheme === "light"
          ? settings.backgroundColorValues.light
          : settings.backgroundColorValues.dark,
    } satisfies CSSProperties;
  }

  return { backgroundColor: "#ffffff" } satisfies CSSProperties;
}
