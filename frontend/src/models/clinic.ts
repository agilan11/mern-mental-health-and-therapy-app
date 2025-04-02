

export type ClinicType = {
    _id: string;
    therapistId: string;  // Unique ID of the therapist who owns the clinic
    name: string;  // Name of the clinic
    city: string;
    country: string;
    description: string;  // Overview of the clinic's services and specialties
    specialties: string[];  // Areas of expertise (e.g., anxiety, depression, couples therapy)
    consultationTypes: string[];  // Types of therapy offered (e.g., individual, couples, family)
    facilities: string[];  // Amenities available (e.g., wheelchair access, private rooms)
    pricePerSession: number;  // Cost per therapy session
    sessionsCompleted: number;  // Aggregate rating from patients
    imageUrls: string[];  // Clinic images
    lastUpdated: Date; 
    bookings: BookingType[]; // List of scheduled appointments
};

export type BookingType = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  appointmentDate: Date;
  Cost: number;
};

export type ClinicSearchResponse = {
    data: ClinicType[];
    pagination: {
      total: number;
      page: number;
      pages: number;
    };
  };