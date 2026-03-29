"use client";

import { useFirmOwner } from "@/components/propfirm/FirmOwnerContext";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { toast } from "sonner";
import { Layers, Plus, Save, Trash2, X, DollarSign } from "lucide-react";

interface AccountRow {
  id?: string;
  firm_slug: string;
  size: string;
  balance: string;
  price: number | null;
  promoPrice: number | null;
  type: string;
  targetPhase1: string;
  targetPhase2: string;
  maxDailyLoss: string;
  maxTotalLoss: string;
  duration: string;
  leverage: string;
}

const EMPTY_ACCOUNT: Omit<AccountRow, "firm_slug"> = {
  size: "", balance: "", price: null, promoPrice: null, type: "2-Step",
  targetPhase1: "", targetPhase2: "", maxDailyLoss: "", maxTotalLoss: "",
  duration: "Unlimited", leverage: ""
};

export default function ChallengesPage() {
  const { firmSlug } = useFirmOwner();
  const [accounts, setAccounts] = useState<AccountRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!firmSlug) return;
    fetchAccounts();
  }, [firmSlug]);

  async function fetchAccounts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("accounts")
      .select("*")
      .eq("firm_slug", firmSlug!)
      .order("price", { ascending: true });

    if (!error && data) {
      setAccounts(data as AccountRow[]);
    }
    setLoading(false);
  }

  const addNewAccount = () => {
    setAccounts([...accounts, { ...EMPTY_ACCOUNT, firm_slug: firmSlug! } as AccountRow]);
  };

  const updateAccount = (index: number, field: string, value: any) => {
    setAccounts(prev => prev.map((a, i) => i === index ? { ...a, [field]: value } : a));
  };

  const removeAccount = async (index: number) => {
    const acc = accounts[index];
    if (acc.id) {
      // Delete from DB
      const { error } = await supabase.from("accounts").delete().eq("id", acc.id);
      if (error) {
        toast.error("Failed to delete account.");
        return;
      }
      toast.success("Account deleted.");
    }
    setAccounts(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveAll = async () => {
    if (!firmSlug) return;
    setSaving(true);

    for (const acc of accounts) {
      const payload = {
        firm_slug: firmSlug,
        size: acc.size,
        balance: acc.balance,
        price: acc.price,
        promoPrice: acc.promoPrice,
        type: acc.type,
        targetPhase1: acc.targetPhase1,
        targetPhase2: acc.targetPhase2,
        maxDailyLoss: acc.maxDailyLoss,
        maxTotalLoss: acc.maxTotalLoss,
        duration: acc.duration,
        leverage: acc.leverage,
      };

      if (acc.id) {
        // Update existing
        const { error } = await supabase.from("accounts").update(payload).eq("id", acc.id);
        if (error) toast.error(`Error updating ${acc.size}: ${error.message}`);
      } else {
        // Insert new
        const { error } = await supabase.from("accounts").insert(payload);
        if (error) toast.error(`Error creating ${acc.size}: ${error.message}`);
      }
    }

    toast.success("All challenges saved!");
    await fetchAccounts();
    setSaving(false);
  };

  const Field = ({ value, onChange, placeholder, type = "text", className = "" }: any) => (
    <input
      type={type}
      value={value || ""}
      onChange={e => onChange(type === "number" ? (parseFloat(e.target.value) || null) : e.target.value)}
      placeholder={placeholder}
      className={`bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-brand-red outline-none transition-all w-full ${className}`}
    />
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
            <Layers className="w-8 h-8 text-brand-red" />
            Challenge Plans
          </h1>
          <p className="text-neutral-400">Manage your evaluation accounts, pricing, and trading rules.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={addNewAccount}
            className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-5 py-3 font-semibold text-white hover:bg-white/10 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Plan
          </button>
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange px-6 py-3 font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-50"
          >
            {saving ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" /> : <Save className="w-5 h-5" />}
            Save All
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-red" />
        </div>
      ) : accounts.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-white/10 bg-[#0c0c12]/80">
          <DollarSign className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white">No challenge plans yet</h3>
          <p className="text-neutral-500 mt-2 mb-6">Add your first evaluation account to get listed.</p>
          <button onClick={addNewAccount} className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-6 py-3 font-bold text-white hover:bg-brand-red/90 transition-all">
            <Plus className="w-4 h-4" /> Create First Plan
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {accounts.map((acc, index) => (
            <div key={acc.id || `new-${index}`} className="rounded-2xl border border-white/10 bg-[#0c0c12]/80 backdrop-blur-md p-6 relative group hover:border-brand-red/20 transition-all">
              {/* Delete Button */}
              <button
                onClick={() => removeAccount(index)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1">Account Size</label>
                  <Field value={acc.size} onChange={(v: string) => updateAccount(index, "size", v)} placeholder="e.g. 100k" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1">Balance Display</label>
                  <Field value={acc.balance} onChange={(v: string) => updateAccount(index, "balance", v)} placeholder="$100,000" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1">Regular Price ($)</label>
                  <Field value={acc.price} onChange={(v: number) => updateAccount(index, "price", v)} placeholder="599" type="number" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1">Promo Price ($)</label>
                  <Field value={acc.promoPrice} onChange={(v: number) => updateAccount(index, "promoPrice", v)} placeholder="499" type="number" />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1">Challenge Type</label>
                  <select
                    value={acc.type}
                    onChange={e => updateAccount(index, "type", e.target.value)}
                    className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-brand-red outline-none"
                  >
                    <option value="1-Step">1-Step</option>
                    <option value="2-Step">2-Step</option>
                    <option value="3-Step">3-Step</option>
                    <option value="Instant Funding">Instant Funding</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1">Duration</label>
                  <Field value={acc.duration} onChange={(v: string) => updateAccount(index, "duration", v)} placeholder="Unlimited" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1">Leverage</label>
                  <Field value={acc.leverage} onChange={(v: string) => updateAccount(index, "leverage", v)} placeholder="1:100" />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1">Target Phase 1</label>
                  <Field value={acc.targetPhase1} onChange={(v: string) => updateAccount(index, "targetPhase1", v)} placeholder="$10,000 (10%)" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1">Target Phase 2</label>
                  <Field value={acc.targetPhase2} onChange={(v: string) => updateAccount(index, "targetPhase2", v)} placeholder="$5,000 (5%)" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1">Max Daily Loss</label>
                  <Field value={acc.maxDailyLoss} onChange={(v: string) => updateAccount(index, "maxDailyLoss", v)} placeholder="$5,000 (5%)" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1">Max Total Loss</label>
                  <Field value={acc.maxTotalLoss} onChange={(v: string) => updateAccount(index, "maxTotalLoss", v)} placeholder="$10,000 (10%)" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
