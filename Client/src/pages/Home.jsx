import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Users, Shield, Activity, Layers, Globe, Cpu } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePrimaryAction = () => {
    if (user) navigate('/dashboard');
    else navigate('/signup');
  };

  return (
    <div className="relative min-h-screen bg-[#050507] text-gray-300 flex flex-col selection:bg-cyan-500/30 overflow-x-hidden">
      <Navbar />

      {/* 1. HERO SECTION (Y-AXIS ALIGNED) */}
      <section className="relative flex-grow flex items-center pt-24 pb-20 px-6 min-h-[90vh]">
        {/* Subtle Tech Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10 w-full">
          
          {/* LEFT CONTENT */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-10">
            <div>
              
              <h1 className="text-7xl md:text-8xl font-black text-white tracking-[-0.06em] leading-[0.8] uppercase italic">
                Code <br />
                <span className="text-cyan-400">Beyond</span> <br />
                Limits.
              </h1>
            </div>

            <div className="space-y-6 border-l-2 border-cyan-500/30 pl-6">
              <p className="text-sm font-bold uppercase tracking-widest text-gray-400 max-w-xs leading-relaxed">
                Next-gen collaborative engine for distributed engineering teams.
              </p>
              <div className="flex gap-8">
                 <div className="flex flex-col">
                    <span className="text-white font-black text-2xl italic tabular-nums">0.02ms</span>
                    <span className="text-[8px] text-gray-600 font-bold uppercase tracking-[0.2em]">Sync Latency</span>
                 </div>
                 <div className="flex flex-col border-l border-white/10 pl-6">
                    <span className="text-white font-black text-2xl italic tabular-nums">24/7</span>
                    <span className="text-[8px] text-gray-600 font-bold uppercase tracking-[0.2em]">AI Pair Pilot</span>
                 </div>
              </div>
            </div>

            <div className="pt-2">
              <button 
                onClick={handlePrimaryAction} 
                className="group px-10 py-5 mt-7 bg-white text-black hover:bg-cyan-500 transition-all rounded-sm font-black uppercase text-[10px] tracking-[0.3em] flex items-center gap-4 shadow-xl active:scale-95"
              >
                {user ? 'Open Dashboard' : 'Initialize Instance'}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* RIGHT VISUAL HUB */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            <div className="absolute -inset-20 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="relative w-full rounded-xl border border-white/10 bg-[#0a0a0f] shadow-2xl overflow-hidden transform lg:rotate-2 hover:rotate-0 transition-transform duration-700">
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-white/10" /><div className="w-2 h-2 rounded-full bg-white/10" /></div>
                <div className="text-[8px] font-black text-gray-600 tracking-[0.4em] uppercase font-mono">Session: Nexus_01</div>
              </div>
              <div className="p-10 grid grid-cols-12 gap-8 h-[400px]">
                <div className="col-span-8 font-mono text-xs space-y-3">
                  <div className="flex gap-4"><span className="text-gray-800">01</span><span className="text-cyan-500/80 font-bold">initializing_core()</span></div>
                  <div className="flex gap-4"><span className="text-gray-800">02</span><span className="text-emerald-400">// peering encrypted...</span></div>
                  <div className="mt-16 h-24 w-full bg-cyan-500/5 border border-cyan-500/10 rounded-lg animate-pulse" />
                </div>
                <div className="col-span-4 border-l border-white/5 pl-8 flex flex-col justify-between py-2">
                  <div className="space-y-6">
                    <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden"><div className="h-full w-2/3 bg-cyan-500 shadow-[0_0_8px_cyan]" /></div>
                    <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden"><div className="h-full w-1/3 bg-blue-500" /></div>
                  </div>
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg text-center font-black text-[7px] text-gray-600 tracking-tighter">LIVE_DATA_FEED</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS / LOGO CLOUD */}
      <section className="py-12 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center gap-10 text-[9px] font-black uppercase tracking-[0.4em] text-gray-600">
          <span>Gemini-1.5 AI</span><span>Docker Containers</span><span>Socket.IO v4</span><span>Edge Clusters</span>
        </div>
      </section>

      {/* 3. FEATURE CARDS (THE RESTORED BENTO GRID) */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-24">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic">Engineered <br/>for Speed.</h2>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-[0.2em]">Deploy global scale architecture instantly.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            <FeatureCard 
              span="md:col-span-3"
              icon={<Zap size={22} />}
              title="Instant Spawning"
              desc="Full-stack containers initialized in < 2s. Support for Node, Rust, and Python environments."
              color="text-cyan-400"
            />
            <FeatureCard 
              span="md:col-span-3"
              icon={<Users size={22} />}
              title="Multiplayer"
              desc="Real-time CRDT sync allows seamless pairing without merge conflicts or lag."
              color="text-blue-400"
            />
            <FeatureCard 
              span="md:col-span-2"
              icon={<Shield size={22} />}
              title="Sandboxed"
              desc="Hardware-level isolation for every session. Your source code remains strictly private."
              color="text-emerald-400"
            />
            <FeatureCard 
              span="md:col-span-4"
              icon={<Globe size={22} />}
              title="Edge Native"
              desc="Smart routing connects your editor to the nearest node, ensuring a zero-lag experience anywhere on Earth."
              color="text-cyan-400"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ span, icon, title, desc, color }) => (
  <div className={`${span} p-10 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all group relative overflow-hidden cursor-default`}>
    <div className={`mb-8 p-3 rounded-lg bg-white/[0.03] border border-white/5 ${color} w-fit group-hover:bg-cyan-500 group-hover:text-black transition-all duration-300`}>
      {icon}
    </div>
    <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight italic group-hover:text-cyan-400 transition-colors">{title}</h3>
    <p className="text-gray-600 font-bold text-[10px] leading-relaxed uppercase tracking-widest">{desc}</p>
  </div>
);

export default Home;