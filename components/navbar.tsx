"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function Navbar({ email }: { email: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to sign out");
      return;
    }
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <span className="font-bold text-lg text-slate-800">XHS Manager</span>
        <Link
          href="/dashboard"
          className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
        >
          Dashboard
        </Link>
        <Link
          href="/settings"
          className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
        >
          Settings
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-500">{email}</span>
        <button
          onClick={handleLogout}
          className="text-sm px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}
