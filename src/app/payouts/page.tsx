import { supabase } from "@/utils/supabase";
import PayoutsClient from "./PayoutsClient";

export const revalidate = 60;

export default async function PayoutsPage() {
    const { data: firms } = await supabase.from("firms").select("slug, name, logo");
    const liveFirms = firms || [];

    return <PayoutsClient initialFirms={liveFirms} />;
}
