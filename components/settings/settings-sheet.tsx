"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useClockSettings } from "@/context/clock-settings-context";
import { useThemeColor } from "@/hooks/use-theme-color";
import { BackgroundType, themes } from "@/lib/db";
import { Contrast, Focus, Settings2, SunMedium } from "lucide-react";
import { ThemeToggle } from "../theme/theme-toggle";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ColorInput from "./color-input";
import { ConfirmationDialog } from "./confirmation-dialog";
import LinkSharing from "./link-sharing";
import SliderInput from "./slider-input";
import { SwitchInput } from "./switch-input";
import ThemeButton from "./theme-button";

export function SettingsSheet() {
  const { settings, updateSetting, loading, resetSettings } =
    useClockSettings();
  const settingsColor = useThemeColor("clock");

  if (loading) return null;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"ghost"}
          className="absolute right-4 bottom-4"
          style={{ color: settingsColor }}
        >
          <Settings2 className="h-10 w-10" />
          Settings
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-scroll">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
        </SheetHeader>
        <div className="mb-4 grid flex-1 auto-rows-min gap-6 px-5">
          <h3>Elements</h3>
          <SwitchInput
            id="show-seconds"
            label="Seconds"
            checked={settings.showSeconds}
            onChange={(value) => updateSetting("showSeconds", value)}
          />
          <SwitchInput
            id="show-date"
            label="Date"
            checked={settings.showDate}
            onChange={(value) => updateSetting("showDate", value)}
          />

          <h3>Format</h3>
          <SwitchInput
            id="twelve-hour-format"
            label="12h Format"
            checked={settings.twelveHourFormat}
            onChange={(value) => updateSetting("twelveHourFormat", value)}
          />
          <SwitchInput
            id="show-am-pm"
            label="Show AM/PM"
            checked={settings.showAmPm}
            onChange={(value) => updateSetting("showAmPm", value)}
          />

          <h3>Tab</h3>
          <SwitchInput
            id="show-time-in-tab"
            label="Show Time in Tab"
            checked={settings.showTimeInTab}
            onChange={(value) => updateSetting("showTimeInTab", value)}
          />
          {!settings.showTimeInTab && (
            <div className="grid gap-3">
              <Label htmlFor="custom-tab-title">Custom Tab Title</Label>
              <Input
                id="custom-tab-title"
                value={settings.customTabTitle ?? ""}
                onChange={(e) =>
                  updateSetting("customTabTitle", e.target.value)
                }
              />
            </div>
          )}

          <h3>Theme</h3>
          <ThemeToggle />
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

          <h3>Clock Color</h3>
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

          <LinkSharing />

          <h3>Reset</h3>
          <p className="text-sm">
            Remove all your custom settings stored locally on this device.
          </p>
          <ConfirmationDialog
            title="Reset Settings?"
            description="This action is irreversible and will remove all your custom settings stored locally on this device."
            trigger={<Button>Reset to Defaults</Button>}
            onConfirm={() => {
              resetSettings();
            }}
            confirmText="Reset"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
