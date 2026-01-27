import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import IdeLayout from '../components/layout/IdeLayout';
import CodeEditor from '../components/CodeEditor';
import { Play, Settings, Monitor, Share2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

// Import the new components
import InviteButton from '../components/InviteButton';
import SettingsModal from '../components/SettingsModal';

const EditorPage = () => {
  const { roomId } = useParams();
  
  // Manage Settings State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editorSettings, setEditorSettings] = useState({
    fontSize: 16,
    wordWrap: true
  });

  const runCode = () => {
    toast.info('Compiling...');
    setTimeout(() => {
        toast.success('Output: Server started on port 3000');
    }, 800);
  };

  return (
    <div className="h-screen flex flex-col bg-background text-text overflow-hidden">
      
      {/* 1. Header with Invite & Settings */}
      <header className="h-14 border-b border-white/5 bg-[#0a0a0f] flex items-center justify-between px-4 shrink-0">
        
        {/* Left: Back & Title */}
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              devnexus-server
            </h1>
            <span className="text-[10px] text-gray-500">Room: {roomId}</span>
          </div>
        </div>

        {/* Center: Run Button */}
        <div className="absolute left-1/2 -translate-x-1/2">
            <button 
                onClick={runCode}
                className="bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-600/30 px-6 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all hover:scale-105"
            >
                <Play size={12} fill="currentColor" />
                Run Code
            </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <InviteButton roomId={roomId} />
          
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <Settings size={18} />
          </button>
          
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white ring-2 ring-black">
            ME
          </div>
        </div>
      </header>

      {/* 2. Main Layout - Passing Settings Down */}
      <IdeLayout>
        <CodeEditor 
          roomId={roomId} 
          onCodeChange={() => {}} 
          settings={editorSettings} // <--- Pass settings here!
        />
      </IdeLayout>

      {/* 3. Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={editorSettings}
        setSettings={setEditorSettings}
      />
      
    </div>
  );
};

export default EditorPage;