import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import IdeLayout from "../components/layout/IdeLayout";
import CodeEditor from "../components/CodeEditor";
import InviteButton from "../components/InviteButton";
import SettingsModal from "../components/SettingsModal";
import { Settings, Save, Loader2, CloudOff, Play, Zap, Terminal, Activity, Cpu } from "lucide-react";
import { toast } from "sonner";
import { executeCode } from "../execution/api"; 

const EditorPage = () => {
  const { roomId } = useParams();
  const terminalRef = useRef(null);

  // STATE & LOGIC (STRICTLY UNTOUCHED)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editorSettings, setSettings] = useState({ fontSize: 16, wordWrap: true });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [project, setProject] = useState(null);
  const [user, setUser] = useState(null);
  const [code, setCode] = useState(""); 
  const [activeFile, setActiveFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const projRes = await fetch(`http://localhost:5000/project/${roomId}`, { credentials: "include" });
        const projData = await projRes.json();
        if (!projRes.ok) throw new Error(projData.error);
        setProject(projData.project);
        if (projData.project.fileTree?.children?.length > 0) {
           setCode("// Select a file from the explorer to start editing");
        } else {
           setCode(projData.project.code || "");
        }
        const userRes = await fetch("http://localhost:5000/user", { credentials: "include" });
        const userData = await userRes.json();
        if (userRes.ok) setUser(userData.user);
      } catch (err) {
        toast.error("Error loading project");
      } finally {
        setLoading(false);
      }
    };
    if (roomId) fetchData();
  }, [roomId]);

  const handleSave = async () => {
    if (!activeFile) return toast.error("Select a file to save code!");
    try {
      setSaving(true);
      const res = await fetch(`http://localhost:5000/project/${roomId}/code`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ code, fileId: activeFile.id }), 
      });
      if (!res.ok) throw new Error("Save failed");
      toast.success("File saved! 💾");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleFileSelect = (fileNode) => {
    setActiveFile(fileNode);
    setCode(fileNode.content || "");
  };

  const handleRun = async () => {
    if (!code) return;
    terminalRef.current?.log(">> INITIALIZING_REMOTE_CORE...", "system");
    try {
      const { run: result } = await executeCode(project.language, code);
      if (result.stdout) result.stdout.split('\n').forEach(line => { if(line !== "") terminalRef.current?.log(line, "output"); });
      if (result.stderr) result.stderr.split('\n').forEach(line => { if(line !== "") terminalRef.current?.log(line, "error"); });
    } catch (err) {
      terminalRef.current?.log("!! KERNEL_PANIC: " + (err.message || "ERR"), "error");
      toast.error("Execution failed");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[#050507] text-gray-300 selection:bg-cyan-500/30 overflow-hidden font-sans relative">
      
      {/* PRECISION NAV */}
      <header className="h-14 min-h-[56px] px-6 border-b border-white/10 bg-[#0a0a0f] flex items-center justify-between relative z-50">
        <div className="flex items-center gap-8">
          {/* Identity */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <h1 className="text-sm font-black text-white uppercase italic tracking-tighter leading-none">
                {project?.title || "NEXUS_NODE"}
              </h1>
              <span className="text-[7px] text-cyan-500 font-black uppercase tracking-[0.4em] mt-1 italic">
                {activeFile ? `src: /${activeFile.name}` : "standby_protocol"}
              </span>
            </div>
          </div>

          <div className="h-6 w-[1px] bg-white/10" />

          {/* Core Controls */}
          <div className="flex items-center gap-2">
            <button 
              onClick={handleRun} 
              className="flex items-center gap-2 px-4 py-1.5 bg-white text-black hover:bg-cyan-500 transition-all rounded-sm font-black uppercase text-[9px] tracking-[0.2em] active:scale-95"
            >
              <Play size={10} className="fill-current" /> Initialize
            </button>
            
            {/* Commit Button using Zap Icon as requested */}
            <button 
              onClick={handleSave} 
              disabled={saving} 
              className="flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 text-white hover:border-cyan-500/50 transition-all rounded-sm font-black uppercase text-[9px] tracking-[0.2em]"
            >
              {saving ? <Loader2 size={10} className="animate-spin text-cyan-500" /> : <Zap size={10} className="text-cyan-500" />}
              {saving ? "Syncing" : "Commit"}
            </button>
          </div>
        </div>

        {/* System Data Feed */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-[8px] font-black uppercase tracking-widest">
             <div className="flex flex-col items-end">
                <span className="text-gray-600">Kernel_Load</span>
                <span className="text-white italic">1.04%</span>
             </div>
             <div className="flex flex-col items-end">
                <span className="text-gray-600">Latency</span>
                <span className="text-emerald-500 italic">0.02ms</span>
             </div>
          </div>
          
          <div className="flex items-center gap-4">
            <InviteButton roomId={roomId} />
            <button onClick={() => setIsSettingsOpen(true)} className="p-2 text-gray-500 hover:text-white transition-colors">
              <Settings size={18} />
            </button>
            {user && (
              <div className="w-8 h-8 rounded-sm border border-white/10 overflow-hidden grayscale hover:grayscale-0 transition-all">
                <img src={user.profileImage} alt="user" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* WORKSPACE */}
      <main className="flex-1 relative flex">
        {/* Background Grid Layer */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
        
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[#050507] z-[60]">
             <div className="flex flex-col items-center gap-4">
               <Cpu className="text-cyan-500 animate-spin" size={32} />
               <span className="text-[8px] font-black uppercase tracking-[0.5em] text-cyan-500/50">Mounting_Virtual_Node</span>
             </div>
          </div>
        ) : project ? (
          <IdeLayout 
            roomId={roomId} project={project} user={user} 
            onRun={handleRun} code={code} 
            onFileSelect={handleFileSelect} terminalRef={terminalRef} 
          >
            <CodeEditor roomId={roomId} language={project.language} value={code} onCodeChange={setCode} settings={editorSettings} />
          </IdeLayout>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center"><CloudOff className="opacity-10" size={48} /></div>
        )}
      </main>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} settings={editorSettings} setSettings={setSettings} />
    </div>
  );
};

export default EditorPage;