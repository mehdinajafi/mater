import { StateCreator } from "zustand";
import { RootState } from ".";

export type Langs = "en" | "fa";

export interface ILanguageSlice {
  language: Langs;
  setLanguage: (langCode: Langs) => void;
}

const createLanguageSlice: StateCreator<RootState, [], [], ILanguageSlice> = (
  set
) => ({
  language: "en",
  setLanguage: (langCode: Langs) => set(() => ({ language: langCode })),
});

export default createLanguageSlice;
