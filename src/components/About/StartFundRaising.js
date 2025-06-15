// StartFundRaising.js
import React from 'react';
import mobile from '../../assets/mobile-about.svg';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const StartFundRaising = () => {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-8 sm:gap-10">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl sm:text-2xl md:text-4xl font-bold text-[#003198] text-center"
        >
          Start a Fundraiser in Three Simple Steps
        </motion.h1>

        {/* Content: Illustration + Button */}
        <div className="flex flex-col-reverse md:flex-row gap-6 sm:gap-8 items-center md:items-start">
          {/* Button */}
          <div className="flex-1 flex justify-center md:justify-start">
            <Link
              to="/register"
              className="inline-block bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow hover:scale-105 transition-transform text-center w-full sm:w-auto"
            >
              Start Fundraising – Register Now
            </Link>
          </div>

          {/* Illustration */}
          <motion.img
            src={mobile}
            alt="Mobile fundraising"
            className="w-48 sm:w-60 md:w-72 mx-auto md:mx-0"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>
    </section>
  );
};

export default StartFundRaising;
