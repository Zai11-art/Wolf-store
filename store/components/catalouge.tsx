"use client";

import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { Product } from "@/types";
import ProductCard from "./product-card";

const Catalogue = ({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginY: "40px",
        gap: "40px",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", fontFamily: "inherit" }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ gap: "40px" }}
        >
          {products.map((item) => (
            <Grid>
              <ProductCard data={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Catalogue;
