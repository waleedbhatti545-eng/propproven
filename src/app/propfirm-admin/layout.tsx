import "@/app/globals.css";

export const metadata = {
  title: "PropProven Partner Portal",
  description: "Secure management portal for verified prop firm partners.",
};

export default function PropFirmAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {children}
    </div>
  );
}
