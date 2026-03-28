import { FileText, ShieldCheck } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[#0A0A0A] relative pb-32 overflow-hidden">
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-red/5 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

            <div className="max-w-4xl mx-auto px-4 md:px-8 pt-32 md:pt-40 relative z-10">
                
                {/* Header */}
                <div className="text-center mb-16 space-y-6 border-b border-white/10 pb-16">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red text-sm font-bold uppercase tracking-widest backdrop-blur-md">
                        <FileText className="w-5 h-5" /> Legal
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight uppercase">
                        Terms of Service
                    </h1>
                    <p className="text-[#A3A3A3] text-lg font-medium">Last Updated: March 2026</p>
                </div>

                {/* Content */}
                <div className="space-y-8 text-[#A3A3A3] leading-loose text-lg font-medium">
                    <div className="bg-[#111111] p-8 rounded-3xl border border-white/5 space-y-6">
                        <h2 className="text-2xl font-bold text-white">1. Acceptance of Terms</h2>
                        <p>By accessing and using PropProven.com ("the Site"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
                        
                        <h2 className="text-2xl font-bold text-white mt-10">2. Description of Service</h2>
                        <p>PropProven provides comparative information, reviews, and promotional discount codes for proprietary trading firms ("Prop Firms"). We are an informational hub and review site. We do not process trades, hold client funds, or act as a broker/dealer in any capacity.</p>
                        
                        <h2 className="text-2xl font-bold text-white mt-10">3. Affiliation and Compensation</h2>
                        <p>Some of the links on this website are affiliate links. This means that if you click on the link and purchase a challenge or evaluation from a listed Firm, PropProven may receive an affiliate commission at no extra cost to you. We strive to provide honest reviews irrespective of these affiliations.</p>

                        <h2 className="text-2xl font-bold text-white mt-10">4. Financial Risk Warning</h2>
                        <div className="bg-brand-red/10 border border-brand-red/20 rounded-2xl p-6 text-brand-red/90 flex gap-4 mt-4">
                            <ShieldCheck className="w-8 h-8 shrink-0" />
                            <p className="text-sm leading-relaxed">
                                <strong>High Risk Investment:</strong> Trading in financial markets carries a high level of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite. Past performance of any trading system or methodology is not necessarily indicative of future results.
                            </p>
                        </div>

                        <h2 className="text-2xl font-bold text-white mt-10">5. Limitation of Liability</h2>
                        <p>In no event shall PropProven, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
