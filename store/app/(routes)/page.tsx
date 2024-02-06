import React from "react";
import Container from "@mui/material/Container";

import Placard from "@/components/placard";
import Catalogue from "@/components/catalouge";
import { getFeaturedProducts, getPlacard } from "@/fetchers/fetch-data";

const page = async () => {
  const products = await getFeaturedProducts();
  const placard = await getPlacard("69463fc0-6f49-407a-ac20-5685e69c9b0b");

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
