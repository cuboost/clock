import { useCallback, useEffect, useRef, useState } from "react";

export interface Lap {
  id: number;
  atMs: number; // absolute elapsed when lap was recorded
}

export function useStopwatch() {
  const [running, setRunning] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0); // accumulated when paused
  const [laps, setLaps] = useState<Lap[]>([]);

  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null); // performance.now() when started

  const stopRAF = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }, []);

  const tick = useCallback(() => {
    if (!running || startRef.current === null) return;
    const now = performance.now();
    const current = elapsedMs + (now - startRef.current);
    setElapsedMs(current);
    rafRef.current = requestAnimationFrame(tick);
  }, [running, elapsedMs]);

  const start = useCallback(() => {
    if (running) return;
    startRef.current = performance.now();
    setRunning(true);
    rafRef.current = requestAnimationFrame(tick);
  }, [running, tick]);

  const pause = useCallback(() => {
    if (!running) return;
    if (startRef.current !== null) {
      const now = performance.now();
      setElapsedMs((prev) => prev + (now - (startRef.current as number)));
      startRef.current = null;
    }
    setRunning(false);
    stopRAF();
  }, [running, stopRAF]);

  const reset = useCallback(() => {
    stopRAF();
    setRunning(false);
    startRef.current = null;
    setElapsedMs(0);
    setLaps([]);
  }, [stopRAF]);

  const lap = useCallback(() => {
    setLaps((prev) => [{ id: prev.length + 1, atMs: elapsedMs }, ...prev]);
  }, [elapsedMs]);

  // keep ticking while running
  useEffect(() => {
    if (running && rafRef.current === null) {
      rafRef.current = requestAnimationFrame(tick);
    }
    return () => {
      /* noop here, unmount cleanup below */
    };
  }, [running, tick]);

  // cleanup on unmount
  useEffect(() => () => stopRAF(), [stopRAF]);

  const milliseconds = Math.floor(elapsedMs % 1000);
  const seconds = Math.floor(elapsedMs / 1000);
}
