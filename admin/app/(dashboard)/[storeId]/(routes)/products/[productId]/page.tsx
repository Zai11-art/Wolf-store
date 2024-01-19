import prismadb from "@/lib/prismadb";
import ProductForm from "./components/product-form";
import { Container } from "@mui/material";
import { redirect } from "next/navigation";

export default async function ProductsPage({
  params,
}: {
  params: { productId: string; storeId: string };
}) {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
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

  //   if (!placard) redirect(`/${params.storeId}`);

  return (
    <Container
      maxWidth={false}
      sx={{ display: "flex", flexDirection: "column", marginTop: "25px" }}
    >
      <ProductForm
        data={product}
        categories={categories}
        colors={colors}
        sizes={sizes}
      />
    </Container>
  );
}
