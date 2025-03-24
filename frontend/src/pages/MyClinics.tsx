import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiMoney, BiStar } from "react-icons/bi";
import React from 'react';

const MyClinics = () => {
  const { data: clinicData, error, isLoading } = useQuery(
    "fetchMyClinics",
    apiClient.fetchMyClinics,
    {
      onError: (err) => console.error("Error fetching clinics:", err),
    }
  );
  
  console.log("Clinic Data:", clinicData);
  console.log("Error:", error);
  console.log("Loading:", isLoading);  

  if (!clinicData) {
    return <span>No Clinics found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Clinics</h1>
        <Link
          to="/add-clinic"
          className="flex bg-[#00ff00] text-black text-lg font-bold p-3 rounded-xl hover:bg-green-500 transition duration-300"
        >
          Add Clinic
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {clinicData.map((clinic) => (
          <div
            data-testid="clinic-card"
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
          >
            <h2 className="text-2xl font-bold">{clinic.name}</h2>
            <div className="whitespace-pre-line">{clinic.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsMap className="mr-1" />
                {clinic.city}, {clinic.country}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsBuilding className="mr-1" />
                {clinic.consultationTypes}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiMoney className="mr-1" />${clinic.pricePerSession} per session
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiStar className="mr-1" />
                {clinic.starRating} Star Rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${clinic._id}`}
                className="flex bg-[#00ff00] text-black text-lg font-bold p-3 rounded-xl hover:bg-green-500 transition duration-300">
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClinics;