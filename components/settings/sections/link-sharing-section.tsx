import { useClockSettings } from "@/context/clock-settings-context";
import { Copy } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import SettingsSection from "../ui/settings-section";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LinkSharingSection() {
  const { generateShareLink } = useClockSettings();
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const refreshAndCopy = useCallback(
    async (copy = false) => {
      setLoading(true);
      try {
        const generatedLink = await generateShareLink();
        setLink(generatedLink);

        if (copy) {
          await navigator.clipboard.writeText(generatedLink);
          toast("Link copied to clipboard!");
        }
      } catch {
        toast.error("Failed to generate link.");
      } finally {
        setLoading(false);
      }
    },
    [generateShareLink],
  );

  useEffect(() => {
    refreshAndCopy(false);
  }, [refreshAndCopy]);

  return (
    <>
      <SettingsSection
        title="Link Sharing"
        description="Share your clock settings with others. Just copy the link below and open it in a new browser."
      >
        <div className="flex gap-2">
          <Input
            id="share-link"
            value={link}
            readOnly
            placeholder="Link generating..."
          />
          <Button
            variant="outline"
            onClick={() => refreshAndCopy(true)}
            disabled={loading}
            aria-busy={loading}
            title={loading ? "Generating link..." : "Copy share link"}
          >
            <Copy />
          </Button>
        </div>
      </SettingsSection>
    </>
  );
}
