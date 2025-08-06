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
    <div className="my-1 flex items-center gap-3">
      <div className="ring-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 relative flex h-10 w-10 items-center justify-center rounded-full transition focus-within:ring-[3px]">
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
      <div className="grid gap-2">
        <Label htmlFor={id}>{label}</Label>
        <Label htmlFor={id} className="font-bold">
          {value}
        </Label>
      </div>
    </div>
  );
}
