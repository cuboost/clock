"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type FullscreenContextType = {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
};

const FullscreenContext = createContext<FullscreenContextType | undefined>(
  undefined,
);

export const FullscreenProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  // Sync when user presses ESC or exits fullscreen outside UI
  useEffect(() => {
    const handleChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  return (
    <FullscreenContext.Provider value={{ isFullscreen, toggleFullscreen }}>
      {children}
    </FullscreenContext.Provider>
  );
};

export const useFullscreen = () => {
  const context = useContext(FullscreenContext);
  if (!context)
    throw new Error("useFullscreen must be used within FullscreenProvider");
  return context;
};
