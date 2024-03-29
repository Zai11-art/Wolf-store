import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Typography } from "@mui/material";

interface PieChartProps {
  height: number;
  width: number;
  pieData: { paidOrders: number; unPaidOrders: number };
}

const data = [
  { id: 0, value: 10, label: "series A" },
  { id: 1, value: 15, label: "series B" },
  { id: 2, value: 20, label: "series C" },
];

export default function PieActiveArc({
  height,
  width,
  pieData,
}: PieChartProps) {
  const isData = pieData.paidOrders > 0 && pieData.unPaidOrders > 0;

  if (!isData) {
    return <Typography variant="subtitle1">No Data Available yet.</Typography>;
  }

  return (
    <PieChart
      sx={{ padding: 2, display: "flex" }}
      series={[
        {
          data: [
            {
              id: 0,
              value: pieData?.paidOrders,
              label: "Paid Orders",
              color: "#3a98cf",
            },
            {
              id: 1,
              value: pieData?.unPaidOrders,
              label: "Unpaid Orders",
              color: "#154059",
            },
          ],
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      width={width}
      height={height}
    />
  );
}
