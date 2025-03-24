import mongoose from "mongoose";
export type UserType = {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};
declare const User: mongoose.Model<UserType, {}, {}, {}, mongoose.Document<unknown, {}, UserType> & UserType & Required<{
    _id: string;
}>, any>;
export default User;
