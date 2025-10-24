"use client";
import { Spinner } from "./spinner";
import { cn } from "@/lib/utils";

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <Spinner
      className={cn("text-gray-800", className)}
      size={25}
      variant="default"
    />
  );
}
