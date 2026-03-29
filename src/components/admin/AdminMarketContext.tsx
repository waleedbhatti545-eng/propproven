"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type MarketType = "forex" | "futures";

interface AdminMarketContextProps {
  marketType: MarketType;
  setMarketType: (type: MarketType) => void;
}

const AdminMarketContext = createContext<AdminMarketContextProps | undefined>(undefined);

export function AdminMarketProvider({ children }: { children: React.ReactNode }) {
  const [marketType, setMarketTypeState] = useState<MarketType>("forex");

  useEffect(() => {
    // Read from localStorage on mount
    const stored = window.localStorage.getItem("propproven_admin_market");
    if (stored === "futures" || stored === "forex") {
      setMarketTypeState(stored);
    }
  }, []);

  const setMarketType = (type: MarketType) => {
    setMarketTypeState(type);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("propproven_admin_market", type);
    }
  };

  return (
    <AdminMarketContext.Provider value={{ marketType, setMarketType }}>
      {children}
    </AdminMarketContext.Provider>
  );
}

export function useAdminMarket() {
  const context = useContext(AdminMarketContext);
  if (!context) {
    throw new Error("useAdminMarket must be used within an AdminMarketProvider");
  }
  return context;
}
