export const config = {
  supabase: {
    url: process.env.SUPABASE_URL || "",
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
    anonKey: process.env.SUPABASE_ANON_KEY || "",
  },
  google:{
    mapsKey: process.env.GOOGLE_MAPS_KEY || ""
  }
};