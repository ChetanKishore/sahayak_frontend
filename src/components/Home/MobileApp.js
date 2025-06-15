
import React from 'react';
import { motion } from 'framer-motion';
import mobile from '../../assets/mobile.svg';
import tick from '../../assets/green tick.svg';

const features = [
  "Track donations in real-time",
  "Share campaigns instantly",
  "Receive instant notifications",
  "Manage multiple campaigns",
  "Connect with donors directly",
  "Access detailed analytics"
];

const MobileApp = () => {
  return (
    <div className="section-padding bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container-custom">
        <div className="card p-8 lg:p-12 bg-gradient-to-br from-white to-blue-50 border-0 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Mobile Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-shrink-0"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full opacity-20 blur-xl"></div>
                <img
                  src={mobile}
                  alt="Mobile App"
                  className="w-64 md:w-80 lg:w-96 object-contain relative z-10 animate-float"
                />
              </div>
            </motion.div>

            {/* Right Section */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 space-y-8 text-center lg:text-left"
            >
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                  <span className="gradient-text">Download our App</span>
                  <br />
                  <span className="text-gray-800">and manage your fundraisers</span>
                  <br />
                  <span className="text-[#003198]">on the go</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                  Take control of your campaigns with our powerful mobile app. Everything you need to run successful fundraisers, right in your pocket.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <img src={tick} alt="checkmark" className="w-6 h-6 mt-1 flex-shrink-0" />
                    <p className="font-semibold text-gray-700 text-left">{feature}</p>
                  </motion.div>
                ))}
              </div>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
                <button className="btn-primary flex items-center justify-center gap-3 px-6 py-4">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                  </svg>
                  Download for iOS
                </button>
                <button className="btn-secondary flex items-center justify-center gap-3 px-6 py-4">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  Download for Android
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileApp;
