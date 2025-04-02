import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Clinic from "../models/clinic"; // Updated model reference
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
import { ClinicType } from "../shared/types";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// **Create a Clinic**
router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Clinic name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("specialties").isArray().withMessage("Specialties must be an array"),
    body("consultationTypes")
      .isArray()
      .withMessage("Consultation types must be an array"),
      body("facilties")
      .isArray()
      .withMessage("Facilities must be an array"),
    body("pricePerSession")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per session must be a number"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newClinic: ClinicType = req.body;

      const imageUrls = await uploadImages(imageFiles);

      newClinic.imageUrls = imageUrls;
      newClinic.lastUpdated = new Date();
      newClinic.therapistId = req.userId; // Ensure therapist owns the clinic

      const clinic = new Clinic(newClinic);
      await clinic.save();

      res.status(201).json(clinic);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

// **Get all clinics for the authenticated therapist**
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const clinics = await Clinic.find({ therapistId: req.userId });
    res.json(clinics);
  } catch (error) {
    res.status(500).json({ message: "Error fetching clinics" });
  }
});

// **Get a specific clinic by ID**
router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const clinic = await Clinic.findOne({ _id: id, therapistId: req.userId });
    res.json(clinic);
  } catch (error) {
    res.status(500).json({ message: "Error fetching clinic" });
  }
});

// **Update a clinic**
router.put(
  "/:clinicId",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try {
      const updatedClinic: ClinicType = req.body;
      updatedClinic.lastUpdated = new Date();

      const clinic = await Clinic.findOneAndUpdate(
        { _id: req.params.clinicId, therapistId: req.userId },
        updatedClinic,
        { new: true }
      );

      if (!clinic) {
        return res.status(404).json({ message: "Clinic not found" });
      }

      const files = req.files as Express.Multer.File[];
      const updatedImageUrls = await uploadImages(files);

      clinic.imageUrls = [
        ...updatedImageUrls,
        ...(updatedClinic.imageUrls || []),
      ];

      await clinic.save();
      res.status(201).json(clinic);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

// **Upload clinic images to Cloudinary**
async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = `data:${image.mimetype};base64,${b64}`;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  return await Promise.all(uploadPromises);
}

export default router;
