import { supabase } from "@/utils/supabase";
import CompareClient from "./CompareClient";

export const revalidate = 60;

export default async function ComparePage() {
    const { data: firms } = await supabase.from("firms").select("*");
    
    // Soft filter to separate Futures without crashing before the DB column is fully migrated
    const liveFirms = (firms || []).filter(f => f.market_type !== 'futures');

    if (liveFirms.length === 0) {
        return <div className="min-h-screen flex items-center justify-center text-white">No firms available to compare.</div>;
    }

    return <CompareClient initialFirms={liveFirms} />;
}
