import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { 
  TerminalSquare, 
  X, 
  Trash2, 
  Plus, 
  ChevronDown, 
  Maximize2, 
  Activity, 
  MoreHorizontal,
  ChevronsRight,
  Terminal as TerminalIcon
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const Terminal = forwardRef(({ project, user }, ref) => {
  const [activeTab, setActiveTab] = useState("terminal");
  const [terminals, setTerminals] = useState([
    { 
      id: "term-1", 
      name: "Nexus Core", 
      history: [
        { type: "system", content: "Initializing Nexus Environment v2.0..." },
        { type: "system", content: "Container mounted successfully." }
      ] 
    }
  ]);
  const [activeTerminalId, setActiveTerminalId] = useState("term-1");
  const [isTerminalListOpen, setIsTerminalListOpen] = useState(false);
  const [outputLines, setOutputLines] = useState([]);
  
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  const getTime = () => {
    const d = new Date();
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminals, outputLines, activeTab, activeTerminalId]);

  const handleContainerClick = () => {
    if (activeTab === "terminal") inputRef.current?.focus();
  };

  useImperativeHandle(ref, () => ({
    log: (message, type = "info") => {
      setOutputLines((prev) => [...prev, { type, content: message, time: getTime() }]);
      setActiveTab("output");
    },
    clear: () => setOutputLines([])
  }));

  const createNewTerminal = (e) => {
    if(e) e.stopPropagation();
    const newId = uuidv4();
    const count = terminals.length + 1;
    const newTerm = { 
      id: newId, 
      name: count === 1 ? "Nexus Core" : `Nexus Node ${Date.now().toString().slice(-4)}`, 
      history: [{ type: "system", content: `New session started at ${getTime()}` }] 
    };
    setTerminals([...terminals, newTerm]);
    setActiveTerminalId(newId);
    setIsTerminalListOpen(false);
  };

  const deleteTerminal = (e, id) => {
    e.stopPropagation();
    if (terminals.length === 1) {
        setTerminals(prev => prev.map(t => t.id === id ? { ...t, history: [] } : t));
        return;
    }
    const filtered = terminals.filter(t => t.id !== id);
    setTerminals(filtered);
    if (activeTerminalId === id) setActiveTerminalId(filtered[0].id);
  };

  const handleClearActive = () => {
    if (activeTab === "output") setOutputLines([]);
    else if (activeTab === "terminal") {
        setTerminals(prev => prev.map(t => t.id === activeTerminalId ? { ...t, history: [] } : t));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const cmd = e.target.value.trim();
      setTerminals(prev => prev.map(t => {
        if (t.id === activeTerminalId) {
          const newHistory = [...t.history, { type: "command", content: cmd, time: getTime() }];
          
          let response = null;
          if (cmd === "clear") return { ...t, history: [] };
          else if (cmd === "") response = null;
          else if (cmd === "ls") response = "src/  public/  node_modules/  package.json  .env";
          else if (cmd === "pwd") response = "/var/www/nexus-project";
          else if (cmd === "whoami") response = "root";
          else if (cmd === "npm start") response = "> nexus-project@1.0.0 start\n> react-scripts start\n\nStarting the development server...";
          else response = `zsh: command not found: ${cmd}`;

          if (response) newHistory.push({ type: "response", content: response });
          return { ...t, history: newHistory };
        }
        return t;
      }));
      e.target.value = ""; 
    }
  };

  const activeTermInstance = terminals.find(t => t.id === activeTerminalId) || terminals[0];

  return (
    <div className="h-full flex flex-col bg-[#09090b] border-t border-white/10 font-mono text-sm relative" onClick={handleContainerClick}>
      
      {/* SCANLINE EFFECT OVERLAY - Now behind the header z-index */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-0 bg-[size:100%_4px,3px_100%] opacity-20" />

      {/* --- HEADER TOOLBAR --- */}
      <div className="flex items-center justify-between px-4 h-11 bg-[#0c0c11] border-b border-white/5 select-none relative z-[60]">
        
        <div className="flex items-center gap-1">
            {["TERMINAL", "OUTPUT", "DEBUG", "CONSOLE"].map((tab) => {
                const isActive = activeTab === tab.toLowerCase();
                return (
                    <button
                        key={tab}
                        onClick={(e) => { e.stopPropagation(); setActiveTab(tab.toLowerCase()); }}
                        className={`
                           px-4 py-1.5 text-[10px] font-bold tracking-widest rounded-t-md transition-all border-t-2
                           ${isActive 
                                ? "bg-[#141419] text-white border-cyan-500 shadow-[0_-5px_15px_-5px_rgba(6,182,212,0.2)]" 
                                : "text-gray-500 border-transparent hover:text-gray-300 hover:bg-white/5"}
                        `}
                    >
                        {tab}
                    </button>
                )
            })}
        </div>

        <div className="flex items-center gap-3">
            {activeTab === "terminal" && (
                <div className="flex items-center gap-2 mr-2">
                    {/* NEW TERMINAL BUTTON */}
                    <button 
                        onClick={createNewTerminal}
                        className="p-1.5 text-gray-400 hover:text-cyan-400 hover:bg-white/5 rounded transition-all border border-white/10"
                        title="New Terminal"
                    >
                        <Plus size={14} />
                    </button>

                    {/* TERMINAL SELECTOR DROPDOWN */}
                    <div className="relative">
                        <button 
                            onClick={(e) => { e.stopPropagation(); setIsTerminalListOpen(!isTerminalListOpen); }}
                            className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a20] hover:bg-[#25252e] border border-white/10 rounded-md transition-all text-xs text-gray-300"
                        >
                            <TerminalSquare size={13} className="text-cyan-500" />
                            <span className="font-semibold max-w-[80px] truncate">{activeTermInstance.name}</span>
                            <span className="text-[9px] bg-white/10 px-1.5 rounded text-cyan-400 font-bold">{terminals.length}</span>
                            <ChevronDown size={12} className={`transition-transform duration-200 ${isTerminalListOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isTerminalListOpen && (
                          <>
                            {/* Fullscreen transparent layer to ensure it closes on click-away and stays on top */}
                            <div className="fixed inset-0 z-[70]" onClick={() => setIsTerminalListOpen(false)} />
                            
                            <div className="absolute top-full right-0 mt-2 w-64 bg-[#0c0c11] border border-white/10 rounded-lg shadow-[0_10px_50px_rgba(0,0,0,0.8)] overflow-hidden z-[80] animate-in fade-in slide-in-from-top-2">
                                <div className="p-2 space-y-1">
                                    <div className="flex items-center justify-between px-2 py-1">
                                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Active_Nodes</span>
                                        <span className="text-[9px] text-cyan-500/50 font-mono italic">{terminals.length} Total</span>
                                    </div>
                                    <div className="max-h-64 overflow-y-auto custom-scrollbar pr-1">
                                        {terminals.map((t, index) => (
                                            <div 
                                                key={t.id} 
                                                className={`group/item flex items-center justify-between px-3 py-2.5 rounded-md cursor-pointer transition-all border ${activeTerminalId === t.id ? "bg-cyan-500/10 border-cyan-500/40" : "hover:bg-white/5 border-transparent"}`}
                                                onClick={() => { setActiveTerminalId(t.id); setIsTerminalListOpen(false); }}
                                            >
                                                <div className="flex items-center gap-3 text-left">
                                                    <span className={`text-[10px] font-mono ${activeTerminalId === t.id ? "text-cyan-400" : "text-gray-600"}`}>0{index + 1}</span>
                                                    <span className={`text-xs font-bold ${activeTerminalId === t.id ? "text-white" : "text-gray-400"}`}>{t.name}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {activeTerminalId === t.id && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_cyan] pulse" />}
                                                    <button onClick={(e) => deleteTerminal(e, t.id)} className="p-1 rounded hover:bg-red-500/20 text-gray-600 hover:text-red-400 transition-all opacity-0 group-hover/item:opacity-100">
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button onClick={createNewTerminal} className="w-full flex items-center justify-center gap-2 py-3 bg-white/[0.03] hover:bg-cyan-500/20 text-[10px] font-black text-cyan-500 border-t border-white/10 transition-all uppercase tracking-widest">
                                    <Plus size={12} /> Create_Node
                                </button>
                            </div>
                          </>
                        )}
                    </div>
                </div>
            )}

            <div className="flex items-center bg-[#1a1a20] rounded-md border border-white/10 p-0.5">
                <button onClick={handleClearActive} className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-white/5 rounded transition-all"><Trash2 size={14} /></button>
                <div className="w-[1px] h-3 bg-white/10 mx-0.5" />
                <button className="p-1.5 text-gray-500 hover:text-white hover:bg-white/5 rounded transition-all"><Maximize2 size={14} /></button>
            </div>
        </div>
      </div>

      {/* --- MAIN TERMINAL AREA --- */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar relative z-0 bg-[#09090b]">
        {activeTab === "terminal" && (
            <div className="space-y-2 font-mono text-[13px] leading-6">
                {activeTermInstance.history.map((line, i) => (
                    <div key={i} className="break-all">
                        {line.type === "command" ? (
                            <div className="flex flex-col mt-3">
                                <div className="flex items-center gap-2 opacity-50 text-[10px] text-gray-500 select-none mb-0.5">
                                    <span>{line.time}</span> • <span>{activeTermInstance.name}</span>
                                </div>
                                <div className="flex items-start gap-2 text-white font-medium">
                                    <div className="flex items-center gap-1 shrink-0 select-none bg-black/30 rounded px-1.5 py-0.5 border border-white/5">
                                        <span className="text-emerald-400 font-bold">root</span>
                                        <span className="text-gray-600">@</span>
                                        <span className="text-cyan-400 font-bold">nexus</span>
                                    </div>
                                    <span className="text-gray-500 shrink-0">:</span>
                                    <span className="text-blue-400 font-bold shrink-0">~</span>
                                    <span className="text-gray-400 shrink-0">$</span>
                                    <span className="ml-1 tracking-wide">{line.content}</span>
                                </div>
                            </div>
                        ) : line.type === "system" ? (
                             <div className="flex items-center gap-3 text-gray-500 text-xs italic my-2 py-1 px-2 border-l-2 border-cyan-500/20 bg-cyan-500/5 w-fit rounded-r">
                                <Activity size={12} className="text-cyan-500" />
                                {line.content}
                             </div>
                        ) : (
                             <div className="text-gray-300 ml-2 pl-4 border-l-2 border-gray-800 whitespace-pre-wrap font-normal opacity-90">
                                {line.content}
                             </div>
                        )}
                    </div>
                ))}

                <div className="flex items-center gap-2 mt-3 bg-white/[0.02] p-2 -mx-2 rounded border border-white/5 shadow-inner">
                     <div className="flex items-center gap-1 shrink-0 select-none">
                        <span className="text-emerald-400 font-bold">root</span>
                        <span className="text-gray-600">@</span>
                        <span className="text-cyan-400 font-bold">nexus</span>
                        <span className="text-gray-500">:</span>
                        <span className="text-blue-400 font-bold"><ChevronsRight/></span>
                        <span className="text-gray-400">$</span>
                    </div>
                    <input
                        ref={inputRef}
                        type="text"
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent outline-none text-white border-none p-0 m-0 font-medium tracking-wide caret-cyan-500"
                        autoFocus
                        spellCheck="false"
                        autoComplete="off"
                    />
                </div>
            </div>
        )}

        {activeTab === "output" && (
            <div className="flex flex-col gap-1">
                 {outputLines.length === 0 && (
                     <div className="flex flex-col items-center justify-center mt-20 opacity-30 gap-2">
                        <TerminalIcon size={40} strokeWidth={1} />
                        <span className="text-xs uppercase tracking-[0.2em]">No Active Processes</span>
                     </div>
                 )}
                 {outputLines.map((line, i) => (
                    <div key={i} className={`flex gap-3 px-3 py-2 rounded border border-white/5 ${line.type === "error" ? "bg-red-500/5 border-red-500/20" : "bg-black/20 hover:bg-white/5"}`}>
                        <span className="text-[10px] text-gray-600 font-mono pt-1">{line.time}</span>
                        <div className="w-[1px] bg-white/10" />
                        <span className={`text-xs font-medium whitespace-pre-wrap ${line.type === "error" ? "text-red-300" : "text-gray-300"}`}>{line.content}</span>
                    </div>
                 ))}
            </div>
        )}
        <div ref={bottomRef} />
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #09090b; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #27272a; border-radius: 3px; border: 1px solid #09090b; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #06b6d4; }
        .pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
      `}</style>
    </div>
  );
});

export default Terminal;