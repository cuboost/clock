import { ClockDisplay } from "@/components/clock-display";
import { SettingsSheet } from "@/components/settings/settings-sheet";

export default function Clock() {
  return (
    <div className="flex flex-col gap-3 items-center justify-center h-dvh p-10 text-center">
      <ClockDisplay />
      <SettingsSheet />
    </div>
  );
}
