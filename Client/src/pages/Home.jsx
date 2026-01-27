import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowRight, Code2, Cpu, Globe, Zap, Users, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-text flex flex-col">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-secondary/5 rounded-full blur-[100px] -z-10" />

        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-secondary mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            v2.0 is now live
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-tight">
            Code together, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              ship faster.
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            The real-time collaborative IDE for teams. Write, debug, and deploy code in the browser with AI-powered assistance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

            {/* PRIMARY BUTTON: Leads to Account Creation */}
            <Link
              to="/signup"
              className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
            >
              Start Coding Free <ArrowRight size={20} />
            </Link>

            {/* SECONDARY BUTTON: Leads to Playground (No Login) */}
            <Link
              to="/editor/demo-playground"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold text-lg transition-all"
            >
              View Demo
            </Link>

          </div>

          {/* Hero Image / Code Window Replacement */}
          <div className="mt-20 relative max-w-4xl mx-auto">

            {/* Abstract Glow behind the window */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-30 animate-pulse"></div>

            {/* The Main Window */}
            <div className="relative bg-[#0a0a0f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-left font-mono">

              {/* Window Header (Mac Style) */}
              <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <div className="ml-4 text-xs text-gray-500 font-medium">main.js — DevNexus</div>
              </div>

              {/* Code Content */}
              <div className="p-6 md:p-8 text-sm md:text-base leading-relaxed overflow-x-auto">
                <div className="flex">
                  <div className="text-gray-600 select-none text-right pr-4 border-r border-white/10 mr-4">
                    1<br />2<br />3<br />4<br />5<br />6<br />7
                  </div>
                  <div className="text-gray-300">
                    <p>
                      <span className="text-pink-500">import</span> <span className="text-cyan-400">{`{ io }`}</span> <span className="text-pink-500">from</span> <span className="text-green-400">'socket.io-client'</span>;
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <span className="text-purple-400">const</span> socket = <span className="text-blue-400">io</span>(<span className="text-green-400">'https://api.devnexus.com'</span>);
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <span className="text-gray-500">// Initialize real-time collaboration</span>
                    </p>
                    <p>
                      socket.<span className="text-blue-400">on</span>(<span className="text-green-400">'connect'</span>, () <span className="text-pink-500">=&gt;</span> <span className="text-yellow-400">{`{`}</span>
                    </p>
                    <p className="pl-4">
                      console.<span className="text-blue-400">log</span>(<span className="text-green-400">"Connected to Room: "</span> + roomId);
                    </p>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">{'}'}</span>);
                      {/* Blinking Cursor */}
                      <span className="w-2 h-5 bg-primary animate-pulse ml-1"></span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-10 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <Stat number="10k+" label="Active Developers" />
          <Stat number="500k+" label="Lines of Code" />
          <Stat number="99.9%" label="Uptime" />
          <Stat number="0ms" label="Latency (Local)" />
        </div>
      </section>

      {/* 3. FEATURES GRID */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Everything you need to build.</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Stop wrestling with environment setup. DevNexus gives you a powerful cloud environment instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap size={32} className="text-yellow-400" />}
              title="Lightning Fast"
              desc="Powered by Rust-based tooling for millisecond response times."
            />
            <FeatureCard
              icon={<Users size={32} className="text-blue-400" />}
              title="Real-time Collab"
              desc="See your team's cursors and edits as they happen, zero lag."
            />
            <FeatureCard
              icon={<Cpu size={32} className="text-purple-400" />}
              title="AI Powered"
              desc="Built-in Gemini assistant to refactor code and fix bugs instantly."
            />
            <FeatureCard
              icon={<Globe size={32} className="text-green-400" />}
              title="Cloud Environment"
              desc="Access your workspace from any device, anywhere in the world."
            />
            <FeatureCard
              icon={<Shield size={32} className="text-red-400" />}
              title="Enterprise Secure"
              desc="End-to-end encryption ensures your code stays your code."
            />
            <FeatureCard
              icon={<Code2 size={32} className="text-primary" />}
              title="Multi-Language"
              desc="Support for JS, Python, Rust, Go, and C++ out of the box."
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Helper Components for clean code
const Stat = ({ number, label }) => (
  <div>
    <h3 className="text-3xl font-bold text-white mb-1">{number}</h3>
    <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{label}</p>
  </div>
);

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 rounded-3xl bg-surface border border-white/5 hover:border-primary/30 transition-all hover:translate-y-[-5px] group">
    <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit group-hover:bg-primary/10 transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{desc}</p>
  </div>
);

export default Home;