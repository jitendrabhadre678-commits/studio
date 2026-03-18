"use client";

import { useEffect, useState, useRef } from 'react';
import { Zap } from 'lucide-react';

const names = ["Emma", "Noah", "Olivia", "James", "Sophia", "Liam", "Ava", "William", "Isabella", "Benjamin"];
const locations = ["USA", "UK", "Canada", "Australia", "Germany", "France"];
const values = ["$10", "$25", "$50", "$100"];
const brands = ["Amazon", "Steam", "Roblox", "Netflix", "PayPal", "Fortnite"];

export function LiveActivity() {
  const [notification, setNotification] = useState<any>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    
    const showNotification = () => {
      if (!isMounted.current) return;

      const data = {
        name: names[Math.floor(Math.random() * names.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        value: values[Math.floor(Math.random() * values.length)],
        brand: brands[Math.floor(Math.random() * brands.length)],
        id: Math.random().toString(36).substr(2, 9)
      };
      
      setNotification(data);
      
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      
      hideTimeoutRef.current = setTimeout(() => {
        if (isMounted.current) setNotification(null);
      }, 5000);
    };

    const initialTimer = setTimeout(showNotification, 3000);
    const interval = setInterval(showNotification, 15000);

    return () => {
      isMounted.current = false;
      clearTimeout(initialTimer);
      clearInterval(interval);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  if (!notification) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[100] animate-in slide-in-from-left-full duration-500">
      <div className="glass-card p-4 rounded-2xl flex items-center gap-4 shadow-2xl border-primary/30 min-w-[300px]">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shrink-0 animate-pulse-glow">
          <Zap className="text-white fill-white w-6 h-6" />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Recent Reward</span>
            <span className="text-[10px] text-muted-foreground">Just now</span>
          </div>
          <p className="text-sm text-white font-medium">
            <span className="font-bold">{notification.name}</span> from <span className="text-white/80">{notification.location}</span><br />
            unlocked <span className="text-primary font-bold">{notification.value} {notification.brand}</span> reward.
          </p>
        </div>
      </div>
    </div>
  );
}