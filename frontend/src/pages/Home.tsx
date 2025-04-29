import React from 'react';
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestClinicsCard from "../components/LatestClinicsCard";

const Home = () => {
  const { data: clinics, isLoading } = useQuery("fetchQuery", apiClient.fetchClinics);

  if (isLoading) {
    return <div className="text-center text-lg font-bold">Loading...</div>;
  }

  const topRowClinics = clinics?.slice(0, 2) || [];
  const bottomRowClinics = clinics?.slice(2) || [];

  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Clinics</h2>
      <p>Most recent clinics added by our therapists</p>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowClinics.map((clinic) => (
            <LatestClinicsCard key={clinic._id} clinic={clinic} />
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {bottomRowClinics.map((clinic) => (
            <LatestClinicsCard key={clinic._id} clinic={clinic} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
