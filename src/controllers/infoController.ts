import { Request, Response } from "express";
import { getCafes } from "../services/infoService";

export const obtenerCafes = async (req: Request, res: Response) => {
  const cafes = await getCafes();

  if (!cafes) {
    return res.status(500).json({ message: "Error obteniendo cafés" });
  }

  return res.json(cafes);
};
