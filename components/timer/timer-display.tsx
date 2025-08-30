"use client";

import { useCallback } from "react";

import { useTimer } from "@/hooks/use-timer";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcuts";
import { CircularTimer } from "./circular-timer";
import { TimerControls } from "./timer-controls";

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

  const toggleStartPause = useCallback(() => {
    if (running) pause();
    else start();
  }, [running, pause, start]);

  useKeyboardShortcut(" ", toggleStartPause);
  useKeyboardShortcut("r", reset);

  return (
    <div className="flex flex-col items-center gap-6">
      <CircularTimer
        secondsLeft={secondsLeft}
        preciseSecondsLeft={preciseSecondsLeft}
        totalSeconds={duration}
        milliseconds={milliseconds}
        pauseTimer={pause}
        startTimer={start}
        resetTimer={reset}
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
