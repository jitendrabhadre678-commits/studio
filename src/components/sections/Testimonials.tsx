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
    <div className="w-[340px] shrink-0 mx-4 bg-white/[0.05] backdrop-blur-[14px] p-7 rounded-[18px] border border-white/[0.12] hover:border-primary/40 transition-all duration-500 group hover:shadow-[0_0_40px_rgba(223,16,78,0.25)] relative overflow-hidden">
      {/* Pink Highlight Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/15 transition-colors duration-500" />
      
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 text-primary fill-primary drop-shadow-[0_0_5px_rgba(223,16,78,0.5)]" />
          ))}
        </div>
        <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">
          <ShieldCheck className="w-3 h-3 text-green-500" />
          <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Verified</span>
        </div>
      </div>
      
      <div className="relative mb-6">
        <Quote className="absolute -top-3 -left-3 w-10 h-10 text-white/[0.03] group-hover:text-primary/[0.07] transition-colors duration-500" />
        <p className="text-[15px] text-white/90 leading-relaxed italic relative z-10 font-medium">
          "{testimonial.text}"
        </p>
      </div>

      <div className="flex flex-col mt-auto pt-4 border-t border-white/5">
        <span className="text-sm font-black text-white uppercase tracking-tight mb-0.5">{testimonial.name}</span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-white/40 uppercase tracking-widest font-bold">{testimonial.country}</span>
          <span className="w-1 h-1 bg-white/10 rounded-full" />
          <span className="text-[11px] text-primary uppercase tracking-widest font-black [text-shadow:0_0_10px_rgba(223,16,78,0.3)]">
            {testimonial.reward}
          </span>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  // Triple the list for a truly seamless infinite scroll on very large screens
  const row1 = [...testimonials, ...testimonials, ...testimonials];
  const row2 = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-28 overflow-hidden bg-black/40 border-y border-white/5 relative">
      {/* Background Ambient Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2" />
      
      <div className="container mx-auto px-4 mb-20 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-5 py-2 rounded-full mb-6"
        >
          <Star className="w-4 h-4 text-primary fill-primary" />
          <span className="text-[11px] font-black uppercase tracking-widest text-primary">Global Success Stories</span>
        </motion.div>
        <h2 className="font-headline text-4xl md:text-7xl font-black text-white mb-6 tracking-tight leading-none">
          Trusted by <span className="text-primary text-glow">Thousands</span>
        </h2>
        <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto font-medium">
          Gamers across the globe are unlocking premium rewards every minute. Read why they choose GameFlashX.
        </p>
      </div>

      <div className="relative space-y-12 py-4">
        {/* Row 1: Right to Left (Slower/Smoother) */}
        <div className="flex w-max animate-marquee-left hover:[animation-play-state:paused] transition-all">
          {row1.map((t, idx) => (
            <TestimonialCard key={`r1-${t.id}-${idx}`} testimonial={t} />
          ))}
        </div>

        {/* Row 2: Left to Right (Slower/Smoother) */}
        <div className="flex w-max animate-marquee-right hover:[animation-play-state:paused] transition-all">
          {row2.map((t, idx) => (
            <TestimonialCard key={`r2-${t.id}-${idx}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
