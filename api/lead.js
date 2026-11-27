// Vercel Serverless Function — captura de leads → Supabase (tabela `leads`)
//
// Env vars obrigatórias no projeto Vercel (Settings → Environment Variables):
//   SUPABASE_URL                = https://xxxx.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY   = chave service_role (Settings → API no Supabase)
// A chave service_role NUNCA vai pro client: só esta function usa.
// Sem as env vars, a function responde {ok:true, stored:false} e o checkout
// continua funcionando (o lead não é salvo, mas nada trava).

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    return res.status(200).end();
  }
  if (req.method !== "POST") return res.status(405).json({ ok: false });

  let lead = {};
  try {
    lead = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch (_) {}

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  let stored = false;

  if (url && key) {
    try {
      const r = await fetch(url.replace(/\/+$/, "") + "/rest/v1/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Prefer: "return=minimal",
          apikey: key,
          Authorization: "Bearer " + key,
        },
        body: JSON.stringify([
          {
            nome: String(lead.name || "").slice(0, 200),
            email: String(lead.email || "").slice(0, 200),
            whatsapp: String(lead.phone || "").slice(0, 40),
            lote: String(lead.lote || "1o_lote_9_90").slice(0, 40),
            utms: lead.utms && typeof lead.utms === "object" ? lead.utms : {},
            source: String(lead.source || "landing"),
          },
        ]),
      });
      stored = r.ok;
      if (!r.ok) console.error("[lead] supabase HTTP", r.status, await r.text());
    } catch (e) {
      console.error("[lead] supabase erro", e);
    }
  } else {
    console.warn("[lead] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY não configuradas");
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  return res.status(200).json({ ok: true, stored });
}
