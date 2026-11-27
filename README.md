# Landing Novelinha 3D — projeto pronto p/ GitHub + Vercel + Supabase

Landing de vendas do minicurso **Storytelling Virais com IA** (1º lote R$ 9,90 → Kiwify `3j591LL`),
com captura de leads Nome+Email+WhatsApp salva no **Supabase** e **Pixel Meta 4737053306551826** já plugado
(eventos: PageView, ViewContent, Lead, InitiateCheckout; Purchase fecha dentro da Kiwify com o mesmo pixel).

URL final: **https://novelinha3d.leonardomarusso.com.br/** (landing na raiz; `/novelinha3d` redireciona 301 pra raiz automaticamente via `vercel.json`).

```
.
├── index.html            # landing completa (vídeos, oferta, FAQ, formulário)
├── vercel.json           # redirects (/novelinha3d → /), cache immutable nos assets, headers
├── api/lead.js           # function: recebe o lead e grava no Supabase (env vars)
├── supabase/schema.sql   # tabela leads + RLS (rodar 1x no SQL Editor)
└── assets/               # 3 vídeos 9:16 + 3 pôsteres
```

## 1) GitHub
1. github.com → **New repository** (ex.: `novelinha3d-landing`), público ou privado.
2. Suba **o conteúdo desta pasta na RAIZ do repo** (não crie subpasta):
   - pelo site: *uploading an existing file* → arraste tudo; ou
   - por terminal: `git init && git add -A && git commit -m "landing v4" && git branch -M main && git remote add origin https://github.com/SEU_USER/novelinha3d-landing.git && git push -u origin main`
   - vídeos são ~15 MB no total → dentro do limite do GitHub, ok.

## 2) Vercel
1. vercel.com → **Add New… → Project** → importe o repo criado.
2. Framework Preset: **Other** · Build Command: *(vazio)* · Output: *(vazio)* · Root Directory: `/`.
3. **Settings → Environment Variables** (Production + Preview):
   - `SUPABASE_URL` = `https://SEUPROJETO.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY` = chave **service_role** (Supabase → Settings → API)
4. Deploy. Todo push futuro na `main` re-publica sozinho (adeus drag & drop).
5. **Settings → Domains:** `novelinha3d.leonardomarusso.com.br` já está apontado (CNAME no Cloudflare) — só confirme o ✔ verde.

## 3) Supabase
1. supabase.com → **New project** (região South America – São Paulo, se disponível).
2. **SQL Editor → New query** → cole o conteúdo de `supabase/schema.sql` → **Run**.
3. **Settings → API** → copie a *Project URL* e a *service_role key* → cole nas env vars da Vercel (passo 2.3) → **redeploy** (a Vercel pede isso ao criar env var, ou Deployments → Redeploy).
4. Leads chegam em **Table Editor → leads** (exporte CSV quando quiser).

## 4) Teste de ponta a ponta (checklist)
- [ ] `https://novelinha3d.leonardomarusso.com.br/` abre a landing (e `.../novelinha3d` redireciona pra raiz)
- [ ] Os 3 vídeos tocam (PC e celular 4G) — se um player falhar, aparece link de fallback + log `[video] FALHOU:` no F12 → Console
- [ ] Preencher o formulário → botão some p/ "RESERVANDO..." → cai no checkout Kiwify com nome/e-mail/WhatsApp pré-preenchidos
- [ ] Linha nova aparece em Supabase → leads (com UTMs em JSON)
- [ ] Meta Events Manager: PageView + Lead + InitiateCheckout disparando no domínio
- [ ] Compra de teste na Kiwify → evento Purchase + e-mail de acesso
- [ ] Kiwify: mesmo pixel 4737053306551826 configurado no produto (evento Purchase) + order bumps `znNrouc` / `39fP3Bn` ativos

## 5) Anúncios Meta
URL de destino (com UTM por criativo):
`https://novelinha3d.leonardomarusso.com.br/?utm_source=meta&utm_medium=paid&utm_campaign=criativos_v1&utm_content=NOME_DO_CRIATIVO`
Playbook completo: `meta_ads_criativos/guia_campanha_meta_ads.md` (1 conjunto ABO, 5 anúncios, poda dia 3, vencedor dia 5–7, escala +20%).

## Observações
- A chave service_role é segredo: fica SÓ nas env vars da Vercel. O client nunca vê (a function chama o Supabase por ela).
- Sem as env vars configuradas, o site continua vendendo normalmente (formulário → Kiwify); só não salva o lead no Supabase.
- Vídeos com cache immutable de 1 ano: se um dia trocar um vídeo, troque também o nome do arquivo.
"# novelinha3d" 
