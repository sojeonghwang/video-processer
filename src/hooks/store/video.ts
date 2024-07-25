import { create } from "zustand";

export interface VideoStateInterface {
  duration: number;
  currentTime: number;
  isPlaying: boolean;
  isMute: boolean;
}

interface VideoState {
  video: VideoStateInterface | null;
}

interface VideoAction {
  setVideo: (video: VideoStateInterface) => void;
  initVideo: () => void;
  setMute: (isMute: boolean) => void;
  setCurrentTime: (currentTime: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

const videoStore = create<VideoState & VideoAction>((set) => ({
  video: null,
  setVideo: (video: VideoStateInterface) => {
    set(() => {
      return {
        video,
      };
    });
  },
  initVideo: () => {
    set(() => {
      return {
        video: null,
      };
    });
  },
  setMute: (isMute: boolean) => {
    set((state) => {
      const {
        currentTime = 0,
        duration = 0,
        isPlaying = false,
      } = state.video ?? {};
      return {
        video: {
          duration,
          currentTime,
          isPlaying,
          isMute,
        },
      };
    });
  },
  setCurrentTime: (currentTime: number) => {
    set((state) => {
      const {
        isMute = false,
        duration = 0,
        isPlaying = false,
      } = state.video ?? {};
      return {
        video: {
          duration,
          currentTime,
          isPlaying,
          isMute,
        },
      };
    });
  },
  setIsPlaying: (isPlaying: boolean) => {
    set((state) => {
      const {
        isMute = false,
        duration = 0,
        currentTime = 0,
      } = state.video ?? {};
      return {
        video: {
          duration,
          currentTime,
          isPlaying,
          isMute,
        },
      };
    });
  },
}));

export default videoStore;
