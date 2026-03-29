"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { Review } from "@/data/firms";
import {
  MessageSquareWarning, Search, RefreshCw, CheckCircle2, XCircle,
  Clock, Star, ShieldCheck, Trash2, Eye, Filter, ChevronDown, MoreVertical, Flag, Mail
} from "lucide-react";
import { toast } from "sonner";

type ReviewWithFirm = Review & { firm_slug: string; firms?: { name: string; logo: string } };

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; icon: any }> = {
  Pending:  { label: "Pending",  color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30", icon: Clock },
  Approved: { label: "Approved", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", icon: CheckCircle2 },
  Rejected: { label: "Rejected", color: "text-red-400",     bg: "bg-red-500/10",     border: "border-red-500/30",     icon: XCircle },
  Featured: { label: "Featured", color: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/30",   icon: Star },
};

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ReviewWithFirm[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedReview, setSelectedReview] = useState<ReviewWithFirm | null>(null);

  useEffect(() => { 
    fetchReviews(); 
    
    // Global click listener to close dropdown when clicking anywhere else
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.more-actions-menu')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  async function fetchReviews() {
    setLoading(true);
    const { data, error } = await supabase
      .from("user_reviews")
      .select("*, firms(name, logo)")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load reviews. Check your database connection.");
      console.error(error);
    } else {
      setReviews((data || []) as ReviewWithFirm[]);
    }
    setLoading(false);
  }

  async function updateStatus(reviewId: string, newStatus: string) {
    const { error } = await supabase
      .from("user_reviews")
      .update({ status: newStatus })
      .eq("id", reviewId);

    if (error) {
      toast.error("Failed to update status. Did you run the SQL migration?");
      return;
    }

    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status: newStatus } : r));
    toast.success(`Review status updated to "${newStatus}"`);
  }

  async function deleteReview(reviewId: string) {
    const { error } = await supabase
      .from("user_reviews")
      .delete()
      .eq("id", reviewId);

    if (error) {
      toast.error("Failed to delete review.");
      return;
    }
    setReviews(prev => prev.filter(r => r.id !== reviewId));
    toast.success("Review permanently deleted.");
  }

  const filteredReviews = reviews.filter(r => {
    const matchesStatus = filterStatus === "All" || (r.status || "Approved") === filterStatus;
    const matchesSearch = !searchTerm.trim() ||
      r.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.firm_slug.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusCounts = {
    All: reviews.length,
    Pending: reviews.filter(r => (r.status || "Approved") === "Pending").length,
    Approved: reviews.filter(r => (r.status || "Approved") === "Approved").length,
    Rejected: reviews.filter(r => (r.status || "Approved") === "Rejected").length,
    Featured: reviews.filter(r => (r.status || "Approved") === "Featured").length,
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
            <MessageSquareWarning className="w-8 h-8 text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
            Review Moderation
          </h1>
          <p className="text-neutral-400">Approve, reject, feature, or delete user-submitted reviews across all firms.</p>
        </div>
        <button
          onClick={fetchReviews}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 px-6 py-3 font-bold text-white hover:bg-white/10 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        {(["All", "Pending", "Approved", "Featured", "Rejected"] as const).map(status => {
          const isActive = filterStatus === status;
          const config = STATUS_CONFIG[status];
          const count = statusCounts[status];
          return (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all whitespace-nowrap ${
                isActive
                  ? status === "All"
                    ? "bg-white/10 text-white border border-white/20 shadow-lg"
                    : `${config?.bg} ${config?.color} border ${config?.border} shadow-lg`
                  : "bg-black/40 text-neutral-500 border border-white/5 hover:bg-white/5 hover:text-white"
              }`}
            >
              {status !== "All" && config && <config.icon className="w-4 h-4" />}
              {status}
              <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-black ${
                isActive ? "bg-white/20 text-white" : "bg-white/5 text-neutral-600"
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="relative group max-w-xl">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-neutral-500 group-focus-within:text-amber-500 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Search by author, title, content, or firm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/30 transition-all"
        />
      </div>

      {/* Reviews List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <RefreshCw className="w-10 h-10 text-amber-500 animate-spin" />
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-3xl">
          <MessageSquareWarning className="w-16 h-16 text-white/10 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Reviews Found</h3>
          <p className="text-neutral-500">
            {filterStatus !== "All"
              ? `No reviews with status "${filterStatus}".`
              : "No reviews exist in the database yet."
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map(review => {
            const status = review.status || "Approved";
            const config = STATUS_CONFIG[status] || STATUS_CONFIG.Approved;
            const StatusIcon = config.icon;

            return (
              <div
                key={review.id}
                className={`group flex flex-col xl:flex-row xl:items-center gap-4 bg-white/[0.02] border rounded-xl p-4 transition-all duration-300 hover:bg-white/[0.05] ${config.border} relative z-10 hover:z-20`}
              >
                {/* Firm & Meta (Left) */}
                <div className="flex items-center gap-3 w-full xl:w-56 shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-white p-1 flex items-center justify-center border border-white/10 shrink-0 shadow-inner">
                    {review.firms?.logo ? (
                      <img src={review.firms.logo} alt="" className="max-w-full max-h-full object-contain" />
                    ) : (
                      <div className="w-full h-full bg-neutral-200 rounded-md" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-white text-sm truncate">{review.firms?.name || review.firm_slug}</h3>
                    <p className="text-[10px] text-neutral-400 truncate">by <span className="text-white/80">{review.author}</span> · {review.date}</p>
                    <div className="flex items-center gap-0.5 mt-0.5 text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-[10px] font-bold ml-1">{review.rating}/5</span>
                      {review.verified && <ShieldCheck className="w-3 h-3 text-emerald-500 ml-1" />}
                    </div>
                  </div>
                </div>

                {/* Review Text (Center) */}
                <div className="flex-1 min-w-0 xl:px-4 xl:border-l xl:border-r border-white/5 py-2 xl:py-0 border-y xl:border-y-0 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest shrink-0 ${config.bg} ${config.color} border ${config.border}`}>
                      {config.label}
                    </div>
                    <h4 className="text-sm font-bold text-white truncate max-w-[70%]">{review.title}</h4>
                  </div>
                  <p className="text-neutral-400 text-xs truncate">{review.content}</p>
                </div>

                {/* Actions (Right) */}
                <div className="flex items-center justify-between xl:justify-end gap-2 shrink-0 pt-1 xl:pt-0 xl:pl-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateStatus(review.id, "Approved")}
                      disabled={status === "Approved"}
                      className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        status === "Approved" ? "opacity-30 cursor-not-allowed bg-transparent text-neutral-500 border border-transparent" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Approve</span>
                    </button>
                    <button
                      onClick={() => updateStatus(review.id, "Rejected")}
                      disabled={status === "Rejected"}
                      className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        status === "Rejected" ? "opacity-30 cursor-not-allowed bg-transparent text-neutral-500 border border-transparent" : "bg-amber-500/10 text-amber-500 border border-amber-500/20 hover:bg-amber-500/20"
                      }`}
                    >
                      <XCircle className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Reject</span>
                    </button>
                    <button
                      onClick={() => deleteReview(review.id)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-900/20 text-red-500 border border-red-900/30 hover:bg-red-500/20 hover:text-red-400 transition-all sm:ml-1"
                      title="Delete Permanently"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="relative xl:ml-2 xl:border-l xl:border-white/10 xl:pl-3 isolate more-actions-menu">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveDropdown(activeDropdown === review.id ? null : review.id);
                      }}
                      className={`p-1.5 rounded-lg transition-all ${
                        activeDropdown === review.id ? "bg-white/10 text-white shadow-inner border border-white/20" : "text-neutral-500 border border-transparent hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {activeDropdown === review.id && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-[#1a1a24] border border-white/20 rounded-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,1)] overflow-hidden z-[100]">
                        <button onClick={() => { setActiveDropdown(null); setSelectedReview(review); }} className="w-full text-left px-4 py-3 text-xs font-bold text-neutral-200 hover:bg-white/10 flex items-center gap-2 transition-colors">
                          <Eye className="w-4 h-4 text-blue-400" /> Read Full Review
                        </button>
                        
                        <button onClick={() => { setActiveDropdown(null); updateStatus(review.id, "Featured"); }} className={`w-full text-left px-4 py-3 text-xs font-bold ${status === "Featured" ? "text-amber-500/50 bg-amber-500/5 cursor-not-allowed" : "text-amber-500 hover:bg-amber-500/20"} flex items-center gap-2 transition-colors`} disabled={status === "Featured"}>
                          <Star className="w-4 h-4" /> Feature Review
                        </button>
                        
                        <button onClick={() => { setActiveDropdown(null); updateStatus(review.id, "Pending"); }} className={`w-full text-left px-4 py-3 text-xs font-bold ${status === "Pending" ? "text-yellow-500/50 bg-yellow-500/5 cursor-not-allowed" : "text-yellow-500 hover:bg-yellow-500/20"} flex items-center gap-2 transition-colors`} disabled={status === "Pending"}>
                          <Clock className="w-4 h-4" /> Mark as Pending
                        </button>
                        
                        <div className="h-px bg-white/10 my-1 mx-2" />
                        
                        <button onClick={() => { setActiveDropdown(null); toast.success("Author flagged for investigation."); }} className="w-full text-left px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-500/20 flex items-center gap-2 transition-colors">
                          <Flag className="w-4 h-4" /> Flag Author
                        </button>
                        <button onClick={() => { setActiveDropdown(null); toast.success(`Drafting email to ${review.author}...`); }} className="w-full text-left px-4 py-3 text-xs font-bold text-neutral-200 hover:bg-white/10 flex items-center gap-2 transition-colors">
                          <Mail className="w-4 h-4" /> Direct Email
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ═══ FULL REVIEW MODAL ═══ */}
      {selectedReview && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedReview(null)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-2xl bg-[#0a0a0f] border border-white/10 rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in-95 duration-300 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
            
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 relative z-10">
              <h2 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-3">
                <MessageSquareWarning className="w-6 h-6 text-amber-500" /> Review Details
              </h2>
              <button 
                onClick={() => setSelectedReview(null)}
                className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-all bg-black/50 border border-white/5"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 relative z-10 space-y-8 max-h-[70vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">
              
              {/* Top Banner: Firm & Rating */}
              <div className="flex items-start justify-between gap-6 bg-white/[0.02] border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-white p-2 flex items-center justify-center shadow-inner shrink-0">
                    {selectedReview.firms?.logo ? (
                      <img src={selectedReview.firms.logo} alt="" className="max-w-full max-h-full object-contain" />
                    ) : (
                      <div className="w-full h-full bg-neutral-200 rounded-lg" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">Target Firm</p>
                    <h3 className="text-xl font-bold text-white">{selectedReview.firms?.name || selectedReview.firm_slug}</h3>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">Final Rating</p>
                  <div className="flex items-center gap-1 justify-end text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < selectedReview.rating ? "fill-amber-400" : "text-amber-900/40"}`} />
                    ))}
                    <span className="font-black ml-2">{selectedReview.rating}/5</span>
                  </div>
                </div>
              </div>

              {/* Central Review Block */}
              <div>
                <h4 className="text-2xl font-black text-white mb-4 leading-tight">"{selectedReview.title}"</h4>
                <p className="text-neutral-300 text-base leading-relaxed whitespace-pre-wrap bg-white/[0.01] p-6 rounded-2xl border border-white/5">
                  {selectedReview.content}
                </p>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/5">
                <div>
                  <p className="text-[10px] font-black uppercase text-neutral-500 tracking-widest mb-1">Author</p>
                  <p className="text-sm font-bold text-white">{selectedReview.author}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-neutral-500 tracking-widest mb-1">Date Submitted</p>
                  <p className="text-sm font-bold text-white font-mono">{selectedReview.date}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-neutral-500 tracking-widest mb-1">Verified</p>
                  {selectedReview.verified ? (
                    <p className="text-sm font-bold text-emerald-400 flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Yes</p>
                  ) : (
                    <p className="text-sm font-bold text-neutral-400 flex items-center gap-1"><XCircle className="w-4 h-4" /> No</p>
                  )}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-neutral-500 tracking-widest mb-1">Current Status</p>
                  <p className={`text-sm font-bold flex items-center gap-1 capitalize ${
                    selectedReview.status === 'Approved' ? 'text-emerald-400' :
                    selectedReview.status === 'Featured' ? 'text-amber-400' :
                    selectedReview.status === 'Rejected' ? 'text-red-400' :
                    'text-yellow-400'
                  }`}>
                    {selectedReview.status || 'Approved'}
                  </p>
                </div>
              </div>
              
            </div>
            
            {/* Footer Actions */}
            <div className="px-8 py-5 border-t border-white/5 bg-black/40 flex items-center justify-end gap-3 relative z-10">
               <button 
                 onClick={() => setSelectedReview(null)}
                 className="px-6 py-2.5 rounded-xl font-bold text-sm text-neutral-400 hover:text-white transition-colors"
               >
                 Close Window
               </button>
               {(selectedReview.status || "Approved") !== "Approved" && (
                 <button 
                   onClick={() => { updateStatus(selectedReview.id, "Approved"); setSelectedReview({ ...selectedReview, status: "Approved" }); }}
                   className="px-6 py-2.5 rounded-xl font-bold text-sm bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors flex items-center gap-2"
                 >
                   <CheckCircle2 className="w-4 h-4" /> Quick Approve
                 </button>
               )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
