"use client";

import * as React from "react";
import { useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { useRouter } from "next/navigation";
import productPreviewModal from "@/hooks/product-preview-modal";
import { Product } from "@/types";
import cartState from "@/hooks/cart-state";
import { useMediaQuery } from "@mui/material";
import { toast } from "react-toastify";

interface ProductCardProps {
  data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const theme = useTheme();
  const router = useRouter();
  const previewModal = productPreviewModal();
  const cart = cartState();

  const onOpen = productPreviewModal((state) => state.onOpen);
  const onClose = productPreviewModal((state) => state.onClose);
  const sm = useMediaQuery("(min-width:1000px)");

  const buttonColorMode = theme.palette.mode === "dark" ? "white" : "black";
  const buttonTextMode = theme.palette.mode === "dark" ? "black" : " white";
  const hoverColorMode = theme.palette.mode === "dark" ? "#262626" : " white";
  const hoverTextMode = theme.palette.mode === "dark" ? "white" : " black";

  const handleViewProduct = () => {
    router.push(`/product/${data?.id}`);
  };

  const previewProduct: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    console.log(data);
    previewModal.onOpen(data);
    console.log(previewModal.onOpen(data));
  };

  const addToCard: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    if (!cart.items.find((item) => item.id === data.id)) {
      toast.success("Added product to cart.");
    }

    cart.addProduct(data);
  };

  return (
    <Card
      sx={{
        width: 300,
        height: "100%",
        fontFamily: "inherit",
        borderRadius: "15px",
        boxShadow: 8,
      }}
    >
      <CardMedia
        sx={{ height: 250, cursor: "pointer" }}
        image={data.images}
        onClick={handleViewProduct}
      />
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          // gap: "2px",
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontFamily: "inherit" }}
        >
          {data.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {data.category}
        </Typography>
        <Typography variant="h6" component="div" color="text.primary">
          {data.price}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          paddingX: "20px",
          display: "flex",

          justifyContent: "center",
          paddingBottom: "20px",
        }}
      >
        <Button
          onClick={previewProduct}
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
          size="small"
        >
          <ZoomInIcon fontSize="small" />
          CHECK OUT!
        </Button>
        <Button
          onClick={addToCard}
          sx={{
            backgroundColor: buttonColorMode,
            color: buttonTextMode,
            fontWeight: "bold",
            ":hover": {
              backgroundColor: hoverColorMode,
              color: hoverTextMode,
            },
            fontFamily: "inherit",

            borderRadius: "20px",
          }}
          size="small"
        >
          <AddShoppingCartIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
