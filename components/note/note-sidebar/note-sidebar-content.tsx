import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Textarea } from "../../ui/textarea";
import { useNote } from "@/hooks/use-note";
import { useNoteEditing } from "@/context/note-editing-context";

export function NoteSidebarContent() {
  const { note, saveNote } = useNote();
  const { setEditingNote } = useNoteEditing();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    saveNote(e.target.value);
  };

  return (
    <Card className="h-full w-full">
      <CardHeader className="text-left">
        <CardTitle className="text-2xl">Note</CardTitle>
        <CardDescription>
          Add a note under the clock that syncs between all open tabs.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid h-full gap-4">
        <Textarea
          placeholder="Write a note..."
          value={note}
          className="max-h-32 w-full resize-none"
          onChange={handleChange}
        />
      </CardContent>

      <CardFooter>
        <Button onClick={() => setEditingNote(false)} className="w-full">
          Close
        </Button>
      </CardFooter>
    </Card>
  );
}
