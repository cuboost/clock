"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface NoteEditingContextType {
  editingNote: boolean;
  setEditingNote: (editing: boolean) => void;
}

const NoteEditingContext = createContext<NoteEditingContextType | undefined>(
  undefined,
);

export function NoteEditingProvider({ children }: { children: ReactNode }) {
  const [editingNote, setEditingNote] = useState(false);

  return (
    <NoteEditingContext.Provider value={{ editingNote, setEditingNote }}>
      {children}
    </NoteEditingContext.Provider>
  );
}

export function useNoteEditing() {
  const context = useContext(NoteEditingContext);
  if (!context) {
    throw new Error("useNoteEditing must be used within a NoteEditingProvider");
  }
  return context;
}
