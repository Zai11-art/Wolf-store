import type { Metadata } from "next";
import { Tilt_Neon } from "next/font/google";
import "./globals.css";
import ResponsiveAppBar from "@/components/navbar";
import ThemeContainerProvider from "@/providers/theme-provider";
import ProductDialog from "@/components/product-dialog";
import { ToastProvider } from "@/providers/toast-provider";
import { getCategories } from "@/fetchers/fetch-data";
import { usePathname } from "next/navigation";

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
  console.log(categories);

  return (
    <html lang="en">
      <ThemeContainerProvider>
        <ProductDialog />
        <ToastProvider />
        <body className={inter.className}>
          <ResponsiveAppBar data={categories} />
          {children}
        </body>
      </ThemeContainerProvider>
    </html>
  );
}
