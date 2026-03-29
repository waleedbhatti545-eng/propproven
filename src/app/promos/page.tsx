import { supabase } from "@/utils/supabase";
import PromosClient from "./PromosClient";

export const revalidate = 60;

export default async function PromosPage() {
    const { data: firms } = await supabase.from("firms").select("*");
    
    // Soft filter to separate Futures without crashing before the DB column is fully migrated
    const liveFirms = (firms || []).filter(f => f.market_type !== 'futures');

    return <PromosClient initialFirms={liveFirms} />;
}
