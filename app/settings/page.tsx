import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/navbar";
import SettingsClient from "@/components/settings-client";

export default async function SettingsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch settings
  const { data: settings } = await supabase
    .from("user_settings")
    .select("*")
    .eq("user_id", user.id)
    .single();

  // Fetch XHS account
  const { data: xhsAccount } = await supabase
    .from("xhs_accounts")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar email={user.email ?? ""} />
      <main className="max-w-2xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Settings</h1>
        <SettingsClient
          initialSettings={
            settings ?? {
              display_name: "",
              default_industry: "",
              notification_email: true,
            }
          }
          initialXhs={xhsAccount ?? null}
        />
      </main>
    </div>
  );
}
