import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaRupeeSign, FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { PAYMENT_API_BASE_URL } from '../../config.js';

import AmountSelector from './AmountSelector';
import CurrencySelector from './CurrencySelector';
import TipSelector from './TipSelector';
import DonorInformation from './DonorInformation';
import PaymentGatewaySelector from './PaymentGatewaySelector';
import DonationSummary from './DonationSummary';

const DonationPopup = ({ onClose, campaignUrl }) => {
  const [amount, setAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [currency, setCurrency] = useState('INR');

  const [tipOption, setTipOption] = useState('3%');
  const [customTip, setCustomTip] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const [paymentGateway, setPaymentGateway] = useState('PAYTM');
  const [loading, setLoading] = useState(false);

  const taxPercentage = 18;
  const serviceFeePercentage = 5;

  const serviceFee = (parseFloat(amount || 0) * serviceFeePercentage) / 100;
  const taxOnServiceFee = (serviceFee * taxPercentage) / 100;
  const platformCharges = serviceFee + taxOnServiceFee;
  const amountForCampaign = parseFloat(amount || 0) - platformCharges;

  const validateInputs = () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert('Please enter a valid donation amount.');
      return false;
    }
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !mobile.trim()) {
      alert('Please fill out all the required personal details.');
      return false;
    }
    return true;
  };

  const handleDonate = async () => {
    if (!validateInputs()) return;

    try {
      setLoading(true);

      const payload = {
        amount: parseFloat(amount),
        tipAmount: parseFloat(customTip) || 0,
        currency: currency,
        paymentGateway: paymentGateway,
        callbackUrl: 'https://yourbackend.com/payment/callback',
        metadata: {
          firstName,
          lastName,
          email,
          mobile,
        },
      };

      const response = await axios.post(
        `${PAYMENT_API_BASE_URL}/payment/${campaignUrl}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Idempotency-Key': uuidv4(),
          },
        }
      );

      const paymentUrl = response.data;

      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        alert('Payment URL not received. Please contact support.');
      }

      onClose();
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 30 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-0 relative overflow-hidden max-h-[90vh]"
        >
          <div className="overflow-y-auto max-h-[85vh] p-8 pr-2">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl transition-colors"
            >
              <FaTimes />
            </button>

            <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-8">
              Support Our Cause
            </h2>

            <AmountSelector
              amount={amount}
              setAmount={setAmount}
              selectedAmount={selectedAmount}
              setSelectedAmount={setSelectedAmount}
            />

            <CurrencySelector currency={currency} setCurrency={setCurrency} />

            <TipSelector
              amount={amount}
              tipOption={tipOption}
              setTipOption={setTipOption}
              customTip={customTip}
              setCustomTip={setCustomTip}
            />

            <DonationSummary
              amountForCampaign={amountForCampaign}
              serviceFeePercentage={serviceFeePercentage}
              taxPercentage={taxPercentage}
            />

            <DonorInformation
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              email={email}
              setEmail={setEmail}
              mobile={mobile}
              setMobile={setMobile}
            />

            <PaymentGatewaySelector
              paymentGateway={paymentGateway}
              setPaymentGateway={setPaymentGateway}
            />

            <div className="mt-6 flex justify-center">
              <button
                onClick={handleDonate}
                disabled={loading}
                className={`flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-10 rounded-full shadow-lg text-base transition-all ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? <FaSpinner className="animate-spin" /> : <FaRupeeSign className="inline mr-1 mb-1" />}
                {loading ? 'Processing...' : 'Donate Now'}
              </button>
            </div>

            <p className="text-center text-xs text-gray-400 mt-6">
              Donations are tax exempted under section 80G of Income Tax Act.
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DonationPopup;
