'use client';

import { motion } from 'framer-motion';
import { reviews } from '@/lib/reviews';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ChevronRight, Star, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export function ReviewsSection() {
  const homeReviews = reviews.slice(0, 8);

  return (
    <div className="py-20 px-6 md:px-12 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-6"
          >
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Verified Success</span>
          </motion.div>
          <h2 className="font-headline text-4xl md:text-6xl font-black text-white mb-2 uppercase tracking-tight">
            TRUSTED BY <span className="text-primary">THOUSANDS</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Real players, real rewards. Verified by the community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {homeReviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 border-white/5 h-full hover:border-primary/20 transition-all duration-300 shadow-xl rounded-xl overflow-hidden">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-white/20">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      <span className="text-[8px] font-bold uppercase tracking-widest">{review.date}</span>
                    </div>
                  </div>

                  <p className="text-sm text-white/80 leading-relaxed mb-6 flex-grow italic">
                    "{review.text}"
                  </p>

                  <div className="pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black text-white uppercase tracking-tight">{review.name}</span>
                      <span className="text-xs">{review.flag}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-bold text-white/40 uppercase tracking-widest">
                        {review.value} {review.rewardBrand}
                      </div>
                      <span className="text-[9px] text-white/40 font-bold uppercase tracking-widest">{review.country}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" className="h-14 px-10 rounded-xl border-white/10 text-white font-black uppercase tracking-widest hover:bg-white/5 shadow-2xl">
            <Link href="/reviews">
              View More Reviews <ChevronRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
