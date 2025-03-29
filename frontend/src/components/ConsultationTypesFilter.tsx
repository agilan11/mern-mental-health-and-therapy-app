import React from 'react';
import { consultationTypes } from "../config/clinic-options-config";

type Props = {
    selectedConsultationTypes: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  

  
  const ConsultationTypesFilter = ({ selectedConsultationTypes, onChange }: Props) => {
    return (
      <div className="border-b border-slate-300 pb-5">
        <h4 className="text-md font-semibold mb-2">Consultation Type</h4>
        {consultationTypes.map((type) => (
          <label
  key={type}
  className="flex items-center space-x-3 p-2 rounded-lg border border-gray-400 hover:bg-gray-200 transition cursor-pointer"
>
  <input
    type="checkbox"
    className="w-5 h-5 text-green-600 border-gray-400 rounded focus:ring-green-600 cursor-pointer"
    value={type}
    checked={selectedConsultationTypes.includes(type)}
    onChange={onChange}
  />
  <span className="text-black font-semibold">{type}</span>
</label>

        ))}
      </div>
    );
  };
  
  export default ConsultationTypesFilter;
  