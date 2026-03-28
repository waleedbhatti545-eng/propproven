"use client";

import { useState } from "react";
import { Plus, Minus, MessageCircleQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "Do you offer Account Matching for Prop Firms?",
    answer: "Yes. Many of our premium partners actively bypass evaluation processes if you already possess a funded account. Use our provided discount links to contact their live support desk pre-checkout to bypass standard scaling barriers.",
  },
  {
    question: "Are these active discount codes genuine?",
    answer: "100%. Our automated deal desk actively bridges into firm databases to fetch the highest possible live promotional arrays. These passes are exclusive and often significantly beat retail holiday reductions.",
  },
  {
    question: "How do I filter out scam brokers?",
    answer: "Every firm on our verified grid runs through a 17-point structural evaluation matrix involving payout-proof tests, latency checks, and slippage monitoring before we authorize their listing on our engine.",
  },
  {
    question: "What does '1-Step' vs '2-Step' Evaluation mean?",
    answer: "A 1-Step challenge requires you to hit a single profit target (usually 10%) before getting live capital. A 2-Step challenge splits this into an 8% Phase 1 and 5% Phase 2. We allow you to filter these models dynamically in our data table.",
  },
  {
    question: "Will you provide me with trading capital?",
    answer: "We are an intelligent infrastructure aggregator, not a proprietary trading firm ourselves. We provide the analytics, matrices, and direct discount routing to ensure you secure capital at the best firms for the lowest prices.",
  }
];

export function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 bg-[#0A0A0A] relative overflow-hidden border-t border-white/5">
      
      {/* Heavy glow behind the component */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red/5 blur-[150px] rounded-[100%] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
        
        <div className="text-center mb-16 space-y-4">
            <div className="inline-flex flex-col items-center justify-center font-bold text-white mb-2">
                <div className="w-16 h-16 rounded-3xl bg-[#111] border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.1)] mb-4 animate-in fade-in slide-in-from-bottom duration-1000">
                    <MessageCircleQuestion className="w-8 h-8 text-brand-red" />
                </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase leading-[1.1]">
                Frequently Asked <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange drop-shadow-md">Questions</span>
            </h2>
            <p className="text-[#A3A3A3] text-lg font-medium mt-4">Everything you need to know about our data engine and partner firm structures.</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index}
                className={cn(
                  "group bg-[#0F0F0F] rounded-[2rem] border transition-all duration-500 overflow-hidden cursor-pointer",
                  isOpen ? "border-brand-red/30 shadow-[0_10px_40px_rgba(220,38,38,0.1)] bg-[#111111]" : "border-white/5 hover:border-white/20 hover:bg-[#121212]"
                )}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <div className="px-8 py-6 md:py-8 flex items-center justify-between gap-6">
                  <h3 className={cn(
                    "text-lg md:text-xl font-black uppercase tracking-tight transition-colors duration-300",
                    isOpen ? "text-white" : "text-neutral-300 group-hover:text-white"
                  )}>
                    {faq.question}
                  </h3>
                  
                  <div className={cn(
                    "shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500",
                    isOpen ? "bg-brand-red text-white rotate-180 shadow-[0_0_15px_rgba(220,38,38,0.4)]" : "bg-white/5 text-neutral-400 group-hover:bg-white/10 group-hover:text-white"
                  )}>
                    {isOpen ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                  </div>
                </div>

                <div 
                  className={cn(
                    "px-8 overflow-hidden transition-all duration-500 ease-in-out",
                    isOpen ? "max-h-[300px] opacity-100 pb-8" : "max-h-0 opacity-0 pb-0"
                  )}
                >
                  <div className="w-full h-px bg-white/5 mb-6" />
                  <p className="text-neutral-400 font-medium leading-relaxed pr-8">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
