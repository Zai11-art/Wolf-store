"use client";

import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import ImageSLider from "@/components/gallery";
import ProductInfo from "@/components/product-info";

const dummyData = {
  id: "camera",
  category: "tech",
  name: "Nikon Z 1.4g",
  price: "$100.00",
  isFeatured: "hehe",
  size: "Large",
  color: "Black",
  images:
    "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
};

const ProductViewer = () => {
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
      <ImageSLider images={dummyData.images} />
      <ProductInfo product={dummyData} />
    </Box>
  );
};

export default ProductViewer;
