import { ClockDisplay } from "@/components/clock/clock-display";
import { FloatingButtons } from "@/components/home/floating-buttons";
import { BackgroundWrapper } from "@/components/layout/background-wrapper";

export default function Clock() {
  return (
    <BackgroundWrapper>
      <ClockDisplay />
      <FloatingButtons />
    </BackgroundWrapper>
  );
}
