import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-xl bg-[#df104e] flex items-center justify-center shrink-0 shadow-lg shadow-primary/20", className)}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[70%] h-[70%]"
      >
        {/* Gift Card Base Shape (Rounded Rect) */}
        <rect x="10" y="20" width="80" height="60" rx="8" fill="white" fillOpacity="0.1" />
        
        {/* Stylized Flash / Lightning Bolt */}
        <path
          d="M55 15L35 50H50L45 85L75 40H60L70 15H55Z"
          fill="white"
          className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        />
        
        {/* Gaming Button Detail */}
        <circle cx="82" cy="72" r="4" fill="white" fillOpacity="0.5" />
        
        {/* Accent Line */}
        <rect x="15" y="30" width="20" height="2" rx="1" fill="white" fillOpacity="0.2" />
      </svg>
      
      {/* Subtle Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
    </div>
  );
}
