import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { GraphData } from "@/app/(dashboard)/[storeId]/(routes)/page";
import { Typography, Box } from "@mui/material";

interface BarChartProps {
  height: number;
  width: number;
  barData: GraphData[];
}

export default function SimpleCharts({
  barData,
  height,
  width,
}: BarChartProps) {
  const xData = barData.map((x) => x.name);
  const yData = barData.map((y) => y.total);
  const isData = yData.some((data: number) => data > 1);

  if (!isData) {
    return <Typography variant="subtitle1">No Data Available yet.</Typography>;
  }

  return (
    <>
      <BarChart
        sx={{ display: "flex" }}
        xAxis={[
          {
            id: "barCategories",
            data: xData,
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: yData,
            color: "#3a98cf",
          },
        ]}
        width={width}
        height={height}
      />
    </>
  );
}
