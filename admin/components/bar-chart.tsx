import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material";
import { GraphData } from "@/app/(dashboard)/[storeId]/(routes)/page";

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

  return (
    <BarChart
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
        },
      ]}
      width={width}
      height={height}
    />
  );
}
