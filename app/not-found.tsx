"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/");
    setTimeout(() => {
      router.push("/");
    }, 10000);
  }, [router]);

  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <h1 className="p-6">Sorry...</h1>
      <h2 className="p-6">That page could not be found.</h2>
      <Link href="/" replace>
        <button className="m-5">Home</button>
      </Link>
    </div>
  );
}
