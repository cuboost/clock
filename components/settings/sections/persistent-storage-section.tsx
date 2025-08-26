"use client";

import { useEffect, useState } from "react";
import { SettingsSection } from "../ui/settings-section";
import { Button } from "@/components/ui/button";

export function PersistentStorageSection() {
  const [persisted, setPersisted] = useState<boolean | "not supported" | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkPersistence() {
      if (navigator.storage && navigator.storage.persisted) {
        const isPersisted = await navigator.storage.persisted();
        setPersisted(isPersisted);
      } else {
        setPersisted("not supported");
      }
      setLoading(false);
    }
    checkPersistence();
  }, []);

  const enablePersistence = async () => {
    if (navigator.storage && navigator.storage.persist) {
      const granted = await navigator.storage.persist();
      setPersisted(granted);
    } else {
      setPersisted("not supported");
    }
  };

  // While loading, don't render anything
  if (loading) return null;

  // If persistent storage is not supported or enabled
  if (persisted === "not supported" || persisted === true) {
    return null;
  }

  // If storage is not yet persistent, show button
  return (
    <SettingsSection
      title="Persist Settings"
      description="Ask your browser to save your settings permanently."
    >
      <Button onClick={enablePersistence}>Enable Persistent Storage</Button>
    </SettingsSection>
  );
}
