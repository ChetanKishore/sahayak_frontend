import React, { useState } from 'react';
import { motion } from 'framer-motion';

const StoryGrp = ({ campaign }) => {
  const [showModal, setShowModal] = useState(false);

  const progressPercentage = campaign.totalAmount
    ? Math.min((campaign.amountRaised / campaign.totalAmount) * 100, 100)
    : 0;

  const handleOverlayClick = (e) => {
    // Close only if the click is outside the modal content
    if (e.target.classList.contains('modal-overlay')) {
      setShowModal(false);
    }
  };

  return (
    <>
      {/* Campaign Card */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden cursor-pointer transition duration-300"
        onClick={() => setShowModal(true)}
      >
        <img
          src={campaign.coverImagePath || '/default-campaign.svg'}
          alt={campaign.patientName || 'Campaign Image'}
          className="w-full h-48 object-cover"
        />

        <div className="p-4 space-y-3">
          <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
            {campaign.description || 'Support the cause'}
          </h3>

          <div className="flex justify-between text-xs text-gray-600">
            <p>
              <span className="font-semibold text-gray-800">
                {campaign.amountRaised || 0}
              </span>{' '}
              of {campaign.totalAmount || 0}
            </p>
            <p>
              <span className="font-semibold">Created:</span>{' '}
              {campaign.createdAt
                ? new Date(campaign.createdAt).toLocaleDateString()
                : 'N/A'}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-600">Donation Progress</p>
            <div className="w-full bg-gray-300 rounded-full h-2 mt-1">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal for Preview */}
      {showModal && (
        <div
          className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={handleOverlayClick}
        >
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full sm:max-w-lg p-4 sm:p-6 space-y-4 relative transition-all duration-300 ease-in-out">
            {/* Image */}
            <img
              src={campaign.coverImagePath || '/default-campaign.svg'}
              alt={campaign.patientName || 'Campaign Image'}
              className="w-full h-48 object-cover rounded"
            />

            {/* Details */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {campaign.patientName || 'Anonymous'}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {campaign.description || 'No description available'}
              </p>
              <p className="text-xs text-gray-500">
                Created on:{' '}
                {campaign.createdAt
                  ? new Date(campaign.createdAt).toLocaleDateString()
                  : 'N/A'}
              </p>

              {/* Donation Progress */}
              <div>
                <p className="text-xs text-gray-600">Donation Progress</p>
                <div className="w-full bg-gray-300 rounded-full h-2 mt-1">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* View Full Details Button */}
            <button
              className="w-full py-2 mt-2 bg-gradient-to-r from-[#3D9580] to-[#347f6a] text-white font-semibold rounded shadow hover:scale-105 transition-transform"
              onClick={() =>
                window.open(`/campaign/public/${campaign.campaignUrl}`, '_blank')
              }
            >
              View Full Details
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default StoryGrp;
