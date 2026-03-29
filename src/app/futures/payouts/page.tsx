import { supabase } from "@/utils/supabase";
import PayoutsClient from "@/app/payouts/PayoutsClient";

export const revalidate = 60;

export default async function FuturesPayoutsPage() {
    // When the DB is migrated, we should explicitly select market_type here or add `.eq("market_type", "futures")`
    const { data: firms } = await supabase.from("firms").select("slug, name, logo, market_type");
    
    // Soft filter to strictly enforce Futures-only. Will be empty until DB is migrated.
    const liveFirms = (firms || []).filter(f => (f as any).market_type === 'futures');

    return <PayoutsClient initialFirms={liveFirms} />;
}
