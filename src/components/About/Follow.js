// Follow.js
import React from 'react';
import linkedin from '../../assets/lnkdin.svg';
import insta from '../../assets/insta.svg';
import facebook from '../../assets/fb.svg';
import whatsapp from '../../assets/wa.svg';

const Follow = () => {
  return (
    <section className="bg-white rounded-t-[60px] py-10 sm:py-14">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 px-4">
        {/* Subscription Section */}
        <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#041B4A]">
            Join Our Impact Community
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start">
            <input
              type="email"
              className="w-full sm:w-64 h-12 border border-[#041B4A] rounded-lg shadow focus:outline-none px-3 text-sm placeholder:italic"
              placeholder="Please enter your email"
            />
            <button className="bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white font-semibold rounded-lg px-4 py-2 text-sm sm:text-base hover:scale-105 transition-transform">
              Subscribe Now
            </button>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#041B4A]">
            Follow Us On
          </h1>

          <div className="flex gap-6 justify-center md:justify-start">
            <img src={linkedin} alt="LinkedIn" className="w-8 h-8 hover:scale-110 transition-transform" />
            <img src={insta} alt="Instagram" className="w-8 h-8 hover:scale-110 transition-transform" />
            <img src={facebook} alt="Facebook" className="w-8 h-8 hover:scale-110 transition-transform" />
            <img src={whatsapp} alt="WhatsApp" className="w-8 h-8 hover:scale-110 transition-transform" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Follow;
