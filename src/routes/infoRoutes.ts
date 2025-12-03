import { Router } from "express";
import { obtenerCafes } from "../controllers/infoController";

const router = Router();

router.get("/", obtenerCafes);

export default router;
