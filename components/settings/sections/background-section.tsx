import { useClockSettings } from "@/context/clock-settings-context";
import { BackgroundType } from "@/lib/db";
import { Contrast, Focus, SunMedium } from "lucide-react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { ColorInput } from "../ui/color-input";
import { SettingsSection } from "../ui/settings-section";
import { SliderInput } from "../ui/slider-input";

export function BackgroundSection() {
  const { settings, updateSetting } = useClockSettings();

  return (
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
  );
}
