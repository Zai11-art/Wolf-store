import prismadb from "@/lib/prismadb";
import { Container } from "@mui/material";
import { Order } from "@prisma/client";
import { format } from "date-fns";
import OrdersMain from "./components/OrderMain";

export default async function OrdersPage({
  params,
}: {
  params: { storeId: string };
}) {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const convertedOrders: Order[] = orders.map((ord) => ({
    id: ord.id,
    storeId: ord.storeId,
    isPaid: ord.isPaid,
    phone: ord.phone,
    address: ord.address,
    createdAt: format(ord.createdAt, "MMMM do, yyyy"),
    products: ord.orderItems.map((item) => item.product.name).join(", "),
  }));

  return (
    <Container maxWidth={false}>
      <OrdersMain data={convertedOrders ? convertedOrders : []} />
    </Container>
  );
}
