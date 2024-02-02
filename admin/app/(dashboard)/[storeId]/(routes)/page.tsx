// "use client";

import React from "react";

import prismadb from "@/lib/prismadb";
import DashboardClient from "@/components/dashboard-client";

export interface GraphData {
  name: string;
  total: number;
}

const DashBoardPage = async ({ params }: { params: { storeId: string } }) => {
  // SUCCESSFUL ORDERS
  const orders = await prismadb.order.count({
    where: { storeId: params.storeId, isPaid: true },
  });

  const unPaidOrders = await prismadb.order.count({
    where: { storeId: params.storeId, isPaid: false },
  });

  // TOTAL SALES
  const ordersPaid = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const calculatedTotal = ordersPaid.reduce((order, acc) => {
    const total = acc.orderItems.reduce((order, acc) => {
      return order + acc.product.price.toNumber();
    }, 0);
    return order + total;
  }, 0);

  // STOCK COUNT
  const stocks = await prismadb.product.count({
    where: {
      storeId: params.storeId,
      isArchived: false,
    },
  });

  // GRAPH DATA
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const monthlyRevenue: { [key: number]: number } = {};

  // Grouping the orders by month and summing the revenue
  for (const order of paidOrders) {
    const month = order.createdAt.getMonth(); // 0 for Jan, 1 for Feb, ...
    let revenueForOrder = 0;

    for (const item of order.orderItems) {
      revenueForOrder += item.product.price.toNumber();
    }

    // Adding the revenue for this order to the respective month
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  // Converting the grouped data into the format expected by the graph
  const graphData: GraphData[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];

  // Filling in the revenue data
  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  // PIE DATA
  const pieData = { paidOrders: orders, unPaidOrders: unPaidOrders };
  console.log(pieData)

  return (
    <DashboardClient
      totalSales={`${calculatedTotal}`}
      orders={`${orders}`}
      stocks={`${stocks}`}
      barData={graphData}
      pieData={pieData}
    />
  );
};

export default DashBoardPage;
