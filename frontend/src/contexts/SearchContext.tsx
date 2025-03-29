import React, { useContext, useState } from "react";

type SearchContext = {
  location: string; 
  maxPrice: string;// City or country where the clinic is located
  specialties: string[]; // Types of therapy offered (e.g., Anxiety, Depression)
  consultationTypes: string[]; // Therapy types (e.g., Individual, Family, Couples)
  // Preferred appointment date
  facilities: string[]; // Amenities (e.g., Wheelchair Access, Parking)
  clinicId: string; // Selected clinic ID if needed
   // Maximum price per session (optional)

  saveSearchValues: (
    location: string,
    maxPrice: string,
    specialties: string[],
    consultationTypes: string[],
    facilities?: string[],
    
  ) => void;
};


  const SearchContext = React.createContext<SearchContext | undefined>(undefined);

  type SearchContextProviderProps = {
    children: React.ReactNode;
  };
  

  export const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
    const [location, setLocation] = useState<string>(
      () => sessionStorage.getItem("location") || ""
    );
    const [maxPrice, setMaxPrice] = useState<string>(
      () => sessionStorage.getItem("maxPrice") || ""
    );
    
    const [specialties, setSpecialties] = useState<string[]>(
      () => JSON.parse(sessionStorage.getItem("specialties") || "[]")
    );
    const [consultationTypes, setConsultationTypes] = useState<string[]>(
      () => JSON.parse(sessionStorage.getItem("consultationTypes") || "[]")
    );
    const [facilities, setFacilities] = useState<string[]>(
      () => JSON.parse(sessionStorage.getItem("facilities") || "[]")
    );
    const [clinicId, setClinicId] = useState<string>(
      () => sessionStorage.getItem("clinicId") || ""
    );
  
    const saveSearchValues = (
      location: string,
      maxPrice: string,
      specialties: string[],
      consultationTypes: string[],
      facilities?: string[],
      
    ) => {
      setLocation(location);
      setSpecialties(specialties);
      setConsultationTypes(consultationTypes);

      setFacilities(facilities || []);
      setMaxPrice(maxPrice);
    
      if (clinicId) {
        setClinicId(clinicId);
      }
    
      sessionStorage.setItem("location", location);
      sessionStorage.setItem("specialties", JSON.stringify(specialties));
      sessionStorage.setItem("consultationTypes", JSON.stringify(consultationTypes));
      sessionStorage.setItem("facilities", JSON.stringify(facilities || []));
      sessionStorage.setItem("maxPrice", maxPrice);
    };
    
    return (
      <SearchContext.Provider
        value={{
          location,
          maxPrice,
          specialties,
          consultationTypes,
          facilities,
          
          clinicId,
          saveSearchValues,
        }}
      >
    
        {children}
      </SearchContext.Provider>
    );
  };

  export const useSearchContext = () => {
    const context = useContext(SearchContext);
    return context as SearchContext;
  };