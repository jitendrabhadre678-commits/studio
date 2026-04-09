"use client";

import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { CircleHelp } from "lucide-react";
import { SupportTrigger } from "@/components/support/SupportTrigger";

export function FAQ() {
  const faqs = [
    {
      q: "How do rewards work?",
      a: "Users must complete partner offers to qualify for rewards. Completion and verification are required before rewards are issued. Once verified, your digital code will be revealed in your Reward Vault."
    },
    {
      q: "How are the codes verified?",
      a: "All digital codes are verified for validity before delivery. Thousands of users successfully engage with partner offers to claim their rewards daily."
    },
    {
      q: "How long does it take?",
      a: "Most activities take less than 2 minutes to complete. Codes are delivered after successful advertiser completion and human session verification."
    },
    {
      q: "What is the minimum withdrawal?",
      a: "The minimum withdrawal for cash earnings (PayPal) is $5.00. Gift cards can be claimed as soon as you complete a qualifying partner offer."
    },
    {
      q: "Why do I need to complete an offer?",
      a: "Advertisers sponsor these rewards to reach users like you. Completing an offer proves you are a real user and generates the value needed to provide the reward at no direct cost to you."
    }
  ];

  return (
    <div id="faq" className="py-20 px-6 md:px-12 relative scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-4">
             <CircleHelp className="w-4 h-4 text-primary" />
             <span className="text-xs font-black uppercase tracking-widest text-primary">Support Center</span>
          </div>
          <h2 className="font-headline text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <div className="mt-4">
            <SupportTrigger />
          </div>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="bg-white/5 rounded-2xl border-white/5 px-6 overflow-hidden">
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
    </div>
  );
}
