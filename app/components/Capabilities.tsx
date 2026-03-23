"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Eye,
  Cpu,
  Filter,
  GitBranch,
  Gauge,
  Shield,
  Database,
} from "lucide-react";

const capabilities = [
  {
    icon: TrendingUp,
    title: "Market Signal Feeds",
    description:
      "Real-time price movements, volume anomalies, and macro shifts — normalized and structured for direct agent ingestion. No noise, only signal.",
    tag: "LIVE FEED",
    color: "blue",
  },
  {
    icon: Eye,
    title: "Competitor Intelligence",
    description:
      "Continuous competitive radar across pricing, product launches, hiring signals, and web footprint. Structured as semantic vectors for agent reasoning.",
    tag: "CONTINUOUS",
    color: "cyan",
  },
  {
    icon: Cpu,
    title: "Agent-Native Schema",
    description:
      "Every data object is structured to AGIF (Agent Intelligence Format) spec — typed, versioned, timestamped, and embedding-ready. Zero preprocessing required.",
    tag: "STRUCTURED",
    color: "blue",
  },
  {
    icon: Filter,
    title: "Intent-Filtered Streams",
    description:
      "Feeds are filtered by declared agent intent profiles. Receive only what's relevant to your agent's operational domain — precision over volume.",
    tag: "CURATED",
    color: "cyan",
  },
  {
    icon: GitBranch,
    title: "Multi-Modal Intel",
    description:
      "Text, structured JSON, embedding vectors, and time-series data in one unified stream. Supports LLM-native consumption and traditional ML pipelines simultaneously.",
    tag: "MULTI-MODAL",
    color: "blue",
  },
  {
    icon: Gauge,
    title: "Low-Latency Delivery",
    description:
      "Sub-50ms signal delivery via WebSocket or gRPC streams. Critical market events propagate through the network before traditional data providers process them.",
    tag: "<50ms",
    color: "cyan",
  },
  {
    icon: Shield,
    title: "Provenance & Integrity",
    description:
      "Every signal carries a cryptographic provenance chain — source, timestamp, transformation history, and confidence score. Agents can verify before acting.",
    tag: "VERIFIED",
    color: "blue",
  },
  {
    icon: Database,
    title: "Temporal Intelligence Store",
    description:
      "Historical signal archives with millisecond-resolution replay. Build and backtest agent reasoning models against the same data your production agents consume.",
    tag: "HISTORICAL",
    color: "cyan",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Capabilities() {
  return (
    <section id="capabilities" className="py-32 relative">
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[400px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 glow-border-blue">
            <Cpu size={12} className="text-blue-400" />
            <span className="text-xs text-blue-300 tracking-widest uppercase">
              Capabilities
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            Intelligence Infrastructure,{" "}
            <span className="text-gradient-blue">Not a Dashboard</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Built ground-up for machine consumers. Every capability is designed
            for agents, pipelines, and autonomous systems — not human analysts.
          </p>
        </motion.div>

        {/* Capabilities grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            const isBlue = cap.color === "blue";
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.01 }}
                className={`glass rounded-2xl p-6 border transition-all duration-300 cursor-default group ${
                  isBlue
                    ? "border-blue-500/10 hover:border-blue-500/30"
                    : "border-cyan-500/10 hover:border-cyan-500/30"
                }`}
              >
                {/* Tag */}
                <div
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 mb-4 text-[10px] font-mono tracking-widest font-bold ${
                    isBlue
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-cyan-500/10 text-cyan-400"
                  }`}
                >
                  <div
                    className={`w-1 h-1 rounded-full ${
                      isBlue ? "bg-blue-400" : "bg-cyan-400"
                    }`}
                  />
                  {cap.tag}
                </div>

                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                    isBlue
                      ? "bg-blue-600/15 group-hover:bg-blue-600/25"
                      : "bg-cyan-600/15 group-hover:bg-cyan-600/25"
                  }`}
                >
                  <Icon
                    size={20}
                    className={isBlue ? "text-blue-400" : "text-cyan-400"}
                  />
                </div>

                <h3 className="text-white font-bold mb-2 text-sm leading-snug">
                  {cap.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {cap.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
