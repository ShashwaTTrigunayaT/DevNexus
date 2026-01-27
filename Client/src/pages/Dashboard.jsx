import React from 'react';
import Navbar from '../components/Navbar';
import { Plus, Folder, Clock, MoreVertical, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Dashboard = () => {
  const navigate = useNavigate();

  const createNewProject = () => {
    const id = uuidv4();
    navigate(`/editor/${id}`, { state: { username: 'Owner' } });
  };

  // Dummy Data for UI Visualization
  const projects = [
    { id: 1, title: "AI Chatbot", lang: "React", updated: "2 mins ago" },
    { id: 2, title: "Portfolio v2", lang: "HTML/CSS", updated: "2 hours ago" },
    { id: 3, title: "Crypto Tracker", lang: "Node.js", updated: "1 day ago" },
    { id: 4, title: "Auth System", lang: "Python", updated: "3 days ago" },
  ];

  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Welcome back, Architect</h1>
            <p className="text-muted text-sm">You have 4 active projects pending.</p>
          </div>
          <button 
            onClick={createNewProject}
            className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
          >
            <Plus size={18} />
            New Project
          </button>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           <StatCard icon={<Terminal className="text-secondary" />} label="Total Projects" value="12" />
           <StatCard icon={<Clock className="text-blue-400" />} label="Coding Hours" value="48.5" />
           <StatCard icon={<Folder className="text-green-400" />} label="Storage Used" value="1.2 GB" />
        </div>

        {/* Projects Grid */}
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Folder size={18} className="text-primary" />
          Recent Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="group bg-surface border border-white/5 rounded-xl p-5 hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 hover:bg-white/10 rounded"><MoreVertical size={16} /></button>
               </div>
               
               <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center mb-4 text-2xl">
                  {project.lang === 'React' ? '⚛️' : project.lang === 'Python' ? '🐍' : '⚡'}
               </div>
               
               <h3 className="font-semibold text-white mb-1">{project.title}</h3>
               <p className="text-xs text-muted mb-4">Last edited {project.updated}</p>
               
               <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500">{project.lang}</span>
                  <button className="text-xs text-primary hover:underline">Open</button>
               </div>
            </div>
          ))}
          
          {/* "Add New" Placeholder Card */}
          <div onClick={createNewProject} className="border border-dashed border-white/10 rounded-xl p-5 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-white/5 hover:border-white/20 transition-all min-h-[180px]">
             <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center">
                <Plus size={24} className="text-muted" />
             </div>
             <span className="text-sm font-medium text-muted">Create New</span>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="bg-surface border border-white/5 rounded-xl p-6 flex items-center gap-4">
    <div className="p-3 bg-background rounded-lg">{icon}</div>
    <div>
      <p className="text-xs text-muted uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  </div>
);

export default Dashboard;