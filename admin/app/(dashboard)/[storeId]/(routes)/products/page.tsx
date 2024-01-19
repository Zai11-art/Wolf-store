import prismadb from "@/lib/prismadb";
import { Container } from "@mui/material";
import ProductMain from "./components/ProductMain";

export default async function ProductsPage({
  params,
}: {
  params: { storeId: string };
}) {

  // const products = await prismadb.product.findMany({
  //   where: {
  //     storeId: params.storeId
  //   },
  //   include: {
  //     categ
  //   }
  // })


  return (
    <Container maxWidth={false}>
      <ProductMain  />
    </Container>
  );
}
