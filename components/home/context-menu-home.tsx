"use client";

import { useFullscreen } from "@/context/fullscreen-context";
import { SettingsSheet } from "../settings/settings-sheet";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "../ui/context-menu";

import { useState } from "react";

export function ContextMenuHome({ children }: { children: React.ReactNode }) {
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent
          className="w-52"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <ContextMenuItem onClick={() => window.location.reload()} inset>
            Reload
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onClick={() => setSettingsOpen(true)} inset>
            Settings
          </ContextMenuItem>
          <ContextMenuItem onClick={toggleFullscreen} inset>
            {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      {/* Render outside context menu */}
      <SettingsSheet open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
}
