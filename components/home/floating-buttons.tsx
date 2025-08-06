import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2, Settings2 } from "lucide-react";
import { SettingsSheet } from "@/components/settings/settings-sheet";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useInactivity } from "@/hooks/use-inactivity";
import { cn } from "@/lib/utils";

function AnimatedFloatingButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  const settingsColor = useThemeColor("clock");
  const iconWidth = 36;
  const [width, setWidth] = useState(iconWidth);
  const textRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (textRef.current) {
      setWidth(iconWidth + textRef.current.offsetWidth + 12);
    }
  }, [label]);

  return (
    <motion.div
      className="flex cursor-pointer items-center overflow-hidden"
      initial="initial"
      whileHover="hover"
      animate="initial"
      variants={{
        initial: { width: iconWidth },
        hover: { width },
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <Button
        variant="ghost"
        className="flex items-center gap-2 p-2"
        style={{ color: settingsColor }}
        onClick={onClick}
      >
        {icon}
        <motion.span
          ref={textRef}
          className="whitespace-nowrap"
          variants={{
            initial: { opacity: 0 },
            hover: { opacity: 1 },
          }}
        >
          {label}
        </motion.span>
      </Button>
    </motion.div>
  );
}

export default function FloatingButtons() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isInactive = useInactivity(3000);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  return (
    <div
      className={cn(
        "absolute right-4 bottom-4 flex items-center gap-2 transition duration-500",
        isInactive ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <SettingsSheet>
        <AnimatedFloatingButton icon={<Settings2 />} label="Settings" />
      </SettingsSheet>

      <AnimatedFloatingButton
        icon={isFullscreen ? <Minimize2 /> : <Maximize2 />}
        label={isFullscreen ? "Exit" : "Fullscreen"}
        onClick={toggleFullscreen}
      />
    </div>
  );
}
