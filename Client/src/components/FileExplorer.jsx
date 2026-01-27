import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Folder, FolderOpen, FileCode, FileJson, ChevronRight, ChevronDown } from 'lucide-react';

const FileExplorer = () => {
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState({ files: true, users: true });

  // Mock Connected Users
  const users = [
    { id: 1, username: 'Shashwat', color: '#ec4899' },
    { id: 2, username: 'Ravan', color: '#3b82f6' },
    { id: 3, username: 'You', color: '#10b981' }, 
  ];

  const initialFiles = {
    name: 'root', type: 'folder', isOpen: true,
    children: [
      {
        name: 'src', type: 'folder', isOpen: true,
        children: [
          { name: 'App.jsx', type: 'file', ext: 'jsx' },
          { name: 'main.jsx', type: 'file', ext: 'jsx' },
        ]
      },
      { name: 'package.json', type: 'file', ext: 'json' },
    ]
  };

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="h-full flex flex-col select-none">
       
       {/* FILES SECTION */}
       <div className="border-b border-white/5 pb-2">
          <div 
            onClick={() => toggleSection('files')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-400 hover:text-white cursor-pointer"
          >
             {openSections.files ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
             EXPLORER
          </div>
          {openSections.files && (
             <div className="px-2">
                <FileSystemItem item={initialFiles} />
             </div>
          )}
       </div>

       {/* CONNECTED USERS SECTION */}
       <div className="flex-1 mt-2">
          <div 
            onClick={() => toggleSection('users')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-400 hover:text-white cursor-pointer"
          >
             {openSections.users ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
             CONNECTED USERS ({users.length})
          </div>

          {openSections.users && (
            <div className="px-4 py-2 space-y-2">
              {users.map(user => (
                <div 
                  key={user.id} 
                  onClick={() => navigate(`/user/${user.username.toLowerCase()}`)}
                  className="flex items-center gap-3 group cursor-pointer hover:bg-white/5 p-1.5 rounded-lg transition-all"
                >
                  <div 
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
                    style={{ backgroundColor: user.color }}
                  >
                    {user.username.slice(0, 2).toUpperCase()}
                  </div>
                  
                  <div className="flex flex-col">
                     <span className="text-sm text-gray-300 group-hover:text-white transition-colors leading-none mb-1">{user.username}</span>
                     <span className="text-[9px] text-green-400 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></span>
                        Online
                     </span>
                  </div>
                </div>
              ))}
            </div>
          )}
       </div>
    </div>
  );
};

// Sub-component for Files
const FileSystemItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(item.isOpen || false);

  if (item.type === 'file') {
    return (
      <div className="flex items-center gap-2 px-2 py-1 hover:bg-white/5 rounded cursor-pointer text-sm text-gray-400 hover:text-white transition-colors pl-6">
        <FileIcon ext={item.ext} />
        <span>{item.name}</span>
      </div>
    );
  }

  return (
    <div>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-1 py-1 hover:bg-white/5 rounded cursor-pointer text-sm text-gray-300 transition-colors"
      >
        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        {isOpen ? <FolderOpen size={16} className="text-blue-400" /> : <Folder size={16} className="text-blue-400" />}
        <span className="font-medium truncate">{item.name === 'root' ? 'devnexus-project' : item.name}</span>
      </div>
      
      {isOpen && (
        <div className="pl-4 border-l border-white/5 ml-2">
          {item.children?.map((child, index) => (
            <FileSystemItem key={index} item={child} />
          ))}
        </div>
      )}
    </div>
  );
};

const FileIcon = ({ ext }) => {
  switch (ext) {
    case 'jsx': return <FileCode size={15} className="text-cyan-400" />;
    case 'js': return <FileCode size={15} className="text-yellow-400" />;
    case 'json': return <FileJson size={15} className="text-orange-400" />;
    default: return <FileCode size={15} className="text-gray-400" />;
  }
};

export default FileExplorer;