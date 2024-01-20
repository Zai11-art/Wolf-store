"use client";

import BasicPopover from "@/components/popover";
import TableTest from "@/components/DataTable";
import {
  Box,
  Button,
  Container,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Order } from "@prisma/client";
import DataTable from "@/components/DataTable";

interface OrderProps {
  data: Order[];
}

const OrdersMain: React.FC<OrderProps> = ({ data }) => {
  console.log(data);
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const sm = useMediaQuery("(min-width:1200px)");

  return (
    <Container
      maxWidth={false}
      sx={{ display: "flex", flexDirection: "column", marginTop: "25px" }}
    >
      <Box
        sx={{
          // marginBottom: "20px",
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            gap: "1px",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }} variant="h4" component="div">
            Orders
          </Typography>
          <Typography
            style={{
              color: theme.palette.mode === "dark" ? "#c4c4c4" : " black",
            }}
          >
            Upload, create, manage and edit your Orders here
          </Typography>
        </Box>
      </Box>
      <Divider
        sx={{
          mb: "30px",
          mt: "20px",
          // borderBottomWidth: "1px",
          backgroundColor:
            theme.palette.mode === "dark" ? "#555555" : "#c4c4c4",
        }}
      />

      {/* TABLE HERE */}
      <DataTable dataType="orders" data={data || []} />

      {/* API SECTION */}
    </Container>
  );
};

export default OrdersMain;
