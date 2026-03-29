"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { Users, RefreshCw, Shield, ShieldCheck, UserPlus, Trash2, Crown, PenLine, Mail } from "lucide-react";
import { toast } from "sonner";

interface AdminUser {
  id: string;
  email?: string;
  display_name?: string;
  role?: string;
  avatar_url?: string;
  created_at?: string;
  last_sign_in_at?: string;
}

export default function AdminTeamPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviting, setInviting] = useState(false);

  useEffect(() => { fetchTeam(); }, []);

  async function fetchTeam() {
    setLoading(true);
    // Fetch admin profiles with fallback
    const { data: profiles } = await supabase.from("admin_profiles").select("*");

    // Get current user
    const { data: { user: currentUser } } = await supabase.auth.getUser();

    if (profiles && profiles.length > 0) {
      setUsers(profiles.map((p: any) => ({
        id: p.id,
        email: p.email || currentUser?.email || "admin@propproven.com",
        display_name: p.display_name || "Admin",
        role: p.role || "Super Admin",
        avatar_url: p.avatar_url,
        created_at: p.created_at,
      })));
    } else if (currentUser) {
      // No profiles table yet, show current user as Super Admin
      setUsers([{
        id: currentUser.id,
        email: currentUser.email,
        display_name: "Super Admin",
        role: "Super Admin",
        created_at: currentUser.created_at,
        last_sign_in_at: currentUser.last_sign_in_at,
      }]);
    }
    setLoading(false);
  }

  async function handleInvite() {
    if (!inviteEmail.includes("@")) {
      toast.error("Enter a valid email address.");
      return;
    }
    setInviting(true);

    // In production, use Supabase admin API to invite user
    // For now, we add a profile entry
    const { error } = await supabase.from("admin_profiles").insert({
      id: crypto.randomUUID(),
      display_name: inviteEmail.split("@")[0],
      role: "Editor",
    });

    if (error) {
      toast.error("Could not invite. The admin_profiles table may not exist yet. Run the SQL migration.");
    } else {
      toast.success(`Invitation prepared for ${inviteEmail}. Use Supabase Auth to complete.`);
      setInviteEmail("");
      fetchTeam();
    }
    setInviting(false);
  }

  async function updateRole(userId: string, newRole: string) {
    const { error } = await supabase.from("admin_profiles").update({ role: newRole }).eq("id", userId);
    if (error) {
      toast.error("Failed to update role.");
      return;
    }
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    toast.success(`Role updated to ${newRole}`);
  }

  async function removeUser(userId: string) {
    const { error } = await supabase.from("admin_profiles").delete().eq("id", userId);
    if (error) {
      toast.error("Failed to remove user.");
      return;
    }
    setUsers(prev => prev.filter(u => u.id !== userId));
    toast.success("Team member removed.");
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white mb-2 flex items-center gap-3">
          <Users className="w-8 h-8 text-cyan-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
          Team Management
        </h1>
        <p className="text-neutral-400">Manage admin access. Assign roles and invite new team members.</p>
      </div>

      {/* Invite Card */}
      <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-6 shadow-2xl">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-cyan-500" /> Invite New Admin
        </h3>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input type="email" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)}
              placeholder="team.member@company.com"
              onKeyDown={e => e.key === "Enter" && handleInvite()}
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            />
          </div>
          <button onClick={handleInvite} disabled={inviting}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold hover:scale-[1.02] transition-all disabled:opacity-50 shadow-lg shadow-cyan-500/20"
          >
            {inviting ? <RefreshCw className="w-5 h-5 animate-spin" /> : <UserPlus className="w-5 h-5" />}
            Send Invite
          </button>
        </div>
        <p className="text-xs text-cyan-400/60 mt-3">New admins will need to be registered via Supabase Auth. This creates their admin profile entry.</p>
      </div>

      {/* Team List */}
      {loading ? (
        <div className="flex justify-center py-20"><RefreshCw className="w-10 h-10 text-cyan-500 animate-spin" /></div>
      ) : (
        <div className="space-y-4">
          {users.map(user => (
            <div key={user.id} className="group rounded-2xl border border-white/10 bg-[#0c0c12]/80 p-6 shadow-xl hover:border-cyan-500/20 transition-all">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">

                {/* Avatar */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 flex items-center justify-center text-2xl font-black text-white shadow-lg shrink-0">
                  {user.display_name?.[0]?.toUpperCase() || "A"}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-white">{user.display_name || "Admin"}</h3>
                    {user.role === "Super Admin" && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 text-[10px] font-black uppercase tracking-widest">
                        <Crown className="w-3 h-3" /> Super Admin
                      </span>
                    )}
                    {user.role === "Editor" && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
                        <PenLine className="w-3 h-3" /> Editor
                      </span>
                    )}
                  </div>
                  <p className="text-neutral-400 text-sm font-mono">{user.email}</p>
                  <p className="text-neutral-600 text-xs mt-1">Joined: {user.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {user.role !== "Super Admin" && (
                    <>
                      <button onClick={() => updateRole(user.id, user.role === "Editor" ? "Super Admin" : "Editor")}
                        className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition-all text-sm font-bold">
                        {user.role === "Editor" ? "Promote" : "Demote"}
                      </button>
                      <button onClick={() => removeUser(user.id)}
                        className="p-2 rounded-lg bg-red-900/30 text-red-500 border border-red-900/40 hover:bg-red-500/20 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  {user.role === "Super Admin" && (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                      <ShieldCheck className="w-4 h-4" /> Protected
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Roles Reference */}
      <div className="rounded-3xl border border-white/10 bg-[#0c0c12]/80 p-6 shadow-2xl">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-cyan-500" /> Role Permissions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-5 h-5 text-amber-400" />
              <span className="font-bold text-white">Super Admin</span>
            </div>
            <ul className="text-xs text-neutral-400 space-y-1 ml-7">
              <li>• Full database access (CRUD all firms)</li>
              <li>• Manage team members and roles</li>
              <li>• Access analytics and subscriber data</li>
              <li>• Modify global site settings</li>
              <li>• Cannot be removed by other admins</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5">
            <div className="flex items-center gap-2 mb-2">
              <PenLine className="w-5 h-5 text-blue-400" />
              <span className="font-bold text-white">Editor</span>
            </div>
            <ul className="text-xs text-neutral-400 space-y-1 ml-7">
              <li>• Create and edit firm listings</li>
              <li>• Moderate user reviews</li>
              <li>• Manage promos and offers</li>
              <li>• View analytics (read-only)</li>
              <li>• Cannot manage team or settings</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
