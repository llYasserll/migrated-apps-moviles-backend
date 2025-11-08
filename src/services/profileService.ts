import { supabase } from "../supabase/supabaseClient";
import { UserProfile } from "../types/profile";

export const createProfile = async (profile: UserProfile): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from("profiles")
    .insert(profile)
    .select()
    .single();

  if (error) {
    console.error("Error creando perfil:", error.message);
    return null;
  }

  return data;
};

export const getProfileById = async (id: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error obteniendo perfil:", error.message);
    return null;
  }

  return data;
};