import React from "react";
import { Container } from "@mui/material";

import {
  getCategory,
  getColors,
  getProducts,
  getSizes,
} from "@/fetchers/fetch-data";
import Placard from "@/components/placard";
import CategoryProduct from "./components/category-product";

const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: { categoryId: string };
  searchParams: { colorId: string; sizeId: string };
}) => {
  const products = await getProducts({
    categoryId: params.categoryId,
    sizeId: searchParams.sizeId,
    colorId: searchParams.colorId,
  });

  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(params.categoryId);

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        flexDirection: "column",
        overflow: "hidden",
        paddingBottom: 12,
        // backgroundColor: "blue",
      }}
    >
      <Placard url={category.placard.imageUrl} />
      <CategoryProduct products={products} sizes={sizes} colors={colors} />
    </Container>
  );
};

export default CategoryPage;
