import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/types";
import { toast } from "react-toastify";

interface ItemData {
  product: Product | undefined;
  size: string | undefined;
  quantity: number | undefined;
}

export interface CartProps {
  items: ItemData[];
  addProduct: (
    data: Product | undefined,
    size: string | undefined,
    quantity: number | undefined
  ) => void;
  removeProduct: (id: string) => void;
  removeAll: () => void;
  incrementQty: (data: string) => void;
  decrementQty: (data: string) => void;
}

const cartState = create(
  persist<CartProps>(
    (set, get) => ({
      items: [],
      addProduct: (
        data: Product | undefined,
        size: string | undefined,
        quantity: number | undefined
      ) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (product) => product?.product?.id === data?.id
        );

        if (existingItem) {
          return toast.error("Item already in the cart.");
        }

        set({
          items: [
            ...get().items,
            { product: data, quantity: quantity, size: size },
          ],
        });
        toast.success("Product added to cart succesfully.");
      },
      incrementQty: (productId: string) => {
        const currentItems = get().items;
        const newArray = currentItems.map((item) =>
          item.product?.id === productId
            ? { ...item, quantity: (item?.quantity ? item?.quantity : 1) + 1 }
            : item
        );

        set({ items: [...newArray] });
      },
      decrementQty: (productId: string) => {
        const currentItems = get().items;
        const newArray = currentItems.map((item) =>
          item?.product?.id === productId
            ? {
                ...item,
                // @ts-ignore
                quantity: item.quantity <= 1 ? 1 : item.quantity - 1,
              }
            : item
        );

        set({ items: [...newArray] });
      },
      removeProduct: (id: string) => {
        set({
          items: [
            ...get().items.filter((product) => product?.product?.id !== id),
          ],
        });
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

// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
// import { Product } from "@/types";
// import { toast } from "react-toastify";

// interface CartProps {
//   items: Product[];
//   addProduct: (data: Product) => void;
//   removeProduct: (id: string) => void;
//   removeAll: () => void;
// }

// const cartState = create(
//   persist<CartProps>(
//     (set, get) => ({
//       items: [],
//       addProduct: (data: Product) => {
//         const currentItems = get().items;
//         console.log(currentItems);
//         const existingItem = currentItems.find(
//           (product) => product.id === data.id
//         );

//         if (existingItem) {
//           return toast.error("Item already in the cart.");
//         }

//         set({ items: [...get().items, data] });
//         toast.success("Product added to cart succesfully.");
//       },
//       removeProduct: (id: string) => {
//         set({ items: [...get().items.filter((product) => product.id !== id)] });
//         toast.success("Product removed to cart.");
//       },
//       removeAll() {
//         set({ items: [] });
//       },
//     }),
//     {
//       name: "cart-product-storage",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );

// export default cartState;
