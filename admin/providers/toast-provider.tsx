"use client";
import { useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
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
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme.palette.mode === "light" ? "light" : "dark"}
    />
  );
};
