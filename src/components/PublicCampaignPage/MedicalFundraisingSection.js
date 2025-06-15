import React, { useEffect, useState } from 'react';
import {
  FaMedkit,
  FaClipboardList,
  FaCommentDots,
  FaExclamationTriangle,
} from 'react-icons/fa';
import GaugeComponent from 'react-gauge-component';
import DonationPopup from '../DonationPopup/DonationPopup';
import { PAYMENT_API_BASE_URL } from '../../config';

const MedicalFundraisingSection = ({ campaign, progress, showPopup, setShowPopup }) => {
  const {
    hospital,
    doctor,
    startDate,
    endDate,
    duration,
    status,
    totalMedicalCost,
    amountRaised,
    totalAmount,
    id: campaignId, // assuming your campaign object has an "id" field
  } = campaign;

  // State to store live donations
  const [liveDonations, setLiveDonations] = useState([]);

  // Fetch live donations from the API
  // Fetch live donations from the API
  useEffect(() => {
    const fetchLiveDonations = async () => {
      try {
        const response = await fetch(`${PAYMENT_API_BASE_URL}/payment/live-donations/${campaignId}`);
        if (response.ok) {
          const data = await response.json();
          // Update only the "donations" array
          setLiveDonations(data.donations || []);
        } else {
          console.error('Failed to fetch live donations');
        }
      } catch (error) {
        console.error('Error while fetching live donations:', error);
      }
    };

    if (campaignId) {
      fetchLiveDonations();
    }
  }, [campaignId]);


  return (
    <div className="w-full lg:w-1/2 space-y-8 bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
      {/* Medical Details */}
      <section className="card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-0">
        <h2 className="flex items-center text-2xl font-bold text-blue-700 mb-6">
          <div className="bg-blue-100 p-2 rounded-lg mr-3">
            <FaMedkit className="text-blue-600" />
          </div>
          Medical Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500 font-medium">Hospital</p>
            <p className="text-gray-800 font-semibold mt-1">{hospital}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500 font-medium">Doctor</p>
            <p className="text-gray-800 font-semibold mt-1">{doctor}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500 font-medium">Start Date</p>
            <p className="text-gray-800 font-semibold mt-1">{startDate}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500 font-medium">End Date</p>
            <p className="text-gray-800 font-semibold mt-1">{endDate}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500 font-medium">Duration</p>
            <p className="text-gray-800 font-semibold mt-1">{duration} days</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500 font-medium">Status</p>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${
              status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {status}
            </span>
          </div>
        </div>
      </section>

      {/* Fundraising */}
      <section>
        <h2 className="flex items-center text-2xl font-bold text-blue-700 mb-4">
          <FaClipboardList className="mr-2" /> Fundraising Progress
        </h2>
        <div className="text-center space-y-3">
          <p><strong>Total Medical Cost:</strong> ₹{Number(totalMedicalCost).toLocaleString()}</p>
          <p><strong>Amount Raised:</strong> ₹{Number(amountRaised).toLocaleString()} / ₹{Number(totalAmount).toLocaleString()}</p>
          <div className="flex justify-center mt-4">
            <GaugeComponent
              type="semicircle"
              arc={{
                width: 0.2,
                padding: 0.005,
                cornerRadius: 1,
                subArcs: [
                  { limit: 25, color: '#EA4228' },
                  { limit: 50, color: '#F58B19' },
                  { limit: 75, color: '#F5CD19' },
                  { limit: 100, color: '#5BE12C' },
                ],
              }}
              pointer={{ type: 'arrow', color: '#000' }}
              labels={{
                valueLabel: {
                  formatTextValue: (value) => `${value.toFixed(0)}%`,
                  style: { fontSize: '1.2rem' },
                },
                tickLabels: {
                  type: 'outer',
                  ticks: [{ value: 0 }, { value: 25 }, { value: 50 }, { value: 75 }, { value: 100 }],
                },
              }}
              value={progress}
            />
          </div>
        </div>
      </section>

      {/* Donation CTA */}
      <section className="text-center">
        <button
          onClick={() => setShowPopup(true)}
          className="bg-gradient-to-r from-[#3D9580] to-[#4F46E5] hover:scale-105 transition-transform text-white font-semibold py-3 px-10 rounded-full shadow-md"
        >
          Contribute Now
        </button>
      </section>

      {showPopup && (
        <DonationPopup onClose={() => setShowPopup(false)} campaignUrl={campaign.campaignUrl} />
      )}

      {/* Live Comments & Donations */}
      <section className="grid sm:grid-cols-2 gap-6 mt-10">
        <div className="p-4 border rounded-xl shadow-sm">
          <h3 className="flex items-center font-bold text-lg text-blue-700 mb-2">
            <FaCommentDots className="mr-2" /> Live Comments
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Amit:</strong> Praying for a quick recovery!</p>
            <p><strong>Sara:</strong> Just donated. Stay strong!</p>
            <p><strong>John:</strong> Sharing this with friends!</p>
          </div>
        </div>

        <div className="card p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-0">
          <h3 className="flex items-center font-bold text-xl text-green-700 mb-4">
            <div className="bg-green-100 p-2 rounded-lg mr-3">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            Live Donations
          </h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {liveDonations.length > 0 ? (
              liveDonations.map((donation, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">{donation.firstName} {donation.lastName}</p>
                    <p className="text-sm text-gray-500">Recently donated</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{donation.currency} {Number(donation.amount).toLocaleString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <p className="text-gray-500">No donations yet. Be the first to contribute!</p>
              </div>
            )}
          </div>
        </div>

      </section>

      {/* Login & Raise Concern */}
      <div className="grid sm:grid-cols-2 gap-6 mt-10">
        <div className="card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-0 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-2 rounded-lg mr-3">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-blue-700 text-lg">Login to Contribute More</h3>
          </div>
          <p className="text-gray-700 mb-4">Create an account to track your donations, share campaigns, and more.</p>
          <button className="btn-primary w-full">Get Started</button>
        </div>

        <div className="card p-6 bg-gradient-to-br from-red-50 to-pink-50 border-0 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center mb-4">
            <div className="bg-red-100 p-2 rounded-lg mr-3">
              <FaExclamationTriangle className="text-red-600" />
            </div>
            <h3 className="font-bold text-red-700 text-lg">Raise a Concern</h3>
          </div>
          <p className="text-gray-700 mb-4">Found incorrect information? Raise a concern to notify us.</p>
          <button className="btn-secondary w-full border-red-500 text-red-600 hover:bg-red-500 hover:text-white">Report Issue</button>
        </div>
      </div>
    </div>
  );
};

export default MedicalFundraisingSection;
