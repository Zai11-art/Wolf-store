import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/types";
import { toast } from "react-toastify";

interface CartProps {
  items: Product[];
  addProduct: (data: Product) => void;
  removeProduct: (id: string) => void;
  removeAll: () => void;
}

const cartState = create(
  persist<CartProps>(
    (set, get) => ({
      items: [],
      addProduct: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (product) => product.id === data.id
        );

        if (existingItem) {
          return toast.error("Item already in the cart.");
        }

        set({ items: [...get().items, data] });
        toast.success("Product added to cart succesfully.");
      },
      removeProduct: (id: string) => {
        set({ items: [...get().items.filter((product) => product.id !== id)] });
        toast.success("Product removed to cart.");
      },
      removeAll() {
        set({ items: [] });
      },
    }),
    {
      name: "cart-product-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default cartState;
