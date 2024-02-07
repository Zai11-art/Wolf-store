"use client";

import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";

import CartMain from "./components/CartMain";
import Deliver from "./components/Delivering";
import Cancelled from "./components/Cancelled";

const CartPage = () => {
  const [isMounted, setisMounted] = useState(false);

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Container maxWidth="xl">
      <CartMain />
      <Deliver />
      <Cancelled />
    </Container>
  );
};

export default CartPage;
