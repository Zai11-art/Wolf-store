"use client";

import React from "react";
import { Box, useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import productPreviewModal from "@/hooks/product-preview-modal";
import cartState from "@/hooks/cart-state";
import { Product } from "@/types";

const ProductInfo = ({ product }: { product: Product }) => {
  const theme = useTheme();
  const cart = cartState();
  const md = useMediaQuery("(min-width:800px)");

  const addToCard: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    cart.addProduct(product);
  };

  const buttonColorMode = theme.palette.mode === "dark" ? "white" : "black";
  const buttonTextMode = theme.palette.mode === "dark" ? "black" : " white";
  const hoverColorMode = theme.palette.mode === "dark" ? "#262626" : " white";
  const hoverTextMode = theme.palette.mode === "dark" ? "white" : " black";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: md ? 3 : "",
        width: "100%",
        gap: md ? "" : "20px",
        marginTop: md ? "" : "20px",
        // backgroundColor: "red",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Typography
            component="div"
            variant="h4"
            sx={{ fontFamily: "inherit" }}
          >
            {product.name}
          </Typography>
        </Box>
        <Typography
          sx={{ fontFamily: "inherit" }}
          variant="h5"
          color="text.primary"
          component="div"
        >
          Price : {`${parseInt(product.price).toFixed(2).toString()}`}
        </Typography>
      </Box>
      <CardContent
        sx={{
          gap: "10px",
          display: "flex",
          flexDirection: "column",
          // backgroundColor: 'red',
          padding: 0,
        }}
      >
        <Typography
          variant="subtitle1"
          color="text.secondary"
          component="div"
          sx={{ fontFamily: "inherit" }}
        >
          Size: {product.size.name}
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          component="div"
          sx={{ fontFamily: "inherit" }}
        >
          Color: {product.color.name}
        </Typography>
      </CardContent>

      <Box
        sx={{
          width: "100%",
        }}
      >
        <Button
          onClick={addToCard}
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
          }}
        >
          <AddShoppingCartIcon sx={{ marginRight: 1 }} />
          Add this to cart
        </Button>
      </Box>
    </Box>
  );
};

export default ProductInfo;
