"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import CardContent from "@mui/material/CardContent";
import { useTheme, Box, useMediaQuery, Rating } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

import { Product } from "@/types";
import ImageSLider from "./gallery";
import cartState from "@/hooks/cart-state";
import productPreviewModal from "@/hooks/product-preview-modal";

export default function ProductDialog() {
  const md = useMediaQuery("(min-width:800px)");

  const theme = useTheme();
  const cart = cartState();
  const productModal = productPreviewModal();
  const product = productPreviewModal<Product | null | undefined>(
    (state) => state?.data
  );

  const buttonColorMode = theme.palette.mode === "dark" ? "white" : "black";
  const hoverColorMode = theme.palette.mode === "dark" ? "#262626" : " white";
  const hoverTextMode = theme.palette.mode === "dark" ? "white" : " black";

  const addToCard: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    if (cart.items.some((item) => item.id === product?.id)) {
      // @ts-ignore
      cart.removeProduct(product?.id);
    } else {
      // @ts-ignore
      cart.addProduct(product);
    }
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
          <ImageSLider images={product.images} />

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
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
                sx={{ fontFamily: "inherit" }}
              >
                Description: {product.description}
              </Typography>

              <Typography component="legend"> Rating:</Typography>
              <Rating name="read-only" value={3.2} readOnly />
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
                {cart.items.some((item) => item.id === product.id) ? (
                  <>
                    <RemoveShoppingCartIcon color="error" />
                    Remove to cart
                  </>
                ) : (
                  <>
                    <AddShoppingCartIcon
                      color="success"
                      sx={{ marginRight: 1 }}
                    />
                    Add to cart
                  </>
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Card>
    </Dialog>
  );
}
