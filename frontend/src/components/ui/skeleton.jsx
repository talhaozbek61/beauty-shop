import { twMerge } from "tailwind-merge";

export default function Skeleton({ className }) {
  return (
    <div
      data-slot="skeleton"
      className={twMerge("bg-[#f5f5f5] animate-pulse rounded-md", className)}
    />
  );
}
