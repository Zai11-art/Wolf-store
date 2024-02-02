"use client";

import React from "react";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";

const Placard = ({ url }: { url: string }) => {
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
        src={url}
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
