"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CheckIcon from "@mui/icons-material/Check";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

import { Product } from "@/types";
import cartState from "@/hooks/cart-state";
import productPreviewModal from "@/hooks/product-preview-modal";
import { useAuth } from "@clerk/nextjs";
import { toast } from "react-toastify";

interface ProductCardProps {
  data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({
  data,
}: {
  data: Product;
}) => {
  // CHECK IF USER LOGGED IN EXISTS
  const { userId: isAuth } = useAuth();

  const theme = useTheme();
  const router = useRouter();
  const previewModal = productPreviewModal();
  const cart = cartState();
  const md = useMediaQuery("(min-width:768px)");

  const buttonColorMode = theme.palette.mode === "dark" ? "white" : "black";
  const buttonTextMode = theme.palette.mode === "dark" ? "black" : " white";
  const hoverColorMode = theme.palette.mode === "dark" ? "#262626" : " white";
  const hoverTextMode = theme.palette.mode === "dark" ? "white" : " black";

  const handleViewProduct = () => {
    isAuth ? router.push(`/product/${data?.id}`) : router.push(`/sign-in`);
  };

  const previewProduct: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    previewModal.onOpen(data);
  };

  const addToCard: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    if (!isAuth) {
      toast.error("Sign in to add item to cart.");
      router.push("/sign-in");
    }

    if (cart.items.some((item) => item.product.id === data.id)) {
      cart.removeProduct(data.id);
    } else {
      cart.addProduct(data, data.size.id, 1);
    }
  };

  console.log(cart.items);

  return (
    <Card
      sx={{
        width: md ? 350 : "100%",
        height: "100%",
        fontFamily: "inherit",
        borderRadius: "15px",
        boxShadow: 8,
      }}
    >
      <CardMedia
        sx={{ height: 250, cursor: "pointer" }}
        image={data.images[0].url}
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
          {data.category.name}
        </Typography>
        <Typography variant="h6" component="div" color="text.primary">
          $ {`${parseInt(data.price).toFixed(2).toString()}`}
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
          View
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
          {cart.items.some((item) => item.product.id === data.id) ? (
            <RemoveShoppingCartIcon color="error" />
          ) : (
            <AddShoppingCartIcon color="success" />
          )}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
