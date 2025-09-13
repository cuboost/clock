import { useEffect, useState, useRef, useCallback } from "react";

export function useInactivity({ timeout = 5000 } = {}) {
  const [isInactive, setIsInactive] = useState(false);
  const pauseRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!pauseRef.current) {
      timeoutRef.current = setTimeout(() => setIsInactive(true), timeout);
      setIsInactive(false);
    }
  }, [timeout]);

  const setPaused = useCallback(
    (paused: boolean) => {
      pauseRef.current = paused;
      if (paused) {
        // When pausing, cancel the timer and mark as active
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsInactive(false);
      } else {
        // When unpausing, restart the timer
        resetTimer();
      }
    },
    [resetTimer],
  );

  useEffect(() => {
    const handleActivity = () => {
      if (!pauseRef.current) {
        setIsInactive(false);
        resetTimer();
      }
    };

    const events: (keyof WindowEventMap)[] = [
      "mousemove",
      "keydown",
      "mousedown",
      "touchstart",
    ];

    events.forEach((event) =>
      window.addEventListener(event, handleActivity, { passive: true }),
    );

    resetTimer(); // start initial timer

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity),
      );
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [resetTimer]);

  return { isInactive, setPaused };
}
