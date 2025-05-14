'use client';

export default function FormButtons() {
  return (
    <div className="flex gap-4 pt-4">
      <button
        type="submit"
        className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Create Post
      </button>
      <button
        type="button"
        onClick={() => window.history.back()}
        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Cancel
      </button>
    </div>
  );
}