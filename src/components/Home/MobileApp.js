import React from 'react';
import mobile from '../../assets/mobile.svg';
import playStore from '../../assets/googlePlay.svg';
import appStore from '../../assets/appStore.svg';
import tick from '../../assets/tick.svg';

const features = [
  'Access a personalized dashboard',
  'Start fundraisers within seconds',
  'Keep track of all your donations received',
  'Get real time updates and notifications',
  'Withdraw your funds faster',
  'Share among your friends and family'
];

const MobileApp = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-16">
      <div className="bg-[rgb(222,240,255,1)] rounded-2xl shadow-custom-light flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative overflow-hidden">
        
        {/* Mobile Image */}
        <img
          src={mobile}
          alt="Mobile App"
          className="w-40 sm:w-52 md:w-60 lg:w-72 object-contain"
        />

        {/* Right Section */}
        <div className="flex flex-col justify-center space-y-8 text-center lg:text-left px-4 py-8">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl leading-tight text-gray-800">
            Now you can download our App and manage your <br className="hidden lg:block"/> fundraisers on the go
          </h1>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 max-w-xs mx-auto sm:mx-0">
                <img src={tick} alt="tick" className="w-5 h-5 mt-1 flex-shrink-0" />
                <p className="font-semibold text-sm sm:text-base text-gray-700">{feature}</p>
              </div>
            ))}
          </div>

          {/* App Store Buttons */}
          <div className="flex justify-center lg:justify-start gap-6 mt-4">
            <img src={playStore} alt="Google Play Store" className="w-32 cursor-pointer" />
            <img src={appStore} alt="Apple App Store" className="w-32 cursor-pointer" />
          </div>
        </div>

        {/* Decorative Bottom Bar */}
        <div className="h-2 w-full absolute bottom-0 bg-[#DEF0FF]"></div>
      </div>
    </div>
  );
};

export default MobileApp;
