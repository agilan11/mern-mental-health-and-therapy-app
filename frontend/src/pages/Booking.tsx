import React from 'react';
import { useQuery } from 'react-query';
import * as apiClient from '../api-client'
import { useParams } from "react-router-dom";
import BookingForm from "../forms/BookingForm/BookingForm";
import { Elements } from "@stripe/react-stripe-js";
import { useSearchContext } from "../contexts/SearchContext";
import BookingDetailsSummary from '../components/BookingDetailsSummary';
import { useAppContext } from "../contexts/AppContext";

const Booking = () =>{
    const search = useSearchContext();
    const { stripePromise } = useAppContext();
    const { clinicId } = useParams();
    const { data: currentUser } = useQuery(
        "fetchCurrentUser",
        apiClient.fetchCurrentUser
    );

    const { data: clinic } = useQuery(
        "fetchClinicByID",
        () => apiClient.fetchClinicById(clinicId as string),
        {
          enabled: !!clinicId,
        }
      );

      const { data: paymentIntentData } = useQuery(
        "createPaymentIntent",
        () =>
          apiClient.createPaymentIntent(
            clinicId as string,
          ),
        {
          enabled: !!clinicId,
        }
      );

      if (!clinic) {
        return <></>;
      }


    return (
      <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetailsSummary
          appointmentDate={search.appointmentDate}
          clinic={clinic}
      />
      {currentUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm
            currentUser={currentUser}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </div>

    );
}

export default Booking;


