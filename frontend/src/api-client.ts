import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import {ClinicType} from "./models/clinic";

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