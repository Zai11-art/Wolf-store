"use client";

import React from "react";
import Container from "@mui/material/Container";
import Placard from "@/components/placard";
import Image from "next/image";
import Catalogue from "@/components/catalouge";

const page = () => {
  // FETCHING DATA FUNCTIONS

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
