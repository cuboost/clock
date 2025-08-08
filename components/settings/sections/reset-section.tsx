"use client";

import { Button } from "@/components/ui/button";
import { useClockSettings } from "@/context/clock-settings-context";
import { ConfirmationDialog } from "../ui/confirmation-dialog";
import { toast } from "sonner";
import { SettingsSection } from "../ui/settings-section";

export function ResetSection() {
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
            toast("Settings reset to defaults");
            setTimeout(() => window.location.reload(), 1000);
          }}
          confirmText="Reset"
        />
      </SettingsSection>
    </>
  );
}
