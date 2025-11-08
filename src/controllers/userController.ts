import { Request, Response } from "express";
import * as userService from "../services/userService";

// ✅ Registro de usuario
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    const newUser = await userService.registerUser({ email, password, fullName });
    return res.status(201).json({
      message: "Usuario registrado correctamente",
      data: newUser,
    });
  } catch (error: any) {
    console.error("Error en register:", error.message);
    return res.status(500).json({ message: error.message || "Error al registrar usuario" });
  }
};

// ✅ Login de usuario
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Faltan credenciales" });
    }

    const userData = await userService.loginUser({ email, password });
    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      data: userData,
    });
  } catch (error: any) {
    console.error("Error en login:", error.message);
    return res.status(401).json({ message: error.message || "Error al iniciar sesión" });
  }
};