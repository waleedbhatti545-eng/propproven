import { HeroSection, FeaturesSection } from "@/components/sections/Hero";
import { FeaturedFirms } from "@/components/sections/FeaturedFirms";
import { PopularFirms } from "@/components/sections/PopularFirms";
import { HomeFAQ } from "@/components/sections/HomeFAQ";

import { Search, ArrowRightLeft, Wallet } from "lucide-react";
import { supabase } from "@/utils/supabase";

export const revalidate = 60;

export default async function Home() {
  const { data: firms } = await supabase.from("firms").select("*, accounts(*), offers(*)");
  const liveFirms = firms || [];

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      <div id="featured-firms">
        <FeaturedFirms firms={liveFirms} />
      </div>

      <div id="firm-carousel">
        <PopularFirms firms={liveFirms} />
      </div>

      <div id="how-it-works" className="relative">
        <section className="py-32 bg-[#050505] relative overflow-hidden">
          {/* Ambient Lighting */}
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-red/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            <div className="text-center mb-20 md:mb-28 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-red/5 border border-brand-red/20 text-brand-red text-xs font-black uppercase tracking-[0.2em] mb-2">
                 Your Funding Journey
              </div>
              <h2 className="text-3xl md:text-6xl font-black tracking-tight text-white uppercase leading-none">
                How We Make <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange drop-shadow-[0_0_30px_rgba(220,38,38,0.5)]">Funding Simple</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 relative pb-10">
              
              {/* Connecting Data Line (Desktop) */}
              <div className="hidden md:block absolute top-[2.5rem] left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-transparent via-brand-red/50 to-transparent z-0 overflow-hidden">
                  <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-white to-transparent absolute top-0 left-0 animate-[shimmer_3s_infinite]" />
              </div>

              {/* Step 1 */}
              <div className="group relative flex flex-col items-center text-center z-10">
                 <div className="w-20 h-20 rounded-[2rem] bg-[#0F0F0F] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] flex items-center justify-center relative mb-8 group-hover:-translate-y-3 group-hover:shadow-[0_20px_40px_rgba(220,38,38,0.2)] group-hover:border-brand-red/40 transition-all duration-500">
                     <div className="absolute inset-0 bg-brand-red/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                     <Search className="w-8 h-8 text-brand-red relative z-10" />
                     <div className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-brand-orange text-white text-xs font-black flex items-center justify-center border-4 border-[#050505] shadow-lg">1</div>
                 </div>
                 <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4 group-hover:text-brand-red transition-colors">Discover & Filter</h3>
                 <p className="text-[#A3A3A3] font-medium leading-relaxed max-w-[280px]">Bypass the noise. Use our proprietary data engine to instantly filter out scams and isolate your exact match firms.</p>
              </div>

              {/* Step 2 */}
              <div className="group relative flex flex-col items-center text-center z-10 mt-0 md:mt-12">
                 <div className="w-20 h-20 rounded-[2rem] bg-[#0F0F0F] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] flex items-center justify-center relative mb-8 group-hover:-translate-y-3 group-hover:shadow-[0_20px_40px_rgba(220,38,38,0.2)] group-hover:border-brand-red/40 transition-all duration-500">
                     <div className="absolute inset-0 bg-brand-red/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                     <ArrowRightLeft className="w-8 h-8 text-brand-red relative z-10" />
                     <div className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-brand-orange text-white text-xs font-black flex items-center justify-center border-4 border-[#050505] shadow-lg">2</div>
                 </div>
                 <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4 group-hover:text-brand-orange transition-colors">Head-to-Head</h3>
                 <p className="text-[#A3A3A3] font-medium leading-relaxed max-w-[280px]">Load your top contenders into our dynamic matrix to expose hidden spreads, payout rules, and profit splits instantly.</p>
              </div>

              {/* Step 3 */}
              <div className="group relative flex flex-col items-center text-center z-10">
                 <div className="w-20 h-20 rounded-[2rem] bg-[#0F0F0F] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] flex items-center justify-center relative mb-8 group-hover:-translate-y-3 group-hover:shadow-[0_20px_40px_rgba(220,38,38,0.2)] group-hover:border-brand-red/40 transition-all duration-500">
                     <div className="absolute inset-0 bg-brand-red/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                     <Wallet className="w-8 h-8 text-brand-red relative z-10" />
                     <div className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-brand-orange text-white text-xs font-black flex items-center justify-center border-4 border-[#050505] shadow-lg">3</div>
                 </div>
                 <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4 group-hover:text-amber-500 transition-colors">Secure Capital</h3>
                 <p className="text-[#A3A3A3] font-medium leading-relaxed max-w-[280px]">Deploy our verified 'Tear-Away' promotional passes to slice evaluation fees and begin your path to scaled capital.</p>
              </div>

            </div>
          </div>
        </section>
      </div>

      <div id="faq-section">
        <HomeFAQ />
      </div>

      <FeaturesSection />



      <section className="py-24 relative bg-[#0A0A0A] flex justify-center">
        <div className="w-[95%] md:w-[85%] max-w-[1400px] relative">
          
          {/* Outer edge glow shadow for the container */}
          <div className="absolute inset-0 bg-brand-red/5 blur-[80px] rounded-[40px] pointer-events-none" />

          {/* Main Card Container */}
          <div className="relative bg-[#0F0F0F] border border-white/5 rounded-[40px] px-6 py-10 md:p-24 text-center overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
            
            {/* Deep Interior Side Glows (Exactly like the mockup) */}
            <div className="absolute top-1/2 -left-[15%] -translate-y-1/2 w-[700px] h-[700px] bg-brand-red/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute top-1/2 -right-[15%] -translate-y-1/2 w-[700px] h-[700px] bg-brand-red/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

            <div className="relative z-10">
              <span className="text-brand-red text-xs md:text-sm font-black tracking-[0.2em] uppercase mb-4 md:mb-6 block">
                STAY CONNECTED
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-[3.25rem] font-black tracking-tight text-white mb-8 md:mb-12 leading-[1.2]">
                Subscribe For The Latest In Prop <br className="hidden md:block" /> 
                Trading News And Deals
              </h2>
              
              <div className="max-w-md mx-auto relative flex items-center">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full bg-[#1A1A1A] border border-white/5 text-white placeholder-gray-500 rounded-full h-[52px] md:h-[60px] pl-5 md:pl-6 pr-[110px] md:pr-40 focus:outline-none focus:border-brand-red/50 transition-colors font-medium shadow-inner text-sm"
                />
                <button className="absolute right-1.5 top-1.5 bottom-1.5 bg-brand-red hover:bg-[#EF4444] text-white px-5 md:px-8 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] text-[10px] md:text-sm uppercase tracking-wide">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
