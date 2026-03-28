import { Lock, ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#0A0A0A] relative pb-32 overflow-hidden">
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-red/5 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

            <div className="max-w-4xl mx-auto px-4 md:px-8 pt-32 md:pt-40 relative z-10">
                
                {/* Header */}
                <div className="text-center mb-16 space-y-6 border-b border-white/10 pb-16">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red text-sm font-bold uppercase tracking-widest backdrop-blur-md">
                        <Lock className="w-5 h-5" /> Security
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight uppercase">
                        Privacy Policy
                    </h1>
                    <p className="text-[#A3A3A3] text-lg font-medium">Last Updated: March 2026</p>
                </div>

                {/* Content */}
                <div className="space-y-8 text-[#A3A3A3] leading-loose text-lg font-medium">
                    <div className="bg-[#111111] p-8 rounded-3xl border border-white/5 space-y-6">
                        <h2 className="text-2xl font-bold text-white">1. Information We Collect</h2>
                        <p>PropProven collects information that you voluntarily provide to us when you register on the Site, express an interest in obtaining information about us or our products and services, when you participate in activities on the Site, or otherwise when you contact us.</p>
                        <p>The personal information that we collect depends on the context of your interactions with us and the Site, the choices you make, and the products and features you use (e.g., submitting your email for our Newsletter).</p>

                        <h2 className="text-2xl font-bold text-white mt-10">2. Tracking Technologies</h2>
                        <p>We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience. When you access the Site, your personal information is not collected through the use of tracking technology.</p>
                        
                        <h2 className="text-2xl font-bold text-white mt-10">3. How We Use Your Information</h2>
                        <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
                        <ul className="list-disc pl-6 space-y-2 mt-4 text-white/70">
                            <li>Deliver targeted advertising, coupons, newsletters, and other information regarding promotions.</li>
                            <li>Increase the efficiency and operation of the Site.</li>
                            <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-white mt-10">4. Disclosure of Your Information</h2>
                        <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows: By Law or to Protect Rights. If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
