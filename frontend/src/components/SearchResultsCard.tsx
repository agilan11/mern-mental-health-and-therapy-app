import { Link } from "react-router-dom";
import { ClinicType } from "../models/clinic";
import { FaCheckCircle } from "react-icons/fa";
import React from 'react';

type Props = {
  clinic: ClinicType;
};

const SearchResultsCard = ({ clinic }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
      <div className="w-full h-[300px]">
        <img
          src={clinic.imageUrls[0]}
          className="w-full h-full object-cover object-center rounded-lg"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center">
            <span className="flex items-center gap-1 text-green-500 font-semibold">
              <FaCheckCircle />
              {clinic.sessionsCompleted} Sessions Completed
            </span>
          </div>
          <Link
            to={`/detail/${clinic._id}`}
            className="text-2xl font-bold cursor-pointer"
          >
            {clinic.name}
          </Link>
        </div>

        <div>
          <div className="line-clamp-4">
            {clinic.description.length > 50
              ? clinic.description.substring(0, 50) + "..."
              : clinic.description}
          </div>

        </div>

        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          <div className="flex gap-1 items-center">
              {clinic.facilities.slice(0, 2).map((facility) => (
                <span key={facility} className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap">
                  {facility}
                </span>
              ))}
              {clinic.facilities.length > 2 && (
                <span className="text-sm font-bold">...</span>
              )}
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="font-bold">₹{clinic.pricePerSession} per session</span>
            <Link
              to={`/detail/${clinic._id}`}
              className="bg-[#00ff00] text-black px-4 py-2 font-bold rounded-md 
              hover:bg-[#008000] transition duration-300"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
