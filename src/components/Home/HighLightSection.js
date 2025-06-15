import React from 'react';
import HighlightImg from '../../assets/highlightImg.svg';
import Ecllipse from '../../assets/Ellipse.svg';

const highlights = [
  {
    title: 'Become A Fundraiser',
    desc: 'Faster review and approval in less than 24 hour',
    gradient: 'from-[#4E9FFC] to-[#1A6FEE]',
    opacity: 'opacity-[0.84]',
    textWidth: 'w-[185px]',
  },
  {
    title: 'Quick Fundraising',
    desc: 'Faster review and approval in less than 24 hour',
    gradient: 'from-[#FCD34E] to-[#B77700]',
    opacity: 'opacity-[0.56]',
    textWidth: 'w-[157px]',
  },
  {
    title: 'Start Donating',
    desc: 'Faster review & approval in less than 24 hour',
    gradient: 'from-[#00BB3E] to-[#05951F]',
    opacity: 'opacity-[0.28]',
    textWidth: 'w-[142px]',
  },
];

const HighLightSection = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-[103px] justify-center items-center mx-auto mt-16 md:mt-24 px-4">
      {highlights.map((item, index) => (
        <div key={index} className="flex gap-4 items-center max-w-xs">
          <div
            className={`w-[90px] h-[81px] rounded-[20px] bg-gradient-to-b ${item.gradient} relative flex-shrink-0`}
          >
            <img
              src={HighlightImg}
              className="z-10 relative mx-auto mt-2"
              alt="icon"
            />
            <img
              src={Ecllipse}
              className={`absolute top-[50px] left-[5px] ${item.opacity}`}
              alt="ellipse"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-[18px] leading-[24.51px] text-black">
              {item.title}
            </h1>
            <p className="font-medium text-[12px] leading-[16.34px] text-gray-700">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HighLightSection;
