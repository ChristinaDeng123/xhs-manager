"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { XhsAccount } from "@/lib/types";

const INDUSTRY_OPTIONS = [
  { value: "", label: "Select industry..." },
  { value: "留学", label: "留学" },
  { value: "医美", label: "医美" },
  { value: "地产", label: "地产" },
  { value: "会计", label: "会计" },
  { value: "餐饮", label: "餐饮" },
  { value: "旅游", label: "旅游" },
  { value: "科技", label: "科技" },
  { value: "教育", label: "教育" },
  { value: "其他", label: "其他" },
];

interface Props {
  onBound: (account: XhsAccount) => void;
  onClose: () => void;
  existing?: XhsAccount | null;
}

export default function XhsBindDialog({ onBound, onClose, existing }: Props) {
  const [profileUrl, setProfileUrl] = useState(existing?.xhs_profile_url ?? "");
  const [nickname, setNickname] = useState(existing?.xhs_nickname ?? "");
  const [userId, setUserId] = useState(existing?.xhs_user_id ?? "");
  const [accountType, setAccountType] = useState<"personal" | "brand">(
    existing?.account_type ?? "personal"
  );
  const [industryTag, setIndustryTag] = useState(existing?.industry_tag ?? "");
  const [notes, setNotes] = useState(existing?.notes ?? "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/xhs/bind", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          xhs_profile_url: profileUrl,
          xhs_nickname: nickname,
          xhs_user_id: userId,
          account_type: accountType,
          industry_tag: industryTag,
          notes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to bind");
        return;
      }

      toast.success("XHS account bound successfully");
      onBound(data.account);
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg border border-slate-200 shadow-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">Bind XHS Account</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl leading-none"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Profile URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              required
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              placeholder="https://www.xiaohongshu.com/user/profile/..."
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nickname
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Optional"
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              User ID
            </label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Optional"
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Account Type
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="accountType"
                  value="personal"
                  checked={accountType === "personal"}
                  onChange={() => setAccountType("personal")}
                  className="text-blue-600"
                />
                Personal
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="accountType"
                  value="brand"
                  checked={accountType === "brand"}
                  onChange={() => setAccountType("brand")}
                  className="text-blue-600"
                />
                Brand
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Industry
            </label>
            <select
              value={industryTag}
              onChange={(e) => setIndustryTag(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {INDUSTRY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Optional notes..."
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium rounded-md transition-colors"
            >
              {loading ? "Saving..." : "Save Binding"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
