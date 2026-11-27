-- ============================================================
-- SUPABASE · tabela de leads da landing novelinha3d
-- Rode UMA vez no Supabase: SQL Editor → New query → colar → Run
-- ============================================================

create table if not exists public.leads (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  nome       text not null,
  email      text not null,
  whatsapp   text not null default '',
  lote       text not null default '1o_lote_9_90',
  utms       jsonb not null default '{}'::jsonb,
  source     text not null default 'landing'
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx      on public.leads (email);

-- Segurança: RLS ligada e NENHUMA policy pública.
-- Só a function da Vercel escreve (a chave service_role ignora RLS).
-- Você consulta os leads pelo painel do Supabase (Table Editor) ou
-- exportando CSV — o dashboard também usa a service role.
alter table public.leads enable row level security;
