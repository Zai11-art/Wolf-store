import React from "react";
import { create } from "zustand";

interface useConfirmationModalProps {
  title: string;
  description: string;
  method: () => void;
}

interface useStoreDialogProps {
  isOpen: boolean;
  onOpen: (data: useConfirmationModalProps) => void;
  onClose: () => void;
  data?: useConfirmationModalProps;
}

export const useStoreDialog = create<useStoreDialogProps>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: useConfirmationModalProps) =>
    set({ isOpen: true, data: data }),
  onClose: () => set({ isOpen: false }),
}));
