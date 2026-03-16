import Image from 'next/image';
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative shrink-0", className)}>
      <Image
        src="/logo.png"
        alt="GameFlashX Logo"
        width={100}
        height={100}
        className="h-[32px] md:h-[36px] lg:h-[40px] w-auto object-contain"
        priority
      />
    </div>
  );
}
