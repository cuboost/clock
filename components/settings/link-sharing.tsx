import { useClockSettings } from "@/context/clock-settings-context";
import { Copy } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function LinkSharing() {
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
      <h3>Link Sharing</h3>
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
    </>
  );
}
