import { FloatingButtons } from "@/components/home/floating-buttons";
import { BackgroundWrapper } from "@/components/layout/background-wrapper";
import { TimerDisplay } from "@/components/timer/timer-display";

export default function Timer() {
  return (
    <BackgroundWrapper>
      <TimerDisplay />
      <FloatingButtons />
    </BackgroundWrapper>
  );
}
