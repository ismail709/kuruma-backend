import { Router } from "express";
import { createTrip } from "../controllers/trips_controller.js";

const router = Router();

router.get("/:id", createTrip);
router.post("/", createTrip);

export default router;
