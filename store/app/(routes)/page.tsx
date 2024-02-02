import React from "react";
import Container from "@mui/material/Container";
import Placard from "@/components/placard";
import Image from "next/image";
import Catalogue from "@/components/catalouge";
import {
  getAllProducts,
  getFeaturedProducts,
  getPlacard,
  getPlacards,
  getProducts,
  getProducts2,
  getSizes,
} from "@/fetchers/fetch-data";
import { Category } from "@/types";

const page = async () => {
  const products = await getFeaturedProducts();
  const placard = await getPlacard("a1edf94f-3401-4ac4-8415-3e6bd8bd1676");

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
      <Placard url={placard.imageUrl} />
      <Catalogue products={products} title="Featured Products" />
    </Container>
  );
};

export default page;
