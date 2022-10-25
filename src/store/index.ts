import create from "zustand";
import createSidebarSlice, { ISidebarSlice } from "./Sidebar";
import createLanguageSlice, { ILanguageSlice } from "./Language";

export type RootState = ISidebarSlice & ILanguageSlice;

export const useAppStore = create<RootState>((...a) => ({
  ...createSidebarSlice(...a),
  ...createLanguageSlice(...a),
}));
