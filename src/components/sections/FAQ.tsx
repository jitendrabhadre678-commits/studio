
"use client";

import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export function FAQ() {
  const faqs = [
    {
      q: "How do I unlock rewards?",
      a: "Simply browse our Reward Gallery, select a gift card, and complete one quick advertiser activity. Once verified, your digital code will be instantly revealed in your Reward Vault."
    },
    {
      q: "Are the gift cards real?",
      a: "Yes! All digital codes are sourced from official brand retailers and verified for validity. Thousands of users successfully redeem their rewards daily."
    },
    {
      q: "How long does it take?",
      a: "Most activities take less than 2 minutes to complete. Codes are delivered instantly upon successful verification."
    },
    {
      q: "What is the minimum withdrawal?",
      a: "The minimum withdrawal for cash earnings (PayPal) is $5.00. Gift cards can be claimed as soon as you complete a qualifying offer."
    },
    {
      q: "Why do I need to complete an offer?",
      a: "Advertisers sponsor these rewards to reach users like you. Completing an offer proves you are a real user and generates the value needed to provide the reward for free."
    }
  ];

  return (
    <section className="py-24 px-4 bg-black/40">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-4">
             <HelpCircle className="w-4 h-4 text-primary" />
             <span className="text-xs font-black uppercase tracking-widest text-primary">Support Center</span>
          </div>
          <h2 className="font-headline text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="glass-card rounded-2xl border-white/5 px-6 overflow-hidden">
              <AccordionTrigger className="text-white hover:text-primary transition-colors font-bold text-left py-6 uppercase tracking-tight">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
