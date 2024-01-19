import Placard from "@/components/placard";
import {
  getCategory,
  getColors,
  getProducts,
  getSizes,
} from "@/fetchers/fetch-data";
import { Box, Container } from "@mui/material";
import React from "react";
import CategoryProduct from "./components/category-product";
import FilterCol from "./components/filter";

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId: string;
    sizeId: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const products = await getProducts({
    categoryId: params.categoryId,
    sizeId: searchParams.colorId,
    colorId: searchParams.sizeId,
  });

  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(params.categoryId);

  const sizesDummy = [
    {
      id: "sizes1",
      label: "sizes1",
    },
    {
      id: "sizes2",
      label: "sizes2",
    },
  ];

  const colorsDummy = [
    {
      id: "colors1",
      label: "colors1",
    },
    {
      id: "colors2",
      label: "colors2",
    },
    {
      id: "colors2",
      label: "colors2",
    },
    {
      id: "colors2",
      label: "colors2",
    },
  ];

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
      <Placard />
      <CategoryProduct sizes={sizesDummy} colors={colorsDummy} />
    </Container>
  );
};

export default CategoryPage;
