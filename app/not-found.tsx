import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-6">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <div className="inline-flex items-center space-x-1">
          <div className="h-2 w-2 bg-blue-600 rounded-full animate-pulse"></div>
          <div className="h-2 w-2 bg-blue-600 rounded-full animate-pulse delay-75"></div>
          <div className="h-2 w-2 bg-blue-600 rounded-full animate-pulse delay-150"></div>
        </div>
        <div className="mt-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}