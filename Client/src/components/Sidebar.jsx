import React from "react";
import { Files, Play, Settings, Users, Code2, MessageSquare, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useLayoutStore from "../store/useLayoutStore";

const Sidebar = ({ activeTab, setActiveTab, onRun }) => {
  const navigate = useNavigate();
  const { isAIPanelOpen, toggleAIPanel, isSidebarOpen, toggleSidebar } = useLayoutStore();

  const handleTabClick = (tab) => {
    // If sidebar is closed, open it. If clicking same tab, close it? 
    // For now, let's just switch tabs and ensure sidebar is open.
    if (!isSidebarOpen) toggleSidebar();
    setActiveTab(tab);
  };

  return (
    <aside className="w-14 bg-[#0a0a0f] border-r border-white/5 flex flex-col items-center py-4 gap-4 shrink-0 z-50">
      
      {/* Dashboard Link */}
      <button 
        onClick={() => navigate("/dashboard")}
        className="p-2 rounded-xl bg-primary/10 text-primary mb-2 hover:scale-110 transition-transform"
        title="Dashboard"
      >
        <Code2 size={24} />
      </button>

      {/* 1. File Explorer Tab */}
      <SidebarIcon 
        icon={<Files size={20} />} 
        active={activeTab === "files" && isSidebarOpen} 
        onClick={() => handleTabClick("files")} 
        label="Explorer"
      />

      {/* 2. Collaborators Tab (NEW) */}
      <SidebarIcon 
        icon={<Users size={20} />} 
        active={activeTab === "users" && isSidebarOpen} 
        onClick={() => handleTabClick("users")} 
        label="Collaborators"
      />

      {/* Run Code Button */}
      <button 
        onClick={onRun}
        className="p-3 rounded-xl text-green-400 hover:bg-green-400/10 hover:text-green-300 transition-all mt-2"
        title="Run Code"
      >
        <Play size={20} />
      </button>

      <div className="flex-1" />

      {/* 3. AI Chat Toggle (Right Panel) */}
      <SidebarIcon 
        icon={<Bot size={20} />} 
        active={isAIPanelOpen} 
        onClick={toggleAIPanel} 
        label="AI Assistant"
      />

      {/* Settings (Placeholder) */}
      <button className="p-3 text-gray-500 hover:text-white transition-colors">
        <Settings size={20} />
      </button>

    </aside>
  );
};

const SidebarIcon = ({ icon, active, onClick, label }) => (
  <button
    onClick={onClick}
    title={label}
    className={`p-3 rounded-xl transition-all relative group
      ${active ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}
    `}
  >
    {icon}
    {active && (
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full" />
    )}
  </button>
);

export default Sidebar;