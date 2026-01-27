import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { MessageSquare, Github, Linkedin, Code2, Globe, Clock, Shield } from 'lucide-react';
import { toast } from 'sonner';

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  // MOCK DATA (In real app, we fetch this using userId)
  const user = {
    name: userId === 'shashwat' ? 'Shashwat' : 'Ravan',
    role: 'Full Stack Developer',
    status: 'online', // or 'offline'
    bio: 'Building scalable systems and breaking them for fun. React & Node.js enthusiast.',
    skills: ['React', 'Node.js', 'Docker', 'AWS', 'TypeScript'],
    projects: [
      { id: 1, title: 'E-Commerce API', lang: 'Node.js', stars: 12 },
      { id: 2, title: 'Chat Engine', lang: 'Socket.io', stars: 8 },
      { id: 3, title: 'Portfolio v1', lang: 'React', stars: 24 },
    ]
  };

  const handleMessage = () => {
    // We will trigger a modal or navigate to chat here
    toast.info(`Opened chat with ${user.name}`);
  };

  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Profile Header */}
        <div className="bg-surface/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            
            {/* Avatar */}
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-3xl font-bold text-white shadow-xl ring-4 ring-surface">
              {user.name.slice(0, 2).toUpperCase()}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${user.status === 'online' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                  {user.status === 'online' ? '● Online' : '○ Offline'}
                </span>
              </div>
              <p className="text-secondary font-medium mb-2">{user.role}</p>
              <p className="text-muted text-sm max-w-lg">{user.bio}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-4 md:mt-0">
               <button 
                onClick={handleMessage}
                className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
               >
                 <MessageSquare size={18} />
                 Message
               </button>
               <button className="bg-white/5 hover:bg-white/10 text-white px-3 py-2.5 rounded-xl transition-all border border-white/10">
                 <Github size={20} />
               </button>
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: Stats & Skills */}
          <div className="space-y-6">
             <div className="bg-surface border border-white/5 rounded-xl p-5">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                   {user.skills.map(skill => (
                     <span key={skill} className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-sm text-gray-300">
                       {skill}
                     </span>
                   ))}
                </div>
             </div>

             <div className="bg-surface border border-white/5 rounded-xl p-5">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Stats</h3>
                <div className="space-y-3">
                   <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-muted"><Clock size={16} /> Coding Hours</span>
                      <span className="text-white">124h</span>
                   </div>
                   <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-muted"><Shield size={16} /> Rank</span>
                      <span className="text-yellow-400">Gold</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Right Column: Projects */}
          <div className="md:col-span-2">
             <h3 className="text-lg font-bold text-white mb-4">Public Projects</h3>
             <div className="space-y-4">
                {user.projects.map(project => (
                   <div key={project.id} className="group bg-surface border border-white/5 rounded-xl p-5 hover:border-primary/50 transition-all cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                         <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-background text-primary">
                               <Code2 size={20} />
                            </div>
                            <h4 className="font-semibold text-white group-hover:text-primary transition-colors">{project.title}</h4>
                         </div>
                         <span className="text-xs text-muted border border-white/10 px-2 py-1 rounded">{project.lang}</span>
                      </div>
                      <p className="text-sm text-muted pl-[52px]">A collaborative project built with {project.lang}.</p>
                   </div>
                ))}
             </div>
          </div>

        </div>

      </main>
    </div>
  );
};

export default UserProfile;