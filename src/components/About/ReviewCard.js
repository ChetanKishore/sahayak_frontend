import React from 'react';
import profile from '../../assets/reviewCard.svg';

const ReviewCard = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6 max-w-xs space-y-4 flex flex-col justify-between">
      {/* Profile */}
      <div className="flex items-center gap-3">
        <img src={profile} alt="Reviewer" className="w-12 h-12 rounded-full" />
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-[#003198]">Sreeja's Mother</h3>
          <p className="text-xs sm:text-sm text-gray-600 font-medium">Campaigner</p>
        </div>
      </div>

      {/* Testimonial */}
      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
        It was positively overwhelming to see so many strangers and well wishers
        come to help us through the platform, and thus it’s possible to cure my
        child’s health condition.
      </p>
    </div>
  );
};

export default ReviewCard;
