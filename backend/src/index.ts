import express,{Request,Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import myClinicRoutes from './routes/my-clinics'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app=express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true})) 
app.use(cors({
    origin: true, // Reflects the request origin dynamically
    methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true, // Allows cookies/auth headers
  }))

app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use("/api/auth",authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/my-clinics",myClinicRoutes)

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 7000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


