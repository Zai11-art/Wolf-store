"use client";

import { useEffect } from "react";
import { useStoreDialog } from "@/hooks/use-store-dialog";

const Home = () => {
  const onOpen = useStoreDialog((state) => state.onOpen);
  const isOpen = useStoreDialog((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};

export default Home;
