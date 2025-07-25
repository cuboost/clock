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
    <div className="flex flex-col items-center justify-between gap-2">
      <Label htmlFor={id}>{label}</Label>

      <div className="ring-muted-foreground relative m-2 flex h-10 w-10 items-center justify-center rounded-full ring-2 ring-offset-3 transition focus-within:ring-3">
        <input
          type="color"
          id={id}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
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
