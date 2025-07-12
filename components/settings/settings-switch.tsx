"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type SettingsSwitchProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

export function SettingsSwitch({
  id,
  label,
  checked,
  onChange,
}: SettingsSwitchProps) {
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={id}>{label}</Label>
      <Switch id={id} checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
