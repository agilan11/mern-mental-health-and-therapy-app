import React from 'react';

import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  clinicId: string;
  pricePerSession: number;
};

type PatientInfoFormData = {
    appointmentDate: Date;
};

const PatientInfoForm = ({ clinicId, pricePerSession }: Props) => {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PatientInfoFormData>({
    defaultValues: {
        appointmentDate: search.appointmentDate,
    },
  });

  const appointmentDate = watch("appointmentDate");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: PatientInfoFormData) => {
    search.saveSearchValues("", data.appointmentDate, "",[],[],[]);
    navigate("/sign-in", { state: { from: location } });
  };

  const onSubmit = (data: PatientInfoFormData) => {
    search.saveSearchValues("", data.appointmentDate, "",[],[],[]);
    navigate(`/clinic/${clinicId}/booking`);
  };

  return (
    <div className="flex flex-col p-4 bg-[#101010] text-[#00ff00] gap-4 border border-[#00ff00] rounded-lg">
    <h3 className="text-md font-bold">Price per session: ${pricePerSession}</h3>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div className="grid grid-cols-1 gap-4 items-center">

        <h3 className="text-[#00ff00] font-bold">Appointment Date:</h3>
            <DatePicker
                required
                selected={appointmentDate}
                onChange={(date) => setValue("appointmentDate", date as Date)}
                minDate={minDate}
                maxDate={maxDate}
                placeholderText="Select Appointment Date"
                className="min-w-full bg-white text-black p-2 focus:outline-none border border-[#00ff00] rounded-lg"
                wrapperClassName="min-w-full"
            />
          {isLoggedIn ? (
            <button className="bg-[#00ff00] text-[#101010] h-full p-2 font-bold hover:bg-[#66ff66] text-xl border border-[#101010] rounded-lg"
            >
              Book Appointment
            </button>
          ) : (
            <button className="bg-[#00ff00] text-[#101010] h-full p-2 font-bold hover:bg-[#66ff66] text-xl border border-[#101010] rounded-lg">
              Sign in to Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PatientInfoForm;
