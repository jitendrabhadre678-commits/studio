
"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * @fileOverview Premium Floating Gift Card Showcase.
 * Features 3D depth, brand-specific glows, and kinetic glassmorphism.
 */

const SHOWCASE_ITEMS = [
  { id: 'amazon', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463535/6_20260406_134035_0005_k7bzkc.png', color: '#FF9900', pos: { top: '15%', left: '15%' }, size: 'w-24', dur: 6, delay: 0, depth: 1 },
  { id: 'roblox', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463587/11_20260406_134035_0010_uks5bz.png', color: '#E3191E', pos: { top: '20%', left: '75%' }, size: 'w-20', dur: 7, delay: 1, depth: 0.6 },
  { id: 'steam', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463571/3_20260406_134035_0002_rkpbkk.png', color: '#66C0F4', pos: { top: '65%', left: '10%' }, size: 'w-28', dur: 8, delay: 0.5, depth: 1 },
  { id: 'fortnite', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463553/10_20260406_134035_0009_ouhe1e.png', color: '#A855F7', pos: { top: '70%', left: '80%' }, size: 'w-24', dur: 5.5, delay: 2, depth: 0.8 },
  { id: 'google', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463606/12_20260406_134036_0011_pop4qs.png', color: '#34A853', pos: { top: '40%', left: '5%' }, size: 'w-16', dur: 9, delay: 1.5, depth: 0.4 },
  { id: 'ps', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463534/2_20260406_134035_0001_sf7lub.png', color: '#003087', pos: { top: '10%', left: '45%' }, size: 'w-20', dur: 6.5, delay: 0.2, depth: 0.7 },
  { id: 'xbox', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463539/1_20260406_134035_0000_i04tox.png', color: '#107C10', pos: { top: '80%', left: '40%' }, size: 'w-24', dur: 7.5, delay: 1.2, depth: 0.9 },
  { id: 'nintendo', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463546/4_20260406_134035_0003_jvi4ke.png', color: '#E3191E', pos: { top: '45%', left: '85%' }, size: 'w-16', dur: 8.5, delay: 0.8, depth: 0.5 },
  { id: 'walmart', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463548/7_20260406_134035_0006_qkousw.png', color: '#0071CE', pos: { top: '5%', left: '80%' }, size: 'w-14', dur: 10, delay: 3, depth: 0.3 },
  { id: 'ebay', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463541/5_20260406_134035_0004_nikubw.png', color: '#E53238', pos: { top: '85%', left: '15%' }, size: 'w-16', dur: 7, delay: 2.5, depth: 0.4 },
  { id: 'target', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463547/9_20260406_134035_0008_nnznij.png', color: '#CC0000', pos: { top: '30%', left: '90%' }, size: 'w-20', dur: 6, delay: 1.8, depth: 0.6 },
  { id: 'bestbuy', url: 'https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463547/8_20260406_134035_0007_jumtpc.png', color: '#EAB308', pos: { top: '25%', left: '5%' }, size: 'w-14', dur: 9.5, delay: 0.5, depth: 0.3 },
];

export function FloatingShowcase() {
  return (
    <section className="relative w-full h-[500px] md:h-[700px] bg-black overflow-hidden flex items-center justify-center border-t border-white/5">
      {/* BACKGROUND RADIANCE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,70,22,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      {/* FLOATING ELEMENTS LAYER */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {SHOWCASE_ITEMS.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: item.depth,
              y: [0, -20, 0],
              rotate: [-2, 2, -2]
            }}
            transition={{
              opacity: { duration: 1, delay: item.delay },
              y: { duration: item.dur, repeat: Infinity, ease: "easeInOut", delay: item.delay },
              rotate: { duration: item.dur * 1.2, repeat: Infinity, ease: "easeInOut", delay: item.delay }
            }}
            style={{ 
              top: item.pos.top, 
              left: item.pos.left,
              zIndex: Math.floor(item.depth * 10)
            }}
            className={cn(
              "absolute transform -translate-x-1/2 -translate-y-1/2",
              item.depth < 0.5 && "blur-[2px]"
            )}
          >
            <div className={cn(
              "relative glass-card aspect-square rounded-2xl flex items-center justify-center border-white/10 p-4 bg-white/5",
              item.size,
              "shadow-2xl"
            )}>
              {/* Brand Glow */}
              <div 
                className="absolute inset-0 blur-xl opacity-20 transition-opacity"
                style={{ background: `radial-gradient(circle, ${item.color} 0%, transparent 70%)` }}
              />
              
              {/* Logo */}
              <div className="relative z-10 w-full h-full">
                <Image 
                  src={item.url} 
                  alt={item.id} 
                  fill 
                  className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                />
              </div>

              {/* Reflection Shine */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-2xl pointer-events-none" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* CENTER CONTENT */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em]">Global Vault Open</span>
          </div>
          
          <h2 className="font-headline text-4xl md:text-7xl font-[900] text-white uppercase tracking-tighter leading-none">
            Earn Free <br />
            <span className="bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent text-glow">
              Gift Cards 🤑
            </span>
          </h2>
          
          <p className="text-white/40 text-sm md:text-xl font-medium max-w-lg mx-auto">
            Join thousands of users who have successfully unlocked premium digital rewards this month.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
