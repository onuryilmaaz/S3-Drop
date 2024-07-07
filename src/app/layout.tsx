import type { Metadata } from "next";
import "./globals.css";
//import { inter } from "@/ui/fonts";
import ConfigureAmplifyClientSide from "./amplify-cognito-config";
import { Inter,Outfit } from "next/font/google";

const inter = Outfit ({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "S3-Drop",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <>
          <ConfigureAmplifyClientSide />
          {children}
        </>
      </body>
    </html>
  );
}
