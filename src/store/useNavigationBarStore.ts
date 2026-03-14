import { create } from "zustand";

type NavigationBarStore = {
  open: boolean;
  setOpen: (value: boolean) => void;
};
export const useNavigationBarStore = create<NavigationBarStore>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
