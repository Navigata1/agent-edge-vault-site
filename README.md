# AgentPact — flagship site + feed API

The AgentPact parent site (four layers: Edge / Feed / Skills / Memory) and the live paid endpoint.

- `/` — flagship page (static HTML served via route handler; the routing playground and SHA-256 provenance demo are the reference implementations)
- `/v1/signals` — AGIF signal feed. No key → HTTP 402 with payment instructions. `Authorization: Bearer apk_live_…` → typed, provenance-hashed signals, metered in Supabase.
- `/activate?session_id=…` — Stripe checkout redirect target; verifies payment server-side and mints a key (idempotent per session, hash-only storage).

Canonical domains:
- Flagship/paywall UI: https://agentpact.islanddevcrew.app
- Agent API: https://api.islanddevcrew.ai/v1/signals
- Skill Bazaar: https://bazaar.islanddevcrew.app

Env: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `VAULT_ADMIN_SECRET`, `STRIPE_SECRET_KEY`, `STRIPE_PAYMENT_LINK`.

Spec: https://github.com/Navigata1/agif-spec · An Island Development Crew venture.
