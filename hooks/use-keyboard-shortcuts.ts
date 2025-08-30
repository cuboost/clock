import { useEffect } from "react";

export function useKeyboardShortcut(key: string, callback: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) ||
        target?.isContentEditable
      ) {
        return;
      }
      if (e.repeat) return;
      if (e.key.toLowerCase() === key.toLowerCase()) {
        e.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [key, callback]);
}
