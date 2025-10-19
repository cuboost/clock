"use client";

import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw } from "lucide-react";

interface TimerControlsProps {
  running: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  addTime: (extraSeconds: number) => void;
  setDuration: (seconds: number) => void;
  duration: number;
  secondsLeft: number;
  fullscreen: boolean;
}

const PRESETS = [
  { label: "1 min", seconds: 60 },
  { label: "5 min", seconds: 300 },
  { label: "10 min", seconds: 600 },
];

const INCREMENTS = [
  { label: "+ 15s", seconds: 15 },
  { label: "+ 30s", seconds: 30 },
  { label: "+ 60s", seconds: 60 },
];

export function TimerControls({
  running,
  start,
  pause,
  reset,
  setDuration,
  duration,
  secondsLeft,
  fullscreen,
  addTime,
}: TimerControlsProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <Button
          onClick={running ? pause : start}
          variant="default"
          size={fullscreen ? "lg" : "sm"}
          aria-label={running ? "Pause timer" : "Start timer"}
        >
          {running ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
          {running ? "Pause" : duration === secondsLeft ? "Start" : "Resume"}
        </Button>
        <Button onClick={reset} variant="secondary" aria-label="Reset timer">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-2">
        {!running
          ? PRESETS.map((preset) => (
              <Button
                key={preset.label}
                variant="outline"
                size={fullscreen ? "lg" : "sm"}
                onClick={() => setDuration(preset.seconds)}
              >
                {preset.label}
              </Button>
            ))
          : INCREMENTS.map((inc) => (
              <Button
                key={inc.label}
                variant="outline"
                size={fullscreen ? "lg" : "sm"}
                onClick={() => addTime(inc.seconds)}
              >
                {inc.label}
              </Button>
            ))}
      </div>
    </div>
  );
}
