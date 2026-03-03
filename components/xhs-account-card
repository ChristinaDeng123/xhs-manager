"use client";

import { toast } from "sonner";
import type { XhsAccount } from "@/lib/types";

interface Props {
  account: XhsAccount;
  onUnbound: () => void;
  onEdit: () => void;
}

export default function XhsAccountCard({ account, onUnbound, onEdit }: Props) {
  const handleUnbind = async () => {
    if (!confirm("Are you sure you want to unbind this XHS account?")) return;

    try {
      const res = await fetch("/api/xhs/unbind", { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to unbind");
        return;
      }

      toast.success("XHS account unbound");
      onUnbound();
    } catch {
      toast.error("Network error");
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-800">XHS Account (Bound)</h3>
        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
          Active
        </span>
      </div>

      <dl className="space-y-3 text-sm">
        <div className="flex gap-2">
          <dt className="text-slate-500 w-24 shrink-0">Profile URL</dt>
          <dd className="text-slate-800 break-all">
            <a
              href={account.xhs_profile_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {account.xhs_profile_url}
            </a>
          </dd>
        </div>

        {account.xhs_nickname && (
          <div className="flex gap-2">
            <dt className="text-slate-500 w-24 shrink-0">Nickname</dt>
            <dd className="text-slate-800">{account.xhs_nickname}</dd>
          </div>
        )}

        {account.xhs_user_id && (
          <div className="flex gap-2">
            <dt className="text-slate-500 w-24 shrink-0">User ID</dt>
            <dd className="text-slate-800">{account.xhs_user_id}</dd>
          </div>
        )}

        <div className="flex gap-2">
          <dt className="text-slate-500 w-24 shrink-0">Type</dt>
          <dd className="text-slate-800 capitalize">{account.account_type}</dd>
        </div>

        {account.industry_tag && (
          <div className="flex gap-2">
            <dt className="text-slate-500 w-24 shrink-0">Industry</dt>
            <dd>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                {account.industry_tag}
              </span>
            </dd>
          </div>
        )}

        {account.notes && (
          <div className="flex gap-2">
            <dt className="text-slate-500 w-24 shrink-0">Notes</dt>
            <dd className="text-slate-600">{account.notes}</dd>
          </div>
        )}
      </dl>

      <div className="flex gap-3 mt-5 pt-4 border-t border-slate-100">
        <button
          onClick={onEdit}
          className="text-sm px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors"
        >
          Edit
        </button>
        <button
          onClick={handleUnbind}
          className="text-sm px-4 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-md transition-colors"
        >
          Unbind
        </button>
      </div>
    </div>
  );
}
