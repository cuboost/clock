"use client";

import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

interface TimerControlsProps {
  running: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  setDuration: (seconds: number) => void;
  duration: number;
  secondsLeft: number;
}

const PRESETS = [
  { label: "1 min", seconds: 60 },
  { label: "5 min", seconds: 300 },
  { label: "10 min", seconds: 600 },
];

export function TimerControls({
  running,
  start,
  pause,
  reset,
  setDuration,
  duration,
  secondsLeft,
}: TimerControlsProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <Button onClick={running ? pause : start} variant="default">
          {running ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
          {running ? "Pause" : duration == secondsLeft ? "Start" : "Resume"}
        </Button>
        <Button onClick={reset} variant="secondary">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-2">
        {PRESETS.map((preset) => (
          <Button
            key={preset.label}
            variant="outline"
            onClick={() => setDuration(preset.seconds)}
          >
            {preset.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
