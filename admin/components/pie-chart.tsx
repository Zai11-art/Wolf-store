import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

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
  console.log(pieData);

  return (
    <PieChart
      sx={{ padding: 2, display: "flex" }}
      series={[
        {
          data: [
            { id: 0, value: pieData?.paidOrders, label: "Paid Orders" },
            { id: 1, value: pieData?.unPaidOrders, label: "Unpaid Orders" },
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
