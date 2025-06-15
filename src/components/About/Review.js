import React from 'react';
import people from '../../assets/people-bg.svg';
import reverse from '../../assets/reverseIcon.svg';
import forward from '../../assets/forwardIcon.svg';
import ReviewCard from './ReviewCard';
import { Link } from 'react-router-dom';

const Review = () => {
  return (
    <section
      className="relative bg-cover bg-center py-12 sm:py-16 flex flex-col items-center gap-10"
      style={{
        backgroundImage: `linear-gradient(rgba(1, 54, 17, 0.8), rgba(1, 54, 17, 0.8)), url(${people})`,
      }}
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center">
        What people are saying about us
      </h1>

      {/* Reviews Carousel */}
      <div className="flex items-center gap-4 sm:gap-8 justify-center flex-wrap">
        <img
          src={reverse}
          alt="Previous"
          className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer hover:scale-110 transition-transform"
        />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <img
          src={forward}
          alt="Next"
          className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer hover:scale-110 transition-transform"
        />
      </div>

      {/* Link to all reviews */}
      <Link
        to="/reviews"
        className="text-sm sm:text-base text-white underline hover:opacity-80 transition text-center"
      >
        See all reviews
      </Link>
    </section>
  );
};

export default Review;
