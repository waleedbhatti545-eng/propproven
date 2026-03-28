import { AlertTriangle, AlertOctagon } from "lucide-react";

export default function DisclaimerPage() {
    return (
        <div className="min-h-screen bg-[#0A0A0A] relative pb-32 overflow-hidden">
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-red/5 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

            <div className="max-w-4xl mx-auto px-4 md:px-8 pt-32 md:pt-40 relative z-10">
                
                {/* Header */}
                <div className="text-center mb-16 space-y-6 border-b border-white/10 pb-16">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red text-sm font-bold uppercase tracking-widest backdrop-blur-md">
                        <AlertTriangle className="w-5 h-5 flex-shrink-0" /> FTC & Risk
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight uppercase">
                        Legal Disclaimer
                    </h1>
                </div>

                {/* Content */}
                <div className="space-y-8 text-[#A3A3A3] leading-loose text-lg font-medium">
                    <div className="bg-[#111111] p-8 rounded-3xl border border-white/5 space-y-6">
                        
                        <div className="bg-brand-red/10 border border-brand-red/30 rounded-2xl p-6 text-brand-red/90 flex gap-5 mb-10">
                            <AlertOctagon className="w-10 h-10 shrink-0 text-brand-red" />
                            <div>
                                <h3 className="text-xl font-bold text-brand-red mb-2 uppercase tracking-widest">Affiliate Disclosure</h3>
                                <p className="text-sm leading-relaxed text-brand-red/80">
                                    In compliance with the FTC guidelines, please assume that any/all of the links on PropProven.com are affiliate links of which we receive a small commission from sales of certain items, but the price is the same for you. As PropProven has grown, so have costs associated with running and maintaining it, and affiliate links are a way we help offset these costs.
                                </p>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-white">Not Financial Advice</h2>
                        <p>The information contained on PropProven.com is provided for informational and educational purposes only, and should not be construed as financial or investment advice. You should not act or refrain from acting on the basis of any content included in this site without seeking legal or other professional advice.</p>
                        
                        <h2 className="text-2xl font-bold text-white mt-10">No Guarantees of Performance</h2>
                        <p>Passing a proprietary trading firm's evaluation phase requires significant skill and risk management. No information on this website constitutes a guarantee that you will pass an evaluation, receive funding, or generate profits. Trading forex, CFD, crypto, and futures carries immense risk.</p>
                        
                        <h2 className="text-2xl font-bold text-white mt-10">Accuracy of Information</h2>
                        <p>While we strive to keep the information on PropProven up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, firm rules, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.</p>

                    </div>
                </div>
            </div>
        </div>
    );
}
