"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import { FirmData } from "@/data/firms";
import { FormField } from "@/components/admin/FormField";
import { TagListEditor } from "@/components/admin/TagListEditor";
import * as Tabs from '@radix-ui/react-tabs';
import { Save, ArrowLeft, Building, FileText, Settings, CreditCard, Percent, Tag, ShieldAlert, Plus, Trash2, Wallet, ChevronDown, ChevronUp, Gift, Check } from "lucide-react";
import { toast } from "sonner";

export default function FirmEditor() {
  const { slug } = useParams() as { slug: string };
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [firm, setFirm] = useState<Partial<FirmData>>({
    slug: "",
    name: "",
    logo: "",
    badge: "",
    shortDesc: "",
    description: "",
    color: "#4f46e5",
    ceo: "",
    countryCode: "us",
    location: "",
    foundedDate: "",
    yearsOperational: 1,
    maxFunding: "",
    profitSplit: "",
    scalingPlan: "",
    payoutSpeed: "",
    payoutFrequency: "",
    dailyLoss: "",
    maxLoss: "",
    profitTarget: "",
    newsTrading: "",
    weekendHolding: "",
    eaTrading: "",
    discountCode: "",
    discountAmount: "",
    promoDescription: "",
    discountExpiry: "",
    platformNames: [],
    pros: [],
    cons: [],
    instruments: [],
    paymentMethods: [],
    payoutMethods: [],
    restrictedCountries: [],
    commissions: { forex: "", indices: "", crypto: "", commodities: "" },
    leverage: { forex: "", indices: "", crypto: "", commodities: "" },
    ratingDistribution: [0, 0, 0, 0, 0],
    rating: 0,
    reviewCount: 0,
    trustpilot: false,
    trustpilotScore: 0,
    likes: 0,
    features: [],
    accounts: [],
    userReviews: [],
    offers: []
  });

  useEffect(() => {
    if (slug !== "new") fetchFirm();
    else setLoading(false);
  }, [slug]);

  async function fetchFirm() {
    setLoading(true);
    const { data, error } = await supabase.from("firms").select("*, accounts(*), offers(*)").eq("slug", slug).single();
    if (!error && data) {
      setFirm(data as FirmData);
    } else {
      toast.error("Failed to load firm data. It may not exist.");
    }
    setLoading(false);
  }

  async function handleSave() {
    setSaving(true);
    const targetSlug = slug === "new" ? firm.slug || firm.name?.toLowerCase().replace(/\s+/g, '-') : slug;

    // Isolate firm payload from relational nested arrays natively blocked by Supabase
    const { accounts, userReviews, offers, ...firmPayload } = firm;

    const { error: firmError } = await supabase.from("firms").upsert({
      ...firmPayload,
      slug: targetSlug
    });

    if (firmError) {
      setSaving(false);
      toast.error(`Error saving firm: ${firmError.message}`);
      return;
    }

    // Process accounts sync: Wipe old accounts for this firm and insert the active state array
    if (accounts) {
       await supabase.from("accounts").delete().eq("firm_slug", targetSlug);
       if (accounts.length > 0) {
          const mappedAccounts = accounts.map(acc => ({
             ...acc,
             id: acc.id?.length === 36 ? acc.id : undefined, // let SB gen UUID if temp id
             firm_slug: targetSlug
          }));
          await supabase.from("accounts").insert(mappedAccounts);
       }
    }

    // Process offers sync: Wipe and replace like accounts
    if (offers) {
       await supabase.from("offers").delete().eq("firm_slug", targetSlug);
       if (offers.length > 0) {
          const mappedOffers = offers.map(off => ({
             ...off,
             id: off.id?.length === 36 ? off.id : undefined, // let SB gen UUID if temp id
             firm_slug: targetSlug
          }));
          await supabase.from("offers").insert(mappedOffers);
       }
    }

    setSaving(false);
    toast.success("Firm and all relational data successfully updated in database!");
    if (slug === "new") router.push(`/admin/firms/${targetSlug}`);
  }

  const handleObjChange = (parent: "commissions" | "leverage", key: string, val: string) => {
    setFirm(prev => ({
      ...prev,
      [parent]: { ...(prev[parent] as any), [key]: val }
    }));
  };

  const handleAddAccount = () => {
    setFirm(prev => ({
       ...prev,
       accounts: [...(prev.accounts || []), {
           id: crypto.randomUUID(),
           size: "$10k", balance: "$10,000", price: 0,
           type: "2-Step",
           targetPhase1: "8%", targetPhase2: "4%",
           maxDailyLoss: "5%", maxTotalLoss: "10%",
           duration: "Unlimited", leverage: "1:100"
       }]
    }));
  };

  const handleUpdateAccount = (idx: number, field: string, val: any) => {
    setFirm(prev => {
       if (!prev.accounts) return prev;
       const newAccs = [...prev.accounts];
       newAccs[idx] = { ...newAccs[idx], [field]: val };
       return { ...prev, accounts: newAccs };
    });
  };

  const handleDuplicateAccount = (idx: number) => {
    setFirm(prev => {
       if (!prev.accounts) return prev;
       const newAccs = [...prev.accounts];
       newAccs.splice(idx + 1, 0, { ...newAccs[idx], id: crypto.randomUUID() });
       return { ...prev, accounts: newAccs };
    });
  };

  const handleDeleteAccount = (idx: number) => {
    setFirm(prev => {
       if (!prev.accounts) return prev;
       const newAccs = [...prev.accounts];
       newAccs.splice(idx, 1);
       return { ...prev, accounts: newAccs };
    });
  };

  const handleAddOffer = () => {
    setFirm(prev => ({
       ...prev,
       offers: [...(prev.offers || []), {
           id: crypto.randomUUID(),
           title: "NEW 30% OFF", subtitle: "+ FREE ACCOUNT", description: "30% off + free account of the same size if reaching payout...",
           discountCode: "MATCH", expiryDate: "Apr 1",
           isNew: true, tagLabel: "Less than 20 reviews"
       }]
    }));
  };

  const handleUpdateOffer = (idx: number, field: string, val: any) => {
    setFirm(prev => {
       if (!prev.offers) return prev;
       const newOffs = [...prev.offers];
       newOffs[idx] = { ...newOffs[idx], [field]: val };
       return { ...prev, offers: newOffs };
    });
  };

  const handleDuplicateOffer = (idx: number) => {
    setFirm(prev => {
       if (!prev.offers) return prev;
       const newOffs = [...prev.offers];
       newOffs.splice(idx + 1, 0, { ...newOffs[idx], id: crypto.randomUUID() });
       return { ...prev, offers: newOffs };
    });
  };

  const handleDeleteOffer = (idx: number) => {
    setFirm(prev => {
       if (!prev.offers) return prev;
       const newOffs = [...prev.offers];
       newOffs.splice(idx, 1);
       return { ...prev, offers: newOffs };
    });
  };

  const [expandedAccountId, setExpandedAccountId] = useState<string | null>(null);

  const TABS = [
    { id: "basic", label: "Basic Info", icon: Building },
    { id: "accounts", label: "Challenge Accounts", icon: Wallet },
    { id: "offers", label: "Promo Offers", icon: Gift },
    { id: "company", label: "Company", icon: FileText },
    { id: "specs", label: "Trading Specs", icon: Settings },
    { id: "economics", label: "Economics & Promo", icon: Percent },
    { id: "arrays", label: "Tags & Platforms", icon: Tag },
  ];

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20 py-4 mb-4 bg-[#07070a]/80 backdrop-blur-2xl border-b border-white/5 mx-[-2.5rem] px-[2.5rem]">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push("/admin/firms")} className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all shadow-inner">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">{slug === "new" ? "Create New Firm" : "Edit Database Record"}</h1>
            <p className="text-sm font-medium text-emerald-400 font-mono tracking-wider">{slug !== "new" && `UUID: firms.${firm.slug}`}</p>
          </div>
        </div>

        <button 
          onClick={handleSave} 
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange px-8 py-3 font-bold text-white transition-all hover:shadow-[0_0_30px_-5px_rgba(220,38,38,0.6)] hover:scale-[1.02] disabled:opacity-50"
        >
          {saving ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <Save className="w-5 h-5" />}
          {saving ? "Deploying..." : "Save to Database"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Live Preview / Mini-Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-3xl p-6 shadow-2xl relative overflow-hidden">
             {firm.color && (
               <div className="absolute top-0 right-0 w-48 h-48 opacity-20 blur-3xl pointer-events-none rounded-full" style={{ backgroundColor: firm.color }} />
             )}
             <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 rounded-2xl bg-white p-4 shadow-xl flex items-center justify-center">
                  {firm.logo ? <img src={firm.logo} alt="Logo" className="max-w-full max-h-full" /> : <Building className="w-10 h-10 text-neutral-300" />}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{firm.name || "Unnamed Firm"}</h2>
                  {firm.badge && <span className="inline-block mt-2 rounded-full bg-brand-red/10 px-3 py-1 text-xs font-bold text-brand-red border border-brand-red/30 shadow-[0_0_10px_rgba(220,38,38,0.2)]">{firm.badge}</span>}
                </div>
                <p className="text-sm text-neutral-400">{firm.shortDesc || "No description provided."}</p>
             </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-3xl p-6">
             <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-4 border-b border-white/5 pb-2">Record Stats</h3>
             <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-500">Overall Rating</span>
                  <span className="font-bold text-amber-400 flex items-center gap-1">{firm.rating} ⭐</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-500">Reviews Mapped</span>
                  <span className="font-bold text-white">{firm.reviewCount}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-500">Trustpilot Live</span>
                  <span className={`font-bold ${firm.trustpilot ? "text-emerald-400" : "text-neutral-600"}`}>{firm.trustpilot ? "Enabled" : "Disabled"}</span>
                </div>
             </div>
          </div>
        </div>

        {/* Right Col: Forms */}
        <div className="lg:col-span-2">
          <Tabs.Root defaultValue="basic" className="flex flex-col w-full h-full">
            <Tabs.List className="flex w-full mb-6 border-b border-white/10 overflow-x-auto overflow-y-hidden pb-[1px] hide-scrollbar gap-2">
              {TABS.map(tab => (
                <Tabs.Trigger 
                  key={tab.id} 
                  value={tab.id}
                  className="group flex items-center gap-2 shrink-0 px-4 py-3 text-sm font-medium flex-1 justify-center rounded-t-xl transition-all text-neutral-400 hover:text-white hover:bg-white/5 data-[state=active]:text-white data-[state=active]:bg-white/10 data-[state=active]:border-b-2 data-[state=active]:border-brand-red data-[state=active]:shadow-[inset_0_-1px_10px_-5px_rgba(220,38,38,0.5)] outline-none"
                >
                  <tab.icon className="w-4 h-4 group-data-[state=active]:text-brand-orange transition-colors" />
                  {tab.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-3xl p-8 shadow-xl">
              <Tabs.Content value="basic" className="space-y-6 outline-none animate-in fade-in duration-500">
                <div className="grid grid-cols-2 gap-6">
                  <FormField label="Firm Name" value={firm.name || ""} onChange={(e) => setFirm({ ...firm, name: e.target.value })} />
                  <FormField label="Database Slug Identifier (URL)" value={firm.slug || ""} onChange={(e) => setFirm({ ...firm, slug: e.target.value })} placeholder="e.g. ftmo" />
                </div>
                <FormField label="Logo Image URL" type="url" value={firm.logo || ""} onChange={(e) => setFirm({ ...firm, logo: e.target.value })} />
                <div className="grid grid-cols-2 gap-6">
                  <FormField label="Site Direct Link" type="url" value={firm.websiteUrl || ""} onChange={(e) => setFirm({ ...firm, websiteUrl: e.target.value })} placeholder="https://ftmo.com" />
                  <FormField label="Affiliate Link" type="url" value={firm.affiliateLink || ""} onChange={(e) => setFirm({ ...firm, affiliateLink: e.target.value })} placeholder="https://ftmo.com/en/?affiliates=yourid" />
                </div>
                <FormField label="Badge / Label (Optional)" value={firm.badge || ""} onChange={(e) => setFirm({ ...firm, badge: e.target.value })} />
                <FormField label="Brand Color (Hex)" type="color" value={firm.color || "#000000"} onChange={(e) => setFirm({ ...firm, color: e.target.value })} />
                <FormField label="Short Description" type="textarea" rows={2} value={firm.shortDesc || ""} onChange={(e) => setFirm({ ...firm, shortDesc: e.target.value })} />
                <FormField label="Full Deep-Dive Description" type="textarea" rows={6} value={firm.description || ""} onChange={(e) => setFirm({ ...firm, description: e.target.value })} />
              </Tabs.Content>

              <Tabs.Content value="company" className="space-y-6 outline-none animate-in fade-in duration-500">
                <div className="grid grid-cols-2 gap-6">
                  <FormField label="CEO / Founder Name" value={firm.ceo || ""} onChange={(e) => setFirm({ ...firm, ceo: e.target.value })} />
                  <FormField label="Country Code (e.g., us, gb, cz)" type="country" value={firm.countryCode || ""} onChange={(e) => setFirm({ ...firm, countryCode: e.target.value })} />
                  <FormField label="HQ Location String" value={firm.location || ""} onChange={(e) => setFirm({ ...firm, location: e.target.value })} />
                  <FormField label="Founded Date (String)" type="month" value={firm.foundedDate || ""} onChange={(e) => setFirm({ ...firm, foundedDate: e.target.value })} />
                  <FormField label="Years Operational" type="number" value={firm.yearsOperational || 0} onChange={(e) => setFirm({ ...firm, yearsOperational: parseInt(e.target.value) })} />
                </div>
              </Tabs.Content>

              <Tabs.Content value="accounts" className="space-y-6 outline-none animate-in fade-in duration-500">
                <div className="flex justify-between items-center mb-6">
                   <div>
                     <h3 className="text-xl font-bold text-white">Challenge Accounts</h3>
                     <p className="text-sm text-neutral-400">Configure prices, targets, and phases for every account tier.</p>
                   </div>
                   <button 
                     onClick={handleAddAccount}
                     className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm font-bold text-white hover:bg-white/10 hover:border-brand-red/50 hover:shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-all"
                   >
                     <Plus className="w-4 h-4 text-brand-red" /> Add Challenge Tier
                   </button>
                </div>

                <div className="space-y-4">
                  {(firm.accounts || []).map((acc, idx) => {
                     const isExpanded = expandedAccountId === acc.id;
                     return (
                        <div key={acc.id} className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden transition-all duration-300">
                           {/* Row Header */}
                           <div 
                             className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5"
                             onClick={() => setExpandedAccountId(isExpanded ? null : (acc.id || null))}
                           >
                              <div className="flex items-center gap-4">
                                <span className="font-mono font-bold text-lg text-brand-red w-20">{acc.size || "$??k"}</span>
                                <span className="text-white font-medium bg-white/10 px-3 py-1 rounded-lg text-sm">{acc.type || "Unknown"}</span>
                                <span className="text-emerald-400 font-mono text-sm">${acc.price || 0}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                 <button onClick={(e) => { e.stopPropagation(); handleDuplicateAccount(idx); }} className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10"><Plus className="w-4 h-4" /></button>
                                 <button onClick={(e) => { e.stopPropagation(); handleDeleteAccount(idx); }} className="p-2 text-red-400 hover:text-red-300 rounded-lg hover:bg-red-500/20"><Trash2 className="w-4 h-4" /></button>
                                 {isExpanded ? <ChevronUp className="w-5 h-5 text-neutral-500" /> : <ChevronDown className="w-5 h-5 text-neutral-500" />}
                              </div>
                           </div>

                           {/* Expanded Edit Form */}
                           {isExpanded && (
                              <div className="p-6 border-t border-white/10 bg-neutral-900/30 grid grid-cols-2 gap-6 animate-in slide-in-from-top-2">
                                 <FormField label="Account Size Label" value={acc.size} onChange={(e) => handleUpdateAccount(idx, 'size', e.target.value)} placeholder="$100k" />
                                 <FormField label="Actual Balance Text" value={acc.balance} onChange={(e) => handleUpdateAccount(idx, 'balance', e.target.value)} placeholder="$100,000" />
                                 <FormField label="Price ($)" type="number" value={acc.price} onChange={(e) => handleUpdateAccount(idx, 'price', parseFloat(e.target.value))} />
                                 <FormField label="Promo Price ($) (Optional)" type="number" value={acc.promoPrice || ""} onChange={(e) => handleUpdateAccount(idx, 'promoPrice', e.target.value ? parseFloat(e.target.value) : undefined)} />
                                 
                                 <div className="col-span-2 grid grid-cols-3 gap-6 pt-4 border-t border-white/5">
                                    <FormField label="Evaluation Type" value={acc.type} onChange={(e) => handleUpdateAccount(idx, 'type', e.target.value)} placeholder="1-Step, 2-Step, Instant" />
                                    <FormField label="Target Phase 1" value={acc.targetPhase1} onChange={(e) => handleUpdateAccount(idx, 'targetPhase1', e.target.value)} />
                                    <FormField label="Target Phase 2" value={acc.targetPhase2} onChange={(e) => handleUpdateAccount(idx, 'targetPhase2', e.target.value)} />
                                    <FormField label="Max Daily Loss" value={acc.maxDailyLoss} onChange={(e) => handleUpdateAccount(idx, 'maxDailyLoss', e.target.value)} />
                                    <FormField label="Max Total Loss" value={acc.maxTotalLoss} onChange={(e) => handleUpdateAccount(idx, 'maxTotalLoss', e.target.value)} />
                                    <FormField label="Leverage" value={acc.leverage} onChange={(e) => handleUpdateAccount(idx, 'leverage', e.target.value)} />
                                 </div>
                              </div>
                           )}
                        </div>
                     )
                  })}
                  
                  {(!firm.accounts || firm.accounts.length === 0) && (
                     <div className="text-center py-12 border-2 border-dashed border-white/10 rounded-2xl">
                        <Wallet className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
                        <h4 className="text-lg font-bold text-white mb-1">No Accounts Configured</h4>
                        <p className="text-sm text-neutral-500 mb-4">Add your first challenge tier to display pricing dynamically.</p>
                        <button onClick={handleAddAccount} className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-6 py-2 font-bold text-white hover:bg-brand-orange transition-colors"><Plus className="w-5 h-5" /> Initialize Tiers</button>
                     </div>
                  )}
                </div>
              </Tabs.Content>

              <Tabs.Content value="offers" className="space-y-6 outline-none animate-in fade-in duration-500">
                <div className="flex flex-col gap-6">
                  {firm.offers?.map((off, idx) => (
                    <div key={`offer-${idx}`} className="rounded-2xl border border-pink-500/20 bg-black/40 p-1 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-purple-500/5 pointer-events-none" />
                      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-[#0f0f0f] rounded-[14px]">
                        <div>
                          <h3 className="font-bold text-white text-lg flex items-center gap-2">
                             Offer #{idx + 1}
                             {off.isNew && <span className="bg-gradient-to-r from-pink-500 to-purple-500 px-2 py-0.5 rounded text-[10px] text-white uppercase ml-2 tracking-wider">New</span>}
                          </h3>
                          <p className="text-sm text-neutral-400 mt-1 font-mono">{off.title} • {off.discountCode || "NO CODE"}</p>
                        </div>
                        <div className="flex rounded-xl overflow-hidden border border-white/10 bg-[#1a1a1a]">
                           <button onClick={() => handleDuplicateOffer(idx)} className="p-3 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors tooltip border-r border-white/5" title="Duplicate">
                               <Plus className="w-5 h-5" />
                           </button>
                           <button onClick={() => handleDeleteOffer(idx)} className="p-3 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors tooltip" title="Delete">
                               <Trash2 className="w-5 h-5" />
                           </button>
                        </div>
                      </div>

                      <div className="p-6 border-t border-pink-500/20 bg-neutral-900/60 grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                         <FormField label="Headline Title" value={off.title} onChange={(e) => handleUpdateOffer(idx, 'title', e.target.value)} placeholder="30% OFF" />
                         <FormField label="Subtitle" value={off.subtitle} onChange={(e) => handleUpdateOffer(idx, 'subtitle', e.target.value)} placeholder="+ FREE ACCOUNT" />
                         <FormField label="Discount Code" value={off.discountCode} onChange={(e) => handleUpdateOffer(idx, 'discountCode', e.target.value)} placeholder="MATCH" />
                         <FormField label="Tag Label (Pill)" value={off.tagLabel} onChange={(e) => handleUpdateOffer(idx, 'tagLabel', e.target.value)} placeholder="Less than 20 reviews" />
                         
                         <div className="col-span-2 lg:col-span-4">
                            <FormField label="Full Offer Description" type="textarea" rows={2} value={off.description} onChange={(e) => handleUpdateOffer(idx, 'description', e.target.value)} placeholder="Write description here..." />
                         </div>

                         <FormField label="Expiry Date String" value={off.expiryDate} onChange={(e) => handleUpdateOffer(idx, 'expiryDate', e.target.value)} placeholder="Apr 1" />
                         
                         <div className="cursor-pointer flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:border-pink-500/50 transition-colors h-[68px] mt-auto" onClick={() => handleUpdateOffer(idx, 'isNew', !off.isNew)}>
                            <div className={`w-5 h-5 rounded flex items-center justify-center border ${off.isNew ? 'bg-gradient-to-br from-pink-500 to-purple-500 border-none text-white' : 'border-white/30'}`}>
                               {off.isNew && <Check className="w-3.5 h-3.5" />}
                            </div>
                            <span className="text-sm font-bold text-white select-none">Show "NEW OFFER" Badge</span>
                         </div>
                      </div>
                    </div>
                  ))}

                  {(!firm.offers || firm.offers.length === 0) && (
                     <div className="text-center py-12 border-2 border-dashed border-pink-500/30 rounded-2xl bg-gradient-to-b from-pink-500/5 to-transparent">
                        <Gift className="w-12 h-12 text-pink-500 mx-auto mb-3" />
                        <h4 className="text-xl font-black tracking-tight text-white mb-1">No Active Promos</h4>
                        <p className="text-sm text-neutral-400 mb-6 max-w-sm mx-auto">Click below to initialize the relational Offers pipeline and instantly generate a dynamic promotion tab.</p>
                     </div>
                  )}

                  <button onClick={handleAddOffer} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 px-6 py-4 font-bold text-white transition-all shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 hover:scale-[1.01]"><Plus className="w-5 h-5" /> Launch New Relational Offer</button>

                </div>
              </Tabs.Content>

              <Tabs.Content value="specs" className="space-y-6 outline-none animate-in fade-in duration-500">
                <div className="grid grid-cols-2 gap-6">
                  <FormField label="Max Overall Funding" value={firm.maxFunding || ""} onChange={(e) => setFirm({ ...firm, maxFunding: e.target.value })} placeholder="$2M" />
                  <FormField label="Profit Split" value={firm.profitSplit || ""} onChange={(e) => setFirm({ ...firm, profitSplit: e.target.value })} placeholder="Up to 90%" />
                  <FormField label="Payout Speed" value={firm.payoutSpeed || ""} onChange={(e) => setFirm({ ...firm, payoutSpeed: e.target.value })} />
                  <FormField label="Payout Frequency" value={firm.payoutFrequency || ""} onChange={(e) => setFirm({ ...firm, payoutFrequency: e.target.value })} />
                  <FormField label="Scaling Plan Descriptor" value={firm.scalingPlan || ""} onChange={(e) => setFirm({ ...firm, scalingPlan: e.target.value })} className="col-span-2" />
                </div>
                
                <h4 className="text-lg font-bold text-white mt-8 mb-4 border-b border-white/10 pb-2">Trading Rules</h4>
                <div className="grid grid-cols-2 gap-6">
                  <FormField label="Max Daily Loss" value={firm.dailyLoss || ""} onChange={(e) => setFirm({ ...firm, dailyLoss: e.target.value })} />
                  <FormField label="Max Overall Loss" value={firm.maxLoss || ""} onChange={(e) => setFirm({ ...firm, maxLoss: e.target.value })} />
                  <FormField label="Profit Target" value={firm.profitTarget || ""} onChange={(e) => setFirm({ ...firm, profitTarget: e.target.value })} />
                  <FormField label="News Trading Rule" value={firm.newsTrading || ""} onChange={(e) => setFirm({ ...firm, newsTrading: e.target.value })} />
                  <FormField label="Weekend Holding Rule" value={firm.weekendHolding || ""} onChange={(e) => setFirm({ ...firm, weekendHolding: e.target.value })} />
                  <FormField label="EA / Bot Trading" value={firm.eaTrading || ""} onChange={(e) => setFirm({ ...firm, eaTrading: e.target.value })} />
                </div>
              </Tabs.Content>

              <Tabs.Content value="economics" className="space-y-8 outline-none animate-in fade-in duration-500">
                <div>
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5 text-brand-red" /> Promos & Discounts</h4>
                  <div className="grid grid-cols-2 gap-6 bg-brand-red/5 p-6 rounded-2xl border border-brand-red/20 shadow-[0_0_30px_-10px_rgba(220,38,38,0.1)]">
                    <FormField label="Discount Code" value={firm.discountCode || ""} onChange={(e) => setFirm({ ...firm, discountCode: e.target.value })} />
                    <FormField label="Discount Amount Text" value={firm.discountAmount || ""} onChange={(e) => setFirm({ ...firm, discountAmount: e.target.value })} />
                    <div className="col-span-2">
                       <FormField label="Deep Promo Description" type="textarea" rows={2} value={firm.promoDescription || ""} onChange={(e) => setFirm({ ...firm, promoDescription: e.target.value })} placeholder="e.g. Get 20% off all challenges + 15% profit split bonus." />
                    </div>
                    <FormField label="Exact Expiry Date & Time" type="datetime-local" value={firm.discountExpiry || ""} onChange={(e) => setFirm({ ...firm, discountExpiry: e.target.value })} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-md font-bold text-white mb-4 border-b border-white/10 pb-2">Commissions</h4>
                    <div className="space-y-4">
                      {["forex", "indices", "crypto", "commodities"].map((asset) => (
                        <FormField key={`comm-${asset}`} label={asset.toUpperCase()} value={(firm.commissions as any)?.[asset] || ""} onChange={(e) => handleObjChange("commissions", asset, e.target.value)} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md font-bold text-white mb-4 border-b border-white/10 pb-2">Leverage Limits</h4>
                    <div className="space-y-4">
                      {["forex", "indices", "crypto", "commodities"].map((asset) => (
                        <FormField key={`lev-${asset}`} label={asset.toUpperCase()} value={(firm.leverage as any)?.[asset] || ""} onChange={(e) => handleObjChange("leverage", asset, e.target.value)} placeholder="1:100" />
                      ))}
                    </div>
                  </div>
                </div>
              </Tabs.Content>

              <Tabs.Content value="arrays" className="space-y-8 outline-none animate-in fade-in duration-500">
                <TagListEditor label="Supported Trading Platforms" tags={firm.platformNames || []} onChange={(tags) => setFirm({ ...firm, platformNames: tags })} placeholder="E.g., MT5, cTrader" />
                <TagListEditor label="Tradable Instruments" tags={firm.instruments || []} onChange={(tags) => setFirm({ ...firm, instruments: tags })} placeholder="E.g., Forex, Crypto" />
                <TagListEditor label="Payout Methods" tags={firm.payoutMethods || []} onChange={(tags) => setFirm({ ...firm, payoutMethods: tags })} />
                <TagListEditor label="Payment Methods" tags={firm.paymentMethods || []} onChange={(tags) => setFirm({ ...firm, paymentMethods: tags })} />
                <TagListEditor label="Pros" tags={firm.pros || []} onChange={(tags) => setFirm({ ...firm, pros: tags })} />
                <TagListEditor label="Cons" tags={firm.cons || []} onChange={(tags) => setFirm({ ...firm, cons: tags })} />
                <div className="pt-6 border-t border-red-500/20">
                  <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2"><ShieldAlert className="w-5 h-5" /> Geo Restrictions</h4>
                  <TagListEditor label="Restricted Countries" tags={firm.restrictedCountries || []} onChange={(tags) => setFirm({ ...firm, restrictedCountries: tags })} placeholder="E.g., USA, Vietnam" />
                </div>
              </Tabs.Content>

            </div>
          </Tabs.Root>
        </div>
      </div>
    </div>
  );
}
