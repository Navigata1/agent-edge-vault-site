"use client";

import { motion } from "framer-motion";
import { Database, Globe, BarChart2, Satellite, Rss, Brain } from "lucide-react";

const sources = [
  {
    icon: BarChart2,
    category: "Financial Markets",
    count: "2,400+",
    feeds: ["Equity exchanges (NYSE, NASDAQ, LSE, TSX)", "Options chain data & Greek feeds", "Futures & commodities", "FX cross-rate streams", "Bond yield curves"],
    latency: "~12ms",
    color: "blue",
  },
  {
    icon: Globe,
    category: "Web Intelligence",
    count: "3,800+",
    feeds: ["E-commerce pricing crawlers", "News & press release parsers", "Job posting change monitors", "Domain & DNS mutation tracking", "Ad spend signal proxies"],
    latency: "~2min",
    color: "cyan",
  },
  {
    icon: Brain,
    category: "Semantic Intelligence",
    count: "900+",
    feeds: ["Earnings call transcripts", "Regulatory filing parsers", "Patent & IP application feeds", "Academic pre-print monitors", "Technical standards updates"],
    latency: "~30s",
    color: "blue",
  },
  {
    icon: Satellite,
    category: "Geo & Physical",
    count: "280+",
    feeds: ["Satellite imagery change detection", "Port & shipping movement data", "Supply chain disruption signals", "Weather impact models", "Energy infrastructure monitoring"],
    latency: "~15min",
    color: "cyan",
  },
  {
    icon: Rss,
    category: "Social & Behavioral",
    count: "1,200+",
    feeds: ["Executive social signal trackers", "Community sentiment indices", "Product review velocity monitors", "Forum & discussion board trends", "Influencer movement detection"],
    latency: "~90s",
    color: "blue",
  },
  {
    icon: Database,
    category: "Proprietary IDC Feeds",
    count: "400+",
    feeds: ["Cross-vertical correlation matrices", "IDC deal flow intelligence", "Sector-specific agent telemetry", "Portfolio signal aggregates", "R&D pipeline monitors"],
    latency: "~5s",
    color: "cyan",
  },
];

export default function DataSources() {
  return (
    <section id="data-sources" className="py-32 relative">
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

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
            <Database size={12} className="text-blue-400" />
            <span className="text-xs text-blue-300 tracking-widest uppercase">
              Data Sources
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            9,000+ Signal Sources,{" "}
            <span className="text-gradient-blue">One Unified Feed</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Intelligence aggregated from across markets, web, physical world,
            and proprietary IDC networks — unified, normalized, and delivered
            as a single coherent stream.
          </p>
        </motion.div>

        {/* Sources grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sources.map((source, i) => {
            const Icon = source.icon;
            const isBlue = source.color === "blue";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className={`glass rounded-2xl p-6 border transition-all duration-300 ${
                  isBlue
                    ? "border-blue-500/10 hover:border-blue-500/25"
                    : "border-cyan-500/10 hover:border-cyan-500/25"
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isBlue ? "bg-blue-600/20" : "bg-cyan-600/20"
                      }`}
                    >
                      <Icon
                        size={18}
                        className={isBlue ? "text-blue-400" : "text-cyan-400"}
                      />
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">
                        {source.category}
                      </div>
                      <div
                        className={`text-xs font-mono ${
                          isBlue ? "text-blue-400" : "text-cyan-400"
                        }`}
                      >
                        {source.count} sources
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500">avg latency</div>
                    <div
                      className={`text-xs font-mono font-bold ${
                        isBlue ? "text-blue-300" : "text-cyan-300"
                      }`}
                    >
                      {source.latency}
                    </div>
                  </div>
                </div>

                {/* Feed list */}
                <ul className="space-y-2">
                  {source.feeds.map((feed, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-slate-400">
                      <div
                        className={`w-1 h-1 rounded-full flex-shrink-0 ${
                          isBlue ? "bg-blue-500/60" : "bg-cyan-500/60"
                        }`}
                      />
                      {feed}
                    </li>
                  ))}
                </ul>

                {/* Live indicator */}
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-blue" />
                  <span className="text-[10px] text-slate-500 font-mono tracking-wider">
                    STREAM ACTIVE
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Total count banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 glass rounded-2xl p-6 glow-border-blue text-center"
        >
          <div className="text-sm text-slate-400 mb-2">
            Total intelligence coverage
          </div>
          <div className="text-4xl font-black text-gradient-blue mb-1">
            10,000+ Active Signal Sources
          </div>
          <div className="text-slate-500 text-sm">
            Growing at ~200 new sources per month · All sources verified, deduplicated, and provenance-stamped
          </div>
        </motion.div>
      </div>
    </section>
  );
}
