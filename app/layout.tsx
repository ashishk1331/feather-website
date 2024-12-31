import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";

const inter = Barlow({
  subsets: ["latin"],
  weight: ["100", "300", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Altar App",
  description: "A distraction-free space to share poems with others",
  metadataBase: new URL("https://altar.vercel.app/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
