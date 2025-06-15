import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ProgressTracker from './ProgressTracker';
import { motion } from 'framer-motion';
import Select from 'react-select';
import statesCitiesData from '../../assets/Indian_Cities_In_States.json';
import GalleryUploader from './GalleryUploader';
import SingleFileUploader from './SingleFileUploader';

const PatientDetails = ({ formData, updateFormData, nextStep }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm({
    defaultValues: formData,
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const selectedState = watch('state');

  useEffect(() => {
    setStates(Object.keys(statesCitiesData));
    Object.entries(formData).forEach(([key, value]) => {
      setValue(key, value);
    });
  }, [formData, setValue]);

  useEffect(() => {
    if (selectedState) {
      const stateCities = statesCitiesData[selectedState] || [];
      setCities(stateCities);
      const currentCity = getValues('city');
      if (!stateCities.includes(currentCity)) {
        setValue('city', '');
      }
    } else {
      setCities([]);
    }
  }, [selectedState, getValues, setValue]);

  const onSubmit = (data) => {
    updateFormData({ ...formData, ...data });
    nextStep();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 bg-white rounded-lg shadow p-4 sm:p-6"
    >
      <h1 className="text-xl sm:text-2xl font-bold text-center text-[#003198]">
        Step 1: Patient Details
      </h1>
      <ProgressTracker step={1} />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Patient Name */}
        <div>
          <label className="text-sm font-semibold text-[#003198]">Patient Name</label>
          <input
            {...register('patientName', { required: 'Patient name is required' })}
            type="text"
            placeholder="Enter patient name"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          {errors.patientName && <p className="text-red-500 text-sm">{errors.patientName.message}</p>}
        </div>

        {/* Cover Image Upload */}
        <div>
          <label className="text-sm font-semibold text-[#003198]">Upload Cover Photo (Image)</label>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="coverImageUpload"
              className="cursor-pointer bg-[#4F46E5] text-white text-sm font-medium py-1 px-3 rounded hover:bg-[#3F3EE5] w-fit transition"
            >
              Choose File
            </label>
            <input
              id="coverImageUpload"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  updateFormData({ ...formData, coverImage: file });
                }
              }}
              className="hidden"
            />
            {formData.coverImage && (
              <p className="text-green-600 text-xs">File selected: {formData.coverImage.name}</p>
            )}
          </div>
        </div>

        {/* Gallery Image Upload */}
        <GalleryUploader formData={formData} updateFormData={updateFormData} />

        {/* Relation */}
        <div>
          <label className="text-sm font-semibold text-[#003198]">Relation to Patient</label>
          <input
            {...register('relation', { required: 'Relation is required' })}
            type="text"
            placeholder="Enter relation"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          {errors.relation && <p className="text-red-500 text-sm">{errors.relation.message}</p>}
        </div>

        {/* Age */}
        <div>
          <label className="text-sm font-semibold text-[#003198]">Patient Age</label>
          <input
            {...register('patientAge', { required: 'Age is required', min: 0 })}
            type="number"
            placeholder="Enter patient age"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          {errors.patientAge && <p className="text-red-500 text-sm">{errors.patientAge.message}</p>}
        </div>

        {/* Address */}
        <div>
          <label className="text-sm font-semibold text-[#003198]">Address</label>
          <input
            {...register('patientAddress', { required: 'Address is required' })}
            type="text"
            placeholder="Enter address"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          {errors.patientAddress && <p className="text-red-500 text-sm">{errors.patientAddress.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-semibold text-[#003198]">Description</label>
          <input
            {...register('description', { required: 'Description is required' })}
            type="text"
            placeholder="Enter description"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* State Dropdown */}
        <div>
          <label className="text-sm font-semibold text-[#003198]">State</label>
          <Controller
            control={control}
            name="state"
            rules={{ required: 'State is required' }}
            render={({ field }) => (
              <Select
                {...field}
                value={field.value ? { label: field.value, value: field.value } : null}
                options={states.map((state) => ({ value: state, label: state }))}
                placeholder="Select or type state"
                onChange={(option) => field.onChange(option.value)}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            )}
          />
          {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
        </div>

        {/* City Dropdown */}
        <div>
          <label className="text-sm font-semibold text-[#003198]">City</label>
          <Controller
            control={control}
            name="city"
            rules={{ required: 'City is required' }}
            render={({ field }) => (
              <Select
                {...field}
                value={field.value ? { label: field.value, value: field.value } : null}
                options={cities.map((city) => ({ value: city, label: city }))}
                placeholder="Select or type city"
                isDisabled={!selectedState}
                onChange={(option) => field.onChange(option.value)}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            )}
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
        </div>

        {/* Aadhaar Upload */}
        <SingleFileUploader
          label="Upload Aadhaar (PDF/Image)"
          fieldName="aadhaarPath"
          formData={formData}
          updateFormData={updateFormData}
        />

        {/* PAN Upload */}
        <SingleFileUploader
          label="Upload PAN (PDF/Image)"
          fieldName="panPath"
          formData={formData}
          updateFormData={updateFormData}
        />

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white font-semibold py-2 rounded shadow mt-4 transition"
        >
          Next
        </motion.button>
      </form>
    </motion.div>
  );
};

export default PatientDetails;
