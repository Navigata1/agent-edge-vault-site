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
  "https://buy.stripe.com/aFa6oJ2Kd81oafQdvI0VO05";

// --- x402 on-chain rail (Coinbase CDP Facilitator / Base) ---
// Fully honest by construction: the x402-native `accepts` block is emitted ONLY
// when a real funded wallet is configured. Until then the endpoint advertises
// x402 as "planned" — no invented wallet, no false settlement claim. The moment
// X402_PAY_TO is set, the 402 becomes protocol-discoverable and the CDP
// Facilitator auto-lists it on the x402 Bazaar the first time it settles.
const X402_PAY_TO = process.env.X402_PAY_TO ?? "";
const X402_NETWORK = process.env.X402_NETWORK ?? "eip155:8453"; // Base mainnet
const X402_ASSET =
  process.env.X402_ASSET ?? "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"; // USDC on Base
const X402_AMOUNT = process.env.X402_AMOUNT ?? "50000"; // 0.05 USDC (6 decimals)
const X402_LIVE = X402_PAY_TO.length > 0;

function x402Accepts(resource: string) {
  if (!X402_LIVE) return null;
  return [
    {
      scheme: "exact",
      network: X402_NETWORK,
      maxAmountRequired: X402_AMOUNT,
      asset: X402_ASSET,
      payTo: X402_PAY_TO,
      resource,
      description:
        "One AGIF /v1/signals response — typed, provenance-hashed agent intelligence.",
      mimeType: "application/json",
      maxTimeoutSeconds: 60,
      extra: { agif: "0.1", spec: "https://github.com/Navigata1/agif-spec" },
    },
  ];
}

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
    const resource = `${url.origin}/v1/signals`;
    const accepts = x402Accepts(resource);
    // The product working as designed: an honest, machine-readable 402.
    // `x402Version` + `accepts` are the fields the CDP Facilitator reads to
    // catalog the endpoint — present only when a real wallet is configured.
    return json(
      {
        error: "payment_required",
        message:
          "GET /v1/signals serves AGIF-typed, provenance-hashed intelligence to paying agents.",
        resource,
        ...(accepts ? { x402Version: 1, accepts } : {}),
        pricing: {
          plan: "starter_key",
          price: "$19/month — 1,000 requests (human path)",
          checkout: CHECKOUT_URL,
          note: "Live checkout. Key is issued instantly at the redirect after payment; only its hash is stored.",
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
        x402: X402_LIVE
          ? {
              status: "live",
              network: X402_NETWORK,
              note: "On-chain x402 settlement is active. Pay per the `accepts` block via the CDP Facilitator; the endpoint auto-catalogs on the x402 Bazaar after first settlement.",
            }
          : {
              status: "planned",
              note: "This endpoint speaks HTTP 402 with structured payment instructions and Stripe checkout for human key purchase. On-chain x402 (USDC on Base) is scaffolded and activates the moment a funded wallet is configured — no wallet is claimed until it is real.",
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
