"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { toast } from "sonner";
import { FileCheck2, Clock, CheckCircle2, XCircle, MessageSquareMore, ExternalLink, Search, RefreshCw, Building2, Mail, Globe } from "lucide-react";

interface FirmApplication {
  id: string;
  user_id: string;
  company_name: string;
  website_url: string;
  representative_name: string | null;
  email: string;
  message: string | null;
  status: "pending" | "approved" | "rejected" | "more_info";
  admin_notes: string | null;
  created_at: string;
}

const STATUS_CONFIG = {
  pending: { label: "Pending Review", icon: Clock, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/30" },
  approved: { label: "Approved", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30" },
  rejected: { label: "Rejected", icon: XCircle, color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/30" },
  more_info: { label: "More Info Requested", icon: MessageSquareMore, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/30" },
};

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<FirmApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Modal state for reviewing an application
  const [selected, setSelected] = useState<FirmApplication | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    setLoading(true);
    const { data, error } = await supabase
      .from("firm_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setApplications(data as FirmApplication[]);
    } else {
      toast.error("Failed to load applications. Ensure the b2b_migration.sql has been executed.");
    }
    setLoading(false);
  }

  const filteredApps = applications.filter(app => {
    const matchesSearch = app.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const openReview = (app: FirmApplication) => {
    setSelected(app);
    setAdminNotes(app.admin_notes || "");
  };

  // === APPROVE: Create a blank firm row linked to the owner, mark application approved ===
  async function handleApprove() {
    if (!selected) return;
    setActionLoading(true);

    // 1. Generate a slug from the company name
    const slug = selected.company_name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    // 2. Insert a blank firm template linked to this user
    const { error: firmError } = await supabase.from("firms").insert({
      slug,
      name: selected.company_name,
      logo: "",
      shortDesc: `${selected.company_name} - Listed via PropProven Partner Portal`,
      description: "",
      rating: 0,
      reviews: "0",
      reviewCount: 0,
      trustpilot: false,
      likes: 0,
      countryCode: "",
      location: "",
      foundedDate: "",
      yearsOperational: 0,
      maxFunding: "",
      profitSplit: "",
      platformNames: [],
      instruments: [],
      color: "#666",
      owner_id: selected.user_id,
      on_platform_status: "Draft",
    });

    if (firmError) {
      toast.error(`Failed to provision firm: ${firmError.message}`);
      setActionLoading(false);
      return;
    }

    // 3. Update the application status
    const { error: statusError } = await supabase
      .from("firm_applications")
      .update({ status: "approved", admin_notes: adminNotes })
      .eq("id", selected.id);

    if (!statusError) {
      toast.success(`${selected.company_name} has been APPROVED and provisioned!`);
      setSelected(null);
      fetchApplications();
    } else {
      toast.error("Failed to update application status.");
    }
    setActionLoading(false);
  }

  async function handleReject() {
    if (!selected) return;
    setActionLoading(true);
    const { error } = await supabase
      .from("firm_applications")
      .update({ status: "rejected", admin_notes: adminNotes })
      .eq("id", selected.id);

    if (!error) {
      toast.success(`${selected.company_name} application REJECTED.`);
      setSelected(null);
      fetchApplications();
    }
    setActionLoading(false);
  }

  async function handleRequestInfo() {
    if (!selected) return;
    setActionLoading(true);
    const { error } = await supabase
      .from("firm_applications")
      .update({ status: "more_info", admin_notes: adminNotes })
      .eq("id", selected.id);

    if (!error) {
      toast.success(`Requested more information from ${selected.company_name}.`);
      setSelected(null);
      fetchApplications();
    }
    setActionLoading(false);
  }

  const pendingCount = applications.filter(a => a.status === "pending").length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
            <FileCheck2 className="w-8 h-8 text-brand-red" />
            Firm Applications
            {pendingCount > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-400/20 text-amber-400 text-xs font-black border border-amber-400/30 animate-pulse">
                {pendingCount}
              </span>
            )}
          </h1>
          <p className="text-neutral-400">Review, approve, or reject prop firm onboarding applications for the B2B Partner Portal.</p>
        </div>
        <button onClick={fetchApplications} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative group flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-neutral-500 group-focus-within:text-brand-red transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search by company name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-red/50 backdrop-blur-xl transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["all", "pending", "approved", "rejected", "more_info"].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${
                filterStatus === s
                  ? "bg-brand-red text-white border-brand-red shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                  : "bg-transparent text-neutral-400 border-white/10 hover:text-white hover:border-white/20"
              }`}
            >
              {s === "all" ? "All" : s === "more_info" ? "Info Needed" : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Grid */}
      <div className="rounded-2xl border border-white/10 bg-[#0c0c12]/80 backdrop-blur-md overflow-hidden shadow-2xl">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-red" />
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="text-center py-20">
            <FileCheck2 className="h-12 w-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white">No applications found</h3>
            <p className="text-neutral-500 mt-2">Waiting for prop firms to apply via the Partner Portal.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-black/60 text-xs uppercase tracking-wider text-neutral-400">
                  <th className="p-4 font-semibold">Company</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold">Website</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Applied</th>
                  <th className="p-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredApps.map(app => {
                  const cfg = STATUS_CONFIG[app.status] || STATUS_CONFIG.pending;
                  const StatusIcon = cfg.icon;
                  return (
                    <tr key={app.id} className="hover:bg-white/5 transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-neutral-500" />
                          </div>
                          <span className="font-semibold text-white">{app.company_name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-neutral-400 text-sm">
                          <Mail className="w-3.5 h-3.5" />
                          {app.email}
                        </div>
                      </td>
                      <td className="p-4">
                        {app.website_url ? (
                          <a href={app.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-brand-orange hover:underline">
                            <Globe className="w-3.5 h-3.5" />
                            Visit
                            <ExternalLink className="w-3 h-3 opacity-50" />
                          </a>
                        ) : (
                          <span className="text-neutral-600 text-sm">N/A</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest ${cfg.bg} ${cfg.color} ${cfg.border} border`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {cfg.label}
                        </div>
                      </td>
                      <td className="p-4 text-neutral-500 text-sm">
                        {new Date(app.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => openReview(app)}
                          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-brand-red/50 hover:shadow-[0_0_15px_-5px_rgba(220,38,38,0.5)]"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ===== REVIEW MODAL ===== */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelected(null)} />

          <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#07070a] p-8 shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red to-brand-orange" />
            <div className="absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-20 pointer-events-none bg-brand-red" />

            <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4 relative z-10">
              <div>
                <h2 className="text-2xl font-bold text-white">{selected.company_name}</h2>
                <p className="text-neutral-500 text-sm mt-1">{selected.email}</p>
                {selected.website_url && (
                  <a href={selected.website_url} target="_blank" rel="noopener noreferrer" className="text-brand-orange text-sm hover:underline flex items-center gap-1 mt-1">
                    {selected.website_url} <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <button onClick={() => setSelected(null)} className="p-2 text-neutral-500 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {selected.message && (
              <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/5">
                <p className="text-xs text-neutral-400 uppercase tracking-widest mb-2 font-bold">Applicant Message</p>
                <p className="text-neutral-300 text-sm leading-relaxed">{selected.message}</p>
              </div>
            )}

            <div className="space-y-4 relative z-10">
              <div>
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-2">Admin Notes (Internal Only)</label>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add private notes about this application..."
                  className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-red outline-none transition-all resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/5">
                <button
                  onClick={handleApprove}
                  disabled={actionLoading || selected.status === "approved"}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-6 py-3 font-bold text-white transition-all disabled:opacity-30"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  {selected.status === "approved" ? "Already Approved" : "Approve & Provision"}
                </button>
                <button
                  onClick={handleRequestInfo}
                  disabled={actionLoading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600/20 border border-blue-500/30 px-5 py-3 font-bold text-blue-400 transition-all hover:bg-blue-600/30 disabled:opacity-30"
                >
                  <MessageSquareMore className="w-5 h-5" />
                  Request Info
                </button>
                <button
                  onClick={handleReject}
                  disabled={actionLoading || selected.status === "rejected"}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-5 py-3 font-bold text-red-500 transition-all hover:bg-red-500/20 disabled:opacity-30"
                >
                  <XCircle className="w-5 h-5" />
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
