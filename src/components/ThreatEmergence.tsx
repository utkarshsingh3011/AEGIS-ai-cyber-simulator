"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Globe, ShieldAlert, Database, ServerCrash, ChevronRight, Activity } from "lucide-react";

const STAGES = [
  {
    id: 1,
    title: "Initial Compromise",
    desc: "Attackers establish a foothold using targeted vectors. Commonly initiated via weaponized email packages, watering holes, or supply chain poisoning.",
    tech: "MITRE ATT&CK T1566 | Phishing",
    icon: Globe,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Perimeter Bypass",
    desc: "Bypassing boundary defense checks, firewalls, and network address translations by piggybacking on authorized session tokens or credentials.",
    tech: "MITRE ATT&CK T1078 | Valid Accounts",
    icon: ShieldAlert,
    color: "from-cyan-500 to-yellow-500",
  },
  {
    id: 3,
    title: "Lateral Movement",
    desc: "The payload propagates across local subnets, compromising domain systems, local endpoints, and looking for sensitive directory services.",
    tech: "MITRE ATT&CK T1021 | Remote Services",
    icon: Database,
    color: "from-yellow-500 to-rose-500",
  },
  {
    id: 4,
    title: "Exfiltration & Impact",
    desc: "Critical database structures are reached, archive compression begins, and data is transmitted out of band, triggering payload locking phases.",
    tech: "MITRE ATT&CK T1048 | Exfiltration Over Port",
    icon: ServerCrash,
    color: "from-rose-500 to-red-600",
  },
];

