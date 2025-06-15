import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ProgressTracker from './ProgressTracker';
import { motion } from 'framer-motion';

const FundsNeeded = ({ formData, updateFormData, nextStep, prevStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: formData,
  });

  useEffect(() => {
    // Load formData into the form
    Object.entries(formData).forEach(([key, value]) => {
      setValue(key, value);
    });
  }, [formData, setValue]);

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
        Step 3: Fundraising Details
      </h1>
      <ProgressTracker step={3} />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Amount Required */}
        <div>
          <label className="text-sm font-semibold text-[#003198]">
            Amount Required (INR)
          </label>
          <input
            type="number"
            {...register('totalAmount', {
              required: 'Amount is required',
              min: { value: 1, message: 'Amount must be at least ₹1' },
            })}
            placeholder="Enter amount"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          {errors.totalAmount && (
            <p className="text-red-500 text-sm">{errors.totalAmount.message}</p>
          )}
        </div>

        {/* End Date */}
        <div>
          <label className="text-sm font-semibold text-[#003198]">
            Fundraising Deadline
          </label>
          <input
            type="date"
            {...register('endDate', {
              required: 'End date is required',
              validate: (value) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const selectedDate = new Date(value);
                return (
                  selectedDate >= today || 'Date must be in the future'
                );
              },
            })}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          {errors.endDate && (
            <p className="text-red-500 text-sm">{errors.endDate.message}</p>
          )}
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
            Submit
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default FundsNeeded;
