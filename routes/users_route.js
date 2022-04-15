import { Router } from "express";
import { getUser, createUser } from "../controllers/users_controller.js";

const router = Router();

router.post("/", getUser);
router.post("/new", createUser);

export default router;
