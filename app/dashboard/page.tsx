import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/navbar";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar email={user.email ?? ""} />
      <main className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Dashboard</h1>
        <p className="text-slate-500 mb-8">
          Welcome back, {user.email}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-sm font-medium text-slate-500 mb-1">
              Account Status
            </h2>
            <p className="text-lg font-semibold text-green-600">Active</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-sm font-medium text-slate-500 mb-1">
              Member Since
            </h2>
            <p className="text-lg font-semibold text-slate-800">
              {new Date(user.created_at).toLocaleDateString("zh-CN")}
            </p>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-800 mb-2">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/settings" className="text-blue-600 hover:underline">
                Account Settings & XHS Binding
              </a>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
