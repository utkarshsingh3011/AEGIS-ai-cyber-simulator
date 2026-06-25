import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-cyber-border/40 py-12 z-10 overflow-hidden font-sans">
      {/* Top Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan/30 to-transparent" />

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.02),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Section */}
          <div className="md:col-span-7 space-y-4">
            <h3 className="text-white font-bold tracking-[0.3em] text-sm uppercase font-mono">
              SENTINEL
            </h3>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
              Interactive Cybersecurity Learning Platform
            </p>
            <p className="text-slate-500 text-xs leading-relaxed max-w-md">
              Helping students understand cyber attacks through safe, visual simulations.
            </p>
            <div className="text-[10px] text-cyber-cyan font-mono uppercase tracking-widest font-bold">
              Learn • Simulate • Defend
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-5 space-y-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] font-mono">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              <li>
                <Link href="/" className="text-slate-400 hover:text-cyber-cyan transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-cyber-cyan transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/utkarshsingh3011/SENTINEL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyber-cyan transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/utkarshsingh3011"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyber-cyan transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 h-px bg-gradient-to-r from-transparent via-cyber-border/30 to-transparent" />

        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-[10px] text-slate-500 font-mono tracking-wider">
          <div>
            &copy; 2026 Sentinel
          </div>
          <div className="uppercase">
            Designed and developed as an educational cybersecurity project.
          </div>
        </div>
      </div>
    </footer>
  );
}