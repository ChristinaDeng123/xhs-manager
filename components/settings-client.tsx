"use client";

import { useState } from "react";
import { toast } from "sonner";
import XhsBindDialog from "@/components/xhs-bind-dialog";
import XhsAccountCard from "@/components/xhs-account-card";
import type { UserSettings, XhsAccount } from "@/lib/types";

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

export default function SettingsClient({
  initialSettings,
  initialXhs,
}: {
  initialSettings: UserSettings;
  initialXhs: XhsAccount | null;
}) {
  const [displayName, setDisplayName] = useState(initialSettings.display_name ?? "");
  const [defaultIndustry, setDefaultIndustry] = useState(initialSettings.default_industry ?? "");
  const [notificationEmail, setNotificationEmail] = useState(initialSettings.notification_email ?? true);
  const [settingsSaving, setSettingsSaving] = useState(false);

  const [xhsAccount, setXhsAccount] = useState<XhsAccount | null>(initialXhs);
  const [showBindDialog, setShowBindDialog] = useState(false);

  const handleSaveSettings = async () => {
    setSettingsSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          display_name: displayName,
          default_industry: defaultIndustry,
          notification_email: notificationEmail,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to save settings");
        return;
      }
      toast.success("Settings saved");
    } catch {
      toast.error("Network error");
    } finally {
      setSettingsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* General Settings */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="font-semibold text-slate-800 mb-4">General Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your display name"
              className="w-full max-w-sm px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Default Industry
            </label>
            <select
              value={defaultIndustry}
              onChange={(e) => setDefaultIndustry(e.target.value)}
              className="w-full max-w-sm px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {INDUSTRY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="notif"
              checked={notificationEmail}
              onChange={(e) => setNotificationEmail(e.target.checked)}
              className="rounded border-slate-300"
            />
            <label htmlFor="notif" className="text-sm text-slate-700">
              Enable email notifications
            </label>
          </div>

          <button
            onClick={handleSaveSettings}
            disabled={settingsSaving}
            className="mt-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium rounded-md transition-colors"
          >
            {settingsSaving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>

      {/* XHS Account Section */}
      <div>
        <h2 className="font-semibold text-slate-800 mb-4">
          Xiaohongshu Account
        </h2>

        {xhsAccount ? (
          <XhsAccountCard
            account={xhsAccount}
            onUnbound={() => setXhsAccount(null)}
            onEdit={() => setShowBindDialog(true)}
          />
        ) : (
          <div className="bg-white rounded-lg border border-slate-200 border-dashed p-8 text-center">
            <p className="text-slate-500 text-sm mb-4">
              No XHS account bound yet. Bind your account to manage content
              strategy.
            </p>
            <button
              onClick={() => setShowBindDialog(true)}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
            >
              Bind XHS Account
            </button>
          </div>
        )}
      </div>

      {showBindDialog && (
        <XhsBindDialog
          existing={xhsAccount}
          onBound={(account) => {
            setXhsAccount(account);
            setShowBindDialog(false);
          }}
          onClose={() => setShowBindDialog(false)}
        />
      )}
    </div>
  );
}
