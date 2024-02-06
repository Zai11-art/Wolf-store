"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  useTheme,
  Box,
  useMediaQuery,
  IconButton,
  TextField,
  MenuItem,
} from "@mui/material";

import cartState from "@/hooks/cart-state";
import buyProductModal from "@/hooks/buy-product-modal";
import { Size } from "@/types";

export default function BuyProductDialog() {
  const md = useMediaQuery("(min-width:800px)");

  const theme = useTheme();
  const cart = cartState();
  const productModal = buyProductModal();
  const productData = buyProductModal((state) => state?.data);
  const product = productData?.product;

  const [size, setSize] = React.useState(productData?.size);
  const [quantity, setQuantity] = React.useState<number>(
    productData?.quantity || 1
  );

  React.useEffect(() => {
    setQuantity(productData?.quantity ? productData?.quantity : 0);
    setSize(productData?.size);
  }, [productData?.quantity, productData?.size, productData]);

  const closeModal = () => {
    productModal.onClose();
  };

  const buttonColorMode = theme.palette.mode === "dark" ? "white" : "black";
  const hoverColorMode = theme.palette.mode === "dark" ? "#262626" : " white";
  const hoverTextMode = theme.palette.mode === "dark" ? "white" : " black";
  const cardColorMode = theme.palette.mode === "dark" ? "#262626" : " white";

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
          },
        },
      }}
    >
      <Card
        sx={{
          display: "flex",
          height: md ? "400px" : "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          <Box
            sx={{
              flexDirection: "column",
              width: "100%",
              borderRadius: "15px",
              height: "100%",
              display: "flex",
              padding: 3,
              boxShadow: 15,
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
                  Confirm order?
                </Typography>
              </Box>
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
                  right: 0,
                  top: 20,
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
                width: "100%",
                height: "100%",
                gap: 5,
              }}
            >
              <Box
                sx={{
                  backgroundColor: cardColorMode,
                  display: "flex",
                  flexDirection: md ? "row" : "column",
                  gap: 5,
                  boxShadow: 12,
                  borderRadius: 3,
                  padding: 3,
                }}
              >
                <Box
                  sx={{ display: "flex", width: "100%", height: 150, gap: 1 }}
                >
                  <Box sx={{ width: 200, height: 150 }}>
                    <img
                      src={product.images[0].url}
                      style={{ width: "100%", height: "100%", borderRadius: 5 }}
                      alt={"image"}
                    />
                  </Box>

                  <Box
                    sx={{ display: "flex", gap: 0.1, height: "100%" }}
                    flexDirection="column"
                  >
                    <Typography
                      sx={{ fontFamily: "inherit" }}
                      variant="h6"
                      color="text.primary"
                      component="div"
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "inherit" }}
                      variant="h6"
                      color="text.primary"
                      component="div"
                    >
                      ${product.price}.00
                    </Typography>
                  </Box>
                </Box>

                <Box flexDirection="column" display="flex">
                  {/* QUANTITY COUNTER HERE */}
                  <Box
                    display={"flex"}
                    sx={{
                      gap: 5,
                      display: "flex",
                      width: "100%",
                      height: "100%",
                    }}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box
                      display="flex"
                      sx={{
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        display="flex"
                        alignContent="center"
                        sx={{ width: "100%" }}
                      >
                        <IconButton
                          onClick={() =>
                            setQuantity((prev) => (prev <= 1 ? prev : prev - 1))
                          }
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
                    </Box>
                    <TextField
                      onChange={(e) => setSize(e.target.value)}
                      sx={{ width: 150 }}
                      size="small"
                      select
                      label="Select size"
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
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  gap: 1,
                }}
              >
                <Button
                  onClick={closeModal}
                  variant="outlined"
                  sx={{
                    backgroundColor: "red",
                    color: "white",
                    fontWeight: "bold",
                    ":hover": {
                      backgroundColor: hoverColorMode,
                      color: hoverTextMode,
                      borderColor: hoverColorMode,
                    },
                    fontFamily: "inherit",
                    borderRadius: "20px",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: "green",
                    color: "white",
                    fontWeight: "bold",
                    ":hover": {
                      backgroundColor: hoverColorMode,
                      color: hoverTextMode,
                      borderColor: hoverColorMode,
                    },
                    fontFamily: "inherit",
                    borderRadius: "20px",
                  }}
                >
                  Pay
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>
    </Dialog>
  );
}
