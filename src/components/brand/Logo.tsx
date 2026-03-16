import Image from 'next/image';
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-square shrink-0 overflow-hidden rounded-[20%] shadow-lg shadow-primary/20", className)}>
      <Image
        src="/logo.png"
        alt="GameFlashX Logo"
        fill
        sizes="(max-width: 768px) 32px, (max-width: 1024px) 36px, 40px"
        className="object-cover"
        priority
      />
    </div>
  );
}
