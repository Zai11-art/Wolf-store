"use client";

import { Box, Container, Divider, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";

import { Order } from "@prisma/client";
import DataTable from "@/components/DataTable";

export interface OrderProps {
  id: string;
  store: string;
  isPaid: string;
  phone: string;
  address: string;
  createdAt: string;
  products: string;
}

interface OrderMainProps {
  data: OrderProps[];
}

const OrdersMain: React.FC<OrderMainProps> = ({ data }) => {
  const theme = useTheme();

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
          backgroundColor:
            theme.palette.mode === "dark" ? "#555555" : "#c4c4c4",
        }}
      />

      {/* TABLE HERE */}
      <DataTable dataType="orders" data={data ? data : []} />

      {/* API SECTION */}
    </Container>
  );
};

export default OrdersMain;
