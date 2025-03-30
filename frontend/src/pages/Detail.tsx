import React from 'react';
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "./../api-client";
import { FaCheckCircle } from "react-icons/fa";
import PatientInfoForm from '../forms/PatientInfoForm/PatientInfoForm';

const Detail = () => {
  const { clinicId } = useParams();

  const { data: clinic } = useQuery(
    ["fetchClinicById", clinicId],
    () => apiClient.fetchClinicById(clinicId || ""),
    {
      enabled: !!clinicId,
    }
  );

  if (!clinic) {
    return <></>;
  }

  return (
    <div className="space-y-6">
        <div className="flex items-center mt-4">
            <FaCheckCircle className="text-green-600 mr-2" />
            <span className="text-lg font-semibold">{clinic.sessionsCompleted} Sessions Completed</span>
        </div>
      <h1 className="text-3xl font-bold">{clinic.name}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {clinic.imageUrls.map((image, index) => (
          <div key={index} className="h-[300px]">
            <img
              src={image}
              alt={clinic.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 mt-4">
            <h3 className="col-span-4 text-lg font-semibold">Consultation Types</h3>
            {clinic.consultationTypes.map((type, index) => (
                <div key={index} className="border border-slate-300 rounded-sm p-3">
                {type}
                </div>
            ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 mt-4">
            <h3 className="col-span-4 text-lg font-semibold">Specialties</h3>
            {clinic.specialties.map((specialty, index) => (
                <div key={index} className="border border-slate-300 rounded-sm p-3">
                {specialty}
                </div>
            ))}
            </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 mt-4">
      <h3 className="col-span-4 text-lg font-semibold">Facilities</h3>
        {clinic.facilities.map((facility, index) => (
          <div key={index} className="border border-slate-300 rounded-sm p-3">
            {facility}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
      <h3 className="col-span-4 text-lg font-semibold">About the clinic</h3>
        <div className="whitespace-pre-line">{clinic.description}</div>
        <div className="h-fit">
        <PatientInfoForm
            pricePerSession={clinic.pricePerSession}
            clinicId={clinic._id}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
