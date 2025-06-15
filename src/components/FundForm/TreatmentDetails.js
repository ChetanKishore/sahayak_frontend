import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ProgressTracker from './ProgressTracker';
import { motion } from 'framer-motion';
import Select from 'react-select';
import hospitalsData from '../../assets/hospitals.json'; // JSON file with hospital names

const TreatmentDetails = ({ formData, updateFormData, nextStep, prevStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm({
    defaultValues: formData,
  });

  const [hospitals, setHospitals] = useState([]);

  // Load form data & hospital list
  useEffect(() => {
    setHospitals(hospitalsData || []);

    Object.entries(formData).forEach(([key, value]) => {
      setValue(key, value);
    });
  }, [formData, setValue]);

  const onSubmit = (data) => {
    updateFormData({ ...formData, ...data });
    nextStep();
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue(fieldName, file);
      const currentData = getValues();
      updateFormData({ ...currentData, [fieldName]: file });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 bg-white rounded-lg shadow p-4 sm:p-6"
    >
      <h1 className="text-xl sm:text-2xl font-bold text-center text-[#003198]">
        Step 2: Treatment Details
      </h1>
      <ProgressTracker step={2} />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Disease Name */}
        <div>
          <label className="text-sm font-semibold text-[#003198]">Disease Name</label>
          <input
            {...register('disease', { required: 'Disease name is required' })}
            type="text"
            placeholder="Enter disease name"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          {errors.disease && <p className="text-red-500 text-sm">{errors.disease.message}</p>}
        </div>

        {/* Hospital Name - using react-select */}
        <div>
          <label className="text-sm font-semibold text-[#003198]">Hospital Name</label>
          <Controller
            control={control}
            name="hospital"
            rules={{ required: 'Hospital name is required' }}
            render={({ field }) => (
              <Select
                {...field}
                value={field.value ? { label: field.value, value: field.value } : null}
                options={hospitals.map((hosp) => ({ value: hosp, label: hosp }))}
                placeholder="Select or type hospital"
                onChange={(option) => field.onChange(option.value)}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            )}
          />
          {errors.hospital && <p className="text-red-500 text-sm">{errors.hospital.message}</p>}
        </div>

        {/* Doctor Name */}
        <div>
          <label className="text-sm font-semibold text-[#003198]">Doctor Name</label>
          <input
            {...register('doctor', { required: 'Doctor name is required' })}
            type="text"
            placeholder="Enter doctor name"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          {errors.doctor && <p className="text-red-500 text-sm">{errors.doctor.message}</p>}
        </div>

        {/* Estimated Duration */}
        <div>
          <label className="text-sm font-semibold text-[#003198]">Estimated Duration (weeks/months)</label>
          <input
            {...register('duration', { required: 'Duration is required' })}
            type="text"
            placeholder="e.g., 2 weeks"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
        </div>

        {/* Estimated Cost */}
        <div>
          <label className="text-sm font-semibold text-[#003198]">Estimated Cost of Treatment (INR)</label>
          <input
            type="number"
            {...register('totalMedicalCost', {
              required: 'Cost is required',
              min: { value: 0, message: 'Cost must be positive' },
            })}
            placeholder="Enter total cost"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          {errors.totalMedicalCost && (
            <p className="text-red-500 text-sm">{errors.totalMedicalCost.message}</p>
          )}
        </div>

        {/* Medical Report Upload */}
        <div>
        <label className="text-sm font-semibold text-[#003198]">Upload Medical Report</label>
        <div className="flex flex-col gap-1">
            <label
            htmlFor="medicalReport"
            className="cursor-pointer bg-[#4F46E5] text-white text-sm font-medium py-1 px-3 rounded hover:bg-[#3F3EE5] w-fit transition"
            >
            Choose File
            </label>
            <input
            id="medicalReport"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileChange(e, 'medicalReportPath')}
            className="hidden"
            />
            {formData.medicalReportPath && (
            <p className="text-green-600 text-xs">File selected: {formData.medicalReportPath.name}</p>
            )}
        </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={prevStep}
            className="flex-1 bg-gray-200 text-gray-800 font-medium py-2 rounded hover:bg-gray-300 transition"
          >
            Previous
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="flex-1 bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white font-semibold py-2 rounded shadow transition"
          >
            Next
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default TreatmentDetails;
