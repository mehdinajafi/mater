import { StateCreator } from "zustand";
import { RootState } from ".";

export interface ISidebarSlice {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const createSidebarSlice: StateCreator<RootState, [], [], ISidebarSlice> = (
  set
) => ({
  isSidebarOpen: false,
  toggleSidebar: () =>
    set((state) => ({
      isSidebarOpen: !state.isSidebarOpen,
    })),
});

export default createSidebarSlice;
