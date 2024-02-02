"use client";

import ProductCard from "@/components/product-card";
import { Color, Product, Size } from "@/types";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import FilterCol from "./filter";

const CategoryProduct = ({
  sizes,
  colors,
  products,
}: {
  sizes: Size[];
  colors: Color[];
  products: Product[];
}) => {
  const md = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  console.log(products);

  return (
    <Box
      // maxWidth={false}
      sx={{
        backgroundColor: "",
        width: "100%",
        marginTop: 6,
        display: "flex",
        justifyContent: "center",
        flexDirection: md ? "row" : "column",
        // marginLeft: "100px",
      }}
    >
      <Box
        // maxWidth={false}
        sx={{ backgroundColor: "", width: "300px" }}
      >
        <FilterCol key="sizeId" name="Sizes" data={sizes} />
        <FilterCol key="colorId" name="Colors" data={colors} />
      </Box>
      <Box
        className={
          theme.palette.mode === "dark"
            ? "glassmorphism-dark"
            : "glassmorphism-light"
        }
        sx={{ width: "100%", display: "flex" }}
      >
        <Grid
          container
          alignItems="center"
          sx={{
            justifyContent: md ? "" : "center",
            width: "100%",
            display: "flex",
            paddingX: 2
          }}
        >
          {products.map((product) => (
            <Grid sx={{ paddingY: 3, width: "100%", display: "flex" }}>
              <ProductCard data={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default CategoryProduct;
