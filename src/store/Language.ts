import { StateCreator } from "zustand";
import { RootState } from ".";

export type Langs = "en";

export interface ILanguageSlice {
  language: Langs;
  setLanguage: (langCode: Langs) => void;
}

export const languages: Record<Langs, { name: string; flag: string }> = {
  en: {
    name: "English",
    flag: "/assets/icons/flags/en.svg",
  },
};

const createLanguageSlice: StateCreator<RootState, [], [], ILanguageSlice> = (
  set
) => ({
  language: "en",
  setLanguage: (langCode: Langs) => set(() => ({ language: langCode })),
});

export default createLanguageSlice;
