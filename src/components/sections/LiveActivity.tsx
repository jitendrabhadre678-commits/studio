"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import { usePathname } from 'next/navigation';

/**
 * @fileOverview Optimized Live Activity Notification System.
 * Features: Compact 260px design, 7s cycling, and homepage-only visibility.
 */

const names = ["Emma", "Noah", "Olivia", "James", "Sophia", "Liam", "Ava", "William", "Isabella", "Benjamin"];
const locations = ["USA", "UK", "Canada", "AUS", "Germany", "France"];
const values = ["$10", "$25", "$50"];
const brands = ["Amazon", "Steam", "Roblox", "Netflix", "PayPal"];

export function LiveActivity() {
  const [notification, setNotification] = useState<any>(null);
  const pathname = usePathname();
  const isMounted = useRef(true);

  // Rule: Only show on homepage
  const isHomepage = pathname === '/';

  useEffect(() => {
    if (!isHomepage) {
      setNotification(null);
      return;
    }

    isMounted.current = true;
    
    const showNotification = () => {
      if (!isMounted.current || !isHomepage) return;

      const data = {
        name: names[Math.floor(Math.random() * names.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        value: values[Math.floor(Math.random() * values.length)],
        brand: brands[Math.floor(Math.random() * brands.length)],
        id: Math.random().toString(36).substr(2, 9)
      };
      
      setNotification(data);
      
      // Keep visible for 4 seconds, then 3 seconds gap (Total 7s)
      setTimeout(() => {
        if (isMounted.current) setNotification(null);
      }, 4000);
    };

    const interval = setInterval(showNotification, 7000);
    // Initial delay
    const initial = setTimeout(showNotification, 2000);

    return () => {
      isMounted.current = false;
      clearInterval(interval);
      clearTimeout(initial);
    };
  }, [isHomepage]);

  if (!isHomepage) return null;

  return (
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-[100] pointer-events-none">
      <AnimatePresence mode="wait">
        {notification && (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="glass-card w-[260px] p-2.5 rounded-2xl flex items-center gap-3 shadow-2xl border-primary/20 bg-black/60 backdrop-blur-xl pointer-events-auto"
          >
            <div className="w-9 h-9 bg-primary/20 rounded-xl flex items-center justify-center shrink-0 border border-primary/20">
              <Zap className="text-primary fill-primary w-4 h-4 animate-pulse" />
            </div>
            
            <div className="min-w-0">
              <p className="text-[11px] text-white/90 leading-tight">
                <span className="font-black uppercase tracking-tight">{notification.name}</span> 
                <span className="text-white/40 mx-1">from</span>
                <span className="font-bold text-white/60">{notification.location}</span>
              </p>
              <p className="text-[10px] text-white/50 mt-0.5 truncate">
                Unlocked <span className="text-primary font-black">{notification.value} {notification.brand}</span>
              </p>
            </div>

            <div className="ml-auto pr-1">
              <div className="w-1 h-1 rounded-full bg-green-500 animate-ping" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
