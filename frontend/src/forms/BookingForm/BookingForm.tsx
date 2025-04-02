import React from 'react';
import { useForm } from "react-hook-form";
import { UserType,PaymentIntentResponse } from '../../models/users';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";



type Props = {
    currentUser: UserType;
    paymentIntent: PaymentIntentResponse;
  };

  export type BookingFormData = {
    firstName: string;
    lastName: string;
    email: string;
    appointmentDate: string;
    clinicId: string;
    paymentIntentId: string;
    Cost: number;
  };

  const BookingForm=({ currentUser, paymentIntent  }:Props)=>{
    const stripe = useStripe();
    const elements = useElements();
  
    const search = useSearchContext();
    const { clinicId } = useParams();
  
    const { showToast } = useAppContext();
  
    const { handleSubmit, register } = useForm<BookingFormData>({
        defaultValues: {
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
          appointmentDate: search.appointmentDate.toISOString(),
          clinicId: clinicId,
          Cost: paymentIntent.Cost,
          paymentIntentId: paymentIntent.paymentIntentId
        },
      });

      const { mutate: book, isLoading } = useMutation(
        apiClient.createBooking,
        {
          onSuccess: () => {
            showToast({ message: "Booking Saved!", type: "SUCCESS" });
          },
          onError: () => {
            showToast({ message: "Error saving booking", type: "ERROR" });
          },
        }
      );
  
      const onSubmit = async (formData: BookingFormData) => {
        if (!stripe || !elements) {
          return;
        }
    
        const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement) as StripeCardElement,
          },
        });
    
        if (result.paymentIntent?.status === "succeeded") {
          book({ ...formData, paymentIntentId: result.paymentIntent.id });
        }
      };

    return (
        <form
        onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5">
        <span className="text-3xl font-bold">Confirm Your Details</span>
        <div className="grid grid-cols-2 gap-6">
            <label className="text-gray-700 text-sm font-bold flex-1">
            First Name
            <input
                className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
                type="text"
                readOnly
                disabled
                {...register("firstName")}
            />
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
            Last Name
            <input
                className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
                type="text"
                readOnly
                disabled
                {...register("lastName")}
            />
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
            Email
            <input
                className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
                type="text"
                readOnly
                disabled
                {...register("email")}
            />

            </label>
        </div>
        <div className="space-y-2">

        <div className="bg-[#99ff33] bg-opacity-70 p-4 rounded-md"
        >
          <div className="font-semibold text-lg">
            Cost: ${paymentIntent.Cost.toFixed(2)}
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold"> Payment Details</h3>
        <CardElement
          id="payment-element"
          className="border rounded-md p-2 text-sm"
        />
      </div>

      <div className="flex justify-end">
        <button
          disabled={isLoading}
          type="submit"
          className="w-1/8 bg-gradient-to-r from-[#00ff00] to-[#00cc00] text-black py-2 px-6 
                                font-semibold text-lg rounded-full shadow-md transition-all duration-300 
                                hover:shadow-lg hover:scale-105"
        >
          {isLoading ? "Saving..." : "Confirm Booking"}
        </button>
      </div>

    </form>

    )
  }

  export default BookingForm;