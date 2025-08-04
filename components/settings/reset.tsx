"use client";

import { useClockSettings } from "@/context/clock-settings-context";
import { Button } from "../ui/button";
import { ConfirmationDialog } from "./confirmation-dialog";

export default function Reset() {
  const { resetSettings } = useClockSettings();
  return (
    <>
      <h3>Reset</h3>
      <p className="text-sm">
        Remove all your custom settings stored locally on this device.
      </p>
      <ConfirmationDialog
        title="Reset Settings?"
        description="This action is irreversible and will remove all your custom settings stored locally on this device."
        trigger={<Button>Reset to Defaults</Button>}
        onConfirm={() => {
          resetSettings();
          window.location.reload();
        }}
        confirmText="Reset"
      />
    </>
  );
}
