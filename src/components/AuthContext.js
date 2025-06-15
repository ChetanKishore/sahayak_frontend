import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create the context
const AuthContext = createContext();

// AuthContext.js
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');

    if (storedToken && isTokenValid(storedToken)) {
      setToken(storedToken);
      setUserId(storedUserId);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    }
    setLoading(false);
  }, []);

  const login = (newToken) => {
    const payload = parseJwt(newToken);
    const newUserId = payload?.userId || null;

    localStorage.setItem('token', newToken);
    localStorage.setItem('userId', newUserId);

    setToken(newToken);
    setUserId(newUserId);

    // Check if there’s a post-login redirect
    const postLoginRedirect = localStorage.getItem('postLoginRedirect');
    if (postLoginRedirect) {
      navigate(postLoginRedirect);
      localStorage.removeItem('postLoginRedirect');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setToken(null);
    setUserId(null);
    navigate('/');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, userId, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth easily
export const useAuth = () => useContext(AuthContext);

// Helper functions
function isTokenValid(token) {
  if (!token) return false;

  try {
    const payload = parseJwt(token);
    const currentTime = Date.now() / 1000;
    return payload.exp && payload.exp > currentTime;
  } catch (e) {
    console.error('Invalid token format', e);
    return false;
  }
}

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    console.error('Failed to parse JWT', e);
    return null;
  }
}
