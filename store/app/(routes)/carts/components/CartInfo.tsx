import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Rating,
  IconButton,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { Product } from "@/types";
import cartState from "@/hooks/cart-state";

const CartInfo = ({ data }: { data: Product }) => {
  const cart = cartState();
  const theme = useTheme();
  const md = useMediaQuery("(min-width:700px)");

  const cartItem = cart.items.find((item) => item?.product?.id === data.id);
  const [size, setSize] = useState(data?.size.id);

  const removeProduct = () => {
    cart.removeProduct(data?.id);
  };

  const buttonColorMode = theme.palette.mode === "dark" ? "white" : "black";
  const hoverColorMode = theme.palette.mode === "dark" ? "#262626" : " white";
  const hoverTextMode = theme.palette.mode === "dark" ? "white" : " black";
  const cardColorMode = theme.palette.mode === "dark" ? "#262626" : " white";

  return (
    <Box
      sx={{
        backgroundColor: cardColorMode,
        width: "100%",
        borderRadius: "15px",
        height: "100%",
        display: "flex",
        padding: 2,
        boxShadow: 15,
        marginTop: 2,
        flexDirection: "column",
        gap: 5,
        position: "relative",
      }}
    >
      <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
        <img
          style={{
            display: "flex",
            width: "200px",
            height: "200px",
            borderRadius: "15px",
            objectFit: "cover",
            objectPosition: "center",
          }}
          src={data?.images[0].url}
        />
        <Box
          sx={{
            width: "100%",
            paddingLeft: 2,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Box display="flex" alignItems="center" sx={{ gap: 1 }}>
                <Typography
                  color="text.primary"
                  variant={md ? "h4" : "h6"}
                  sx={{ fontFamily: "inherit" }}
                >
                  {data?.name}
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Rating name="read-only" value={5} readOnly />
              </Box>
            </Box>

            <Box>
              <IconButton
                onClick={removeProduct}
                sx={{
                  color: buttonColorMode,
                  fontWeight: "bold",
                  ":hover": {
                    backgroundColor: hoverColorMode,
                    color: hoverTextMode,
                    borderColor: hoverColorMode,
                  },
                  fontFamily: "inherit",
                  borderRadius: "20px",
                  borderColor: buttonColorMode,
                }}
                size="small"
              >
                <CloseIcon />
              </IconButton>

              {/* CHECKBOX */}
              <IconButton
                sx={{
                  color: buttonColorMode,
                  fontWeight: "bold",
                  ":hover": {
                    backgroundColor: hoverColorMode,
                    color: hoverTextMode,
                    borderColor: hoverColorMode,
                  },
                  fontFamily: "inherit",
                  borderRadius: "20px",
                  borderColor: buttonColorMode,
                }}
                size="small"
              >
                <CheckBoxIcon />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant={"subtitle1"}
              color="text.secondary"
              sx={{ fontFamily: "inherit" }}
            >
              Price: ${/* @ts-ignore */}
              {`${parseInt(data?.price).toFixed(2).toString()}`}
            </Typography>
            <Typography
              variant={"subtitle1"}
              color="text.secondary"
              sx={{ fontFamily: "inherit" }}
            >
              Category: {data?.category.name}
            </Typography>
            <Typography
              variant={"subtitle1"}
              color="text.secondary"
              sx={{ fontFamily: "inherit" }}
            >
              Color: {data?.color.name}
            </Typography>

            <Box sx={{ display: "flex", width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  gap: md ? 5 : 4,
                }}
                width="100%"
                flexDirection={md ? "row" : "column"}
                justifyContent={"space-between"}
              >
                <Typography
                  variant={"subtitle1"}
                  color="text.secondary"
                  sx={{ fontFamily: "inherit" }}
                >
                  Qty: {cartItem?.quantity}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* QUANTITY INCREMENTOR/DECREMENTOR */}
      <Box display="flex" alignItems={"center"} justifyContent="space-between">
        <Box
          display="flex"
          alignContent="center"
          justifyContent={"center"}
          sx={{ height: "30px" }}
        >
          <IconButton
            onClick={() => {
              cart.decrementQty(data.id);
            }}
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
            {cartItem?.quantity}
          </Box>
          <IconButton
            onClick={() => {
              cart.incrementQty(data.id);
            }}
            size="small"
          >
            <AddIcon />
          </IconButton>
        </Box>
        <TextField
          onChange={(e) => setSize(e.target.value)}
          sx={{ width: 100 }}
          size="small"
          select
          label="Select size"
          required
          defaultValue={size}
        >
          {[{ size: data?.size }].map((size, i) => (
            <MenuItem key={i} value={size?.size?.id}>
              {size?.size?.name}
            </MenuItem>
          ))}
        </TextField>
        <Typography
          sx={{
            backgroundColor: "black",
            borderRadius: 1,
            padding: 0.5,
            color: "white",
            fontWeight: "bold",
          }}
        >
          {/* @ts-ignore */}$
          {`${(cartItem?.quantity * cartItem.product.price).toFixed(2)}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default CartInfo;
