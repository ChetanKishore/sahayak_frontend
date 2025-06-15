import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Gateway_API_BASE_URL } from '../config';
import DonationPopup from '../components/DonationPopup/DonationPopup';
import PatientDetailsSection from '../components/PublicCampaignPage/PatientDetailsSection';
import MedicalFundraisingSection from '../components/PublicCampaignPage/MedicalFundraisingSection';
import ShareCampaign from '../components/PublicCampaignPage/ShareCampaign';

const PublicCampaignPage = () => {
  const { campaignUrl } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await fetch(`${Gateway_API_BASE_URL}/campaign/public/${campaignUrl}`);
        const data = await res.json();
        setCampaign(data);
      } catch (error) {
        console.error('Error fetching campaign data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaign();
  }, [campaignUrl]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-blue-700 font-semibold animate-pulse">
        Loading...
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="text-center text-red-500 font-semibold mt-10">
        Campaign not found.
      </div>
    );
  }

  const progress = Math.min((campaign.amountRaised / campaign.totalAmount) * 100, 100);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-gray-800 space-y-10 animate-fade-in">
      <h1 className="text-4xl font-extrabold text-center text-[#003198]">
        Support {campaign.patientName}'s Medical Journey
      </h1>

      {campaign.coverImagePath && (
        <div className="mb-6 rounded-2xl overflow-hidden shadow-lg">
          <img
            src={campaign.coverImagePath}
            alt={`${campaign.patientName}'s Campaign`}
            className="w-full max-h-[400px] object-contain mx-auto"
          />
        </div>
      )}

      <div className="flex flex-col lg:flex-row items-center gap-10">
        <PatientDetailsSection campaign={campaign} />
        <MedicalFundraisingSection
          campaign={campaign}
          progress={progress}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      </div>

      <ShareCampaign />

      {/* Donation Popup */}
      {showPopup && (
        <DonationPopup
          onClose={() => setShowPopup(false)}
          campaignUrl={campaignUrl}
        />
      )}
    </div>
  );
};

export default PublicCampaignPage;
