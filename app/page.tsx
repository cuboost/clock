"use client";

import { ClockDisplay } from "@/components/clock-display";
import { SettingsSheet } from "@/components/settings/settings-sheet";
import { useClockSettings } from "@/context/clock-settings-context";

export default function Clock() {
  const { settings } = useClockSettings();

  const backgroundStyle: React.CSSProperties =
    settings.backgroundType === "image"
      ? {
          backgroundImage: `url(${settings.backgroundValue})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      : settings.backgroundType === "gradient"
      ? { backgroundImage: settings.backgroundValue }
      : { backgroundColor: settings.backgroundValue };

  return (
    <div
      style={backgroundStyle}
      className="flex flex-col gap-3 items-center justify-center h-dvh p-10 text-center"
    >
      <ClockDisplay />
      <SettingsSheet />
    </div>
  );
}
