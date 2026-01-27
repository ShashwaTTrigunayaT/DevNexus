import { create } from 'zustand';

const useLayoutStore = create((set) => ({
  // Initial State: Sidebar and Terminal open, AI Panel closed
  isSidebarOpen: true,
  isTerminalOpen: true,
  isAIPanelOpen: false, 
  
  // Actions to toggle panels
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleTerminal: () => set((state) => ({ isTerminalOpen: !state.isTerminalOpen })),
  toggleAIPanel: () => set((state) => ({ isAIPanelOpen: !state.isAIPanelOpen })),
}));

export default useLayoutStore;