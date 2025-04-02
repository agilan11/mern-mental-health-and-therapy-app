import React from 'react';
import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const MyBookings = () => {
  const { data: clinics } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings
  );

  if (!clinics || clinics.length === 0) {
    return <span>No bookings found</span>;
  }

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">My Therapy Appointments</h1>
      {clinics.map((clinic) => (
        <div
          key={clinic._id}
          className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5"
        >
          <div className="lg:w-full lg:h-[250px]">
            <img
              src={clinic.imageUrls[0]}
              className="w-full h-full object-cover object-center"
              alt="Clinic"
            />
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
            <div className="text-2xl font-bold">
              {clinic.name}
              <div className="text-xs font-normal">
                {clinic.city}, {clinic.country}
              </div>
            </div>
            {clinic.bookings.map((booking) => (
              <div key={booking._id} className="border-t pt-2">
                <div>
                  <span className="font-bold mr-2">Appointment Date:</span>
                  <span>
                    {new Date(booking.appointmentDate).toDateString()}
                  </span>
                </div>
                <div>
                  <span className="font-bold mr-2">Patient:</span>
                  <span>
                    {booking.firstName} {booking.lastName}
                  </span>
                </div>
                <div>
                  <span className="font-bold mr-2">Email:</span>
                  <span>{booking.email}</span>
                </div>
                <div>
                  <span className="font-bold mr-2">Cost:</span>
                  <span>${booking.Cost}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
