import ClockDisplay from "@/components/home/clock-display";
import FloatingButtons from "@/components/home/floating-buttons";
import BackgroundWrapper from "@/components/layout/background-wrapper";

export default function Timer() {
  return (
    <BackgroundWrapper>
      <ClockDisplay />
      <FloatingButtons />
    </BackgroundWrapper>
  );
}
