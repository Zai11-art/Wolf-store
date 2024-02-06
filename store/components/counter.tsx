import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, useTheme, IconButton } from "@mui/material";

const counter = () => {
  const [quantity, setQuantity] = useState(1);
  const theme = useTheme();
  
  const buttonColorMode = theme.palette.mode === "dark" ? "white" : "black";
  const hoverColorMode = theme.palette.mode === "dark" ? "#262626" : " white";

  return (
    <Box
      display="flex"
      sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
    >
      <Box display="flex" alignContent="center" sx={{ width: "100%" }}>
        <IconButton
          onClick={() => setQuantity((prev) => (prev <= 1 ? prev : prev - 1))}
          size="small"
        >
          <RemoveIcon />
        </IconButton>
        <Box
          borderRadius={1}
          sx={{
            backgroundColor: buttonColorMode,
            paddingX: 1,
            color: hoverColorMode,
            fontWeight: "bold",
            width: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {quantity}
        </Box>
        <IconButton
          onClick={() => setQuantity((prev) => prev + 1)}
          size="small"
        >
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default counter;
