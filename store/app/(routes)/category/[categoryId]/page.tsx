import Placard from "@/components/placard";
import {
  getAllProducts,
  getCategory,
  getColors,
  getProducts,
  getProducts2,
  getSizes,
} from "@/fetchers/fetch-data";
import { Container } from "@mui/material";
import React from "react";
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
    sizeId: searchParams.colorId,
    colorId: searchParams.sizeId,
  });

  const products2 = await getProducts2();

  console.log("KOKO DE");
  console.log(products);
  console.log(products2);

  // console.log("KOKO DE");
  // console.log(searchParams.colorId);
  // console.log(searchParams.sizeId);

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
