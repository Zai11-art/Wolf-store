import prismadb from "@/lib/prismadb";
import { Container } from "@mui/material";
import { Product } from "@prisma/client";
import { format } from "date-fns";
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
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(products);

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

  const parsedProducts: Product[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    color: product.color.name,
    size: product.size.name,
    category: product.category.name,
    isFeatured: `${product.isFeatured}`,
    isArchived: `${product.isArchived}`,
    createdAt: format(product.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <Container maxWidth={false}>
      <ProductMain
        categories={categories}
        colors={colors}
        sizes={sizes}
        data={parsedProducts}
      />
    </Container>
  );
}
