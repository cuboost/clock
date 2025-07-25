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
      <input
        type="color"
        id={id}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="h-10 w-10 p-0 border-none rounded-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2 [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch-wrapper]:p-0"
      />
    </div>
  );
}
