"use client";

import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Box,
  Card,
  Container,
  useMediaQuery,
  Typography,
  Button,
} from "@mui/material";

import OutlinedCard from "@/components/card";
import SimpleCharts from "@/components/bar-chart";
import PieActiveArc from "@/components/pie-chart";
import BasicBreadcrumbs from "@/components/breadcrumbs";
import { GraphData } from "@/app/(dashboard)/[storeId]/(routes)/page";
import DateDropdown from "./date-dropdown";
import { OrderProps } from "@/app/(dashboard)/[storeId]/(routes)/orders/components/OrderMain";
import { Product } from "@prisma/client";

const DashboardClient = ({
  totalSales,
  orders,
  stocks,
  barData,
  pieData,
  latestSales,
  totalOrders,
  productStocks,
}: {
  productStocks: Product[];
  totalOrders: OrderProps[];
  latestSales: OrderProps[];
  totalSales: string;
  orders: string;
  stocks: string;
  barData: {
    graphMonthData: GraphData[];
    graphWeekData: GraphData[];
    getHourlyData: GraphData[];
  };
  pieData: { paidOrders: number; unPaidOrders: number };
}) => {
  const sm = useMediaQuery("(min-width:1000px)");
  const rangeArray = ["24 Hr", "Week", "Month"];
  const [barRange, setBarRange] = useState(rangeArray[0]);

  const cardProps = [
    {
      label: "Total Sales",
      description: "Total sales by the end of the month throughout.",
      numerics: `$${totalSales}`,
      Icon: <AttachMoneyIcon />,
    },
    {
      label: "Orders",
      description: "Orders that are accomplished",
      numerics: `${totalOrders.length}`,
      Icon: <ShoppingCartIcon />,
    },
    {
      label: "Stock Available",
      description: "All the stocks currently available at this period of time.",
      numerics: `${stocks}`,
      Icon: <CheckIcon />,
    },
  ];

  return (
    <Container
      maxWidth={false}
      sx={{
        gap: 2,
        display: "flex",
        flexDirection: "column",
        marginTop: "25px",
      }}
    >
      <Box>
        <BasicBreadcrumbs />
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: 2,
          flexDirection: sm ? "row" : "column",
        }}
      >
        <Card
          variant="outlined"
          sx={{
            width: sm ? "70%" : "100%",
            height: "500px",
            borderRadius: 3,
            boxShadow: 4,
            "&: hover": {
              transform: "scale(1.005)",
              transition: "all ease-in-out  0.15s ",
            },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            padding: 2,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              padding: 3,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 1,
            }}
          >
            <Typography variant="h5" fontWeight={"bold"}>
              Monthly sales
            </Typography>
            <DateDropdown
              setBarRange={setBarRange}
              options={rangeArray}
              currentRange={barRange}
            />
          </Box>
          <SimpleCharts
            barData={
              barRange === "24 Hr"
                ? barData.getHourlyData
                : barRange === "Week"
                ? barData.graphWeekData
                : barRange === "Month"
                ? barData.graphMonthData
                : []
            }
            height={sm ? 600 : 500}
            width={sm ? 1800 : 1000}
          />
        </Card>
        <Card
          variant="outlined"
          sx={{
            width: sm ? "30%" : "100%",
            height: "500px",
            borderRadius: 3,
            boxShadow: 4,
            "&: hover": {
              transform: "scale(1.005)",
              transition: "all ease-in-out  0.15s ",
            },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PieActiveArc
            pieData={pieData}
            height={sm ? 600 : 500}
            width={sm ? 800 : 500}
          />
        </Card>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          marginTop: "10px",
          flexDirection: sm ? "row" : "column",
          gap: "15px",
        }}
      >
        {cardProps.map((card) => (
          <OutlinedCard
            label={card?.label}
            description={card?.description}
            numerics={card?.numerics}
            icon={card?.Icon}
            listData={{ totalOrders, latestSales, productStocks }}
          />
        ))}
      </Box>
    </Container>
  );
};

export default DashboardClient;
