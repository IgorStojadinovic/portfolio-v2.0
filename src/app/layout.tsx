import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio - Igor Stojadinovic",
  description: "Portfolio - Igor Stojadinovic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoMono.variable} antialiased`}>
      {/*   <div id="smooth-wrapper">
          <div id="smooth-content"> */}{children}{/* </div>
        </div> */}
      </body>
    </html>
  );
}
