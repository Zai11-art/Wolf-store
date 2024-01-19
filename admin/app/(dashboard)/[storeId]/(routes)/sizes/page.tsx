import prismadb from "@/lib/prismadb";
import { Container } from "@mui/material";
import { format } from "date-fns";
import ColorMain from "./components/SizeMain";
import { Color } from "@prisma/client";
import SizeMain from "./components/SizeMain";

export type SizeTypes = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

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

  const convertedSizes: SizeTypes[] = sizes.map((size) => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createdAt: format(size.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <Container maxWidth={false}>
      <SizeMain data={convertedSizes} />
    </Container>
  );
}
