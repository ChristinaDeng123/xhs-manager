-- =============================================================
-- XHS Manager SaaS - Supabase Migration
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- =============================================================

-- 1. user_settings table
create table if not exists public.user_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  display_name text default '',
  default_industry text default '',
  notification_email boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. xhs_accounts table
create table if not exists public.xhs_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  xhs_profile_url text not null,
  xhs_nickname text default '',
  xhs_user_id text default '',
  account_type text check (account_type in ('personal', 'brand')) default 'personal',
  industry_tag text default '',
  notes text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. Enable RLS
alter table public.user_settings enable row level security;
alter table public.xhs_accounts enable row level security;

-- 4. RLS policies for user_settings
create policy "Users can view own settings"
  on public.user_settings for select
  using (auth.uid() = user_id);

create policy "Users can insert own settings"
  on public.user_settings for insert
  with check (auth.uid() = user_id);

create policy "Users can update own settings"
  on public.user_settings for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own settings"
  on public.user_settings for delete
  using (auth.uid() = user_id);

-- 5. RLS policies for xhs_accounts
create policy "Users can view own xhs accounts"
  on public.xhs_accounts for select
  using (auth.uid() = user_id);

create policy "Users can insert own xhs accounts"
  on public.xhs_accounts for insert
  with check (auth.uid() = user_id);

create policy "Users can update own xhs accounts"
  on public.xhs_accounts for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own xhs accounts"
  on public.xhs_accounts for delete
  using (auth.uid() = user_id);
