
'use client';

import { motion } from 'framer-motion';
import { reviews } from '@/lib/reviews';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, Star, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * @fileOverview Refined Reviews Section.
 * Features a strict 10-item limit, 2-column mobile grid, and specular glass cards.
 */

export function ReviewsSection() {
  // Limit to exactly 10 reviews as per prompt
  const displayReviews = reviews.slice(0, 10);

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
            Join thousands of real players already unlocking rewards.
          </p>
        </div>

        {/* Responsive Grid: Exactly 2 columns on mobile, 3 on lg+ */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {displayReviews.map((review, idx) => {
            // Consistent 4 or 5 star rating as per prompt
            const rating = (idx % 3 === 0) ? 4 : 5;
            
            return (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="h-full"
              >
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 h-full transition-all duration-300 shadow-xl rounded-xl overflow-hidden group">
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

                    {/* Middle: Review Text (2-3 lines max) */}
                    <div className="flex-grow mb-6">
                      <p className="text-[9px] md:text-sm text-white/70 leading-relaxed italic line-clamp-3">
                        "{review.text}"
                      </p>
                    </div>

                    {/* Bottom: Star Rating (4 or 5 only) */}
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
                      
                      <div className="hidden md:flex items-center gap-1 text-[8px] font-black text-white/20 uppercase tracking-widest">
                        <ShieldCheck className="w-3 h-3 text-primary" /> Safe
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" className="h-14 px-10 rounded-xl border-white/10 text-white font-black uppercase tracking-widest hover:bg-white/5 shadow-2xl transition-all text-[10px] md:text-xs">
            <Link href="/reviews">
              View All Testimonials <ChevronRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
