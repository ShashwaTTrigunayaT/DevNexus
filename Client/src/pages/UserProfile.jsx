import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  MessageSquare,
  Github,
  Code2,
  Clock,
  Shield,
  Loader2,
  AlertCircle,
  Calendar
} from "lucide-react";
import { toast } from "sonner";

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]); // ✅ Real Projects
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch Real User & Projects
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        // 1. Fetch User Info
        const userRes = await fetch(`http://localhost:5000/user/${userId}`, {
          credentials: "include",
        });
        const userData = await userRes.json();
        
        if (!userRes.ok) throw new Error(userData?.error || "User not found");
        setUser(userData.user);

        // 2. Fetch User Projects
        const projRes = await fetch(`http://localhost:5000/project/user/${userId}`, {
          credentials: "include",
        });
        const projData = await projRes.json();
        
        if (projRes.ok) {
            setProjects(projData.projects);
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchData();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050507] flex items-center justify-center text-primary">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#050507] flex flex-col items-center justify-center text-white gap-4">
        <AlertCircle size={48} className="text-red-500" />
        <h2 className="text-xl font-bold">Error Loading Profile</h2>
        <p className="text-gray-400">{error}</p>
        <button onClick={() => navigate(-1)} className="text-primary hover:underline">
            Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050507] text-gray-200 font-sans selection:bg-cyan-500/30">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Banner */}
        <div className="h-48 w-full bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 rounded-t-3xl border-x border-t border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        </div>

        {/* Profile Header */}
        <div className="bg-[#0a0a0f] border-x border-b border-white/10 rounded-b-3xl p-8 -mt-1 relative z-10 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-end -mt-16 mb-6">
            
            {/* Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-2xl bg-[#0a0a0f] p-2 ring-1 ring-white/10 shadow-2xl">
                 <img
                  src={user?.profileImage || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-xl bg-gray-800"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-black text-white uppercase tracking-wide">
                {user?.name}
              </h1>
              <p className="text-cyan-400 font-mono text-sm mt-1 mb-4">
                @{user?.email?.split("@")[0]}
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                   <Shield size={14} /> {user?.role || "Developer"}
                </span>
                {user?.githubLink && (
                  <a href={user.githubLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Github size={14} /> GitHub
                  </a>
                )}
              </div>
            </div>

            {/* Actions */}
            <button className="px-6 py-2 bg-primary/10 hover:bg-primary text-primary hover:text-black font-bold rounded-xl transition-all flex items-center gap-2 border border-primary/20">
               <MessageSquare size={16} /> Message
            </button>
          </div>

          {/* Bio */}
          {user?.bio && (
            <div className="p-4 bg-white/5 border border-white/5 rounded-xl text-sm text-gray-400 leading-relaxed max-w-2xl">
               "{user.bio}"
            </div>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          
          {/* Left: Skills & Stats */}
          <div className="space-y-6">
             <div className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                   {user?.skills && user.skills.length > 0 ? (
                      user.skills.map((skill, i) => (
                        <span key={i} className="px-2 py-1 text-[10px] bg-white/5 border border-white/10 rounded-md text-gray-300">
                           {skill}
                        </span>
                      ))
                   ) : (
                      <span className="text-xs text-gray-600 italic">No skills listed</span>
                   )}
                </div>
             </div>
          </div>

          {/* Right: Projects List */}
          <div className="md:col-span-2">
             <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Code2 className="text-primary" /> Public Projects
             </h3>

             <div className="space-y-3">
                {projects.length > 0 ? (
                  projects.map((proj) => (
                    <div 
                      key={proj.roomID} // Uses roomID as key
                      className="group p-5 bg-[#0a0a0f] border border-white/5 hover:border-cyan-500/50 rounded-xl transition-all cursor-default"
                    >
                       <div className="flex justify-between items-start">
                          <div>
                             <h4 className="font-bold text-gray-200 group-hover:text-cyan-400 transition-colors">
                                {proj.title}
                             </h4>
                             <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded mt-2 inline-block uppercase">
                                {proj.language}
                             </span>
                          </div>
                          
                          <div className="text-right">
                             <div className="flex items-center gap-1 text-[10px] text-gray-600 mb-1">
                                <Calendar size={10} />
                                {new Date(proj.updatedAt).toLocaleDateString()}
                             </div>
                          </div>
                       </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
                    <Code2 className="mx-auto text-gray-700 mb-2" size={32} />
                    <p className="text-gray-500">No public projects found.</p>
                  </div>
                )}
             </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default UserProfile;