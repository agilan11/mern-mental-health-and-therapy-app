import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageClinicForm from "../forms/ManageClinicForm/ManageClinicForm";
import { useAppContext } from "../contexts/AppContext";
import React from 'react';

const EditClinic = () => {
  const { clinicId } = useParams();
  const { showToast } = useAppContext();

  const { data: clinic } = useQuery(
    "fetchMyClinicById",
    () => apiClient.fetchMyClinicById(clinicId || ""),
    {
      enabled: !!clinicId,
    }
  );
  
  const { mutate, isLoading } = useMutation(apiClient.updateMyClinicById, {
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
    <ManageClinicForm clinic={clinic} onSave={handleSave} isLoading={isLoading} />
  );
};

export default EditClinic;