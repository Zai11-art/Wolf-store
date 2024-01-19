"use client";

import StoreDialog from "@/components/store-dialog";
import { useState, useEffect } from "react";

export const DialogProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <StoreDialog />
    </>
  );
};

