"use client";

import { cn } from "@/lib/utils";
import { Pencil, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useNoteEditing } from "@/context/note-editing-context";
import { useNote } from "@/hooks/use-note";
import { useClockSettings } from "@/context/clock-settings-context";

export default function AddNoteButton({
  isInactive,
  setInactivityPaused,
}: {
  isInactive: boolean;
  setInactivityPaused: (paused: boolean) => void;
}) {
  const { note } = useNote();
  const { editingNote, setEditingNote } = useNoteEditing();
  const { updateSetting } = useClockSettings();

  return (
    <>
      {note && (
        <div className="relative! mt-2">
          <h3 className="max-w-[75vw] overflow-hidden px-6 font-semibold text-wrap">
            {note}
          </h3>
          {!editingNote && (
            <Pencil
              onMouseEnter={() => setInactivityPaused(true)}
              onMouseLeave={() => setInactivityPaused(false)}
              onFocus={() => setInactivityPaused(true)}
              onBlur={() => setInactivityPaused(false)}
              onClick={() => {
                setEditingNote(true);
                updateSetting("clockPosition", {
                  preset: "center",
                  custom: { x: 0, y: 0 },
                });
              }}
              className={cn(
                "absolute top-1/2 right-0 h-4 w-4 -translate-y-1/2 cursor-pointer transition duration-500 ease-in-out",
                isInactive ? "pointer-events-none opacity-0" : "opacity-100",
              )}
            />
          )}
        </div>
      )}
      {!editingNote && note == "" && (
        <Button
          variant={"outline"}
          size={"sm"}
          onMouseEnter={() => setInactivityPaused(true)}
          onMouseLeave={() => setInactivityPaused(false)}
          onFocus={() => setInactivityPaused(true)}
          onBlur={() => setInactivityPaused(false)}
          onClick={() => {
            setEditingNote(true);
            updateSetting("clockPosition", {
              preset: "center",
              custom: { x: 0, y: 0 },
            });
          }}
          className={cn(
            "absolute -bottom-11 transition duration-500 ease-in-out",
            isInactive ? "pointer-events-none opacity-0" : "opacity-100",
          )}
        >
          <Plus /> Add note
        </Button>
      )}
    </>
  );
}
