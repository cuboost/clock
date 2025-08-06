import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useClockSettings } from "@/context/clock-settings-context";
import { ClockSettings } from "@/lib/db";
import { Label } from "../ui/label";

const fonts = [
  { label: "Geist Sans (Default)", value: "" },
  { label: "Sans", value: "sans-serif" },
  { label: "Serif", value: "serif" },
  { label: "Monospace", value: "monospace" },
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Courier New", value: "'Courier New', monospace" },
  { label: "Times New Roman", value: "'Times New Roman', serif" },
  { label: "Verdana", value: "Verdana, sans-serif" },
  { label: "Tahoma", value: "Tahoma, sans-serif" },
  { label: "Trebuchet MS", value: "'Trebuchet MS', sans-serif" },
];

type FontSettingKey = {
  [K in keyof ClockSettings]: ClockSettings[K] extends string ? K : never;
}[keyof ClockSettings];

type FontSelectProps = {
  label: string;
  id: string;
  setting: FontSettingKey;
};

export function FontSelect({ label, id, setting }: FontSelectProps) {
  const { settings, updateSetting } = useClockSettings();
  const [open, setOpen] = useState(false);

  const currentFontValue = settings[setting] ?? "";
  const selectedFont =
    fonts.find((font) => font.value === currentFontValue) ?? fonts[0];

  return (
    <div className="grid gap-3">
      <Label htmlFor={id}>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
            id={id}
          >
            <span style={{ fontFamily: selectedFont.value }}>
              {selectedFont.label}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search font..." className="h-9" />
            <CommandList>
              <CommandEmpty>No font found.</CommandEmpty>
              <CommandGroup>
                {fonts.map((font) => (
                  <CommandItem
                    key={font.label}
                    value={font.value || "__default__"}
                    onSelect={() => {
                      updateSetting(setting, font.value);
                      setOpen(false);
                    }}
                    style={{ fontFamily: font.value }}
                  >
                    {font.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        font.value === currentFontValue
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
