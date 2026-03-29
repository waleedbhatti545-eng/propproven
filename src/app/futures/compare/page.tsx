import { supabase } from "@/utils/supabase";
import CompareClient from "@/app/compare/CompareClient";

export const revalidate = 60;

export default async function FuturesComparePage() {
    // When the DB is migrated, we should add `.eq("market_type", "futures")`
    const { data: firms } = await supabase.from("firms").select("*");
    
    // Soft filter to strictly enforce Futures-only. Will be empty until DB is migrated.
    const liveFirms = (firms || []).filter(f => f.market_type === 'futures');

    if (liveFirms.length === 0) {
        return <div className="min-h-screen flex items-center justify-center text-white">No futures firms available to compare yet.</div>;
    }

    return <CompareClient initialFirms={liveFirms} />;
}
