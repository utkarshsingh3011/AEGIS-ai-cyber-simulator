"use client";

import React from "react";
import { Bot, Play, BarChart3, BookOpen, Cpu, ArrowUpRight, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

const FEATURES = [
  {
    id: "attack-sims",
    title: "Attack Simulations",
    desc: "Watch interactive, step-by-step attack simulations.",
    icon: Play,
    glowColor: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
    borderColor: "hover:border-cyan-500/50",
    badge: "Interactive Playback",
    widget: (
      <div className="mt-4 p-3 bg-black/40 rounded border border-cyber-border font-mono text-[9px] text-slate-400 space-y-2">
        <div className="flex justify-between text-[8px] text-slate-500">
          <span>ATTACK SIMULATION</span>
          <span className="text-cyber-cyan animate-pulse">PLAYBACK ACTIVE</span>
        </div>
        <div className="w-full bg-slate-900 h-1 rounded overflow-hidden relative">
          <div className="bg-cyber-cyan h-full w-[65%]" />
          <div className="absolute left-[65%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_5px_#fff]" />
        </div>
        <div className="text-center text-slate-350 text-[8px]">Step 3 of 4: Lateral Movement to Central Server</div>
      </div>
    ),
  },
  {
    id: "security-insights",
    title: "Security Insights",
    desc: "Analyze logs, risk scores, and security findings.",
    icon: BarChart3,
    glowColor: "group-hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]",
    borderColor: "hover:border-rose-500/50",
    badge: "Risk Analysis",
    widget: (
      <div className="mt-4 p-3 bg-black/40 rounded border border-cyber-border font-mono text-[9px] text-slate-400 space-y-1.5">
        <div className="text-[8px] text-slate-500">SECURITY INSIGHTS LOG</div>
        <div className="flex justify-between items-center text-slate-300">
          <span>Overall Security Level</span>
          <span className="text-cyber-cyan font-bold">Standard</span>
        </div>
        <div className="flex justify-between items-center text-slate-300">
          <span>Identified Vulnerabilities</span>
          <span className="text-amber-500 font-bold">2 At Risk</span>
        </div>
      </div>
    ),
  },
  {
    id: "simulation-builder",
    title: "Simulation Builder",
    desc: "Create custom scenarios and configure environments.",
    icon: Bot,
    glowColor: "group-hover:shadow-[0_0_30px_rgba(37,99,235,0.15)]",
    borderColor: "hover:border-blue-500/50",
    badge: "Scenario Setup",
    widget: (
      <div className="mt-4 p-3 bg-black/40 rounded border border-cyber-border font-mono text-[9px] text-slate-400 space-y-1">
        <div className="text-[8px] text-slate-500">{"// SCENARIO CONFIG"}</div>
        <div className="text-white">&quot;Custom Spear-Phishing Campaign&quot;</div>
        <div className="text-[8px] text-slate-500 mt-2">{"// TARGET SYSTEM"}</div>
        <div className="text-cyber-cyan">✓ Hospital EMR Network selected</div>
      </div>
    ),
  },
  {
    id: "modules",
    title: "Modules",
    desc: "Learn cybersecurity concepts through structured lessons.",
    icon: BookOpen,
    glowColor: "group-hover:shadow-[0_0_30px_rgba(10,185,129,0.15)]",
    borderColor: "hover:border-emerald-500/50",
    badge: "Educational Content",
    widget: (
      <div className="mt-4 p-3 bg-black/40 rounded border border-cyber-border font-mono text-[9px] text-slate-400 flex justify-between items-center gap-2">
        <div className="space-y-0.5">
          <div className="text-[8px] text-slate-500">ACTIVE LESSON</div>
          <div className="text-white font-bold text-[10px]">
            Lesson 1: Phishing Basics
          </div>
        </div>
        <div className="px-2 py-0.5 rounded bg-cyber-green/5 border border-cyber-green/30 text-cyber-green font-bold text-[8px]">
          Completed
        </div>
      </div>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function Features() {
  return (
    <section id="features" className="relative py-28 bg-cyber-surface/10 overflow-hidden border-t border-cyber-border/40">
      {/* Background gradients */}
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vh] bg-cyber-cyan/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Core Educational Modules */}
        <div>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <div className="inline-flex items-center gap-2 text-cyber-cyan text-[10px] font-mono tracking-widest uppercase mb-4">
              <Cpu className="w-3.5 h-3.5 text-cyber-cyan" />
              Platform Modules
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Core Modules
            </h2>
            <p className="mt-4 text-slate-400 text-sm md:text-base leading-relaxed">
              SENTINEL provides four core modules designed to help you build, run, analyze, and learn from interactive cybersecurity simulations.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {FEATURES.map((feat) => {
              const Icon = feat.icon;

              return (
                <motion.div
                  key={feat.id}
                  variants={cardVariants}
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
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* What You Can Learn Section */}
        <div className="mt-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 text-cyber-cyan text-[10px] font-mono tracking-widest uppercase mb-4">
              <ShieldAlert className="w-3.5 h-3.5 text-cyber-cyan" />
              Educational Curriculum
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              What You Can Learn
            </h2>
            <p className="mt-4 text-slate-400 text-sm md:text-base leading-relaxed">
              Explore hands-on concepts that model cybersecurity attacks and defensive policies in a safe, educational environment.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                title: "Attack Simulation Basics",
                desc: "Learn how attacks are structured and executed.",
                topic: "Simulations",
              },
              {
                title: "Network & System Security",
                desc: "Understand networks, systems, and common vulnerabilities.",
                topic: "Infrastructure",
              },
              {
                title: "Threat Techniques",
                desc: "Explore attacker methods and tactics.",
                topic: "Attacks",
              },
              {
                title: "Defensive Measures",
                desc: "Learn how to detect, respond, and defend.",
                topic: "Defense",
              },
              {
                title: "Security Analysis",
                desc: "Review logs, insights, and risk assessments.",
                topic: "Analysis",
              },
              {
                title: "Best Practices",
                desc: "Build strong security habits and awareness.",
                topic: "Prevention",
              },
            ].map((learn, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                className="bg-black/30 border border-cyber-border rounded-xl p-5 hover:border-cyber-cyan/30 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 px-2 py-0.5 bg-cyber-cyan/10 border-b border-l border-cyber-cyan/20 rounded-bl text-[8px] font-mono text-cyber-cyan uppercase font-bold">
                  {learn.topic}
                </div>
                <h3 className="text-white text-sm font-bold uppercase font-mono tracking-wider mb-2">
                  {learn.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {learn.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
