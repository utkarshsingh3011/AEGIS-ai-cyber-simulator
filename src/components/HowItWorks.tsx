"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Puzzle, Play, Brain, Shield, Layers } from "lucide-react";

const STEPS = [
  {
    id: 1,
    num: "1",
    title: "Choose or Build a Scenario",
    desc: "Select a ready-made scenario or create your own in the builder.",
    icon: Puzzle,
  },
  {
    id: 2,
    num: "2",
    title: "Run the Simulation",
    desc: "Watch the attack unfold step-by-step in a visual environment.",
    icon: Play,
  },
  {
    id: 3,
    num: "3",
    title: "Analyze & Understand",
    desc: "Review logs, insights, and AI-powered analysis to understand what happened.",
    icon: Brain,
  },
  {
    id: 4,
    num: "4",
    title: "Learn & Improve",
    desc: "Apply knowledge, explore best practices, and strengthen your defenses.",
    icon: Shield,
  },
];

const ArrowConnector = () => (
  <>
    {/* Desktop Horizontal Dashed Arrow */}
    <div className="hidden lg:flex items-center justify-center shrink-0 w-6">
      <svg width="24" height="12" viewBox="0 0 24 12" fill="none" className="text-cyber-cyan/35">
        <path
          d="M0 6H22M22 6L17 1M22 6L17 11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
    {/* Mobile Vertical Dashed Arrow */}
    <div className="flex lg:hidden items-center justify-center my-2 text-cyber-cyan/35">
      <svg width="12" height="24" viewBox="0 0 12 24" fill="none">
        <path
          d="M6 0V22M6 22L1 17M6 22L11 17"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </>
);

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section id="workflow" className="relative py-28 bg-cyber-surface/30 overflow-hidden border-t border-cyber-border/40">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[50vw] h-[40vh] bg-electric-blue/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-cyber-cyan text-[10px] font-mono tracking-widest uppercase mb-4">
            <Layers className="w-3.5 h-3.5 text-cyber-cyan" />
            Execution Guide
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-sans">
            How SENTINEL Works
          </h2>
          <div className="mt-4 space-y-1">
            <p className="text-slate-200 text-sm md:text-base font-semibold leading-relaxed font-sans">
              Experience cybersecurity the right way — build, simulate, analyze, and strengthen.
            </p>
            <p className="text-slate-400 text-xs md:text-sm font-medium font-sans">
              A simple four-step journey to learn by doing.
            </p>
          </div>
        </div>

        {/* 4-Step Connected Timeline */}
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-4 max-w-6xl mx-auto mt-16">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;

            return (
              <React.Fragment key={step.id}>
                {/* Step Card */}
                <motion.div
                  whileHover={{ y: -4 }}
                  onClick={() => setActiveStep(step.id)}
                  className={`relative w-full max-w-[280px] lg:flex-1 p-6 pt-10 rounded-xl border text-center transition-all duration-300 cursor-pointer flex flex-col items-center justify-start min-h-[220px] select-none ${
                    isActive
                      ? "bg-cyber-surface border-cyber-cyan shadow-[0_0_25px_rgba(6,182,212,0.08)] outline outline-1 outline-cyber-cyan/40"
                      : "bg-black/35 border-cyber-border/30 hover:border-slate-800"
                  }`}
                >
                  {/* Step Number Badge */}
                  <div
                    className={`absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 ${
                      isActive
                        ? "bg-cyber-cyan text-black font-extrabold shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                        : "bg-slate-900 border border-cyber-border text-slate-400"
                    }`}
                  >
                    {step.num}
                  </div>

                  {/* Step Icon */}
                  <div className={`p-3.5 rounded-lg bg-cyber-surface border flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? "border-cyber-cyan/50 text-cyber-cyan shadow-[0_0_15px_rgba(6,182,212,0.1)]" 
                      : "border-cyber-border/40 text-slate-400"
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Step Title */}
                  <h3 className={`text-sm font-bold mt-5 tracking-tight transition-colors duration-300 ${
                    isActive ? "text-white" : "text-slate-200"
                  }`}>
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="mt-3 text-xs text-slate-450 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </motion.div>

                {/* Dashed Connector (only between cards) */}
                {idx < STEPS.length - 1 && <ArrowConnector />}
              </React.Fragment>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
