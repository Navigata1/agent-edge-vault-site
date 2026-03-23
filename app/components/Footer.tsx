"use client";

import { motion } from "framer-motion";
import { Shield, ArrowUpRight } from "lucide-react";

const sentinelProducts = [
  { name: "Agent Edge Vault", description: "Intelligence feeds", href: "#", active: true },
  { name: "Deal Oracle", description: "Deal analysis engine", href: "#" },
  { name: "Signal Forge", description: "Signal processing", href: "#" },
  { name: "Competitive Radar", description: "Competitive intelligence", href: "#" },
];

const links = {
  "Intelligence": ["Market Signals", "Competitor Intel", "Geo & Physical", "Semantic Feeds", "Proprietary IDC Data"],
  "Developers": ["API Reference", "SDK Documentation", "AGIF Schema Spec", "Stream Integration", "Sample Agents"],
  "IDC": ["About IDC", "Sentinel Suite", "Technology Portfolio", "Research & Governance", "Press"],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 pt-20 pb-10 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-blue-600/4 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                <Shield size={18} className="text-blue-400" />
              </div>
              <div>
                <div className="text-white font-black text-base tracking-wide">
                  Agent Edge Vault
                </div>
                <div className="text-blue-400/70 text-[10px] tracking-widest uppercase">
                  Sentinel Suite · IDC
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Premium intelligence feeds engineered for autonomous agent
              consumption. The intelligence backbone for autonomous
              decision-making at scale.
            </p>

            {/* Sentinel suite products */}
            <div className="text-xs text-slate-500 uppercase tracking-widest mb-3 font-medium">
              Sentinel Suite
            </div>
            <div className="space-y-2">
              {sentinelProducts.map((product, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 text-xs ${
                    product.active ? "text-blue-400" : "text-slate-500"
                  }`}
                >
                  <div
                    className={`w-1 h-1 rounded-full ${
                      product.active ? "bg-blue-400" : "bg-slate-600"
                    }`}
                  />
                  <span className={product.active ? "font-medium" : ""}>
                    {product.name}
                  </span>
                  <span className="text-slate-600">—</span>
                  <span className="text-slate-600">{product.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <div className="text-xs text-slate-400 uppercase tracking-widest mb-4 font-medium">
                {category}
              </div>
              <ul className="space-y-2.5">
                {items.map((item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-slate-500 hover:text-slate-300 text-sm transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-slate-600 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Island Development Crew LLC. All rights reserved.{" "}
            <span className="text-slate-700">·</span>{" "}
            Agent Edge Vault is a proprietary intelligence infrastructure product.
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://islanddevelopmentcrew.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-400 transition-colors duration-200"
            >
              Island Development Crew
              <ArrowUpRight size={11} />
            </a>
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
              Terms
            </a>
          </div>
        </div>

        {/* IDC tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <div className="text-[10px] text-slate-700 tracking-widest uppercase">
            Island Development Crew · Building the intelligence backbone for autonomous decision-making
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
