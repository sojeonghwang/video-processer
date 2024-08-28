import { create } from "zustand";

export interface SubtitleInterface {
  text: string;
  id: number;
}

interface SubtitleState {
  subtitle: SubtitleInterface[];
}

interface SubtitleAction {
  setSubtitle: (subtitle: SubtitleInterface[]) => void;
}

const subtitleStore = create<SubtitleState & SubtitleAction>((set) => ({
  subtitle: [],
  setSubtitle: (subtitle: SubtitleInterface[]) => {
    set(() => {
      if (!subtitle) {
        return {
          subtitle: [],
        };
      }
      return {
        subtitle,
      };
    });
  },
}));

export default subtitleStore;
