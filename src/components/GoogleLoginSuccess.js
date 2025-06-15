import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleLoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userId = urlParams.get('userId');

    if (token && userId) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        // Optionally, trigger any updates in your app here
        window.location.href = '/'; // redirect to homepage or dashboard
    } else {
        alert('Google login failed. Please try again.');
        navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#DEF0FF] text-center">
      <h2 className="text-lg font-semibold text-[#003198]">Logging you in via Google...</h2>
      <p className="mt-4 text-gray-600">Please wait while we finalize your login process.</p>
    </div>
  );
};

export default GoogleLoginSuccess;
