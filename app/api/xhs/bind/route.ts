import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { xhs_profile_url, xhs_nickname, xhs_user_id, account_type, industry_tag, notes } = body;

  if (!xhs_profile_url) {
    return NextResponse.json(
      { error: "xhs_profile_url is required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("xhs_accounts")
    .upsert(
      {
        user_id: user.id,
        xhs_profile_url,
        xhs_nickname: xhs_nickname ?? "",
        xhs_user_id: xhs_user_id ?? "",
        account_type: account_type ?? "personal",
        industry_tag: industry_tag ?? "",
        notes: notes ?? "",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    )
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ account: data });
}
