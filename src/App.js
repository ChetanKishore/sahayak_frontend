import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import About from './pages/About';
import Campaign from './pages/Campaign';
import FundForm from './pages/FundForm';
import PublicCampaignPage from './pages/PublicCampaignPage';
import Profile from './pages/Profile';
import Login from './components/Login';
import { useDialog } from './DialogContext';
import { useState, useEffect } from 'react';
import EditProfile from './components/EditProfile';
import Notification from './components/Notifications';
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider, useAuth } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import GoogleLoginSuccess from './components/GoogleLoginSuccess';

function AppContent() {
  const { isLoginDialogOpen, isNotifDialogOpen } = useDialog();
  const [edit, setEdit] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();

  const hideNavAndFooter = location.pathname.startsWith('/campaign/public/');

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const expiry = payload.exp;
          const now = Math.floor(Date.now() / 1000);
          if (expiry < now) {
            logout();
            window.location.href = '/';
          }
        } catch (e) {
          logout();
          window.location.href = '/';
        }
      }
    };
    checkTokenExpiration();
    const interval = setInterval(checkTokenExpiration, 60000);
    return () => clearInterval(interval);
  }, [logout]);

  return (
    <div className="relative">
      <div
        className={`${isLoginDialogOpen ? 'blur-md max-h-[1000px] overflow-hidden' : ''} ${
          edit ? 'blur-md max-h-[1300px] overflow-hidden' : ''
        } ${isNotifDialogOpen ? 'blur-md max-h-[1800px] overflow-hidden' : ''} bg-[#DEF0FF]`}
      >
        {/* NavBar */}
        {!hideNavAndFooter && <NavBar />}

        {/* Routes */}
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/campaign" element={<Campaign />} />
          <Route path="/campaign/public/:campaignUrl" element={<PublicCampaignPage />} />
          <Route path="/google-login-success" element={<GoogleLoginSuccess />} />

          {/* Protected routes */}
          <Route
            path="/raisefund"
            element={
              <ProtectedRoute>
                <FundForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile edit={edit} setEdit={setEdit} />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* Footer */}
        {!hideNavAndFooter && <Footer />}
      </div>

      {/* Dialog Components */}
      {isLoginDialogOpen && <Login />}
      {isNotifDialogOpen && <Notification />}
      {edit && <EditProfile edit={edit} setEdit={setEdit} />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
