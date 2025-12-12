import "./globals.css";
import Header from "../components/Header/Header";
import { Manrope, Inter } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Car Rental App",
  description: "Rent cars easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.className}`}>
      <body className={manrope.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
