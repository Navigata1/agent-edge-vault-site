/**
 * GET /activate?session_id=cs_... — post-checkout key issuance.
 *
 * Stripe Payment Link redirects here after payment. We verify the checkout
 * session server-side against the Stripe API, then ask the vault to mint a
 * key (idempotent per session — refreshing this page won't mint twice).
 */
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ?? "";
const VAULT_ADMIN_SECRET = process.env.VAULT_ADMIN_SECRET ?? "";
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY ?? "";

function page(title: string, inner: string, status = 200) {
  return new Response(
    `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${title} — AgentPact</title>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Archivo:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root{--ink:#0C151D;--deep:#101C26;--bone:#E9E2D0;--dim:rgba(233,226,208,.58);--faint:rgba(233,226,208,.32);--line:rgba(233,226,208,.13);--teal:#3FB8AF;--coral:#E2654A;--ok:#6FBF73}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--ink);color:var(--bone);font-family:'Archivo',sans-serif;min-height:100vh;display:grid;place-items:center;padding:24px}
.card{max-width:640px;width:100%;border:1px solid var(--line);border-radius:10px;background:var(--deep);padding:40px}
h1{font-family:'Fraunces',serif;font-weight:500;font-size:30px;margin:14px 0 10px}
h1 em{font-style:italic;color:var(--teal)}
p{color:var(--dim);font-size:15px;line-height:1.7;margin-bottom:14px}
.chip{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase;padding:4px 10px;border-radius:3px;border:1px solid var(--line);color:var(--faint);display:inline-block}
.keybox{font-family:'IBM Plex Mono',monospace;font-size:13px;background:var(--ink);border:1px solid rgba(63,184,175,.45);border-radius:6px;padding:16px;word-break:break-all;color:var(--teal);margin:18px 0}
.btn{font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.08em;background:var(--teal);color:var(--ink);font-weight:500;padding:11px 20px;border-radius:3px;border:none;cursor:pointer;text-decoration:none;display:inline-block;margin-right:10px}
.ghost{background:none;border:1px solid var(--line);color:var(--dim)}
code{font-family:'IBM Plex Mono',monospace;font-size:12px;color:var(--faint);display:block;background:var(--ink);border:1px solid var(--line);border-radius:4px;padding:12px;overflow-x:auto;white-space:pre;margin:14px 0}
.warn{color:var(--coral)}
a{color:var(--teal)}
</style></head><body><div class="card">${inner}</div></body></html>`,
    { status, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } }
  );
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("session_id");

  if (!sessionId || !/^cs_[a-zA-Z0-9_]+$/.test(sessionId)) {
    return page(
      "Activation",
      `<span class="chip">AGENTPACT · KEY ACTIVATION</span>
       <h1>Missing checkout session.</h1>
       <p>This page mints your API key right after Stripe checkout. If you landed here without paying, that's the paywall doing its job.</p>
       <a class="btn" href="/#feed">BACK TO THE FEED →</a>`,
      400
    );
  }

  // 1. Verify the session with Stripe, server-side.
  const sres = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${sessionId}`,
    { headers: { authorization: `Bearer ${STRIPE_SECRET_KEY}` }, cache: "no-store" }
  );
  if (!sres.ok) {
    return page(
      "Activation failed",
      `<span class="chip">AGENTPACT · KEY ACTIVATION</span>
       <h1 class="warn">Session not found.</h1>
       <p>Stripe doesn't recognize this checkout session. If you believe you paid, email <a href="mailto:hello@islanddevcrew.com">hello@islanddevcrew.com</a> with your receipt — a human will fix it.</p>`,
      404
    );
  }
  const session = await sres.json();
  if (session.payment_status !== "paid") {
    return page(
      "Payment incomplete",
      `<span class="chip">AGENTPACT · KEY ACTIVATION</span>
       <h1 class="warn">Payment not completed.</h1>
       <p>Status: <b>${session.payment_status}</b>. Finish checkout, then return here via the redirect.</p>
       <a class="btn" href="/#feed">BACK TO PRICING →</a>`,
      402
    );
  }

  // 2. Mint the key (idempotent per session).
  const email: string = session.customer_details?.email ?? "starter";
  const mint = await fetch(`${SUPABASE_URL}/rest/v1/rpc/vault_issue_key`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      p_admin_secret: VAULT_ADMIN_SECRET,
      p_label: `starter:${email}`,
      p_stripe_session: sessionId,
      p_quota: 1000,
      p_days_valid: 35,
    }),
    cache: "no-store",
  });
  const minted = await mint.json();

  if (minted?.error === "session_already_redeemed") {
    return page(
      "Already activated",
      `<span class="chip">AGENTPACT · KEY ACTIVATION</span>
       <h1>This session already minted its key.</h1>
       <p>Keys are shown exactly once and we store only a hash. If you lost yours, email <a href="mailto:hello@islanddevcrew.com">hello@islanddevcrew.com</a> from your purchase email and a human will rotate it.</p>
       <a class="btn" href="/#feed">BACK TO THE FEED →</a>`,
      409
    );
  }
  if (!minted?.api_key) {
    return page(
      "Activation error",
      `<span class="chip">AGENTPACT · KEY ACTIVATION</span>
       <h1 class="warn">The vault declined to mint.</h1>
       <p>Your payment is confirmed but key issuance failed. Email <a href="mailto:hello@islanddevcrew.com">hello@islanddevcrew.com</a> with this session id:</p>
       <code>${sessionId}</code>`,
      500
    );
  }

  return page(
    "Key issued",
    `<span class="chip" style="color:#6FBF73;border-color:rgba(111,191,115,.5)">PAYMENT VERIFIED · KEY MINTED</span>
     <h1>Your agent is <em>funded.</em></h1>
     <p><b>Copy this key now — it is shown once.</b> We store only a SHA-256 hash; nobody at IDC can read it back to you.</p>
     <div class="keybox" id="k">${minted.api_key}</div>
     <p>First call:</p>
     <code>curl -H "Authorization: Bearer ${minted.api_key.slice(0, 16)}…" \\
  "${url.origin}/v1/signals?domains=agent_ecosystem&min_confidence=0.9"</code>
     <p>Quota: 1,000 requests/month · key valid 35 days per billing cycle · <a href="https://github.com/Navigata1/agif-spec">AGIF spec</a></p>
     <button class="btn" onclick="navigator.clipboard.writeText(document.getElementById('k').textContent).then(()=>this.textContent='COPIED ✓')">COPY KEY</button>
     <a class="btn ghost" href="/#feed">TRY IT ON THE LIVE DEMO →</a>`
  );
}
