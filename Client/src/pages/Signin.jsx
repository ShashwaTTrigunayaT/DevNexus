import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Code2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';

const Signin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Simple Validation
    if(!formData.email || !formData.password) {
        return toast.error("Please fill in all fields");
    }

    // 2. MOCK LOGIN ACTION (We will replace this with backend later)
    const mockUser = {
        id: '123',
        name: formData.email.split('@')[0], // Use part of email as name
        email: formData.email
    };

    // 3. Update Global State
    login(mockUser); 
    
    toast.success('Welcome back to the Nexus.');
    navigate('/dashboard'); 
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden p-6">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-secondary/10 rounded-full blur-[100px] -z-10" />

      {/* Main Card */}
      <div className="w-full max-w-md bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10 animate-in fade-in zoom-in duration-300">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <Code2 size={24} />
            </div>
            <span className="font-bold text-xl text-white">DevNexus</span>
          </Link>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400 text-sm">Enter your credentials to access your workspace.</p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email Input */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                required 
                placeholder="you@example.com"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <a href="#" className="text-xs text-primary hover:text-primary/80 transition-colors">Forgot?</a>
            </div>
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                required 
                placeholder="••••••••"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 mt-2"
          >
            <LogIn size={18} /> Sign In
          </button>

        </form>

        {/* Footer Section */}
        <div className="mt-8 text-center pt-6 border-t border-white/5">
          <p className="text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:text-white font-medium transition-colors inline-flex items-center gap-1">
              Create one <ArrowRight size={14} />
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Signin;