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
        marginTop: 8,
        marginBottom: 12,
        flexDirection: md ? "row" : "column",
      }}
    >
      <ImageSLider images={product.images} />
      <ProductInfo product={product} />
    </Box>
  );
};

export default ProductViewer;
