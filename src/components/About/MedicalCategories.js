import React from 'react';
import emergency from '../../assets/emergency.svg';
import arthritis from '../../assets/arthritis.svg';
import surgery from '../../assets/surgery.svg';
import cancer from '../../assets/cancer.svg';
import asthma from '../../assets/asthma.svg';

const categories = [
  {
    name: 'Accident Emergency',
    image: emergency,
    description: 'Get help for emergency treatment and recovery needs.',
  },
  {
    name: 'Amputee Surgery',
    image: surgery,
    description: 'Support life-changing surgeries and prosthetics.',
  },
  {
    name: 'Arthritis',
    image: arthritis,
    description: 'Fund therapies and treatments to relieve joint pain.',
  },
  {
    name: 'Asthma',
    image: asthma,
    description: 'Raise funds for essential asthma care and management.',
  },
  {
    name: 'Blood Cancer',
    image: cancer,
    description: 'Assist patients in their fight against blood cancers.',
  },
];

const MedicalCategories = () => {
  return (
    <div className="bg-white pt-20 flex flex-col items-center gap-4 pb-10">
      <h1 className="font-bold text-3xl sm:text-4xl text-[#003198] text-center">
        Our Medical Fundraising Categories
      </h1>
      <p className="font-normal text-lg sm:text-xl text-[#1A2450] max-w-3xl text-center">
        Be it for a personal need, social cause or a creative idea - you can count on us for the project that you want to raise funds for.
      </p>

      <div className="flex flex-wrap justify-center gap-12 py-10">
        {categories.map((cat, index) => (
          <div key={index} className="flex flex-col items-center space-y-3 group">
            <div className="h-32 w-48 rounded-xl bg-[#DEF0FF] shadow-custom-light flex justify-center items-center relative overflow-hidden">
              <img src={cat.image} alt={cat.name} className="transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center text-center px-4 text-sm sm:text-base font-medium">
                {cat.description}
              </div>
            </div>
            <h2 className="font-semibold text-lg sm:text-xl text-[#041B4A] text-center">
              {cat.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalCategories;
