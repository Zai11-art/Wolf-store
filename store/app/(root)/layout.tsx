import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = useAuth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <>{children}</>;
};

export default RootLayout;
