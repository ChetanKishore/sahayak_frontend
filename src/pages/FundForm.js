import React, { useState } from 'react';
import formImg from '../assets/fundform.svg';
import healthcareSvg from '../assets/healthcare-support.svg';
import crowdfundingSvg from '../assets/crowdfunding.svg';
import PatientDetails from '../components/FundForm/PatientDetails';
import TreatmentDetails from '../components/FundForm/TreatmentDetails';
import FundsNeeded from '../components/FundForm/FundsNeeded';
import Confirmation from '../components/FundForm/Confirmation';
import { Gateway_API_BASE_URL } from '../config';
import { useAuth } from '../components/AuthContext';
import { motion } from 'framer-motion';

const FundForm = () => {
  const { token, userId } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    patientName: '',
    relation: '',
    patientAge: '',
    coverImage: null,  // Cover image file
    galleryImages: [],     // Gallery image files
    patientAddress: '',
    state: '',
    city: '',
    aadhaarPath: null,
    panPath: null,
    description: '',
    disease: '',
    hospital: '',
    doctor: '',
    duration: '',
    totalMedicalCost: '',
    medicalReportPath: null,
    totalAmount: '',
    endDate: ''
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const submitForm = async () => {
    try {
      const formDataToSend = new FormData();

      if (formData.aadhaarPath) formDataToSend.append('aadhaarPath', formData.aadhaarPath);
      if (formData.panPath) formDataToSend.append('panPath', formData.panPath);
      if (formData.medicalReportPath) formDataToSend.append('medicalReportPath', formData.medicalReportPath);

      if (formData.galleryImages.length > 0) {
        formData.galleryImages.forEach((file) => {
          formDataToSend.append('galleryImages', file);
        });
      }

      if (formData.coverImage) {
        formDataToSend.append('coverImage', formData.coverImage);
      }

      const jsonFields = {};
      for (const key in formData) {
        if (!['aadhaarPath', 'panPath', 'medicalReportPath', 'galleryImages', 'coverImage'].includes(key)) {
          jsonFields[key] = formData[key];
        }
      }

      formDataToSend.append('data', new Blob([JSON.stringify(jsonFields)], { type: 'application/json' }));

      const response = await fetch(`${Gateway_API_BASE_URL}/campaign/${userId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Submission failed');
      }

      const result = await response.json();
      console.log('Success:', result);
      nextStep();
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };

  return (
    <>
      {step <= 4 ? (
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-10 my-8 px-4 sm:px-6">
          {/* Left Side: Form Image and Info */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center md:text-left gap-3 max-w-xs sm:max-w-sm md:max-w-xs"
          >
            <img src={formImg} alt="Form Visual" className="w-40 sm:w-52" />
            <p className="text-sm sm:text-base font-medium text-gray-800">
              Thousands Are Raising Funds Online On Sahayak
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-[#003198]">
              You Can Too!
            </h2>
          </motion.div>

          {/* Form Steps */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full max-w-xl bg-white shadow rounded-lg p-4 sm:p-6 space-y-4"
          >
            {step === 1 && (
              <PatientDetails
                formData={formData}
                updateFormData={updateFormData}
                nextStep={nextStep}
              />
            )}
            {step === 2 && (
              <TreatmentDetails
                formData={formData}
                updateFormData={updateFormData}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
            {step === 3 && (
              <FundsNeeded
                formData={formData}
                updateFormData={updateFormData}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
            {step === 4 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[#003198] text-center">Review Your Details</h2>
                <div className="space-y-2">
                  <h3 className="font-semibold">Patient Details</h3>
                  <p><strong>Name:</strong> {formData.patientName}</p>
                  <p><strong>Relation:</strong> {formData.relation}</p>
                  <p><strong>Age:</strong> {formData.patientAge}</p>
                  <p><strong>Address:</strong> {formData.patientAddress}, {formData.city}, {formData.state}</p>
                  <p><strong>Description:</strong> {formData.description}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Treatment Details</h3>
                  <p><strong>Disease:</strong> {formData.disease}</p>
                  <p><strong>Hospital:</strong> {formData.hospital}</p>
                  <p><strong>Doctor:</strong> {formData.doctor}</p>
                  <p><strong>Duration:</strong> {formData.duration}</p>
                  <p><strong>Cost:</strong> ₹{formData.totalMedicalCost}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Fundraising</h3>
                  <p><strong>Target Amount:</strong> ₹{formData.totalAmount}</p>
                  <p><strong>End Date:</strong> {formData.endDate}</p>
                </div>
                <div className="flex justify-between gap-2 pt-2">
                  <button
                    onClick={prevStep}
                    className="flex-1 bg-gray-200 text-gray-800 font-medium py-2 rounded hover:bg-gray-300 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={submitForm}
                    className="flex-1 bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white font-semibold py-2 rounded hover:scale-105 transition-transform"
                  >
                    Confirm & Submit
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Side: Illustrations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:flex flex-col gap-8 items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold gradient-text mb-2">We're Here to Help</h3>
              <p className="text-gray-600">Every step of your fundraising journey</p>
            </div>
            <motion.img 
              src={healthcareSvg} 
              alt="Healthcare Support" 
              className="w-48 lg:w-56 animate-float" 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.img 
              src={crowdfundingSvg} 
              alt="Crowdfunding" 
              className="w-48 lg:w-56 animate-float" 
              style={{ animationDelay: '1s' }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <div className="text-center mt-6">
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Secure & Safe
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  24/7 Support
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <Confirmation formData={formData} />
      )}
    </>
  );
};

export default FundForm;
