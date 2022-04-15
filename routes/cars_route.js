import { Router } from "express";
import { getCarById, getCars } from "../controllers/cars_controller.js";

const router = Router();

router.get("/", getCars);
router.get("/car/:id", getCarById);

export default router;
