import React from 'react';
import { FaRupeeSign } from 'react-icons/fa';
import { SiPaytm } from 'react-icons/si';

const PaymentGatewaySelector = ({ paymentGateway, setPaymentGateway }) => (
  <div className="mb-6">
    <h3 className="text-base font-semibold mb-3 text-gray-700">Select Payment Gateway</h3>
    <div className="flex gap-4">
      <button
        onClick={() => setPaymentGateway('TESTING')}
        className={`flex items-center gap-2 py-2 px-4 rounded-lg font-semibold border transition-all text-sm
          ${paymentGateway === 'TESTING'
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white hover:bg-blue-50 border-gray-300'}`}
      >
        <FaRupeeSign className="text-lg" /> Testing Pay
      </button>
      <button
        onClick={() => setPaymentGateway('PAYTM')}
        className={`flex items-center gap-2 py-2 px-4 rounded-lg font-semibold border transition-all text-sm
          ${paymentGateway === 'PAYTM'
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white hover:bg-blue-50 border-gray-300'}`}
      >
        <SiPaytm className="text-xl" /> Paytm Pay
      </button>
    </div>
  </div>
);

export default PaymentGatewaySelector;
