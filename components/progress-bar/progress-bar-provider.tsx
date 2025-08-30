"use client";

import { useThemeColor } from "@/hooks/use-theme-color";
import { ProgressProvider } from "@bprogress/next/app";
import { useEffect, useState } from "react";

export default function ProgressBarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const settingsColor = useThemeColor("clock");
  const progressBarColor = settingsColor;

  if (!mounted) return null; // Prevent SSR mismatch

  return (
    <ProgressProvider
      height="4px"
      color={progressBarColor}
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
}
