import React from 'react';
import {ClinicType} from '../models/clinic';

type Props={
    appointmentDate: Date,
    clinic: ClinicType
}

const BookingDetailsSummary = ({
    appointmentDate,
    clinic
  }: Props) => {
    return (
        <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
        <h2 className="text-xl font-bold">Your Booking Details</h2>
        <div className="border-b py-2">
        Location:
        <div className="font-bold">{`${clinic.name}, ${clinic.city}, ${clinic.country}`}</div>
        </div>
        <div className="flex justify-between">
        <div>
          Appointment Date
          <div className="font-bold"> {appointmentDate.toDateString()}</div>
        </div>
        
        </div>
        </div>
     )
  }

  export default BookingDetailsSummary;