"use client";

import { useFirmOwner } from "@/components/propfirm/FirmOwnerContext";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { toast } from "sonner";
import { Building2, Save, Globe, MapPin, Shield, Monitor, Layers, Ban, X, Plus } from "lucide-react";

// Fields the firm owner is ALLOWED to edit (security whitelist)
const EDITABLE_FIELDS = [
  "logo", "shortDesc", "description", "ceo", "countryCode", "location", "foundedDate",
  "yearsOperational", "maxFunding", "profitSplit", "scalingPlan", "payoutSpeed",
  "payoutFrequency", "platformNames", "instruments", "paymentMethods", "payoutMethods",
  "restrictedCountries", "dailyLoss", "maxLoss", "profitTarget",
  "newsTrading", "weekendHolding", "eaTrading", "color"
];

// Fields LOCKED from editing (only Master Admin can change these)
// rating, reviews, reviewCount, trustpilot, trustpilotScore, likes, badge, is_featured, is_popular, featured_order, popular_order

function TagEditor({ label, tags, onChange, placeholder }: { label: string; tags: string[]; onChange: (t: string[]) => void; placeholder?: string }) {
  const [input, setInput] = useState("");
  const addTag = () => {
    const val = input.trim();
    if (val && !tags.includes(val)) {
      onChange([...tags, val]);
    }
    setInput("");
  };
  const removeTag = (t: string) => onChange(tags.filter(x => x !== t));

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest block">{label}</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map(t => (
          <span key={t} className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-bold text-white">
            {t}
            <button onClick={() => removeTag(t)} className="text-neutral-500 hover:text-red-400 transition-colors"><X className="w-3 h-3" /></button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())}
          placeholder={placeholder || `Add ${label.toLowerCase()}...`}
          className="flex-1 bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-brand-red outline-none transition-all"
        />
        <button onClick={addTag} className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function FirmProfileEditor() {
  const { firmData, firmSlug, refreshFirm } = useFirmOwner();
  const [form, setForm] = useState<any>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (firmData) setForm({ ...firmData });
  }, [firmData]);

  if (!firmData) return null;

  const updateField = (key: string, val: any) => {
    setForm((prev: any) => ({ ...prev, [key]: val }));
  };

  const handleSave = async () => {
    if (!firmSlug) return;
    setSaving(true);

    // Strict whitelist: only send allowed fields
    const payload: any = {};
    EDITABLE_FIELDS.forEach(f => {
      if (form[f] !== undefined) payload[f] = form[f];
    });

    const { error } = await supabase.from("firms").update(payload).eq("slug", firmSlug);

    if (error) {
      toast.error(`Failed to save: ${error.message}`);
    } else {
      toast.success("Profile updated successfully!");
      await refreshFirm();
    }
    setSaving(false);
  };

  const Field = ({ label, field, type = "text", placeholder = "", rows }: { label: string; field: string; type?: string; placeholder?: string; rows?: number }) => (
    <div>
      <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-1.5">{label}</label>
      {type === "textarea" ? (
        <textarea
          rows={rows || 3}
          value={form[field] || ""}
          onChange={e => updateField(field, e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-red outline-none transition-all resize-none"
        />
      ) : (
        <input
          type={type}
          value={form[field] || ""}
          onChange={e => updateField(field, type === "number" ? parseInt(e.target.value) || 0 : e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-red outline-none transition-all"
        />
      )}
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
            <Building2 className="w-8 h-8 text-brand-red" />
            Firm Profile
          </h1>
          <p className="text-neutral-400">Edit your publicly visible listing on PropProven.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange px-6 py-3 font-bold text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_-5px_rgba(220,38,38,0.6)] disabled:opacity-50"
        >
          {saving ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" /> : <Save className="w-5 h-5" />}
          Save Changes
        </button>
      </div>

      {/* Locked Fields Notice */}
      <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10 flex items-start gap-3">
        <Shield className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-red-400 font-bold text-sm">Protected Fields</p>
          <p className="text-neutral-500 text-xs mt-0.5">Star Rating, Review Count, Trustpilot Score, Featured Badge, and Ranking positions are managed exclusively by PropProven administration.</p>
        </div>
      </div>

      {/* Identity Section */}
      <section className="rounded-2xl border border-white/10 bg-[#0c0c12]/80 backdrop-blur-md p-6 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-brand-orange" /> Identity & Branding
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Logo URL" field="logo" placeholder="https://yourdomain.com/logo.svg" />
          <Field label="Brand Color (Hex)" field="color" placeholder="#3B82F6" />
          <Field label="CEO / Founder" field="ceo" placeholder="John Doe" />
          <Field label="Founded Year" field="foundedDate" placeholder="2020" />
          <Field label="Years Operational" field="yearsOperational" type="number" />
        </div>
        <Field label="Short Description" field="shortDesc" type="textarea" rows={2} placeholder="One-liner about your firm..." />
        <Field label="Full Description" field="description" type="textarea" rows={5} placeholder="Detailed firm overview..." />
      </section>

      {/* Location */}
      <section className="rounded-2xl border border-white/10 bg-[#0c0c12]/80 backdrop-blur-md p-6 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <MapPin className="w-5 h-5 text-emerald-400" /> Location
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Country Code (2-Letter ISO)" field="countryCode" placeholder="us" />
          <Field label="Full Location" field="location" placeholder="New York, USA" />
        </div>
      </section>

      {/* Trading Infrastructure */}
      <section className="rounded-2xl border border-white/10 bg-[#0c0c12]/80 backdrop-blur-md p-6 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Monitor className="w-5 h-5 text-cyan-400" /> Trading Infrastructure
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Max Funding" field="maxFunding" placeholder="$200K" />
          <Field label="Profit Split" field="profitSplit" placeholder="Up to 90%" />
          <Field label="Scaling Plan" field="scalingPlan" placeholder="25% every 4 months" />
          <Field label="Payout Speed" field="payoutSpeed" placeholder="1-2 Days" />
          <Field label="Payout Frequency" field="payoutFrequency" placeholder="Bi-weekly" />
        </div>
      </section>

      {/* Rules */}
      <section className="rounded-2xl border border-white/10 bg-[#0c0c12]/80 backdrop-blur-md p-6 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-400" /> Trading Rules
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Field label="Daily Loss Limit" field="dailyLoss" placeholder="5%" />
          <Field label="Max Overall Loss" field="maxLoss" placeholder="10%" />
          <Field label="Profit Target" field="profitTarget" placeholder="10% / 5%" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Field label="News Trading" field="newsTrading" placeholder="Allowed" />
          <Field label="Weekend Holding" field="weekendHolding" placeholder="Allowed" />
          <Field label="EA / Algo Trading" field="eaTrading" placeholder="Allowed" />
        </div>
      </section>

      {/* Tag-Based Arrays */}
      <section className="rounded-2xl border border-white/10 bg-[#0c0c12]/80 backdrop-blur-md p-6 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Ban className="w-5 h-5 text-red-400" /> Platforms, Assets & Geofencing
        </h3>
        <TagEditor label="Platforms" tags={form.platformNames || []} onChange={v => updateField("platformNames", v)} placeholder="e.g. MT5, cTrader..." />
        <TagEditor label="Tradeable Instruments" tags={form.instruments || []} onChange={v => updateField("instruments", v)} placeholder="e.g. Forex, Crypto, Indices..." />
        <TagEditor label="Payment Methods" tags={form.paymentMethods || []} onChange={v => updateField("paymentMethods", v)} placeholder="e.g. Credit Card, Crypto..." />
        <TagEditor label="Payout Methods" tags={form.payoutMethods || []} onChange={v => updateField("payoutMethods", v)} placeholder="e.g. Bank Transfer, Crypto..." />
        <TagEditor label="Restricted Countries" tags={form.restrictedCountries || []} onChange={v => updateField("restrictedCountries", v)} placeholder="e.g. US, IR, KP..." />
      </section>

      {/* Bottom Save */}
      <div className="flex justify-end pb-8">
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange px-8 py-4 font-bold text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_-5px_rgba(220,38,38,0.6)] disabled:opacity-50 text-lg"
        >
          {saving ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" /> : <Save className="w-5 h-5" />}
          Save All Changes
        </button>
      </div>
    </div>
  );
}
