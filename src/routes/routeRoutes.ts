import { Router } from "express";
import { getRouteController } from "../controllers/routeController";

const router = Router();

router.get("/", getRouteController);

export default router;
