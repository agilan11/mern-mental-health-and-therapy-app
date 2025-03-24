import { consultationTypes } from "../../config/clinic-options-config";
import { useFormContext } from "react-hook-form";
import { ClinicFormData } from "./ManageClinicForm";
import React from 'react';

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ClinicFormData>();

  // ✅ Watch for an array of selected consultation types
  const selectedTypes = watch ("consultationTypes") || [];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Consultation Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {consultationTypes.map((type) => (
          <label
            key={type}
            className={
              selectedTypes.includes(type) // ✅ Check if selected
                ? "cursor-pointer bg-purple-300 text-sm rounded-full px-4 py-2 font-semibold"
                : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"
            }
          >
            <input
              type="checkbox"
              value={type}
              {...register("consultationTypes")} // ✅ Name should match ClinicFormData
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.consultationTypes && (
        <span className="text-red-500 text-sm font-bold">
          {errors.consultationTypes.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;
