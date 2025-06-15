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
    <div className="w-full lg:w-1/2 space-y-10 bg-white rounded-2xl shadow-lg p-6 sm:p-8">
      {/* Medical Details */}
      <section>
        <h2 className="flex items-center text-2xl font-bold text-blue-700 mb-4">
          <FaMedkit className="mr-2" /> Medical Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p><strong>Hospital:</strong> {hospital}</p>
          <p><strong>Doctor:</strong> {doctor}</p>
          <p><strong>Start Date:</strong> {startDate}</p>
          <p><strong>End Date:</strong> {endDate}</p>
          <p><strong>Duration:</strong> {duration} days</p>
          <p><strong>Status:</strong> {status}</p>
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

        <div className="p-4 border rounded-xl shadow-sm">
          <h3 className="font-bold text-lg text-green-700 mb-2">Live Donations</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            {liveDonations.length > 0 ? (
              liveDonations.map((donation, idx) => (
                <li key={idx}>
                  <strong>{donation.firstName} {donation.lastName}:</strong> {donation.currency} {Number(donation.amount).toLocaleString()}
                </li>
              ))
            ) : (
              <li>No donations yet.</li>
            )}
          </ul>
        </div>

      </section>

      {/* Login & Raise Concern */}
      <div className="grid sm:grid-cols-2 gap-6 mt-10">
        <div className="p-6 bg-blue-50 rounded-xl shadow">
          <h3 className="font-bold text-blue-700 text-lg mb-2">Login to Contribute More</h3>
          <p className="text-sm text-gray-700">Create an account to track your donations, share campaigns, and more.</p>
        </div>

        <div className="p-6 bg-red-50 rounded-xl shadow">
          <h3 className="flex items-center text-lg font-bold text-red-700 mb-2">
            <FaExclamationTriangle className="mr-2" /> Raise a Concern
          </h3>
          <p className="text-sm text-gray-700">Found incorrect information? Raise a concern to notify us.</p>
        </div>
      </div>
    </div>
  );
};

export default MedicalFundraisingSection;
