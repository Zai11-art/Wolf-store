"use client";

import ProductDialog from "@/components/product-dialog";
import { useState, useEffect } from "react";

export const DialogProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <ProductDialog />
    </>
  );
};
