import { format } from "date-fns";
import { Container } from "@mui/material";

import prismadb from "@/lib/prismadb";
import ColorMain from "./components/ColorMain";

export type ColorTypes = {
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
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const convertedColors: ColorTypes[] = colors.map((clr) => ({
    id: clr.id,
    name: clr.name,
    value: clr.value,
    createdAt: format(clr.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <Container maxWidth={false}>
      <ColorMain data={convertedColors} />
    </Container>
  );
}
