import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[25%] bg-[#df104e] flex items-center justify-center shrink-0", className)}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[65%] h-[65%]"
      >
        {/* Abstract Center Flame Stripe */}
        <path
          d="M50 15C55 35 65 50 60 75C58 82 52 85 48 85C42 85 38 80 38 70C38 50 45 35 50 15Z"
          fill="white"
        />
        {/* Left Curved Stripe */}
        <path
          d="M32 45C29 55 28 65 33 75C35 80 39 82 43 81"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Right Curved Stripe */}
        <path
          d="M68 50C71 58 72 65 70 75C69 80 65 83 60 82"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
