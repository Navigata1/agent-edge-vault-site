"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Activity, Lock } from "lucide-react";

const statItems = [
  { label: "Signal Sources", value: "10K+" },
  { label: "Update Latency", value: "<50ms" },
  { label: "Data Categories", value: "47" },
  { label: "Agent Uptime", value: "99.97%" },
];

const floatingTags = [
  { text: "MARKET SIGNAL", color: "text-blue-400", delay: 0 },
  { text: "COMPETITOR INTEL", color: "text-cyan-400", delay: 0.4 },
  { text: "DEAL RADAR", color: "text-blue-300", delay: 0.8 },
  { text: "PRICE SHIFT", color: "text-cyan-300", delay: 1.2 },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid pt-20">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[300px] bg-cyan-600/6 rounded-full blur-[100px]" />
      </div>

      {/* Floating intel tags */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingTags.map((tag, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0.3, 0.6, 0.3], y: [0, -12, 0] }}
            transition={{
              duration: 4,
              delay: tag.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute ${
              i === 0
                ? "top-[25%] left-[8%]"
                : i === 1
                ? "top-[35%] right-[6%]"
                : i === 2
                ? "top-[60%] left-[5%]"
                : "bottom-[25%] right-[10%]"
            }`}
          >
            <div className="glass rounded-full px-3 py-1.5 flex items-center gap-2 glow-border-blue">
              <div className="w-1.5 h-1.5 rounded-full bg-current pulse-blue" />
              <span className={`text-[10px] font-mono font-bold tracking-widest ${tag.color}`}>
                {tag.text}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        {/* Suite badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 glow-border-blue"
        >
          <Shield size={14} className="text-blue-400" />
          <span className="text-xs text-blue-300 tracking-widest uppercase font-medium">
            Sentinel Suite · Intelligence & Data Systems
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 pulse-blue" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-none mb-6"
        >
          <span className="text-white">The Intelligence</span>
          <br />
          <span className="text-gradient-blue">Layer for Agents</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl sm:text-2xl text-slate-400 max-w-3xl mx-auto mb-4 leading-relaxed"
        >
          Premium intelligence feeds engineered for autonomous agent consumption.
          Market signals, competitor data, and curated intel streams — delivered
          machine-first, structured for action.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-sm text-slate-500 mb-12 tracking-wide"
        >
          An Island Development Crew R&D initiative · Building the intelligence backbone for autonomous decision-making
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
        >
          <a
            href="#early-access"
            className="group relative inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Lock size={18} className="relative z-10" />
            <span className="relative z-10">Join the Intelligence Network</span>
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-3 glass hover:bg-white/5 text-slate-200 font-semibold px-8 py-4 rounded-xl transition-all duration-300 glow-border-blue"
          >
            <Activity size={18} className="text-blue-400" />
            <span>See How It Works</span>
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="glass rounded-2xl p-6 max-w-3xl mx-auto glow-border-blue"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {statItems.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl font-black text-gradient-blue mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Live feed indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex items-center justify-center gap-2 text-slate-500 text-sm"
        >
          <Zap size={14} className="text-blue-400" />
          <span>Live intelligence streams active</span>
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-blue" />
        </motion.div>
      </div>
    </section>
  );
}
