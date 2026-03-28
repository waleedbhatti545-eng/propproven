import { supabase } from "@/utils/supabase";
import FirmsClient from "./FirmsClient";

export const revalidate = 60;

export default async function FirmsPage() {
    const { data: firms } = await supabase.from("firms").select("*, accounts(*), offers(*)");
    const liveFirms = firms || [];

    return <FirmsClient initialFirms={liveFirms} />;
}
