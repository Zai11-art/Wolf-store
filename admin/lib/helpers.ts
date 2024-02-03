import { GraphData } from "@/app/(dashboard)/[storeId]/(routes)/page";
import prismadb from "./prismadb";

export const getTotalSales = async (storeId: string) => {
  const ordersPaid = await prismadb.order.findMany({
    where: {
      storeId: storeId,
      isPaid: true,
    },
    include: {
      orderitems: {
        include: {
          product: true,
        },
      },
    },
  });

  const calculatedTotal = ordersPaid.reduce((order, acc) => {
    const total = acc.orderitems.reduce((order, acc) => {
      return order + acc.product.price.toNumber();
    }, 0);
    return order + total;
  }, 0);

  return calculatedTotal;
};

export const getStockCount = async (storeId: string) => {
  const stockCount = await prismadb.product.count({
    where: {
      storeId: storeId,
      isArchived: false,
    },
  });

  return stockCount;
};

export const getMonthlyGraphData = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId: storeId,
      isPaid: true,
    },
    include: {
      orderitems: {
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

    for (const item of order.orderitems) {
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

  return graphData;
};
export const getHourlyGraphData = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId: storeId,
      isPaid: true,
    },
    include: {
      orderitems: {
        include: {
          product: true,
        },
      },
    },
  });

  const twoHourlyRevenue: { [key: number]: number } = {};

  // Grouping the orders by two-hour interval and summing the revenue
  for (const order of paidOrders) {
    const hour = Math.floor(order.createdAt.getHours() / 2); // 0 for 12:00 AM - 1:59 AM, 1 for 2:00 AM - 3:59 AM, ...
    let revenueForOrder = 0;

    for (const item of order.orderitems) {
      revenueForOrder += item.product.price.toNumber();
    }

    // Adding the revenue for this order to the respective two-hour interval
    twoHourlyRevenue[hour] = (twoHourlyRevenue[hour] || 0) + revenueForOrder;
  }

  // Converting the grouped data into the format expected by the graph
  const graphData: GraphData[] = Array.from({ length: 12 }, (_, i) => ({
    name: formatTwoHourInterval(i * 2), // Use a function to format the two-hour interval
    total: 0,
  }));

  // Filling in the revenue data
  for (const interval in twoHourlyRevenue) {
    graphData[parseInt(interval)].total = twoHourlyRevenue[parseInt(interval)];
  }

  return graphData;

  // Function to format two-hour interval to time format (e.g., 2 -> "2:00 AM")
  function formatTwoHourInterval(startHour: number): string {
    const formattedStartHour = (startHour % 12 || 12)
      .toString()
      .padStart(2, "0");
    const startPeriod = startHour < 12 ? "AM" : "PM";
    return `${formattedStartHour}:00 ${startPeriod}`;
  }
};
export const getWeeklyGraphData = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId: storeId,
      isPaid: true,
    },
    include: {
      orderitems: {
        include: {
          product: true,
        },
      },
    },
  });

  const dailyRevenue: { [key: number]: number } = {};

  // Grouping the orders by month and summing the revenue
  for (const order of paidOrders) {
    const day = order.createdAt.getDay() - 1; // 0 for Jan, 1 for Feb, ...
    let revenueForOrder = 0;

    for (const item of order.orderitems) {
      revenueForOrder += item.product.price.toNumber();
    }

    // Adding the revenue for this order to the respective month
    dailyRevenue[day] = (dailyRevenue[day] || 0) + revenueForOrder;
  }

  // Converting the grouped data into the format expected by the graph
  const graphData: GraphData[] = [
    { name: "Monday", total: 0 },
    { name: "Tuesday", total: 0 },
    { name: "Wednesday", total: 0 },
    { name: "Thursday", total: 0 },
    { name: "Friday", total: 0 },
    { name: "Saturday", total: 0 },
    { name: "Sunday", total: 0 },
  ];

  // Filling in the revenue data
  for (const day in dailyRevenue) {
    graphData[parseInt(day)].total = dailyRevenue[parseInt(day)];
  }

  return graphData;
};

export const getOrderData = async (storeId: string) => {
  const orders = await prismadb.order.count({
    where: { storeId: storeId, isPaid: true },
  });

  const unPaidOrders = await prismadb.order.count({
    where: { storeId: storeId, isPaid: false },
  });

  const pieData = { paidOrders: orders, unPaidOrders: unPaidOrders };

  return pieData;
};
