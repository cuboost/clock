import { Label } from "../ui/label";
import { Slider } from "../ui/slider";

type SliderInputProps = {
  id: string;
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  icon?: React.ReactNode;
  min?: number;
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
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 0,
}: SliderInputProps) {
  return (
    <div className="my-1 flex w-full items-center justify-center gap-3">
      {icon && (
        <Label
          htmlFor={id}
          className="bg-muted hover:bg-muted/80 cursor-pointer rounded-full p-2 shadow-xs transition-colors"
          onClick={() => onValueChange(defaultValue)}
        >
          {icon}
        </Label>
      )}
      <div className="grid w-full gap-3">
        <Label htmlFor={id}>{label}</Label>
        <Slider
          id={id}
          value={[value]}
          onValueChange={(e) => onValueChange(e[0])}
          max={max}
          min={min}
          step={step}
          className=""
        />
      </div>
    </div>
  );
}
