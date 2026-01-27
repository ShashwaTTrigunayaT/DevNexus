import React from 'react';

const Terminal = () => {
  return (
    <div className="h-full w-full bg-[#0d0d14] p-3 font-mono text-sm overflow-y-auto">
       
       {/* Header */}
       <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
          <div className="flex gap-4">
             <span className="text-white border-b-2 border-primary cursor-pointer pb-1">Terminal</span>
             <span className="text-muted hover:text-white cursor-pointer transition-colors">Output</span>
             <span className="text-muted hover:text-white cursor-pointer transition-colors">Debug Console</span>
          </div>
          <button className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded text-muted transition-colors">Clear</button>
       </div>

       {/* Terminal Content */}
       <div className="space-y-1">
          <div className="text-green-400">➜  devnexus-project git:(main) <span className="text-white">npm run dev</span></div>
          <div className="text-gray-400">   VITE v5.0.0  ready in 350 ms</div>
          <div className="text-gray-400"></div>
          <div className="text-white">  ➜  Local:   <span className="text-cyan-400 underline">http://localhost:5173/</span></div>
          <div className="text-white">  ➜  Network: use --host to expose</div>
          <br />
          <div className="flex items-center gap-2">
             <span className="text-green-400">➜  devnexus-project git:(main)</span>
             <div className="w-2 h-4 bg-gray-500 animate-pulse"></div>
          </div>
       </div>
    </div>
  );
};

export default Terminal;