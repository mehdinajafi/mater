import { StateCreator } from "zustand";
import { RootState } from ".";

export interface ISidebarSlice {
  isSidebarOpen: boolean;
  setSidebarIsOpen: (isOpen: boolean) => void;
}

const createSidebarSlice: StateCreator<RootState, [], [], ISidebarSlice> = (
  set
) => ({
  isSidebarOpen: false,
  setSidebarIsOpen: (isOpen) =>
    set(() => ({
      isSidebarOpen: isOpen,
    })),
});

export default createSidebarSlice;
