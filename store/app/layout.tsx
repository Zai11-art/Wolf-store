import "./globals.css";
import type { Metadata } from "next";
import { Tilt_Neon } from "next/font/google";

import ResponsiveAppBar from "@/components/navbar";
import { getCategories } from "@/fetchers/fetch-data";
import ProductDialog from "@/components/product-dialog";
import { ToastProvider } from "@/providers/toast-provider";
import ThemeContainerProvider from "@/providers/theme-provider";

const inter = Tilt_Neon({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wolf store",
  description: "Store",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <html lang="en">
      <ThemeContainerProvider>
        <ProductDialog />
        <ToastProvider />
        <body className={inter.className}>
          <ResponsiveAppBar categories={categories} />
          {children}
        </body>
      </ThemeContainerProvider>
    </html>
  );
}


