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
    <section className="relative hero-section py-20 px-6 overflow-hidden mb-12">
      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-indigo-200 rounded-full opacity-30 animate-float" style={{animationDelay: '1s'}}></div>
      
      <div className="container-custom flex flex-col lg:flex-row items-center gap-12">
        {/* Textual Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-8 text-center lg:text-left"
        >
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
            <span className="gradient-text">Transforming Medical</span>
            <br />
            <span className="text-[#06306F]">Emergencies into</span>
            <br />
            <span className="gradient-text">Stories of Hope</span>
          </h1>
          <p className="text-xl text-gray-600 font-medium max-w-2xl">
            Join our community in supporting medical fundraisers and help families overcome their financial challenges with dignity and hope.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            {userId ? (
              <Link to="/dashboard">
                <button className="btn-primary text-lg px-8 py-4">
                  Go to Dashboard
                  <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </Link>
            ) : (
              <button
                className="btn-primary text-lg px-8 py-4"
                onClick={handleStartFundraiser}
              >
                Start Your Fundraiser
                <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            )}
            <button className="btn-secondary text-lg px-8 py-4">
              Learn More
            </button>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-8 justify-center lg:justify-start mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">10K+</div>
              <div className="text-gray-600">Lives Helped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">₹50Cr+</div>
              <div className="text-gray-600">Funds Raised</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">500+</div>
              <div className="text-gray-600">Active Campaigns</div>
            </div>
          </div>
        </motion.div>
        
        {/* Hero Image/Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 flex justify-center"
        >
          <div className="relative">
            <div className="w-96 h-96 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full opacity-10 absolute -top-4 -left-4"></div>
            <img 
              src="/api/placeholder/400/400" 
              alt="Medical Support Illustration" 
              className="w-80 h-80 object-cover rounded-2xl shadow-2xl relative z-10"
            />
          </div>
        </motion.n.div>

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
