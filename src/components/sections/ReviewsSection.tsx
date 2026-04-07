
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { reviews } from '@/lib/reviews';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * @fileOverview Optimized Reviews Section.
 * Features: 10-item limit, randomization on refresh, 2-column mobile grid,
 * and zero navigational distractions for maximum trust.
 */

export function ReviewsSection() {
  const [displayReviews, setDisplayReviews] = useState<typeof reviews>([]);

  useEffect(() => {
    // Randomize and slice to 10 on the client to avoid hydration mismatch
    const shuffled = [...reviews]
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);
    setDisplayReviews(shuffled);
  }, []);

  if (displayReviews.length === 0) return null;

  return (
    <div className="py-20 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-6"
          >
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Verified Feedback</span>
          </motion.div>
          <h2 className="font-headline text-3xl md:text-6xl font-black text-white mb-2 uppercase tracking-tight leading-none">
            User <span className="text-primary text-glow">Reviews</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-xl mx-auto mt-4 font-medium">
            Authentic success stories from our global community.
          </p>
        </div>

        {/* Responsive Grid: Strictly 2 columns on mobile, 3 on lg+ */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {displayReviews.map((review, idx) => {
            // Consistent 4 or 5 star rating logic
            const rating = (parseInt(review.id) % 3 === 0) ? 4 : 5;
            
            return (
              <motion.div
                key={`${review.id}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="h-full"
              >
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 h-full transition-all duration-300 shadow-xl rounded-2xl overflow-hidden group">
                  <CardContent className="p-4 md:p-8 flex flex-col h-full relative">
                    {/* Top: Username (Bold) */}
                    <div className="mb-4">
                      <p className="font-black text-white uppercase text-[10px] md:text-base tracking-tight truncate">
                        {review.name}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">
                          {review.country}
                        </span>
                        <span className="text-[8px]">{review.flag}</span>
                      </div>
                    </div>

                    {/* Middle: Review Text (Truncated for grid symmetry) */}
                    <div className="flex-grow mb-6">
                      <p className="text-[9px] md:text-sm text-white/70 leading-relaxed italic line-clamp-3">
                        "{review.text}"
                      </p>
                    </div>

                    {/* Bottom: Star Rating & Trust Signal */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <div className="flex gap-0.5 md:gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={cn(
                              "w-2.5 h-2.5 md:w-3.5 md:h-3.5",
                              i < rating ? "text-yellow-500 fill-yellow-500" : "text-white/10"
                            )} 
                          />
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-1 text-[8px] font-black text-white/20 uppercase tracking-widest">
                        <ShieldCheck className="w-3 h-3 text-primary opacity-50" />
                        <span className="hidden sm:inline">Safe</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
