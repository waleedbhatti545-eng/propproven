"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useAdminMarket } from "@/components/admin/AdminMarketContext";
import { Star, GripVertical, ChevronUp, ChevronDown, Plus, Minus, Save, Search, RefreshCw } from "lucide-react";
import { FirmData } from "@/data/firms";
import { toast } from "sonner";

export default function AdminFeaturedPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [featuredFirms, setFeaturedFirms] = useState<FirmData[]>([]);
  const [availableFirms, setAvailableFirms] = useState<FirmData[]>([]);

  const { marketType } = useAdminMarket();

  useEffect(() => {
    fetchFirms();
  }, [marketType]);

  async function fetchFirms() {
    setLoading(true);
    let query = supabase.from("firms").select("*");
    
    if (marketType === "futures") {
      query = query.eq("market_type", "futures");
    } else {
      query = query.or("market_type.eq.forex,market_type.is.null");
    }
    
    const { data, error } = await query;
    
    if (error) {
      toast.error("Error loading firms. Did you run the SQL snippet?");
      console.error(error);
      setLoading(false);
      return;
    }

    if (data) {
      const firms = data as FirmData[];
      const featured = firms.filter(f => f.is_featured === true).sort((a, b) => (a.featured_order || 0) - (b.featured_order || 0));
      const available = firms.filter(f => !f.is_featured).sort((a, b) => a.name.localeCompare(b.name));
      
      setFeaturedFirms(featured);
      setAvailableFirms(available);
    }
    setLoading(false);
  }

  const addToFeatured = (firm: FirmData) => {
    setAvailableFirms(prev => prev.filter(f => f.slug !== firm.slug));
    setFeaturedFirms(prev => [...prev, firm]);
  };

  const removeFromFeatured = (firm: FirmData) => {
    setFeaturedFirms(prev => prev.filter(f => f.slug !== firm.slug));
    setAvailableFirms(prev => [...prev, firm].sort((a, b) => a.name.localeCompare(b.name)));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const items = [...featuredFirms];
    const temp = items[index];
    items[index] = items[index - 1];
    items[index - 1] = temp;
    setFeaturedFirms(items);
  };

  const moveDown = (index: number) => {
    if (index === featuredFirms.length - 1) return;
    const items = [...featuredFirms];
    const temp = items[index];
    items[index] = items[index + 1];
    items[index + 1] = temp;
    setFeaturedFirms(items);
  };

  const handleSave = async () => {
    setSaving(true);
    
    try {
      // 1. Reset all available firms
      if (availableFirms.length > 0) {
        const availableSlugs = availableFirms.map(f => f.slug);
        const { error: resetErr } = await supabase.from("firms")
          .update({ is_featured: false, featured_order: 999 })
          .in("slug", availableSlugs);
          
        if (resetErr) {
            toast.error("Database Error! Did you run the SQL Migration snippet to add the featured columns?");
            setSaving(false);
            return;
        }
      }

      // 2. Set newly ordered featured firms
      const promises = featuredFirms.map((firm, index) => {
        return supabase.from("firms")
          .update({ is_featured: true, featured_order: index + 1 })
          .eq("slug", firm.slug);
      });

      const results = await Promise.all(promises);
      const hasErrors = results.some(r => r.error);
      
      if (hasErrors) {
          toast.error("Database Error! Failed to save sorting.");
          setSaving(false);
          return;
      }

      toast.success("Featured order saved successfully!");
      await fetchFirms(); // refresh clean state
    } catch (e: any) {
      toast.error("Failed to save order.");
    } finally {
      setSaving(false);
    }
  };

  const filteredAvailable = availableFirms.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
            <Star className="w-8 h-8 text-brand-orange drop-shadow-[0_0_15px_rgba(255,165,0,0.5)] fill-brand-orange" />
            Top Rated Ranking
          </h1>
          <p className="text-neutral-400">Select which firms appear in the "Featured Firms" section and arrange their exact order.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving || loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange px-8 py-4 font-black tracking-widest uppercase text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_-5px_rgba(220,38,38,0.6)] disabled:opacity-50"
        >
          {saving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {saving ? "Saving..." : "Save Ranking Config"}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <RefreshCw className="w-10 h-10 text-brand-red animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Active Featured Firms List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                Live Featured Firms ({featuredFirms.length})
              </h2>
            </div>
            
            <div className="bg-[#0c0c12]/80 border border-white/10 rounded-2xl p-4 shadow-2xl min-h-[400px] flex flex-col gap-3">
              {featuredFirms.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-neutral-500">
                  <Star className="w-12 h-12 text-white/10 mb-2" />
                  <p>No firms featured yet.</p>
                  <p className="text-sm">Select firms from the available list.</p>
                </div>
              ) : (
                featuredFirms.map((firm, idx) => (
                  <div key={firm.slug} className="group relative bg-black/60 border border-brand-red/30 rounded-xl p-3 flex items-center gap-4 hover:border-brand-red transition-all hover:shadow-[0_0_15px_rgba(220,38,38,0.15)]">
                    
                    {/* Position Badge */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-black text-brand-orange text-sm shadow-inner group-hover:bg-brand-red/10 group-hover:border-brand-red/30 group-hover:text-brand-red transition-colors">
                      #{idx + 1}
                    </div>

                    <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex flex-shrink-0 items-center justify-center shadow-inner">
                      <img src={firm.logo} alt={firm.name} width={40} height={40} className="max-w-full max-h-full object-contain" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                       <h3 className="font-bold text-white truncate">{firm.name}</h3>
                       <p className="text-xs text-neutral-400 capitalize">{firm.badge || "No Badge"}</p>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                      <div className="flex flex-col gap-1">
                        <button 
                          onClick={() => moveUp(idx)}
                          disabled={idx === 0}
                          className="p-1 rounded bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-white/5"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => moveDown(idx)}
                          disabled={idx === featuredFirms.length - 1}
                          className="p-1 rounded bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-white/5"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromFeatured(firm)}
                        className="ml-2 p-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-400 transition-colors border border-red-500/20"
                        title="Remove from featured"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Available Firms Pool */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Available Directory ({availableFirms.length})
              </h2>
            </div>
            
            <div className="bg-[#0c0c12]/80 border border-white/10 rounded-2xl p-4 shadow-2xl min-h-[400px] flex flex-col gap-4">
               
               {/* Local Search */}
               <div className="relative group">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <Search className="h-4 w-4 text-neutral-500 group-focus-within:text-brand-orange transition-colors" />
                 </div>
                 <input 
                   type="text"
                   placeholder="Search firm to pin..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-brand-orange/50 focus:border-brand-orange/50"
                 />
               </div>

               <div className="space-y-2 overflow-y-auto max-h-[500px] pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                  {filteredAvailable.length === 0 ? (
                    <div className="text-center py-10 text-neutral-500">No matching firms found.</div>
                  ) : (
                    filteredAvailable.map(firm => (
                      <div key={firm.slug} className="group bg-black/40 border border-white/5 rounded-xl p-2.5 flex items-center justify-between hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white p-1.5 flex items-center justify-center">
                            <img src={firm.logo} alt={firm.name} width={30} height={30} className="max-w-full max-h-full object-contain" />
                          </div>
                          <span className="font-semibold text-white/90">{firm.name}</span>
                        </div>
                        <button 
                          onClick={() => addToFeatured(firm)}
                          className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all border border-emerald-500/20 shadow-sm"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    ))
                  )}
               </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
