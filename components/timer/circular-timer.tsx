"use client";

import { formatTime } from "@/lib/utils";

interface TimerDisplayProps {
  secondsLeft: number;
  totalSeconds: number;
  preciseSecondsLeft: number;
  milliseconds: number;
  color?: string; // e.g. "#22d3ee" or "var(--ring)"
}

export function CircularTimer({
  secondsLeft,
  totalSeconds,
  preciseSecondsLeft,
  // milliseconds,
  color = "var(--ring)",
}: TimerDisplayProps) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  // Clamp progress between 0 and 1
  const progressRatio = Math.max(
    0,
    Math.min(1, preciseSecondsLeft / totalSeconds),
  );
  const progress = progressRatio * circumference;

  return (
    <div className="relative flex flex-col items-center">
      <svg width="200" height="200" className="-rotate-90 transform">
        <circle
          stroke="var(--muted)"
          fill="transparent"
          strokeWidth="10"
          r={radius}
          cx="100"
          cy="100"
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          r={radius}
          cx="100"
          cy="100"
          style={{ transition: "stroke-dashoffset 0.2s linear" }}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute top-1/2 flex -translate-y-1/2 flex-col text-4xl font-bold select-none">
        {formatTime(Math.ceil(secondsLeft))}
        {/* <span className="text-2xl">{milliseconds}</span> */}
      </span>
    </div>
  );
}
