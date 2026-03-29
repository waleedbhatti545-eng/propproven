import { supabase } from "@/utils/supabase";
import FirmsClient from "@/app/firms/FirmsClient";

export const revalidate = 60;

export default async function FuturesFirmsPage() {
    const { data: firms } = await supabase.from("firms").select("*, accounts(*), offers(*)");
    
    // Soft filter to strictly enforce Futures-only. Will be empty until DB is migrated.
    const liveFirms = (firms || []).filter(f => f.market_type === 'futures');

    return <FirmsClient initialFirms={liveFirms} basePath="/futures/firms" />;
}
