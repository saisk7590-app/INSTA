import { AuthSession, AuthUser, LoginPayload, SignupPayload } from '../../types/auth';
import { api } from '../api';
import { login as loginApi, logout as logoutApi } from '../authService';

export async function login(payload: LoginPayload): Promise<AuthSession> {
  try {
    return await loginApi(payload);
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message || 'Incorrect email or server error.';
    throw new Error(errorMsg);
  }
}

export async function signup(payload: SignupPayload): Promise<AuthUser> {
  try {
    const username = payload.email.split('@')[0].replace(/[^a-zA-Z0-9_.]/g, '_').toLowerCase();
    const response = await api.post('/auth/signup', {
      email: payload.email,
      phone: payload.phone,
      password: payload.password,
      fullName: payload.fullName,
      username,
      interests: [],
    });
    
    const { user } = response.data.data;
    
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone || '',
      onboardingCompleted: user.onboardingCompleted || false,
      interests: [],
      fullName: user.fullName,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      location: user.location || undefined,
    };
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message || 'An account already exists or server error.';
    throw new Error(errorMsg);
  }
}

export async function logout() {
  return await logoutApi();
}

export async function validateStoredToken(token: string) {
  return token.startsWith('session_user_');
}
