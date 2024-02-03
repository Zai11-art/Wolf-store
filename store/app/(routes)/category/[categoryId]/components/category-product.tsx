"use client";

import React from "react";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";

import FilterCol from "./filter";
import { Color, Product, Size } from "@/types";
import ProductCard from "@/components/product-card";

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

  return (
    <Box
      sx={{
        backgroundColor: "",
        width: "100%",
        marginTop: 6,
        display: "flex",
        justifyContent: "center",
        flexDirection: md ? "row" : "column",
      }}
    >
      <Box
        // maxWidth={false}
        sx={{ backgroundColor: "", width: "300px" }}
      >
        <FilterCol acceessor="sizeId" name="Sizes" data={sizes} />
        <FilterCol acceessor="colorId" name="Colors" data={colors} />
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
            padding: 2,
            gap: 5,
          }}
        >
          {products.map((product) => (
            <Grid
              sx={{
                display: "flex",
              }}
            >
              <ProductCard data={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default CategoryProduct;
