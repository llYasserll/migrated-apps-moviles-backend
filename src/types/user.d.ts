export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
}

export interface UserAuth {
  email: string;
  password: string;
}

export interface RegisterResponse {
  profile: UserProfile;
  accessToken?: string;
  refreshToken?: string;
}