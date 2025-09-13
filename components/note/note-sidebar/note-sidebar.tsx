"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { useNoteEditing } from "@/context/note-editing-context";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNote } from "@/hooks/use-note";
import { AnimatePresence, motion } from "motion/react";

export function NoteSidebar() {
  const { editingNote, setEditingNote } = useNoteEditing();
  const { note, saveNote } = useNote();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    saveNote(e.target.value);
  };
  const isDesktop = !useIsMobile();

  if (isDesktop) {
    return (
      <AnimatePresence initial={false}>
        {editingNote && (
          <motion.div
            key="note-sidebar"
            className="bg-background h-full py-4"
            initial={{ width: 0, opacity: 0, marginLeft: 0, marginRight: 0 }}
            animate={{
              width: "24rem",
              opacity: 1,
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
            exit={{ width: 0, opacity: 0, marginLeft: 0, marginRight: 0 }}
          >
            <motion.div
              className="h-full w-96!"
              initial={{ x: 150 }}
              animate={{ x: 0 }}
              exit={{ x: 150 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
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
                  <Button
                    onClick={() => setEditingNote(false)}
                    className="w-full"
                  >
                    Close
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
  return (
    <Drawer open={editingNote} onOpenChange={setEditingNote}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Note</DrawerTitle>
          <DrawerDescription>
            Add a note under the clock that syncs between all open tabs.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pb-0">
          <Textarea
            placeholder="Write a note..."
            value={note}
            className="max-h-32 resize-none"
            onChange={handleChange}
          />
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

// "use client";

// import { motion } from "motion/react";
// import { Button } from "../ui/button";
// import { useNote } from "@/hooks/use-note";
// import { Textarea } from "../ui/textarea";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";
// import { useNoteEditing } from "@/context/note-editing-context";

// export function NoteSidebar() {
//   const { note, saveNote } = useNote();
//   const { editingNote, setEditingNote } = useNoteEditing();

//   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     saveNote(e.target.value);
//   };

//   return (
//     <>
//       <motion.div
//         className="border-border h-full w-full sm:max-w-sm md:w-3/4"
//         animate={editingNote ? "expanded" : "collapsed"}
//         variants={{
//           collapsed: { x: 1000, opacity: 0, display: "hidden", width: 0 },
//           expanded: { x: 0, opacity: 1, display: "block", width: 600 },
//         }}
//         transition={{ type: "spring", stiffness: 200, damping: 20 }}
//       >
//         <Card className="h-full">
//           <CardHeader className="text-left">
//             <CardTitle className="text-2xl">Note</CardTitle>
//             <CardDescription>
//               Add a note under the clock that syncs between all open tabs.
//             </CardDescription>
//           </CardHeader>

//           <CardContent className="grid h-full gap-4">
//             <Textarea
//               placeholder="Write a note..."
//               value={note}
//               className="max-h-32 w-full resize-none"
//               onChange={handleChange}
//             />
//           </CardContent>

//           <CardFooter>
//             <Button onClick={() => setEditingNote(false)} className="w-full">
//               Close
//             </Button>
//           </CardFooter>
//         </Card>
//       </motion.div>
//     </>
//   );
// }
