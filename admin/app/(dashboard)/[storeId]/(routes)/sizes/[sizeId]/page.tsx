import prismadb from "@/lib/prismadb";
import CategoryForm from "./components/size-form";
import { Container } from "@mui/material";
import { redirect } from "next/navigation";

export default async function ColorsPage({
  params,
}: {
  params: { sizeId: string };
}) {
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <Container
      maxWidth={false}
      sx={{ display: "flex", flexDirection: "column", marginTop: "25px" }}
    >
      <CategoryForm data={size} />
    </Container>
  );
}
