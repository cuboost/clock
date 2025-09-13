import { useEffect, useState, useCallback, useRef } from "react";
import { db, Note } from "@/lib/db";

const NOTE_ID = "main-note";
const CHANNEL_NAME = "note-sync";

export function useNote() {
  const [note, setNote] = useState<string>("");
  const channelRef = useRef<BroadcastChannel | null>(null);

  // Initialize channel safely
  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channelRef.current = channel;

    channel.onmessage = (e) => {
      const incoming = e.data as Note;
      setNote(incoming.content);
    };

    return () => {
      channel.onmessage = null;
      channel.close();
      channelRef.current = null;
    };
  }, []);

  const fetchNote = useCallback(async () => {
    const saved = await db.note.get(NOTE_ID);
    setNote(saved?.content || "");
  }, []);

  const saveNote = useCallback(async (content: string) => {
    const newNote: Note = {
      id: NOTE_ID,
      content,
      updatedAt: Date.now(),
    };

    await db.note.put(newNote);
    setNote(content);

    if (channelRef.current) {
      channelRef.current.postMessage(newNote);
    }
  }, []);

  useEffect(() => {
    fetchNote();
  }, [fetchNote]);

  return { note, saveNote };
}
