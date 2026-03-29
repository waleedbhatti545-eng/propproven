"use client";

import { useFirmOwner } from "@/components/propfirm/FirmOwnerContext";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { toast } from "sonner";
import { Ticket, Save, Trash2, CalendarDays, Percent, Tag } from "lucide-react";

export default function FirmPromosPage() {
  const { firmData, firmSlug, refreshFirm } = useFirmOwner();
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [discountExpiry, setDiscountExpiry] = useState("");
  const [promoDescription, setPromoDescription] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (firmData) {
      setDiscountCode(firmData.discountCode || "");
      setDiscountAmount(firmData.discountAmount || "");
      setDiscountExpiry(firmData.discountExpiry || "");
      setPromoDescription(firmData.promoDescription || "");
    }
  }, [firmData]);

  const handleSave = async () => {
    if (!firmSlug) return;
    setSaving(true);

    const { error } = await supabase.from("firms").update({
      discountCode,
      discountAmount,
      discountExpiry,
      promoDescription,
    }).eq("slug", firmSlug);

    if (error) {
      toast.error(`Failed: ${error.message}`);
    } else {
      toast.success("Promo updated and live on PropProven!");
      await refreshFirm();
    }
    setSaving(false);
  };

  const handleClear = async () => {
    if (!firmSlug) return;
    const confirmed = window.confirm("Clear the active promo? This removes it from PropProven immediately.");
    if (!confirmed) return;

    setSaving(true);
    const { error } = await supabase.from("firms").update({
      discountCode: null,
      discountAmount: null,
      discountExpiry: null,
      promoDescription: null,
    }).eq("slug", firmSlug);

    if (!error) {
      setDiscountCode("");
      setDiscountAmount("");
      setDiscountExpiry("");
      setPromoDescription("");
      toast.success("Promo cleared.");
      await refreshFirm();
    }
    setSaving(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
          <Ticket className="w-8 h-8 text-brand-red" />
          Offers & Promos
        </h1>
        <p className="text-neutral-400">Set your active discount code displayed across PropProven. Traders will see and copy this code on your listing page.</p>
      </div>

      {/* Live Preview Card */}
      {discountCode && (
        <div className="rounded-2xl border border-brand-red/20 bg-brand-red/5 p-6">
          <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold mb-3">Live Preview</p>
          <div className="inline-flex flex-col rounded-xl overflow-hidden border border-white/10 shadow-lg">
            <div className="bg-gradient-to-r from-brand-red to-brand-orange px-6 py-3 flex items-center justify-center">
              <span className="text-sm font-black text-white uppercase">{discountAmount || "EXCLUSIVE"}</span>
            </div>
            <div className="bg-[#050505] px-6 py-3 flex items-center justify-center gap-2">
              <span className="text-xs font-black tracking-widest text-neutral-300 uppercase font-mono">{discountCode}</span>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="rounded-2xl border border-white/10 bg-[#0c0c12]/80 backdrop-blur-md p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2 mb-1.5">
              <Tag className="w-3.5 h-3.5" /> Discount Code
            </label>
            <input
              value={discountCode}
              onChange={e => setDiscountCode(e.target.value.toUpperCase())}
              placeholder="e.g. PROVEN20"
              className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-brand-red outline-none transition-all uppercase tracking-wider"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2 mb-1.5">
              <Percent className="w-3.5 h-3.5" /> Highlight Tag
            </label>
            <input
              value={discountAmount}
              onChange={e => setDiscountAmount(e.target.value)}
              placeholder="e.g. 20% OFF"
              className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-red outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2 mb-1.5">
            Deep Description
          </label>
          <textarea
            rows={2}
            value={promoDescription}
            onChange={e => setPromoDescription(e.target.value)}
            placeholder="Get 20% off all challenges + bonus profit split."
            className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-red outline-none transition-all resize-none"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2 mb-1.5">
            <CalendarDays className="w-3.5 h-3.5" /> Expiry Date & Time
          </label>
          <input
            type="datetime-local"
            value={discountExpiry}
            onChange={e => setDiscountExpiry(e.target.value)}
            className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-red outline-none transition-all"
          />
        </div>

        <div className="flex gap-4 pt-4 border-t border-white/5">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange px-6 py-3 font-bold text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_-5px_rgba(220,38,38,0.6)] disabled:opacity-50"
          >
            {saving ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" /> : <Save className="w-5 h-5" />}
            Publish Offer
          </button>
          <button
            onClick={handleClear}
            disabled={saving || !discountCode}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500/10 px-6 py-3 font-bold text-red-500 transition-all hover:bg-red-500/20 disabled:opacity-30 border border-red-500/20"
          >
            <Trash2 className="w-5 h-5" />
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
