import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import ProductCard from "./product-card";
import Grid from "@mui/material/Grid";
import { Product } from "@/types";

const dummydata = [
  {
    id: "camera",
    category: "tech",
    name: "Nikon Z 1.4g",
    price: "$100.00",
    isFeatured: "hehe",
    size: "Large",
    color: "Black",
    images:
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "camera2",
    category: "tech",
    name: "Nikon Z 1.4g",
    price: "$100.00",
    isFeatured: "hehe",
    size: "Large",
    color: "Black",
    images:
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const Catalogue = ({ title, sizes }: { title: string; sizes: Product[] }) => {
  console.log(sizes);
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

      {/* <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <ProductCard />
      </Box> */}

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
          {dummydata.map((item) => (
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
