import { useClockSettings } from "@/context/clock-settings-context";
import { useClock } from "@/hooks/use-clock";
import { useTabTitle } from "@/hooks/use-tab-title";
import { useThemeColor } from "@/hooks/use-theme-color";
import { motion } from "framer-motion";

export function ClockDisplay() {
  const time = useClock();
  const { settings, loading } = useClockSettings();
  const clockColor = useThemeColor("clock");
  const displayDate = formattedDate.replace(",", " -");

  useTabTitle();

  if (loading) return null;

  return (
    <motion.div
      layout
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="flex h-full w-full flex-col items-center justify-center gap-2"
      style={{
        color: clockColor,
      }}
    >
      <h1 className="text-5xl tracking-widest select-none">
        {settings.twelveHourFormat ? time.amPmHours : time.hours}:{time.minutes}
        {settings.showSeconds && `:${time.seconds}`}
        {settings.showAmPm && ` ${time.amPm}`}
      </h1>

      {settings.showDate && (
        <h2 className="text-xl tracking-wider">{displayDate}</h2>
      )}
    </motion.div>
  );
}
