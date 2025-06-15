import React from 'react';

const CurrencySelector = ({ currency, setCurrency }) => (
  <div className="mb-4">
    <h3 className="text-base font-semibold mb-3 text-gray-700">Select Currency</h3>
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
    >
      <option value="INR">INR</option>
      <option value="USD">USD</option>
    </select>
  </div>
);

export default CurrencySelector;
