import { create } from "zustand";

type OnboardingState = {
  firstName: string;
  lastName: string;
  username: string;
  avatarUrl?: string;

  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setUsername: (username: string) => void;
  setAvatar: (url: string) => void;

  reset: () => void;
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  firstName: "",
  lastName: "",
  username: "",
  avatarUrl: undefined,

  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName }),
  setUsername: (username) => set({ username }),
  setAvatar: (avatarUrl) => set({ avatarUrl }),

  reset: () =>
    set({
      firstName: "",
      lastName: "",
      username: "",
      avatarUrl: undefined,
    }),
}));
