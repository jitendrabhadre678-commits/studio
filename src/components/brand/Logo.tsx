import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[20%] bg-[#df104e] flex items-center justify-center shrink-0 shadow-lg shadow-primary/30", className)}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[65%] h-[65%]"
      >
        {/* Subtle Inner Glow */}
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Integrated G + Lightning Symbol */}
        <path
          d="M75 30C70 20 60 15 50 15C30.67 15 15 30.67 15 50C15 69.33 30.67 85 50 85C65 85 75 75 80 65H55V55H85V65C85 85 65 95 45 95C20 95 0 75 0 50C0 25 20 5 45 5C65 5 80 15 88 30H75Z"
          fill="none"
        />
        
        {/* The Bold G shape with Lightning Integration */}
        <path
          d="M82 35C76 22 62 15 48 15C28 15 12 31 12 51C12 71 28 87 48 87C65 87 78 77 82 62H55V52H92V65C92 84 75 97 48 97C22 97 0 75 0 50C0 25 22 3 48 3C68 3 85 15 92 35H82Z"
          fill="white"
          style={{ filter: 'drop-shadow(0 0 4px #ff94b7)' }}
          className="hidden"
        />

        {/* Re-designed G + Bolt for clarity */}
        <path
          d="M80 32C72.5 21 59.5 15 45 15C25.5 15 10 30.5 10 50C10 69.5 25.5 85 45 85C60 85 72.5 76 77.5 62H52V52H90V65C90 85 70 95 45 95C20 95 0 75 0 50C0 25 20 5 45 5C65 5 80 15 88 32H80Z"
          fill="white"
          className="hidden"
        />

        {/* Final Optimized G + Lightning Mark */}
        <path
          d="M85 35C78 22 63 15 48 15C28 15 12 31 12 51C12 71 28 87 48 87C62 87 74 79 80 67L65 67V57L95 57V67C95 85 75 97 48 97C21 97 0 76 0 50C0 24 21 3 48 3C68 3 85 15 95 35H85Z"
          fill="white"
          style={{ filter: 'drop-shadow(0 0 3px rgba(255,148,183,0.8))' }}
        />
        
        {/* The Lightning Bolt cutting through the G's center bar area */}
        <path
          d="M60 40L40 65H55L45 90L75 55H60L70 40H60Z"
          fill="white"
          className="animate-pulse"
          style={{ filter: 'drop-shadow(0 0 5px white)' }}
        />
      </svg>
      
      {/* Subtle Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
    </div>
  );
}
