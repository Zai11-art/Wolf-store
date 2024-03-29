import { Container } from "@mui/material";

import prismadb from "@/lib/prismadb";
import PlacardForm from "./components/placard-form";

export default async function PlacardsPage({
  params,
}: {
  params: { placardId: string; storeId: string };
}) {
  const placard = await prismadb.placard.findUnique({
    where: {
      id: params.placardId,
    },
  });

  return (
    <Container
      maxWidth={false}
      sx={{ display: "flex", flexDirection: "column", marginTop: "25px" }}
    >
      <PlacardForm data={placard} />
    </Container>
  );
}
