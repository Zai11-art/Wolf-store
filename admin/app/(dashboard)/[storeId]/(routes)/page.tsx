// "use client";

import React from "react";

import {
  getHourlyGraphData,
  getMonthlyGraphData,
  getOrderData,
  getStockCount,
  getTotalSales,
  getWeeklyGraphData,
} from "@/lib/helpers";
import DashboardClient from "@/components/dashboard-client";

export interface GraphData {
  name: string;
  total: number;
}

const DashBoardPage = async ({ params }: { params: { storeId: string } }) => {
  // TOTAL SALES
  const calculatedTotal = await getTotalSales(params.storeId);

  // STOCK COUNT
  const stocks = await getStockCount(params.storeId);

  // GRAPH DATA
  const graphMonthData = await getMonthlyGraphData(params.storeId);
  const graphWeekData = await getWeeklyGraphData(params.storeId);
  const getHourlyData = await getHourlyGraphData(params.storeId);

  // ORDER DATA
  const orderData = await getOrderData(params.storeId);

  return (
    <DashboardClient
      totalSales={`${calculatedTotal}`}
      orders={`${orderData.paidOrders}`}
      stocks={`${stocks}`}
      barData={getHourlyData}
      pieData={orderData}
    />
  );
};

export default DashBoardPage;
