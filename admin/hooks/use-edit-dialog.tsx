import React from "react";
import { create } from "zustand";

interface DataProps {
  id: string;
  method: (storeId: string, id: string) => void;
}

interface useWarningDialog {
  isOpen: boolean;
  data?: DataProps;
  onOpen: (data: DataProps) => void;
  onClose: () => void;
}

export const useWarningDialog = create<useWarningDialog>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: DataProps) => set({ data: data, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
