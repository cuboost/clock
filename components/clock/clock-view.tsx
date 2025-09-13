import { NoteEditingProvider } from "@/context/note-editing-context";
import { NoteSidebar } from "../note/note-sidebar/note-sidebar";
import { ClockDisplay } from "./clock-display";

export function ClockView() {
  return (
    <NoteEditingProvider>
      <div className="flex h-full w-full items-center justify-center">
        <ClockDisplay />
        <NoteSidebar />
      </div>
    </NoteEditingProvider>
  );
}
