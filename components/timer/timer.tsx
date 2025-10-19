"use client";

import { Button } from "@/components/ui/button";
import { useTimer } from "@/hooks/use-timer";
import { Maximize, Minimize, X } from "lucide-react";
import { useCallback, useRef } from "react";
import { CircularTimer } from "./circular-timer";
import { TimerControls } from "./timer-controls";

// Simple beep using Web Audio API
function playBeep() {
  try {
    const ctx = new (window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext!)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = 880;
    g.gain.value = 0.1;
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    setTimeout(() => {
      o.stop();
      ctx.close();
    }, 400);
  } catch {}
}

interface TimerProps {
  initialSeconds: number;
  onRemove: () => void;
  fullscreen: boolean;
  setFullscreen: (fullscreen: boolean) => void;
  timers: { id: number }[];
}

export function Timer({
  initialSeconds,
  onRemove,
  fullscreen,
  setFullscreen,
  timers,
}: TimerProps) {
  const beepedRef = useRef(false);
  const {
    running,
    start,
    pause,
    reset,
    setDuration,
    duration,
    preciseSecondsLeft,
    secondsLeft,
    milliseconds,
  } = useTimer(initialSeconds, () => {
    if (!beepedRef.current) {
      playBeep();
      beepedRef.current = true;
      setTimeout(() => (beepedRef.current = false), 1000);
    }
  });

  const handleRemove = useCallback(() => {
    pause();
    onRemove();
  }, [pause, onRemove]);

  return (
    <div className="relative flex flex-col items-center gap-6 p-4">
      <div className="absolute top-2 right-2 z-20 flex">
        <Button
          onClick={() => setFullscreen(!fullscreen)}
          size="icon"
          variant="ghost"
          className=""
          aria-label="Maximize timer"
        >
          {fullscreen ? (
            <Minimize className="h-4 w-4" />
          ) : (
            <Maximize className="h-4 w-4" />
          )}
        </Button>
        {timers.length > 1 && (
          <Button
            onClick={handleRemove}
            size="icon"
            variant="ghost"
            className=""
            aria-label="Remove timer"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <CircularTimer
        secondsLeft={secondsLeft}
        preciseSecondsLeft={preciseSecondsLeft}
        totalSeconds={duration}
        milliseconds={milliseconds}
        pauseTimer={pause}
        startTimer={start}
        setTimer={setDuration}
        duration={duration}
        running={running}
        fullscreen={fullscreen}
      />
      <TimerControls
        running={running}
        start={start}
        pause={pause}
        reset={reset}
        setDuration={setDuration}
        duration={duration}
        secondsLeft={secondsLeft}
      />
    </div>
  );
}
