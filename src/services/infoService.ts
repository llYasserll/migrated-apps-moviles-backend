import { supabase } from "../supabase/supabaseClient";

export interface Cafe {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  creado_en: string;
}

export const getCafes = async (): Promise<Cafe[] | null> => {
  const { data, error } = await supabase
    .from("info_cafe") // ← nombre de tu tabla
    .select("*");

  if (error) {
    console.error("Error obteniendo cafés:", error.message);
    return null;
  }

  return data as Cafe[];
};