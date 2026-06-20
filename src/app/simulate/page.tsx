"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Terminal, Bot, Layers, Play, CheckCircle2, 
  ArrowLeft, RefreshCw, Cpu, Database, Network, ArrowRight 
} from "lucide-react";

// Types matching the architectural requirements
interface CampaignStage {
  title: string;
  description: string;
  log: string;
  status: "evaded" | "blocked" | "alerted";
  severity: "low" | "medium" | "high" | "critical";
}

interface CampaignConfig {
  industry: string;
  threatActor: string;
  attackType: string;
  securityLevel: string;
  timestamp: string;
  riskFactor: number;
  compromiseChance: number;
  primaryTarget: string;
  stages: CampaignStage[];
}

const INDUSTRIES = [
  { id: "Healthcare", name: "Healthcare", desc: "Patient EMR databases & telemedicine portals", target: "EMR-Patient-DB" },
  { id: "Banking", name: "Banking", desc: "SWIFT gateways & core ledger transactions", target: "Swift-Transfer-Core" },
  { id: "Government", name: "Government", desc: "Secure directories & federal backup servers", target: "Fed-Registry-SRV" },
  { id: "University", name: "University", desc: "Registrar student logs & research NAS", target: "Research-NAS-Share" },
  { id: "Startup", name: "Startup", desc: "Production API keys & Kubernetes clusters", target: "Kube-Master-Prod" },
];

const ACTORS = [
  { id: "APT29", name: "APT29 (CozyBear)", desc: "Stealthy state-sponsored group focusing on intelligence collection", focus: "Evasion" },
  { id: "Lazarus", name: "Lazarus Group", desc: "Aggressive campaigns targeting financial & crypto assets", focus: "Financial Wiper" },
  { id: "LockBit", name: "LockBit 3.0", desc: "Ransomware-as-a-Service specializing in double-extortion payloads", focus: "Encryption" },
  { id: "FIN7", name: "FIN7", desc: "Highly organized malware group targeting point-of-sale terminals", focus: "Credential Theft" },
  { id: "Anonymous", name: "Anonymous", desc: "Decentralized hacktivist collective targeting corporate public interfaces", focus: "DDoS/Defacement" },
];

const ATTACK_TYPES = [
  { id: "Phishing", name: "Spearphishing Link", desc: "Targeted spearphishing emails carrying weaponized payload executables", tech: "T1566.002" },
  { id: "Ransomware", name: "Data Encrypted", desc: "Locking systems down using custom file entropy wipers", tech: "T1486" },
  { id: "DDoS", name: "Volumetric Exhaustion", desc: "Exhausting router buffers via UDP/TCP packet floods", tech: "T1498" },
  { id: "Supply Chain", name: "Dependency Poisoning", desc: "Injecting malicious scripts into public software builds", tech: "T1195.002" },
  { id: "SQL Injection", name: "Blind SQL Injection", desc: "Bypassing firewalls to extract databases via boolean queries", tech: "T1190" },
];

const SECURITY_LEVELS = [
  { id: "Low", name: "Low (Legacy)", desc: "Standard firewalls, local antivirus, static credentials", detection: "10% Detection" },
  { id: "Medium", name: "Medium (Signature)", desc: "Segmented networks, EDR signature checks, IAM policies", detection: "45% Detection" },
  { id: "High", name: "High (Zero Trust)", desc: "MFA enforcement, heuristic threat hunters, anomaly logs", detection: "78% Detection" },
  { id: "Enterprise", name: "Enterprise SOC", desc: "Fully automated SOAR playbooks, hardware keys, 24/7 analysis", detection: "95% Detection" },
];

