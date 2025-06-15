import React, { useEffect } from 'react';

const TipSelector = ({ amount, tipOption, setTipOption, customTip, setCustomTip }) => {
  useEffect(() => {
    if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
      if (tipOption === '3%') {
        setCustomTip(((parseFloat(amount) * 3) / 100).toFixed(2));
      } else if (tipOption === '10%') {
        setCustomTip(((parseFloat(amount) * 10) / 100).toFixed(2));
      } else if (tipOption === 'No Tip') {
        setCustomTip('0');
      }
    }
  }, [amount, tipOption]);

  return (
    <div className="mb-4">
      <h3 className="text-base font-semibold mb-3 text-gray-700">Add a Tip</h3>
      <div className="flex flex-wrap gap-3 mb-2">
        {['3%', '10%', 'Custom', 'No Tip'].map((option) => (
          <button
            key={option}
            onClick={() => setTipOption(option)}
            className={`px-3 py-2 rounded-full text-xs font-semibold border transition-all
              ${tipOption === option
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white hover:bg-blue-50 border-gray-300'}`}
          >
            {option}
          </button>
        ))}
      </div>
      {tipOption === 'Custom' && (
        <input
          type="number"
          placeholder="Enter custom tip"
          value={customTip}
          onChange={(e) => setCustomTip(e.target.value)}
          className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        />
      )}
      {tipOption !== 'Custom' && (
        <input
          type="number"
          readOnly
          value={customTip}
          className="w-full mt-2 p-3 border border-gray-200 rounded-lg bg-gray-100 text-sm"
        />
      )}
    </div>
  );
};

export default TipSelector;
