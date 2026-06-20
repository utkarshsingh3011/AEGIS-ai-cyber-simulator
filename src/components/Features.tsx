"use client";

import React from "react";
import { Bot, Clapperboard, Network, GitFork, ShieldAlert, Cpu, ArrowUpRight } from "lucide-react";

const FEATURES = [
  {
    id: "scenario-gen",
    title: "AI Scenario Generation",
    desc: "Convert text prompts into validated machine-readable simulation profiles. Synthesize attacker payloads, scheduling rules, and target priorities automatically.",
    icon: Bot,
    glowColor: "group-hover:shadow-[0_0_30px_rgba(37,99,235,0.15)]",
    borderColor: "hover:border-blue-500/50",
    badge: "Scenario Engine",
    widget: (
      <div className="mt-4 p-3 bg-black/40 rounded border border-cyber-border font-mono text-[9px] text-slate-400 space-y-1">
        <div className="text-[8px] text-slate-500">{"// PROMPT"}</div>
        <div className="text-white">&quot;Simulate a key-theft campaign on S3 buckets...&quot;</div>
        <div className="text-[8px] text-slate-500 mt-2">{"// OUTPUT COMPILED"}</div>
        <div className="text-cyber-cyan">✓ T1530: Data from Cloud Storage Object</div>
      </div>
    ),
  },
  {
    id: "movie-engine",
    title: "Attack Movie Engine",
    desc: "Record, pause, rewind, and replay attack propagation vectors. Inspect exact asset metrics, process logs, and memory tables at each frame of the threat timeline.",
    icon: Clapperboard,
    glowColor: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
    borderColor: "hover:border-cyan-500/50",
    badge: "Playback Core",
    widget: (
      <div className="mt-4 p-3 bg-black/40 rounded border border-cyber-border font-mono text-[9px] text-slate-400 space-y-2">
        <div className="flex justify-between text-[8px] text-slate-500">
          <span>CAMPAIGN PLAYBACK</span>
          <span className="text-cyber-cyan animate-pulse">04:12 / 10:00</span>
        </div>
        <div className="w-full bg-slate-900 h-1 rounded overflow-hidden relative">
          <div className="bg-cyber-cyan h-full w-[42%]" />
          <div className="absolute left-[42%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_5px_#fff]" />
        </div>
        <div className="text-center text-slate-300 text-[8px]">FRAME #249: Lateral Movement to HOST-20</div>
      </div>
    ),
  },
  {
    id: "twin-infra",
    title: "Digital Twin Infrastructure",
    desc: "Model your network topologies, firewall routing, and identity access definitions down to specific policy rules without installing local agents on production systems.",
    icon: Network,
    glowColor: "group-hover:shadow-[0_0_30px_rgba(10,185,129,0.15)]",
    borderColor: "hover:border-emerald-500/50",
    badge: "Topology Twin",
    widget: (
      <div className="mt-4 p-3 bg-black/40 rounded border border-cyber-border font-mono text-[9px] text-slate-400 flex justify-between items-center gap-2">
        <div className="space-y-1">
          <div className="text-[8px] text-slate-500">ASSET INGESTION</div>
          <div className="text-white flex items-center gap-1">
            <Cpu className="w-3 h-3 text-cyber-green" /> 1,420 Active Nodes
          </div>
        </div>
        <div className="px-2 py-1 rounded bg-cyber-green/5 border border-cyber-green/30 text-cyber-green font-bold text-[8px]">
          100% SYNCED
        </div>
      </div>
    ),
  },
  {
    id: "mitre-mapping",
    title: "MITRE ATT&CK Mapping",
    desc: "Automatically map simulation tactics to active MITRE ATT&CK matrices. Discover detection gaps, validation weaknesses, and rule deficiencies instantly.",
    icon: GitFork,
    glowColor: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
    borderColor: "hover:border-amber-500/50",
    badge: "Matrix Compliance",
    widget: (
      <div className="mt-4 grid grid-cols-3 gap-1 font-mono text-[8px] text-center">
        <div className="p-1 rounded bg-cyber-green/10 border border-cyber-green/20 text-cyber-green">T1566<br />Phishing</div>
        <div className="p-1 rounded bg-cyber-red/10 border border-cyber-red/20 text-cyber-red">T1078<br />Accounts</div>
        <div className="p-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500">T1021<br />RDP</div>
      </div>
    ),
  },
  {
    id: "defense-simulator",
    title: "Defense Simulator",
    desc: "Deploy, verify, and tune security rule responses. Test the resilience of firewalls, endpoint policies, and containment actions against active threat scripts.",
    icon: ShieldAlert,
    glowColor: "group-hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]",
    borderColor: "hover:border-rose-500/50",
    badge: "Policy Hardening",
    widget: (
      <div className="mt-4 p-3 bg-black/40 rounded border border-cyber-border font-mono text-[9px] text-slate-400 space-y-1.5">
        <div className="text-[8px] text-slate-500">RESPONSE TRIGGER</div>
        <div className="flex justify-between items-center text-slate-300">
          <span>Block C2 IP 192.168.4.15</span>
          <span className="text-cyber-green font-bold">ACTIVE</span>
        </div>
        <div className="flex justify-between items-center text-slate-300">
          <span>Revoke Domain Admin Token</span>
          <span className="text-cyber-green font-bold">ACTIVE</span>
        </div>
      </div>
    ),
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-28 bg-cyber-surface/10 overflow-hidden border-t border-cyber-border/40">
      {/* Background gradients */}
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vh] bg-cyber-cyan/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-cyber-cyan text-[10px] font-mono tracking-widest uppercase mb-4">
            <Cpu className="w-3.5 h-3.5 text-cyber-cyan" />
            Remediation Subsystems
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Enterprise Module Hardening Suite
          </h2>
          <p className="mt-4 text-slate-400 text-sm md:text-base leading-relaxed">
            AEGIS houses five modular components designed to simulate campaigns, visualize flows, model topologies, verify compliance, and automate response.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat) => {
            const Icon = feat.icon;

            return (
              <div
                key={feat.id}
                className={`group glassmorphism-card rounded-xl p-6 border border-cyber-border relative flex flex-col justify-between overflow-hidden transition-all duration-300 ${feat.borderColor} ${feat.glowColor}`}
              >
                {/* Tech card header grid highlights */}
                <div className="absolute top-0 right-0 w-8 h-8 border-b border-l border-cyber-border group-hover:border-cyber-border-active/40 transition-colors pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">
                      {feat.badge}
                    </span>
                    <Icon className="w-5 h-5 text-slate-400 group-hover:text-cyber-cyan transition-colors" />
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight mt-6 flex items-center gap-1 group-hover:text-cyber-cyan transition-colors">
                    {feat.title}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>

                  <p className="mt-3 text-xs text-slate-400 leading-relaxed font-sans">
                    {feat.desc}
                  </p>
                </div>

                {feat.widget}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
