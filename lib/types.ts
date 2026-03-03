export interface UserSettings {
  id?: string;
  user_id?: string;
  display_name: string;
  default_industry: string;
  notification_email: boolean;
}

export interface XhsAccount {
  id?: string;
  user_id?: string;
  xhs_profile_url: string;
  xhs_nickname: string;
  xhs_user_id: string;
  account_type: "personal" | "brand";
  industry_tag: string;
  notes: string;
  created_at?: string;
  updated_at?: string;
}
