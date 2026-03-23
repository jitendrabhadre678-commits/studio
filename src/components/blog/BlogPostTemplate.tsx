'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Zap, ArrowRight, Clock, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * @fileOverview Reusable Blog Post Template.
 * Features: Hero Title, Author Metadata, HTML Body, and OGAds CTA.
 */

interface BlogPostTemplateProps {
  title: string;
  author: {
    name: string;
    title: string;
    initials: string;
    date: string;
  };
  htmlContent: string;
  ctaText?: string;
  category?: string;
}

export function BlogPostTemplate({ 
  title, 
  author, 
  htmlContent, 
  ctaText = "Claim Your Free Reward",
  category = "Exclusive Guide 2026"
}: BlogPostTemplateProps) {
  
  const handleLockerTrigger = () => {
    if (typeof window !== 'undefined') {
      if (!document.getElementById('ogjs')) {
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.id = 'ogjs';
        s.src = 'https://gameflashx.space/cl/js/277ood';
        document.head.appendChild(s);
      } else {
        const win = window as any;
        if (win.ogads_locker && typeof win.ogads_locker.lock === 'function') {
          win.ogads_locker.lock();
        }
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white font-body selection:bg-[#ff4d00] selection:text-white">
      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Article Header */}
          <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 bg-[#ff4d00]/10 border border-[#ff4d00]/20 px-4 py-1.5 rounded-full mb-6">
              <Zap className="w-3.5 h-3.5 text-[#ff4d00]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4d00]">{category}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight uppercase tracking-tight">
              {title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/40 font-bold uppercase tracking-widest">
              {/* Author Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ff4d00] flex items-center justify-center text-white text-[11px] font-black shrink-0 shadow-[0_0_15px_rgba(255,77,0,0.3)]">
                  {author.initials}
                </div>
                <div className="text-left">
                  <div className="text-white text-[11px] font-black uppercase leading-tight">{author.name}</div>
                  <div className="text-[8px] text-white/40 font-bold uppercase tracking-widest leading-tight mt-0.5">{author.title}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Updated {author.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>Global Support</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <article className="bg-[#1a1a1a] p-8 md:p-12 rounded-[2.5rem] border border-white/5 mb-16 space-y-8 leading-relaxed text-white/80 shadow-2xl">
            <div 
              className="blog-content space-y-6"
              dangerouslySetInnerHTML={{ __html: htmlContent }} 
            />
          </article>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#ff4d00]/20 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Zap className="w-48 h-48 text-[#ff4d00]" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight leading-tight">
                Ready to start earning?
              </h3>
              <p className="text-white/60 mb-10 max-w-lg mx-auto font-medium">
                Join the thousands of users already unlocking free digital rewards every single day. Fast, secure, and verified.
              </p>
              <Button 
                onClick={handleLockerTrigger}
                className="bg-[#ff4d00] hover:bg-[#ff4d00]/90 text-white font-black px-12 h-16 rounded-2xl text-lg md:text-xl shadow-[0_10px_40px_rgba(255,77,0,0.3)] transition-all active:scale-95 group"
              >
                {ctaText} <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <div className="mt-8 flex items-center justify-center gap-4 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
                <span>256-bit Encrypted</span>
                <span className="w-1 h-1 bg-white/10 rounded-full" />
                <span>Instant Code Release</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
