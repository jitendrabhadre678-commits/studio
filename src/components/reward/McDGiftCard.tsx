'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/**
 * @fileOverview Hyper-Realistic McDonald's Gift Card.
 * Crafted with pure CSS/Tailwind for maximum performance and visual impact.
 */

export function McDGiftCard() {
  return (
    <div className="w-full max-w-[500px] perspective-1000 group mx-auto">
      <div className={cn(
        "relative aspect-[1.58/1] w-full rounded-[20px] overflow-hidden shadow-2xl transition-transform duration-700 group-hover:rotate-y-6 group-hover:scale-[1.02]",
        "bg-gradient-to-br from-[#c8102e] via-[#9e0b24] to-[#7a091c] border border-white/10"
      )}>
        
        {/* 1. SURFACE SHINE & SHIMMER */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-30 bg-gradient-to-tr from-transparent via-white/10 to-white/20" />
        <div className="absolute top-0 left-[-150%] w-[100%] h-full bg-gradient-to-r from-transparent via-[#FFC72C]/20 to-transparent skew-x-[-25deg] animate-[mcd-shimmer_4s_infinite] z-30" />

        {/* 2. BACKGROUND IMAGE INTEGRATION */}
        <div className="absolute top-0 right-0 w-[60%] h-full z-10 select-none pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-[#c8102e] via-transparent to-transparent z-10" />
          <img 
            src="https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775688589/067865ccc84af6682e1223bccac6bb58_jjtbmm.jpg"
            alt="McDonald's Visual"
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        {/* 3. CARD CONTENT LAYER */}
        <div className="relative z-40 h-full p-6 md:p-8 flex flex-col justify-between text-white font-sans">
          
          {/* Top Row: Brand & Badge */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-tighter uppercase drop-shadow-md">
                McDonald's
              </span>
              <div className="w-8 h-1 bg-[#FFC72C] rounded-full mt-1" />
            </div>
            <div className="bg-[#FFC72C] text-[#c8102e] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
              Reward Card
            </div>
          </div>

          {/* Center: Value */}
          <div className="flex flex-col items-center justify-center flex-grow py-4">
            <div className="relative">
              <span className="text-6xl md:text-8xl font-black text-[#FFC72C] drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] tracking-tighter">
                $100
              </span>
              <div className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-md border border-white/20 p-1 rounded-lg">
                <div className="w-6 h-6 bg-[#FFC72C] rounded-full flex items-center justify-center">
                  <span className="text-[#c8102e] text-[10px] font-black italic">M</span>
                </div>
              </div>
            </div>
            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] opacity-80 mt-[-5px]">
              Gift Card
            </span>
          </div>

          {/* Bottom Row: Info & Number */}
          <div className="flex justify-between items-end border-t border-white/10 pt-4">
            <div className="space-y-1">
              <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-[#FFC72C]/80">
                Valid for Food & Drinks
              </p>
              <p className="text-[10px] md:text-xs font-mono tracking-[0.2em] opacity-60">
                **** **** **** 2025
              </p>
            </div>
            
            {/* Small Arches Icon */}
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center">
               <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#FFC72C] drop-shadow-sm" xmlns="http://www.w3.org/2000/svg">
                 <path d="M5.423 20.262V9.354c0-2.316 1.467-3.575 3.324-3.575 1.857 0 2.814 1.259 2.814 3.575v10.908h2.814V9.354c0-2.316 1.467-3.575 3.324-3.575 1.857 0 2.814 1.259 2.814 3.575v10.908H24V9.354c0-4.633-2.914-6.354-5.638-6.354-2.724 0-4.114 1.721-4.114 1.721S12.858 3 10.134 3C7.41 3 4.496 4.721 4.496 9.354v10.908H0v2.738h24v-2.738H5.423z"/>
               </svg>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes mcd-shimmer {
          0% { left: -150%; }
          100% { left: 150%; }
        }
        .rotate-y-6 {
          transform: perspective(1000px) rotateY(6deg);
        }
      `}</style>
    </div>
  );
}
