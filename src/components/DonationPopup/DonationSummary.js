import React from 'react';

const DonationSummary = ({ amountForCampaign, serviceFeePercentage, taxPercentage }) => (
  <div className="mb-4">
    <h3 className="text-base font-semibold mb-1 text-gray-700">Amount to Campaign After Platform Charges</h3>
    <p className="text-lg font-bold text-green-700">₹ {amountForCampaign.toFixed(2)}</p>
    <p className="text-xs text-gray-500 mt-1">
      (Platform charges {serviceFeePercentage}% + {taxPercentage}% GST on service fee)
    </p>
  </div>
);

export default DonationSummary;
