import React from 'react';

type Props = {
  selectedSessionsCompleted: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  
  const SessionsCompletedFilter = ({ selectedSessionsCompleted, onChange }: Props) => {
    return (
      <div className="border-b border-slate-300 pb-5">
        <h4 className="text-md font-semibold mb-2">Therapy Sessions Completed</h4>
        {["25", "50", "100", "250", "500", "1000"].map((count) => (
          <label
  key={count}
  className="flex items-center space-x-3 p-2 rounded-lg border border-gray-400 hover:bg-gray-200 transition cursor-pointer"
>
  <input
    type="checkbox"
    className="w-5 h-5 text-green-600 border-gray-400 rounded focus:ring-green-600 cursor-pointer"
    value={count}
    checked={selectedSessionsCompleted.includes(count)}
    onChange={onChange}
  />
  <span className="text-black font-semibold">{`> ${count} Sessions`}</span>
</label>

        ))}
      </div>
    );
  };
  
  export default SessionsCompletedFilter;
  