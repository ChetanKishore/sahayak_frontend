// HeroSection.js
import React from 'react';
import { Link } from 'react-router-dom';
import teamwork from '../../assets/Teamwork.png';

const HeroSection = () => {
  return (
    <section className="bg-white">
      {/* Hero image with overlay */}
      <div
        className="relative bg-center bg-cover h-72 sm:h-96 flex flex-col justify-center items-start px-4 sm:px-6 md:px-12 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.4)), url(${teamwork})`,
        }}
      >
        <div className="space-y-3 max-w-2xl">
          <h1 className="text-xl sm:text-3xl md:text-5xl font-extrabold tracking-wide leading-snug sm:leading-tight">
            Lend a Helping Hand and Get Involved
          </h1>

          <Link to="/register">
            <button className="bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white font-semibold rounded-full px-4 py-2 sm:px-6 sm:py-3 shadow hover:scale-105 transition-transform">
              Start Your Fundraiser
            </button>
          </Link>
        </div>
      </div>

      {/* Mission statement – fully responsive */}
      <div className="py-6 sm:py-8 px-4 sm:px-6 max-w-4xl mx-auto">
        <p className="text-center text-gray-800 text-sm sm:text-base md:text-lg leading-relaxed bg-white bg-opacity-95 rounded-lg p-4 sm:p-6 shadow">
          At Sahayak, we believe that no one should face the uncertainty of a health crisis alone.
          Our mission is to provide a platform where compassionate individuals can come together
          to support those in urgent need of healthcare funding. Whether it’s an unexpected surgery,
          ongoing treatments, or emergency medical care, Sahayak connects people who care
          with people who need help the most.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
