import React, { useState } from 'react';
import { FaUser, FaMapMarkerAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import exampleSVG from '../../assets/healthcare-support.svg';

const PatientDetailsSection = ({ campaign }) => {
  const {
    relation,
    patientAge,
    disease,
    description,
    patientAddress,
    state,
    city,
    story,
    galleryImages = [],
  } = campaign;

  // Modal state: track index instead of just selected image
  const [selectedIndex, setSelectedIndex] = useState(null);

  const closeModal = () => setSelectedIndex(null);
  const showPrevImage = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
  };
  const showNextImage = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="w-full lg:w-1/2 space-y-10 bg-white rounded-2xl shadow-lg p-6 sm:p-8 relative">
      {/* Patient Info */}
      <section>
        <h2 className="flex items-center text-2xl font-bold text-blue-700 mb-4">
          <FaUser className="mr-2" /> Patient Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p><strong>Relation:</strong> {relation}</p>
          <p><strong>Age:</strong> {patientAge}</p>
          <p><strong>Disease:</strong> {disease}</p>
          <p><strong>Description:</strong> {description}</p>
        </div>
      </section>

      {/* Location */}
      <section>
        <h2 className="flex items-center text-2xl font-bold text-blue-700 mb-4">
          <FaMapMarkerAlt className="mr-2" /> Location
        </h2>
        <p><strong>Address:</strong> {patientAddress}, {city}, {state}</p>
      </section>

      {/* Patient's Story */}
      <section>
        <h2 className="text-2xl font-bold text-[#003198] mb-3">Patient's Story</h2>
        <p className="text-gray-700 leading-relaxed">
          {story || 'No story available.'}
        </p>
      </section>

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <section>
          <h3 className="text-lg font-bold text-[#003198] mb-3">Gallery</h3>
          <div className="grid grid-cols-3 gap-3">
            {galleryImages.map((imgUrl, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg overflow-hidden shadow-inner transition-transform transform hover:scale-105 cursor-pointer"
                onClick={() => setSelectedIndex(index)}
              >
                <img
                  src={imgUrl}
                  alt={`Gallery Image ${index + 1}`}
                  className="object-cover w-full h-24"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="flex justify-center mt-4">
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-300">
          Donate to Support
        </button>
      </section>

      {/* Static Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div className="p-4 bg-blue-50 rounded-lg shadow">
          <h3 className="text-blue-700 font-semibold mb-2">Related Campaigns</h3>
          <p className="text-sm text-gray-700">Check out similar fundraisers.</p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg shadow">
          <h3 className="text-yellow-700 font-semibold mb-2">How it Works</h3>
          <p className="text-sm text-gray-700">Learn how donations help patients directly.</p>
        </div>
      </section>

      {/* Decorative SVG */}
      <img src={exampleSVG} alt="decorative" className="w-full max-w-sm mx-auto" />

      {/* Modal for Image Preview with Carousel */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-lg shadow-lg max-w-2xl w-full p-4 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 font-semibold"
              onClick={closeModal}
            >
              ✕
            </button>

            {/* Image with navigation */}
            <div className="relative w-full flex items-center justify-center">
              <button
                className="absolute left-2 text-gray-600 hover:text-blue-500 text-2xl"
                onClick={showPrevImage}
              >
                <FaChevronLeft />
              </button>
              <img
                src={galleryImages[selectedIndex]}
                alt="Preview"
                className="max-h-[80vh] object-contain border border-gray-300 rounded-md"
              />
              <button
                className="absolute right-2 text-gray-600 hover:text-blue-500 text-2xl"
                onClick={showNextImage}
              >
                <FaChevronRight />
              </button>
            </div>

            {/* Title and Donate Button */}
            <h3 className="text-lg font-bold text-gray-800 text-center mt-3">Support this Cause</h3>
            <button className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow transition duration-300">
              Donate Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDetailsSection;
