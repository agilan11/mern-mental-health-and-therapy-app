import React from 'react';
import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import  SearchResultsCard  from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import SessionsCompletedFilter from "../components/SessionsCompletedFilter";
import ConsultationTypesFilter from "../components/ConsultationTypesFilter"
import FacilitiesFilter from '../components/FacilitiesFilter';
import SpecialtiesFilter from '../components/SpecialtiesFilter';

const Search=()=>{
    const search = useSearchContext();
    const [page, setPage] = useState<number>(1);
    const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
    const [selectedConsultationTypes, setSelectedConsultationTypes] = useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
    const [sortOption, setSortOption] = useState<string>("");
    const [selectedSessionsCompleted, setSelectedSessionsCompleted] = useState<string[]>([]);


    const searchParams = {
      location: search.location,
      appointmentDate: search.appointmentDate.toISOString(),
      page: page.toString(),
      facilities: selectedFacilities,
      specialties: selectedSpecialties,
      consultationTypes: selectedConsultationTypes,
      maxPrice: search.maxPrice,
      sortOption,
      sessionsCompleted: selectedSessionsCompleted.join(","),
  };
  


      const { data: clinicData, isLoading } = useQuery(["searchClinics", searchParams], () =>
        apiClient.searchClinics(searchParams)
    );
    
      const handleSessionsCompletedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const sessionsCompleted = event.target.value;
        setSelectedSessionsCompleted((prevSessions) =>
          event.target.checked
            ? [...prevSessions, sessionsCompleted]
            : prevSessions.filter((session) => session !== sessionsCompleted)
        );
      };

      const handleConsultationTypeChange = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        const consultationType = event.target.value;
      
        setSelectedConsultationTypes((prevConsultationTypes) =>
          event.target.checked
            ? [...prevConsultationTypes, consultationType]
            : prevConsultationTypes.filter((type) => type !== consultationType)
        );
      };

      const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const facility = event.target.value;
    
        setSelectedFacilities((prevFacilities) =>
          event.target.checked
            ? [...prevFacilities, facility]
            : prevFacilities.filter((prevFacility) => prevFacility !== facility)
        );
      };

      const handleSpecialtyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const specialty = event.target.value;
      
        setSelectedSpecialties((prevSpecialties) =>
          event.target.checked
            ? [...prevSpecialties, specialty]
            : prevSpecialties.filter((prevSpecialty) => prevSpecialty !== specialty)
        );
      };
      
      
      
      

      return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
          {/* Sidebar Filters */}
          <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
            <div className="space-y-5">
              <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
                Filter by:
              </h3>
              <SessionsCompletedFilter
                  selectedSessionsCompleted ={selectedSessionsCompleted}
                onChange={handleSessionsCompletedChange}
              />
              <ConsultationTypesFilter
                selectedConsultationTypes={selectedConsultationTypes}
                onChange={handleConsultationTypeChange}
              />

              <SpecialtiesFilter
              selectedSpecialties={selectedSpecialties}
              onChange={handleSpecialtyChange}

            />

              <FacilitiesFilter
                selectedFacilities={selectedFacilities}
                onChange={handleFacilityChange}
              />
              

              {/*

              <PriceFilter
                selectedPrice={selectedPrice}
                onChange={(value?: number) => setSelectedPrice(value)}
              />
              */}
            </div>
          </div>
      
          {/* Main Content */}
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">
              {isLoading
                ? "Loading..."
                : clinicData?.pagination.total === 1
                ? "1 Clinic found"
                : `${clinicData?.pagination.total || 0} Clinics found`}

              {!isLoading && search.location ? ` in ${search.location}` : ""}

              </span>
              <select
                value={sortOption}
                onChange={(event) => setSortOption(event.target.value)}
                className="p-2 border rounded-md"
              >
                <option value="">Sort By</option>
                <option value="sessionsCompleted">Sessions Completed</option>
                <option value="pricePerSessionAsc">
                  Price Per Session (low to high)
                </option>
                <option value="pricePerSessionDesc">
                  Price Per Session (high to low)
                </option>
              </select>
            </div>
            {clinicData?.data.map((clinic) => (
              <SearchResultsCard clinic={clinic} />
            ))}
            <div>
              <Pagination
                page={clinicData?.pagination.page || 1}
                pages={clinicData?.pagination.pages || 1}
                onPageChange={(page) => setPage(page)}
              />
            </div>
          </div>
        </div>
      );
      
};

export default Search;