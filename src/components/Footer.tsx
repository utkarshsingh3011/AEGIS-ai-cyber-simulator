import Link from "next/link";
export default function Footer() {
    return (
        <footer className="relative bg-black border-t border-cyber-border/40 py-16 z-10 overflow-hidden">

            {/* Top Glow Line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan/40 to-transparent" />

            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.03),transparent_70%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6">

                <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_0.8fr] gap-12 items-start">

                    {/* Brand Section */}
                    <div>
                        <h3 className="text-white font-bold tracking-[0.3em] text-sm uppercase">
                            Sentinel
                        </h3>

                        <p className="text-slate-400 text-xs mt-5 leading-relaxed max-w-sm">
                            Sentinel transforms complex cyber attack chains into visual,
                            interactive simulations. Designed for students, educators,
                            and security enthusiasts, it provides a safe environment to
                            explore attacker behavior, defensive controls, and security
                            decision-making.
                        </p>

                        <div className="mt-5">
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest">
                                Learn • Simulate • Defend
                            </div>
                        </div>
                    </div>

                    {/* Status Section */}
                    <div className="flex flex-col items-start lg:items-center justify-center gap-4">

                        <div className="flex items-center gap-3">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyber-green"></span>
                            </span>

                            <span className="text-slate-300 text-xs uppercase tracking-widest">
                                Platform Status
                            </span>
                        </div>

                        <div className="text-center text-[11px] text-slate-500 leading-relaxed">
                            Attack Simulations Ready
                            <br />
                            Threat Reports Available
                            <br />
                            Educational Sandbox Active
                        </div>

                    </div>

                    {/* Navigation */}
                    <div className="flex flex-col lg:items-end gap-4 text-[10px] uppercase tracking-widest">

                        <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-3">
                            Resources
                        </h4>

                        <Link
                            href="/about"
                            className="hover:text-cyber-cyan transition-colors"
                        >
                            About Project
                        </Link>

                        <a
                            href="https://github.com/utkarshsingh3011/SENTINEL"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-cyber-cyan transition-colors"
                        >
                            Source Code
                        </a>

                        <Link
                            href="/about#tech-stack"
                            className="hover:text-cyber-cyan transition-colors"
                        >
                            Technology Stack
                        </Link>

                        <a
                            href="https://www.linkedin.com/in/utkarshsingh3011"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-cyber-cyan transition-colors"
                        >
                            Connect
                        </a>

                    </div>

                </div>

                {/* Divider */}
                <div className="mt-10 h-px bg-gradient-to-r from-transparent via-cyber-border/50 to-transparent" />

                {/* Bottom Bar */}
                <div className="mt-6 flex flex-wrap justify-center items-center gap-3 text-center">

                    <span className="text-[10px] text-slate-600 uppercase tracking-widest">
                        © {new Date().getFullYear()} Sentinel
                    </span>

                    <span className="text-slate-700">•</span>

                    <span className="text-[10px] text-slate-600 uppercase tracking-widest">
                        Educational Cybersecurity Simulation Platform
                    </span>

                    <span className="text-slate-700">•</span>

                    <span className="text-[10px] text-cyber-cyan uppercase tracking-widest">
                        Built With Next.js & TypeScript
                    </span>

                </div>

            </div>
        </footer>
    );
}