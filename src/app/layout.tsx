import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { InteractiveSideGlow } from "@/components/ui/InteractiveSideGlow";
import { MarketThemeSetter } from "@/components/layout/MarketThemeSetter";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PropProven - Trader Trusted Prop Firm Comparisons",
  description: "Simplify prop firm selection through verified data and transparent comparisons.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${poppins.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <MarketThemeSetter />
        <Header />
        <main className="flex-1 flex flex-col w-full">
          {children}
        </main>
        <InteractiveSideGlow />
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
