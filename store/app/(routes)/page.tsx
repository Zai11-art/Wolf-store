import React from "react";
import Container from "@mui/material/Container";

import Placard from "@/components/placard";
import Catalogue from "@/components/catalouge";
import { getFeaturedProducts, getPlacard } from "@/fetchers/fetch-data";

const page = async () => {
  const products = await getFeaturedProducts();
  const placard = await getPlacard("830f7edf-2e3b-4a26-97cb-e06b2d498e83");

  console.log(placard);

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
