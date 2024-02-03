import { create } from "zustand";

interface useStoreDialogProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useStoreDialog = create<useStoreDialogProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
