import { supabase } from "@/utils/supabase";
import PromosClient from "@/app/promos/PromosClient";

export const revalidate = 60;

export default async function FuturesPromosPage() {
    // When the DB is migrated, we should add `.eq("market_type", "futures")`
    const { data: firms } = await supabase.from("firms").select("*");
    
    // Soft filter to strictly enforce Futures-only. Will be empty until DB is migrated.
    const liveFirms = (firms || []).filter(f => f.market_type === 'futures');

    return <PromosClient initialFirms={liveFirms} />;
}
