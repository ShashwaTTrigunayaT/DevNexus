import React from 'react';
import { Code2, Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#050507] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-xl">
              <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                <Code2 size={24} />
              </div>
              DevNexus
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              The next-generation collaborative IDE. Built for speed, designed for teams, powered by AI.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Github size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Linkedin size={18} />} />
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <FooterLink>Features</FooterLink>
              <FooterLink>Pricing</FooterLink>
              <FooterLink>Changelog</FooterLink>
              <FooterLink>Docs</FooterLink>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <FooterLink>About</FooterLink>
              <FooterLink>Careers</FooterLink>
              <FooterLink>Blog</FooterLink>
              <FooterLink>Contact</FooterLink>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <FooterLink>Privacy Policy</FooterLink>
              <FooterLink>Terms of Service</FooterLink>
              <FooterLink>Cookie Policy</FooterLink>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2024 DevNexus Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            Made with <Heart size={12} className="text-red-500 fill-red-500" /> by You
          </div>
        </div>

      </div>
    </footer>
  );
};

// Helper Components
const SocialIcon = ({ icon }) => (
  <a href="#" className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-primary/20 transition-all">
    {icon}
  </a>
);

const FooterLink = ({ children }) => (
  <li>
    <a href="#" className="hover:text-primary transition-colors">{children}</a>
  </li>
);

export default Footer;