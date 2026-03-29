"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useAdminMarket } from "@/components/admin/AdminMarketContext";
import Link from "next/link";
import { Plus, Edit2, Trash2, Calendar, MapPin, Building2, Search, ExternalLink } from "lucide-react";
import { FirmData } from "@/data/firms";

export default function AdminFirmsPage() {
  const [firms, setFirms] = useState<FirmData[]>([]);
  const [filteredFirms, setFilteredFirms] = useState<FirmData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const { marketType } = useAdminMarket();

  useEffect(() => {
    loadFirms();
  }, [marketType]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredFirms(firms);
    } else {
      setFilteredFirms(firms.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase())));
    }
  }, [searchTerm, firms]);

  async function loadFirms() {
    setLoading(true);
    let query = supabase.from("firms").select("*").order("name");
    
    if (marketType === "futures") {
      query = query.eq("market_type", "futures");
    } else {
      query = query.or("market_type.eq.forex,market_type.is.null");
    }
    
    const { data, error } = await query;
    if (!error && data) {
      setFirms(data as FirmData[]);
      setFilteredFirms(data as FirmData[]);
    }
    setLoading(false);
  }

  async function handleDelete(slug: string) {
    if (confirm("Are you absolutely sure you want to delete this firm? This cannot be undone.")) {
      const { error } = await supabase.from("firms").delete().eq("slug", slug);
      if (!error) loadFirms();
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Firm Management</h1>
          <p className="text-neutral-400">Control all properties, assets, and rules for active proprietary trading firms.</p>
        </div>
        
        <Link href="/admin/firms/new" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 shadow-[0_4px_24px_-4px_rgba(220,38,38,0.5)] hover:shadow-[0_8px_30px_-4px_rgba(220,38,38,0.7)] group">
          <Plus className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" />
          Add New Firm
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-neutral-500 group-focus-within:text-brand-red transition-colors" />
        </div>
        <input 
          type="text"
          placeholder="Search firms by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-red/50 backdrop-blur-xl transition-all shadow-lg focus:border-brand-red/50"
        />
      </div>

      {/* Firms Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-red"></div>
        </div>
      ) : filteredFirms.length === 0 ? (
        <div className="text-center py-20 bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl">
          <Building2 className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No firms found</h3>
          <p className="text-neutral-400">Try adjusting your search query or add a new firm.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFirms.map((firm) => (
            <div key={firm.slug} className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c0c12]/80 backdrop-blur-md p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/50 hover:shadow-[0_0_30px_-5px_rgba(220,38,38,0.2)]">
              
              {/* Top Section */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 rounded-2xl bg-white p-2 flex items-center justify-center shadow-lg transform transition-transform duration-500 group-hover:scale-110">
                  <img src={firm.logo} alt={firm.name} className="max-w-full max-h-full object-contain" />
                </div>
                {firm.badge && (
                  <span className="inline-flex items-center rounded-full bg-brand-red/10 px-3 py-1 text-[11px] uppercase tracking-wider font-bold text-brand-red border border-brand-red/20 shadow-inner">
                    {firm.badge}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="space-y-1 mb-6">
                <h3 className="text-2xl font-bold tracking-tight text-white">{firm.name}</h3>
                <p className="text-sm text-neutral-400 line-clamp-2 leading-relaxed">{firm.shortDesc}</p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-neutral-400">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>{firm.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-400">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Est. {firm.foundedDate}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-5 border-t border-white/5 mt-auto relative z-20">
                <Link href={`/admin/firms/${firm.slug}`} title="Edit" className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10 group/edit border border-transparent hover:border-white/10">
                  <Edit2 className="w-4 h-4 text-brand-red transition-transform group-hover/edit:scale-110" />
                  Edit
                </Link>
                <a href={`/firms/${firm.slug}`} target="_blank" rel="noopener noreferrer" title="View Live" className="flex items-center justify-center rounded-xl bg-white/5 p-2.5 text-neutral-400 transition-all hover:bg-brand-orange/10 hover:text-brand-orange border border-transparent hover:border-brand-orange/20">
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button onClick={() => handleDelete(firm.slug)} title="Delete" className="flex items-center justify-center rounded-xl bg-white/5 p-2.5 text-neutral-500 transition-all hover:bg-red-500/20 hover:text-red-400 border border-transparent hover:border-red-500/30">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
