
'use client';

import { Skeleton } from '@/components/ui/skeleton';

/**
 * @fileOverview Premium loading skeleton for the home page.
 * Mirrors the luxury layout with glassmorphism placeholders.
 */

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-[#050b18] overflow-hidden">
      {/* 1. Hero Skeleton */}
      <section className="relative pt-32 pb-24 px-4 flex flex-col items-center text-center">
        {/* Top Badge Placeholder */}
        <Skeleton className="h-8 w-48 rounded-full mb-12" />
        
        {/* Main Heading Lines */}
        <div className="space-y-4 mb-8 w-full flex flex-col items-center">
          <Skeleton className="h-12 md:h-20 w-[80%] md:w-[60%] rounded-xl" />
          <Skeleton className="h-12 md:h-20 w-[70%] md:w-[50%] rounded-xl" />
        </div>

        {/* Subtext */}
        <Skeleton className="h-4 w-[60%] md:w-[30%] rounded-full mb-12" />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Skeleton className="h-16 w-full sm:w-48 rounded-xl" />
          <Skeleton className="h-16 w-full sm:w-48 rounded-xl" />
        </div>

        {/* Trust Indicators Row */}
        <div className="flex gap-8 mt-24 pt-10 border-t border-white/5 w-full max-w-2xl justify-center">
          <Skeleton className="h-3 w-24 rounded-full" />
          <Skeleton className="h-3 w-24 rounded-full" />
          <Skeleton className="h-3 w-24 rounded-full" />
        </div>
      </section>

      {/* 2. Grid Skeleton */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 space-y-4">
          <Skeleton className="h-6 w-32 mx-auto rounded-full" />
          <Skeleton className="h-10 w-64 mx-auto rounded-xl" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="glass-card rounded-2xl border border-white/5 overflow-hidden p-6 space-y-6">
              {/* Image Block */}
              <Skeleton className="aspect-[16/10] w-full rounded-xl" />
              
              {/* Content Lines */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-5 w-32 rounded-lg" />
                  <Skeleton className="h-4 w-4 rounded-full" />
                </div>
                <Skeleton className="h-3 w-20 rounded-lg" />
              </div>

              {/* Footer Trust Bar */}
              <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                <Skeleton className="h-3 w-16 rounded-full" />
                <Skeleton className="h-3 w-12 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
