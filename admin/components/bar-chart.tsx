import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material";

interface BarChartProps {
  height: number;
  width: number;
}

export default function SimpleCharts({ height, width }: BarChartProps) {
  const theme = useTheme();
  return (
    <BarChart
      xAxis={[
        {
          id: "barCategories",
          data: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          scaleType: "band",
        },
      ]}
      series={[
        {
          data: [2, 5, 3, 7, 3, 3, 7],
        },
      ]}
      width={width}
      height={height}
    />
  );
}
