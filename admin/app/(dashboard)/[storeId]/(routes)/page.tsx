"use client";

import React from "react";
import { Box, Card, Container, Typography, useMediaQuery } from "@mui/material";
import OutlinedCard from "@/components/card";
import BasicBreadcrumbs from "@/components/breadcrumbs";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckIcon from "@mui/icons-material/Check";
import SimpleCharts from "@/components/bar-chart";
import PieActiveArc from "@/components/pie-chart";

const DashBoardPage = () => {
  const sm = useMediaQuery("(min-width:1000px)");

  const cardProps = [
    {
      label: "Total Sales",
      description: "Total sales by the end of the month throughout.",
      numerics: "$200",
      Icon: <AttachMoneyIcon />,
    },
    {
      label: "Orders",
      description: "Orders that are accomplished",
      numerics: "25",
      Icon: <ShoppingCartIcon />,
    },
    {
      label: "Stock Available",
      description: "All the stocks currently available at this period of time.",
      numerics: "23",
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
          }}
        >
          <SimpleCharts height={sm ? 600 : 500} width={sm ? 1800 : 1000} />
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
          <PieActiveArc height={sm ? 600 : 500} width={sm ? 800 : 500} />
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
          />
        ))}
      </Box>
    </Container>
  );
};

export default DashBoardPage;
