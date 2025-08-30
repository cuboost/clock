"use client";

import { useClockSettings } from "@/context/clock-settings-context";
import { useApplyTheme } from "@/hooks/use-apply-theme";
import { useBackgroundStyle } from "@/hooks/use-background-style";

export function BackgroundWrapper({ children }: { children: React.ReactNode }) {
  const { settings } = useClockSettings();
  const backgroundStyle = useBackgroundStyle();

  useApplyTheme();

  if (!backgroundStyle) return null;
  return (
    <div style={backgroundStyle} className="h-dvh w-full overflow-hidden">
      <main
        className="flex h-full w-full flex-col items-center justify-center gap-3 px-2 py-10 text-center md:p-10"
        style={{
          backdropFilter: `blur(${settings.backgroundImageBlur}px) brightness(${settings.backgroundImageBrightness}) contrast(${settings.backgroundImageContrast}) grayscale(${settings.backgroundImageGrayscale})`,
        }}
      >
        {children}
      </main>
    </div>
  );
}
