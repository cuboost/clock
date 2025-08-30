"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useClockSettings } from "@/context/clock-settings-context";
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Reset to Defaults</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="sm:max-w-md!">
            <AlertDialogHeader>
              <AlertDialogTitle>Reset Settings?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will remove all your custom
                settings stored locally on this device.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className=""
                onClick={() => {
                  resetSettings();
                  toast("Settings reset to defaults");
                  setTimeout(() => window.location.reload(), 1000);
                }}
              >
                Reset
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SettingsSection>
    </>
  );
}
