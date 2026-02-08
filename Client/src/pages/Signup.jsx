import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Code2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.fullName, 
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Signup failed');
      }

      toast.success('Identity created successfully! Initializing session...');
      navigate('/signin');

    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Server connection failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] flex items-center justify-center relative overflow-hidden p-1 selection:bg-cyan-500/30 font-sans">
      
      {/* 1. Tech Grid Background (Matches Home/Signin) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

      {/* 2. Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] -z-10" />

      <div className="w-full max-w-md bg-[#0a0a0f] border border-white/10 rounded-2xl shadow-2xl relative z-10 overflow-hidden">
        
        {/* 3. Card Header Strip */}
        <div className="flex items-center justify-between px-6 py-2 border-b border-white/5 bg-white/[0.02]">
           <div className="flex gap-1.5">
             <div className="w-2 h-2 rounded-full bg-cyan-500/50" />
             <div className="w-2 h-2 rounded-full bg-white/10" />
           </div>
           <div className="text-[9px] font-black text-gray-500 tracking-[0.3em] uppercase font-mono">
             IDENTITY_CREATION
           </div>
        </div>

        <div className="p-6">
          <div className="text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
              <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all duration-300">
                <Code2 size={20} />
              </div>
              <span className="font-bold text-xl text-white uppercase tracking-tighter italic ">
                Dev<span className="text-cyan-400">Nexus</span>
              </span>
            </Link>
            <h1 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Create Identity</h1>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">Initialize your developer profile</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name Input */}
            <div className="space-y-2 group">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1 group-focus-within:text-cyan-400 transition-colors">Full Name</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-cyan-400 transition-colors pointer-events-none">
                  <User size={18} />
                </div>
                <input 
                  type="text"
                  required
                  disabled={loading}
                  placeholder="John Doe"
                  className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm text-white placeholder:text-gray-700 font-mono focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/[0.02] focus:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all disabled:opacity-50"
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2 group">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1 group-focus-within:text-cyan-400 transition-colors">Email Address</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-cyan-400 transition-colors pointer-events-none">
                  <Mail size={18} />
                </div>
                <input 
                  type="email"
                  required
                  disabled={loading}
                  placeholder="you@example.com"
                  className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm text-white placeholder:text-gray-700 font-mono focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/[0.02] focus:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all disabled:opacity-50"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2 group">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1 group-focus-within:text-cyan-400 transition-colors">Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-cyan-400 transition-colors pointer-events-none">
                  <Lock size={18} />
                </div>
                <input 
                  type="password"
                  required
                  disabled={loading}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm text-white placeholder:text-gray-700 font-mono focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/[0.02] focus:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all disabled:opacity-50"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-cyan-500 text-black font-black uppercase text-[10px] tracking-[0.3em] py-4 rounded-xl hover:bg-white transition-all flex items-center justify-center gap-3 mt-6 shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Processing...
                </>
              ) : (
                <>
                  Initialize Account <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center pt-8 border-t border-white/5">
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.1em]">
              Already authorized?{' '}
              <Link to="/signin" className="text-cyan-400 hover:text-white transition-colors inline-flex items-center gap-1 ml-1 group">
                Sign In <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;