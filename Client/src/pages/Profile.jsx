import React from 'react';
import Navbar from '../components/Navbar';
import { User, Mail, Shield, Github, Save } from 'lucide-react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">Account Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: Sidebar Tabs */}
          <div className="space-y-2">
             <SidebarItem active icon={<User size={18} />} label="General" />
             <SidebarItem icon={<Shield size={18} />} label="Security" />
             <SidebarItem icon={<Github size={18} />} label="Integrations" />
          </div>

          {/* Right Column: Form */}
          <div className="md:col-span-2 bg-surface border border-white/5 rounded-2xl p-8">
             
             {/* Avatar Section */}
             <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-purple-600 p-[2px]">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" className="w-full h-full rounded-full bg-black" />
                </div>
                <div>
                   <h3 className="font-semibold text-white">Profile Photo</h3>
                   <p className="text-sm text-muted mb-3">This will be displayed on your profile.</p>
                   <div className="flex gap-3">
                      <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-md text-sm font-medium transition-colors">Change</button>
                      <button className="px-3 py-1.5 text-red-400 hover:bg-red-400/10 rounded-md text-sm font-medium transition-colors">Remove</button>
                   </div>
                </div>
             </div>

             <form className="space-y-6">
                <InputGroup label="Display Name" defaultValue="Shashwat Trigunayat" icon={<User size={16} />} />
                <InputGroup label="Email Address" defaultValue="shashwat@devnexus.com" icon={<Mail size={16} />} />
                
                <div className="pt-4 flex justify-end">
                   <button type="button" className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all">
                      <Save size={18} />
                      Save Changes
                   </button>
                </div>
             </form>
          </div>

        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, active }) => (
   <button className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${active ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted hover:bg-white/5 hover:text-white'}`}>
      {icon}
      <span className="font-medium">{label}</span>
   </button>
);

const InputGroup = ({ label, defaultValue, icon }) => (
  <div>
    <label className="block text-sm font-medium text-muted mb-2">{label}</label>
    <div className="relative">
       <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          {icon}
       </div>
       <input 
         type="text" 
         defaultValue={defaultValue} 
         className="w-full bg-background border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
       />
    </div>
  </div>
);

export default Profile;