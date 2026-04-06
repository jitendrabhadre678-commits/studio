'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * @fileOverview Global Floating Background System.
 * Features: Scattered glass nodes with randomized depth, slow floating physics,
 * and periphery-only placement to protect readability.
 */

const IMAGES = [
  'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463606/12_20260406_134036_0011_pop4qs.png',
  'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463587/11_20260406_134035_0010_uks5bz.png',
  'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463571/3_20260406_134035_0002_rkpbkk.png',
  'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463553/10_20260406_134035_0009_ouhe1e.png',
  'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463548/7_20260406_134035_0006_qkousw.png',
  'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463547/9_20260406_134035_0008_nnznij.png',
  'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463547/8_20260406_134035_0007_jumtpc.png',
  'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463546/4_20260406_134035_0003_jvi4ke.png',
  'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463541/5_20260406_134035_0004_nikubw.png',
  'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463539/1_20260406_134035_0000_i04tox.png',
  'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463535/6_20260406_134035_0005_k7bzkc.png',
  'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463534/2_20260406_134035_0001_sf7lub.png',
];

type FloatingItem = {
  id: number;
  url: string;
  top: string;
  left?: string;
  right?: string;
  size: string;
  duration: number;
  delay: number;
  opacity: number;
  blur: boolean;
};

export function GlobalFloatingBackground() {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    // Determine screen size for density control
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 6 : 12;
    
    const generated: FloatingItem[] = [];
    
    for (let i = 0; i < count; i++) {
      const side = Math.random() > 0.5 ? 'left' : 'right';
      // Periphery placement: only place in the outer 25% of the screen
      const xPos = `${Math.floor(Math.random() * 20)}%`;
      
      generated.push({
        id: i,
        url: IMAGES[i % IMAGES.length],
        top: `${Math.floor(Math.random() * 90) + 5}%`,
        [side]: xPos,
        size: isMobile 
          ? ['w-12', 'w-16'][Math.floor(Math.random() * 2)]
          : ['w-16', 'w-24', 'w-32'][Math.floor(Math.random() * 3)],
        duration: Math.random() * 4 + 8, // 8-12s
        delay: Math.random() * 5,
        opacity: Math.random() * 0.2 + 0.15, // 0.15 - 0.35
        blur: Math.random() > 0.7,
      });
    }
    
    setItems(generated);
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: item.opacity }}
          transition={{ duration: 2 }}
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
          }}
          className={cn(
            "absolute transform -translate-y-1/2",
            item.blur && "blur-[2px]"
          )}
        >
          <motion.div
            animate={{
              y: [-15, 15, -15],
              rotate: [-3, 3, -3],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={cn(
              "relative glass-card aspect-square rounded-2xl border-white/10 p-3 bg-white/5 backdrop-blur-xl shadow-2xl",
              item.size
            )}
          >
            {/* Reflection Specular Highlight */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none rounded-2xl" />
            
            <div className="relative w-full h-full">
              <Image 
                src={item.url} 
                alt="" 
                fill 
                className="object-contain drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)]" 
              />
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
