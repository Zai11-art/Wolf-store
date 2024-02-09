import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { OrderProps } from "@/app/(dashboard)/[storeId]/(routes)/orders/components/OrderMain";
import OrderStatusToggle from "./order-status-toggle";
import { useTheme } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@prisma/client";

interface CardProps {
  label: string;
  description: string;
  numerics: string;
  icon: React.ReactElement;
  listData: {
    totalOrders: OrderProps[];
    latestSales: OrderProps[];
    productStocks: Product[];
  };
}

export default function OutlinedCard({
  label,
  description,
  numerics,
  icon,
  listData,
}: CardProps) {
  const theme = useTheme();
  const router = useRouter();
  const params = useParams();

  const buttonColorMode = theme.palette.mode === "dark" ? "white" : "black";
  const buttonTextMode = theme.palette.mode === "dark" ? "black" : " white";
  const hoverColorMode = theme.palette.mode === "dark" ? "#262626" : " white";
  const hoverTextMode = theme.palette.mode === "dark" ? "white" : " black";

  return (
    <Box sx={{ width: "100%", marginY: "10px" }}>
      <Card
        variant="outlined"
        sx={{
          paddingY: "15px",
          borderRadius: 3,
          boxShadow: 4,
          "&: hover": {
            transform: "scale(1.01)",
            transition: "all ease-in-out  0.15s ",
          },
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                gap: "4px",
              }}
            >
              {icon}
              <Typography
                sx={{ fontWeight: "bold" }}
                variant="h5"
                component="div"
              >
                {label}
              </Typography>
            </Box>

            <Typography variant="h5" component="div">
              {numerics}
            </Typography>
          </Box>
          <Typography sx={{ my: 1, fontSize: "0.8rem" }} color="text.secondary">
            {new Intl.DateTimeFormat(["ban", "id"]).format(Date.now())}
          </Typography>
          <Typography sx={{ marginTop: "12.5px" }} variant="body2">
            {description}
          </Typography>
          {label === "Total Sales" && (
            <>
              <Box
                sx={{
                  marginTop: 2,
                  padding: 1,
                  borderRadius: 2,
                  backgroundColor:
                    theme.palette.mode === "dark" ? "black" : "#dedede",
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  height: "300px",
                  overflowY: "auto",
                }}
              >
                <Typography
                  marginBottom={2}
                  variant="subtitle1"
                  fontWeight="bold"
                >
                  Latest Sales
                </Typography>
                <Box
                  sx={{
                    gap: 1,
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                  }}
                >
                  {listData.latestSales.map((item) => (
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      paddingY={1}
                      borderBottom={"1px dashed gray"}
                    >
                      <Typography variant="subtitle2">
                        {item.id.slice(0, 3) + "..." + item.id.slice(-3)}
                      </Typography>
                      <OrderStatusToggle
                        id={item.id}
                        status={item.orderStatus}
                      />
                      <Typography variant="subtitle2">
                        {/* @ts-ignore */}
                        ${item.price}.00
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box
                display={"flex"}
                width="100%"
                alignItems="center"
                justifyContent="center"
                marginTop={2}
              >
                <Button
                  onClick={() => router.push(`/${params.storeId}/orders`)}
                  size="small"
                  sx={{
                    backgroundColor: buttonColorMode,
                    color: buttonTextMode,
                    fontWeight: "bold",
                    ":hover": {
                      backgroundColor: hoverColorMode,
                      color: hoverTextMode,
                    },
                    paddingX: 2,
                  }}
                >
                  View All
                  <ChevronRightIcon />
                </Button>
              </Box>
            </>
          )}

          {label === "Orders" && (
            <>
              <Box
                sx={{
                  marginTop: 2,
                  padding: 1,
                  borderRadius: 2,
                  backgroundColor:
                    theme.palette.mode === "dark" ? "black" : "#dedede",
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  height: "300px",
                  overflowY: "auto",
                }}
              >
                <Typography
                  marginBottom={2}
                  variant="subtitle1"
                  fontWeight="bold"
                >
                  Total Orders
                </Typography>
                <Box
                  sx={{
                    gap: 1,
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                  }}
                >
                  {listData.totalOrders.map((item) => (
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      paddingY={1}
                      borderBottom={"1px dashed gray"}
                    >
                            
                      <Typography
                        color={item.isPaid === "true" ? "green" : "red"}
                        variant="subtitle2"
                        fontWeight={"semibold"}
                      >
                        {item.isPaid === "true" ? "PAID" : "UNPAID"}
                      </Typography>
                
                      <OrderStatusToggle
                        id={item.id}
                        status={item.orderStatus}
                      />
                     <Typography variant="subtitle2">
                        {item.id.slice(0, 3) + "..." + item.id.slice(-3)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box
                display={"flex"}
                width="100%"
                alignItems="center"
                justifyContent="center"
                marginTop={2}
              >
                <Button
                  onClick={() => router.push(`/${params.storeId}/orders`)}
                  size="small"
                  sx={{
                    backgroundColor: buttonColorMode,
                    color: buttonTextMode,
                    fontWeight: "bold",
                    ":hover": {
                      backgroundColor: hoverColorMode,
                      color: hoverTextMode,
                    },
                    paddingX: 2,
                  }}
                >
                  View All
                  <ChevronRightIcon />
                </Button>
              </Box>
            </>
          )}

          {label === "Stock Available" && (
            <>
              <Box
                sx={{
                  marginTop: 2,
                  padding: 1,
                  borderRadius: 2,
                  backgroundColor:
                    theme.palette.mode === "dark" ? "black" : "#dedede",
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  height: "300px",
                  overflowY: "auto",
                }}
              >
                <Typography
                  marginBottom={2}
                  variant="subtitle1"
                  fontWeight="bold"
                >
                  Stocks
                </Typography>
                <Box
                  sx={{
                    gap: 1,
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                  }}
                >
                  {listData.productStocks.map((item) => (
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      paddingY={1}
                      borderBottom={"1px dashed gray"}
                    >
                      <Typography variant="subtitle2">
                        {" "}
                        {item.id.slice(0, 3) + "..." + item.id.slice(-3)}
                      </Typography>
                      <Typography variant="subtitle2">{item.name}</Typography>
                      <Typography variant="subtitle2">{`${item.stocks}`}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box
                display={"flex"}
                width="100%"
                alignItems="center"
                justifyContent="center"
                marginTop={2}
              >
                <Button
                  onClick={() => router.push(`/${params.storeId}/products`)}
                  size="small"
                  sx={{
                    backgroundColor: buttonColorMode,
                    color: buttonTextMode,
                    fontWeight: "bold",
                    ":hover": {
                      backgroundColor: hoverColorMode,
                      color: hoverTextMode,
                    },
                    paddingX: 2,
                  }}
                >
                  View All
                  <ChevronRightIcon />
                </Button>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
