"use client";

import { Input } from "@/components/ui/input";
import {
  cn,
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
  resetTimer: () => void;
  setTimer: (seconds: number) => void;
  running: boolean;
}

export function CircularTimer({
  secondsLeft,
  totalSeconds,
  preciseSecondsLeft,
  milliseconds,
  pauseTimer,
  resetTimer,
  duration,
  setTimer,
  running,
}: CircularTimerProps) {
  const [largeMode, setLargeMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const radius = useMemo(() => (largeMode ? 200 : 130), [largeMode]);
  const strokeWidth = useMemo(() => (largeMode ? 15 : 11), [largeMode]);
  const svgSize = useMemo(() => radius * 2 + 40, [radius]);
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);

  const progress = useMemo(() => {
    const ratio = Math.max(0, Math.min(1, preciseSecondsLeft / totalSeconds));
    return ratio * circumference;
  }, [preciseSecondsLeft, totalSeconds, circumference]);

  const endTime = useMemo(() => formatEndTime(secondsLeft), [secondsLeft]);

  const handleFocus = useCallback(() => {
    pauseTimer();
    setIsEditing(true);
    setInputValue(formatTime(Math.ceil(secondsLeft)));
  }, [secondsLeft, pauseTimer]);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    if (inputValue.trim()) {
      const total = parseFlexibleTimeInput(inputValue);
      if (total !== null) {
        setTimer(total);
        resetTimer();
      }
    }
  }, [inputValue, resetTimer, setTimer]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Escape") {
      e.currentTarget.blur();
    }
  };

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
        {formatTime(duration)}
        {isEditing ? (
          <Input
            type="text"
            placeholder="00:00:00"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="border-none! bg-transparent! p-0 text-center text-4xl! font-bold shadow-none! focus-visible:border-none! focus-visible:ring-0!"
            autoFocus
          />
        ) : (
          <span
            className="cursor-pointer text-4xl font-bold"
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
