import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Rating,
  IconButton,
} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";

import { Product } from "@/types";
import cartState from "@/hooks/cart-state";

const CartInfo = ({ data }: { data: Product }) => {
  const cart = cartState();
  const theme = useTheme();
  const md = useMediaQuery("(min-width:500px)");

  const removeProduct = () => {
    cart.removeProduct(data.id);
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
        padding: 1,
        boxShadow: 15,
        marginTop: 2,
      }}
    >
      <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
        <img
          style={{
            width: md ? "230px" : "150px",
            height: "200px",
            borderRadius: "15px",
            objectFit: "cover",
            objectPosition: "center",
          }}
          src={data.images[0].url}
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
                  {data.name}
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Rating name="read-only" value={5} readOnly />
              </Box>
            </Box>

            <Button
              onClick={removeProduct}
              sx={{
                height: "30px",
                paddingLeft: "20px",
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
                // backgroundColor: "red",
              }}
              size="small"
            >
              <CloseIcon sx={{ height: "20px", width: "20px" }} />
            </Button>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant={"subtitle1"}
              color="text.secondary"
              sx={{ fontFamily: "inherit" }}
            >
              Price: ${`${parseInt(data.price).toFixed(2).toString()}`}
            </Typography>
            <Typography
              variant={"subtitle1"}
              color="text.secondary"
              sx={{ fontFamily: "inherit" }}
            >
              Category: {data.category.name}
            </Typography>
            <Typography
              variant={"subtitle1"}
              color="text.secondary"
              sx={{ fontFamily: "inherit" }}
            >
              Color: {data.color.name}
            </Typography>

            <Box
              sx={{ display: "flex", width: "100%", flexDirection: "column" }}
            >
              <Box
                sx={{ display: "flex" }}
                width="100%"
                justifyContent={"space-between"}
              >
                <Typography
                  variant={"subtitle1"}
                  color="text.secondary"
                  sx={{ fontFamily: "inherit" }}
                >
                  Qty: (amount here)
                </Typography>

                {/* QUANTITY INCREMENTOR/DECREMENTOR */}
                <Box display="flex" alignItems="center" sx={{ gap: 1 }}>
                  <IconButton size="small">
                    <RemoveIcon />
                  </IconButton>
                  <Box
                    borderRadius={1}
                    sx={{
                      backgroundColor: buttonColorMode,
                      paddingX: 1,
                      color: hoverColorMode,
                      fontWeight: "bold",
                    }}
                  >
                    1
                  </Box>
                  <IconButton size="small">
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartInfo;
