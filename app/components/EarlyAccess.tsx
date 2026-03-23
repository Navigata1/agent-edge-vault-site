"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Shield, CheckCircle, Zap, ArrowRight, Loader2 } from "lucide-react";

const accessPerks = [
  "Direct API access to all intelligence stream categories",
  "AGIF schema documentation & reference implementations",
  "Priority signal routing (dedicated routing tier)",
  "Access to Sentinel suite roadmap & architecture sessions",
  "Early integrator credits and extended replay windows",
];

export default function EarlyAccess() {
  const [email, setEmail] = useState("");
  const [agentUseCase, setAgentUseCase] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !agentUseCase) {
      setError("Both fields are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    // Simulate API call (replace with actual endpoint)
    await new Promise((res) => setTimeout(res, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="early-access" className="py-32 relative">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-600/7 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 glow-border-blue">
            <Lock size={12} className="text-blue-400" />
            <span className="text-xs text-blue-300 tracking-widest uppercase">
              Closed Network · Early Integrators
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            Join the{" "}
            <span className="text-gradient-blue">Intelligence Network</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Agent Edge Vault is a closed intelligence network, currently in
            controlled early access. We are onboarding serious agent builders
            and autonomous system operators who are ready to integrate
            production-grade intelligence feeds.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: perks */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs text-slate-500 uppercase tracking-widest mb-6 font-medium">
              What early integrators receive
            </div>
            <ul className="space-y-4">
              {accessPerks.map((perk, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm leading-relaxed">{perk}</span>
                </motion.li>
              ))}
            </ul>

            {/* IDC context */}
            <div className="mt-10 glass rounded-2xl p-6 border border-blue-500/10">
              <div className="flex items-start gap-3 mb-3">
                <Shield size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-bold text-sm mb-1">
                    A Sentinel Initiative
                  </div>
                  <div className="text-slate-400 text-xs leading-relaxed">
                    Agent Edge Vault is part of the Sentinel Intelligence &amp;
                    Data Systems suite — Island Development Crew&apos;s
                    infrastructure layer for autonomous decision-making. Built
                    with the same cutting-edge R&amp;D governance that powers
                    our broader technology portfolio across industries.
                  </div>
                </div>
              </div>
              <a
                href="https://islanddevelopmentcrew.com"
                className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1 mt-3 transition-colors"
              >
                Learn about Island Development Crew{" "}
                <ArrowRight size={11} />
              </a>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass rounded-2xl p-8 border border-blue-500/15 glow-border-blue">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div>
                      <div className="text-white font-bold text-lg mb-1">
                        Request Early Access
                      </div>
                      <div className="text-slate-400 text-sm">
                        We review all requests manually. Expect a response
                        within 48–72 hours.
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 uppercase tracking-widest mb-2 font-medium">
                        Work Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="engineer@yourcompany.ai"
                        className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/6 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 uppercase tracking-widest mb-2 font-medium">
                        Agent Use Case
                      </label>
                      <textarea
                        value={agentUseCase}
                        onChange={(e) => setAgentUseCase(e.target.value)}
                        placeholder="Describe what your agent does and what intelligence it needs (e.g., 'Autonomous market-making agent requiring sub-100ms equity signals and cross-asset sentiment streams')"
                        rows={4}
                        className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/6 transition-all duration-200 resize-none"
                      />
                    </div>

                    {error && (
                      <div className="text-red-400 text-xs">{error}</div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-6 py-4 rounded-xl transition-all duration-300 text-sm"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Zap size={16} />
                          Request Early Access
                        </>
                      )}
                    </button>

                    <p className="text-slate-600 text-xs text-center">
                      No sales process. No pricing tiers. We review each
                      integration request on technical merit.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-blue-600/20 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle size={32} className="text-blue-400" />
                    </div>
                    <h3 className="text-white font-black text-2xl mb-2">
                      Request Received
                    </h3>
                    <p className="text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">
                      Your request has been logged in our network. Our team
                      will review it and respond within 48–72 hours.
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-blue" />
                      <span className="font-mono tracking-wider">QUEUED IN INTELLIGENCE NETWORK</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
