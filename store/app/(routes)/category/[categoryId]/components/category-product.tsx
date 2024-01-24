"use client";

import ProductCard from "@/components/product-card";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import FilterCol from "./filter";

const CategoryProduct = ({ sizes, colors, products }) => {
  const md = useMediaQuery("(min-width:1200px)");
  const theme = useTheme();
  console.log(products);

  const dummydataProduct = [
    {
      id: "camera",
      category: "tech",
      name: "Nikon Z 1.4g",
      price: "$100.00",
      isFeatured: "hehe",
      size: "Large",
      color: "Black",
      images:
        "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "camera2",
      category: "tech",
      name: "Nikon Z 1.4g",
      price: "$100.00",
      isFeatured: "hehe",
      size: "Large",
      color: "Black",
      images:
        "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "camera2",
      category: "tech",
      name: "Nikon Z 1.4g",
      price: "$100.00",
      isFeatured: "hehe",
      size: "Large",
      color: "Black",
      images:
        "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "camera2",
      category: "tech",
      name: "Nikon Z 1.4g",
      price: "$100.00",
      isFeatured: "hehe",
      size: "Large",
      color: "Black",
      images:
        "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  return (
    <Box
      // maxWidth={false}
      sx={{
        backgroundColor: "",
        width: "100%",
        marginTop: 6,
        display: "flex",
        justifyContent: "center",
        paddingX: md ? 1 : 1,
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
      <div
        className={
          theme.palette.mode === "dark"
            ? "glassmorphism-dark"
            : "glassmorphism-light"
        }
        style={{ width: "100%" }}
      >
        <Grid
          container
          justifyContent="space-around"
          alignItems="center"
          sx={{ paddingX: 1 }}
        >
          {dummydataProduct.map((product) => (
            <Grid sx={{ paddingY: 3 }}>
              <ProductCard data={product} />
            </Grid>
          ))}
        </Grid>
      </div>
    </Box>
  );
};

export default CategoryProduct;
