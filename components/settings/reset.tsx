"use client";

import { useClockSettings } from "@/context/clock-settings-context";
import { Button } from "../ui/button";
import { ConfirmationDialog } from "./confirmation-dialog";
import SettingsSection from "./settings-section";
import { toast } from "sonner";

export default function Reset() {
  const { resetSettings } = useClockSettings();
  return (
    <>
      <SettingsSection
        title="Reset"
        description="Remove all your custom settings stored locally on this device."
      >
        <ConfirmationDialog
          title="Reset Settings?"
          description="This action is irreversible and will remove all your custom settings stored locally on this device."
          trigger={<Button>Reset to Defaults</Button>}
          onConfirm={() => {
            resetSettings();
            toast("Settings reset to defaults.");
            window.location.reload();
          }}
          confirmText="Reset"
        />
      </SettingsSection>
    </>
  );
}
