"use client";

import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import productPreviewModal from "@/hooks/product-preview-modal";
import { IconButton, useTheme, Box, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import cartState from "@/hooks/cart-state";
import ImageSLider from "./gallery";

const dummydata = [
  {
    id: "camera",
    category: "tech",
    name: "Nikon Z 1.4g",
    price: "$100.00",
    isFeatured: "hehe",
    size: "Large",
    color: "Black",
    images:
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "camera2",
    category: "tech",
    name: "Nikon Z 1.4g",
    price: "$100.00",
    isFeatured: "hehe",
    size: "Large",
    color: "Black",
    images:
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export default function ProductDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const md = useMediaQuery("(min-width:800px)");

  const theme = useTheme();
  const cart = cartState();
  const productModal = productPreviewModal();
  const product = productPreviewModal((state) => state.data);

  const buttonColorMode = theme.palette.mode === "dark" ? "white" : "black";
  const buttonTextMode = theme.palette.mode === "dark" ? "black" : " white";
  const hoverColorMode = theme.palette.mode === "dark" ? "#262626" : " white";
  const hoverTextMode = theme.palette.mode === "dark" ? "white" : " black";

  const addToCard: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    cart.addProduct(product);
  };

  if (!product) {
    return null;
  }

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={productModal.isOpen}
      onClose={productModal.onClose}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            borderRadius: "15px",
            height: "550px",
            // padding: '1px'
          },
        },
      }}
    >
      <Card sx={{ display: "flex", height: md ? "350px" : "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: md ? "row" : "column",
            width: "100%",
          }}
        >
          <ImageSLider images={dummydata} />
          {/* <CardMedia
            component="img"
            sx={{ width: md ? 400 : "100%" }}
            image={product.images}
            alt="Live from space album cover"
          /> */}
          <Box>
            <Button
              onClick={productModal.onClose}
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
                position: "absolute",
                right: 5,
                top: 15,
                zIndex: 100,
              }}
            >
              <CloseIcon />
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: 3,
              width: "100%",
              height: "550px",
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
                Price : {product.price}
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
                Size: {product.size}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
                sx={{ fontFamily: "inherit" }}
              >
                Color: {product.color}
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
                }}
              >
                <AddShoppingCartIcon sx={{ marginRight: 1 }} />
                Add this to cart
              </Button>
            </Box>
          </Box>
        </Box>
      </Card>
    </Dialog>
  );
}
