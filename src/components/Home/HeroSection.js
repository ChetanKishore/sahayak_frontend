// HeroSection.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDialog } from '../../DialogContext'; // 🟢 import the dialog context
import heroIllustration from '../../assets/Hospital patient-amico.svg'; // Using your uploaded SVG

const HeroSection = ({ userId }) => {
  const { openLoginDialog } = useDialog(); // 🟢 get the function to open login dialog

  const handleStartFundraiser = () => {
    // Trigger the login popup
    openLoginDialog();

    // Save intended redirect (optional, in case you want to redirect after login)
    localStorage.setItem('postLoginRedirect', '/raisefund');
  };

  return (
    <section className="relative bg-gradient-to-br from-[#F0F4FF] to-[#D4E4FF] rounded-3xl py-16 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Textual Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-6"
        >
          <h1 className="text-4xl font-bold text-[#06306F] leading-tight">
            Transforming Medical Emergencies into Stories of Hope
          </h1>
          <p className="text-lg text-gray-700 font-medium">
            Join us in supporting medical fundraisers and help families overcome
            their financial challenges.
          </p>
          {userId ? (
            <Link to="/dashboard">
              <button className="bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white text-lg font-semibold rounded-full px-6 py-3 shadow-md hover:scale-105 transition-transform">
                Go to Dashboard
              </button>
            </Link>
          ) : (
            <button
              className="bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white text-lg font-semibold rounded-full px-6 py-3 shadow-md hover:scale-105 transition-transform"
              onClick={handleStartFundraiser}
            >
              Start Your Fundraiser
            </button>
          )}
        </motion.div>

        {/* Illustration */}
        <motion.img
          src={heroIllustration}
          alt="Medical Support Illustration"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 w-72 md:w-96"
        />
      </div>
    </section>
  );
};

export default HeroSection;
