"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Eye, FileText, BookOpen, Check, Lock } from "lucide-react";

interface JourneyStepperProps {
  currentStep: 1 | 2 | 3 | 4;
}

const STEPS = [
  { id: 1, label: "Build Simulation", secondary: "Simulation Builder", path: "/simulate", icon: Settings },
  { id: 2, label: "Watch The Attack", secondary: "Attack Viewer", path: "/attack-viewer", icon: Eye },
  { id: 3, label: "Understand What Happened", secondary: "AI Analyst", path: "/ai-analyst", icon: FileText },
  { id: 4, label: "Key Lessons", secondary: "Learning Journal", path: "/command-center", icon: BookOpen },
];

export default function JourneyStepper({ currentStep }: JourneyStepperProps) {
  const [maxUnlockedStep, setMaxUnlockedStep] = useState<number>(1);
  const [activeTooltipId, setActiveTooltipId] = useState<number | null>(null);

  useEffect(() => {
    const handleUpdate = () => {
      if (typeof window !== "undefined") {
        const stored = sessionStorage.getItem("sentinel_max_unlocked_step");
        if (stored) {
          setMaxUnlockedStep(parseInt(stored, 10));
        } else {
          sessionStorage.setItem("sentinel_max_unlocked_step", "1");
          setMaxUnlockedStep(1);
        }
      }
    };

    handleUpdate();
    window.addEventListener("sentinel_progress_update", handleUpdate);
    return () => {
      window.removeEventListener("sentinel_progress_update", handleUpdate);
    };
  }, []);

  const handleStepClick = (e: React.MouseEvent, stepId: number, isLocked: boolean) => {
    if (isLocked) {
      e.preventDefault();
      setActiveTooltipId(stepId);
      const timer = setTimeout(() => {
        setActiveTooltipId(prev => prev === stepId ? null : prev);
      }, 2000);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-10 px-4 print:hidden">
      <div className="glassmorphism-card rounded-xl p-4 border border-cyber-border/60 bg-cyber-surface/35 backdrop-blur-md relative overflow-hidden">
        {/* Top subtle highlight */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan/30 to-transparent" />
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 font-mono text-[9px] text-slate-500 uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-cyan"></span>
            </span>
            <span>Learning Journey Progress</span>
          </div>
          
          <div className="flex items-center gap-2 text-[9px] font-mono text-slate-400">
            <span>STEP 0{currentStep} / 04:</span>
            <span className="text-white font-bold uppercase tracking-widest flex items-center gap-1">
              {STEPS[currentStep - 1].label}
              <span className="text-slate-500 font-normal lowercase font-sans">({STEPS[currentStep - 1].secondary})</span>
            </span>
          </div>
        </div>

        {/* Stepper Steps Row */}
        <div className="relative mt-5 flex items-center justify-between gap-2">
          {/* Connector Line behind steps */}
          <div className="absolute left-6 right-6 top-[22px] h-[1.5px] bg-slate-900 z-0" />
          
          {/* Animated active path length connector */}
          <div className="absolute left-6 right-6 top-[22px] h-[1.5px] z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-cyber-cyan via-blue-500 to-cyber-green"
              initial={{ width: 0 }}
              animate={{ 
                width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` 
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </div>

          {STEPS.map((step) => {
            const Icon = step.icon;
            const isCompleted = step.id < currentStep;
            const isActive = step.id === currentStep;
            const isLocked = step.id > maxUnlockedStep;

            return (
              <div key={step.id} className="relative z-10 flex-1 flex flex-col items-center group">
                {/* Tooltip */}
                <AnimatePresence>
                  {activeTooltipId === step.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute bottom-14 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap bg-black/95 border border-cyber-red/50 text-cyber-red px-3 py-1.5 rounded text-[10px] font-mono shadow-[0_0_10px_rgba(244,63,94,0.25)]"
                    >
                      Complete the previous step first.
                      {/* Tooltip Arrow */}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black border-r border-b border-cyber-red/50 rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <Link
                  href={step.path}
                  onClick={(e) => handleStepClick(e, step.id, isLocked)}
                  className={`relative flex items-center justify-center w-11 h-11 rounded-lg border transition-all duration-300 ${
                    isActive
                      ? "bg-black border-cyber-cyan text-cyber-cyan shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-110"
                      : isCompleted
                      ? "bg-cyber-surface/80 border-cyber-green/50 text-cyber-green hover:border-cyber-green"
                      : isLocked
                      ? "bg-black/20 border-slate-950 text-slate-700 opacity-40 cursor-not-allowed"
                      : "bg-black/60 border-slate-900 text-slate-400 hover:border-slate-800"
                  }`}
                >
                  {isLocked ? (
                    <Lock className="w-4 h-4 text-slate-600" />
                  ) : isCompleted ? (
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </Link>

                <span
                  className={`hidden md:flex flex-col items-center text-[9px] font-mono font-bold uppercase tracking-wider mt-2.5 transition-colors duration-300 ${
                    isActive
                      ? "text-cyber-cyan"
                      : isCompleted
                      ? "text-cyber-green"
                      : isLocked
                      ? "text-slate-700 opacity-40"
                      : "text-slate-500"
                  }`}
                >
                  <span className="text-center">{step.label}</span>
                  <span className="text-slate-500 text-[8px] font-normal lowercase tracking-wide mt-0.5">({step.secondary})</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
