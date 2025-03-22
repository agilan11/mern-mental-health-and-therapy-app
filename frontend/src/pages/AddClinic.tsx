import ManageClinicForm from "../forms/ManageClinicForm/ManageClinicForm"
import React from 'react';
import { useMutation } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";


const AddClinic=()=>{
    const { showToast } = useAppContext();

        const { mutate, isLoading } = useMutation(apiClient.addMyClinic, {
            onSuccess: () => {
            showToast({ message: "Clinic Saved!", type: "SUCCESS" });
            },
            onError: () => {
            showToast({ message: "Error Saving Clinic", type: "ERROR" });
            },
        });

        const handleSave = (clinicFormData: FormData) => {
            mutate(clinicFormData);
        };

    return (
        <ManageClinicForm onSave={handleSave} isLoading={isLoading}/>
    )
}

export default AddClinic