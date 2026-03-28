import { supabase } from "@/utils/supabase";
import CompareClient from "./CompareClient";

export const revalidate = 60;

export default async function ComparePage() {
    const { data: firms } = await supabase.from("firms").select("*");
    const liveFirms = firms || [];

    if (liveFirms.length === 0) {
        return <div className="min-h-screen flex items-center justify-center text-white">No firms available to compare.</div>;
    }

    return <CompareClient initialFirms={liveFirms} />;
}
