import React from 'react';

const AmountSelector = ({ amount, setAmount, selectedAmount, setSelectedAmount }) => (
  <div className="mb-6">
    <h3 className="text-base font-semibold mb-3 text-gray-700">Choose your donation amount</h3>
    <div className="grid grid-cols-3 gap-3">
      {[100, 500, 1000, 2000, 5000, 10000].map((val) => (
        <button
          key={val}
          className={`py-3 rounded-lg font-semibold border transition-all text-sm
            ${selectedAmount === val
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white hover:bg-blue-50 border-gray-300'}`}
          onClick={() => {
            setSelectedAmount(val);
            setAmount(val.toString());
          }}
        >
          ₹ {val}
        </button>
      ))}
    </div>
    <div className="mt-4">
      <input
        type="number"
        placeholder="Or enter a custom amount"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
          setSelectedAmount(null);
        }}
        className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
      />
    </div>
  </div>
);

export default AmountSelector;
