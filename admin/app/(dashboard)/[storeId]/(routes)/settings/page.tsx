import { auth } from "@clerk/nextjs";
import { Container } from "@mui/material";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import SettingsForm from "./components/settings-form";


export default async function SettingsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect(`/sign-in`);
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  if (!store) {
    redirect(`/`);
  }

  return (
    <Container
      maxWidth={false}
      sx={{ display: "flex", flexDirection: "column", marginTop: "25px" }}
    >
      <SettingsForm data={store} />
    </Container>
  );
}
