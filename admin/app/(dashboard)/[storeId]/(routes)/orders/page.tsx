import { format } from "date-fns";
import { Container } from "@mui/material";

import prismadb from "@/lib/prismadb";
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

  // @ts-ignore
  const convertedOrders = orders?.map((ord) => {
    console.log("CHECK HERE DUDEEEEEE");
    console.log(ord.orderitems);
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
    };
  });

  return (
    <Container maxWidth={false}>
      <OrdersMain data={convertedOrders ? convertedOrders : []} />
    </Container>
  );
}
