import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import React from "react";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Sim Ruang",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen antialiased",
          fontSans.variable
        )}
      >
      {/*bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-50 to-blue-200*/}
      <main>{children}</main>
      </body>
      <Toaster richColors />
    </html>
  );
}
