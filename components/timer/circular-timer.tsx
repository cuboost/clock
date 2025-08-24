"use client";

import { cn, formatTime } from "@/lib/utils";
import { useState } from "react";
import { Input } from "../ui/input";
import { Bell } from "lucide-react";

interface TimerDisplayProps {
  secondsLeft: number;
  totalSeconds: number;
  preciseSecondsLeft: number;
  milliseconds: number;
  duration: number;
  pauseTimer: () => void;
  setTimer: (seconds: number) => void;
  running: boolean;
}

export function CircularTimer({
  secondsLeft,
  totalSeconds,
  preciseSecondsLeft,
  milliseconds,
  duration,
  pauseTimer,
  setTimer,
  running,
}: TimerDisplayProps) {
  const [largeMode, setLargeMode] = useState(false);
  const radius = largeMode ? 200 : 130; // bigger in large mode
  const strokeWidth = largeMode ? 15 : 11;
  const svgSize = radius * 2 + 40; // padding around circle
  const circumference = 2 * Math.PI * radius;

  const endTime = formatEndTime(new Date(Date.now() + secondsLeft * 1000));

  function formatEndTime(date: Date) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  const progressRatio = Math.max(
    0,
    Math.min(1, preciseSecondsLeft / totalSeconds),
  );
  const progress = progressRatio * circumference;

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleFocus = () => {
    pauseTimer();
    setIsEditing(true);
    setInputValue(formatTime(Math.ceil(secondsLeft))); // prefill with current
  };

  const handleBlur = () => {
    // Small delay lets other click events finish without losing state prematurely
    setTimeout(() => {
      setIsEditing(false);
      if (inputValue.trim()) {
        const [h, m, s] = inputValue.split(":").map(Number);
        const total = (h || 0) * 3600 + (m || 0) * 60 + (s || 0);
        setTimer(total);
      }
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Escape") {
      e.currentTarget.blur(); // triggers onBlur
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      <svg
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
          className="transition-colors duration-200 ease-in-out"
          style={{ transition: "stroke-dashoffset 0.2s linear" }}
          strokeLinecap="round"
        />
      </svg>

      <span
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
            onFocus={handleFocus}
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
            {formatTime(Math.ceil(secondsLeft))}
          </span>
        )}
        <div className="flex items-center justify-center gap-1">
          <Bell className="h-4 w-4" />
          {endTime}
        </div>
      </span>
    </div>
  );
}
