import { format } from "date-fns";
import { Container } from "@mui/material";

import prismadb from "@/lib/prismadb";
import PlacardPage from "./components/PlacardMain";

export default async function PlacardSpage({
  params,
}: {
  params: { storeId: string };
}) {
  const placards = await prismadb.placard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const convertedPlacards = placards.map((plc) => ({
    id: plc.id,
    label: plc.label,
    createdAt: format(plc.createdAt, "MMMM do, yyyy"),
    imageUrl: plc.imageUrl,
  }));

  return (
    <Container maxWidth={false}>
      <PlacardPage data={convertedPlacards} />
    </Container>
  );
}
