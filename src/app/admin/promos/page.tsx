"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { Ticket, Search, Edit2, Percent, CalendarDays, X, Save, Trash2 } from "lucide-react";
import { FirmData } from "@/data/firms";
import { toast } from "sonner";
import { FormField } from "@/components/admin/FormField";

export default function AdminPromosPage() {
  const [firms, setFirms] = useState<FirmData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal State
  const [selectedFirm, setSelectedFirm] = useState<FirmData | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchFirms();
  }, []);

  async function fetchFirms() {
    setLoading(true);
    const { data, error } = await supabase.from("firms").select("*").order("name", { ascending: true });
    if (!error && data) {
      setFirms(data as FirmData[]);
    } else {
      toast.error("Failed to load firms database.");
    }
    setLoading(false);
  }

  const filteredFirms = firms.filter(firm => 
    firm.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (firm.discountCode && firm.discountCode.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const openPromoEditor = (firm: FirmData) => {
    setSelectedFirm(firm);
  };

  const closePromoEditor = () => {
    setSelectedFirm(null);
  };

  const handleSavePromo = async () => {
    if (!selectedFirm) return;
    setIsSaving(true);
    
    const { error } = await supabase.from("firms").update({
      discountCode: selectedFirm.discountCode,
      discountAmount: selectedFirm.discountAmount,
      discountExpiry: selectedFirm.discountExpiry,
      promoDescription: selectedFirm.promoDescription
    }).eq("slug", selectedFirm.slug);

    setIsSaving(false);
    
    if (error) {
      toast.error(`Error saving promo: ${error.message}`);
    } else {
      toast.success(`${selectedFirm.name} promo updated successfully!`);
      // Update local state to reflect UI change instantly
      setFirms(firms.map(f => f.slug === selectedFirm.slug ? selectedFirm : f));
      closePromoEditor();
    }
  };

  const handleClearPromo = async () => {
    if (!selectedFirm) return;
    const confirmClear = window.confirm(`Are you sure you want to delete the active promo for ${selectedFirm.name}?`);
    if (!confirmClear) return;

    setIsSaving(true);
    const { error } = await supabase.from("firms").update({
      discountCode: null,
      discountAmount: null,
      discountExpiry: null,
      promoDescription: null
    }).eq("slug", selectedFirm.slug);
    
    setIsSaving(false);

    if (error) {
      toast.error("Failed to clear promo.");
    } else {
      toast.success(`Promo cleared for ${selectedFirm.name}`);
      setFirms(firms.map(f => f.slug === selectedFirm.slug ? { ...f, discountCode: "", discountAmount: "", discountExpiry: "", promoDescription: "" } : f));
      closePromoEditor();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
            <Ticket className="w-8 h-8 text-brand-red" />
            Promo Control Panel
          </h1>
          <p className="text-neutral-400">Manage all discount codes, sale amounts, and expirations globally.</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-neutral-500 group-focus-within:text-brand-red transition-colors" />
        </div>
        <input 
          type="text"
          placeholder="Search offers by firm name or discount code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:bg-white/5 backdrop-blur-xl transition-all shadow-lg focus:border-brand-red/50"
        />
      </div>

      {/* Promos Data Grid */}
      <div className="rounded-2xl border border-white/10 bg-[#0c0c12]/80 backdrop-blur-md overflow-hidden shadow-2xl">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-red"></div>
          </div>
        ) : filteredFirms.length === 0 ? (
          <div className="text-center py-20">
            <Ticket className="h-12 w-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white">No firms found</h3>
            <p className="text-neutral-500 mt-2">Adjust your search criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-black/60 text-xs uppercase tracking-wider text-neutral-400">
                  <th className="p-4 font-semibold">Prop Firm</th>
                  <th className="p-4 font-semibold">Active Code</th>
                  <th className="p-4 font-semibold">Amount</th>
                  <th className="p-4 font-semibold">Expiry Date</th>
                  <th className="p-4 font-semibold text-right">Offer Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredFirms.map((firm) => {
                  const hasPromo = !!firm.discountCode;
                  return (
                    <tr key={firm.slug} className="hover:bg-white/5 transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-xl bg-white p-1.5 flex flex-shrink-0 items-center justify-center border-b-2 shadow-inner"
                            style={{ borderColor: firm.color || '#fff' }}
                          >
                            <img src={firm.logo} alt={firm.name} className="max-w-full max-h-full object-contain" />
                          </div>
                          <div>
                             <span className="font-semibold text-white block">{firm.name}</span>
                             {firm.promoDescription && <span className="text-xs text-neutral-500 truncate max-w-[200px] block" title={firm.promoDescription}>{firm.promoDescription}</span>}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        {hasPromo ? (
                          <div className="inline-flex items-center gap-2 rounded-lg bg-brand-red/10 px-3 py-1.5 border border-brand-red/30 shadow-[0_0_10px_rgba(220,38,38,0.2)]">
                            <Ticket className="w-4 h-4 text-brand-red" />
                            <span className="font-mono text-brand-red font-bold tracking-wide">{firm.discountCode}</span>
                          </div>
                        ) : (
                          <span className="text-neutral-600 italic">Inactive</span>
                        )}
                      </td>
                      <td className="p-4">
                        {firm.discountAmount ? (
                          <div className="flex items-center gap-1.5 text-white font-medium">
                            <Percent className="w-4 h-4 text-brand-orange" />
                            {firm.discountAmount}
                          </div>
                        ) : (
                          <span className="text-neutral-600">-</span>
                        )}
                      </td>
                      <td className="p-4">
                        {firm.discountExpiry ? (
                          <div className="flex items-center gap-1.5 text-neutral-300">
                            <CalendarDays className="w-4 h-4 text-neutral-500" />
                            {new Date(firm.discountExpiry).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }).replace('Invalid Date', firm.discountExpiry)}
                          </div>
                        ) : (
                          <span className="text-neutral-600">-</span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => openPromoEditor(firm)}
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-brand-red/50 hover:shadow-[0_0_15px_-5px_rgba(220,38,38,0.5)]"
                        >
                          <Edit2 className="w-4 h-4 text-brand-red" />
                          Control
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Control Panel Modal Overlay */}
      {selectedFirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closePromoEditor} />
          
          <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#07070a] p-8 shadow-2xl overflow-hidden">
             
             {/* Dynamic Glow Banner Based on Firm Color */}
             <div className="absolute top-0 left-0 w-full h-1" style={{ background: selectedFirm.color || 'var(--brand-red)' }} />
             <div className="absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-20 pointer-events-none" style={{ background: selectedFirm.color || 'var(--brand-red)' }} />

             <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4 relative z-10">
               <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white p-2 flex items-center justify-center shadow-lg">
                    <img src={selectedFirm.logo} alt="Logo" className="max-w-full max-h-full" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Offer Control Panel</h2>
                    <p className="text-neutral-400 font-mono text-sm tracking-widest">{selectedFirm.name.toUpperCase()}</p>
                  </div>
               </div>
               <button onClick={closePromoEditor} className="p-2 text-neutral-500 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                 <X className="w-6 h-6" />
               </button>
             </div>

             <div className="space-y-6 relative z-10">
                <div className="grid grid-cols-2 gap-6">
                   <FormField 
                     label="Discount Code" 
                     placeholder="e.g. PROVEN20"
                     value={selectedFirm.discountCode || ""} 
                     onChange={(e) => setSelectedFirm({ ...selectedFirm, discountCode: e.target.value })} 
                   />
                   <FormField 
                     label="Highlight Tag" 
                     placeholder="e.g. 20% OFF"
                     value={selectedFirm.discountAmount || ""} 
                     onChange={(e) => setSelectedFirm({ ...selectedFirm, discountAmount: e.target.value })} 
                   />
                </div>
                
                <FormField 
                  label="Deep Description Subtitle" 
                  type="textarea"
                  rows={2}
                  placeholder="Get 20% off all challenges + 15% profit split bonus."
                  value={selectedFirm.promoDescription || ""} 
                  onChange={(e) => setSelectedFirm({ ...selectedFirm, promoDescription: e.target.value })} 
                />

                <FormField 
                  label="Exact Expiry Date & Time (Countdown)" 
                  type="datetime-local"
                  value={selectedFirm.discountExpiry || ""} 
                  onChange={(e) => setSelectedFirm({ ...selectedFirm, discountExpiry: e.target.value })} 
                />

                <div className="flex gap-4 pt-4 border-t border-white/5">
                   <button 
                     onClick={handleSavePromo}
                     disabled={isSaving}
                     className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange px-6 py-3 font-bold text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_-5px_rgba(220,38,38,0.6)] disabled:opacity-50"
                   >
                     {isSaving ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <Save className="w-5 h-5" />}
                     Save Offer Details
                   </button>
                   <button 
                     onClick={handleClearPromo}
                     disabled={isSaving || !selectedFirm.discountCode}
                     className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500/10 px-6 py-3 font-bold text-red-500 transition-all hover:bg-red-500/20 disabled:opacity-30 border border-red-500/20"
                     title="Completely wipe this active offer"
                   >
                     <Trash2 className="w-5 h-5" />
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
