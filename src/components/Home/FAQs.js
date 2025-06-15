// FAQs.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import faqIllustration from '../../assets/Health professional team-bro.svg'; // Your uploaded SVG
import { ChevronDownIcon } from 'lucide-react';

const faqsData = [
  {
    question: 'What is Crowdfunding for Medical Causes?',
    answer:
      'It allows individuals to raise funds for urgent medical treatments, surgeries, or health-related emergencies, easing the financial burden on patients and their families.',
  },
  {
    question: 'Is Crowdfunding Legal in India?',
    answer:
      'Yes, donation-based crowdfunding for medical and personal causes is legal in India. Equity crowdfunding is not, but charitable donations are eligible for tax deductions under Section 80G.',
  },
  {
    question: 'How Do I Create a Fundraiser for Medical Treatment?',
    answer:
      'Sign up, provide details about the condition, treatment needs, and required amount. Share your campaign with friends, family, and supporters through social media and email.',
  },
  {
    question: 'Is My Donation Tax-Deductible?',
    answer:
      'Yes, donations made to registered medical crowdfunding platforms in India are eligible for tax deductions under Section 80G of the Income Tax Act, if the platform is a registered charitable trust.',
  },
];

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Illustration */}
        <motion.img
          src={faqIllustration}
          alt="FAQ Illustration"
          className="w-full max-w-md mx-auto md:mx-0"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />

        {/* FAQs Content */}
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-[#06306F]">Frequently Asked Questions</h1>

          {faqsData.map((faq, index) => (
            <div key={index} className="rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => handleToggle(index)}
                className="w-full flex justify-between items-center px-4 py-3 bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white font-semibold text-left hover:opacity-90 transition"
              >
                {faq.question}
                <ChevronDownIcon
                  size={20}
                  className={`transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    className="px-4 py-3 text-sm text-gray-700 bg-white"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
