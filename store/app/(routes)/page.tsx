import React from "react";
import Container from "@mui/material/Container";

import Placard from "@/components/placard";
import Catalogue from "@/components/catalouge";
import { getFeaturedProducts, getPlacard } from "@/fetchers/fetch-data";

const page = async () => {
  const products = await getFeaturedProducts();
  const placard = await getPlacard("1e4962f8-779e-44d6-a1fe-96b0d30098aa");

  // const placard = placardres ? placardres.imageUrl : "";
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
