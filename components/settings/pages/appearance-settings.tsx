import AccentColorSection from "../sections/accent-color-section";
import BackgroundSection from "../sections/background-section";
import ClockAppearanceSection from "../sections/clock-appearance-section";
import FontsSection from "../sections/fonts-section";

export default function AppearanceSettings() {
  return (
    <>
      <ClockAppearanceSection />

      <FontsSection />

      <AccentColorSection />

      <BackgroundSection />
    </>
  );
}
