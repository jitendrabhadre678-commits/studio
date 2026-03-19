'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { reviews } from '@/lib/reviews';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CheckCircle2, Star, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-6"
            >
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-xs font-black uppercase tracking-widest text-primary">Verified Success Stories</span>
            </motion.div>
            <h1 className="font-headline text-5xl md:text-7xl font-black text-white mb-2 uppercase tracking-tight">
              COMMUNITY <span className="text-primary">FEEDBACK</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Authentic reviews from our global community of earners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="bg-[#1a1a1a] border-white/5 h-full hover:border-primary/20 transition-all duration-300 shadow-xl rounded-2xl overflow-hidden">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-2.5 h-2.5 text-green-500" />
                        <span className="text-[8px] font-black text-green-500 uppercase tracking-widest">{review.date}</span>
                      </div>
                    </div>

                    <p className="text-base text-white/90 leading-relaxed mb-8 flex-grow italic font-medium">
                      "{review.text}"
                    </p>

                    <div className="pt-6 border-t border-white/5 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-xl border border-white/10 shadow-inner">
                        {review.flag}
                      </div>
                      <div>
                        <p className="font-black text-white uppercase tracking-tight text-sm">{review.name}</p>
                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{review.country} • Verified Player</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-3 rounded-xl bg-black/40 border border-white/5 text-center">
                      <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Reward Claimed: </span>
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">{review.value} {review.rewardBrand} Code</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 p-12 glass-card rounded-[3rem] text-center border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Star className="w-32 h-32 text-primary" />
            </div>
            <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">Ready to claim your own reward?</h3>
            <p className="text-muted-foreground mb-10 max-w-lg mx-auto text-lg">Join thousands of daily active users and start earning points for your favorite platforms today.</p>
            <Button asChild className="h-16 px-12 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-lg shadow-xl shadow-primary/20">
              <Link href="/#trending">Start Earning Now</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
