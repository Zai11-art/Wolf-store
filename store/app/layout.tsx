import "./globals.css";
import type { Metadata } from "next";
import { Tilt_Neon } from "next/font/google";

import ResponsiveAppBar from "@/components/navbar";
import {
  getAllProducts,
  getCategories,
  getProducts,
} from "@/fetchers/fetch-data";
import ProductDialog from "@/components/product-dialog";
import { ToastProvider } from "@/providers/toast-provider";
import ThemeContainerProvider from "@/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";

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
  const products = await getAllProducts();

  return (
    <ClerkProvider>
      <html lang="en">
        <ThemeContainerProvider>
          <ToastProvider />
          <ProductDialog />
          <body className={inter.className}>
            <ResponsiveAppBar products={products} categories={categories} />
            {children}
          </body>
        </ThemeContainerProvider>
      </html>
    </ClerkProvider>
  );
}
