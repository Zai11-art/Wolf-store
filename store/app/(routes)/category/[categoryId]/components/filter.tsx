"use client";

import React from "react";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Button, Typography, useTheme } from "@mui/material";

import { Color, Size } from "@/types";

interface FilterColProps {
  data: Size[] | Color[];
  name: string;
  acceessor: string;
}

const FilterCol: React.FC<FilterColProps> = ({ data, name, acceessor }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const theme = useTheme();
  const selectedValue = searchParams.get(acceessor);

  const buttonColorMode = theme.palette.mode === "dark" ? "white" : "black";
  const buttonTextMode = theme.palette.mode === "dark" ? "black" : " white";
  const hoverColorMode = theme.palette.mode === "dark" ? "#262626" : " white";
  const hoverTextMode = theme.palette.mode === "dark" ? "white" : " black";

  const onSelect = (id: string) => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      [acceessor]: id,
    };
    console.log("QUERY HERE");
    console.log(query);

    if (current[acceessor] === id) {
      query[acceessor] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <Box sx={{ marginBottom: "15px" }}>
      <Typography variant="h4" sx={{ fontFamily: "inherit", marginBottom: 1 }}>
        {name}
      </Typography>
      <Box sx={{ backgroundColor: "" }}>
        {data.map((tab) => (
          <Button
            sx={{
              color: buttonTextMode,
              backgroundColor: buttonColorMode,
              fontWeight: "bold",
              ":hover": {
                backgroundColor: hoverColorMode,
                color: hoverTextMode,
                borderColor: hoverColorMode,
              },
              fontFamily: "inherit",
              borderRadius: "10px",
              borderColor: buttonColorMode,
              boxShadow: 5,
              padding: "8px",
              margin: "5px",
              fontSize: "0.8em",
              border: selectedValue === tab.id ? "2px solid red" : "",
            }}
            key={tab.id}
            onClick={() => onSelect(tab.id)}
          >
            {tab.name}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default FilterCol;
