"use client";

import {
  Box,
  Typography,
  useTheme,
  Button,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import cartState from "@/hooks/cart-state";

const CartSummary = () => {
  const searchParams = useSearchParams();
  const products = cartState((state) => state.items);
  const removeAllProducts = cartState((state) => state.removeAll);
  const theme = useTheme();
  const md = useMediaQuery("(min-width:1000px)");

  const buttonColorMode = theme.palette.mode === "dark" ? "white" : "black";
  const buttonTextMode = theme.palette.mode === "dark" ? "black" : " white";
  const hoverColorMode = theme.palette.mode === "dark" ? "#262626" : " white";
  const hoverTextMode = theme.palette.mode === "dark" ? "white" : " black";

  useEffect(() => {
    if (searchParams.get("success")) {
      removeAllProducts();
      //  PUT TOAST HERE
      toast.success("Paid Successfully.");
    }

    if (searchParams.get("cancelled")) {
      //  PUT ERROR TOAST HERE
      toast.error("Something went wront. Try again later.");
    }
  }, [searchParams, removeAllProducts]);

  const productPriceTotal = products.reduce((total, item) => {
    // @ts-ignore
    return total + Number(item?.product?.price * item?.quantity);
  }, 0);

  console.log(products);

  const payOrder = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        products: products.map((product) => ({
          product: product?.product?.id,
          size: product.size,
          quantity: product.quantity,
        })),
      }
    );

    console.log(response.data);

    if (response.statusText) {
      window.location = response.data.url;
      removeAllProducts();
    }
  };

  return (
    <Box
      sx={{
        width: md ? "400px" : "100%",
        padding: 3,
        marginTop: md ? 13 : 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" sx={{ fontFamily: "inherit" }}>
        Cart Summary
      </Typography>
      <Box sx={{ marginTop: "25px" }}>
        <Typography variant="h6" sx={{ fontFamily: "inherit" }}>
          Order Total: $ {productPriceTotal}.00
        </Typography>
      </Box>
      <Button
        onClick={payOrder}
        disabled={products.length === 0}
        variant="outlined"
        sx={{
          // backgroundColor: buttonColorMode,
          color: buttonColorMode,
          fontWeight: "bold",
          ":hover": {
            backgroundColor: hoverColorMode,
            color: hoverTextMode,
            borderColor: hoverColorMode,
          },
          fontFamily: "inherit",
          width: "100%",
          borderRadius: "20px",
          borderColor: buttonColorMode,
          boxShadow: 5,
          marginTop: "30px",
        }}
      >
        <AttachMoneyIcon />
        Checkout Cart
      </Button>
    </Box>
  );
};

export default CartSummary;
