import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 p-4">
        <h2 className="text-2xl font-semibold mb-4">Access Restricted</h2>
        <p className="mb-4">You need to be logged in to access this page.</p>
        {/* You can directly render your Login dialog or redirect to a login page */}
        {/* For example, if you have a login dialog trigger in your context: */}
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            // If you have a context method to open your login dialog:
            document.dispatchEvent(new Event('openLoginDialog'));
          }}
        >
          Log In
        </button>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
