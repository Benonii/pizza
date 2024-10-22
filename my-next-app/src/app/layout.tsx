import type { Metadata } from "next";
import { Roboto, Open_Sans } from 'next/font/google';
import "./globals.css";

const geistSans = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['100', '400', '700', '900'],
});

const geistMono = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  weight: ['300', '400', '700', '800'],
});

export const metadata: Metadata = {
  title: "Pizza Beno",
  description: "Get your Pizza wherever. Sell your Pizzas with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
