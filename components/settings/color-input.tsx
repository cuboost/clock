import { Label } from "../ui/label";

type ColorInputProps = {
  id: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
};

export default function ColorInput({
  id,
  label,
  value,
  onValueChange,
}: ColorInputProps) {
  return (
    <div className="flex flex-col gap-2 items-center justify-between">
      <Label htmlFor={id}>{label}</Label>

      <div className="relative h-10 w-10 m-2 flex items-center justify-center rounded-full ring-2 ring-muted-foreground ring-offset-3 transition focus-within:ring-3">
        <input
          type="color"
          id={id}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
          aria-label={label}
        />
        <div
          aria-hidden="true"
          style={{ backgroundColor: value }}
          className="h-full w-full rounded-full shadow-sm"
        ></div>
      </div>
    </div>
  );
}
