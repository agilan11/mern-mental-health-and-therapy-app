import React from 'react';
import { Link } from "react-router-dom";
import { ClinicType } from "../models/clinic"

type Props = {
  clinic: ClinicType;
};

const LatestClinicsCard = ({ clinic }: Props) => {
  return (
    <Link
      to={`/detail/${clinic._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md"
    >
      <div className="h-[300px]">
        <img
          src={clinic.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md">
        <span className="text-white font-bold tracking-tight text-3xl">
          {clinic.name}
        </span>
      </div>
    </Link>
  );
};

export default LatestClinicsCard;