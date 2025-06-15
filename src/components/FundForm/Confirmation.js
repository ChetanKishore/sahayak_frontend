import React from 'react';
import { motion } from 'framer-motion';

const Confirmation = ({ formData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-[#f0f4ff] to-[#e0ecf9]"
    >
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
        >
          <svg
            className="w-10 h-10 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>

        <h1 className="text-2xl sm:text-3xl font-bold text-[#003198] mb-2">
          Application Submitted Successfully!
        </h1>

        <p className="text-sm sm:text-base text-gray-600 mb-6">
          Thank you for submitting your fundraising application. Our team will review your details and get back to you shortly.
        </p>

        {/* Application Summary */}
        <div className="bg-gray-50 p-6 rounded-lg text-left space-y-4 shadow-inner">
          <h2 className="text-lg font-semibold text-[#003198]">Application Summary</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-1">Patient Details</h3>
              <p className="text-gray-600">Name: {formData.patientName}</p>
              <p className="text-gray-600">Age: {formData.patientAge}</p>
              <p className="text-gray-600">Location: {formData.city}, {formData.state}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-1">Treatment Details</h3>
              <p className="text-gray-600">Disease: {formData.disease}</p>
              <p className="text-gray-600">Hospital: {formData.hospital}</p>
              <p className="text-gray-600">Estimated Cost: ₹{formData.totalMedicalCost}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-1">Fundraising Goal</h3>
            <p className="text-gray-600">Amount Required: ₹{formData.totalAmount}</p>
            <p className="text-gray-600">Fundraising Deadline: {new Date(formData.endDate).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Back to Home Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.location.href = '/'}
          className="mt-6 bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white font-semibold py-2 px-6 rounded-full shadow hover:shadow-md transition"
        >
          Back to Home
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Confirmation;
