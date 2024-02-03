import { create } from "zustand";

interface DataProps {
  data?: string;
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
