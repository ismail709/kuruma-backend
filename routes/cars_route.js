import { Router } from "express";
import { getCarById, getCars } from "../controllers/cars_controller.js";

const router = Router();

router.get("/:id", getCarById);
router.get("/", getCars);

export default router;
