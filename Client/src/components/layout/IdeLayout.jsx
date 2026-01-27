import React from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import useLayoutStore from '../../store/useLayoutStore';

// Import all the UI Components we built
import FileExplorer from '../FileExplorer';
import Terminal from '../Terminal';
import AIChatPanel from '../AIChatPanel'; // Ensure you created this file!

const IdeLayout = ({ children }) => {
  // Get toggle states from the store
  const { isSidebarOpen, isTerminalOpen, isAIPanelOpen } = useLayoutStore();

  return (
    // Main Container: Subtracts navbar height (3.5rem) to fit screen exactly
    <div className="h-[calc(100vh-3.5rem)] w-full bg-background overflow-hidden flex text-text">
      
      {/* 1. HORIZONTAL GROUP (Sidebar | Main Content | AI Panel) */}
      <PanelGroup direction="horizontal" autoSaveId="devnexus-layout-main">
        
        {/* LEFT SIDEBAR (File Explorer) */}
        {isSidebarOpen && (
          <>
            <Panel defaultSize={15} minSize={10} maxSize={25} collapsible className="bg-surface border-r border-white/5 flex flex-col">
              <FileExplorer />
            </Panel>
            <ResizeHandle />
          </>
        )}

        {/* CENTER AREA (Editor + Terminal) */}
        <Panel minSize={30}>
          
          {/* 2. VERTICAL GROUP (Code Editor / Terminal) */}
          <PanelGroup direction="vertical" autoSaveId="devnexus-layout-vertical">
            
            {/* TOP: Code Editor (The 'children' prop is the Monaco Editor) */}
            <Panel minSize={30} className="relative bg-[#0a0a0f]">
               {children} 
            </Panel>

            {/* BOTTOM: Terminal */}
            {isTerminalOpen && (
              <>
                <ResizeHandle orientation="vertical" />
                <Panel defaultSize={30} minSize={10} maxSize={60} className="bg-[#0d0d14] border-t border-white/5">
                  <Terminal />
                </Panel>
              </>
            )}

          </PanelGroup>
        </Panel>

        {/* RIGHT SIDEBAR (AI Assistant) */}
        {isAIPanelOpen && (
          <>
            <ResizeHandle />
            <Panel defaultSize={25} minSize={20} maxSize={40} className="bg-surface border-l border-white/5 backdrop-blur-sm">
               <AIChatPanel />
            </Panel>
          </>
        )}

      </PanelGroup>
    </div>
  );
};

// --- Helper Component for the Drag Handles ---
const ResizeHandle = ({ orientation = "horizontal" }) => {
  return (
    <PanelResizeHandle 
      className={`flex items-center justify-center bg-background hover:bg-primary/20 transition-colors
        ${orientation === 'horizontal' ? 'w-1.5 h-full cursor-col-resize' : 'h-1.5 w-full cursor-row-resize'}
      `}
    >
      <div className={`bg-white/10 rounded-full 
        ${orientation === 'horizontal' ? 'h-8 w-1' : 'w-8 h-1'}
      `} />
    </PanelResizeHandle>
  );
};

export default IdeLayout;