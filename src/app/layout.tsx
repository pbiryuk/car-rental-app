import "./globals.css";
import Header from "../components/Header/Header";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
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
    <html lang="en">
      <body className={manrope.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
