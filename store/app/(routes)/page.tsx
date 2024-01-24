"use client";

import React from "react";
import Container from "@mui/material/Container";
import Placard from "@/components/placard";
import Image from "next/image";
import Catalogue from "@/components/catalouge";
import {
  getAllProducts,
  getPlacards,
  getProducts,
  getSizes,
} from "@/fetchers/fetch-data";
import { Category } from "@/types";

const page = async () => {
  const products = await getProducts({ isFeatured: true });
  console.log(products);

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Placard />
      <Catalogue title="Featured Products" />
    </Container>
  );
};

export default page;
