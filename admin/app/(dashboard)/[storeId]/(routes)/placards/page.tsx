import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import PlacardPage from "./components/PlacardMain";
import { Container } from "@mui/material";
import { Placard } from "@prisma/client";

export interface PlacardProps {
  imageUrl: any;
  id: string;
  label: string;
  createdAt: string;
}

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

  const convertedPlacards: PlacardProps[] = placards.map((plc) => ({
    id: plc.id,
    label: plc.label,
    createdAt: format(plc.createdAt, "MMMM do, yyyy"),
    imageUrl: plc.imageUrl,
  }));

  console.log(convertedPlacards);
  return (
    <Container maxWidth={false}>
      <PlacardPage data={convertedPlacards} />
    </Container>
  );
}
