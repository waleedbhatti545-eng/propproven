import { Mail, MessageSquare, MapPin, Send, HeartHandshake, ShieldAlert, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#0A0A0A] relative pb-32 overflow-hidden">
            
            {/* Ambient Lighting */}
            <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-brand-red/10 blur-[200px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-red/5 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 md:pt-40 relative z-10">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red text-sm font-bold uppercase tracking-widest backdrop-blur-md shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                        <MessageSquare className="w-5 h-5 animate-pulse" />
                        Get In Touch
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight uppercase leading-[1.1]">
                        Prop Firm <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-[#FF4444] to-[#ff8888] drop-shadow-[0_0_40px_rgba(220,38,38,0.8)]">
                            Support
                        </span>
                    </h1>
                    <p className="text-[#A3A3A3] text-lg max-w-2xl mx-auto font-medium leading-relaxed mt-6">
                        Whether you want to list your proprietary trading firm, report a scam, or just say hello—our team is ready to help you navigate the prop space.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    
                    {/* Contact Form (Left Side - Takes 2 Columns) */}
                    <div className="lg:col-span-2 bg-[#111111]/80 backdrop-blur-2xl border border-white/5 rounded-[40px] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-red/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        
                        <h2 className="text-3xl font-bold text-white mb-8">Send us a Message</h2>
                        
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[#A3A3A3] uppercase tracking-wider ml-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="John Doe" 
                                        className="w-full bg-[#1A1A1A] border border-white/5 rounded-2xl h-14 px-5 text-white placeholder-gray-600 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/50 transition-all font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[#A3A3A3] uppercase tracking-wider ml-1">Email Address</label>
                                    <input 
                                        type="email" 
                                        placeholder="john@example.com" 
                                        className="w-full bg-[#1A1A1A] border border-white/5 rounded-2xl h-14 px-5 text-white placeholder-gray-600 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/50 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[#A3A3A3] uppercase tracking-wider ml-1">Subject / Department</label>
                                <div className="relative">
                                    <select className="w-full bg-[#1A1A1A] border border-white/5 rounded-2xl h-14 px-5 text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/50 transition-all font-medium appearance-none">
                                        <option value="general">General Inquiry</option>
                                        <option value="partnership">Firm Partnership / Listing</option>
                                        <option value="scam">Report a Scam Firm</option>
                                        <option value="payout">Submit Payout Proof</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-brand-red">
                                        ▼
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[#A3A3A3] uppercase tracking-wider ml-1">Your Message</label>
                                <textarea 
                                    rows={6}
                                    placeholder="How can we help you today?" 
                                    className="w-full bg-[#1A1A1A] border border-white/5 rounded-2xl p-5 text-white placeholder-gray-600 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/50 transition-all font-medium resize-none"
                                />
                            </div>

                            <Button className="w-full h-16 rounded-2xl bg-brand-red hover:bg-[#EF4444] text-white font-black text-lg uppercase tracking-widest shadow-[0_10px_30px_rgba(220,38,38,0.3)] hover:shadow-[0_10px_40px_rgba(220,38,38,0.5)] transition-all hover:-translate-y-1 group/submit overflow-hidden relative mt-4">
                                <span className="relative z-10 flex items-center gap-2">
                                    Send Transmission <Send className="w-5 h-5 ml-2 group-hover/submit:translate-x-1 group-hover/submit:-translate-y-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/submit:animate-[shimmer_1.5s_infinite]" />
                            </Button>
                        </form>
                    </div>

                    {/* Information Sidebar (Right Side) */}
                    <div className="space-y-6">
                        
                        <div className="bg-[#111111]/80 backdrop-blur-2xl border border-white/5 rounded-[32px] p-8 hover:border-brand-red/20 transition-colors group">
                            <div className="w-14 h-14 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <HeartHandshake className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Firm Partnerships</h3>
                            <p className="text-[#A3A3A3] text-sm leading-relaxed mb-6">Want to get your firm evaluated and listed on PropProven? Provide your CEO details and we will audit your firm.</p>
                            <a href="mailto:partners@propproven.com" className="text-brand-red font-bold hover:text-white transition-colors flex items-center gap-2 text-sm uppercase tracking-widest">
                                partners@propproven.com <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>

                        <div className="bg-[#111111]/80 backdrop-blur-2xl border border-white/5 rounded-[32px] p-8 hover:border-emerald-500/20 transition-colors group">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <ShieldAlert className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Report a Scam</h3>
                            <p className="text-[#A3A3A3] text-sm leading-relaxed mb-6">If a prop firm has maliciously denied your payout, send us the evidence. We investigate all claims.</p>
                            <a href="mailto:fraud@propproven.com" className="text-emerald-500 font-bold hover:text-white transition-colors flex items-center gap-2 text-sm uppercase tracking-widest">
                                fraud@propproven.com <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>

                        <div className="bg-[#111111]/80 backdrop-blur-2xl border border-white/5 rounded-[32px] p-8 group">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 text-white flex items-center justify-center mb-6">
                                <MapPin className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Headquarters</h3>
                            <p className="text-[#A3A3A3] text-sm leading-relaxed">
                                PropProven Operations Ltd.<br />
                                124 Trading Floor Ave<br />
                                London, UK EC3A 4AB
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
