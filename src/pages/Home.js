import React, { useState, useEffect } from 'react';
import HeroSection from '../components/Home/HeroSection';
import HighLightSection from '../components/Home/HighLightSection';
import StorySection from '../components/Home/StorySection';
import MobileApp from '../components/Home/MobileApp';
import FAQs from '../components/Home/FAQs';
import ContactUs from '../components/Home/ContactUs';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import { Gateway_API_BASE_URL } from '../config';

const Home = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    const verifyToken = async () => {
      if (!token) {
        setUserId(null);
        setUsername('');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${Gateway_API_BASE_URL}/auth/verify-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          if (storedUserId) setUserId(storedUserId);
          if (storedUsername) setUsername(storedUsername);
        } else {
          localStorage.clear();
          setUserId(null);
          setUsername('');
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        localStorage.clear();
        setUserId(null);
        setUsername('');
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg font-medium">Loading...</div>
    );
  }

  return (
    <div className="relative">
      <HeroSection
        onSignUpClick={() => setShowSignUp(true)}
        onLoginClick={() => setShowLogin(true)}
        userId={userId}
        username={username}
      />
      {/* Added margin bottom to ensure separation from next section */}
      <div className="mb-16 md:mb-24">
        <HighLightSection />
      </div>
      {/* Added margin top to ensure no overlap with the previous section */}
      <div className="mt-16 md:mt-24">
        <StorySection />
      </div>
      <MobileApp />
      <FAQs />
      <ContactUs />

      {showSignUp && (
        <SignUp signupWindow={showSignUp} setSignupWindow={setShowSignUp} />
      )}
      {showLogin && (
        <Login
          onLoginSuccess={(id, name) => {
            setUserId(id);
            setUsername(name);
            setShowLogin(false);
          }}
        />
      )}
    </div>
  );
};

export default Home;
