import express, { Request, Response } from "express";
import Clinic from "../models/clinic";
import { param, validationResult } from "express-validator";
import Stripe from "stripe";
import verifyToken from "../middleware/auth";
import { ClinicSearchResponse } from "../shared/types";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = constructSearchQuery(req.query);

    let sortOptions = {};
    switch (req.query.sortOption) {
      case "sessionsCompleted":
        sortOptions = { sessionsCompleted: -1 };
        break;
      case "pricePerSessionAsc":
        sortOptions = { pricePerSession: 1 };
        break;
      case "pricePerSessionDesc":
        sortOptions = { pricePerSession: -1 };
        break;
    }

    const pageSize = 8;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;

    const clinics = await Clinic.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    const total = await Clinic.countDocuments(query);

    const response: ClinicSearchResponse = {
      data: clinics,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const clinics = await Clinic.find().sort("-lastUpdated");
    res.json(clinics);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching hotels" });
  }
});

router.get(
  "/:id",
  [param("id").notEmpty().withMessage(" ID is required")],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id.toString();

    try {
      const clinic = await Clinic.findById(id);
      res.json(clinic);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching clinic" });
    }
  }
);


{/*
router.post(
  "/:clinicId/bookings/payment-intent",
  verifyToken,
  async (req: Request, res: Response) => {
    const { numberOfNights } = req.body;
    const clinicId = req.params.clinicId;

    const clinic = await Clinic.findById(clinicId);
    if (!clinic) {
      return res.status(400).json({ message: "Hotel not found" });
    }

    const totalCost = clinic.pricePerSession * numberOfNights;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost * 100,
      currency: "gbp",
      metadata: {
        clinicId,
        userId: req.userId,
      },
    });

    if (!paymentIntent.client_secret) {
      return res.status(500).json({ message: "Error creating payment intent" });
    }

    const response = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret.toString(),
      totalCost,
    };

    res.send(response);
  }
);

router.post(
  "/:hotelId/bookings",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const paymentIntentId = req.body.paymentIntentId;

      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId as string
      );

      if (!paymentIntent) {
        return res.status(400).json({ message: "payment intent not found" });
      }

      if (
        paymentIntent.metadata.hotelId !== req.params.hotelId ||
        paymentIntent.metadata.userId !== req.userId
      ) {
        return res.status(400).json({ message: "payment intent mismatch" });
      }

      if (paymentIntent.status !== "succeeded") {
        return res.status(400).json({
          message: `payment intent not succeeded. Status: ${paymentIntent.status}`,
        });
      }

      const newBooking: BookingType = {
        ...req.body,
        userId: req.userId,
      };

      const hotel = await Clinic.findOneAndUpdate(
        { _id: req.params.clinicId },
        {
          $push: { bookings: newBooking },
        }
      );

      if (!clinic) {
        return res.status(400).json({ message: "hotel not found" });
      }

      await hotel.save();
      res.status(200).send();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "something went wrong" });
    }
  }
);

*/}

const constructSearchQuery = (queryParams: any) => {
    let constructedQuery: any = {};
    if (queryParams.location) {
      constructedQuery.$or = [
        { city: new RegExp(queryParams.location, "i") },
        { country: new RegExp(queryParams.location, "i") },
      ];
    }

    if (queryParams.maxPrice) {
      const maxPriceValue = Number(queryParams.maxPrice);
      if (!isNaN(maxPriceValue) && maxPriceValue > 0) {
        constructedQuery.pricePerSession = { $lte: maxPriceValue };
      }
    }
    
  
    if (queryParams.specialties) {
      constructedQuery.specialties = {
        $in: Array.isArray(queryParams.specialties)
          ? queryParams.specialties
          : [queryParams.specialties],
      };
    }
  
    if (queryParams.consultationTypes) {
      constructedQuery.consultationTypes = {
        $in: Array.isArray(queryParams.consultationTypes)
          ? queryParams.consultationTypes
          : [queryParams.consultationTypes],
      };
    }
  
    if (queryParams.facilities) {
      constructedQuery.facilities = {
        $all: Array.isArray(queryParams.facilities)
          ? queryParams.facilities
          : [queryParams.facilities],
      };
    }
    /*
    if (queryParams.availabilityDate) {
      constructedQuery.appointments = {
        $elemMatch: { date: new Date(queryParams.availabilityDate) },
      };
    }

    if (queryParams.maxPrice) {
      constructedQuery.pricePerSession = {
        $lte: parseInt(queryParams.maxPrice).toString(),
      };
    }
    */
    if (queryParams.sessionsCompleted) {
      const sessionThresholds = queryParams.sessionsCompleted
        .split(",")
        .map((count: string) => Number(count))
        .filter((count: number) => !isNaN(count)); // Ensure valid numbers
    
      if (sessionThresholds.length > 0) {
        constructedQuery.sessionsCompleted = { $gte: Math.min(...sessionThresholds) };
      }
    }
    
  
    return constructedQuery;
  };
    

  


export default router;