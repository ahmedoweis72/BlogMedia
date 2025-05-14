"use client"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-lg text-gray-600 font-medium">
          Loading content...
        </div>
        <div className="text-sm text-gray-400">
          Please wait a moment
        </div>
      </div>
    </div>
  );
}
