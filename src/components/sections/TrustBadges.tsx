"use client";

import { ShieldCheck, Globe, Zap, Users } from "lucide-react";

export function TrustBadges() {
  const badges = [
    { icon: <ShieldCheck />, label: "Verified Partner", sub: "Secure Partner Network" },
    { icon: <Globe />, label: "Global Rewards", sub: "Accessible Worldwide" },
    { icon: <Zap />, label: "Reward Delivery", sub: "Issued after verification" },
    { icon: <Users />, label: "Active Community", sub: "Join users earning rewards" },
  ];

  return (
    <div className="py-10 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, idx) => (
            <div key={idx} className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 transition-all text-primary">
                {badge.icon}
              </div>
              <div>
                <p className="text-sm font-black text-white uppercase tracking-tight">{badge.label}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{badge.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
