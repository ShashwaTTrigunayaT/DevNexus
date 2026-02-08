import React from 'react';
import { Code2, Github, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    /* Change bg-[#050507] to bg-[#0a0b10] for a subtle color shift from the main body */
    <footer className="relative bg-[#0a0b10] border-t border-white/10 pt-16 pb-8 overflow-hidden">
      
      {/* Visual Accent: A thin, vibrant gradient line to separate the black body from the footer */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      {/* Decorative Glow: Makes the footer feel deep rather than just flat black */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          {/* Minimalist Brand */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Code2 size={20} />
            </div>
            <span className="text-white font-bold text-lg tracking-tight uppercase">
              DevNexus
            </span>
          </div>

          {/* Clean Navigation (Pricing Removed) */}
          <nav className="flex items-center gap-8">
            {['Features', 'Docs', 'Security'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-cyan-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* High-Contrast Social Icons */}
          <div className="flex items-center gap-4">
            <SocialIcon icon={<Github size={18} />} />
            <SocialIcon icon={<Twitter size={18} />} />
            <SocialIcon icon={<Mail size={18} />} />
          </div>
        </div>

        {/* Bottom Bar: Monochrome with a touch of color */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em]">
            © 2026 DevNexus — System Version 3.0.4
          </p>
          
          <div className="flex items-center gap-2 text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">
            Built with <Heart size={10} className="text-cyan-500 fill-cyan-500" /> for the 
            <span className="text-gray-400 ml-1 underline decoration-cyan-500/30 underline-offset-4">Developer Community</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }) => (
  <a 
    href="#" 
    className="p-2 text-gray-500 hover:text-cyan-400 hover:bg-cyan-500/5 rounded-lg transition-all border border-transparent hover:border-cyan-500/20"
  >
    {icon}
  </a>
);

export default Footer;