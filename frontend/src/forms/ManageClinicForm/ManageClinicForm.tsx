import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection"
import TypeSection from "./TypeSection";
import React from 'react';
import FacilitiesSection from "./FacilitiesSection";
import SpecialtiesSection from "./SpecialtiesSection";
import ImagesSection from "./ImagesSection";
import ClinicType from "src/models/clinic";
import { useEffect } from "react";

export type ClinicFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    specialties: string[]; // Types of therapy offered (e.g., Anxiety, Depression)
    consultationTypes: string[]; // E.g., Individual, Couples, Family Therapy
    pricePerSession: number; // Cost per therapy session
    starRating: number;
    facilities: string[]; // Amenities at the clinic (e.g., Parking, Wheelchair Access)
    imageFiles: FileList; // Uploaded images
    imageUrls: string[]; // URLs of uploaded images
};

type Props = {
    clinic?: ClinicType;
    onSave: (clinicFormData: FormData) => void;
    isLoading: boolean;
  };

export const ManageClinicForm=({ onSave, isLoading, clinic }: Props)=>{
    const formMethods = useForm<ClinicFormData>();
    const { handleSubmit, reset} = formMethods;

    useEffect(() => {
      reset(clinic);
    }, [clinic, reset]);
    
    const onSubmit=handleSubmit((formDataJson: ClinicFormData)=>{
        const formData = new FormData();
        if (clinic) {
          formData.append("clinicId", clinic._id);
        }

        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("description", formDataJson.description);
        formData.append("pricePerSession", formDataJson.pricePerSession.toString()); 
        formData.append("starRating", formDataJson.starRating.toString());

        formDataJson.specialties.forEach((specialty, index) => {
            formData.append(`specialties[${index}]`, specialty);
          });
          
          formDataJson.consultationTypes.forEach((type, index) => {
            formData.append(`consultationTypes[${index}]`, type);
          });
          
          formDataJson.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility);
          });

          if (formDataJson.imageUrls) {
            formDataJson.imageUrls.forEach((url, index) => {
              formData.append(`imageUrls[${index}]`, url);
            });
          }

          Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            formData.append(`imageFiles`, imageFile);
          });
          onSave(formData);
    })
    return (
        <FormProvider {...formMethods}>
        <form className="flex flex-col gap-10" onSubmit={onSubmit}>
            <DetailsSection />
            <TypeSection />
            <SpecialtiesSection />
            <FacilitiesSection />
            <ImagesSection />
            <span className="flex justify-end">
                <button
                    disabled={isLoading}
                    type="submit"
                    className="bg-[#00ff00] text-black py-3 px-6 font-bold text-lg rounded-xl transition-all 
                            hover:bg-green-500 disabled:bg-gray-500 disabled:cursor-not-allowed">
                    {isLoading ? "Saving..." : "Save"}
                </button>
                </span>
        </form>
        </FormProvider>
    )
};

export default ManageClinicForm;