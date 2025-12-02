// src/app/layout.tsx (Фрагмент)
import Header from "../components/Header/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header /> {/* 👈 ДОДАЄМО HEADER */}
        <main>{children}</main>
      </body>
    </html>
  );
}
