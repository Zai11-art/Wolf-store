"use client";

import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { Container, Box, Typography, useMediaQuery } from "@mui/material";

import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import cartState from "@/hooks/cart-state";
import CartInfo from "./components/CartInfo";
import CartSummary from "./components/Cart-Summary";

const CartPage = () => {
  const [isMounted, setisMounted] = useState(false);
  const cart = cartState();
  const md = useMediaQuery("(min-width:1000px)");
  const { userId: isAuth } = useAuth();

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) return null;

  if (!isAuth) {
    toast.error("Sign in to access and add items to your cart.");
    return redirect("/sign-in");
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        alignItems: "",
        width: "100%",
        height: "100%",
        flexDirection: md ? "row" : "column",
        overflow: "hidden",
        paddingBottom: "200px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          marginTop: 5,
          width: "100%",
          height: "100%",
          flexDirection: "column",
          // backgroundColor: "blue",
          justifyContent: "space-around",
        }}
      >
        <Typography
          variant="h3"
          sx={{ marginBottom: "20px", fontFamily: "inherit" }}
        >
          Product cart
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {cart.items.map((item, i) => (
            <CartInfo key={i} data={item} />
          ))}
        </Box>
      </Box>
      <CartSummary />
    </Container>
  );
};

export default CartPage;
