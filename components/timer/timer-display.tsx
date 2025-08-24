"use client";

import { useCallback } from "react";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcuts";
import { useTimer } from "@/hooks/use-timer";
import { TimerControls } from "./timer-controls";
import { CircularTimer } from "./circular-timer";

export function TimerDisplay() {
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
  } = useTimer(300);

  const handleSpace = useCallback(() => {
    if (running) pause();
    else start();
  }, [running, pause, start]);

  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  //   Keyboard shortcuts
  useKeyboardShortcut(" ", handleSpace);
  useKeyboardShortcut("r", handleReset);

  return (
    <div className="flex flex-col items-center gap-6">
      <CircularTimer
        secondsLeft={secondsLeft}
        preciseSecondsLeft={preciseSecondsLeft}
        totalSeconds={duration}
        milliseconds={milliseconds}
        pauseTimer={pause}
        setTimer={setDuration}
        duration={duration}
        running={running}
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
