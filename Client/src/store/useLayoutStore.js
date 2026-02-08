import { create } from "zustand";

const useLayoutStore = create((set) => ({
  isSidebarOpen: true,
  isTerminalOpen: true,
  isAIPanelOpen: false, // Default closed

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleTerminal: () => set((state) => ({ isTerminalOpen: !state.isTerminalOpen })),
  toggleAIPanel: () => set((state) => ({ isAIPanelOpen: !state.isAIPanelOpen })),
}));

export default useLayoutStore;