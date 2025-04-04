import { useFormContext } from "react-hook-form";
import { ClinicFormData } from "./ManageClinicForm";
import React from 'react';

const DetailsSection = () => {
    const {
        register,
        formState: { errors },
      } = useFormContext<ClinicFormData>();
    
      return (
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold mb-3">Add Clinic</h1>

          <label className="text-gray-700 text-sm font-bold flex-1">
            Name
            <input
              type="text"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("name", { required: "This field is required" })}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </label>

          <div className="flex gap-4">
            <label className="text-gray-700 text-sm font-bold flex-1">
              City
              <input
                type="text"
                className="border rounded w-full py-1 px-2 font-normal"
                {...register("city", { required: "This field is required" })}
              />
              {errors.city && (
                <span className="text-red-500">{errors.city.message}</span>
              )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
              Country
              <input
                type="text"
                className="border rounded w-full py-1 px-2 font-normal"
                {...register("country", { required: "This field is required" })}
              />
              {errors.country && (
                <span className="text-red-500">{errors.country.message}</span>
              )}
            </label>
          </div>

          <label className="text-gray-700 text-sm font-bold flex-1">
            Description
            <textarea
              rows={6}
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("description", { required: "This field is required" })}
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </label>

          <label className="text-gray-700 text-sm font-bold max-w-[50%]">
            Price Per Session
            <input
              type="number"
              min={1}
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("pricePerSession", { required: "This field is required" })}
            />
            {errors.pricePerSession && (
              <span className="text-red-500">{errors.pricePerSession.message}</span>
            )}
          </label>

          <label className="text-gray-700 text-sm font-bold max-w-[50%]">
            Sessions Completed
            <input
              type="number"
              min={1}
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("sessionsCompleted", { required: "This field is required" })}
            />
            {errors.sessionsCompleted && (
              <span className="text-red-500">{errors.sessionsCompleted.message}</span>
            )}
          </label>

    </div>
        
      )
}

export default DetailsSection;