
import React from 'react';
import { motion } from 'framer-motion';
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
    <div className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Our Medical Fundraising</span>
            <br />
            <span className="text-[#003198]">Categories</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Be it for a personal need, social cause or a creative idea - you can count on us for the project that you want to raise funds for.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {categories.map((cat, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="card p-6 text-center hover:transform hover:-translate-y-2 transition-all duration-300">
                <div className="h-32 w-full rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center mb-4 relative overflow-hidden group-hover:from-blue-100 group-hover:to-indigo-200 transition-all duration-300">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-16 h-16 transition-transform duration-300 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                    <p className="text-white text-sm font-medium text-center">
                      {cat.description}
                    </p>
                  </div>
                </div>
                <h2 className="font-bold text-lg text-[#041B4A] group-hover:text-[#003198] transition-colors duration-300">
                  {cat.name}
                </h2>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicalCategories;
