"use client";

import { Input } from "@/components/ui/input";
import {
  cn,
  formatDuration,
  formatEndTime,
  formatTime,
  parseFlexibleTimeInput,
} from "@/lib/utils";
import { Bell } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { motion } from "motion/react";

interface CircularTimerProps {
  secondsLeft: number;
  totalSeconds: number;
  preciseSecondsLeft: number;
  milliseconds: number;
  duration: number;
  pauseTimer: () => void;
  startTimer: () => void;
  setTimer: (seconds: number) => void;
  running: boolean;
}

export function CircularTimer({
  secondsLeft,
  totalSeconds,
  preciseSecondsLeft,
  milliseconds,
  pauseTimer,
  duration,
  setTimer,
  running,
}: CircularTimerProps) {
  const [largeMode, setLargeMode] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [inputValue, setInputValue] = useState("00:05:00");

  const radius = useMemo(() => (largeMode ? 200 : 130), [largeMode]);
  const strokeWidth = useMemo(() => (largeMode ? 15 : 11), [largeMode]);
  const svgSize = useMemo(() => radius * 2 + 40, [radius]);
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);

  const progress = useMemo(() => {
    const ratio = Math.max(0, Math.min(1, preciseSecondsLeft / totalSeconds));
    return ratio * circumference;
  }, [preciseSecondsLeft, totalSeconds, circumference]);

  const endTime = useMemo(() => formatEndTime(secondsLeft), [secondsLeft]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, ""); // Keep only numbers

    // Limit to 6 digits
    if (raw.length > 6) raw = raw.slice(-6);

    // Right-align digits
    raw = raw.padStart(6, "0");

    // Format as HH:MM:SS
    const formatted = `${raw.slice(0, 2)}:${raw.slice(2, 4)}:${raw.slice(4, 6)}`;

    setInputValue(formatted);

    // Ensure the cursor is at the end
    // Use setTimeout(0) or requestAnimationFrame to run after render
    setTimeout(() => {
      const input = e.target;
      input.setSelectionRange(formatted.length, formatted.length);
    }, 0);
  }, []);

  const handleFocus = useCallback(() => {
    pauseTimer();
    setIsEditing(true);

    // Always prefill as HH:MM:SS
    const raw = Math.max(0, secondsLeft);
    const hours = String(Math.floor(raw / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((raw % 3600) / 60)).padStart(2, "0");
    const seconds = String(raw % 60).padStart(2, "0");

    setInputValue(`${hours}:${minutes}:${seconds}`);
  }, [secondsLeft, pauseTimer]);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    if (inputValue.trim()) {
      const total = parseFlexibleTimeInput(inputValue);
      if (total !== null) {
        setTimer(total);
      }
    }
  }, [inputValue, setTimer]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === "Escape") {
        e.currentTarget.blur();
      }
    },
    [],
  );

  return (
    <motion.div
      transition={{
        type: "spring",
      }}
      className="relative flex flex-col items-center select-none"
      onClick={() => {
        if (!isEditing) {
          setLargeMode(!largeMode);
        }
      }}
    >
      <motion.svg
        width={svgSize}
        height={svgSize}
        className="-rotate-90 transform"
        style={largeMode ? { width: "100%", height: "100%" } : {}}
      >
        <circle
          stroke="var(--muted)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={svgSize / 2}
          cy={svgSize / 2}
        />
        <circle
          stroke={running ? "var(--primary)" : "var(--muted-foreground)"}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          r={radius}
          cx={svgSize / 2}
          cy={svgSize / 2}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.2s linear" }}
        />
      </motion.svg>
      <div
        className={cn(
          "absolute top-1/2 flex h-full -translate-y-1/2 flex-col justify-evenly py-5 tabular-nums select-none",
          running ? "text-primary" : "text-muted-foreground",
        )}
      >
        {formatDuration(duration)}
        {isEditing ? (
          <Input
            type="text"
            placeholder="00:00:00"
            value={inputValue}
            onChange={onChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="border-none! bg-transparent! p-0 text-center text-4xl! font-bold tabular-nums shadow-none! focus-visible:border-none! focus-visible:ring-0!"
            autoFocus
          />
        ) : (
          <span
            className="cursor-pointer text-4xl leading-9! font-bold"
            tabIndex={0}
            onClick={handleFocus}
            onFocus={handleFocus}
          >
            {formatTime(
              Math.floor(preciseSecondsLeft),
              milliseconds,
              false,
              false,
            )}
          </span>
        )}
        <div className="flex items-center justify-center gap-1">
          <Bell className="h-4 w-4" />
          {endTime}
        </div>
      </div>
    </motion.div>
  );
}
