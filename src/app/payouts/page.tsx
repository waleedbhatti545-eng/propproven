import { supabase } from "@/utils/supabase";
import PayoutsClient from "./PayoutsClient";

export const revalidate = 60;

export default async function PayoutsPage() {
    const { data: firms } = await supabase.from("firms").select("slug, name, logo");
    
    // Soft filter to separate Futures without crashing before the DB column is fully migrated
    const liveFirms = (firms || []).filter(f => (f as any).market_type !== 'futures');

    return <PayoutsClient initialFirms={liveFirms} />;
}
