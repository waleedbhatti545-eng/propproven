"use client";

import { useState } from "react";
import { Bell, Send, Eye, Smartphone, Globe, Image as ImageIcon, Link2, Type, FileText, Sparkles, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminNotificationsPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState("/images/logo.png");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSend() {
    if (!title.trim() || !body.trim()) {
      toast.error("Title and body are required.");
      return;
    }
    setSending(true);
    // Simulate send — this is where you'd integrate OneSignal/Firebase
    await new Promise(r => setTimeout(r, 2000));
    setSending(false);
    setSent(true);
    toast.success("Notification composed! Connect a push service to deliver.");
    setTimeout(() => setSent(false), 5000);
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white mb-2 flex items-center gap-3">
          <Bell className="w-8 h-8 text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
          Push Notification Composer
        </h1>
        <p className="text-neutral-400">Design and preview notifications before sending. Connect OneSignal or Firebase to enable delivery.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Composer */}
        <div className="rounded-3xl border border-white/10 bg-[#0c0c12]/80 p-8 shadow-2xl space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Type className="w-5 h-5 text-pink-500" /> Compose
          </h2>

          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-300 ml-1 flex items-center gap-2"><Type className="w-4 h-4 text-pink-500" /> Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="🔥 New Firm Alert!"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-pink-500/30 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-300 ml-1 flex items-center gap-2"><FileText className="w-4 h-4 text-pink-500" /> Body</label>
            <textarea value={body} onChange={e => setBody(e.target.value)} rows={3} placeholder="Check out the latest prop firm with 90% profit split and instant payouts..."
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-pink-500/30 transition-all resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-300 ml-1 flex items-center gap-2"><Link2 className="w-4 h-4 text-pink-500" /> Click URL</label>
            <input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://propproven.com/firms/new-firm"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-pink-500/30 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-300 ml-1 flex items-center gap-2"><ImageIcon className="w-4 h-4 text-pink-500" /> Icon URL</label>
            <input type="url" value={icon} onChange={e => setIcon(e.target.value)} placeholder="/images/logo.png"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-pink-500/30 transition-all"
            />
          </div>

          <button
            onClick={handleSend}
            disabled={sending || sent}
            className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-4 font-black tracking-widest uppercase text-white transition-all hover:scale-[1.02] disabled:opacity-50 ${
              sent ? "bg-emerald-600 shadow-lg shadow-emerald-500/20" : "bg-gradient-to-r from-pink-600 to-purple-600 shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40"
            }`}
          >
            {sent ? <><CheckCircle2 className="w-5 h-5" /> Composed Successfully</> :
             sending ? <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" /> Sending...</> :
             <><Send className="w-5 h-5" /> Send Push Notification</>}
          </button>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm">
            <p className="font-bold mb-1">⚡ Integration Required</p>
            <p className="text-xs text-amber-400/70">To actually deliver push notifications, connect <span className="font-bold">OneSignal</span> or <span className="font-bold">Firebase Cloud Messaging</span>. The composer UI is production-ready — just swap the send handler.</p>
          </div>
        </div>

        {/* Preview */}
        <div className="rounded-3xl border border-white/10 bg-[#0c0c12]/80 p-8 shadow-2xl space-y-8">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-pink-500" /> Live Preview
          </h2>

          {/* Desktop Notification Preview */}
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
              <Globe className="w-3.5 h-3.5" /> Desktop
            </p>
            <div className="bg-[#2b2b2b] rounded-2xl p-5 shadow-2xl border border-white/10 max-w-md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white p-2 flex items-center justify-center shrink-0 shadow-inner">
                  {icon ? <img src={icon} alt="" className="max-w-full max-h-full object-contain" /> : <Bell className="w-6 h-6 text-neutral-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-white font-bold text-sm truncate">{title || "Notification Title"}</p>
                    <span className="text-neutral-500 text-[10px] shrink-0 ml-2">now</span>
                  </div>
                  <p className="text-neutral-400 text-xs line-clamp-2">{body || "Notification body text will appear here..."}</p>
                  <p className="text-blue-400 text-[10px] mt-1.5 truncate font-mono">{url || "propproven.com"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Notification Preview */}
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
              <Smartphone className="w-3.5 h-3.5" /> Mobile
            </p>
            <div className="bg-[#1c1c1e] rounded-3xl p-4 shadow-2xl border border-white/10 max-w-sm mx-auto">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center shrink-0">
                  {icon ? <img src={icon} alt="" className="max-w-full max-h-full object-contain" /> : <Bell className="w-4 h-4 text-neutral-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-neutral-400 text-[10px] font-bold uppercase">PropProven</p>
                    <span className="text-neutral-600 text-[10px]">now</span>
                  </div>
                </div>
              </div>
              <p className="text-white font-bold text-sm mb-1">{title || "Notification Title"}</p>
              <p className="text-neutral-400 text-xs line-clamp-3">{body || "Notification body text..."}</p>
            </div>
          </div>

          {/* JSON Preview */}
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Payload
            </p>
            <pre className="bg-black/60 border border-white/10 rounded-xl p-4 text-xs text-emerald-400 font-mono overflow-x-auto">
{JSON.stringify({ title: title || "...", body: body || "...", url: url || "/", icon }, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
