import { supabase } from "@/utils/supabase";
import FirmsClient from "./FirmsClient";

export const revalidate = 60;

export default async function FirmsPage() {
    const { data: firms } = await supabase.from("firms").select("*, accounts(*), offers(*)");
    
    // Soft filter to separate Futures without crashing before the DB column is fully migrated
    const liveFirms = (firms || []).filter(f => f.market_type !== 'futures');

    return <FirmsClient initialFirms={liveFirms} />;
}
