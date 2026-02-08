import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  User,
  Mail,
  Shield,
  Github,
  Save,
  Loader2,
  Upload,
  KeyRound,
  Link2,
  Pencil,
  Zap,
  Cpu,
  Terminal
} from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("General");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    profileImage: "",
    bio: "",
    role: "",
    skills: "",
    githubLink: "",
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // ✅ Cleanup preview memory
  useEffect(() => {
    return () => {
      if (previewURL) URL.revokeObjectURL(previewURL);
    };
  }, [previewURL]);

  // ✅ Load profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/user/profile", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to load profile");

        const u = data?.user || {};

        setProfile({
          name: u.name || "",
          email: u.email || "",
          profileImage: u.profileImage || "",
          bio: u.bio || "",
          role: u.role || "",
          skills: Array.isArray(u.skills) ? u.skills.join(", ") : u.skills || "",
          githubLink: u.githubLink || "",
        });
      } catch (err) {
        toast.error(err.message || "Profile load failed");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Save profile
  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("bio", profile.bio);
      formData.append("role", profile.role);
      formData.append("githubLink", profile.githubLink);

      const skillsArray = profile.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      formData.append("skills", JSON.stringify(skillsArray));

      if (selectedFile) {
        formData.append("profileImage", selectedFile);
      }

      const res = await fetch("http://localhost:5000/user/profile", {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to update profile");

      const u = data?.user || {};
      setProfile({
        name: u.name || "",
        email: u.email || "",
        profileImage: u.profileImage || "",
        bio: u.bio || "",
        role: u.role || "",
        skills: Array.isArray(u.skills) ? u.skills.join(", ") : u.skills || "",
        githubLink: u.githubLink || "",
      });

      setSelectedFile(null);
      setPreviewURL("");
      toast.success("Profile updated ✅");
      setIsEditing(false);
    } catch (err) {
      toast.error(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  // ✅ Change Password
  const handleChangePassword = async () => {
    if (!security.currentPassword || !security.newPassword || !security.confirmPassword) {
      return toast.error("Fill all password fields");
    }
    if (security.newPassword.length < 6) return toast.error("Password too short");
    if (security.newPassword !== security.confirmPassword) return toast.error("Passwords do not match");

    try {
      const res = await fetch("http://localhost:5000/user/password", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: security.currentPassword,
          newPassword: security.newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to update password");

      toast.success("Password updated ✅");
      setSecurity({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.message || "Password update failed");
    }
  };

  const avatarSrc =
    previewURL ||
    profile.profileImage ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
      profile.name || "User"
    )}`;

  return (
    <div className="relative min-h-screen bg-[#050507] text-gray-300 flex flex-col selection:bg-cyan-500/30 overflow-x-hidden font-sans">
      <Navbar />

      {/* Tech Grid Background & Lighting */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none " />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full flex-grow">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/5 pb-8">
          <div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-[-0.03em] uppercase italic leading-none">
              User <br />
              <span className="text-cyan-400">Profile</span>
            </h1>
          </div>
        </div>

        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center border border-white/5 bg-white/[0.02] rounded-xl">
            <Loader2 className="animate-spin text-cyan-400 mb-4" size={32} />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Loading Data...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Sidebar Navigation */}
            <div className="lg:col-span-3 space-y-3">
              <SidebarItem
                active={activeTab === "General"}
                onClick={() => setActiveTab("General")}
                icon={<User size={18} />}
                label="General"
              />
              <SidebarItem
                active={activeTab === "Security"}
                onClick={() => setActiveTab("Security")}
                icon={<Shield size={18} />}
                label="Security"
              />
              <SidebarItem
                active={activeTab === "Integrations"}
                onClick={() => setActiveTab("Integrations")}
                icon={<Cpu size={18} />}
                label="Integrations"
              />
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9 relative">
               
               <div className="relative w-full rounded-xl border border-white/10 bg-[#0a0a0f] overflow-hidden shadow-2xl">
                
                {/* Decoration Strip */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/[0.02]">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-cyan-500/50" />
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                  </div>
                  <div className="text-[9px] font-black text-gray-500 tracking-[0.3em] uppercase font-mono">
                    {activeTab}_PANEL
                  </div>
                </div>

                <div className="p-8 md:p-12">
                  {/* ✅ GENERAL TAB */}
                  {activeTab === "General" && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      
                      <div className="flex justify-between items-center mb-10">
                         <h2 className="text-2xl font-black text-white uppercase tracking-tight italic">Identity</h2>
                         
                         {!isEditing ? (
                           <button
                             type="button"
                             onClick={() => setIsEditing(true)}
                             className="px-6 py-3 bg-white/[0.05] hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/50 text-white transition-all rounded-sm font-bold uppercase text-[10px] tracking-[0.2em] flex items-center gap-3"
                           >
                             <Pencil size={14} /> Edit
                           </button>
                         ) : (
                           <button
                             type="button"
                             onClick={() => {
                               setIsEditing(false);
                               setSelectedFile(null);
                               setPreviewURL("");
                             }}
                             className="px-6 py-3 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-400 transition-all rounded-sm font-bold uppercase text-[10px] tracking-[0.2em] flex items-center gap-3"
                           >
                             Cancel
                           </button>
                         )}
                      </div>

                      {/* Avatar Row */}
                      <div className="flex items-center gap-8 mb-10 pb-10 border-b border-white/5">
                        <div className="relative group">
                           <div className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                             <img
                               src={avatarSrc}
                               alt="avatar"
                               className="w-full h-full rounded-full bg-[#050507] object-cover"
                             />
                           </div>
                        </div>

                        <div className="flex-1">
                          <label
                             className={`inline-flex items-center gap-3 px-5 py-3 border border-dashed border-white/20 rounded-md text-[10px] uppercase tracking-widest font-bold transition-all ${isEditing
                                 ? "cursor-pointer hover:border-cyan-500 hover:text-cyan-400 bg-white/[0.02]"
                                 : "opacity-40 cursor-not-allowed text-gray-600"
                               }`}
                           >
                             <Upload size={14} />
                             {selectedFile ? "Image Selected" : "Upload New Avatar"}
                             <input
                               type="file"
                               accept="image/*"
                               disabled={!isEditing}
                               className="hidden"
                               onChange={(e) => {
                                 const file = e.target.files?.[0];
                                 if (!file) return;
                                 setSelectedFile(file);
                                 const url = URL.createObjectURL(file);
                                 setPreviewURL(url);
                               }}
                             />
                           </label>
                        </div>
                      </div>

                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <TechInput
                             label="User Name"
                             value={profile.name}
                             disabled={!isEditing}
                             onChange={(v) => setProfile((p) => ({ ...p, name: v }))}
                             icon={<User size={16} />}
                           />
                           <TechInput
                             label="Email Address"
                             value={profile.email}
                             disabled={true}
                             icon={<Mail size={16} />}
                           />
                        </div>

                        <TechTextArea
                          label="Bio / Mission"
                          value={profile.bio}
                          disabled={!isEditing}
                          onChange={(v) => setProfile((p) => ({ ...p, bio: v }))}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <TechInput
                             label="Role / Designation"
                             value={profile.role}
                             disabled={!isEditing}
                             onChange={(v) => setProfile((p) => ({ ...p, role: v }))}
                             icon={<Zap size={16} />}
                           />
                           <TechInput
                             label="Github URL"
                             value={profile.githubLink}
                             disabled={!isEditing}
                             onChange={(v) => setProfile((p) => ({ ...p, githubLink: v }))}
                             icon={<Github size={16} />}
                           />
                        </div>

                        <TechInput
                          label="Tech Stack (Comma Separated)"
                          value={profile.skills}
                          disabled={!isEditing}
                          onChange={(v) => setProfile((p) => ({ ...p, skills: v }))}
                          icon={<Terminal size={16} />}
                        />

                        {isEditing && (
                          <div className="pt-8 flex justify-end">
                            <button
                              type="button"
                              onClick={handleSaveProfile}
                              disabled={saving}
                              className="px-8 py-4 bg-white text-black hover:bg-cyan-500 transition-all rounded-sm font-black uppercase text-[10px] tracking-[0.3em] flex items-center gap-4 shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95 disabled:opacity-50"
                            >
                              {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                              {saving ? "Processing..." : "Save Changes"}
                            </button>
                          </div>
                        )}
                      </form>
                    </div>
                  )}

                  {/* ✅ SECURITY TAB */}
                  {activeTab === "Security" && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div>
                        <h2 className="text-2xl font-black text-white uppercase tracking-tight italic flex items-center gap-4">
                           Security Protocols
                        </h2>
                      </div>

                      <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20 flex gap-4 items-center">
                         <Shield size={20} className="text-red-400" />
                         <p className="text-xs text-red-300 font-mono">Warning: Password updates terminate active sessions.</p>
                      </div>

                      <div className="grid gap-6 max-w-lg">
                         <TechInput
                           label="Current Password"
                           type="password"
                           value={security.currentPassword}
                           onChange={(v) => setSecurity((p) => ({ ...p, currentPassword: v }))}
                           icon={<KeyRound size={16} />}
                         />
                         <TechInput
                           label="New Password"
                           type="password"
                           value={security.newPassword}
                           onChange={(v) => setSecurity((p) => ({ ...p, newPassword: v }))}
                           icon={<KeyRound size={16} />}
                         />
                         <TechInput
                           label="Confirm Password"
                           type="password"
                           value={security.confirmPassword}
                           onChange={(v) => setSecurity((p) => ({ ...p, confirmPassword: v }))}
                           icon={<KeyRound size={16} />}
                         />
                      </div>

                      <div className="pt-4">
                        <button
                          type="button"
                          onClick={handleChangePassword}
                          className="px-8 py-4 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all rounded-sm font-black uppercase text-[10px] tracking-[0.3em] flex items-center gap-4 active:scale-95"
                        >
                          <Save size={16} />
                          Update Credentials
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ✅ INTEGRATIONS TAB */}
                  {activeTab === "Integrations" && (
                    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <h2 className="text-2xl font-black text-white uppercase tracking-tight italic">
                         External Nodes
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="group p-8 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all relative overflow-hidden">
                           <div className="flex justify-between items-start mb-6">
                              <div className="p-4 bg-white/5 rounded-lg text-white group-hover:text-cyan-400 transition-colors">
                                 <Github size={24} />
                              </div>
                              <span className="px-2 py-1 bg-white/5 text-[8px] uppercase tracking-widest font-bold text-gray-500 rounded-sm">
                                 Disconnected
                              </span>
                           </div>
                           <h3 className="text-lg font-bold text-white mb-2">GitHub</h3>
                           <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                              Link repository access for auto-deployments.
                           </p>
                           <button
                             type="button"
                             onClick={() => toast.success("GitHub connect coming soon ✅")}
                             className="w-full py-4 bg-white/[0.05] hover:bg-white/[0.1] text-xs font-bold uppercase tracking-widest text-gray-300 transition-colors border border-white/5"
                           >
                             Initialize Connection
                           </button>
                         </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

// --- Styled Components (MATCHING FEATURE CARDS) ---

const SidebarItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full group text-left px-6 py-4 flex items-center gap-4 transition-all duration-300 border-l-2 relative overflow-hidden ${
      active
        ? "bg-cyan-500/5 border-cyan-500 text-cyan-400"
        : "border-transparent hover:bg-white/[0.02] hover:border-white/20 text-gray-500 hover:text-gray-300"
    }`}
  >
    <div className={`transition-transform duration-300 ${active ? "scale-110" : "group-hover:scale-110"}`}>
       {icon}
    </div>
    <span className="font-bold text-xs uppercase tracking-[0.2em]">{label}</span>
  </button>
);

// New "TechInput" - Matches the 'FeatureCard' style from Home.jsx
const TechInput = ({ label, value, onChange, icon, disabled, type = "text" }) => (
  <div className="group relative">
    <div className={`
      flex items-center gap-4 p-4 rounded-xl 
      bg-white/[0.02] border border-white/5 
      transition-all duration-300
      ${!disabled ? "focus-within:border-cyan-500/50 hover:border-white/10" : "opacity-50"}
    `}>
      <div className="text-gray-600 group-focus-within:text-cyan-400 transition-colors">
        {icon}
      </div>
      <div className="flex-1 flex flex-col">
        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600 mb-1 group-focus-within:text-cyan-500 transition-colors">
          {label}
        </label>
        <input
          type={type}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange && onChange(e.target.value)}
          className="w-full bg-transparent border-none p-0 text-sm text-gray-200 font-mono focus:ring-0 placeholder-gray-800"
          spellCheck="false"
        />
      </div>
    </div>
  </div>
);

const TechTextArea = ({ label, value, onChange, disabled }) => (
  <div className="group relative">
    <div className={`
      p-5 rounded-xl 
      bg-white/[0.02] border border-white/5 
      transition-all duration-300
      ${!disabled ? "focus-within:border-cyan-500/50 hover:border-white/10" : "opacity-50"}
    `}>
        <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-gray-600 mb-3 group-focus-within:text-cyan-500 transition-colors">
          {label}
        </label>
        <textarea
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full bg-transparent border-none p-0 text-sm text-gray-200 font-mono focus:ring-0 resize-none placeholder-gray-800 leading-relaxed"
          placeholder="..."
        />
    </div>
  </div>
);

export default Profile;