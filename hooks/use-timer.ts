import { useCallback, useRef, useState } from "react";

export function useTimer(initialSeconds: number = 60, onComplete?: () => void) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const totalSecondsRef = useRef(initialSeconds);
  const endTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  // NEW: Track float seconds for smooth progress
  const [preciseSecondsLeft, setPreciseSecondsLeft] = useState(initialSeconds);

  const stopRAF = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    endTimeRef.current = null;
  }, []);

  const tick = useCallback(() => {
    if (!endTimeRef.current) return;
    const now = performance.now();
    const msLeft = Math.max(0, endTimeRef.current - now);
    const sLeft = msLeft / 1000;
    setPreciseSecondsLeft(sLeft);
    setSecondsLeft(Math.ceil(sLeft));
    if (msLeft <= 0) {
      stopRAF();
      setRunning(false);
      onComplete?.();
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [onComplete, stopRAF]);

  const start = useCallback(() => {
    if (running || secondsLeft <= 0) return;
    endTimeRef.current = performance.now() + secondsLeft * 1000;
    setRunning(true);
    rafRef.current = requestAnimationFrame(tick);
  }, [running, secondsLeft, tick]);

  const pause = useCallback(() => {
    if (!running) return;
    if (endTimeRef.current) {
      const msLeft = Math.max(0, endTimeRef.current - performance.now());
      setPreciseSecondsLeft(msLeft / 1000);
      setSecondsLeft(Math.ceil(msLeft / 1000));
    }
    setRunning(false);
    stopRAF();
  }, [running, stopRAF]);

  const reset = useCallback(() => {
    stopRAF();
    setPreciseSecondsLeft(totalSecondsRef.current);
    setSecondsLeft(totalSecondsRef.current);
    setRunning(false);
  }, [stopRAF]);

  const setDuration = useCallback(
    (seconds: number) => {
      stopRAF();
      totalSecondsRef.current = seconds;
      setPreciseSecondsLeft(seconds);
      setSecondsLeft(seconds);
      setRunning(false);
      endTimeRef.current = null;
    },
    [stopRAF],
  );

  const duration = totalSecondsRef.current;

  return {
    secondsLeft,
    running,
    start,
    pause,
    reset,
    setDuration,
    duration,
    preciseSecondsLeft, // float, for smooth progress
    milliseconds: Math.floor((preciseSecondsLeft % 1) * 1000),
  };
}
