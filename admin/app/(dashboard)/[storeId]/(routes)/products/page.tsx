import prismadb from "@/lib/prismadb";
import { Container } from "@mui/material";
import ProductMain from "./components/ProductMain";

export default async function ProductsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <Container maxWidth={false}>
      <ProductMain
        categories={categories}
        colors={colors}
        sizes={sizes}
        data={products}
      />
    </Container>
  );
}
