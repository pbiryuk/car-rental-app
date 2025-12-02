// src/components/Loader.tsx
import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-8">
      {/* Простий спінер або будь-який індикатор завантаження */}
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      <p className="ml-3 text-gray-600">Завантаження...</p>
    </div>
  );
};

export default Loader;
