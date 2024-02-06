import { create } from "zustand";
import { Product } from "@/types";

interface ProductViewModal {
  isOpen: boolean;
  data?: Product | undefined | null;
  onOpen: (data: Product | undefined | null) => void;
  onClose: () => void;
}

const productPreviewModal = create<ProductViewModal>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: Product | undefined | null) =>
    set({ data: data, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default productPreviewModal;
