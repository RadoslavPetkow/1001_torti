import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "1001 ТОРТИ-НЕЛИ | Демо сайт и система за поръчки",
  description: "Демо концепция за онлайн каталог за торти, заявки и админ панел за 1001 ТОРТИ-НЕЛИ в Сандански.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}>
      <body>{children}</body>
    </html>
  );
}
