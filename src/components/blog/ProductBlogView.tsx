
'use client';

import BlogPostTemplate from '@/components/blog/BlogPostTemplate';
import { ProductBlogOutput } from '@/ai/flows/generate-product-blog-flow';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  MousePointerClick, 
  Unlock, 
  Gamepad2, 
  ShieldCheck, 
  Gift,
  ArrowRight
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

/**
 * @fileOverview Specialized View for AI-generated Product Guides.
 */

interface ProductBlogViewProps {
  productName: string;
  category: string;
  data: ProductBlogOutput;
}

export function ProductBlogView({ productName, category, data }: ProductBlogViewProps) {
  const steps = [
    { icon: <MousePointerClick />, text: `Select your ${productName} value from our gallery.` },
    { icon: <Unlock />, text: "Click the Reveal Code button to start the process." },
    { icon: <Gamepad2 />, text: "Complete one quick activity (app test or survey)." },
    { icon: <ShieldCheck />, text: "Wait for our secure node to verify your human session." },
    { icon: <Gift />, text: "Your unique digital code is revealed in your vault." }
  ];

  const htmlContent = `
    <section>
      <h2>Introduction</h2>
      <p>${data.introduction}</p>
    </section>

    <section>
      <h2>What is a ${productName} Gift Card?</h2>
      <p>${data.whatIs}</p>
    </section>

    <section>
      <h2>Where Can You Use It?</h2>
      <p>${data.whereToUse}</p>
    </section>

    <div class="grid md:grid-cols-2 gap-8 my-12">
      <div class="glass-card p-8 rounded-3xl border-green-500/20 bg-green-500/5">
        <h3 class="text-green-500 flex items-center gap-2 mb-4 font-black uppercase text-sm tracking-widest">
          <CheckCircle2 class="w-5 h-5" /> Best Practices
        </h3>
        <ul class="space-y-3">
          ${data.tips.dos.map(tip => `<li class="text-sm text-white/70 flex gap-2"><span>•</span> ${tip}</li>`).join('')}
        </ul>
      </div>
      <div class="glass-card p-8 rounded-3xl border-red-500/20 bg-red-500/5">
        <h3 class="text-red-500 flex items-center gap-2 mb-4 font-black uppercase text-sm tracking-widest">
          <XCircle class="w-5 h-5" /> Avoid These
        </h3>
        <ul class="space-y-3">
          ${data.tips.donts.map(tip => `<li class="text-sm text-white/70 flex gap-2"><span>•</span> ${tip}</li>`).join('')}
        </ul>
      </div>
    </div>

    <section class="py-10">
      <h2 class="text-center mb-12">Your Step-by-Step Path to Rewards</h2>
      <div class="space-y-4">
        ${steps.map((step, i) => `
          <div class="glass-card p-6 rounded-2xl flex items-center gap-6 border-white/5 group hover:border-primary/30 transition-all">
            <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 font-black">
              ${i + 1}
            </div>
            <p class="text-white/80 font-bold">${step.text}</p>
          </div>
        `).join('')}
      </div>
    </section>

    <section class="pt-12">
      <h2 class="flex items-center gap-3"><HelpCircle class="text-primary" /> Common Questions</h2>
      <div class="space-y-4 mt-8">
        ${data.faq.map((item, i) => `
          <div class="glass-card p-6 rounded-2xl border-white/5">
            <h4 class="text-white font-black uppercase text-xs tracking-widest mb-2">${item.q}</h4>
            <p class="text-sm text-muted-foreground">${item.a}</p>
          </div>
        `).join('')}
      </div>
    </section>
  `;

  return (
    <BlogPostTemplate 
      title={`How To Get ${productName} in 2026 (Step-by-Step Guide)`}
      category={`${category} Guide`}
      author={{
        name: "Alex Rivera",
        title: "Gaming Rewards Lead",
        initials: "AR",
        date: "March 2026"
      }}
      htmlContent={htmlContent}
      ctaText={`Claim Your ${productName} Now`}
    />
  );
}
