export type AuthUser = {
  id: string;
  username: string;
  email: string;
  phone: string;
  onboardingCompleted: boolean;
  interests: string[];
  fullName?: string;
  bio?: string;
  avatarUrl?: string;
  location?: string;
};

export type AuthSession = {
  token: string;
  user: AuthUser;
};

export type SignupPayload = {
  email: string;
  phone: string;
  password: string;
  fullName: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type PermissionState = {
  locationGranted: boolean;
  notificationsGranted: boolean;
};

export type OnboardingDraft = {
  userId: string;
  otpVerified: boolean;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  username: string;
  interests: string[];
};
