"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/");
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, [router]);

  return (
    <div className="flex h-dvh items-center justify-center gap-20">
      <Image
        src="/images/clock-icon.svg"
        className="animate-crazy-clock delay-75"
        width={150}
        height={150}
        draggable={false}
        priority
        alt="Clock icon"
      />
      <div className="">
        <h1 className="animate-glitch-text p-6 delay-150">Sorry...</h1>
        <h4 className="animate-glitch-text p-6 delay-200">
          That page could not be found.
        </h4>
        <Link href="/" replace>
          <Button
            className="animate-glitch-text m-5 delay-250"
            variant="outline"
          >
            Take me home!
          </Button>
        </Link>
      </div>
    </div>
  );
}
