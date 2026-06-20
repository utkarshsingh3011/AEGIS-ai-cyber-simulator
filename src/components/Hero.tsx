"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Terminal, Shield, Play, Loader, CheckCircle2, ChevronRight } from "lucide-react";

const SIMULATION_CAMPAIGNS = [
  { id: "apt29", name: "APT29 CozyBear Emulation", technique: "MITRE ATT&CK T1566 (Spearphishing)" },
  { id: "ransomware", name: "LockBit 3.0 Propagation", technique: "MITRE ATT&CK T1486 (Data Encrypted)" },
  { id: "zero-day", name: "SolarWinds Supply Chain", technique: "MITRE ATT&CK T1195 (Compromise Pipeline)" },
];

export default function Hero() {
  const [selectedCampaign, setSelectedCampaign] = useState(SIMULATION_CAMPAIGNS[0].id);
  const [simulationState, setSimulationState] = useState<"idle" | "running" | "success">("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const heroRef = useRef<HTMLElement>(null);

  // Set up scroll for parallax shifts
  const { scrollY } = useScroll();
  
  // Parallax offsets for a premium digital agency feel
  const yText = useTransform(scrollY, [0, 800], [0, 100]);
  const yCard = useTransform(scrollY, [0, 800], [0, -50]);
  const opacityFade = useTransform(scrollY, [0, 600], [1, 0]);

  const startSimulation = () => {
    if (simulationState !== "idle") return;
    
    setSimulationState("running");
    setLogs([]);
    
    const steps = [
      `Initializing AEGIS Digital Twin Engine v4.2.9...`,
      `Mapping local network topologies (142 nodes, 37 subnets)`,
      `Injecting initial payload via ${SIMULATION_CAMPAIGNS.find(c => c.id === selectedCampaign)?.technique}...`,
      `Scanning boundary routers and firewall state tables...`,
      `Lateral movement detected: Active Directory domain controller targeted.`,
      `Compiling MITRE ATT&CK behavioral mitigation heuristics...`,
      `Digital Twin simulation completed. Data export generated successfully.`
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString("en-US", { hour12: false })}] ${step}`]);
        if (index === steps.length - 1) {
          setSimulationState("success");
        }
      }, (index + 1) * 800);
    });
  };

  const resetSimulation = () => {
    setSimulationState("idle");
    setLogs([]);
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[40vh] bg-electric-blue/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vh] bg-cyber-cyan/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Cyber Grid Decorator */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none z-0" />
      <div className="absolute inset-0 cyber-grid-fine opacity-50 pointer-events-none z-0" />

      {/* Crosshair accents on corners */}
      <div className="absolute top-12 left-12 w-6 h-6 border-t border-l border-slate-700 pointer-events-none" />
      <div className="absolute top-12 right-12 w-6 h-6 border-t border-r border-slate-700 pointer-events-none" />
      <div className="absolute bottom-12 left-12 w-6 h-6 border-b border-l border-slate-700 pointer-events-none" />
      <div className="absolute bottom-12 right-12 w-6 h-6 border-b border-r border-slate-700 pointer-events-none" />

      {/* Pulsing command center radar rings behind the terminal */}
      <div className="absolute right-[10%] top-[30%] w-[450px] h-[450px] pointer-events-none z-0 hidden lg:block">
        <motion.div 
          animate={{ scale: [1, 1.8], opacity: [0.15, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeOut" }}
          className="absolute inset-0 border border-cyber-cyan/30 rounded-full"
        />
        <motion.div 
          animate={{ scale: [1, 1.8], opacity: [0.1, 0] }}
          transition={{ repeat: Infinity, duration: 4, delay: 2, ease: "easeOut" }}
          className="absolute inset-0 border border-electric-blue/30 rounded-full"
        />
        <div className="absolute inset-0 border border-slate-800/20 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Typography Text Content */}
        <motion.div 
          style={{ y: yText, opacity: opacityFade }}
          className="lg:col-span-6 flex flex-col items-start text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded bg-electric-blue/10 border border-electric-blue/30 text-[10px] font-mono tracking-widest text-cyber-cyan uppercase mb-6"
          >
            <Shield className="w-3 h-3 animate-pulse" />
            Next-Gen Cyber Attack Simulation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-white"
          >
            Visualize Cyber <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue via-cyber-cyan to-white">
              Warfare Before
            </span>{" "}
            <br />
            It Happens
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-sm md:text-base text-slate-400 max-w-xl font-sans leading-relaxed"
          >
            AEGIS generates live, deterministic threat campaigns inside your network&apos;s digital twin. Emulate advanced hacking groups, record threat movies, and deploy pre-emptive mitigations automatically.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#workflow"
              className="px-6 py-3 rounded bg-white hover:bg-slate-200 text-black text-xs font-mono tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Analyze Platform
            </a>
            <Link
              href="/simulate"
              className="px-6 py-3 rounded bg-cyber-surface border border-cyber-border hover:border-cyber-border-active text-xs font-mono tracking-widest uppercase text-slate-300 hover:text-white transition-all duration-300"
            >
              Explore Studio
            </Link>
          </motion.div>
        </motion.div>

        {/* Cinematic Command Center Simulation Console */}
        <motion.div
          style={{ y: yCard }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-6 w-full"
        >
          <div className="glassmorphism-card rounded-lg overflow-hidden border border-cyber-border glow-blue">
            {/* Console Header Bar */}
            <div className="bg-cyber-surface/90 px-4 py-3 border-b border-cyber-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-[10px] font-mono text-slate-500 ml-2">aegis-simulation-console.sh</span>
              </div>
              <div className="flex items-center gap-1 font-mono text-[9px] text-cyber-cyan border border-cyber-cyan/20 px-1.5 py-0.5 rounded bg-cyber-cyan/5">
                <Terminal className="w-2.5 h-2.5" />
                SHELL v1.4
              </div>
            </div>

            {/* Console Body */}
            <div className="p-5 bg-black/70 font-mono text-xs text-slate-300 min-h-[280px] flex flex-col justify-between">
              {simulationState === "idle" && (
                <div className="flex flex-col gap-4">
                  <div className="text-slate-400">
                    <span className="text-cyber-green">$</span> choose campaign to execute:
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {SIMULATION_CAMPAIGNS.map((campaign) => (
                      <button
                        key={campaign.id}
                        onClick={() => setSelectedCampaign(campaign.id)}
                        className={`p-3 rounded text-left border flex items-center justify-between transition-all duration-300 ${
                          selectedCampaign === campaign.id
                            ? "bg-electric-blue/15 border-electric-blue text-white"
                            : "bg-cyber-surface/40 border-cyber-border hover:border-slate-700 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold font-mono">{campaign.name}</div>
                          <div className="text-[10px] opacity-60 mt-0.5">{campaign.technique}</div>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            selectedCampaign === campaign.id
                              ? "border-cyber-cyan bg-cyber-cyan/10"
                              : "border-slate-600"
                          }`}
                        >
                          {selectedCampaign === campaign.id && (
                            <span className="w-2 h-2 rounded-full bg-cyber-cyan" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={startSimulation}
                    className="w-full mt-2 py-3 rounded bg-electric-blue hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all duration-300 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Generate Simulation Run
                  </button>
                </div>
              )}

              {simulationState === "running" && (
                <div className="flex flex-col h-full justify-between gap-4">
                  <div className="flex flex-col gap-2 flex-grow overflow-y-auto max-h-[220px]">
                    <div className="text-slate-400 flex items-center gap-2">
                      <Loader className="w-3.5 h-3.5 text-cyber-cyan animate-spin" />
                      <span>Simulating attack propagation campaign...</span>
                    </div>
                    {logs.map((log, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-[11px] text-slate-400 leading-relaxed font-mono"
                      >
                        {log}
                      </motion.div>
                    ))}
                  </div>
                  <div className="text-[10px] text-cyber-cyan/70 animate-pulse border-t border-cyber-border pt-2 text-right uppercase tracking-wider">
                    Execution in progress...
                  </div>
                </div>
              )}

              {simulationState === "success" && (
                <div className="flex flex-col gap-4 text-center justify-center py-6">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex justify-center"
                  >
                    <CheckCircle2 className="w-12 h-12 text-cyber-green" />
                  </motion.div>

                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Simulation Completed Successfully</h3>
                    <p className="text-[11px] text-slate-400 mt-2 max-w-sm mx-auto">
                      All threat vectors successfully emulated and mapped to MITRE mitigations. Network Twin has been updated.
                    </p>
                  </div>

                  <div className="flex gap-2.5 mt-2 justify-center">
                    <button
                      onClick={resetSimulation}
                      className="px-4 py-2 rounded bg-cyber-surface hover:bg-cyber-surface-brighter border border-cyber-border text-[10px] uppercase font-mono text-slate-300 tracking-wider transition-all duration-300"
                    >
                      Reset Console
                    </button>
                    <a
                      href="#preview"
                      className="px-4 py-2 rounded bg-electric-blue hover:bg-blue-600 text-[10px] uppercase font-mono text-white tracking-wider flex items-center gap-1.5 hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all duration-300"
                    >
                      View Attack Movie
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Console Footer Info */}
            <div className="bg-cyber-surface px-4 py-2 border-t border-cyber-border flex items-center justify-between text-[9px] font-mono text-slate-500">
              <div>HOST: twin-core-01.aegis.local</div>
              <div className="text-cyber-green animate-pulse">● SECURE SSL CONSOLE</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
