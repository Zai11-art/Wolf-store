import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import StoreDialog from "@/components/store-dialog";
import ThemeProvider from "@/providers/theme-provider";
import { ToastProvider } from "@/providers/toast-provider";

const inter = Inter({ subsets: ["cyrillic"] });
export const metadata: Metadata = {
  title: "Wolf Admin",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <ThemeProvider>
          <StoreDialog />
          <ToastProvider />
          <body className={inter.className}>{children}</body>
        </ThemeProvider>
      </html>
    </ClerkProvider>
  );
}
