import { useClockSettings } from "@/context/clock-settings-context";
import { useClock } from "@/hooks/use-clock";
import { useTabTitle } from "@/hooks/use-tab-title";
import { useThemeColor } from "@/hooks/use-theme-color";
import { positionClasses } from "@/lib/clock-positions";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function ClockDisplay() {
  const time = useClock();
  const { settings, loading } = useClockSettings();
  const clockColor = useThemeColor("clock");
  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const displayDate = formattedDate.replace(",", " -");

  useTabTitle();

  if (loading) return null;

  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center",
        positionClasses[settings.clockPosition],
      )}
    >
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        className={"flex flex-col items-center justify-center gap-2 p-2"}
        style={{
          color: clockColor,
        }}
      >
        <h1
          className="tracking-widest tabular-nums select-none"
          style={{ fontSize: settings.clockSize }}
        >
          {settings.twelveHourFormat ? time.amPmHours : time.hours}:
          {time.minutes}
          {settings.showSeconds && `:${time.seconds}`}
          {settings.showAmPm && ` ${time.amPm}`}
        </h1>

        {settings.showDate && <h2 className="tracking-wider">{displayDate}</h2>}
      </motion.div>
    </div>
  );
}
