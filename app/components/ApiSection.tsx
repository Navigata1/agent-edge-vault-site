"use client";

import { motion } from "framer-motion";
import { Code2, Terminal, Webhook, Key, ArrowRight } from "lucide-react";

const codeSnippets = {
  connect: `// Connect to Agent Edge Vault stream
import { VaultClient } from "@idc/agent-edge-vault";

const vault = new VaultClient({
  apiKey: process.env.VAULT_API_KEY,
  agentId: "agent_prod_7a3f",
  intentProfile: {
    domains: ["finance", "competitive"],
    entities: ["TSLA", "NVDA", "competitor_set_3"],
    signalTypes: ["price_move", "news_event", "sentiment_shift"],
    minConfidence: 0.82,
  },
});

await vault.connect();`,
  consume: `// Consume real-time intelligence
vault.on("signal", (intel) => {
  const {
    id,          // Unique signal ID
    type,        // "price_move" | "news_event" | ...
    entity,      // Named entity (ticker, company, etc.)
    value,       // Signal payload (typed by schema)
    confidence,  // 0.0–1.0 ML confidence score
    timestamp,   // Nanosecond Unix timestamp
    embedding,   // 1536-dim vector (OpenAI compat.)
    provenance,  // Source chain + integrity hash
  } = intel;

  // Feed directly to your agent context
  agent.injectIntel(intel);
});`,
};

const integrationModes = [
  {
    icon: Webhook,
    title: "WebSocket Streams",
    description:
      "Persistent bidirectional stream with sequence guarantees. Recommended for production agents requiring low-latency continuous intelligence.",
    tag: "RECOMMENDED",
    color: "blue",
  },
  {
    icon: Terminal,
    title: "gRPC Bidirectional",
    description:
      "High-throughput gRPC streaming for enterprise deployments. Supports backpressure, flow control, and agent-initiated filtering mid-stream.",
    tag: "ENTERPRISE",
    color: "cyan",
  },
  {
    icon: Code2,
    title: "REST + Polling",
    description:
      "Standard REST API for batch signal consumption, historical replay, and agents with non-continuous operation patterns.",
    tag: "COMPATIBLE",
    color: "blue",
  },
  {
    icon: Key,
    title: "Native SDK",
    description:
      "TypeScript, Python, and Rust SDKs with full type safety, automatic reconnection, backpressure handling, and local signal buffering.",
    tag: "MULTI-LANG",
    color: "cyan",
  },
];

export default function ApiSection() {
  return (
    <section id="api" className="py-32 relative">
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-blue-600/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 glow-border-blue">
            <Code2 size={12} className="text-blue-400" />
            <span className="text-xs text-blue-300 tracking-widest uppercase">
              Integration & API
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            Built for{" "}
            <span className="text-gradient-blue">Developer-First</span>{" "}
            Integration
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Declare your agent&apos;s intent, connect to the stream, and receive
            exactly the intelligence your agent needs. No data wrangling,
            no normalization pipelines.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Code panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Tab switcher */}
            <div className="glass rounded-2xl overflow-hidden border border-white/5">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="text-xs text-slate-500 ml-2 font-mono">
                  vault-connect.ts
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-blue" />
                  <span className="text-[10px] text-slate-500 font-mono">CONNECTED</span>
                </div>
              </div>
              {/* Code */}
              <pre className="p-6 text-xs text-slate-300 font-mono leading-relaxed overflow-x-auto">
                <code>{codeSnippets.connect}</code>
              </pre>
            </div>

            <div className="glass rounded-2xl overflow-hidden border border-white/5">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="text-xs text-slate-500 ml-2 font-mono">
                  consume-intel.ts
                </div>
              </div>
              <pre className="p-6 text-xs text-slate-300 font-mono leading-relaxed overflow-x-auto">
                <code>{codeSnippets.consume}</code>
              </pre>
            </div>
          </motion.div>

          {/* Integration modes */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="text-xs text-slate-500 uppercase tracking-widest mb-6 font-medium">
              Integration Methods
            </div>
            {integrationModes.map((mode, i) => {
              const Icon = mode.icon;
              const isBlue = mode.color === "blue";
              return (
                <div
                  key={i}
                  className={`glass rounded-xl p-5 border transition-all duration-300 group cursor-default ${
                    isBlue
                      ? "border-blue-500/10 hover:border-blue-500/25"
                      : "border-cyan-500/10 hover:border-cyan-500/25"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isBlue ? "bg-blue-600/20" : "bg-cyan-600/20"
                      }`}
                    >
                      <Icon
                        size={16}
                        className={isBlue ? "text-blue-400" : "text-cyan-400"}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-bold text-sm">
                          {mode.title}
                        </h3>
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                            isBlue
                              ? "bg-blue-500/15 text-blue-400"
                              : "bg-cyan-500/15 text-cyan-400"
                          }`}
                        >
                          {mode.tag}
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        {mode.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* API docs teaser */}
            <div className="glass rounded-xl p-5 border border-white/5 mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-bold text-sm mb-1">
                    Full API Reference
                  </div>
                  <div className="text-slate-400 text-xs">
                    Complete SDK docs, schema definitions, and AGIF spec
                  </div>
                </div>
                <a
                  href="#early-access"
                  className="flex items-center gap-1 text-blue-400 text-xs hover:text-blue-300 transition-colors"
                >
                  Access on join <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
