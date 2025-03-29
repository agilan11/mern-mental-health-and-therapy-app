import mongoose from "mongoose";

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
    lastUpdated: Date;  // List of scheduled appointments
};

const clinicSchema = new mongoose.Schema<ClinicType>({
    therapistId: { type: String, required: true }, // Unique ID of the therapist
    name: { type: String, required: true }, // Clinic name
    city: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true }, // Overview of the clinic
    specialties: [{ type: String, required: true }], // Areas of expertise (e.g., anxiety, PTSD)
    consultationTypes: [{ type: String, required: true }], // Therapy formats (e.g., Individual, Family)
    facilities: [{ type: String, required: true }], // Clinic amenities
    pricePerSession: { type: Number, required: true }, // Cost per session
    sessionsCompleted: { type: Number, required: true, min: 0 }, // Aggregate rating
    imageUrls: [{ type: String, required: true }], // Clinic images
    lastUpdated: { type: Date, default: Date.now }, // Auto-updated timestamp
     // Scheduled therapy sessions
});

const Clinic = mongoose.model<ClinicType>("Clinic", clinicSchema);

export default Clinic;

