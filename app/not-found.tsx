"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-md mx-auto">
        {/* 404 Number */}
        <h1 className="text-8xl font-light text-gray-900 mb-4">404</h1>

        {/* Title */}
        <h2 className="text-2xl font-medium text-gray-900 mb-3">找不到頁面</h2>

        {/* Description */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          您要尋找的頁面不存在或已被移動。
        </p>

        {/* Buttons */}
        <div className="space-y-3">
          <Link
            href="/"
            className="inline-block w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            回到首頁
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-block w-full bg-gray-100 text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
          >
            返回上頁
          </button>
        </div>
      </div>
    </div>
  );
}
