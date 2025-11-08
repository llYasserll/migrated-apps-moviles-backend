import { Request, Response } from "express";
import * as profileService from "../services/profileService";

export const getProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const profile = await profileService.getProfileById(id);

  if (!profile) {
    return res.status(404).json({ message: "Perfil no encontrado" });
  }

  res.json(profile);
};