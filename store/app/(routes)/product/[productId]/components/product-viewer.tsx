"use client";

import React from "react";
import { Box, useMediaQuery } from "@mui/material";

import { Product } from "@/types";
import ImageSLider from "@/components/gallery";
import ProductInfo from "@/components/product-info";

const ProductViewer = ({ product }: { product: Product }) => {
  const md = useMediaQuery("(min-width:800px)");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: md ? "row" : "column",
        marginY: 12
      }}
    >
      <ImageSLider images={product.images} />
      <ProductInfo product={product} />
    </Box>
  );
};

export default ProductViewer;
