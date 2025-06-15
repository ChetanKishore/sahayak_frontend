import React, { useEffect, useState, useRef } from 'react';
import StoryGrp from './StoryGrp';
import axios from 'axios';
import { Gateway_API_BASE_URL } from '../../config';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CARD_WIDTH = 320;
const GAP = 24;

const StorySection = () => {
  const [campaigns, setCampaigns] = useState([]);
  const sliderRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get(`${Gateway_API_BASE_URL}/campaign/public/get_top_campaigns`);
        setCampaigns(res.data.campaigns || []);
      } catch (err) {
        console.error('Error fetching campaigns:', err);
      }
    };
    fetchCampaigns();
  }, []);

  const moveSlider = (direction) => {
    if (isAnimating || !sliderRef.current) return;

    setIsAnimating(true);
    const slider = sliderRef.current;
    const scrollAmount = CARD_WIDTH + GAP;

    if (direction === 'right') {
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
      slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }

    setTimeout(() => setIsAnimating(false), 500);
  };

  const renderCampaigns = () => {
    const extendedCampaigns =
      campaigns.length >= 4 ? [...campaigns, ...campaigns] : campaigns;

    return extendedCampaigns.map((campaign, index) => (
      <div
        key={campaign.id || index}
        className="flex-shrink-0 w-[300px] sm:w-[320px] h-[400px] mx-3"
      >
        <StoryGrp campaign={campaign} />
      </div>
    ));
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-3xl mb-16 md:mb-24">
      {/* Header */}
      <div className="text-center text-white space-y-3 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">From Crisis to Comeback</h1>
        <p className="text-sm sm:text-base max-w-md mx-auto">
          Read the heartfelt stories of patients whose lives were changed thanks to you...
        </p>
        <button className="mt-4 px-6 py-2 bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white font-semibold rounded-full hover:scale-105 transition">
          View More Stories
        </button>
      </div>

      {/* Slider */}
      <div className="relative mt-6">
        {/* Arrows */}
        <button
          onClick={() => moveSlider('left')}
          className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-full z-10 opacity-80 hover:opacity-100 shadow"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => moveSlider('right')}
          className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-full z-10 opacity-80 hover:opacity-100 shadow"
        >
          <ChevronRight />
        </button>

        <div
          ref={sliderRef}
          className="flex overflow-x-auto gap-6 scroll-smooth py-4"
        >
          {renderCampaigns()}
        </div>
      </div>
    </section>
  );
};

export default StorySection;
