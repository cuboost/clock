import { Button } from "@/components/ui/button";
import { useThemeColor } from "@/hooks/use-theme-color";
import { motion } from "framer-motion";
import { Maximize2, Minimize2, Settings2 } from "lucide-react";
import { useState } from "react";
import { SettingsSheet } from "./settings/settings-sheet";

export default function FloatingButtons() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const settingsColor = useThemeColor("clock");

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else if (document.exitFullscreen) {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  const textVariants = {
    initial: { opacity: 0, x: 10 },
    hover: { opacity: 1, x: 0 },
  };

  return (
    <div className="absolute right-4 bottom-4 flex items-center justify-end">
      <SettingsSheet>
        <motion.div
          className="flex items-center overflow-hidden"
          initial="initial"
          whileHover="hover"
          variants={{
            initial: { width: 40 },
            hover: { width: 110 },
          }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="ghost"
            className="flex items-center gap-2 p-2"
            style={{ color: settingsColor }}
          >
            <Settings2 />
            <motion.span
              className="text-sm whitespace-nowrap"
              variants={textVariants}
            >
              Settings
            </motion.span>
          </Button>
        </motion.div>
      </SettingsSheet>

      <motion.div
        className="flex items-center overflow-hidden"
        initial="initial"
        whileHover="hover"
        variants={{
          initial: { width: 40 },
          hover: { width: isFullscreen ? 80 : 120 },
        }}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="ghost"
          className="flex items-center gap-2 p-2"
          onClick={toggleFullscreen}
          style={{ color: settingsColor }}
        >
          {isFullscreen ? <Minimize2 /> : <Maximize2 />}
          <motion.span
            className="text-sm whitespace-nowrap"
            variants={textVariants}
          >
            {isFullscreen ? "Exit" : "Fullscreen"}
          </motion.span>
        </Button>
      </motion.div>
    </div>
  );
}
