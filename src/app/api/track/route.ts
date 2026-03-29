import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { page_path, firm_slug, referrer } = body;

    await supabase.from("page_views").insert({
      page_path: page_path || "/",
      firm_slug: firm_slug || null,
      referrer: referrer || null,
      user_agent: req.headers.get("user-agent") || null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
