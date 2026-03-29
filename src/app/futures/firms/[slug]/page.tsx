import { supabase } from "@/utils/supabase";
import FirmPageClient from "@/app/firms/[slug]/FirmPageClient";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
    const { data: firms } = await supabase.from("firms").select("slug").eq("market_type", "futures");
    return (firms || []).map((firm) => ({
        slug: firm.slug,
    }));
}

export default async function FuturesFirmPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { data: firm } = await supabase
        .from("firms")
        .select("*, accounts(*), user_reviews(*), offers(*)")
        .eq("slug", slug)
        .single();

    if (!firm) {
        notFound();
    }

    return <FirmPageClient firm={firm} />;
}
