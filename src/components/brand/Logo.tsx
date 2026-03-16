import Image from 'next/image';
import { cn } from "@/lib/utils";

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={cn("flex items-center gap-3 select-none", className)}>
      <div className="relative h-[32px] md:h-[36px] lg:h-[40px] aspect-square">
        <Image
          src="/logo.png"
          alt="GameFlashX Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <span className="font-headline font-black tracking-tighter text-white drop-shadow-[0_0_8px_rgba(255,148,183,0.5)]">
          GAMEFLASH<span className="text-[#df104e]">X</span>
        </span>
      )}
    </div>
  );
}