export default function ThreatEmergence() {
  const [activeStage, setActiveStage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Set up scroll hooks bound to the section container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Animate path drawing length along the scroll progress
  const pathLength = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  // Dynamically highlight active stage according to scroll percentage
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.22) {
      setActiveStage(1);
    } else if (latest < 0.48) {
      setActiveStage(2);
    } else if (latest < 0.74) {
      setActiveStage(3);
    } else {
      setActiveStage(4);
    }
  });

  return (
    <section 
      id="threats" 
      ref={containerRef}
      className="relative py-28 bg-cyber-bg overflow-hidden border-t border-cyber-border/40"
    >
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[50vw] h-[50vh] bg-cyber-red/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 text-cyber-red text-[10px] font-mono tracking-widest uppercase mb-4">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            Threat Evolution Chain
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            How Cyber Attacks Emerge In The Real World
          </h2>
          <p className="mt-4 text-slate-400 text-sm md:text-base leading-relaxed">
            Modern campaigns do not strike instantly. Scroll down to see the threat propagation path unfold dynamically through progressive security boundaries.
          </p>
        </div>

        {/* Interactive Simulation Flow Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Stage Details Column */}
          <div className="lg:col-span-5 space-y-4">
            {STAGES.map((stage) => {
              const Icon = stage.icon;
              const isActive = activeStage === stage.id;
              
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(stage.id)}
                  className={`w-full text-left p-6 rounded-lg border transition-all duration-300 flex items-start gap-4 cursor-pointer ${
                    isActive
                      ? "bg-cyber-surface/90 border-cyber-border-active/60 shadow-[0_0_20px_rgba(37,99,235,0.06)]"
                      : "bg-cyber-surface/30 border-cyber-border/30 hover:border-slate-800"
                  }`}
                >
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${stage.color} bg-opacity-20 text-white flex-shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-500">STAGE 0{stage.id}</span>
                      <ChevronRight className="w-3 h-3 text-slate-600" />
                      <span className="text-[10px] font-mono text-cyber-cyan">{stage.tech}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1">{stage.title}</h3>
                    
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: isActive ? "auto" : 0, 
                        opacity: isActive ? 1 : 0 
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                        {stage.desc}
                      </p>
                    </motion.div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive SVG Diagram Column */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-[600px] h-[420px] glassmorphism-card rounded-xl p-6 relative flex flex-col justify-between overflow-hidden border border-cyber-border shadow-[0_0_30px_rgba(244,63,94,0.02)]">
              {/* Overlay grid inside map */}
              <div className="absolute inset-0 cyber-grid-fine opacity-20 pointer-events-none" />

              <div className="flex justify-between items-center border-b border-cyber-border/40 pb-3 mb-4">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-red opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyber-red"></span>
                  </span>
                  Vector Propagation Path (SCROLL DRIVEN)
                </span>
                <span className="text-[9px] font-mono text-slate-400 border border-cyber-border px-1.5 py-0.5 rounded">
                  MODEL ACTIVE
                </span>
              </div>

              {/* Graphic container */}
              <div className="relative flex-grow flex items-center justify-between px-10">
                {/* SVG connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: "visible" }}>
                  {/* Base path background */}
                  <path
                    d="M 50,210 C 150,110 250,310 350,210 C 450,110 500,210 550,210"
                    fill="none"
                    stroke="rgba(30, 41, 59, 0.4)"
                    strokeWidth="2.5"
                  />
                  {/* Scroll-driven dynamic path draw */}
                  <motion.path
                    d="M 50,210 C 150,110 250,310 350,210 C 450,110 500,210 550,210"
                    fill="none"
                    stroke="url(#attackGradient)"
                    strokeWidth="3.5"
                    style={{ pathLength }}
                    strokeLinecap="round"
                  />
                  {/* Running dash line on top of path for active look */}
                  <motion.path
                    d="M 50,210 C 150,110 250,310 350,210 C 450,110 500,210 550,210"
                    fill="none"
                    stroke="rgba(255,255,255,0.7)"
                    strokeWidth="1.5"
                    strokeDasharray="8, 12"
                    animate={{
                      strokeDashoffset: [0, -40],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "linear",
                    }}
                  />
                  <defs>
                    <linearGradient id="attackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="35%" stopColor="#06b6d4" />
                      <stop offset="70%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#f43f5e" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Interactive diagram nodes */}
                {STAGES.map((stage) => {
                  const Icon = stage.icon;
                  const isActive = activeStage >= stage.id;
                  const isCurrent = activeStage === stage.id;

                  // Define absolute positions relative to parent mapping for clean alignment
                  const getPosition = (id: number) => {
                    switch (id) {
                      case 1: return "left-[5%] top-[45%]";
                      case 2: return "left-[32%] top-[17%]";
                      case 3: return "left-[60%] top-[68%]";
                      case 4: return "left-[85%] top-[45%]";
                      default: return "";
                    }
                  };

                  return (
                    <div
                      key={stage.id}
                      onClick={() => setActiveStage(stage.id)}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer ${getPosition(
                        stage.id
                      )}`}
                    >
                      <div className="relative group">
                        {/* Node status rings */}
                        <motion.div
                          animate={isCurrent ? { scale: [1, 1.4, 1] } : {}}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className={`absolute -inset-2.5 rounded-full blur-[4px] opacity-40 transition-colors duration-300 ${
                            isCurrent
                              ? stage.id === 4 ? "bg-cyber-red" : "bg-cyber-cyan"
                              : isActive
                              ? "bg-slate-700"
                              : "bg-transparent"
                          }`}
                        />
                        
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                            isCurrent
                              ? "bg-black border-cyber-cyan text-cyber-cyan shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                              : isActive
                              ? "bg-cyber-surface border-slate-700 text-slate-300"
                              : "bg-slate-950 border-slate-900 text-slate-600"
                          }`}
                        >
                          <Icon className="w-5.5 h-5.5" />
                        </div>

                        {/* Text labels below icons */}
                        <div className="absolute top-14 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                          <span className={`text-[9px] font-mono font-bold tracking-wider block ${
                            isCurrent ? "text-white" : isActive ? "text-slate-400" : "text-slate-600"
                          }`}>
                            STAGE 0{stage.id}
                          </span>
                          <span className={`text-[8px] font-mono block mt-0.5 ${
                            isCurrent ? "text-cyber-cyan font-semibold" : "text-slate-500"
                          }`}>
                            {stage.title.split(" ")[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Console logs output */}
              <div className="bg-black/60 border border-cyber-border/40 p-3 rounded font-mono text-[9px] text-slate-400 mt-4 flex items-center justify-between">
                <div>
                  <span className="text-cyber-cyan mr-1.5">[MONITOR]</span>
                  {activeStage === 1 && "Ingress points scanned. Weaponized email headers matching payload signature."}
                  {activeStage === 2 && "Firewall bypassed via administrative token theft. Active session leveraged."}
                  {activeStage === 3 && "WMI execution detected on remote nodes. Active Directory query complete."}
                  {activeStage === 4 && "System lockout payload initialized. File entropy threshold exceeded."}
                </div>
                <div className={`font-semibold ${activeStage === 4 ? "text-cyber-red" : "text-cyber-cyan"}`}>
                  {activeStage === 4 ? "BREACHED" : "INTEGRATED"}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
