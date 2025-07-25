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
    <div className="flex w-full items-center justify-center gap-3">
      <Label
        htmlFor={id}
        className="bg-muted hover:bg-muted/80 cursor-pointer rounded-full p-2 transition-colors"
        onClick={() => onValueChange(defaultValue)}
      >
        {icon}
      </Label>
      <div className="grid w-full gap-3">
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
