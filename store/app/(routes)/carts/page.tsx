"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Container, Box, Typography, useMediaQuery } from "@mui/material";
import CartInfo from "./components/CartInfo";
import cartState from "@/hooks/cart-state";
import CartSummary from "./components/Cart-Summary";

const CartPage = () => {
  const [isMounted, setisMounted] = useState(false);
  const cart = cartState();
  const md = useMediaQuery("(min-width:1000px)");

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) return null;

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
