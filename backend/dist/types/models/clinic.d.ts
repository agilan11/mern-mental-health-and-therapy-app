import mongoose from "mongoose";
export type ClinicType = {
    _id: string;
    therapistId: string;
    name: string;
    city: string;
    country: string;
    description: string;
    specialties: string[];
    consultationTypes: string[];
    facilities: string[];
    pricePerSession: number;
    starRating: number;
    imageUrls: string[];
    lastUpdated: Date;
};
declare const Clinic: mongoose.Model<ClinicType, {}, {}, {}, mongoose.Document<unknown, {}, ClinicType> & ClinicType & Required<{
    _id: string;
}>, any>;
export default Clinic;
