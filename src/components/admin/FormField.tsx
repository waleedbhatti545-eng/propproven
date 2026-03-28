import React from "react";
import { cn } from "@/lib/utils";

const COUNTRIES = [
  { code: 'us', name: 'United States', flag: '🇺🇸' },
  { code: 'ae', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'gb', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'ca', name: 'Canada', flag: '🇨🇦' },
  { code: 'au', name: 'Australia', flag: '🇦🇺' },
  { code: 'cy', name: 'Cyprus', flag: '🇨🇾' },
  { code: 'cz', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'pk', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'in', name: 'India', flag: '🇮🇳' },
  { code: 'sg', name: 'Singapore', flag: '🇸🇬' },
  { code: 'hk', name: 'Hong Kong', flag: '🇭🇰' },
  { code: 'de', name: 'Germany', flag: '🇩🇪' },
  { code: 'fr', name: 'France', flag: '🇫🇷' },
  { code: 'it', name: 'Italy', flag: '🇮🇹' },
  { code: 'es', name: 'Spain', flag: '🇪🇸' },
  { code: 'ch', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'mt', name: 'Malta', flag: '🇲🇹' },
  { code: 'vg', name: 'British Virgin Islands', flag: '🇻🇬' },
  { code: 'sc', name: 'Seychelles', flag: '🇸🇨' },
  { code: 'mu', name: 'Mauritius', flag: '🇲🇺' },
  { code: 'vc', name: 'Saint Vincent', flag: '🇻🇨' },
  { code: 'bs', name: 'Bahamas', flag: '🇧🇸' },
  { code: 'za', name: 'South Africa', flag: '🇿🇦' },
  { code: 'nz', name: 'New Zealand', flag: '🇳🇿' },
];

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function mapToMonthValue(str: string) {
  if (!str) return "";
  const parts = str.split(" ");
  if (parts.length === 2) {
    const monthIndex = MONTH_NAMES.indexOf(parts[0]);
    if (monthIndex >= 0) {
      return `${parts[1]}-${(monthIndex + 1).toString().padStart(2, '0')}`;
    }
  }
  return str;
}

function mapFromMonthValue(str: string) {
  if (!str) return "";
  const parts = str.split("-");
  if (parts.length === 2) {
    const monthIndex = parseInt(parts[1], 10) - 1;
    if (monthIndex >= 0 && monthIndex < 12) {
      return `${MONTH_NAMES[monthIndex]} ${parts[0]}`;
    }
  }
  return str;
}

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  type?: "text" | "number" | "url" | "date" | "datetime-local" | "textarea" | "color" | "country" | "month";
  value: string | number;
  onChange: (e: any) => void;
  rows?: number;
}

export function FormField({ label, type = "text", value, onChange, rows = 4, className, ...props }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium text-neutral-300 ml-1">{label}</label>
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={onChange}
          rows={rows}
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red/50 focus:bg-white/5 backdrop-blur-xl transition-all shadow-inner"
          {...(props as any)}
        />
      ) : type === "color" ? (
         <div className="flex items-center gap-4">
            <input
                type="color"
                value={value as string}
                onChange={onChange}
                className="h-12 w-24 bg-black/40 border border-white/10 rounded-xl cursor-pointer"
                {...props}
            />
            <span className="text-white bg-black/40 px-4 py-2 rounded-xl border border-white/10 font-mono tracking-wider">{value}</span>
         </div>
      ) : type === "country" ? (
         <div className="relative">
           <select
             value={(value as string)?.toLowerCase() || ""}
             onChange={onChange}
             className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red/50 focus:bg-white/5 backdrop-blur-xl transition-all shadow-inner focus:border-brand-red/50"
             {...(props as any)}
           >
             <option value="" disabled className="bg-neutral-900 text-neutral-400">Select Country</option>
             {COUNTRIES.map((c) => (
               <option key={c.code} value={c.code} className="bg-neutral-900 text-white">
                 {c.flag} {c.name} ({c.code.toUpperCase()})
               </option>
             ))}
           </select>
           <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
           </div>
         </div>
      ) : type === "month" ? (
         <input
           type="month"
           value={value ? mapToMonthValue(value as string) : ""}
           onChange={(e) => {
             const formatted = mapFromMonthValue(e.target.value);
             onChange({ target: { value: formatted } });
           }}
           className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red/50 focus:bg-white/5 backdrop-blur-xl transition-all shadow-inner"
           {...(props as any)}
         />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red/50 focus:bg-white/5 backdrop-blur-xl transition-all shadow-inner"
          {...props}
        />
      )}
    </div>
  );
}
