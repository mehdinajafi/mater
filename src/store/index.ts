import create from "zustand";
import createSidebarSlice, { ISidebarSlice } from "./Sidebar";

export type RootState = ISidebarSlice;

export const useAppStore = create<RootState>((...a) => ({
  ...createSidebarSlice(...a),
}));
