"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //add this line

export const ToastProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ToastContainer
      position="top-center"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      theme={theme.palette.mode === "light" ? "light" : "dark"}
    />
  );
};
