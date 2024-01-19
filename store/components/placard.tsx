"use client";

import React from "react";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";

const dummyImg =
  "https://images.pexels.com/photos/1058276/pexels-photo-1058276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const Placard = () => {
  const md = useMediaQuery("(min-width:500px)");

  return (
    <Box
      sx={{
        display: "flex",
        borderRadius: "20px",
        overflow: "hidden",
        marginTop: 5,
        boxShadow: 16,
      }}
    >
      <img
        src={dummyImg}
        style={{
          backgroundColor: "red",
          aspectRatio: md ? "2.5/1" : "2.1/1",
          background: "cover",
          position: "relative",
          overflow: "hidden",
        }}
      />
    </Box>
  );
};

export default Placard;
