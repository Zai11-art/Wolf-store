import prismadb from "@/lib/prismadb";
import { Container } from "@mui/material";
import { format } from "date-fns";
import CategoryMain from "./components/CategoryMain";

type CategoryColumn = {
  id: string;
  name: string;
  placardLabel: string;
  createdAt: string;
};

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

  const convertedCategories: CategoryColumn[] = categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    placardLabel: cat.placardId,
    createdAt: format(cat.createdAt, "MMMM do, yyyy"),
  }));

  console.log(categories);

  return (
    <Container maxWidth={false}>
      <CategoryMain data={convertedCategories} />
    </Container>
  );
}
