import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firm_slug, discount_code, page_path } = body;

    await supabase.from("promo_clicks").insert({
      firm_slug: firm_slug || "unknown",
      discount_code: discount_code || null,
      page_path: page_path || "/",
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
