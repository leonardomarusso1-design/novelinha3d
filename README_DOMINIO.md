# 🌐 PUBLICAR EM leonardomarusso.com.br/novelinha3d

Projeto Vercel pronto nesta pasta. Estrutura:
```
vercel_novelinha3d/
├── index.html            # raiz: redireciona automaticamente pra /novelinha3d
├── vercel.json           # cache de 1 ano nos assets de vídeo/imagem
├── api/lead.js           # function de captura de leads (POST /api/lead)
└── novelinha3d/
    ├── index.html        # a landing (caminhos relativos → funciona no subpath)
    └── assets/           # 3 vídeos + 3 pôsteres
```

## 1) Subir o projeto na Vercel
1. vercel.com → **Add New… → Project**.
2. Importe um repo do GitHub com ESTA pasta na raiz **ou** use `npx vercel` dentro dela.
3. Framework Preset: **Other**. Sem build command. Deploy.
4. Confira no URL temporário `*.vercel.app/novelinha3d` que vídeos tocam e o formulário redireciona à Kiwify.

## 2) Conectar o domínio
1. No projeto Vercel: **Settings → Domains** → digite `leonardomarusso.com.br` → Add.
2. A Vercel mostra os DNS necessários. No seu registrador (Registro.br, Hostinger, GoDaddy, Cloudflare…):
   - Registro **A**: `@` → `76.76.21.21`
   - Registro **CNAME**: `www` → `cname.vercel-dns.com`
   - Se já existirem registros A/CNAME antigos do site atual, **substitua-os** (ver aviso abaixo).
3. Propagação: de minutos a 24h. O HTTPS (certificado) é emitido sozinho pela Vercel.
4. Teste: `https://leonardomarusso.com.br` (cai no redirect) e `https://leonardomarusso.com.br/novelinha3d` (landing).

## ⚠️ Se o domínio JÁ hospeda um site que você quer manter
Apontar o domínio pra Vercel substitui TUDO que responde por ele hoje. Escolha:
- **A) Mover o site atual pra Vercel também** (mesmo projeto ou outro com *path* próprio) — ideal se for site simples/blog estático.
- **B) Usar subdomínio** `novelinha3d.leonardomarusso.com.br` (CNAME → `cname.vercel-dns.com`), mantendo o site atual intacto. Nesse caso me avise que eu ajusto OG tags/paths e o redirect da raiz.
- **C) Proxy reverso no host atual** (só se for VPS/hosting com Apache/Nginx):
  Apache: `ProxyPass "/novelinha3d" "https://SEU-PROJETO.vercel.app/novelinha3d"` + `ProxyPassReverse` (mod_proxy habilitado).
  Nginx: `location /novelinha3d/ { proxy_pass https://SEU-PROJETO.vercel.app/novelinha3d/; proxy_set_header Host SEU-PROJETO.vercel.app; }`
  (Cloudflare na frente? Use Workers/Transform Rules ou vá de opção B — proxy de vídeo por subpath com Cloudflare grátis pode estourar banda.)

## 3) Depois de publicar (checklist rápido)
- [ ] Colar seu `META_PIXEL_ID` no bloco CONFIG do `novelinha3d/index.html` **antes** do deploy final (e o mesmo pixel na Kiwify).
- [ ] Opcional: `LEADS_WEBHOOK_URL` (constante no index.html e/ou env var na Vercel).
- [ ] Atualizar a URL de destino dos anúncios Meta para `https://leonardomarusso.com.br/novelinha3d?utm_source=meta&utm_campaign=criativos_v1&utm_content=...`
- [ ] Testar compra de teste na Kiwify a partir da página nova (pré-preenchimento de nome/e-mail/WhatsApp).
- [ ] Conferir no Meta Events Manager que PageView/InitiateCheckout disparam no domínio novo.
- [ ] Rodar o teste de velocidade (pagepeed.web.dev) — vídeos já têm cache immutable configurado.

## Por que /novelinha3d funciona sem mexer no código?
A landing usa caminhos **relativos** (`assets/...`), então ela se adapta a qualquer subpasta; a única chamada absoluta é `/api/lead`, que existe na raiz do projeto Vercel (function). O `index.html` da raiz só faz o visitante que digitar o domínio puro cair direto na oferta.
