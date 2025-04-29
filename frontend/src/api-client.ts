import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import {ClinicType} from "./models/clinic";
import {ClinicSearchResponse} from "./models/clinic"
import { UserType,PaymentIntentResponse } from "./models/users";
import { BookingFormData } from "./forms/BookingForm/BookingForm";


export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    const responseBody = await response.json();
  
    if (!response.ok) {
      throw new Error(responseBody.message);
    }
  };
  
  export const signIn = async (formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    const body = await response.json();
    if (!response.ok) {
      throw new Error(body.message);
    }
    return body;
  };

  export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Token invalid");
    }
  
    return response.json();
  };

  export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      credentials: "include",
      method: "POST",
    });
  
    if (!response.ok) {
      throw new Error("Error during sign out");
    }
  };

  export const addMyClinic = async (clinicFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-clinics`, {
      method: "POST",
      credentials: "include",
      body: clinicFormData,
    });
  
    if (!response.ok) {
      throw new Error("Failed to add clinic");
    }
  
    return response.json();
  };

  export const fetchMyClinics = async (): Promise<ClinicType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-clinics`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Error fetching clinics");
    }
  
    return response.json();
  };

  export const fetchMyClinicById = async (clinicId: string): Promise<ClinicType> => {
    const response = await fetch(`${API_BASE_URL}/api/my-clinics/${clinicId}`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Error fetching Clinics");
    }
  
    return response.json();
  };

  export const updateMyClinicById = async (clinicFormData: FormData) => {
    const response = await fetch(
      `${API_BASE_URL}/api/my-clinics/${clinicFormData.get("clinicId")}`,
      {
        method: "PUT",
        body: clinicFormData,
        credentials: "include",
      }
    );
  
    if (!response.ok) {
      throw new Error("Failed to update Clinic");
    }
  
    return response.json();
  };

  export const fetchClinicById = async (clinicId: string): Promise<ClinicType> => {
    const response = await fetch(`${API_BASE_URL}/api/clinics/${clinicId}`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Error fetching Clinics");
    }
  
    return response.json();
  };

  export type SearchParams = {
    location?: string; // City or country where the clinic is located
    appointmentDate?: string;
 // Preferred appointment date
    specialties?: string[]; // Types of therapy offered (e.g., Anxiety, Depression)
    consultationTypes?: string[]; // Therapy types (e.g., Individual, Family, Couples)
    facilities?: string[]; // Amenities (e.g., Wheelchair Access, Parking)
    page?: string; // Pagination
    maxPrice?: string; // Max price per session
    sortOption?: string; // Sorting criteria (e.g., price, sessions completed)
    sessionsCompleted?: string;
  };

  export const searchClinics = async (
    searchParams: SearchParams
  ): Promise<ClinicSearchResponse> => {
    const queryParams = new URLSearchParams();
    
    queryParams.append("location", searchParams.location || "");
    queryParams.append("appointmentDate", searchParams.appointmentDate || "");
    queryParams.append("page", searchParams.page || "");
    queryParams.append("maxPrice", searchParams.maxPrice || "");
    queryParams.append("sortOption", searchParams.sortOption || "");
  
    searchParams.specialties?.forEach((specialty) =>
      queryParams.append("specialties", specialty)
    );
  
    searchParams.consultationTypes?.forEach((type) =>
      queryParams.append("consultationTypes", type)
    );
  
    searchParams.facilities?.forEach((facility) =>
      queryParams.append("facilities", facility)
    );
  
    if (searchParams.sessionsCompleted) {
      queryParams.append("sessionsCompleted", searchParams.sessionsCompleted);
    }
  
    const response = await fetch(
      `${API_BASE_URL}/api/clinics/search?${queryParams}`
    );
  
    if (!response.ok) {
      throw new Error("Error fetching clinics");
    }
  
    return response.json();
  };
  
  export const createPaymentIntent = async (
    clinicId: string
  ): Promise<PaymentIntentResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/api/clinics/${clinicId}/bookings/payment-intent`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Error fetching payment intent");
    }
  
    return response.json();
  };

  export const createBooking = async (formData: BookingFormData) => {
    const response = await fetch(
      `${API_BASE_URL}/api/clinics/${formData.clinicId}/bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      }
    );
  
    if (!response.ok) {
      throw new Error("Error booking appointment");
    }
  };

  export const fetchClinics = async (): Promise<ClinicType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/clinics`);
    if (!response.ok) {
      throw new Error("Error fetching clinics");
    }
    return response.json();
  };

  export const fetchMyBookings = async (): Promise<ClinicType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch bookings");
  }

  return response.json();
};
  