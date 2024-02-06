import { create } from "zustand";
import { Product, Size } from "@/types";

interface buyProductModalProps {
  isOpen: boolean;
  data?: { product: Product; quantity: number; size: string };
  onOpen: (data: Product, quantity: number, size: string) => void;
  onClose: () => void;
}

const buyProductModal = create<buyProductModalProps>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (product: Product, quantity: number, size: string) =>
    set({
      data: { product: product, quantity: quantity, size: size },
      isOpen: true,
    }),
  onClose: () => set({ isOpen: false, data: undefined }),
}));

export default buyProductModal;
