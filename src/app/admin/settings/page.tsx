"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import {
  Settings, Save, RefreshCw, Globe, Type, Search, Share2,
  Facebook, Twitter, Instagram, Youtube, FileText, Megaphone,
  Eye, EyeOff, Palette, X, Plus, GripVertical, Sparkles
} from "lucide-react";
import { toast } from "sonner";

interface SiteSettings {
  id: string;
  hero_headline: string;
  hero_subheadline: string;
  hero_rotating_words: string[];
  seo_title: string;
  seo_description: string;
  footer_text: string;
  facebook_url: string;
  twitter_url: string;
  instagram_url: string;
  youtube_url: string;
  announcement_enabled?: boolean;
  announcement_text?: string;
  announcement_link?: string;
  announcement_color?: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  id: "global",
  hero_headline: "",
  hero_subheadline: "",
  hero_rotating_words: [],
  seo_title: "",
  seo_description: "",
  footer_text: "",
  facebook_url: "",
  twitter_url: "",
  instagram_url: "",
  youtube_url: "",
  announcement_enabled: false,
  announcement_text: "",
  announcement_link: "",
  announcement_color: "#dc2626",
};

function SettingsField({
  label, description, value, onChange, type = "text", rows, placeholder, icon: Icon
}: {
  label: string; description?: string; value: string; onChange: (val: string) => void;
  type?: "text" | "url" | "textarea" | "color"; rows?: number; placeholder?: string; icon?: any;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-neutral-300 ml-1 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-brand-red" />}
        {label}
      </label>
      {description && <p className="text-xs text-neutral-500 ml-1 -mt-1">{description}</p>}
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows || 3}
          placeholder={placeholder}
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red/50 focus:bg-white/5 backdrop-blur-xl transition-all shadow-inner resize-none"
        />
      ) : type === "color" ? (
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-12 w-24 bg-black/40 border border-white/10 rounded-xl cursor-pointer"
          />
          <span className="text-white bg-black/40 px-4 py-2 rounded-xl border border-white/10 font-mono tracking-wider text-sm">{value}</span>
        </div>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red/50 focus:bg-white/5 backdrop-blur-xl transition-all shadow-inner"
        />
      )}
    </div>
  );
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newWord, setNewWord] = useState("");

  useEffect(() => { fetchSettings(); }, []);

  async function fetchSettings() {
    setLoading(true);
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", "global")
      .single();

    if (data) {
      setSettings({ ...DEFAULT_SETTINGS, ...data });
    } else if (error && error.code === "PGRST116") {
      // Row doesn't exist yet — we'll create it on first save
      toast.info("No settings found. Defaults loaded — save to initialize.");
    }
    setLoading(false);
  }

  async function handleSave() {
    setSaving(true);
    const { error } = await supabase
      .from("site_settings")
      .upsert(settings, { onConflict: "id" });

    if (error) {
      toast.error(`Failed to save: ${error.message}`);
    } else {
      toast.success("Global settings saved successfully!");
    }
    setSaving(false);
  }

  const updateField = (key: keyof SiteSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const addRotatingWord = () => {
    if (newWord.trim()) {
      updateField("hero_rotating_words", [...(settings.hero_rotating_words || []), newWord.trim()]);
      setNewWord("");
    }
  };

  const removeRotatingWord = (index: number) => {
    updateField("hero_rotating_words", (settings.hero_rotating_words || []).filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <RefreshCw className="w-12 h-12 text-brand-red animate-spin" />
        <p className="text-neutral-500 text-sm font-bold uppercase tracking-widest">Loading configuration...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-2 flex items-center gap-3">
            <Settings className="w-8 h-8 text-brand-red drop-shadow-[0_0_15px_rgba(220,38,38,0.5)] animate-[spin_8s_linear_infinite]" />
            Global Configuration
          </h1>
          <p className="text-neutral-400">Control your entire website from one place. Changes apply instantly on next page load.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange px-8 py-4 font-black tracking-widest uppercase text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_-5px_rgba(220,38,38,0.6)] disabled:opacity-50"
        >
          {saving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {saving ? "Deploying..." : "Save All Settings"}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* ═══ HERO SECTION CONTROLS ═══ */}
        <div className="rounded-3xl border border-white/10 bg-[#0c0c12]/80 backdrop-blur-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-red/5 blur-[80px] pointer-events-none rounded-full" />
          <h2 className="text-xl font-black text-white mb-6 flex items-center gap-3 relative z-10 uppercase tracking-wider">
            <Type className="w-6 h-6 text-brand-red" /> Hero Section
          </h2>
          <div className="space-y-6 relative z-10">
            <SettingsField
              label="Main Headline"
              description="The massive text users see first on the homepage."
              value={settings.hero_headline || ""}
              onChange={(v) => updateField("hero_headline", v)}
              placeholder="Find Your Perfect Prop Firm"
              icon={Type}
            />
            <SettingsField
              label="Sub-Headline"
              description="Supporting text below the main headline."
              value={settings.hero_subheadline || ""}
              onChange={(v) => updateField("hero_subheadline", v)}
              type="textarea"
              rows={2}
              placeholder="Compare the world's top proprietary trading firms..."
              icon={FileText}
            />

            {/* Rotating Words Manager */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-neutral-300 ml-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-red" />
                Rotating Words Animation
              </label>
              <p className="text-xs text-neutral-500 ml-1">These cycle through with a typewriter animation in the hero section.</p>
              <div className="flex flex-wrap gap-2 min-h-[40px]">
                {(settings.hero_rotating_words || []).map((word, i) => (
                  <div
                    key={i}
                    className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-red/10 border border-brand-red/20 text-brand-red text-sm font-bold transition-all hover:bg-brand-red/20"
                  >
                    <GripVertical className="w-3.5 h-3.5 text-brand-red/40" />
                    {word}
                    <button
                      onClick={() => removeRotatingWord(i)}
                      className="ml-1 p-0.5 rounded hover:bg-red-500/30 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                {(settings.hero_rotating_words || []).length === 0 && (
                  <span className="text-neutral-600 text-sm italic">No words added yet.</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addRotatingWord()}
                  placeholder="Type a word and press Enter..."
                  className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                />
                <button
                  onClick={addRotatingWord}
                  className="p-2.5 rounded-xl bg-brand-red/10 text-brand-red border border-brand-red/20 hover:bg-brand-red/20 transition-all"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ SEO CONTROLS ═══ */}
        <div className="rounded-3xl border border-white/10 bg-[#0c0c12]/80 backdrop-blur-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 blur-[80px] pointer-events-none rounded-full" />
          <h2 className="text-xl font-black text-white mb-6 flex items-center gap-3 relative z-10 uppercase tracking-wider">
            <Search className="w-6 h-6 text-emerald-500" /> SEO & Meta Tags
          </h2>
          <div className="space-y-6 relative z-10">
            <SettingsField
              label="Page Title"
              description="Shows in browser tabs and Google search results."
              value={settings.seo_title || ""}
              onChange={(v) => updateField("seo_title", v)}
              placeholder="PropProven — #1 Prop Firm Comparison Platform"
              icon={Globe}
            />
            <SettingsField
              label="Meta Description"
              description="The description Google shows under your page title (max 160 chars)."
              value={settings.seo_description || ""}
              onChange={(v) => updateField("seo_description", v)}
              type="textarea"
              rows={3}
              placeholder="Compare the world's top proprietary trading firms. Verified ratings, real reviews, and exclusive discount codes."
              icon={FileText}
            />

            {/* SEO Preview */}
            <div className="mt-4 p-5 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold mb-3">Google Preview</p>
              <div className="space-y-1">
                <p className="text-[#8ab4f8] text-lg font-medium truncate">
                  {settings.seo_title || "PropProven — #1 Prop Firm Comparison Platform"}
                </p>
                <p className="text-emerald-400 text-sm">propproven.com</p>
                <p className="text-neutral-400 text-sm line-clamp-2">
                  {settings.seo_description || "Compare the world's top proprietary trading firms..."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ SOCIAL MEDIA LINKS ═══ */}
        <div className="rounded-3xl border border-white/10 bg-[#0c0c12]/80 backdrop-blur-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 blur-[80px] pointer-events-none rounded-full" />
          <h2 className="text-xl font-black text-white mb-6 flex items-center gap-3 relative z-10 uppercase tracking-wider">
            <Share2 className="w-6 h-6 text-blue-500" /> Social Links
          </h2>
          <div className="space-y-5 relative z-10">
            <SettingsField
              label="Facebook" value={settings.facebook_url || ""}
              onChange={(v) => updateField("facebook_url", v)}
              type="url" placeholder="https://facebook.com/propproven"
              icon={Facebook}
            />
            <SettingsField
              label="Twitter / X" value={settings.twitter_url || ""}
              onChange={(v) => updateField("twitter_url", v)}
              type="url" placeholder="https://x.com/propproven"
              icon={Twitter}
            />
            <SettingsField
              label="Instagram" value={settings.instagram_url || ""}
              onChange={(v) => updateField("instagram_url", v)}
              type="url" placeholder="https://instagram.com/propproven"
              icon={Instagram}
            />
            <SettingsField
              label="YouTube" value={settings.youtube_url || ""}
              onChange={(v) => updateField("youtube_url", v)}
              type="url" placeholder="https://youtube.com/@propproven"
              icon={Youtube}
            />
          </div>
        </div>

        {/* ═══ ANNOUNCEMENT BANNER ═══ */}
        <div className="rounded-3xl border border-white/10 bg-[#0c0c12]/80 backdrop-blur-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 blur-[80px] pointer-events-none rounded-full" />
          <h2 className="text-xl font-black text-white mb-6 flex items-center gap-3 relative z-10 uppercase tracking-wider">
            <Megaphone className="w-6 h-6 text-amber-500" /> Announcement Banner
          </h2>
          <div className="space-y-6 relative z-10">

            {/* Toggle */}
            <div
              className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 transition-colors"
              onClick={() => updateField("announcement_enabled", !settings.announcement_enabled)}
            >
              <div className="flex items-center gap-3">
                {settings.announcement_enabled ? (
                  <Eye className="w-5 h-5 text-emerald-400" />
                ) : (
                  <EyeOff className="w-5 h-5 text-neutral-500" />
                )}
                <div>
                  <span className="text-white font-bold">Banner Status</span>
                  <p className="text-xs text-neutral-500">Shows a sitewide strip at the very top of every page.</p>
                </div>
              </div>
              <div className={`w-14 h-8 rounded-full transition-all duration-300 flex items-center px-1 ${
                settings.announcement_enabled
                  ? "bg-emerald-500 justify-end"
                  : "bg-neutral-700 justify-start"
              }`}>
                <div className="w-6 h-6 rounded-full bg-white shadow-md transition-all" />
              </div>
            </div>

            <SettingsField
              label="Banner Text"
              description="The message shown across the top of the site."
              value={settings.announcement_text || ""}
              onChange={(v) => updateField("announcement_text", v)}
              placeholder="🔥 Black Friday: 30% OFF all Prop Firms — Limited Time!"
              icon={Megaphone}
            />
            <SettingsField
              label="Banner Link (Optional)"
              description="Where users go when they click the banner."
              value={settings.announcement_link || ""}
              onChange={(v) => updateField("announcement_link", v)}
              type="url"
              placeholder="https://propproven.com/promos"
              icon={Globe}
            />
            <SettingsField
              label="Banner Color"
              value={settings.announcement_color || "#dc2626"}
              onChange={(v) => updateField("announcement_color", v)}
              type="color"
              icon={Palette}
            />

            {/* Live Preview */}
            {settings.announcement_enabled && settings.announcement_text && (
              <div className="mt-4">
                <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold mb-3">Live Preview</p>
                <div
                  className="w-full py-3 px-6 text-center text-white text-sm font-bold rounded-xl shadow-lg"
                  style={{ backgroundColor: settings.announcement_color || "#dc2626" }}
                >
                  {settings.announcement_text}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ═══ FOOTER ═══ */}
        <div className="rounded-3xl border border-white/10 bg-[#0c0c12]/80 backdrop-blur-3xl p-8 shadow-2xl xl:col-span-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-red/5 blur-[80px] pointer-events-none rounded-full" />
          <h2 className="text-xl font-black text-white mb-6 flex items-center gap-3 relative z-10 uppercase tracking-wider">
            <FileText className="w-6 h-6 text-brand-red" /> Footer & Legal
          </h2>
          <div className="relative z-10">
            <SettingsField
              label="Footer Copyright Text"
              description="The text shown at the bottom of every page."
              value={settings.footer_text || ""}
              onChange={(v) => updateField("footer_text", v)}
              type="textarea"
              rows={2}
              placeholder="© 2026 PropProven. All rights reserved. Not financial advice."
              icon={FileText}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
