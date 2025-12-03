import { Request, Response } from "express";
import { getRouteService } from "../services/routeService";

export const getRouteController = async (req: Request, res: Response) => {
  try {
    const { origin, destination, waypoints } = req.query;

    if (!origin || !destination) {
      return res.status(400).json({
        success: false,
        error: "origin and destination are required"
      });
    }

    const data = await getRouteService(
      origin as string,
      destination as string,
      waypoints as string | undefined
    );

    return res.json({
      success: true,
      ...data
    });
  } catch (error: any) {
    console.error("[ROUTE ERROR]:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
