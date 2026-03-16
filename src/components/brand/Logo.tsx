import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-square overflow-hidden rounded-[25%] bg-[#df104e] flex items-center justify-center shrink-0 shadow-lg shadow-primary/20", className)}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[60%] h-[60%]"
      >
        {/* Stylized Abstract Flame Symbol */}
        <path
          d="M50 5C50 5 15 45 15 70C15 89.33 30.67 105 50 105C69.33 105 85 89.33 85 70C85 45 50 5 50 5Z"
          fill="white"
          className="opacity-20"
        />
        <path
          d="M50 25C50 25 25 55 25 75C25 88.8071 36.1929 100 50 100C63.8071 100 75 88.8071 75 75C75 55 50 25 50 25Z"
          fill="white"
          className="opacity-40"
        />
        <path
          d="M50 45C50 45 35 65 35 80C35 88.2843 41.7157 95 50 95C58.2843 95 65 88.2843 65 80C65 65 50 45 50 45Z"
          fill="white"
        />
        
        {/* Subtle Inner Highlight */}
        <path
          d="M50 60C50 60 42 70 42 80C42 84.4183 45.5817 88 50 88C54.4183 88 58 84.4183 58 80C58 70 50 60 50 60Z"
          fill="white"
          className="opacity-30"
        />
      </svg>
      
      {/* Glossy Overlay Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
    </div>
  );
}
