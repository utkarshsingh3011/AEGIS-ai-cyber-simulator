import React from "react";
import Header from "../components/Header";
import CyberBackground from "../components/CyberBackground";
import Hero from "../components/Hero";
import ThreatEmergence from "../components/ThreatEmergence";
import HowItWorks from "../components/HowItWorks";
import SimulationPreview from "../components/SimulationPreview";
import Features from "../components/Features";
import CTA from "../components/CTA";
import ScrollReveal from "../components/ScrollReveal";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-electric-blue/30 selection:text-white">
      {/* Immersive animated background */}
      <CyberBackground />

      {/* Sticky Header Navigation */}
      <Header />

      {/* Main Page Content */}
      <main className="flex-grow">
        {/* Fullscreen Hero (handled its own scroll transitions internally) */}
        <Hero />

        {/* Scroll-revealed Threat Vector Flow */}
        <ScrollReveal delay={0.15}>
          <ThreatEmergence />
        </ScrollReveal>

        {/* How AEGIS Works */}
        <ScrollReveal delay={0.15}>
          <HowItWorks />
        </ScrollReveal>

        {/* Timeline Simulation Player */}
        <ScrollReveal delay={0.15}>
          <SimulationPreview />
        </ScrollReveal>

        {/* Modular Feature Subsystems */}
        <ScrollReveal delay={0.15}>
          <Features />
        </ScrollReveal>

        {/* Tactical Signup Terminal CTA */}
        <ScrollReveal delay={0.15}>
          <CTA />
        </ScrollReveal>
      </main>

      {/* Futuristic Command Center Footer */}
      <footer className="relative bg-black border-t border-cyber-border/40 py-12 z-10 overflow-hidden">
        {/* Decorative Grid Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-slate-500 font-mono text-[10px] tracking-wider">
          
          {/* Brand copyright */}
          <div className="md:col-span-4 flex flex-col gap-1 text-left">
            <span className="text-white font-bold tracking-[0.2em] uppercase">AEGIS PLATFORM</span>
            <span>© {new Date().getFullYear()} AEGIS Cyber Inc. All rights reserved.</span>
            <span className="text-slate-600 uppercase text-[8px] mt-1">
              SECURE DEPLOYMENT NODE: REG-49.882.A
            </span>
          </div>

          {/* Platform status indicator */}
          <div className="md:col-span-4 flex justify-start md:justify-center items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-green"></span>
            </span>
            <span className="text-slate-400 uppercase">SYS_TELEMETRY: ALL SERVICES OPERATIONAL</span>
          </div>

          {/* Minimal links */}
          <div className="md:col-span-4 flex justify-start md:justify-end gap-6 text-[9px] uppercase">
            <a href="#threats" className="hover:text-cyber-cyan transition-colors">THREAT_LOGS</a>
            <a href="#workflow" className="hover:text-cyber-cyan transition-colors">SECURITY_POLICY</a>
            <a href="#preview" className="hover:text-cyber-cyan transition-colors">TERMINAL_KEYS</a>
          </div>

        </div>
      </footer>
    </div>
  );
}
