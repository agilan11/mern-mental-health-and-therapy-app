import React from 'react';

import { specialties } from "../config/clinic-options-config";

type Props = {
  selectedSpecialties: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SpecialtiesFilter = ({ selectedSpecialties, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Specialties</h4>
      {specialties.map((specialty) => (
        <label key={specialty} className="flex items-center space-x-3 p-2 rounded-lg border border-gray-400 hover:bg-gray-200 transition cursor-pointer">
          <input
            type="checkbox"
            className="w-5 h-5 text-green-600 border-gray-400 rounded focus:ring-green-600 cursor-pointer"
            value={specialty}
            checked={selectedSpecialties.includes(specialty)}
            onChange={onChange}
          />
          <span className="text-black font-semibold">{specialty}</span>
        </label>
      ))}
    </div>
  );
};

export default SpecialtiesFilter;
