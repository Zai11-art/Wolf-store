import { CartProps } from "@/hooks/cart-state";
import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import CartSummary from "./Cart-Summary";

const Cancelled = () => {
  const md = useMediaQuery("(min-width:1000px)");

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        alignItems: "",
        width: "100%",
        height: "100%",
        flexDirection: md ? "row" : "column",
        overflow: "hidden",
        paddingBottom: "200px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          marginTop: 5,
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{ width: "100%" }}
          display="flex"
          alignItems={"center"}
          justifyContent="space-between"
        >
          <Box sx={{ gap: 2 }} display={"flex"} alignItems="center">
            <Typography
              variant="h3"
              sx={{ marginBottom: "20px", fontFamily: "inherit" }}
            >
              Cancelled Orders
            </Typography>
            <Typography
              variant="h4"
              color={"text.secondary"}
              sx={{ marginBottom: "20px", fontFamily: "inherit" }}
            >
              (0)
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {/* {cart.items &&
            cart?.items.map((item, i) => (
              // @ts-ignore
              <CartInfo key={i} data={item?.product} />
            ))} */}
        </Box>
      </Box>
    </Container>
  );
};

export default Cancelled;
