"use client";

import { motion } from "framer-motion";
import { Star, ShieldCheck, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  name: string;
  country: string;
  reward: string;
  text: string;
}

const testimonials: Testimonial[] = [
  { id: 1, name: "Emma Walker", country: "UK", reward: "$50 Amazon Gift Card", text: "Super smooth experience and rewards unlocked quickly." },
  { id: 2, name: "Daniel Brooks", country: "Canada", reward: "$25 Steam Gift Card", text: "Love the clean design and simple reward process." },
  { id: 3, name: "Sophia Martinez", country: "USA", reward: "$100 PayPal Reward", text: "One of the best reward sites I've used." },
  { id: 4, name: "Liam Thompson", country: "Australia", reward: "$25 Roblox Gift Card", text: "Fast loading and easy to use." },
  { id: 5, name: "Marco Rossi", country: "Italy", reward: "$75 Amazon Gift Card", text: "Great experience and beautiful interface." },
  { id: 6, name: "Chloé Dubois", country: "France", reward: "$50 Netflix Gift Card", text: "Absolutely love the rewards library here!" },
  { id: 7, name: "Jack Wilson", country: "New Zealand", reward: "$10 Google Play", text: "Simple and effective verification system." },
  { id: 8, name: "Sarah Jenkins", country: "UK", reward: "$25 Xbox Gift Card", text: "Unlocked my game pass code in minutes." },
  { id: 9, name: "Michael Chen", country: "USA", reward: "$50 Apple Gift Card", text: "Trustworthy and very professional design." },
  { id: 10, name: "Isabella Garcia", country: "USA", reward: "$25 DoorDash", text: "Earned a free lunch while gaming!" },
  { id: 11, name: "Oliver Smith", country: "UK", reward: "$50 PlayStation", text: "Best site for gamers to get free codes." },
  { id: 12, name: "Matteo Bianchi", country: "Italy", reward: "$25 Spotify", text: "Interfaccia bellissima e premi reali." },
  { id: 13, name: "Charlotte Brown", country: "Canada", reward: "$100 Visa Card", text: "Highly recommended for active gamers." },
  { id: 14, name: "Ethan Wright", country: "Australia", reward: "$50 Fortnite", text: "V-Bucks claimed without any hassle." },
  { id: 15, name: "Manon Lefebvre", country: "France", reward: "$25 Uber", text: "Very impressed with the speed of delivery." },
  { id: 16, name: "James Taylor", country: "New Zealand", reward: "$50 Amazon", text: "A solid platform with great transparency." },
  { id: 17, name: "Grace Lee", country: "USA", reward: "$10 Starbucks", text: "Fastest $10 I've ever earned." },
  { id: 18, name: "Harry Jones", country: "UK", reward: "$25 Roblox", text: "Kid-friendly and very safe to use." },
  { id: 19, name: "Alice Miller", country: "Canada", reward: "$50 Netflix", text: "The UI is futuristic and very intuitive." },
  { id: 20, name: "Noah Williams", country: "Australia", reward: "$100 Steam", text: "Finally a site that actually delivers." },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="w-[320px] shrink-0 mx-4 glass-card p-6 rounded-[1.5rem] border-white/5 hover:border-primary/40 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 text-primary fill-primary" />
          ))}
        </div>
        <div className="flex items-center gap-1 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">
          <ShieldCheck className="w-3 h-3 text-green-500" />
          <span className="text-[8px] font-black text-green-500 uppercase tracking-widest">Verified Claim</span>
        </div>
      </div>
      
      <div className="relative">
        <Quote className="absolute -top-2 -left-2 w-8 h-8 text-white/5 group-hover:text-primary/10 transition-colors" />
        <p className="text-sm text-white/80 leading-relaxed italic mb-6 relative z-10">
          "{testimonial.text}"
        </p>
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-black text-white uppercase tracking-tight">{testimonial.name}</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{testimonial.country}</span>
          <span className="w-1 h-1 bg-white/20 rounded-full" />
          <span className="text-[10px] text-primary uppercase tracking-widest font-black">{testimonial.reward}</span>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const row1 = [...testimonials.slice(0, 10), ...testimonials.slice(0, 10)];
  const row2 = [...testimonials.slice(10, 20), ...testimonials.slice(10, 20)];

  return (
    <section className="py-24 overflow-hidden bg-black/40 border-y border-white/5 relative">
      <div className="absolute inset-0 bg-primary/5 blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 mb-16 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-6"
        >
          <Star className="w-4 h-4 text-primary fill-primary" />
          <span className="text-xs font-black uppercase tracking-widest text-primary">Global Community</span>
        </motion.div>
        <h2 className="font-headline text-4xl md:text-6xl font-black text-white mb-6">
          Trusted by <span className="text-primary text-glow">Thousands</span> of Happy Users
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Users around the world are unlocking rewards daily. Join the GameFlashX revolution and start earning today.
        </p>
      </div>

      <div className="relative space-y-8 py-4">
        {/* Row 1: Left to Right */}
        <div className="flex w-max animate-marquee-right">
          {row1.map((t, idx) => (
            <TestimonialCard key={`${t.id}-${idx}`} testimonial={t} />
          ))}
        </div>

        {/* Row 2: Right to Left */}
        <div className="flex w-max animate-marquee-left">
          {row2.map((t, idx) => (
            <TestimonialCard key={`${t.id}-${idx}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}