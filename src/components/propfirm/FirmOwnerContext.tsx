"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/utils/supabase";
import type { User } from "@supabase/supabase-js";

interface FirmOwnerContextType {
  user: User | null;
  firmSlug: string | null;
  firmData: any | null;
  loading: boolean;
  refreshFirm: () => Promise<void>;
}

const FirmOwnerContext = createContext<FirmOwnerContextType>({
  user: null,
  firmSlug: null,
  firmData: null,
  loading: true,
  refreshFirm: async () => {},
});

export const useFirmOwner = () => useContext(FirmOwnerContext);

export function FirmOwnerProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [firmSlug, setFirmSlug] = useState<string | null>(null);
  const [firmData, setFirmData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    setLoading(true);
    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (!authUser) {
      setUser(null);
      setLoading(false);
      return;
    }

    setUser(authUser);

    // Fetch the firm row that belongs to this owner
    const { data: firmRow } = await supabase
      .from("firms")
      .select("*")
      .eq("owner_id", authUser.id)
      .maybeSingle();

    if (firmRow) {
      setFirmSlug(firmRow.slug);
      setFirmData(firmRow);
    }
    setLoading(false);
  }

  async function refreshFirm() {
    if (!user) return;
    const { data: firmRow } = await supabase
      .from("firms")
      .select("*")
      .eq("owner_id", user.id)
      .maybeSingle();
    if (firmRow) {
      setFirmSlug(firmRow.slug);
      setFirmData(firmRow);
    }
  }

  return (
    <FirmOwnerContext.Provider value={{ user, firmSlug, firmData, loading, refreshFirm }}>
      {children}
    </FirmOwnerContext.Provider>
  );
}