// Helper to dynamically build campaign data configs based on parameters
// Extensible for future Gemini API scenario synthesizer integration
const compileCampaignConfig = (
  industry: string,
  actor: string,
  attack: string,
  security: string
): CampaignConfig => {
  const chosenIndustry = INDUSTRIES.find(i => i.id === industry) || INDUSTRIES[0];
  const chosenAttack = ATTACK_TYPES.find(t => t.id === attack) || ATTACK_TYPES[0];
  
  // Calculate compromise chance and risk factors based on security level
  let compromiseChance = 85;
  let riskFactor = 75;
  
  // Set stage statuses (evaded vs blocked) based on security level
  let status1: "evaded" | "blocked" = "evaded";
  let status2: "evaded" | "blocked" = "evaded";
  let status3: "evaded" | "blocked" = "evaded";
  let status4: "evaded" | "blocked" = "evaded";
  let status5: "evaded" | "blocked" = "evaded";
  let status6: "evaded" | "blocked" = "evaded";

  if (security === "Medium") {
    compromiseChance = 55;
    riskFactor = 55;
    status1 = "blocked";
    status3 = "blocked";
  } else if (security === "High") {
    compromiseChance = 25;
    riskFactor = 30;
    status1 = "blocked";
    status2 = "blocked";
    status4 = "blocked";
  } else if (security === "Enterprise") {
    compromiseChance = 5;
    riskFactor = 12;
    status1 = "blocked";
    status2 = "blocked";
    status3 = "blocked";
    status4 = "blocked";
    status5 = "blocked";
    status6 = "blocked";
  }

  return {
    industry,
    threatActor: actor,
    attackType: attack,
    securityLevel: security,
    timestamp: new Date().toISOString(),
    compromiseChance,
    riskFactor,
    primaryTarget: chosenIndustry.target,
    stages: [
      {
        title: "Reconnaissance & Port Scan",
        description: `Attacker ${actor} initiated active reconnaissance scans mapping the target subnets for ${chosenIndustry.name}.`,
        log: `[RECON] Mapping subnets on segment 10.0.4.x. Found open ports: 443, 8080. EDR status: ${status1 === "blocked" ? "BLOCKED" : "EVADED"}`,
        status: status1,
        severity: "low",
      },
      {
        title: "Initial Access Foothold",
        description: `Foothold vector established using ${chosenAttack.name} (${chosenAttack.tech}) to bypass gateway filtering.`,
        log: `[INGRESS] Exploit payload dispatched. Channel established with target client. EDR status: ${status2 === "blocked" ? "BLOCKED" : "EVADED"}`,
        status: status2,
        severity: "medium",
      },
      {
        title: "Credential Swipe",
        description: `Searching local memory dumps and active directory tables for active session tokens and admin keys.`,
        log: `[CREDENTIALS] LSASS memory dump initiated / credential extraction requested. EDR status: ${status3 === "blocked" ? "BLOCKED" : "EVADED"}`,
        status: status3,
        severity: "medium",
      },
      {
        title: "Lateral Subnet Propagation",
        description: `Pivoting from compromised host endpoints to jump servers. Internal target segment reached: ${chosenIndustry.target}.`,
        log: `[LATERAL] Remote session hijacked to cross network subnets. Target node reached: ${chosenIndustry.target}. EDR status: ${status4 === "blocked" ? "BLOCKED" : "EVADED"}`,
        status: status4,
        severity: "high",
      },
      {
        title: "Privilege Domain Escalation",
        description: `Attempting admin privilege elevation via token impersonation on Active Directory controller nodes.`,
        log: `[ESCALATION] Token impersonation executed. Root credentials retrieved. EDR status: ${status5 === "blocked" ? "BLOCKED" : "EVADED"}`,
        status: status5,
        severity: "high",
      },
      {
        title: "Data Exfiltration & Impact",
        description: `Executing final payload actions on database target ${chosenIndustry.target}. Archiving core customer tables.`,
        log: `[EXFILTRATION] Compressing database files. Transmitting out of band over port 443. EDR status: ${status6 === "blocked" ? "BLOCKED" : "EVADED"}`,
        status: status6,
        severity: "critical",
      },
    ],
  };
};

