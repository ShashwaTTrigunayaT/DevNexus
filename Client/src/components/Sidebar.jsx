import React from 'react';
import { Code2, Users, FolderOpen, Settings, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  return (
    <aside className="w-16 h-full bg-surface border-r border-white/5 flex flex-col items-center py-6 gap-8 z-20">
      {/* Logo */}
      <div className="p-2 bg-primary/10 rounded-xl">
        <Code2 className="w-6 h-6 text-primary" />
      </div>

      {/* Nav Icons */}
      <nav className="flex flex-col gap-6 w-full items-center flex-1">
        <IconButton icon={<FolderOpen size={22} />} active />
        <IconButton icon={<Users size={22} />} />
        <IconButton icon={<Settings size={22} />} />
      </nav>

      {/* Run Button (Bottom) */}
      <div className="mb-4">
         <button className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center hover:bg-green-500/30 transition-all cursor-pointer">
            <Play size={18} fill="currentColor" />
         </button>
      </div>
    </aside>
  );
};

const IconButton = ({ icon, active }) => (
  <button className={`p-2 rounded-lg transition-all relative group ${active ? 'text-primary' : 'text-muted hover:text-white'}`}>
    {icon}
    {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full -ml-4" />}
  </button>
);

export default Sidebar;