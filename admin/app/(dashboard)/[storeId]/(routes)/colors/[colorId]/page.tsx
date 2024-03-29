import { Container } from "@mui/material";

import prismadb from "@/lib/prismadb";
import CategoryForm from "./components/color-form";

export default async function ColorsPage({
  params,
}: {
  params: { colorId: string };
}) {
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <Container
      maxWidth={false}
      sx={{ display: "flex", flexDirection: "column", marginTop: "25px" }}
    >
      <CategoryForm data={color} />
    </Container>
  );
}
