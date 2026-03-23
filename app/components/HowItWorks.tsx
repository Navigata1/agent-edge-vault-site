"use client";

import { motion } from "framer-motion";
import { Radio, Filter, Cpu, Zap, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Radio,
    title: "Signal Acquisition Layer",
    subtitle: "Ingestion & normalization",
    description:
      "Agent Edge Vault maintains persistent connections to 10,000+ raw signal sources — financial exchanges, web crawlers, API endpoints, satellite imagery processors, and proprietary sensor networks. Raw data enters the Acquisition Layer where it is deduplicated, timestamped with nanosecond precision, and tagged with source provenance metadata.",
    details: [
      "WebSocket + FIX protocol exchange connections",
      "Distributed crawler fleet with JS-render support",
      "Satellite & geospatial data ingestion pipelines",
      "Social and semantic signal processors",
    ],
    color: "blue",
  },
  {
    number: "02",
    icon: Filter,
    title: "Semantic Distillation Engine",
    subtitle: "Filtering & enrichment",
    description:
      "Raw signals pass through the Distillation Engine — a proprietary multi-stage processing pipeline that applies domain classifiers, entity extraction, sentiment scoring, and cross-signal correlation. The output is clean, typed, enriched intelligence objects with embedded semantic vectors ready for agent consumption.",
    details: [
      "Domain-specialized NLP classifiers (17 verticals)",
      "Named entity + relationship extraction graph",
      "Cross-signal anomaly detection & correlation",
      "Embedding generation via industry-leading foundation models",
    ],
    color: "cyan",
  },
  {
    number: "03",
    icon: Cpu,
    title: "Intent Routing Matrix",
    subtitle: "Agent-specific delivery",
    description:
      "Every agent in the network maintains a declared Intent Profile — a structured description of what signals are relevant to its mission. The Intent Routing Matrix continuously matches incoming intelligence objects against agent profiles and routes only what's operationally relevant. Zero irrelevant data consumed.",
    details: [
      "Declarative intent profile DSL (AGIF spec)",
      "Sub-10ms routing decisions via in-memory trie",
      "Confidence threshold filtering per agent",
      "Hierarchical topic subscription model",
    ],
    color: "blue",
  },
  {
    number: "04",
    icon: Zap,
    title: "Delivery & Acknowledgment",
    subtitle: "Guaranteed, ordered, traceable",
    description:
      "Intelligence reaches agents via WebSocket streams, gRPC bidirectional channels, or REST polling — all with sequence guarantees and delivery acknowledgment. Agents can request replay windows for any time range, enabling seamless recovery from downtime without intelligence gaps.",
    details: [
      "At-least-once delivery with dedup guarantees",
      "Sequence-ordered streams per topic partition",
      "15-day replay window on all intelligence types",
      "Agent health monitoring with dead-letter fallback",
    ],
    color: "cyan",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 relative">
      {/* Ambient */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 glow-border-blue">
            <Cpu size={12} className="text-cyan-400" />
            <span className="text-xs text-cyan-300 tracking-widest uppercase">
              Architecture
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            How the Intelligence{" "}
            <span className="text-gradient-blue">Layer Works</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A four-stage pipeline designed for reliability, speed, and
            precision. From raw signals to agent-ready intelligence in
            milliseconds.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isBlue = step.color === "blue";
            const isEven = i % 2 === 0;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`glass rounded-3xl p-8 border ${
                  isBlue ? "border-blue-500/10" : "border-cyan-500/10"
                } relative overflow-hidden`}
              >
                {/* Background step number */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[120px] font-black text-white/2 select-none pointer-events-none leading-none">
                  {step.number}
                </div>

                <div className="flex flex-col lg:flex-row gap-8 relative z-10">
                  {/* Left column */}
                  <div className="lg:w-2/5">
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isBlue ? "bg-blue-600/20" : "bg-cyan-600/20"
                        }`}
                      >
                        <Icon
                          size={22}
                          className={
                            isBlue ? "text-blue-400" : "text-cyan-400"
                          }
                        />
                      </div>
                      <div>
                        <div
                          className={`text-xs font-mono tracking-widest mb-1 ${
                            isBlue ? "text-blue-400" : "text-cyan-400"
                          }`}
                        >
                          STAGE {step.number}
                        </div>
                        <h3 className="text-white font-black text-xl leading-tight">
                          {step.title}
                        </h3>
                        <p className="text-slate-500 text-sm">{step.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Divider */}
                  <div
                    className={`hidden lg:block w-px self-stretch ${
                      isBlue ? "bg-blue-500/15" : "bg-cyan-500/15"
                    }`}
                  />

                  {/* Right column: details */}
                  <div className="lg:w-3/5">
                    <div className="text-xs text-slate-500 uppercase tracking-widest mb-4 font-medium">
                      Technical Implementation
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {step.details.map((detail, j) => (
                        <div key={j} className="flex items-start gap-3">
                          <CheckCircle
                            size={14}
                            className={`flex-shrink-0 mt-0.5 ${
                              isBlue ? "text-blue-400" : "text-cyan-400"
                            }`}
                          />
                          <span className="text-slate-300 text-sm leading-snug">
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
