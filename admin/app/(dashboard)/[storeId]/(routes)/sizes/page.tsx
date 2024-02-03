import { format } from "date-fns";
import { Container } from "@mui/material";

import prismadb from "@/lib/prismadb";
import SizeMain from "./components/SizeMain";

export default async function ProductsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const convertedSizes = sizes.map((size) => ({
    id: `${size.id}`,
    name: `${size.name}`,
    value: `${size.value}`,
    createdAt: `${format(size.createdAt, "MMMM do, yyyy")}`,
  }));

  return (
    <Container maxWidth={false}>
      <SizeMain data={convertedSizes} />
    </Container>
  );
}
