import { supabase } from "@/utils/supabase";
import PromosClient from "./PromosClient";

export const revalidate = 60;

export default async function PromosPage() {
    const { data: firms } = await supabase.from("firms").select("*");
    const liveFirms = firms || [];

    return <PromosClient initialFirms={liveFirms} />;
}
