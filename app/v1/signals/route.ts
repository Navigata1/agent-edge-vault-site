/**
 * GET /v1/signals — the AgentPact feed layer.
 *
 * No credential  → HTTP 402 with machine-readable payment instructions.
 * Bearer key     → AGIF v0.1 signal array, filtered by intent-profile params,
 *                  metered against the usage ledger in Supabase.
 *
 * All key validation, quota math, and ledger writes happen inside a
 * SECURITY DEFINER Postgres function; the anon key alone can read nothing.
 */
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ?? "";
const CHECKOUT_URL =
  process.env.STRIPE_PAYMENT_LINK ??
  "https://buy.stripe.com/test_aFa6oJ2Kd81oafQdvI0VO05";

// Basic per-instance rate limit (defense in depth; quotas are the real meter).
const hits = new Map<string, { n: number; reset: number }>();
function rateLimited(ip: string, max = 60, windowMs = 60_000): boolean {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now > h.reset) {
    hits.set(ip, { n: 1, reset: now + windowMs });
    return false;
  }
  h.n++;
  return h.n > max;
}

function extractKey(req: Request, url: URL): string | null {
  const auth = req.headers.get("authorization");
  if (auth?.toLowerCase().startsWith("bearer ")) return auth.slice(7).trim();
  return req.headers.get("x-api-key") ?? url.searchParams.get("api_key");
}

function csv(url: URL, name: string): string[] | null {
  const v = url.searchParams.get(name);
  if (!v) return null;
  const arr = v
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 20);
  return arr.length ? arr : null;
}

const json = (body: unknown, status: number, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "access-control-allow-origin": "*",
      ...extra,
    },
  });

export async function GET(req: Request) {
  const url = new URL(req.url);
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return json({ error: "rate_limited", retry_after_s: 60 }, 429, {
      "retry-after": "60",
    });
  }

  const key = extractKey(req, url);

  if (!key) {
    // The product working as designed: an honest, machine-readable 402.
    return json(
      {
        error: "payment_required",
        message:
          "GET /v1/signals serves AGIF-typed, provenance-hashed intelligence to paying agents.",
        resource: `${url.origin}/v1/signals`,
        pricing: {
          plan: "starter_key",
          price: "$19/month — 1,000 requests",
          checkout: CHECKOUT_URL,
          note: "Checkout currently runs in Stripe test mode (pre-GA). Key is issued instantly at the redirect after payment.",
        },
        authenticate: {
          header: "Authorization: Bearer apk_live_...",
          alternates: ["X-API-Key header", "?api_key= query param"],
        },
        query_contract: {
          domains: "csv — e.g. agent_ecosystem,idc_ecosystem,competitive",
          types: "csv of the 14 AGIF classes — e.g. protocol_update,news_event",
          entities: "csv watchlist — e.g. x402,MCP",
          min_confidence: "0..1 float",
          limit: "1..100",
        },
        spec: "https://github.com/Navigata1/agif-spec",
        x402: {
          status: "planned",
          note: "This endpoint already speaks HTTP 402 with structured payment instructions; on-chain x402 (USDC on Base) settlement is the planned v2 rail and will be announced when live — not before.",
        },
        design_partners:
          "mailto:hello@islanddevcrew.com?subject=AgentPact%20Design%20Partner",
      },
      402,
      { "www-authenticate": 'Bearer realm="agentpact-vault"' }
    );
  }

  const minConf = url.searchParams.get("min_confidence");
  const limit = url.searchParams.get("limit");

  const rpc = await fetch(`${SUPABASE_URL}/rest/v1/rpc/vault_get_signals`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      p_key: key,
      p_domains: csv(url, "domains"),
      p_types: csv(url, "types"),
      p_entities: csv(url, "entities"),
      p_min_confidence: minConf ? Number(minConf) : 0,
      p_limit: limit ? Number(limit) : 50,
    }),
    cache: "no-store",
  });

  if (!rpc.ok) {
    return json({ error: "vault_unavailable", status: rpc.status }, 503);
  }

  const data = await rpc.json();

  if (data?.error === "invalid_key")
    return json(
      { error: "invalid_key", message: "Key not recognized. Keys look like apk_live_… and come from checkout or a design-partner grant." },
      401
    );
  if (data?.error === "key_expired")
    return json({ error: "key_expired", renew: CHECKOUT_URL }, 403);
  if (data?.error === "quota_exceeded")
    return json(
      { error: "quota_exceeded", quota: data.quota, resets: "1st of month UTC", upgrade: "mailto:hello@islanddevcrew.com?subject=AgentPact%20quota" },
      429
    );

  return json(data, 200, { "x-agentpact-layer": "feed" });
}
