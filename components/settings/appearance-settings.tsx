import { useClockSettings } from "@/context/clock-settings-context";
import { BackgroundType, ClockPositionType, themes } from "@/lib/db";
import { Contrast, Focus, Ruler, SunMedium } from "lucide-react";
import { ThemeToggle } from "../theme/theme-toggle";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ColorInput from "./color-input";
import SliderInput from "./slider-input";
import ThemeButton from "./theme-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { positionClasses } from "@/lib/clock-positions";

export default function AppearanceSettings() {
  const { settings, updateSetting } = useClockSettings();
  const clockPositions = Object.keys(positionClasses) as ClockPositionType[];

  return (
    <>
      <h3>Theme</h3>
      <ThemeToggle />

      <h3>Accent Color</h3>
      <Carousel
        opts={{
          align: "start",
          slidesToScroll: 3,
        }}
        className="mx-auto w-full max-w-60"
      >
        <CarouselContent>
          {themes.map((theme) => (
            <CarouselItem
              key={theme}
              className="flex basis-1/3 items-center justify-center"
            >
              <ThemeButton
                label={
                  theme.charAt(0).toUpperCase() + theme.slice(1) + " Theme"
                }
                themeName={theme}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <h3>Clock</h3>
      <div className="flex justify-evenly">
        <ColorInput
          id="clock-color-light"
          label="Light Theme Color"
          value={settings.clockColorValues.light}
          onValueChange={(value) =>
            updateSetting("clockColorValues", {
              light: value,
              dark: settings.clockColorValues.dark,
            })
          }
        />
        <ColorInput
          id="clock-color-dark"
          label="Dark Theme Color"
          value={settings.clockColorValues.dark}
          onValueChange={(value) =>
            updateSetting("clockColorValues", {
              light: settings.clockColorValues.light,
              dark: value,
            })
          }
        />
      </div>
      <SliderInput
        id="clock-size"
        label="Clock Size"
        onValueChange={(value) => updateSetting("clockSize", value)}
        min={20}
        max={300}
        value={settings.clockSize}
        icon={<Ruler />}
        defaultValue={70}
      />
      <Select
        value={settings.clockPosition}
        onValueChange={(value) =>
          updateSetting("clockPosition", value as ClockPositionType)
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Position" />
        </SelectTrigger>
        <SelectContent>
          {clockPositions.map((pos) => (
            <SelectItem key={pos} value={pos}>
              {pos
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <h3>Background</h3>
      <div className="flex w-full flex-col gap-6">
        <Tabs
          value={settings.backgroundType}
          onValueChange={(value) =>
            updateSetting("backgroundType", value as BackgroundType)
          }
        >
          <TabsList className="mb-3 w-full">
            <TabsTrigger value="color">Solid Color</TabsTrigger>
            <TabsTrigger value="gradient">Gradient</TabsTrigger>
            <TabsTrigger value="image">Image</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>

          <TabsContent value="color" className="flex justify-evenly">
            <ColorInput
              id="background-color-light"
              label="Light Theme Color"
              value={settings.backgroundColorValues.light}
              onValueChange={(value) =>
                updateSetting("backgroundColorValues", {
                  light: value,
                  dark: settings.backgroundColorValues.dark,
                })
              }
            />
            <ColorInput
              id="background-color-dark"
              label="Dark Theme Color"
              value={settings.backgroundColorValues.dark}
              onValueChange={(value) =>
                updateSetting("backgroundColorValues", {
                  light: settings.backgroundColorValues.light,
                  dark: value,
                })
              }
            />
          </TabsContent>

          <TabsContent value="gradient"></TabsContent>

          <TabsContent value="image" className="space-y-4">
            <div className="grid gap-3">
              <Label htmlFor="image-link">Image Link</Label>
              <Input
                id="image-link"
                value={settings.backgroundImageLink}
                onChange={(e) =>
                  updateSetting("backgroundImageLink", e.target.value)
                }
                placeholder="https://example.com/image.png"
              />
            </div>
            <SliderInput
              id="image-blur"
              label="Blur"
              onValueChange={(value) =>
                updateSetting("backgroundImageBlur", value)
              }
              max={60}
              value={settings.backgroundImageBlur}
              icon={<Focus />}
              defaultValue={0}
            />
            <SliderInput
              id="image-brightness"
              label="Brightness"
              onValueChange={(value) =>
                updateSetting("backgroundImageBrightness", value)
              }
              max={2}
              step={0.01}
              value={settings.backgroundImageBrightness}
              icon={<SunMedium />}
              defaultValue={1}
            />
            <SliderInput
              id="image-contrast"
              label="Contrast"
              onValueChange={(value) =>
                updateSetting("backgroundImageContrast", value)
              }
              max={2}
              step={0.01}
              value={settings.backgroundImageContrast}
              icon={<Contrast />}
              defaultValue={1}
            />
            <SliderInput
              id="image-grayscale"
              label="Grayscale"
              onValueChange={(value) =>
                updateSetting("backgroundImageGrayscale", value)
              }
              max={1}
              step={0.01}
              value={settings.backgroundImageGrayscale}
              icon={<Focus />}
              defaultValue={0}
            />
          </TabsContent>

          <TabsContent value="custom">
            <div className="grid gap-3">
              <Label htmlFor="custom-background">Custom</Label>
              <Input
                id="custom-background"
                value={settings.backgroundImageLink}
                onChange={(e) =>
                  updateSetting("backgroundCustomValue", e.target.value)
                }
                placeholder="https://example.com/image.png"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
