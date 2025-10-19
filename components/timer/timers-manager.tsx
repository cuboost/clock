"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Timer } from "./timer";
import { Plus } from "lucide-react";

let timerId = 1;

export function TimersManager() {
  const [timers, setTimers] = useState([{ id: timerId }]);
  const [fullscreen, setFullscreen] = useState(true);

  const addTimer = useCallback(() => {
    timerId += 1;
    setTimers((prev) => [...prev, { id: timerId }]);
  }, []);

  const removeTimer = useCallback((id: number) => {
    setTimers((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <div className="flex w-screen items-center justify-center gap-8 overflow-auto p-2">
      {timers.map((timer) => (
        <Timer
          key={timer.id}
          initialSeconds={0}
          onRemove={() => removeTimer(timer.id)}
          fullscreen={fullscreen}
          setFullscreen={setFullscreen}
          timers={timers}
        />
      ))}
      {!fullscreen && (
        <Button
          onClick={addTimer}
          variant="outline"
          className="absolute right-5"
        >
          <Plus className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
