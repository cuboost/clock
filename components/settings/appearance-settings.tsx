import {
  DEFAULT_SETTINGS,
  useClockSettings,
} from "@/context/clock-settings-context";
import { positionClasses } from "@/lib/clock-positions";
import { BackgroundType, ClockPositionType, themes } from "@/lib/db";
import { Calendar, Clock, Contrast, Focus, SunMedium } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "../theme/theme-toggle";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";
import ColorInput from "./color-input";
import { FontSelect } from "./font-select";
import SettingsSection from "./settings-section";
import SliderInput from "./slider-input";
import ThemeButton from "./theme-button";

export default function AppearanceSettings() {
  const { settings, updateSetting } = useClockSettings();
  const clockPositions = Object.keys(positionClasses) as ClockPositionType[];

  const [customCSSValue, setCustomCSSValue] = useState("");
  const axes = ["x", "y"] as const;

  return (
    <>
      <SettingsSection title="Theme">
        <ThemeToggle />
      </SettingsSection>

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
                <ThemeButton
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
            <ThemeButton
              key={theme}
              label={theme.charAt(0).toUpperCase() + theme.slice(1) + " Theme"}
              themeName={theme}
            />
          ))}
        </div>
      </SettingsSection>

      <SettingsSection title="Clock">
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
        <SliderInput
          id="clock-size"
          label="Clock Size"
          onValueChange={(value) => updateSetting("clockSize", value)}
          min={20}
          max={300}
          value={settings.clockSize}
          icon={<Clock />}
          defaultValue={DEFAULT_SETTINGS.clockSize}
        />
        <SliderInput
          id="date-size"
          label="Date Size"
          onValueChange={(value) => updateSetting("dateSize", value)}
          min={10}
          max={300}
          value={settings.dateSize}
          icon={<Calendar />}
          defaultValue={DEFAULT_SETTINGS.dateSize}
        />
        <div className="grid gap-3">
          <Label htmlFor="clock-position">Position</Label>
          <Select
            value={settings.clockPosition.preset}
            onValueChange={(value) => {
              if (value === "custom") {
                updateSetting("clockPosition", {
                  preset: "custom",
                  custom:
                    settings.clockPosition.preset === "custom"
                      ? settings.clockPosition.custom
                      : { x: 0, y: 0 },
                });
              } else {
                updateSetting(
                  "clockPosition",
                  value === "custom"
                    ? {
                        preset: "custom",
                        custom:
                          settings.clockPosition.preset === "custom"
                            ? settings.clockPosition.custom
                            : { x: 0, y: 0 },
                      }
                    : {
                        preset: value as ClockPositionType,
                        custom: { x: 0, y: 0 },
                      },
                );
              }
            }}
          >
            <SelectTrigger id="clock-position" className="w-full">
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
        </div>

        {settings.clockPosition.preset === "custom" && (
          <div className="flex items-center justify-center gap-4">
            {axes.map((axis) => (
              <div key={axis} className="grid gap-3">
                <Label htmlFor={axis}>{axis.toUpperCase()} Position</Label>
                <Input
                  id={axis}
                  type="number"
                  step="1"
                  value={
                    Math.round(settings.clockPosition.custom[axis] * 10) / 10
                  }
                  onChange={(e) =>
                    updateSetting("clockPosition", {
                      preset: "custom",
                      custom: {
                        ...settings.clockPosition.custom,
                        [axis]:
                          Math.round((parseFloat(e.target.value) || 0) * 10) /
                          10,
                      },
                    })
                  }
                />
              </div>
            ))}
          </div>
        )}
      </SettingsSection>

      <SettingsSection title="Background">
        <Tabs
          value={settings.backgroundType}
          onValueChange={(value) =>
            updateSetting("backgroundType", value as BackgroundType)
          }
        >
          <TabsList className="mb-3 w-full">
            <TabsTrigger value="color">Color</TabsTrigger>
            <TabsTrigger value="gradient">Gradient</TabsTrigger>
            <TabsTrigger value="image">Image</TabsTrigger>
          </TabsList>

          <TabsContent value="color" className="grid gap-4">
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

          <TabsContent value="image" className="grid gap-4">
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
        </Tabs>
      </SettingsSection>
      <SettingsSection title="Fonts">
        <FontSelect label="Clock" id="clock-font" setting="clockFontFamily" />
        <FontSelect label="Date" id="date-font" setting="dateFontFamily" />
      </SettingsSection>
      <SettingsSection
        title="Custom CSS"
        description="Add custom CSS properties to the <html> tag."
        footer={
          <Button
            onClick={() => updateSetting("customCSS", customCSSValue)}
            className="w-full"
          >
            Save
          </Button>
        }
      >
        <Textarea
          id="custom"
          value={customCSSValue}
          onChange={(e) => setCustomCSSValue(e.target.value)}
          placeholder="opacity: 0.5;"
        />
      </SettingsSection>
    </>
  );
}
