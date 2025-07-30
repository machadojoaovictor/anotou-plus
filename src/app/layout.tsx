import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/header/Header";
import { NextAuthProvider } from "./providers";

export const metadata: Metadata = {
  title: {
    template:"%s | Anotou+",
    default: "Anotou+"
  },
  description: "Anotou+",
  icons: {
    icon: '/icons/favicon.ico'
  }
};

const font = Inter({
  subsets: ['latin'],
  weight: ['400', '700']
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={font.className}>
      <body className="bg-secondary-background">
        <NextAuthProvider>
          <Header />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
