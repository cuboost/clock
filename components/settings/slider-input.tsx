import { Label } from "../ui/label";
import { Slider } from "../ui/slider";

type SliderInputProps = {
  id: string;
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  icon?: React.ReactNode;
  max?: number;
  step?: number;
  defaultValue?: number;
};

export default function SliderInput({
  id,
  label,
  value,
  onValueChange,
  icon,
  max = 100,
  step = 1,
  defaultValue = 0,
}: SliderInputProps) {
  return (
    <div className="flex justify-center items-center gap-3 w-full">
      <Label
        htmlFor={id}
        className="bg-muted rounded-full p-2 cursor-pointer hover:bg-muted/80 transition-colors"
        onClick={() => onValueChange(defaultValue)}
      >
        {icon}
      </Label>
      <div className="grid gap-3 w-full">
        <Label htmlFor={id}>{label}</Label>
        <Slider
          id={id}
          value={[value]}
          onValueChange={(e) => onValueChange(e[0])}
          max={max}
          step={step}
          className=""
        />
      </div>
    </div>
  );
}
