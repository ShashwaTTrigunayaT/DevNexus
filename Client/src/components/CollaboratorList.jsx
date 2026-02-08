import React from "react";
import { Users, Crown, CircleDashed } from "lucide-react";

const CollaboratorList = ({ user, project }) => {
  return (
    <div className="p-4 select-none h-full flex flex-col">
       {/* Header */}
       <div className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider flex items-center gap-2">
          <Users size={14} /> Active Users
       </div>

       <div className="space-y-3">
          {/* 1. The Current User (YOU) - Dynamic Data */}
          {user ? (
            <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5">
                <div className="relative">
                   <img 
                      src={user.profileImage || `https://ui-avatars.com/api/?name=${user.name}&background=random`} 
                      alt="avatar" 
                      className="w-8 h-8 rounded-full bg-gray-800 object-cover"
                   />
                   <div className="absolute -bottom-0.5 -right-0.5 bg-[#0a0a0f] rounded-full p-0.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-[#0a0a0f]" title="Online" />
                   </div>
                </div>
                <div className="flex-1 min-w-0">
                   <p className="text-sm font-bold text-white truncate">{user.name} (You)</p>
                   <p className="text-[10px] text-gray-500 flex items-center gap-1">
                      {/* Check if the logged-in user is the project owner */}
                      {project?.owner === user._id ? (
                        <>
                            <Crown size={10} className="text-yellow-500" /> Owner
                        </>
                      ) : (
                        <span className="text-blue-400">Editor</span>
                      )}
                   </p>
                </div>
            </div>
          ) : (
            <div className="text-gray-500 text-xs italic">Loading user...</div>
          )}

          {/* 2. Placeholder for where Socket.io users will go */}
          <div className="px-2 py-4 border-t border-white/5 mt-4">
             <div className="flex items-center gap-2 text-gray-600 text-xs">
                <CircleDashed size={14} />
                <span>Waiting for others...</span>
             </div>
             <p className="text-[10px] text-gray-600 mt-1 pl-6">
                (Real-time collaboration is currently inactive)
             </p>
          </div>

       </div>
    </div>
  );
};

export default CollaboratorList;