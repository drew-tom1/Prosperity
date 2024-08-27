import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const text = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "tourmaline",
  description:
    "web application that can retrieve historical performance data of a company and predict its future value.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${text.className} bg-background text-foreground dark:bg-background dark:text-foreground`}>
      <body className="antialiased w-full mx-auto mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          {children}
        </main>
      </body>
    </html>
  );
}

