import React, { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import useLayoutStore from "../../store/useLayoutStore";

import Sidebar from "../Sidebar";
import FileExplorer from "../FileExplorer";
import CollaboratorList from "../CollaboratorList";
import Terminal from "../Terminal";
import AIChatPanel from "../AIChatPanel";

// ✅ 1. Accept 'terminalRef' here
const IdeLayout = ({ children, roomId, project, user, onRun, code, onFileSelect, terminalRef }) => {
  const { isSidebarOpen, isTerminalOpen, isAIPanelOpen } = useLayoutStore();
  const [activeTab, setActiveTab] = useState("files");

  return (
    <div className="h-[calc(100vh-3.5rem)] w-full bg-background overflow-hidden flex text-text font-sans">
      
      <Sidebar
        roomId={roomId}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRun={onRun}
      />

      <PanelGroup direction="horizontal" autoSaveId="devnexus-layout-main">
        {isSidebarOpen && (
          <>
            <Panel defaultSize={15} minSize={10} maxSize={25} collapsible className="bg-[#0a0a0f] border-r border-white/5 flex flex-col">
              {activeTab === "files" ? (
                <FileExplorer 
                   roomId={roomId}
                   project={project} 
                   onFileSelect={onFileSelect} 
                />
              ) : (
                <CollaboratorList user={user} project={project} />
              )}
            </Panel>
            <ResizeHandle />
          </>
        )}

        <Panel defaultSize={60} minSize={30}>
          <PanelGroup direction="vertical">
            <Panel defaultSize={isTerminalOpen ? 70 : 100} className="relative bg-[#050507]">
              {children}
            </Panel>
            {isTerminalOpen && (
              <>
                <ResizeHandle orientation="vertical" />
                <Panel defaultSize={30} minSize={10} maxSize={60} className="bg-[#0d0d14] border-t border-white/5">
                  {/* ✅ 2. Pass the 'ref' here so EditorPage can control it */}
                  <Terminal 
                      ref={terminalRef}
                      roomId={roomId} 
                      project={project} 
                      user={user} 
                   />
                </Panel>
              </>
            )}
          </PanelGroup>
        </Panel>

        {isAIPanelOpen && (
          <>
            <ResizeHandle />
            <Panel defaultSize={25} minSize={20} maxSize={40} className="bg-[#0a0a0f] border-l border-white/5">
              <AIChatPanel roomId={roomId} project={project} code={code} />
            </Panel>
          </>
        )}
      </PanelGroup>
    </div>
  );
};

const ResizeHandle = ({ orientation = "horizontal" }) => (
  <PanelResizeHandle className={`flex items-center justify-center bg-[#050507] hover:bg-primary/20 transition-colors z-10 ${orientation === "horizontal" ? "w-1.5 h-full cursor-col-resize hover:w-2" : "h-1.5 w-full cursor-row-resize hover:h-2"}`}>
    <div className={`bg-white/10 rounded-full ${orientation === "horizontal" ? "w-0.5 h-8" : "h-0.5 w-8"}`} />
  </PanelResizeHandle>
);

export default IdeLayout;