export default function SimulatePage() {
  const router = useRouter();
  // Field states
  const [industry, setIndustry] = useState("Healthcare");
  const [actor, setActor] = useState("APT29");
  const [attack, setAttack] = useState("Phishing");
  const [security, setSecurity] = useState("Medium");

  // Simulation execution states
  const [simState, setSimState] = useState<"idle" | "compiling" | "completed">("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const [activeConfig, setActiveConfig] = useState<CampaignConfig | null>(null);

  const handleGenerate = () => {
    if (simState === "compiling") return;
    
    setSimState("compiling");
    setLogs([]);

    // Compile dynamic structured data payload
    const config = compileCampaignConfig(industry, actor, attack, security);
    setActiveConfig(config);

    // Save configuration in session storage so a future '/attack-viewer' page can read it directly!
    if (typeof window !== "undefined") {
      sessionStorage.setItem("aegis_campaign_config", JSON.stringify(config));
    }

    const compileLogs = [
      `[SYS] Bootstrapping Cyber Attack Simulation Studio v2.0...`,
      `[SYS] Parameter config loaded: [Industry: ${industry} | Actor: ${actor}]`,
      `[SYS] Parameter config loaded: [Attack Type: ${attack} | Security Level: ${security}]`,
      `[SCENARIO] Synthesizing custom threat campaign profile...`,
      `[SCENARIO] Mapping chosen payload parameters to MITRE ATT&CK database...`,
      `[TWIN] Connecting to virtual digital twin infrastructure topology...`,
      `[TWIN] Provisioning target server nodes: ${config.primaryTarget}...`,
      `[COMPILE] Injecting custom compiler flags for EDR threat model bypass...`,
      `[COMPILE] Attack campaign profile compiled successfully. Structured config payload ready.`
    ];

    compileLogs.forEach((log, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, log]);
        if (index === compileLogs.length - 1) {
          setSimState("completed");
          // Automatically redirect to attack-viewer after 1.5 seconds!
          setTimeout(() => {
            router.push("/attack-viewer");
          }, 1500);
        }
      }, (index + 1) * 450);
    });
  };

  const resetForm = () => {
    setSimState("idle");
    setLogs([]);
    setActiveConfig(null);
  };

  return (
    <div className="relative min-h-screen bg-cyber-bg overflow-x-hidden pt-28 pb-16 flex flex-col justify-between selection:bg-electric-blue/30 selection:text-white">
      
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[40vh] bg-electric-blue/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vh] bg-cyber-cyan/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Cyber Grid Decorator */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none z-0" />
      <div className="absolute inset-0 cyber-grid-fine opacity-50 pointer-events-none z-0" />

      {/* CRT Scanline filters */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] opacity-10" />
      <div className="fixed inset-0 pointer-events-none z-50 animate-scanline bg-gradient-to-b from-transparent via-cyber-cyan/[0.012] to-transparent h-16 w-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex-grow">
        
        {/* Navigation Indicator */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-slate-400 hover:text-white uppercase mb-8 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Return to Command Base
        </Link>

        {/* Header */}
        <div className="mb-12 max-w-4xl">
          <div className="inline-flex items-center gap-2 text-cyber-cyan text-[10px] font-mono tracking-widest uppercase mb-4">
            <Terminal className="w-3.5 h-3.5 text-cyber-cyan" />
            Remediation Module: simulation-studio.exe
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Cyber Attack Simulation Studio
          </h1>
          <p className="mt-4 text-slate-400 text-sm md:text-base leading-relaxed">
            Configure custom intrusion campaigns below. Tune threat actors, exploit paths, and security detection levels to verify the resilience of your digital twin assets.
          </p>
        </div>

        {/* Main Work Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Parameter Selection Forms (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            <AnimatePresence mode="wait">
              {simState === "idle" ? (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-8"
                >
                  {/* Parameter Selection Cards */}
                  
                  {/* 1. Industry Segment */}
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">
                      [01] SELECT TARGET INDUSTRY SEGMENT
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {INDUSTRIES.map((ind) => (
                        <button
                          key={ind.id}
                          onClick={() => setIndustry(ind.id)}
                          className={`p-4 rounded-lg border text-left transition-all duration-300 relative flex flex-col justify-between cursor-pointer ${
                            industry === ind.id
                              ? "bg-electric-blue/15 border-electric-blue shadow-[0_0_15px_rgba(37,99,235,0.1)] text-white"
                              : "bg-cyber-surface/40 border-cyber-border hover:border-slate-800 text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold font-mono uppercase tracking-wider">{ind.name}</div>
                            <div className="text-[10px] opacity-60 mt-1 font-sans leading-relaxed">{ind.desc}</div>
                          </div>
                          <div className="text-[9px] font-mono text-cyber-cyan mt-3 pt-2 border-t border-cyber-border/40 w-full uppercase">
                            target: {ind.target}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Threat Actor Profile */}
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">
                      [02] SELECT THREAT ACTOR PROFILE
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {ACTORS.map((act) => (
                        <button
                          key={act.id}
                          onClick={() => setActor(act.id)}
                          className={`p-4 rounded-lg border text-left transition-all duration-300 relative flex flex-col justify-between cursor-pointer ${
                            actor === act.id
                              ? "bg-electric-blue/15 border-electric-blue shadow-[0_0_15px_rgba(37,99,235,0.1)] text-white"
                              : "bg-cyber-surface/40 border-cyber-border hover:border-slate-800 text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold font-mono uppercase tracking-wider">{act.name}</div>
                            <div className="text-[10px] opacity-60 mt-1 font-sans leading-relaxed">{act.desc}</div>
                          </div>
                          <div className="text-[9px] font-mono text-cyber-cyan mt-3 pt-2 border-t border-cyber-border/40 w-full uppercase">
                            specialty: {act.focus}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Attack Exploitation Type */}
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">
                      [03] SELECT ATTACK EXPLOIT TYPE
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {ATTACK_TYPES.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setAttack(type.id)}
                          className={`p-4 rounded-lg border text-left transition-all duration-300 relative flex flex-col justify-between cursor-pointer ${
                            attack === type.id
                              ? "bg-electric-blue/15 border-electric-blue shadow-[0_0_15px_rgba(37,99,235,0.1)] text-white"
                              : "bg-cyber-surface/40 border-cyber-border hover:border-slate-800 text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold font-mono uppercase tracking-wider">{type.name}</div>
                            <div className="text-[10px] opacity-60 mt-1 font-sans leading-relaxed">{type.desc}</div>
                          </div>
                          <div className="text-[9px] font-mono text-cyber-cyan mt-3 pt-2 border-t border-cyber-border/40 w-full uppercase">
                            technique: {type.tech}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 4. Security Mitigations Level */}
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">
                      [04] SELECT SECURITY MITIGATION LEVEL
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {SECURITY_LEVELS.map((lvl) => (
                        <button
                          key={lvl.id}
                          onClick={() => setSecurity(lvl.id)}
                          className={`p-4 rounded-lg border text-left transition-all duration-300 relative flex flex-col justify-between cursor-pointer ${
                            security === lvl.id
                              ? "bg-electric-blue/15 border-electric-blue shadow-[0_0_15px_rgba(37,99,235,0.1)] text-white"
                              : "bg-cyber-surface/40 border-cyber-border hover:border-slate-800 text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold font-mono uppercase tracking-wider">{lvl.name}</div>
                            <div className="text-[10px] opacity-60 mt-1 font-sans leading-relaxed">{lvl.desc}</div>
                          </div>
                          <div className="text-[9px] font-mono text-cyber-cyan mt-3 pt-2 border-t border-cyber-border/40 w-full uppercase">
                            {lvl.detection}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                </motion.div>
              ) : (
                /* Compile / Load Terminal Screen */
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="glassmorphism-card rounded-xl border border-cyber-border overflow-hidden glow-blue"
                >
                  {/* Console Top bar */}
                  <div className="bg-cyber-surface px-4 py-3 border-b border-cyber-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-cyan"></span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 ml-1">aegis-compiler-daemon.sh</span>
                    </div>
                    <div className="text-[9px] font-mono text-cyber-cyan border border-cyber-cyan/30 px-2 py-0.5 rounded bg-cyber-cyan/5">
                      {simState === "compiling" ? "COMPILING PROFILE..." : "PROFILE READY"}
                    </div>
                  </div>

                  {/* Console Output logs */}
                  <div className="p-6 bg-black/80 font-mono text-xs text-slate-400 min-h-[380px] flex flex-col justify-between">
                    <div className="space-y-2 overflow-y-auto max-h-[300px] pr-2">
                      {logs.map((log, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                          className="leading-relaxed text-[11px]"
                        >
                          <span className="text-slate-600 mr-2">&gt;</span>
                          {log}
                        </motion.div>
                      ))}
                      {simState === "compiling" && (
                        <div className="flex items-center gap-1.5 text-cyber-cyan text-[11px] font-bold mt-2">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          Building scenario model bindings...
                        </div>
                      )}
                    </div>

                    {simState === "completed" && activeConfig && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 p-4 rounded bg-cyber-surface/60 border border-cyber-border flex flex-col md:flex-row items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-8 h-8 text-cyber-green flex-shrink-0" />
                          <div>
                            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Campaign Profile Successfully Compiled</h4>
                            <p className="text-[10px] text-slate-500 mt-1 font-sans">
                              Scenario structured data generated. Dynamic parameters payload saved to system session memory.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={resetForm}
                            className="px-4 py-2 rounded bg-slate-900 hover:bg-slate-800 border border-cyber-border text-[10px] font-mono text-slate-300 uppercase tracking-widest transition-all duration-300"
                          >
                            Reset Form
                          </button>
                          
                          {/* Ready to route to future /attack-viewer page */}
                          <Link
                            href="/attack-viewer"
                            className="px-4 py-2 rounded bg-electric-blue hover:bg-blue-600 text-[10px] font-mono text-white uppercase tracking-widest flex items-center gap-1.5 hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all duration-300"
                          >
                            Launch Attack Viewer
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Console footer SSL info */}
                  <div className="bg-cyber-surface/70 px-4 py-2 border-t border-cyber-border text-[9px] font-mono text-slate-600 flex justify-between">
                    <div>COMPILER_NODE: build-srv-77.aegis.local</div>
                    <div className="text-cyber-green">● AUTH_SSL_ESTABLISHED</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Right Column: Scenario Setup Sidebar Summary (4 cols) */}
          <div className="lg:col-span-4">
            <div className="glassmorphism-card rounded-xl p-6 border border-cyber-border flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-8 h-8 border-b border-l border-cyber-border pointer-events-none" />

              <div className="border-b border-cyber-border/40 pb-4 mb-6">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">
                  SIMULATION PROFILE SUMMARY
                </span>
                <span className="text-[8px] font-mono text-slate-600 uppercase mt-0.5 block">
                  ACTIVE SPECIFICATION STATE
                </span>
              </div>

              {/* Selection summary items */}
              <div className="space-y-5 font-mono text-[10px]">
                
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded border border-cyber-border bg-cyber-surface/40 flex items-center justify-center flex-shrink-0 text-slate-400">
                    <Database className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-slate-500 text-[9px] uppercase">Industry Target</div>
                    <div className="text-white font-bold uppercase mt-0.5">{industry}</div>
                    <div className="text-cyber-cyan text-[8px] mt-0.5">Primary node: {INDUSTRIES.find(i => i.id === industry)?.target}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded border border-cyber-border bg-cyber-surface/40 flex items-center justify-center flex-shrink-0 text-slate-400">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-slate-500 text-[9px] uppercase">Threat Actor</div>
                    <div className="text-white font-bold uppercase mt-0.5">{actor}</div>
                    <div className="text-cyber-cyan text-[8px] mt-0.5">Focus: {ACTORS.find(a => a.id === actor)?.focus}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded border border-cyber-border bg-cyber-surface/40 flex items-center justify-center flex-shrink-0 text-slate-400">
                    <Network className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-slate-500 text-[9px] uppercase">Exploitation Vector</div>
                    <div className="text-white font-bold uppercase mt-0.5">{attack}</div>
                    <div className="text-cyber-cyan text-[8px] mt-0.5">MITRE Technique: {ATTACK_TYPES.find(t => t.id === attack)?.tech}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded border border-cyber-border bg-cyber-surface/40 flex items-center justify-center flex-shrink-0 text-slate-400">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-slate-500 text-[9px] uppercase">Defensive Hardening</div>
                    <div className="text-white font-bold uppercase mt-0.5">{security}</div>
                    <div className="text-cyber-cyan text-[8px] mt-0.5">EDR Ratio: {SECURITY_LEVELS.find(l => l.id === security)?.detection}</div>
                  </div>
                </div>

              </div>

              {simState === "idle" && (
                <div className="mt-8 border-t border-cyber-border/40 pt-6">
                  <button
                    onClick={handleGenerate}
                    className="w-full py-3.5 rounded bg-electric-blue hover:bg-blue-600 text-white font-bold font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all duration-300 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Generate Simulation
                  </button>
                  <p className="text-[8px] text-center text-slate-500 font-mono uppercase tracking-wider mt-3 leading-relaxed">
                    Triggering compiles threat parameters into a structured CampaignConfig payload package.
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* Retro-futuristic Status Info Bar */}
      <footer className="max-w-7xl mx-auto px-6 w-full text-slate-600 font-mono text-[9px] tracking-wider border-t border-cyber-border/20 pt-6 mt-12 flex justify-between items-center z-10">
        <div>NODE: simulation-studio.aegis.local</div>
        <div className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-cyber-cyan" />
          <span>STATUS: SECURE STANDBY</span>
        </div>
      </footer>

    </div>
  );
}
