import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { useDialog } from '../DialogContext'; // 🟢 Import the DialogContext to control login popup
import HeroSection from '../components/Campaign/HeroSection';
import StorySection from '../components/Campaign/StorySection';

const Campaign = () => {
  const { isAuthenticated } = useAuth();
  const { openLoginDialog } = useDialog(); // 🟢 Get function to open login dialog
  const navigate = useNavigate();

  const handleStartFundraising = () => {
    if (isAuthenticated) {
      // If already logged in, navigate to raise fund form
      navigate('/raisefund');
    } else {
      // Save intended redirect in localStorage for after login
      localStorage.setItem('postLoginRedirect', '/raisefund');

      // Show login popup
      openLoginDialog();
    }
  };

  return (
    <div className="bg-[#DEF0FF] min-h-screen">
      <HeroSection />
      <StorySection />

      {/* Call to Action Section */}
      <div className="flex flex-col items-center justify-center p-8 bg-white mt-8 shadow rounded">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Ready to start your own fundraising journey?
        </h2>
        <p className="text-gray-600 mb-6 max-w-md text-center">
          Join thousands of fundraisers in making a difference. Start your campaign today!
        </p>
        <button
          onClick={handleStartFundraising}
          className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition"
        >
          Start Your Fundraising Journey
        </button>
      </div>
    </div>
  );
};

export default Campaign;
