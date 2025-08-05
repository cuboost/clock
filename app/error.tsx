"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-6 text-center md:flex-row md:gap-20 md:text-left">
      <Image
        src="/images/clock-icon.svg"
        className="animate-crazy-clock opacity-75 delay-75"
        width={130}
        height={130}
        draggable={false}
        priority
        alt="Clock icon"
      />
      <div className="">
        <h1 className="animate-glitch-text p-6 delay-150">Sorry...</h1>
        <h4 className="animate-glitch-text p-6 delay-200">
          Something went wrong!
        </h4>
        <Link href="/" replace>
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
            className="animate-glitch-text m-5 delay-250"
            variant={"outline"}
          >
            Try again!
          </Button>
        </Link>
      </div>
    </div>
  );
}
