import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdLocationOn } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import React from "react";

// Custom styles for react-select dropdowns
const customSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "#1a1a1a", // Dark background
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #00ff00", // Neon green border
    boxShadow: "none",
    "&:hover": { border: "1px solid #00ff88" }, // Lighter neon on hover
    color: "white",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#444" : "#1a1a1a", // Dark gray on hover, black default
    color: "white", // Ensures text is always readable
  }),
  
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: "#333333", // **Minimal Gray Background Instead of Green**
    color: "white",
    borderRadius: "6px",
    padding: "3px 6px",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "white", // **White Text for Readability**
    whiteSpace: "normal", // Ensure text wraps properly
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: "white",
    "&:hover": {
      backgroundColor: "#555555", // **Slightly darker gray on hover**
      color: "white",
    },
  }),
};

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();

  const [location, setLocation] = useState<string>(search.location);
  const [appointmentDate, setAppointmentDate] = useState<Date>(search.appointmentDate);
  const [maxPrice, setMaxPrice] = useState<string>(search.maxPrice);
  
  
  const [specialties, setSpecialties] = useState<string[]>(search.specialties);
  const [consultationTypes, setConsultationTypes] = useState<string[]>(search.consultationTypes);
  const [facilities, setFacilities] = useState<string[]>(search.facilities || []);

  const handleSpecialtyChange = (selectedOptions: any) => {
    setSpecialties(selectedOptions.map((option: any) => option.value));
  };

  const handleConsultationTypeChange = (selectedOptions: any) => {
    setConsultationTypes(selectedOptions.map((option: any) => option.value));
  };

  const handleFacilityChange = (selectedOptions: any) => {
    setFacilities(selectedOptions.map((option: any) => option.value));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(location, appointmentDate,maxPrice, specialties, consultationTypes, facilities);
    navigate("/search");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 p-6 bg-black rounded-lg shadow-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 border-2 border-[#00ff00]"
    >
      {/* Location Input */}
      <div>
        <label className="block text-[#00ff00] font-semibold mb-1">Location</label>
        <div className="flex items-center bg-[#1a1a1a] p-3 rounded-lg border border-[#00ff00]">
          <MdLocationOn size={25} className="mr-2 text-[#00ff00]" />
          <input
            placeholder="Enter city or country"
            className="text-md w-full focus:outline-none bg-transparent text-white"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </div>
      </div>

      <div>
      <label className="block text-[#00ff00] font-semibold mb-1">Appointment Date</label>
      <div className="flex items-center bg-[#1a1a1a] p-3 rounded-lg border border-[#00ff00]">
        <DatePicker
          selected={appointmentDate}
          onChange={(date) => setAppointmentDate(date as Date)}
          minDate={new Date()}
          placeholderText="Select appointment date"
          className="text-md w-full focus:outline-none bg-transparent text-white"
          calendarClassName="bg-[#1a1a1a] text-white"
        />
      </div>
    </div>


      <div>
  <label className="block text-[#00ff00] font-semibold mb-1">Max Price</label>
      <div className="flex items-center bg-[#1a1a1a] p-3 rounded-lg border border-[#00ff00]">
        <span className="text-[#00ff00] font-semibold mr-2">$</span>
        <input
          placeholder="Enter max price"
          className="text-md w-full focus:outline-none bg-transparent text-white"
          value={maxPrice} // ✅ Now it's a string
          onChange={(event) => setMaxPrice(event.target.value)} // ✅ Store as string, no conversion needed here
        />
      </div>
    </div>


      {/* Specialties Dropdown 
      <div>
        <label className="block text-[#00ff00] font-semibold mb-1">Specialties</label>
        <Select
          isMulti
          options={[
            "Anxiety Disorders",
            "Depression",
            "PTSD & Trauma",
            "ADHD Management",
            "Autism Spectrum Support",
            "Relationship & Couples Counseling",
            "Grief & Loss",
            "Stress Management",
            "Eating Disorders",
            "Substance Abuse & Addiction",
            "Bipolar Disorder",
            "Personality Disorders",
            "Anger Management",
            "LGBTQ+ Support",
            "Chronic Pain & Illness Counseling",
          ].map((specialty) => ({ value: specialty, label: specialty }))}
          value={specialties.map((s) => ({ value: s, label: s }))}
          onChange={handleSpecialtyChange}
          styles={customSelectStyles}
        />
      </div>
      */}

      {/* Consultation Types Dropdown 
      <div>
        <label className="block text-[#00ff00] font-semibold mb-1">Consultation Types</label>
        <Select
          isMulti
          options={[
            "Individual Therapy",
            "Couples Therapy",
            "Family Therapy",
            "Child Therapy",
            "Adolescent Therapy",
            "Group Therapy",
            "Cognitive Behavioral Therapy (CBT)",
            "Dialectical Behavior Therapy (DBT)",
            "Psychodynamic Therapy",
            "Mindfulness-Based Therapy",
            "Career Counseling",
            "Psychiatric Consultation",
            "Teletherapy",
            "Trauma-Focused Therapy",
            "Addiction Counseling",
          ].map((type) => ({ value: type, label: type }))}
          value={consultationTypes.map((c) => ({ value: c, label: c }))}
          onChange={handleConsultationTypeChange}
          styles={customSelectStyles}
        />
      </div>
      */}

      {/* Availability Date 
      <div>
        <label className="block text-[#00ff00] font-semibold mb-1">Availability Date</label>
        <DatePicker
          selected={availabilityDate}
          onChange={(date) => setAvailabilityDate(date as Date)}
          minDate={new Date()}
          className="w-full bg-[#1a1a1a] p-3 text-white border border-[#00ff00] rounded-lg focus:outline-none"
        />
      </div>
      */}

      {/* Facilities Dropdown 
      <div>
        <label className="block text-[#00ff00] font-semibold mb-1">Facilities</label>
        <Select
          isMulti
          options={[
            "Parking",
            "Wheelchair Accessible",
            "Waiting Lounge",
            "Private Consultation Rooms",
            "24/7 Emergency Support",
            "On-Site Pharmacy",
            "Mental Health Library",
            "Group Therapy Rooms",
            "Child-Friendly Environment",
          ].map((facility) => ({ value: facility, label: facility }))}
          value={facilities.map((f) => ({ value: f, label: f }))}
          onChange={handleFacilityChange}
          styles={customSelectStyles}
        />
      </div>
      */}

      {/* Search & Clear Buttons */}
      <div className="flex justify-center gap-4 col-span-2 lg:col-span-5">
        <button
          className="w-1/8 bg-gradient-to-r from-[#00ff00] to-[#00cc00] text-black py-2 px-6 
                      font-semibold text-lg rounded-full shadow-md transition-all duration-300 
                      hover:shadow-lg hover:scale-105"
        >
          Search
        </button>

        <button
          type="button"
          onClick={() => {
            setLocation("");
            setAppointmentDate(new Date());
            setMaxPrice("");
            setSpecialties([]);
            setConsultationTypes([]);
            setFacilities([]);
          }}
          className="w-1/8 bg-gradient-to-r from-[#ff4444] to-[#cc0000] text-white py-2 px-6 
                      font-semibold text-lg rounded-full shadow-md transition-all duration-300 
                      hover:shadow-lg hover:scale-105"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
