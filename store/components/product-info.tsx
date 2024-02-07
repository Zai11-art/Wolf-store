"use client";

import {
  Box,
  useTheme,
  useMediaQuery,
  Rating,
  IconButton,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import RemoveIcon from "@mui/icons-material/Remove";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

import { Product } from "@/types";
import cartState from "@/hooks/cart-state";
import buyProductModal from "@/hooks/buy-product-modal";

const ProductInfo = ({ product }: { product: Product }) => {
  const theme = useTheme();
  const cart = cartState();
  const buyModal = buyProductModal();
  const md = useMediaQuery("(min-width:800px)");

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(product.size.id);

  console.log("HERE");
  console.log(cart.items);

  const addToCard: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    if (cart.items.some((item) => item?.product?.id === product?.id)) {
      cart.removeProduct(product?.id);
    } else {
      cart.addProduct(product, size, quantity);
    }
  };

  const buyitem = () => {
    // (product, quantity, size)
    buyModal.onOpen(product, quantity, size);
  };

  const hoverTextMode = theme.palette.mode === "dark" ? "white" : " black";
  const buttonTextMode = theme.palette.mode === "dark" ? "black" : " white";
  const buttonColorMode = theme.palette.mode === "dark" ? "white" : "black";
  const hoverColorMode = theme.palette.mode === "dark" ? "#262626" : " white";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        paddingX: md ? 3 : "",
        paddingY: md ? "" : 3,
        gap: 3,
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "",
          }}
        >
          <Box>
            <Typography
              component="div"
              variant="h4"
              sx={{ fontFamily: "inherit" }}
            >
              {product.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Rating precision={0.1} name="read-only" value={4.4} readOnly />
              <Typography variant="h6" color="text.secondary">
                (2)
              </Typography>
            </Box>
          </Box>
          <Typography
            sx={{ fontFamily: "inherit" }}
            variant="h4"
            color="text.primary"
            component="div"
          >
            ${`${parseInt(product.price).toFixed(2).toString()}`}
          </Typography>
        </Box>
      </Box>

      <CardContent
        sx={{
          gap: 2,
          display: "flex",
          flexDirection: "column",
          padding: 0,
        }}
      >
        <Typography
          variant="subtitle1"
          color="text.primary"
          component="div"
          sx={{ fontFamily: "inherit" }}
        >
          Sizes(add more sizes here): {product.size.name}
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.primary"
          component="div"
          sx={{ fontFamily: "inherit" }}
        >
          Color: <code>{product.color.name}</code>
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.primary"
          component="div"
          sx={{ fontFamily: "inherit" }}
        >
          Stocks: <code>{product.stocks}</code>
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.primary"
          component="div"
          sx={{ fontFamily: "inherit" }}
        >
          Description: {product.description}
        </Typography>
      </CardContent>

      {/* QUANTITY INCREMENTOR/DECREMENTOR */}
      <Box
        display="flex"
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <Box display="flex" alignContent="center" sx={{ width: "100%" }}>
          <IconButton
            onClick={() => setQuantity((prev) => (prev <= 1 ? prev : prev - 1))}
            size="small"
          >
            <RemoveIcon />
          </IconButton>
          <Box
            borderRadius={1}
            sx={{
              backgroundColor: buttonColorMode,
              paddingX: 1,
              color: hoverColorMode,
              fontWeight: "bold",
              width: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {quantity}
          </Box>
          <IconButton
            onClick={() => setQuantity((prev) => prev + 1)}
            size="small"
          >
            <AddIcon />
          </IconButton>
        </Box>
        <TextField
          onChange={(e) => setSize(e.target.value)}
          sx={{ width: 200 }}
          size="small"
          select
          label="Select size"
          required
          defaultValue={size}
        >
          {/* FIX THIS */}
          {[{ size: product.size }].map((size, i) => (
            <MenuItem key={i} value={size.size.id}>
              {size.size.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box
        display={"flex"}
        flexDirection={md ? "row" : "column"}
        sx={{
          width: "100%",
          gap: 2,
        }}
      >
        <Button
          onClick={buyitem}
          variant="outlined"
          sx={{
            // backgroundColor: buttonColorMode,
            backgroundColor: "green",
            color: "white",
            fontWeight: "bold",
            ":hover": {
              backgroundColor: hoverColorMode,
              color: hoverTextMode,
              borderColor: hoverColorMode,
            },
            fontFamily: "inherit",
            width: "100%",
            borderRadius: "20px",
            boxShadow: 5,
            padding: 1,
          }}
        >
          <AttachMoneyIcon /> Buy
        </Button>
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
            display: "flex",
            padding: 1,
          }}
        >
          {cart.items.some((item) => item?.product?.id === product.id) ? (
            <>
              <RemoveShoppingCartIcon color="error" />
              Remove to cart
            </>
          ) : (
            <>
              <AddShoppingCartIcon color="success" sx={{ marginRight: 1 }} />
              Add to cart
            </>
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default ProductInfo;
