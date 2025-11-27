// pages/Error.jsx
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-200">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-neutral-900">404</h1>
        <h2 className="text-2xl font-semibold text-neutral-800 mt-4">
          Page Not Found
        </h2>
        <p className="text-neutral-600 mt-2">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-light-brown text-white rounded-lg hover:bg-dark-brown transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
