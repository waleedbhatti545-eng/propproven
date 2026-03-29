"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function MarketThemeSetter() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith("/futures")) {
      document.documentElement.classList.add("theme-futures");
      document.body.classList.add("theme-futures");
    } else {
      document.documentElement.classList.remove("theme-futures");
      document.body.classList.remove("theme-futures");
    }
  }, [pathname]);

  return null;
}
