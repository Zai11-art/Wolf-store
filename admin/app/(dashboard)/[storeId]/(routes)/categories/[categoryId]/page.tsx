import { Container } from "@mui/material";

import prismadb from "@/lib/prismadb";
import CategoryForm from "./components/category-form";

export default async function PlacardsPage({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) {
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const placards = await prismadb.placard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  console.log(params.storeId);

  return (
    <Container
      maxWidth={false}
      sx={{ display: "flex", flexDirection: "column", marginTop: "25px" }}
    >
      <CategoryForm placards={placards} data={category} />
    </Container>
  );
}
