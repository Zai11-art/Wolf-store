import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import ResponsiveAppBar from "@/components/navbar";

export default async function DashLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId: userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId: userId,
    },
  });

  return (
    <>
      <ResponsiveAppBar stores={stores} />
      {children}
    </>
  );
}
