import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    // 👈 ДОДАНО КОНФІГУРАЦІЮ ДЛЯ ЗОВНІШНІХ ЗОБРАЖЕНЬ
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      // Якщо ви використовуєте інші зовнішні хости (наприклад, для картинок автомобілів з API),
      // додайте їх сюди також. Наприклад: 'ac.goit.global'
      {
        protocol: "https",
        hostname: "ac.goit.global",
        port: "",
        pathname: "/**",
      },
      // Додаємо cloudinary, якщо використовується:
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
