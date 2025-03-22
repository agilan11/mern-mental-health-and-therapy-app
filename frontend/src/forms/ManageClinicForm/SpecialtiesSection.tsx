import { specialties } from "../../config/clinic-options-config";
import { useFormContext } from "react-hook-form";
import { ClinicFormData } from "./ManageClinicForm";
import React from "react";

const SpecialtiesSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ClinicFormData>();

  const selectedSpecialties = watch("specialties") || [];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Specialties</h2>
      <div className="grid grid-cols-3 gap-2">
        {specialties.map((specialty) => (
          <label
            key={specialty}
            className={
              selectedSpecialties.includes(specialty)
                ? "cursor-pointer bg-purple-300 text-sm rounded-full px-4 py-2 font-semibold"
                : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"
            }
          >
            <input
              type="checkbox"
              value={specialty}
              {...register("specialties")}
              className="hidden"
            />
            <span>{specialty}</span>
          </label>
        ))}
      </div>
      {errors.specialties && (
        <span className="text-red-500 text-sm font-bold">
          {errors.specialties.message}
        </span>
      )}
    </div>
  );
};

export default SpecialtiesSection;
