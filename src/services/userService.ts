import { supabase } from "../supabase/supabaseClient";
import { UserAuth, UserProfile, RegisterResponse } from "../types/user";

export const registerUser = async (data: UserAuth & { fullName: string }): Promise<RegisterResponse> => {
  const { email, password, fullName } = data;

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw new Error(`Error al registrar usuario: ${authError.message}`);

  const user = authData.user;
  const session = authData.session;

  if (!user) throw new Error("No se pudo obtener el usuario registrado.");

  const { error: profileError } = await supabase
    .from("profiles")
    .insert([
      {
        id: user.id,
        email: email,
        full_name: fullName,
      },
    ]);

  if (profileError) throw new Error(`Error al crear perfil: ${profileError.message}`);

  const response: RegisterResponse = {
    profile: {
      id: user.id,
      email: email,
      fullName: fullName,
    },
    accessToken: session?.access_token ?? undefined,
    refreshToken: session?.refresh_token ?? undefined,
  };

  return response;
};

export const loginUser = async (data: UserAuth): Promise<RegisterResponse> => {
  const { email, password } = data;

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(`Error al iniciar sesión: ${error.message}`);

  const user = authData.user;
  const session = authData.session;

  if (!user) throw new Error("Usuario no encontrado.");

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("id, email, full_name")
    .eq("id", user.id)
    .single();

  if (profileError) throw new Error(`Error al obtener perfil: ${profileError.message}`);

  const profile: UserProfile = {
    id: profileData.id,
    email: profileData.email,
    fullName: profileData.full_name,
  };

  const response: RegisterResponse = {
    profile,
    accessToken: session?.access_token ?? undefined,
    refreshToken: session?.refresh_token ?? undefined,
  };

  return response;
};