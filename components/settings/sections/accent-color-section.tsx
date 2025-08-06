import { themes } from "@/lib/db";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import AccentColorButton from "../ui/accent-color-button";
import SettingsSection from "../ui/settings-section";

export default function AccentColorSection() {
  return (
    <SettingsSection title="Accent Color">
      <Carousel
        opts={{
          align: "start",
          slidesToScroll: 3,
        }}
        className="relative w-full overflow-hidden px-10 sm:hidden"
      >
        <CarouselContent>
          {themes.map((theme) => (
            <CarouselItem
              key={theme}
              className="xs:basis-1/4 xxs:basis-1/3 my-2 flex basis-1/2 items-center justify-center"
            >
              <AccentColorButton
                label={
                  theme.charAt(0).toUpperCase() + theme.slice(1) + " Theme"
                }
                themeName={theme}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0" />
        <CarouselNext className="absolute right-0" />
      </Carousel>
      <div className="hidden w-full grid-cols-3 justify-items-center gap-4 sm:grid sm:grid-cols-4">
        {themes.map((theme) => (
          <AccentColorButton
            key={theme}
            label={theme.charAt(0).toUpperCase() + theme.slice(1) + " Theme"}
            themeName={theme}
          />
        ))}
      </div>
    </SettingsSection>
  );
}
