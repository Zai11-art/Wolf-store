import { format } from "date-fns";
import { Container } from "@mui/material";

import prismadb from "@/lib/prismadb";
import CategoryMain from "./components/CategoryMain";

export default async function ProductsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const convertedCategories = categories.map((cat) => ({
    id: `${cat.id}`,
    name: `${cat.name}`,
    placardLabel: `${cat.placardId}`,
    createdAt: format(cat.createdAt, "MMMM do, yyyy"),
    updatedAt: format(cat.updatedAt, "MMMM do, yyyy"),
  }));

  return (
    <Container maxWidth={false}>
      <CategoryMain data={convertedCategories} />
    </Container>
  );
}
