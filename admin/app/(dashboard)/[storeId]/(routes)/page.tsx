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
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

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

  const barData = { graphMonthData, graphWeekData, getHourlyData };

  // ORDER DATA
  const orderData = await getOrderData(params.storeId);

  // TOTAL ORDERS
  const latestOrders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
      isPaid: true,
    },
    include: {
      store: true,
      orderitems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const convertedOrders = latestOrders?.map((ord) => {
    return {
      id: `${ord.id}`,
      store: `${ord.store.name}`,
      isPaid: `${ord.isPaid}`,
      phone: `${ord.phone}`,
      address: `${ord.address}`,
      createdAt: `${format(ord.createdAt, "MMMM do, yyyy")}`,
      products: `${ord.orderitems
        .map((item) => `${item.quantity} ${item.product.name}`)
        .join(", ")}`,
      orderStatus: `${ord.orderStatus}`,
      price: `${ord.orderitems.reduce(
        (acc, item) => +item.product.price + +acc,
        0
      )}`,
    };
  });

  // TOTAL ORDERS
  const TotalOrders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      store: true,
      orderitems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const convertedTotalOrders = TotalOrders?.map((ord) => {
    return {
      id: `${ord.id}`,
      store: `${ord.store.name}`,
      isPaid: `${ord.isPaid}`,
      phone: `${ord.phone}`,
      address: `${ord.address}`,
      createdAt: `${format(ord.createdAt, "MMMM do, yyyy")}`,
      products: `${ord.orderitems
        .map((item) => `${item.quantity} ${item.product.name}`)
        .join(", ")}`,
      orderStatus: `${ord.orderStatus}`,
      price: `${ord.orderitems.reduce(
        (acc, item) => +item.product.price + +acc,
        0
      )}`,
    };
  });

  // STOCKS
  const foundProducts = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  console.log("OI HERE MATE");
  console.log(params.storeId);

  return (
    <DashboardClient
      totalSales={`${calculatedTotal}`}
      orders={`${orderData.paidOrders}`}
      stocks={`${stocks}`}
      barData={barData}
      pieData={orderData}
      latestSales={convertedOrders}
      totalOrders={convertedTotalOrders}
      productStocks={foundProducts}
    />
  );
};

export default DashBoardPage;
